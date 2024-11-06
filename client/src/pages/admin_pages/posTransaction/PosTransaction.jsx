import MaterialTable from "material-table";
import moment from "moment";
import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import Barcode from "react-barcode/lib/react-barcode";
import { AiFillPrinter } from "react-icons/ai";
import { useReactToPrint } from "react-to-print";
import AuthUser from "../../../Components/AuthUser";
import "./PosTransaction.css";
import PartialPayment from "./PartialPayment";
import PaymentInvoice from "./PaymentInvoice";
import ReactDatePicker from "react-datepicker";

const PosTransaction = () => {
  const { http, user } = AuthUser();

  const [invoices, setInvoices] = useState([]);
  const [returnInnvoices, setReturnInvoices] = useState([]);

  const [paymentVouchar, setPaymentVouchar] = useState([]);

  useEffect(() => {
    http.get(`all-invoices`).then((res) => {
      console.log(res.data.data, "All invoice");
      setInvoices(res.data.data);
    });
    http.get(`all-return-invoice`).then((res) => {
      setReturnInvoices(res.data.data);
    });
    http.get(`payment-vouchar`).then((res) => {
      setPaymentVouchar(res.data);
    });
  }, []);
  const total = invoices.reduce(
    (previousValue, currentValue) =>
      parseFloat(currentValue.sub_total || 0) + previousValue,
    0
  );

  const totalPaid = invoices
    .filter(
      (item) =>
        item.payment_status === "Paid" ||
        item.payment_status === "Partially Paid"
    )
    .reduce(
      (previousValue, currentValue) =>
        parseFloat(
          currentValue?.paid_amount > 0 ? currentValue?.paid_amount : 0
        ) -
        parseFloat(
          currentValue?.return_amount > 0 ? currentValue?.return_amount : 0
        ) +
        previousValue,
      0
    );
  const totalUnpaid = invoices.reduce(
    (previousValue, currentValue) =>
      parseFloat(currentValue?.due_amount > 0 ? currentValue?.due_amount : 0) +
      previousValue,
    0
  );
  const totalDiscount = invoices.reduce(
    (previousValue, currentValue) =>
      parseFloat(
        currentValue?.special_discount > 0 ? currentValue?.special_discount : 0
      ) + previousValue,
    0
  );
  const columns = [
    {
      title: "SL",
      field: "",
      render: (row) => <div>{row.tableData.id + 1}</div>,
      width: "20 !important",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Invoice No",
      field: `invoice_no`,
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Member",
      field: `invoice_no`,
      render: (row) => (
        <div className="text-center">
          {row.member?.member_name ? row.member?.member_name : "Not a member"}
        </div>
      ),
    },

    {
      title: "Date",
      field: `created_at`,
      render: (row) => (
        <div className="text-center">
          {moment(row?.updated_at).format("DD/MM/YYYY")}
        </div>
      ),
    },
    {
      title: "Status",
      field: `payment_status`,
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Sub Total",
      field: `sub_total`,
      render: (row) => (
        <div className="text-center">
          <span style={{ fontSize: "20px", fontWeight: 700 }}>&#x9F3;</span>
          {parseFloat(row.sub_total || 0).toFixed(2)}
        </div>
      ),
    },
    {
      title: "Discount",
      field: `special_discount`,
      render: (row) => (
        <div className="text-center">
          <span style={{ fontSize: "20px", fontWeight: 700 }}>&#x9F3;</span>
          {parseFloat(row.special_discount || 0).toFixed(2)}
        </div>
      ),
    },
    {
      title: "Grand Total",
      field: `special_discount`,
      render: (row) => (
        <div className="text-center">
          <span style={{ fontSize: "20px", fontWeight: 700 }}>&#x9F3;</span>
          {(
            parseFloat(row.sub_total || 0) -
            parseFloat(row.special_discount || 0)
          ).toFixed(2)}
        </div>
      ),
    },

    {
      title: "Payment Mode",
      field: `discount_type`,
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Invoice Type",
      field: `invoice_type`,
    },
    {
      title: "Sync",
      field: `invoice_type`,
      render: (row) => (
        <div className="text-center">
          {Number(row?.is_sync) === 1 ? "Yes" : "No"}
        </div>
      ),
    },
    {
      title: "Reference Invoice",
      field: `ref_invoice`,
    },
    {
      title: "Action",
      field: "patient",
      render: (row) => (
        <div className="text-center">
          <button
            data-bs-toggle="tooltip"
            title="Print Invoice"
            onClick={() => invoicePrint(row.id)}
            className={`btn btn-sm action-btn `}
          >
            <AiFillPrinter />
          </button>
        </div>
      ),
      cellStyle: {
        textAlign: "center",
      },
    },
  ];

  const columnsReturn = [
    {
      title: "SL",
      field: "",
      render: (row) => <div>{row.tableData.id + 1}</div>,
      width: "20 !important",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Invoice No",
      field: `return_invoice_no`,
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Reference Invoice No",
      field: `reference_invoice_no`,
      cellStyle: {
        textAlign: "center",
      },
    },

    {
      title: "Date",
      field: `created_at`,
      render: (row) => (
        <div className="text-center">
          {moment(row.created_at).format("DD/MM/YYYY")}
        </div>
      ),
    },
    {
      title: "Status",
      field: ``,
      render: (row) => <div className="text-center">Returnded</div>,
    },
    {
      title: "Amount",
      field: `total_amount`,
      render: (row) => (
        <div className="text-center">
          <span style={{ fontSize: "20px", fontWeight: 700 }}>&#x9F3;</span>
          {row.total_amount}
        </div>
      ),
    },
    // {
    //     title: "Payment Mode", field: `discount_type`
    // },
    {
      title: "Action",
      field: "patient",
      render: (row) => (
        <div className="text-center">
          <button
            data-bs-toggle="tooltip"
            title="Print Invoice"
            onClick={() => returnInvoicePrint(row)}
            className={`btn btn-sm action-btn `}
          >
            <AiFillPrinter />
          </button>
        </div>
      ),
      cellStyle: {
        textAlign: "center",
      },
    },
  ];
  const paymentVoucharColumns = [
    {
      title: "SL",
      field: "",
      render: (row) => <div>{row.tableData.id + 1}</div>,
      width: "20 !important",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Invoice No",
      field: `invoice_no`,
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Mrr No",
      field: `mrr_no`,
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Date",
      field: `created_at`,
      render: (row) => (
        <div className="text-center">
          {moment(row.created_at).format("DD/MM/YYYY")}
        </div>
      ),
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Paid Amount",
      field: `mrr_no`,
      render: (row) => (
        <div className="text-center">
          {parseFloat(row.due_amount) > 0 ? row.paid_amount : row.total_amount}
        </div>
      ),
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Due Amount",
      field: `due_amount`,

      cellStyle: {
        textAlign: "center",
      },
    },

    {
      title: "Total Amount",
      field: `total_amount`,
      render: (row) => (
        <div className="text-center">
          <span style={{ fontSize: "20px", fontWeight: 700 }}>&#x9F3;</span>
          {row.total_amount}
        </div>
      ),
      cellStyle: {
        textAlign: "center",
      },
    },
    // {
    //   title: "Invoice Type",
    //   field: `invoice_type`,
    // },
    {
      title: "Action",
      field: "patient",
      render: (row) => (
        <div className="text-center">
          {parseFloat(row.due_amount) > 0 && (
            <PartialPayment data={row} updatePaymentData={updatePaymentData} />
          )}
          <button
            data-bs-toggle="tooltip"
            title="Print Invoice"
            onClick={() => paymentInvoicePrint(row)}
            className={`btn btn-sm action-btn `}
          >
            <AiFillPrinter style={{ fontSize: "16px" }} />
          </button>
        </div>
      ),
      cellStyle: {
        textAlign: "center",
      },
    },
  ];
  // print invoice
  const [invoiceData, setInvoiceData] = useState({
    invoice: {
      invoice_no: "",
      created_at: "",
      payment_status: "",
      grand_total: "",
    },
    invoiceDetails: [],
  });
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const invoicePrint = (id) => {
    http.get(`view-selected-invoice/${id}`).then((res) => {
      if (res.status === 200) {
        setInvoiceData({
          invoice: res.data.data,
          invoiceDetails: res.data.invoice_details,
        });
        setTimeout(() => {
          handlePrint();
        }, 500);
      }
    });
  };
  const returnInvoicePrint = (item) => {
    setInvoiceData({
      invoice: {
        invoice_no: item.return_invoice_no,
        created_at: item.created_at,
        grand_total: item.total_amount,
      },
      invoiceDetails: item.details,
    });
    setTimeout(() => {
      handlePrint();
    }, 500);
  };
  const [tableShow, setTableShow] = useState("bill");
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });

  const handleSearch = () => {
    http.post("serch-invoice-by-date", date).then((res) => {
      if (res.status === 200) {
        setInvoices(res.data.data);
      }
    });
    http.post("return-invoice-by-date", date).then((res) => {
      if (res.status === 200) {
        setReturnInvoices(res.data.data);
      }
    });
    http.post("payment-vouchar-by-date", date).then((res) => {
      if (res.status === 200) {
        setPaymentVouchar(res.data.data);
      }
    });
  };
  const [reportData, setReportData] = useState([]);
  const [returnReportData, setReturnReportData] = useState([]);
  const reportRef = useRef();
  const handlePrintTodaysReport = useReactToPrint({
    content: () => reportRef.current,
  });
  const [memberReportData, setMemberReportData] = useState([]);
  const [filterData, setFilterData] = useState({
    startDate: "",
    endDate: "",
    medicine_id: "",
    member_id: "",
    brand_id: "",
  });
  const memberReportRef = useRef();
  const handlePrintMemberReport = useReactToPrint({
    content: () => memberReportRef.current,
  });
  const [brandReportData, setBrandReportData] = useState([]);
  const [filterBy, setFilterBy] = useState("date");
  const brandReportRef = useRef();
  console.log(returnReportData, "paymentVouchar");
  const updatePaymentData = () => {
    http.get(`payment-vouchar`).then((res) => {
      setPaymentVouchar(res.data);
    });
  };
  const [paymentInvoiceData, setPaymentInvoiceData] = useState({});
  const paymentInvoiceRef = useRef();
  const printPayment = useReactToPrint({
    content: () => paymentInvoiceRef.current,
  });
  const paymentInvoicePrint = (row) => {
    setPaymentInvoiceData(row);
    setTimeout(() => {
      printPayment();
    }, 300);
  };
  console.log(date);

  return (
    <div className="page-content">
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="card mb-2">
            <div className="card-body">
              <div className="row">
                <div className="d-flex justify-content-between">
                  <h6>Transaction Details</h6>
                  <div className="row mb-1">
                    <div className="col-1"></div>
                    <div className="col-sm-4">
                      <ReactDatePicker
                        placeholderText="From Date"
                        selected={
                          date.startDate ? new Date(date.startDate) : new Date()
                        }
                        className="form-control form-control-sm custom-datepicker-input-width"
                        dateFormat={"dd/MM/yyyy"}
                        name="requisition_no"
                        onChange={(d) =>
                          setDate({
                            ...date,
                            startDate: moment(d).format("YYYY-MM-DD"),
                          })
                        }
                      />
                      {/* <input
                        className={`form-control form-control-sm`}
                        type='date'
                        id='exampleInputUsername2'
                        onChange={(e) =>
                          setDate({ ...date, startDate: e.target.value })
                        }
                        name='requisition_no'
                      /> */}
                    </div>
                    <div className="col-sm-4">
                      <ReactDatePicker
                        className="form-control form-control-sm"
                        selected={
                          date.endDate ? new Date(date.endDate) : new Date()
                        }
                        dateFormat="dd/MM/yyyy"
                        onChange={(d) =>
                          setDate({
                            ...date,
                            endDate: moment(d).format("YYYY-MM-DD"),
                          })
                        }
                      />
                    </div>
                    <div className="col-sm-3">
                      <button
                        style={{
                          backgroundColor: "#69B128",
                          color: "white",
                          paddingTop: "6px",
                          paddingBottom: "7px",
                          marginTop: "1px",
                        }}
                        onClick={handleSearch}
                        className="btn btn-sm me-lg-2 px-4  fw-bold"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>

                <div className="tran mt-2">
                  <ul
                    className="nav nav-pills mb-3"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        onClick={() => setTableShow("bill")}
                        className="nav-link active"
                        id="bill-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-home"
                        type="button"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="true"
                      >
                        Billing
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        onClick={() => setTableShow("invoice")}
                        className="nav-link"
                        id="invoices-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-profile"
                        type="button"
                        role="tab"
                        aria-controls="pills-profile"
                        aria-selected="false"
                      >
                        Return
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        onClick={() => setTableShow("payment")}
                        className="nav-link"
                        id="payment-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-contact"
                        type="button"
                        role="tab"
                        aria-controls="pills-contact"
                        aria-selected="false"
                      >
                        Payment
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="bill-tab"
                      tabindex="0"
                    >
                      <div className="row g-2">
                        <div className="col-md-4">
                          <div className="tran__card_1">
                            <div className="card">
                              <div className="d-flex align-items-center ms-4 mt-2">
                                <i
                                  style={{ fontSize: "40px" }}
                                  className="fas fa-file-invoice me-3"
                                ></i>
                                <p className="title__text">
                                  <span style={{ paddingRight: "10px" }}>
                                    Total Invoice -
                                  </span>
                                  <span>{invoices?.length}</span>
                                </p>
                              </div>
                              <div className="p-3">
                                <hr style={{ marginTop: "0px" }} />
                                <p>
                                  <span className="fw-bold">Sub Total :</span>
                                  <span
                                    style={{
                                      fontSize: "20px",
                                      fontWeight: 700,
                                    }}
                                  >
                                    &#x9F3;
                                  </span>
                                  {parseFloat(total).toFixed(2)}
                                </p>
                                <p>
                                  <span className="fw-bold">Discount :</span>
                                  <span
                                    style={{
                                      fontSize: "20px",
                                      fontWeight: 700,
                                    }}
                                  >
                                    &#x9F3;
                                  </span>
                                  {parseFloat(totalDiscount).toFixed(2)}
                                </p>
                                <p>
                                  <span className="fw-bold">Grand Total :</span>
                                  <span
                                    style={{
                                      fontSize: "20px",
                                      fontWeight: 700,
                                    }}
                                  >
                                    &#x9F3;
                                  </span>
                                  {(
                                    parseFloat(total) -
                                    parseFloat(totalDiscount)
                                  ).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="tran__card_2">
                            <div className="card">
                              <div className=" ms-4 mt-2">
                                <i
                                  style={{ fontSize: "40px" }}
                                  className="fas fa-file-invoice"
                                ></i>
                              </div>
                              <div className="card-body">
                                <p className="title__text">
                                  <span style={{ paddingRight: "10px" }}>
                                    Total Received -
                                  </span>
                                  <span>
                                    {
                                      invoices.filter(
                                        (item) =>
                                          item.payment_status === "Paid" ||
                                          item.payment_status ===
                                            "Partially Paid"
                                      )?.length
                                    }
                                  </span>
                                </p>
                                <hr />
                                <p>
                                  <span
                                    style={{
                                      fontSize: "20px",
                                      fontWeight: 700,
                                    }}
                                  >
                                    &#x9F3;
                                  </span>
                                  {parseFloat(totalPaid).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="tran__card_3">
                            <div className="card">
                              <div className=" ms-4 mt-2">
                                <i
                                  style={{ fontSize: "40px" }}
                                  className="fas fa-file-invoice"
                                ></i>
                              </div>
                              <div className="card-body">
                                <p className="title__text">
                                  <span style={{ paddingRight: "10px" }}>
                                    Total Due -
                                  </span>
                                  <span>
                                    {
                                      invoices.filter(
                                        (item) =>
                                          item.payment_status === "Unpaid" ||
                                          item.payment_status ===
                                            "Partially Paid"
                                      )?.length
                                    }
                                  </span>
                                </p>
                                <hr />
                                <p>
                                  <span
                                    style={{
                                      fontSize: "20px",
                                      fontWeight: 700,
                                    }}
                                  >
                                    &#x9F3;
                                  </span>
                                  {parseFloat(totalUnpaid).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="pills-profile"
                      role="tabpanel"
                      aria-labelledby="invoices-tab"
                      tabindex="0"
                    >
                      <div className="row g-2">
                        <div className="col-md-4">
                          <div className="tran__card_1">
                            <div className="card">
                              <div className=" ms-4 mt-2">
                                <i
                                  style={{ fontSize: "40px" }}
                                  className="fas fa-file-invoice"
                                ></i>
                              </div>
                              <div className="card-body">
                                <p className="title__text">
                                  <span style={{ paddingRight: "10px" }}>
                                    Total Invoice -
                                  </span>
                                  <span>{returnInnvoices?.length}</span>
                                </p>
                                <hr />
                                <p>
                                  <span
                                    style={{
                                      fontSize: "20px",
                                      fontWeight: 700,
                                    }}
                                  >
                                    &#x9F3;
                                  </span>
                                  {returnInnvoices
                                    .reduce(
                                      (a, b) => a + parseFloat(b.total_amount),
                                      0
                                    )
                                    .toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4"></div>
                        <div className="col-md-4"></div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="pills-contact"
                      role="tabpanel"
                      aria-labelledby="payment-tab"
                      tabindex="0"
                    >
                      <div className="row g-2">
                        <div className="col-md-4">
                          <div className="tran__card_1">
                            <div className="card">
                              <div className=" ms-4 mt-2">
                                <i
                                  style={{ fontSize: "40px" }}
                                  className="fas fa-file-invoice"
                                ></i>
                              </div>
                              <div className="card-body">
                                <p className="title__text">
                                  <span style={{ paddingRight: "10px" }}>
                                    Total Invoice -
                                  </span>
                                  <span>{paymentVouchar.length}</span>
                                </p>
                                <hr />
                                <p>
                                  <span
                                    style={{
                                      fontSize: "20px",
                                      fontWeight: 700,
                                    }}
                                  >
                                    &#x9F3;
                                  </span>
                                  {paymentVouchar
                                    .reduce(
                                      (a, b) => a + parseFloat(b.total_amount),
                                      0
                                    )
                                    .toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="tran__card_2">
                            <div className="card">
                              <div className=" ms-4 mt-2">
                                <i
                                  style={{ fontSize: "40px" }}
                                  className="fas fa-file-invoice"
                                ></i>
                              </div>
                              <div className="card-body">
                                <p className="title__text">
                                  <span style={{ paddingRight: "10px" }}>
                                    Total Received -
                                  </span>
                                  <span>{paymentVouchar.length}</span>
                                </p>
                                <hr />
                                <p>
                                  <span
                                    style={{
                                      fontSize: "20px",
                                      fontWeight: 700,
                                    }}
                                  >
                                    &#x9F3;
                                  </span>
                                  {paymentVouchar
                                    .reduce(
                                      (a, b) => a + parseFloat(b.paid_amount),
                                      0
                                    )
                                    .toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="tran__card_3">
                            <div className="card">
                              <div className=" ms-4 mt-2">
                                <i
                                  style={{ fontSize: "40px" }}
                                  className="fas fa-file-invoice"
                                ></i>
                              </div>
                              <div className="card-body">
                                <p className="title__text">
                                  <span style={{ paddingRight: "10px" }}>
                                    Total Due -
                                  </span>
                                  <span>{paymentVouchar.length}</span>
                                </p>
                                <hr />
                                <p>
                                  <span
                                    style={{
                                      fontSize: "20px",
                                      fontWeight: 700,
                                    }}
                                  >
                                    &#x9F3;
                                  </span>
                                  {paymentVouchar
                                    .reduce(
                                      (a, b) => a + parseFloat(b.due_amount),
                                      0
                                    )
                                    .toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="row">
            <div className="col-md-12 grid-margin">
              {tableShow === "bill" && (
                <MaterialTable
                  columns={columns}
                  data={invoices}
                  // isLoading= {spinner ? true : false}
                  options={{
                    search: true,
                    showTitle: false,
                    searchFieldAlignment: "left",
                    pageSize: 10,
                    emptyRowsWhenPaging: false,
                    pageSizeOptions: [5, 10, 20, 50, 100],
                  }}
                />
              )}
              {tableShow === "invoice" && (
                <MaterialTable
                  columns={columnsReturn}
                  data={returnInnvoices}
                  // isLoading= {spinner ? true : false}
                  options={{
                    search: true,
                    showTitle: false,
                    searchFieldAlignment: "left",
                    pageSize: 10,
                    emptyRowsWhenPaging: false,
                    pageSizeOptions: [5, 10, 20, 50, 100],
                  }}
                />
              )}
              {tableShow === "payment" && (
                <MaterialTable
                  columns={paymentVoucharColumns}
                  data={paymentVouchar}
                  // isLoading= {spinner ? true : false}
                  options={{
                    search: true,
                    showTitle: false,
                    searchFieldAlignment: "left",
                    pageSize: 10,
                    emptyRowsWhenPaging: false,
                    pageSizeOptions: [5, 10, 20, 50, 100],
                  }}
                  style={{ zIndex: 0 }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="transaction-invoice">
        <div
          style={{ paddingLeft: "35px", paddingRight: "35px" }}
          ref={componentRef}
          className="invoice-print"
        >
          <div className="invoice-pharmacy-details d-flex justify-content-center">
            <div className="text-center">
              <h5>{user?.organization?.name}</h5>
              <p>Location : {user?.organization?.address}</p>
              <p>Tel : {user?.organization?.mobile}</p>
              <p>Vat Reg No :534565 </p>
              <h6 className="mt-2">CASH MEMO</h6>
            </div>
          </div>
          <div className="invoice-date invoice-border-dashed">
            {/* <p style={{ textAlign: 'center' }}>Invoice No : {invoiceData?.invoice?.invoice_no} </p>
                        <p style={{ textAlign: 'center' }}>Sales Person : Dummy </p> */}
            <div>
              <p> Name: {invoiceData.invoice?.member_name}</p>
              <p>Phone Number: {invoiceData.invoice?.member_phone}</p>
              {/* <p>Sales Person : Dummy </p> */}
            </div>
            <div className="d-flex justify-content-between">
              <p style={{ textAlign: "center" }}>
                Date :
                {moment(invoiceData?.invoice?.created_at).format("DD/MM/YYYY")}
              </p>
              <p style={{ textAlign: "center" }}>
                Time :
                {moment(invoiceData?.invoice?.created_at).format("hh:mm:ss")}
              </p>
            </div>
          </div>
          <div className="invoice-item-table">
            <table>
              <tr className="invoice-border-dashed">
                <td width={"51%"}>Item</td>
                <td width={"15%"} className="text-right">
                  Qty
                </td>
                <td width={"20%"} className="text-right">
                  Price
                </td>
                <td width={"15%"} className="text-right">
                  Total Price
                </td>
              </tr>
              {invoiceData.invoiceDetails.map((item, i) => (
                <tr key={i}>
                  <td width={"50%"}>
                    {item.name ? item.name : item.drug?.macrohealth_sg}
                  </td>
                  <td width={"15%"} className="text-start">
                    {item.pcs || item.qty}
                  </td>
                  <td width={"20%"} className="text-start">
                    {item.price}
                  </td>
                  <td width={"15%"} className="text-end">
                    {item.toalPriceWitoutDiscount
                      ? Number(item.toalPriceWitoutDiscount).toFixed(2)
                      : (parseFloat(item.qty) * parseFloat(item.price)).toFixed(
                          2
                        )}
                  </td>
                </tr>
              ))}
              <tr className="invoice-border-dashed-top">
                <td colSpan={3} className="text-end fw-bolder">
                  Sub Total :
                </td>
                <td className="text-end">
                  {Number(invoiceData.invoice?.grand_total).toFixed(2)}
                </td>
              </tr>

              <tr>
                <td colSpan={3} className="text-end">
                  VAT / TAX :
                </td>
                <td className="text-end">{0}</td>
              </tr>

              <tr>
                <td colSpan={3} className="text-end">
                  Discount :
                </td>
                <td className="text-end">
                  {parseFloat(invoiceData?.invoice?.special_discount || 0)}{" "}
                </td>
              </tr>
              {/* <tr>
                <td colSpan={3} className='text-end'>
                  Special Discount :
                </td>
                <td className='text-end'>{0} </td>
              </tr> */}
              <tr className="invoice-border-dashed-top">
                <td colSpan={3} className="text-end fw-bold">
                  Bill Total :
                </td>
                <td className="text-end">
                  {parseFloat(
                    parseFloat(invoiceData?.invoice?.grand_total || 0) -
                      parseFloat(invoiceData?.invoice?.special_discount || 0)
                  ).toFixed(2)}
                </td>
              </tr>
            </table>
          </div>
          <div className=" invoice-creator mt-1">
            <p>Provided By: Cashier</p>
            {/* <p>Time : {new Date().toLocaleTimeString()}</p> */}
            {/* <p>Date : {new Date().toLocaleDateString('en-GB')} </p> */}
          </div>

          <div>
            <p className="border-bottom w-50 mt-2 fw-bold">
              Terms & Condition:
            </p>
            <p>১. ক্যাশ মেমো ছাড়া ওষুধ ফেরত নেওয়া হয় না ।</p>
            <p>২. বিক্রিত ওষুধ ৭ দিন পর ফেরত নেওয়া হয় না ।</p>
            <p>৩. ইনসুলিন ও বিদেশী ওষুধ ফেরত নেওয়া হয় না ।</p>
            <p>৪. বিক্রিত ওষুধ এর টাকা ফেরত দেওয়া হয় না ।</p>
            <p>৫. কাটা ছেড়া ও ফ্রিজের বিক্রিত ওষুধ ফেরত নেওয়া হয় না । </p>
          </div>
          <div className="branding-section mt-3 mx-auto text-center mx-auto">
            <p>Technology Partner Zaimah Technologies Ltd.</p>
          </div>

          <div className="invoice-greeting d-flex justify-content-center align-items-center mt-1">
            <Barcode displayValue={false} height={40} width={3} value={16} />
          </div>
          <div className="d-flex justify-content-center branding-section">
            <p>Thank You</p>
          </div>
        </div>
      </div>

      <div ref={reportRef} className="daily-report">
        <div className="d-flex justify-content-center">
          <div className="text-center">
            <h5>{user?.organization?.name}</h5>
            <p>Location : {user?.organization?.address}</p>
            <p>Tel : {user?.organization?.mobile}</p>
            <p>Vat Reg No :534565 </p>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <h6>Daily Sales Statement Report </h6>
          {filterData.startDate && filterData.endDate && (
            <h6>
              Dated: {moment(filterData.startDate).format("DD/MM/YYYY")} to
              {moment(filterData.endDate).format("DD/MM/YYYY")}
            </h6>
          )}
          {!filterData.startDate && !filterData.endDate && (
            <h6>Dated: {moment(new Date()).format("DD/MM/YYYY")}</h6>
          )}
        </div>
        <div className="daily-sales-report-table mt-3">
          {filterBy === "company" ? (
            <>
              <table>
                <tbody>
                  <tr>
                    <td>SL</td>
                    <td>Invoice No</td>
                    <td>Date</td>
                    <td>Drug Name</td>
                    <td>Price</td>
                    <td>Qty</td>
                    <td>Total Price</td>
                  </tr>
                  {reportData.map((item, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{item.invoice_no}</td>
                      <td>{moment(item.created_at).format("DD/MM/YYYY")}</td>
                      <td>{item.macrohealth_sg}</td>
                      <td>{item.price}</td>
                      <td>{item.qty}</td>
                      <td>
                        {Number(item.toal_price_witout_discount).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={6} className="text-end fw-bold">
                      Grand Total :
                    </td>
                    <td className="">
                      {reportData
                        .reduce(
                          (total, current) =>
                            total + Number(current.toal_price_witout_discount),
                          0
                        )
                        .toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            <>
              <table>
                <tbody>
                  <tr>
                    <td>SL</td>
                    <td>Invoice No</td>
                    <td>Date</td>
                    <td>Drug Name</td>
                    <td>Price</td>
                    <td>Qty</td>
                    <td>Total Price</td>
                  </tr>
                  {reportData.map((item, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{item.invoice?.invoice_no}</td>
                      <td>{moment(item.created_at).format("DD/MM/YYYY")}</td>
                      <td>{item.drug?.macrohealth_sg}</td>
                      <td>{item.drug?.price}</td>
                      <td>{item.qty}</td>
                      <td>
                        {Number(item.toal_price_witout_discount).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={6} className="text-end fw-bold">
                      Grand Total :
                    </td>
                    <td className="">
                      {reportData
                        .reduce(
                          (total, current) =>
                            total + Number(current.toal_price_witout_discount),
                          0
                        )
                        .toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>

              {
                <>
                  <h6 className="text-center">Return Report</h6>
                  <table>
                    <tbody>
                      <tr>
                        <td>SL</td>
                        <td>Invoice No</td>
                        <td>Date</td>
                        <td>Drug Name</td>
                        <td>Price</td>
                        <td>Qty</td>
                        <td>Total Price</td>
                      </tr>
                      {returnReportData.map((item, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{item.invoice?.return_invoice_no}</td>
                          <td>
                            {moment(item.created_at).format("DD/MM/YYYY")}
                          </td>
                          <td>{item.drug?.macrohealth_sg}</td>
                          <td>{item.drug?.price}</td>
                          <td>{item.qty}</td>
                          <td>{Number(item.total_price).toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={6} className="text-end fw-bold">
                          Grand Total :
                        </td>
                        <td className="">
                          {returnReportData
                            .reduce(
                              (total, current) =>
                                total +
                                parseFloat(current.invoice?.total_amount),
                              0
                            )
                            .toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </>
              }
            </>
          )}
        </div>
      </div>

      <div ref={memberReportRef} className="daily-report">
        <div className="d-flex justify-content-center">
          <div className="text-center">
            <h5>{user?.organization?.name}</h5>
            <p>Location : {user?.organization?.address}</p>
            <p>Tel : {user?.organization?.mobile}</p>
            <p>Vat Reg No :534565 </p>
          </div>
        </div>
        {memberReportData.length > 0 ? (
          <>
            <div className="d-flex justify-content-between mt-2">
              <h6>Customer Sales Statement Report </h6>
              {filterData.startDate && filterData.endDate && (
                <h6>
                  Dated: {moment(filterData.startDate).format("DD/MM/YYYY")} to
                  {moment(filterData.endDate).format("DD/MM/YYYY")}
                </h6>
              )}
              {!filterData.startDate && !filterData.endDate && (
                <h6>Dated: {moment(new Date()).format("DD/MM/YYYY")}</h6>
              )}
            </div>
            <div className="daily-sales-report-table mt-3">
              <table>
                <tbody>
                  <tr>
                    <td>SL</td>
                    <td>Invoice No</td>
                    <td>Date</td>
                    <td>Name</td>
                    <td>Mobile No</td>
                    <td>Payment Status</td>
                    <td>Total Price</td>
                  </tr>
                  {memberReportData.map((item, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{item.invoice_no}</td>
                      <td>{moment(item.created_at).format("DD/MM/YYYY")}</td>
                      <td>{item.member?.member_name}</td>
                      <td>{item.member?.member_phone}</td>
                      <td>{item.payment_status}</td>
                      <td>{item.grand_total}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={6} className="text-end fw-bold">
                      Grand Total :
                    </td>
                    <td className="">
                      {memberReportData.reduce(
                        (total, current) => total + Number(current.grand_total),
                        0
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="d-flex mt-5 justify-content-center">
            <h6 className="text-danger">No Data Found</h6>
          </div>
        )}
      </div>
      <div ref={brandReportRef} className="daily-report">
        <div className="d-flex justify-content-center">
          <div className="text-center">
            <h5>{user?.organization?.name}</h5>
            <p>Location : {user?.organization?.address}</p>
            <p>Tel : {user?.organization?.mobile}</p>
            <p>Vat Reg No :534565 </p>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <h6> Sales Report :{brandReportData[0]?.drug?.drug_name} </h6>
          {filterData.startDate && filterData.endDate && (
            <h6>
              Dated: {moment(filterData.startDate).format("DD/MM/YYYY")} to
              {moment(filterData.endDate).format("DD/MM/YYYY")}
            </h6>
          )}
          {!filterData.startDate && !filterData.endDate && (
            <h6>Dated: {moment(new Date()).format("DD/MM/YYYY")}</h6>
          )}
        </div>
        <div className="daily-sales-report-table mt-3">
          <table>
            <tbody>
              <tr>
                <td>SL</td>
                <td>Invoice No</td>
                <td>Date</td>
                <td>Drug Name</td>
                <td>Price</td>
                <td>Qty</td>
                <td>Total Price</td>
              </tr>
              {brandReportData.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.invoice?.invoice_no}</td>
                  <td>
                    {moment(item.invoice?.created_at).format("DD/MM/YYYY")}
                  </td>
                  <td>{item.drug?.macrohealth_sg}</td>
                  <td>{item.drug?.price}</td>
                  <td>{item.qty}</td>
                  <td>{Number(item.toal_price_witout_discount).toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={6} className="text-end fw-bold">
                  Grand Total :
                </td>
                <td className="">
                  {Number(
                    brandReportData.reduce(
                      (total, current) =>
                        total + Number(current.toal_price_witout_discount),
                      0
                    )
                  ).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div ref={paymentInvoiceRef} className="daily-report">
        <PaymentInvoice data={paymentInvoiceData} />
      </div>
    </div>
  );
};

export default PosTransaction;
