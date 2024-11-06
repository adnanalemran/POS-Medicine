import React from "react";
import logo from "../../../front_assets/Logo_Image/greatpharmalogo.png";
import moment from "moment";
import AuthUser from "../../../Components/AuthUser";
export default function PaymentInvoice({ data }) {
  const { user } = AuthUser();
  const {
    supplier,
    paid_amount,
    total_amount,
    mrr_no,
    created_at,
    invoice_no,
    due_amount,
    details,
    created_by_name,
    created_by_email,
  } = data;
  return (
    <>
      <div>
        <div className="container-fluid row">
          <div className="col-6 ps-0">
            <div className="d-flex align-items-center">
              <img
                style={{ height: "65px", width: "80px" }}
                className="me-2"
                src={user?.organization?.logo}
                alt=""
              />
              <div>
                <p className="mt-1 mb-1">
                  <b>{user?.organization?.name}</b>
                </p>
                <p>
                  {user?.organization?.address}
                  <br />
                  {user?.organization?.mobile}
                </p>
              </div>
            </div>
          </div>

          <div className="col-6 pe-0">
            <h4 className="fw-bolder text-uppercase text-end mb-2">
              Payment Invoice
            </h4>
            <h6 className="text-end"># {invoice_no}</h6>
            {/*<p className="text-end mb-1">Balance Due</p>*/}
            {/*<h4 className="text-end fw-normal">$ 72,420.00</h4>*/}
            {/*<h6 className="mb-0 mt-3 text-end fw-normal mb-2"><span className="text-muted">Invoice Date :</span> 25rd Jan 2022</h6>*/}
            {/*<h6 className="text-end fw-normal"><span className="text-muted">Due Date :</span> 12th Jul 2022</h6>*/}
          </div>
        </div>

        <div className="row mt-3 po-details">
          <div className="col-6">
            <p className="pt-1">
              <span className="payment-invoice-data">Mrr No</span> : {mrr_no}
            </p>
            <p className="pt-1">
              <span className="payment-invoice-data">Date</span> :
              {moment(created_at).format("DD-MM-YYYY")}
            </p>
            <p className="pt-1">
              <span className="payment-invoice-data">Time</span> :
              {moment(created_at).format("HH:mm")}
            </p>
          </div>

          <div className="col-6 req_details_print">
            <p className="pt-1">
              <span className="payment-invoice-data">Supplier</span> :
              {supplier?.supplier_name}
            </p>
            <p className="pt-1">
              <span className="payment-invoice-data">Created By</span> :
              {created_by_name}
            </p>
            <p className="pt-1">
              <span className="payment-invoice-data">Email</span> :
              {created_by_email}
            </p>
          </div>
        </div>

        <div className="container-fluid mt-2 po_table">
          <div className="">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="text-center">Brand</th>
                  <th className="text-center">MRP</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {details?.length > 0 &&
                  details?.map((item) => (
                    <tr key={item.id} className="text-center">
                      <td className="text-start" width={5}>
                        {item.drug?.macrohealth_sg}
                      </td>
                      <td>{item.drug?.manufacturer}</td>
                      <td>{item.drug?.price}</td>
                      <td>{item.req_unit}</td>
                      <td>{parseFloat(item.totalPrice || 0).toFixed(2)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="container-fluid mt-3 float-end d-flex mb-4">
          <div className="w-50">
            <div className="w-50 po_sig">
              {/*<hr />*/}
              {/*<h6>Signature</h6>*/}
            </div>
          </div>
          <div className="w-50">
            <div className="table-responsive tot_bill">
              <table className="table">
                <tbody>
                  <tr>
                    <td>Total</td>
                    <td className="text-end">
                      {parseFloat(total_amount || 0).toFixed(2)}
                    </td>
                  </tr>

                  <tr>
                    <td>Paid Amount</td>
                    <td className="text-end">
                      {parseFloat(paid_amount || 0).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td>Due</td>
                    <td className="text-end">
                      {parseFloat(due_amount || 0).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/*<div className="row">*/}
          {/*    <div className="col-md-6 ms-auto">*/}
          {/*        */}
          {/*    </div>*/}
          {/*</div>*/}
        </div>

        <div className="container-fluid d-flex mt-2">
          <div className="mng_sig">
            <hr />
            <h6 className="text-center">Approved By</h6>
          </div>
          <div className="app_sig">
            <hr />
            <h6 className="text-center">Accepted By</h6>
          </div>
          <div className="supp_sig">
            <hr />
            <h6 className="text-center">Delivered By</h6>
          </div>
        </div>
      </div>
    </>
  );
}
