import React, { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import MaterialTable from "material-table";
import AuthUser from "../../../../Components/AuthUser";
import { toast } from "react-toastify";
import ReactDatePicker from "react-datepicker";
import { useQuery } from "react-query";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Modal from "react-modal";
function AddManagerMaterialReceiving() {
  const alertToast = (text) => toast.error(text);

  const navigate = useNavigate();
  const { http, user } = AuthUser();

  const [supplier, setSupplier] = useState([]);
  const [manufacturer_id, setMNId] = useState("");
  const [due_amount, setDueAmount] = useState(0);
  const [paid_amount, setPaidAmount] = useState();
  const [paidBtn, setPaidBtn] = useState(false);

  const [req_po_data, setMrrInput] = useState({});

  const someDate = new Date();
  const date = someDate.setDate(someDate.getDate());
  const defaultDate = new Date(date).toISOString().split("T")[0];

  const handlePaidInput = (e) => {
    const paid = e.target.value;
    if (paid > 0 && paid <= total_bill_amount) {
      setPaidBtn(true);
      setPaidAmount(paid);
    }

    const due_amount = total_bill_amount - paid;
    if (due_amount < 0) {
      setDueAmount(0);
    } else {
      setDueAmount(due_amount.toFixed(2));
    }
    if (paid < 1) {
      setPaidBtn(false);
    }
  };

  const [selectedSuppValue, setSuppSelect] = useState("");
  const [brands, setBrands] = useState([]);
  const handleSuppChange = (e) => {
    setSuppSelect(e.id);
    setMNId(e.id);
    http.get(`/supplier-brands/${e.id}`).then((res) => {
      if (res.status === 200) {
        if (res.data.data.length > 0) {
          setBrands(res.data.data);
        }
      }
    });
  };

  const [cart, setCart] = useState([]);
  const [vatOn, setOnVat] = useState(false);
  const [type, setType] = useState({
    vat: "fixed",
    discount: "fixed",
    vatAmount: 0,
    discountAmount: 0,
  });
  console.log("cart Data:->", cart);
  const total_amount = cart.reduce(
    (total, item) => total + parseFloat(item.price) * parseFloat(item.pcs),
    0
  );
  const [discount, setDiscount] = useState(0);
  const handleDiscountInput = (e) => {
    const { value } = e.target;
    let disc = (parseFloat(total_amount) * parseFloat(value)) / 100;
    setDiscount(disc ? disc.toFixed(2) : 0);
  };
  // const vat_amount = cart.reduce(
  //   (total, item) => total + type.vat === "percentage" ? (parseFloat(item.vat ? item.vat : 0) * parseFloat(item.pcs) * parseFloat(item.price)) : (parseFloat(item.vat ? item.vat : 0) * parseFloat(item.pcs)), 0
  // )
  const vat_amount = cart.reduce(
    (total, item) =>
      total + parseFloat(item.vat ? item.vat : 0) * parseFloat(item.pcs),
    0
  );
  const discountAmount = cart.reduce(
    (total, item) =>
      total +
      parseFloat(item.discount ? item.discount : 0) * parseFloat(item.pcs),
    0
  );
  const total_bill_amount = total_amount + vat_amount - discountAmount;
  const removeMedicine = (item) => {
    const existCart = [...cart];
    const newCart = existCart.filter((pd) => pd.id !== item.id);
    setCart(newCart);
  };
  // No of Box
  const boxSizeHandler = (item, e) => {
    const existCart = [...cart];
    existCart.map((pd) => {
      if (pd.id === item.id) {
        // const temp = e.target.value;
        const temp = parseFloat(e.target.value);
        if (!temp || temp < 0) {
          pd.noOfBox = 0;
          pd.pcs = 0;
          pd.totalPrice = 0;
        } else {
          pd.noOfBox = parseFloat(e.target.value);
          pd.pcs = (
            pd.noOfBox * parseFloat(item.pktSize ? item.pktSize : 0)
          ).toFixed(2);
          pd.price =
            parseFloat(item.trade_price_box ? item.trade_price_box : 0) /
            parseFloat(item.pktSize);
          pd.drug_price =
            parseFloat(item.trade_price_box ? item.trade_price_box : 0) /
            parseFloat(item.pktSize);
          pd.req_unit = (
            pd.noOfBox * parseFloat(item.pktSize ? item.pktSize : 0)
          ).toFixed(2);
          pd.totalPrice =
            parseFloat(pd.drug_price) * parseFloat(pd.pcs) +
            parseFloat(pd.vat ? pd.vat : 0) * parseFloat(pd.pcs ? pd.pcs : 0) -
            parseFloat(discount ? discount : 0) *
              parseFloat(pd.pcs ? pd.pcs : 0);
          // pd.totalPrice = pd.price * item.pcs*parseFloat(e.target.value);
        }
      }
    });
    setCart(existCart);
  };
  // Box Pkt Size
  const boxPktSizeHandler = (item, e) => {
    const existCart = [...cart];
    existCart.map((pd) => {
      if (pd.id === item.id) {
        let totalVat = parseFloat(item.totalVat ? item.totalVat : 0);
        // let vat = type.vat === "percentage" ? (totalVat * parseFloat(pd.pcs) * parseFloat(pd.price)) / 100 : totalVat
        const temp = parseFloat(e.target.value);
        if (!temp || temp < 1) {
          pd.pcs = 0;
          pd.totalPrice = 0;
          pd.pktSize = 0;
        } else {
          pd.pktSize = parseFloat(e.target.value);
          pd.pcs = (
            parseFloat(pd.noOfBox) * parseFloat(item.pktSize ? item.pktSize : 0)
          ).toFixed(2);
          pd.req_unit = (
            parseFloat(pd.noOfBox) * parseFloat(item.pktSize ? item.pktSize : 0)
          ).toFixed(2);
          pd.price = parseFloat(pd.trade_price_box) / parseFloat(pd.pktSize);
          pd.drug_price =
            parseFloat(pd.trade_price_box) / parseFloat(pd.pktSize);
          let vat =
            type.vat === "percentage"
              ? (totalVat * parseFloat(pd.pcs) * parseFloat(pd.price)) /
                100 /
                parseFloat(pd.pcs)
              : (totalVat * parseFloat(pd.noOfBox)) / parseFloat(pd.pcs);
          pd.vat = parseFloat(vat ? vat : 0);
        }
      }
    });
    setCart(existCart);
  };
  // TP Price
  const drugPriceHandler = (row, e) => {
    const existCart = [...cart];
    const { value } = e.target;
    if (value > 0) {
      existCart.map((item) => {
        if (item.id === row.id) {
          let trade_price_box = parseFloat(value);
          let price = parseFloat(value) / parseFloat(row.pktSize);
          let pcs = parseFloat(row.noOfBox) * parseFloat(row.pktSize);
          let total_price =
            parseFloat(value) * parseFloat(row.noOfBox) +
            parseFloat(row.vat ? row.vat : 0) * parseFloat(row.pcs) -
            parseFloat(row.discount ? row.discount : 0) *
              parseFloat(row.pcs ? row.pcs : 0);
          item.trade_price_box = trade_price_box ? trade_price_box : 0;
          item.price = price ? price : 0;
          item.drug_price = price ? price : 0;
          item.pcs = pcs ? pcs : 0;
          item.req_unit = pcs ? pcs : 0;
          item.totalPrice = total_price ? total_price : 0;
        }
      });
    } else {
      existCart.map((item) => {
        if (item.id === row.id) {
          item.trade_price_box = 0;
        }
      });
    }
    setCart(existCart);
  };
  // vat type change
  const handleVatTypeChange = (e) => {
    const { checked } = e.target;
    const existCart = [...cart];
    if (checked) {
      setType({ ...type, vat: "percentage" });
      existCart.map((item) => {
        let existingVat = parseFloat(item.totalVat ? item.totalVat : 0);
        let vat_amount =
          (parseFloat(item.price) *
            parseFloat(item.pcs) *
            parseFloat(existingVat)) /
          100;
        let vat = parseFloat(vat_amount) / parseFloat(item.pcs);
        item.vat = vat ? vat : 0;
        item.totalPrice =
          parseFloat(item.price) * parseFloat(item.pcs) +
          parseFloat(vat_amount) -
          parseFloat(item.discount ? item.discount : 0) *
            parseFloat(item.pcs ? item.pcs : 0);
      });
      setCart(existCart);
    } else {
      setType({ ...type, vat: "amount" });
      existCart.map((item) => {
        let existingVat = parseFloat(item.totalVat ? item.totalVat : 0);
        let vat_amount = parseFloat(existingVat) * parseFloat(item.noOfBox);
        let vat = parseFloat(vat_amount) / parseFloat(item.pcs);
        item.vat = vat ? vat : 0;
        item.totalPrice =
          parseFloat(item.price) * parseFloat(item.pcs) +
          parseFloat(vat_amount) -
          parseFloat(item.discount ? item.discount : 0) *
            parseFloat(item.pcs ? item.pcs : 0);
      });
      setCart(existCart);
    }
  };
  // vat modal data
  const vatAllHandler = (e) => {
    const existCart = [...cart];
    const value = parseFloat(type.vatAmount);
    existCart.map((item) => {
      let vat_amount =
        (parseFloat(item.price) * parseFloat(item.pcs) * parseFloat(value)) /
        100;
      // let vat = parseFloat(vat_amount) / ((parseFloat(item.pcs) * parseFloat(item.price)));
      let vat = parseFloat(vat_amount) / parseFloat(item.pcs);
      item.vat = vat ? vat : 0;
      item.totalVat = parseFloat(value > 0 ? value : 0);
      item.totalPrice =
        parseFloat(item.price) * parseFloat(item.pcs) +
        parseFloat(vat_amount) -
        parseFloat(item.discount ? item.discount : 0) *
          parseFloat(item.pcs ? item.pcs : 0);
    });
    setCart(existCart);
    setIsOpen(false);
    setOnVat(true);
    setType({ ...type, vat: "percentage" });
  };
  const vatHandler = (row, e) => {
    const existCart = [...cart];
    const { value } = e.target;
    existCart.map((item) => {
      if (item.id === row.id) {
        if (type.vat === "percentage") {
          let vat_amount =
            (parseFloat(item.price) *
              parseFloat(item.pcs) *
              parseFloat(value)) /
            100;
          console.log(vat_amount, "vat_amount");
          // let vat = parseFloat(vat_amount) / ((parseFloat(item.pcs) * parseFloat(item.price)));
          let vat = parseFloat(vat_amount) / parseFloat(item.pcs);
          item.vat = vat ? vat : 0;
          item.totalVat = parseFloat(value > 0 ? value : 0);
          item.totalPrice =
            parseFloat(item.price) * parseFloat(item.pcs) +
            parseFloat(vat_amount ? vat_amount : 0) -
            parseFloat(item.discount ? item.discount : 0) *
              parseFloat(item.pcs ? item.pcs : 0);
        } else {
          let vat_amount = parseFloat(value) * parseFloat(item.noOfBox);
          console.log(vat_amount, "vat_amount");
          let vat = parseFloat(vat_amount) / parseFloat(item.pcs);
          item.vat = vat ? vat : 0;
          item.totalVat = parseFloat(value > 0 ? value : 0);
          item.totalPrice =
            parseFloat(item.price) * parseFloat(item.pcs) +
            parseFloat(vat_amount) -
            parseFloat(item.discount ? item.discount : 0) *
              parseFloat(item.pcs ? item.pcs : 0);
        }
      }
    });
    setCart(existCart);
  };
  // Bonus Qty
  const bonusQtyHandler = (row, e) => {
    const existCart = [...cart];
    const { value } = e.target;
    existCart.map((item) => {
      if (item.id === row.id) {
        let bonusQty = parseFloat(value);
        item.bonus_qty = bonusQty ? bonusQty : 0;
      }
    });
    setCart(existCart);
  };
  // Quantity
  const qtyHandler = (row, e) => {
    const existCart = [...cart];
    const { value } = e.target;
    existCart.map((item) => {
      if (item.id === row.id) {
        let qty = parseFloat(value);
        item.pcs = qty ? qty : 0;
        item.req_unit = qty ? qty : 0;
        item.noOfBox = qty ? qty / parseFloat(item.pktSize) : 0;
        item.price = item.pktSize
          ? parseFloat(item.trade_price_box) / parseFloat(item.pktSize)
          : 0;
        item.totalPrice =
          parseFloat(item.price) * parseFloat(item.pcs) +
          parseFloat(item.vat ? item.vat : 0) * parseFloat(item.pcs) -
          parseFloat(item.discount ? item.discount : 0);
      }
    });
    setCart(existCart);
  };
  //
  const discountAllHandler = (e) => {
    if (total_amount > 0) {
      const existCart = [...cart];
      const value = parseFloat(type.discountAmount ? type.discountAmount : 0);

      if (type.discount === "fixed") {
        const dsc =
          value /
          existCart.reduce(
            (total, item) => total + parseFloat(item.pcs ? item.pcs : 0),
            0
          );
        const dscTotal =
          (value * 100) /
          existCart.reduce(
            (total, item) =>
              total +
              parseFloat(item.pcs ? item.pcs : 0) *
                parseFloat(item.price ? item.price : 0),
            0
          );
        existCart.map((item) => {
          // item.totalDiscount = (value * 100) / (parseFloat(item.pcs ? item.pcs : 0) * parseFloat(item.price ? item.price : 0));
          item.totalDiscount = dscTotal ? dscTotal : 0;
          // item.discount = parseFloat(value) / parseFloat(item.pcs ? item.pcs : 0);
          item.discount = parseFloat(dsc ? dsc : 0);
          item.totalPrice =
            parseFloat(item.price) * parseFloat(item.pcs) +
            parseFloat(item.vat ? item.vat : 0) *
              parseFloat(item.pcs ? item.pcs : 0) -
            parseFloat(item.discount ? item.discount : 0) *
              parseFloat(item.pcs ? item.pcs : 0);
        });
        setCart(existCart);
      } else {
        existCart.map((item) => {
          let disc =
            (parseFloat(item.price) *
              parseFloat(item.pcs) *
              parseFloat(value)) /
            100 /
            parseFloat(item.pcs);
          item.totalDiscount = parseFloat(value > 0 ? value : 0);
          item.discount = disc ? disc : 0;
          item.totalPrice =
            parseFloat(item.price) * parseFloat(item.pcs) +
            parseFloat(item.vat ? item.vat : 0) * parseFloat(item.pcs) -
            parseFloat(item.discount ? item.discount : 0) *
              parseFloat(item.pcs ? item.pcs : 0);
        });
        setCart(existCart);
      }

      setDiscountIsOpen(false);
      setType({ ...type, discount: "percentage" });
      setOnVat(true);
    } else {
      toast.error("Please add no of boxes");
    }
  };
  const discountHandler = (row, e) => {
    const existCart = [...cart];
    const { value } = e.target;
    existCart.map((item) => {
      if (item.id === row.id) {
        let disc =
          (parseFloat(item.price) * parseFloat(item.pcs) * parseFloat(value)) /
          100 /
          parseFloat(item.pcs);
        console.log(disc, "disc");
        item.totalDiscount = parseFloat(value > 0 ? value : 0);
        item.discount = disc ? disc : 0;
        item.totalPrice =
          parseFloat(item.price) * parseFloat(item.pcs) +
          parseFloat(item.vat ? item.vat : 0) * parseFloat(item.pcs) -
          parseFloat(item.discount ? item.discount : 0) *
            parseFloat(item.pcs ? item.pcs : 0);
      }
    });
    setCart(existCart);
  };

  // product requisition

  const [errors, setError] = useState([]);

  const [form_data, setFormData] = useState({
    purchase_order_no_id: "",
    reference_order_no: "",
    reference_invoice_no: "",
    manufacturer_id: "",
    supplier_id: "",
    // expiry_date: "",
    mrr_no: "",
    carrier_id: "",
    delivery_date: defaultDate,
    carried_by: "",
    contact_no: "",
    vehicle_no: "",
    remarks: "",
    total_bill_amount: "",
    paid_amount: "",
    due_amount: "",
    delivery_no_docs: "",
    payment_type: "",
    mrr_expiry_date: "",
  });

  const handleInput = (e) => {
    setFormData({
      ...form_data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    http.get("supplier").then((res) => {
      setSupplier(res.data.data);
    });

    http.get(`/material-receiving`).then(async (res) => {
      if (res.data.data.length !== 0) {
        const rendomNumber = `P-${res.data.data[0].id + 10001}`;
        setFormData({
          ...form_data,
          mrr_no: rendomNumber,
        });
      } else {
        setFormData({
          ...form_data,
          mrr_no: "P-10001",
        });
      }
    });
  }, []);

  const columnsData = [
    {
      title: "Name",
      field: "macrohealth_sg",
      width: "100 !important",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Box Type",
      field: "boxType",
      render: (row) => (
        <div className="text-capitalize text-center">{row.boxType}</div>
      ),
    },
    {
      title: "Pkt Size",
      field: "pktSize",
      render: (row) => (
        // <div className='text-capitalize text-center'>{row.pktSize}</div>
        <div className="w-[40%] mx-auto">
          <input
            onChange={(e) => boxPktSizeHandler(row, e)}
            value={row.pktSize}
            style={{ width: "80px", margin: "auto" }}
            className="form-control form-control-sm text-center"
            type="number"
          />
        </div>
      ),
    },
    {
      title: "No. of Box/Bottle",
      field: "noOfBox",
      render: (row) => (
        <div className="w-[40%] mx-auto">
          <input
            onChange={(e) => boxSizeHandler(row, e)}
            value={row.noOfBox}
            style={{ width: "80px", margin: "auto" }}
            className="form-control form-control-sm text-center"
            type="number"
          />
        </div>
      ),
    },
    {
      title: "Unit",
      field: "unit",
      render: (row) => (
        <div className="text-capitalize text-center">{row.unit}</div>
      ),
    },

    {
      title: "PP",
      field: "drug_price",
      render: (row) => (
        <>{parseFloat(row.drug_price ? row.drug_price : 0).toFixed(2)}</>
      ),
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Quantity",
      field: "req_unit",
      render: (row) => (
        <div className="w-[100%]">
          <input
            className="form-control form-control-sm"
            value={row.pcs}
            style={{ width: "80px", margin: "auto" }}
            type="number"
            onChange={(e) => qtyHandler(row, e)}
          />
        </div>
      ),
    },
    {
      title: "Bonus Qty (Pcs)",
      field: "vat",
      render: (row) => (
        <div className="w-[100%]">
          <input
            className="form-control form-control-sm text-center"
            value={row.bonus_box}
            style={{ width: "80px", margin: "auto" }}
            type="number"
            onChange={(e) => bonusQtyHandler(row, e)}
          />
        </div>
      ),
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "TP",
      field: "totalPrice",
      render: (row) => (
        <div className="w-[100%]">
          <input
            className="form-control form-control-sm text-center"
            value={row.trade_price_box}
            style={{ width: "80px", margin: "auto" }}
            type="number"
            onChange={(e) => drugPriceHandler(row, e)}
          />
        </div>
      ),
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: `VAT ${type.vat === "percentage" ? "%" : ""}`,
      field: "vat",
      render: (row) => (
        <div className="w-[100%]">
          <input
            className="form-control form-control-sm text-center"
            style={{ width: "80px", margin: "auto" }}
            onChange={(e) => vatHandler(row, e)}
            value={row.totalVat}
            type="number"
            disabled={parseFloat(row?.noOfBox) > 0 ? false : true}
          />
        </div>
      ),
      cellStyle: {
        textAlign: "center",
      },
      hidden: !vatOn,
    },

    {
      title: "Discount (%)",
      field: "vat",
      render: (row) => (
        <div className="w-[100%]">
          <input
            className="form-control form-control-sm text-center"
            style={{ width: "80px", margin: "auto" }}
            onChange={(e) => discountHandler(row, e)}
            value={row.totalDiscount}
            disabled={parseFloat(row?.totalPrice) > 0 ? false : true}
            type="text"
          />
        </div>
      ),
      cellStyle: {
        textAlign: "center",
      },
      hidden: !vatOn,
    },

    {
      title: "Total Price + Vat - Discount ",
      field: "totalPrice",
      render: (row) => (
        <>{parseFloat(row.totalPrice).toFixed(2)}</>
        // <>{(parseFloat(row.price) * parseFloat(row.pcs)) + (parseFloat(row.vat ? row.vat : 0) * parseFloat(row.pcs)) - parseFloat(row.discount ? row.discount : 0) * parseFloat(row.pcs ? row.pcs : 0).toFixed(2)}</>
      ),

      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Action",
      field: "action",
      render: (row) => (
        <div className="d-flex justify-content-center gap-2">
          <div>
            <button
              type="button"
              onClick={() => removeMedicine(row)}
              className="btn btn-sm action-btn"
            >
              <i className="far fa-trash"></i>
            </button>
          </div>
        </div>
      ),
    },
  ];
  console.log(cart, "delivery_no_docs");
  const [loading, setLoading] = useState(false);
  const submitFormData = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("purchase_order_no_id", 0);
    formData.append("reference_order_no", form_data.reference_order_no);
    formData.append("reference_invoice_no", form_data.reference_invoice_no);
    formData.append("manufacturer_id", manufacturer_id);
    formData.append("supplier_id", selectedSuppValue);
    formData.append("mrr_expiry_date", form_data.mrr_expiry_date);
    formData.append("mrr_no", form_data.mrr_no);
    formData.append("carrier_id", 0);
    formData.append("delivery_date", form_data.delivery_date);
    formData.append("carried_by", form_data.carried_by);
    formData.append("contact_no", user.mobile);
    formData.append("vehicle_no", form_data.vehicle_no);
    formData.append("remarks", form_data.remarks);
    formData.append("total_bill_amount", total_bill_amount);
    formData.append("vat", vat_amount);
    formData.append(
      "paid_amount",
      paid_amount > total_bill_amount ? total_bill_amount : paid_amount
    );
    formData.append(
      "due_amount",
      form_data.payment_type === "due" ? total_bill_amount : due_amount
    );
    formData.append("payment_type", form_data.payment_type);
    formData.append("delivery_no_docs", "");
    formData.append("delivery_chalan_docs", "");
    formData.append("invoice_no_docs", "");
    formData.append("cart", JSON.stringify(cart));
    formData.append("user_email", user.email);
    formData.append("supplier_email", req_po_data.supplier_email);
    formData.append("po_no", req_po_data.purchase_order_no);
    formData.append("special_discount", discountAmount);
    // formData.append('mrr_status',  'New');

    http.post(`save-manager-material-receiving`, formData).then((res) => {
      console.log("all response", res);

      if (res.data.status === 200) {
        cart.map((item, i) => {
          const academic = new FormData();
          academic.append(
            "material_receiving_master_id",
            `${res.data.data.id}`
          );
          academic.append("drug_id", item.id);
          academic.append("boxType", item.boxType);
          academic.append("box_size", item.box_size ? item.box_size : 1);
          academic.append("pktSize", item.pktSize ? item.pktSize : 1);
          academic.append("noOfBox", item.noOfBox ? item.noOfBox : 1);
          academic.append("disc", item.discount ? item.discount : 0);
          academic.append("vat", item.vat ? item.vat : 0);
          academic.append(
            "trade_price_box",
            item.trade_price_box ? item.trade_price_box : 0
          );
          academic.append("pktSize", item.pktSize ? item.pktSize : 0);

          academic.append("price", item.price);
          academic.append("unit", item.unit);
          academic.append("req_unit", item.req_unit);
          academic.append("bonus_qty", item.bonus_qty ? item.bonus_qty : 0);
          academic.append("totalPrice", item.totalPrice ? item.totalPrice : 0);

          console.log("FromData Academic", academic);

          http.post("save-material-receiving-details", academic).then((res) => {
            console.log("save-material-receiving-details");
          });
        });
        const paymentData = {
          purchase_order_no: res.data.data.id,
          supplier_id: selectedSuppValue,
          mrr_no: form_data.mrr_no,
          total_amount: total_bill_amount.toFixed(2),
          paid_amount: paid_amount,
          due_amount: paid_amount > 0 ? due_amount : total_bill_amount,
          created_by: user.id,
          created_by_name: user.name,
          created_by_email: user.email,
        };
        http.post(`payment-vouchar`, paymentData);
        setLoading(false);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: res.data.message,
          timer: 2500,
        });
        navigate("/manager-material-receiving");
      } else {
        setError(res.data.errors);
        alertToast("Some field is required");
        setLoading(false);
      }
    });
  };
  // medicine select
  const [brand, setBrand] = useState("");
  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };
  const { data } = useQuery(
    brand,
    () => http.get(`/products-salse-counter/${brand}`).then((res) => res.data),
    {
      enabled: !!brand,
    }
  );
  console.log(form_data, "data");
  const formatResult = (item) => {
    return (
      <>
        <div
          onClick={() => {
            medicineSelect(item);
          }}
          className={`row d-flex align-items-center search-format  `}
        >
          <div className="col-5">
            <p>
              {item.macrohealth_sg} - {item?.drug_description}
            </p>
            <p className="ms-2">{item?.generic_Name}</p>
          </div>
          <div className="col-3">
            <p>{item?.brand?.title}</p>
          </div>
          <div className="col-2">
            <p>{parseFloat(item.drug_price || 0).toFixed(2)} tk</p>
          </div>
          <div className="col-2 ">
            <div className="row">
              <div className="col-7">
                <p>
                  {item?.current_stock?.stock ? item.current_stock.stock : 0}
                </p>
              </div>
              <div className="col-3">
                <i
                  style={{ fontSize: "12px" }}
                  className={`fas fa-circle ${
                    item?.current_stock?.stock ? "text-success" : " text-danger"
                  }`}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const medicineSelect = (item) => {
    let alreadyExist = false;
    const newCart = [...cart];

    newCart.map((pd) => {
      if (pd.id === item.id) {
        alreadyExist = true;
      }
    });

    if (!alreadyExist) {
      newCart.push({
        ...item,
        noOfBox: "",
        pcs: "",
        purchase_price_with_vat: parseFloat(item.drug_price),
        totalPrice: 0,
      });
    }
    setCart(newCart);
  };
  const handleVatOn = (e) => {
    setOnVat(!vatOn);
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalDiscountIsOpen, setDiscountIsOpen] = useState(false);
  const customStyles = {
    content: {
      marginTop: "35px",
      marginBottom: "35px",
      top: "33%",
      left: "55%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "400px",
      transform: "translate(-50%, -50%)",
      maxHeight: "90%",
      zIndex: 999999999,
    },
  };
  const closeVatModal = () => {
    setIsOpen(false);
  };
  const closeDiscModal = () => {
    setDiscountIsOpen(false);
  };
  // Medicine select

  return (
    <div className="page-content mrr-data">
      <div className="custom-card patients-head ">
        <h5 className="fw-normal custom_py-3 px-2  text-start mb-2 card-title">
          Purchase In
          <button
            className="btn btn-sm btn-warning float-end"
            onClick={() => navigate(-1)}
          >
            <i className="fal fa-long-arrow-left"></i> Back
          </button>
        </h5>
      </div>

      <div className="row">
        <div className="col-lg-8 col-md-8">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="row mb-1">
                    <label htmlFor="exampleInputUsername2" className="col-sm-5">
                      Reference Invoice No
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        name="reference_invoice_no"
                        onChange={handleInput}
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row mb-1">
                    <label htmlFor="exampleInputUsername2" className="col-sm-5">
                      Reference Order No
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        name="reference_order_no"
                        onChange={handleInput}
                        id="exampleInputUsername2"
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row mb-2">
                    <label htmlFor="exampleInputUsername2" className="col-sm-5">
                      Purchase In No.
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="exampleInputUsername2"
                        onChange={handleInput}
                        value={form_data.mrr_no}
                        name="mrr_no"
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="row mb-2">
                    <label
                      htmlFor="exampleInputUsername2"
                      className="col-sm-5 col-form-label"
                    >
                      Order By
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="exampleInputUsername2"
                        onChange={handleInput}
                        value={user.name}
                        name="requisition_no"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row mb-2">
                    <label htmlFor="exampleInputUsername2" className="col-sm-5">
                      Delivery Date
                    </label>
                    <div className="col-sm-7">
                      {/* {moment().format('DD-MM-YYYY')} */}
                      <ReactDatePicker
                        placeholderText="DD/MM/YYYY"
                        className="form-control form-control-sm custom-datepicker-input-width"
                        selected={
                          form_data.delivery_date &&
                          new Date(form_data.delivery_date)
                        }
                        onChange={(date) =>
                          handleInput({
                            target: { name: "delivery_date", value: date },
                          })
                        }
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="row mb-2">
                    <label htmlFor="exampleInputUsername2" className="col-sm-5">
                      Supplier
                    </label>
                    <div className="col-sm-7">
                      <Select
                        options={supplier}
                        onChange={handleSuppChange}
                        placeholder={"Select"}
                        // isDisabled={true}
                        getOptionLabel={(supplier) =>
                          `${supplier.supplier_name}`
                        }
                        getOptionValue={(supplier) => `${supplier.id}`}
                        value={supplier.filter(
                          (supplier) =>
                            supplier.id === Number(selectedSuppValue)
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mt-1">
                    <div className="">
                      <textarea
                        name="remarks"
                        onChange={handleInput}
                        value={form_data.remarks}
                        className="form-control "
                        placeholder="Remarks..."
                        rows="2"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-2">
                    <h6 className="ms-2">Select Brand</h6>
                  </div>
                  <div className="col-8">
                    {brands.map((brandA, index) => {
                      return (
                        <div
                          className="form-check form-check-inline"
                          key={index}
                        >
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio1"
                            value={brandA.brand_id}
                            onChange={handleBrandChange}
                            checked={
                              parseInt(brand) === parseInt(brandA.brand_id)
                            }
                          />
                          <label
                            className="form-check-label"
                            for="inlineRadio1"
                          >
                            {brandA.brand_name}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="card-body search-box-container medicine-custom-search">
                  {brand && (
                    <ReactSearchAutocomplete
                      showIcon={false}
                      placeholder={"Search Medicine"}
                      items={data?.data}
                      resultStringKeyName="macrohealth_sg"
                      maxResults={5}
                      onSelect={(item) => medicineSelect(item)}
                      autoFocus
                      fuseOptions={{ keys: ["macrohealth_sg"] }} // Search in the description text as well
                      styling={{
                        borderRadius: "5px !important",
                        zIndex: 0,
                        minHeight: "36px",
                        position: "static",
                        height: "36px",
                        fontSize: "13px",
                      }}
                      formatResult={formatResult}
                    />
                  )}

                  {loading && (
                    <i
                      style={{ fontSize: "20px", marginLeft: "50%" }}
                      className=" mt-2 fas fa-spinner fa-spin"
                    ></i>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 requisition_status_blog">
          <div className="card payment_block">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <h6>Payment</h6>
                  <hr className="mrr_heading" />
                  <div className="d-flex">
                    <div className="form-check mb-2">
                      <input
                        type="radio"
                        className="form-check-input mt-1"
                        onChange={handleInput}
                        value="cash"
                        name="payment_type"
                        id="cash_payment1"
                      />
                      <label
                        className="form-check-label me-2"
                        htmlFor="cash_payment1"
                      >
                        Cash
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        type="radio"
                        className="form-check-input mt-1"
                        onChange={handleInput}
                        value="card"
                        name="payment_type"
                        id="card_payment1"
                      />
                      <label
                        className="form-check-label me-2"
                        htmlFor="card_payment1"
                      >
                        Credit/Debit Card
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        type="radio"
                        className="form-check-input mt-1"
                        onChange={(e) => {
                          handleInput(e);
                          setDueAmount(total_bill_amount);
                          setPaidAmount(0);
                        }}
                        value="due"
                        name="payment_type"
                        id="cash_payment1"
                      />
                      <label
                        className="form-check-label me-2"
                        htmlFor="cash_payment1"
                      >
                        Due
                      </label>
                    </div>
                  </div>
                  <div className="row mb-1">
                    <label htmlFor="exampleInputUsername2" className="col-sm-4">
                      Sub Total
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        id="exampleInputUsername2"
                        value={total_amount ? total_amount.toFixed(2) : 0.0}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row mb-1">
                    <label htmlFor="exampleInputUsername2" className="col-sm-4">
                      Vat
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        id="exampleInputUsername2"
                        value={vat_amount ? vat_amount.toFixed(2) : 0.0}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row mb-1">
                    <label htmlFor="exampleInputUsername2" className="col-sm-4">
                      Discount
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        id="exampleInputUsername2"
                        value={discountAmount ? discountAmount.toFixed(2) : 0.0}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row mb-1">
                    <label htmlFor="exampleInputUsername2" className="col-sm-4">
                      Grand Total
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        id="exampleInputUsername2"
                        value={
                          total_bill_amount ? total_bill_amount.toFixed(2) : 0.0
                        }
                        readOnly
                      />
                    </div>
                  </div>
                  {/* <div className='row'>
                    <label
                      htmlFor='exampleInputUsername2'
                      className='col-sm-4'
                    >
                      Special Discount (%)
                      <span>*</span>
                    </label>
                    <div className='col-sm-8'>
                      <input
                        type='number'
                        className='form-control form-control-sm'
                        id='exampleInputUsername2'
                        onChange={handleDiscountInput}
                        name='paid_amount'
                      />
                    </div>
                  </div> */}
                  <div className="row">
                    <label
                      htmlFor="exampleInputUsername2"
                      className="col-sm-4 col-form-label"
                    >
                      Paid
                      <span>*</span>
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        id="exampleInputUsername2"
                        onChange={handlePaidInput}
                        name="paid_amount"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label
                      htmlFor="exampleInputUsername2"
                      className="col-sm-4 col-form-label"
                    >
                      Due
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        id="exampleInputUsername2"
                        readOnly
                        onChange={handleInput}
                        value={due_amount}
                        name="due_amount"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='row mt-2'>
        <div className='col-lg-12 col-md-12'>
          <div className='card'>
            <div className='row mt-2'>
              <div className='col-2'>
                <h6 className='ms-2'>Select Brand</h6>
              </div>
              <div className='col-8'>
                {brands.map((brandA, index) => {
                  return (
                    <div className='form-check form-check-inline' key={index}>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='inlineRadioOptions'
                        id='inlineRadio1'
                        value={brandA.brand_id}
                        onChange={handleBrandChange}
                        checked={parseInt(brand) === parseInt(brandA.brand_id)}
                      />
                      <label className='form-check-label' for='inlineRadio1'>
                        {brandA.brand_name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className='card-body medicine-custom-search'>
              {brand && (
                <ReactSearchAutocomplete
                  showIcon={false}
                  placeholder={'Search Medicine'}
                  items={data?.data}
                  resultStringKeyName='macrohealth_sg'
                  maxResults={5}
                  onSelect={(item) => medicineSelect(item)}
                  autoFocus
                  fuseOptions={{ keys: ['macrohealth_sg'] }} // Search in the description text as well
                  styling={{
                    borderRadius: '5px !important',
                    zIndex: 0,
                    minHeight: '36px',
                    position: 'static',
                    height: '36px',
                    fontSize: '13px',
                  }}
                  formatResult={formatResult}
                />
              )}

              {loading && (
                <i
                  style={{ fontSize: '20px', marginLeft: '50%' }}
                  className=' mt-2 fas fa-spinner fa-spin'
                ></i>
              )}
            </div>
          </div>
        </div>
      </div> */}
      {/*requisition list*/}

      {/* <div className='row mt-2'>
        <div className='col-lg-12 col-md-12'>
          <div className='card'>
            <div className='card-body row'>
              <h6 className='mb-3'>Reference Invoice No</h6>
              <div className='col-md-4'>
                <div className='row mb-1'>
                  <label
                    htmlFor='exampleInputUsername2'
                    className='col-sm-4 col-form-label'
                  >
                    Delivery No
                  </label>
                  <div className='col-sm-8'>
                    <input
                      type='file'
                      name='delivery_no_docs'
                      id='delivery_no_docs'
                      onChange={handleDNCImage}
                      className='col-sm-8 form-control form-control-sm'
                      accept='image/jpg,image/jpeg,image/gif,image/png'
                    />
                    {dnc_image_error == null ? (
                      <p className='doc_image_size'>
                        Image size must be less than 2 mb
                      </p>
                    ) : (
                      <p className='photo_size_error'>{dnc_image_error}</p>
                    )}

                    {DncimageUrl == null ? (
                      ''
                    ) : (
                      <div className='photo_close'>
                        <img
                          src={DncimageUrl}
                          className='photo_preview_url'
                          width='100'
                          height='100'
                          alt='preview'
                        />
                        <i
                          onClick={closeImage}
                          className='far fa-times-circle'
                        ></i>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='row mb-1'>
                  <label
                    htmlFor='invoice_no_docs'
                    className='col-sm-4 col-form-label'
                  >
                    Invoice No
                  </label>
                  <div className='col-sm-8'>
                    <input
                      type='file'
                      name='requisitor_phone_no'
                      onChange={(e) =>
                        setDNCPicture({
                          ...dnc,
                          invoice_no_docs: e.target.files[0],
                        })
                      }
                      className='form-control form-control-sm'
                      id='invoice_no_docs'
                    />
                    {!dnc.invoice_no_docs ? (
                      ''
                    ) : (
                      <div className='photo_close'>
                        <img
                          src={URL.createObjectURL(dnc.invoice_no_docs)}
                          className='photo_preview_url'
                          width='100'
                          height='100'
                          alt='preview'
                        />
                        <i
                          onClick={closeImageInvoice}
                          className='far fa-times-circle'
                        ></i>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='row mb-1'>
                  <label
                    htmlFor='delivery_chalan_docs'
                    className='col-sm-4 col-form-label'
                  >
                    Delivery Chalan No
                  </label>
                  <div className='col-sm-8'>
                    <input
                      type='file'
                      name='requisitor_phone_no'
                      onChange={(e) =>
                        setDNCPicture({
                          ...dnc,
                          delivery_chalan_docs: e.target.files[0],
                        })
                      }
                      className='form-control form-control-sm'
                      id='delivery_chalan_docs'
                    />
                    {!dnc.delivery_chalan_docs ? (
                      ''
                    ) : (
                      <div className='photo_close'>
                        <img
                          src={URL.createObjectURL(dnc.delivery_chalan_docs)}
                          className='photo_preview_url'
                          width='100'
                          height='100'
                          alt='preview'
                        />
                        <i
                          onClick={closeImageChalan}
                          className='far fa-times-circle'
                        ></i>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="row mt-2">
        <div className="col-md-12 col-mg-12 purchase">
          <MaterialTable
            title={<h6 style={{ fontWeight: "500" }}>Product Details</h6>}
            columns={columnsData}
            data={cart}
            options={{
              actionsColumnIndex: -1,
              selection: false,
              search: false,
              showTitle: true,
              pageSize: 5,
              pageSizeOptions: [5, 10, 20, 50, 100],
              emptyRowsWhenPaging: false,
              rowStyle: {
                fontSize: ".75rem",
                textAlign: "center",
              },
              headerStyle: {
                fontSize: ".75rem",
                border: "1px solid #c9c9c9",
                textAlign: "center",
                zIndex: "0",
                whiteSpace: "nowrap",
              },
            }}
            actions={[
              vatOn && {
                icon: () => (
                  <div className="d-flex justify-content-between">
                    <div className="ms-1">
                      <label className="switch me-1">
                        <input
                          name="historyll"
                          type="checkbox"
                          checked={type.vat === "percentage"}
                          onChange={(e) => handleVatTypeChange(e)}
                          id="togBtn"
                        />
                        <div className="slider round"></div>
                      </label>
                    </div>
                    <p className="">VAT Percentage</p>
                  </div>
                ),
                isFreeAction: true,
              },

              {
                icon: () => (
                  <div className="d-flex justify-content-between">
                    <div className="ms-1">
                      <label className="switch me-1">
                        <input
                          name="history"
                          // value={true}
                          checked={vatOn}
                          type="checkbox"
                          onChange={(e) => handleVatOn(e)}
                          id="togBtn"
                        />
                        <div className="slider round"></div>
                      </label>
                    </div>
                    <p className="">Product Wise VAT & Discount</p>
                  </div>
                ),
                isFreeAction: true,
              },
              {
                icon: () => (
                  <>
                    <button
                      className="btn btn-sm btn-success float-end text-uppercase"
                      onClick={() => {
                        setIsOpen(true);
                        setBrand("");
                      }}
                    >
                      <i className="fas fa-save"></i> Vat
                    </button>
                  </>
                ),
                isFreeAction: true,
              },
              {
                icon: () => (
                  <>
                    <button
                      className="btn btn-sm btn-success float-end text-uppercase"
                      onClick={() => {
                        setDiscountIsOpen(true);
                        setBrand("");
                      }}
                    >
                      <i className="fas fa-save"></i> Discount
                    </button>
                  </>
                ),
                isFreeAction: true,
              },
            ]}
          />
        </div>
      </div>

      {(form_data.payment_type === "due" || paidBtn) &&
      !loading &&
      total_bill_amount > 0 ? (
        <button
          className="btn btn-sm btn-success float-end text-uppercase mt-3 me-2"
          onClick={submitFormData}
        >
          <i className="fas fa-save"></i> Save
        </button>
      ) : loading ? (
        <button className="btn btn-sm btn-success float-end disabled text-uppercase mt-3 me-2">
          <i className="fas fa-save"></i> Saving
        </button>
      ) : (
        <button
          disabled
          className="btn btn-sm btn-success float-end text-uppercase mt-3 me-2"
        >
          <i className="fas fa-save"></i> Pay First
        </button>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeVatModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <span className="float-end">
          <i
            className="fal fa-times"
            onClick={closeVatModal}
            style={{ cursor: "pointer" }}
          ></i>
        </span>
        <h6 style={{ fontSize: "14px" }}>Vat</h6>
        <hr />
        <label htmlFor="" className="form-label">
          {" "}
          Vat Amount
        </label>
        <div className="input-group mt-1">
          <input
            type="number"
            value={type.vatAmount}
            onChange={(e) => setType({ ...type, vatAmount: e.target.value })}
            className="form-control"
          />
          <span className="input-group-text">%</span>
        </div>
        <button
          onClick={vatAllHandler}
          className="btn btn-sm btn-success float-end text-uppercase mt-3"
        >
          Save
        </button>
        <button
          onClick={closeVatModal}
          className="btn btn-sm btn-outline-danger float-end text-uppercase mt-3 me-2"
        >
          Cancel
        </button>
      </Modal>
      <Modal
        isOpen={modalDiscountIsOpen}
        onRequestClose={closeDiscModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <span className="float-end">
          <i
            className="fal fa-times"
            onClick={closeDiscModal}
            style={{ cursor: "pointer" }}
          ></i>
        </span>
        <h6 style={{ fontSize: "14px" }}>Discount</h6>
        <hr />
        <div className="mb-2">
          <label htmlFor="" className="form-label">
            {" "}
            Discount Type
          </label>
        </div>
        <div
          className="btn-group"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            onChange={(e) => setType({ ...type, discount: "fixed" })}
            className="btn-check"
            name="btnradio"
            id="btnradio1"
            autocomplete="off"
            checked={type.discount === "fixed"}
          />
          <label className="btn btn-outline-success" for="btnradio1">
            Fixed
          </label>

          <input
            type="radio"
            onChange={(e) => setType({ ...type, discount: "percentage" })}
            className="btn-check"
            name="btnradio"
            id="btnradio2"
            autocomplete="off"
            checked={type.discount === "percentage"}
          />
          <label className="btn btn-outline-success" for="btnradio2">
            Percent
          </label>
        </div>
        <div className="mt-2">
          <label htmlFor="" className="form-label">
            {" "}
            Discount Amount
          </label>
        </div>
        <div className="input-group mt-1">
          <input
            type="number"
            className="form-control"
            value={type.discountAmount}
            onChange={(e) =>
              setType({ ...type, discountAmount: e.target.value })
            }
          />
        </div>
        <button
          onClick={discountAllHandler}
          className="btn btn-sm btn-success float-end text-uppercase mt-3"
        >
          Save
        </button>
        <button
          onClick={closeDiscModal}
          className="btn btn-sm btn-outline-danger float-end text-uppercase mt-3 me-2"
        >
          Cancel
        </button>
      </Modal>
    </div>
  );
}

export default AddManagerMaterialReceiving;
