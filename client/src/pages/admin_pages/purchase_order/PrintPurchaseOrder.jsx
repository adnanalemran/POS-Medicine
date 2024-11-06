import React, { useEffect, useRef, useState } from 'react';

import './PurchaseOrder.css';
import logo from '../../../front_assets/Logo_Image/greatpharmalogo.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import http from '../../../http';
import AuthUser from '../../../Components/AuthUser';

const PrintPurchaseOrder = ({ setIsOpen }) => {
  const { user } = AuthUser();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const navigate = useNavigate();

  const [form_data, setFormData] = useState([]);
  const [cart, setCart] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    http.get(`view-purchase-order/${id}`).then((res) => {
      if (res.data.status === 200) {
        console.log('view Purchase order', res.data.data);
        setFormData(res.data.data);
        setCart(res.data.req_details);
        console.log('preview Data:', res.data.req_details);
      } else {
        // setError(res.data.errors);
      }
    });
  }, []);

  return (
    <div className='page-content'>
      <div className='custom-card patients-head '>
        <h5 className='fw-normal custom_py-3 px-2  text-start mb-2 card-title'>
          Purchase Order
          <button
            className='btn btn-sm btn-warning float-end'
            onClick={() => navigate(-1)}
          >
            <i className='fal fa-long-arrow-left'></i> Back
          </button>
        </h5>
      </div>

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body p-5 m-4'>
              <div ref={componentRef}>
                <div className='container-fluid row'>
                  <div className='col-6 ps-0'>
                    <div className='d-flex align-items-center'>
                      <img
                        style={{ height: '65px' }}
                        className='me-2'
                        src={logo}
                        alt=''
                      />
                      <div>
                        <p className='mt-1 mb-1'>
                          <b>{user?.organization?.name}</b>
                        </p>
                        <p>
                          {user?.organization?.address}
                          <br />
                          {user?.organization?.mobile}
                        </p>
                      </div>
                    </div>
                    {/*<a href="#" className="noble-ui-logo d-block mt-3">Noble<span>UI</span></a>*/}

                    {/*<h5 className="mt-5 mb-2 text-muted">Invoice to :</h5>*/}
                    {/*<p>Joseph&nbsp;E&nbsp;Carr,<br /> 102, 102  Crown Street,<br /> London, W3 3PR.</p>*/}
                  </div>
                  {/* <div className="col-lg-4">
                                        <div className="text-center">
                                            <h3>Purchase Order</h3>
                                        </div>
                                    </div> */}
                  <div className='col-6 pe-0'>
                    <h4 className='fw-bolder text-uppercase text-end mb-2'>
                      Purchase Order
                    </h4>
                    <h6 className='text-end'>
                      # {form_data.purchase_order_no}
                    </h6>
                    {/*<p className="text-end mb-1">Balance Due</p>*/}
                    {/*<h4 className="text-end fw-normal">$ 72,420.00</h4>*/}
                    {/*<h6 className="mb-0 mt-3 text-end fw-normal mb-2"><span className="text-muted">Invoice Date :</span> 25rd Jan 2022</h6>*/}
                    {/*<h6 className="text-end fw-normal"><span className="text-muted">Due Date :</span> 12th Jul 2022</h6>*/}
                  </div>
                </div>

                <div className='row mt-3 po-details'>
                  <div className='col-6'>
                    <p className='pt-1'>
                      Requisition No.{' '}
                      <span className='req_no'>
                        : {form_data.requisition_no}
                      </span>
                    </p>
                    <p className='pt-1'>
                      Purchase Order No.{' '}
                      <span className='po_no'>
                        : {form_data.purchase_order_no}
                      </span>
                    </p>
                    <p className='pt-1'>
                      Category{' '}
                      <span className='req_cat'>
                        : {form_data.requisition_category_name}
                      </span>
                    </p>
                    <p className='pt-1'>
                      Exp. Date of Delivery{' '}
                      <span>: {form_data.expected_date_of_delivery}</span>
                    </p>
                    <p className='pt-1'>
                      R.Q. Date{' '}
                      <span className='req_date'>
                        : {form_data.date_and_time}
                      </span>
                    </p>
                  </div>

                  <div className='col-6 req_details_print'>
                    <p className='pt-1'>
                      P.O. Date{' '}
                      <span className='po_date'>
                        : {form_data.date_and_time}
                      </span>
                    </p>
                    <p className='pt-1'>
                      At tests/Sample{' '}
                      <span className='at_tst_smpl'>
                        : {form_data.test_sample}
                      </span>
                    </p>
                    <p className='pt-1'>
                      Supplier/Vendor <span>: {form_data.supplier_name}</span>
                    </p>
                    {/* <p className="pt-1">Delivery Mode <span className="dm_mode text-capitalize">: {form_data.preferred_delivery_mode}</span></p>
                                        <p className="pt-1">Payment Mode <span className="pm_mode text-capitalize">: {form_data.preferred_payment_mode}</span></p> */}
                    <p className='pt-1'>
                      Email{' '}
                      <span className='req_email'>
                        : {form_data.requisitor_contact_email}
                      </span>
                    </p>
                  </div>
                </div>

                <div className='container-fluid mt-2 po_table'>
                  <div className=''>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th className='text-center'>Brand</th>
                          <th className='text-center'>PP</th>
                          <th className='text-center'>VAT</th>
                          <th className='text-center'>Quantity</th>
                          <th className='text-center'>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.length > 0 &&
                          cart.map((item, i) => (
                            <tr className='text-center'>
                              <td className='text-start' width={5}>
                                {item.drug_code} : {item.macrohealth_sg}
                              </td>
                              <td>{item.title}</td>
                              <td>{item.drug_price}</td>
                              <td>0</td>
                              <td>{item.req_unit}</td>
                              <td>
                                {parseFloat(item.req_unit) *
                                  (parseFloat(item.drug_price))}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className='container-fluid mt-3 float-end d-flex mb-4'>
                  <div className='w-50'>
                    <div className='w-50 po_sig'>
                      {/*<hr />*/}
                      {/*<h6>Signature</h6>*/}
                    </div>
                  </div>
                  <div className='w-50'>
                    <div className='table-responsive tot_bill'>
                      <table className='table'>
                        <tbody>
                          <tr>
                            <td>Total</td>
                            <td className='text-end'>
                              {cart.reduce(
                                (total, item) =>
                                  total +
                                  parseFloat(item.drug_price) *
                                    parseFloat(item.req_unit),
                                0,
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>Vat</td>
                            <td className='text-end'>0.00</td>
                          </tr>
                          <tr>
                            <td>Tax</td>
                            <td className='text-end'>0.00</td>
                          </tr>
                          <tr>
                            <td>Commission</td>
                            <td className='text-end'>
                              0.00
                            </td>
                          </tr>
                          <tr>
                            <td>Total Bill Amount</td>
                            <td className='text-end'>
                              {cart.reduce(
                                (total, item) =>
                                  total +
                                  parseFloat(item.drug_price)  *
                                    parseFloat(item.req_unit),
                                0,
                              ) }
                              {/* {form_data.total_bill_amount} */}
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

                <div className='container-fluid d-flex mt-2'>
                  <div className='mng_sig'>
                    <hr />
                    <h6 className='text-center'>Approved By</h6>
                  </div>
                  <div className='app_sig'>
                    <hr />
                    <h6 className='text-center'>Accepted By</h6>
                  </div>
                  <div className='supp_sig'>
                    <hr />
                    <h6 className='text-center'>Delivered By</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='container-fluid w-100'>
          <button
            onClick={handlePrint}
            className='btn btn-sm btn-success float-end text-uppercase mt-3'
          >
            <i className='fas fa-print'></i> Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintPurchaseOrder;
