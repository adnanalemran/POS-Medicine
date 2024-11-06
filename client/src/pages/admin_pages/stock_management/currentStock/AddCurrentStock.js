// import axios from 'axios';
import React, { useEffect } from 'react'
// import { useState } from 'react';
// import http from "../../../http";
// import { toast } from 'react-toastify';
// import Swal from 'sweetalert2';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Auth from '../../../../navbar/auth';
// import AuthUser from "../../../Components/AuthUser";
// import moment from "moment";
// import {user} from "../../../../public/assets/vendors/feather-icons/feather";
// import Select from 'react-select'
// import MaterialTable from "material-table";



const AddCurrentStock = () => {
    
    const navigate = useNavigate();
    const {user}=Auth();

    return (
        <div className="page-content">

            <div className="custom-card patients-head ">
                <h5 className="fw-normal custom_py-3 px-2  text-start mb-2 card-title">Add Current Stock
                    <Link to ="/current-stock-m" className="btn btn-sm btn-warning float-end" >
                        <i class="fal fa-long-arrow-left"></i> Back</Link>
                </h5>
            </div>


            <form
            // onSubmit={submitFormData}
            >

                <div className="row">
                    <div className="col-lg-8 col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="row ">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Purchase Order</label>
                                            <div className="col-sm-7">
                                                {/* <Select
                                                    options={purchase_order}
                                                    placeholder={'Select'}
                                                    onChange={handlePoInput}
                                                    getOptionLabel={(purchase_order) => `${purchase_order.purchase_order_no}`}
                                                    getOptionValue={(purchase_order) => `${purchase_order.id}`}
                                                /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row mb-2">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5">Manufacturer</label>
                                            <div className="col-sm-7">
                                                {/* <Select
                                                    options={supplier}
                                                    onChange={handleMNInput}
                                                    placeholder={'Select'}
                                                    getOptionLabel={(supplier) => `${supplier.supplier_name}`}
                                                    getOptionValue={(supplier) => `${supplier.id}`}
                                                /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row mb-2">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5">Supplier</label>
                                            <div className="col-sm-7">
                                                {/* <Select
                                                    options={supplier}
                                                    onChange={handleSuppChange}
                                                    placeholder={'Select'}
                                                    isDisabled={true}
                                                    getOptionLabel={(supplier) => `${supplier.supplier_name}`}
                                                    getOptionValue={(supplier) => `${supplier.id}`}
                                                    value={supplier.filter(supplier => supplier.id === selectedSuppValue)}
                                                /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row ">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Expiry Date</label>
                                            <div className="col-sm-7">
                                                <input type="date" className="form-control form-control-sm" id="exampleInputUsername2"
                                                //    onChange={handleInput} value={form_data.mrr_expiry_date} name="mrr_expiry_date"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row mb-2">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Order By</label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control form-control-sm" id="exampleInputUsername2"
                                                    //    onChange={handleInput} value={req_po_data.name} name="requisition_no" 
                                                    readOnly />
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div className="card mt-2">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="row mb-2">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5">MRR No.</label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control form-control-sm" id="exampleInputUsername2"
                                                    // onChange={handleInput} value={form_data.mrr_no} name="mrr_no"
                                                     readOnly />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row mb-2">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5">Date : </label>
                                            <div className="col-sm-7">
                                                {/* {moment().format('DD-MM-YYYY')} */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row ">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Carrier</label>
                                            <div className="col-sm-7">
                                                {/* <Select
                                                    options={carrier}
                                                    onChange={handleCInput}
                                                    placeholder={'Select'}
                                                    getOptionLabel={(carrier) => `${carrier.carrier_name}`}
                                                    getOptionValue={(carrier) => `${carrier.id}`}
                                                /> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="row ">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Delivery Date</label>
                                            <div className="col-sm-7">
                                                <input type="date" className="form-control form-control-sm" id="exampleInputUsername2"
                                                //    onChange={handleInput} value={form_data.delivery_date} name="delivery_date"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="row ">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Carried By</label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control form-control-sm" id="exampleInputUsername2"
                                                //    onChange={handleInput} value={form_data.carried_by} name="carried_by"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row ">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Contact No</label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control form-control-sm" id="exampleInputUsername2"
                                                //    onChange={handleInput} value={form_data.contact_no} name="contact_no"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Vehicle No</label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control form-control-sm" id="exampleInputUsername2"
                                                //    onChange={handleInput} value={form_data.vehicle_no} name="vehicle_no"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="mt-1">
                                            {/*<label htmlFor="exampleInputUsername2" className="col-form-label">Remark</label>*/}
                                            <div className="">
                                                <textarea name="special_instruction"
                                                //  onChange={handleInput} value={form_data.remarks}
                                                    className="form-control form-control-sm" maxLength="100" rows="8"
                                                    placeholder="Remarks..."></textarea>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-4 col-md-4 requisition_status_blog">
                        <div className="card mb-2 supplier_info">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h6>Ship To</h6>
                                        <hr className="mrr_heading" />
                                        <div className="row mb-1">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-12">{user?.organization?.name}</label>
                                            <label htmlFor="exampleInputUsername2" className="col-sm-12">{user?.organization?.address}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h6>Bill To</h6>
                                        <hr className="mrr_heading" />
                                        <div className="row mb-1">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-12">{user?.organization?.name}</label>
                                            <label htmlFor="exampleInputUsername2" className="col-sm-12">{user?.organization?.address}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mt-2 payment_block">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h6>Payment</h6>
                                        <hr className="mrr_heading" />
                                        <span>Paid By : </span>
                                        <hr className="mrr_heading" />
                                        <div className="form-check mb-2">
                                            <input type="radio" className="form-check-input"  id="cash_payment1" 
                                            // onChange={handleInput} value="cash" name="payment_type"
                                            />
                                            <label className="form-check-label" htmlFor="cash_payment1">
                                                Cash
                                            </label>
                                        </div>
                                        <div className="form-check mb-2">
                                            <input type="radio" className="form-check-input" 
                                            // onChange={handleInput} value="card" name="payment_type" id="card_payment1" 
                                            />
                                            <label className="form-check-label" htmlFor="card_payment1">
                                                Credit/Debit Card
                                            </label>
                                        </div>
                                        <div className="row mb-1">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-12 pt-1">Total : 
                                            {/* {total_bill_amount.toFixed(2)} */}
                                             </label>
                                        </div>
                                        <div className="row">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Paid</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control form-control-sm" id="exampleInputUsername2"
                                                    // onChange={handlePaidInput} name="paid_amount" 
                                                    />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Due</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control form-control-sm" id="exampleInputUsername2" readOnly
                                                    // onChange={handleInput} value={due_amount} name="due_amount" 
                                                    />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>


                {/*requisition list*/}


                <div className="row mt-2">
                    <div className="col-lg-12 col-md-12">
                        <div className="card">
                            <div className="card-body row">
                                <h6 className="mb-3">Reference Invoice No</h6>
                                <div className="col-md-4">
                                    <div className="row mb-1">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-4 col-form-label">Delivery No</label>
                                        <div className="col-sm-8">
                                            <input type="file" name="delivery_no_docs" id="delivery_no_docs" 
                                            // onChange={handleDNCImage} 
                                            className="col-sm-8 form-control form-control-sm"
                                                // accept="image/jpg,image/jpeg,image/gif,image/png" 
                                                />
                                            {/* {
                                                dnc_image_error == null ? <p className="doc_image_size">Image size must be less than 2 mb</p> :
                                                    <p className="photo_size_error">{dnc_image_error}</p>
                                            }

                                            {DncimageUrl == null ? '' :
                                                <div className="photo_close">
                                                    <img src={DncimageUrl} className="photo_preview_url" width="100" height="100" alt="preview image" />
                                                    <i onClick={closeImage} className="far fa-times-circle"></i>
                                                </div>
                                            } */}
                                            {/*<span className="text-danger">{errors.photo}</span>*/}
                                        </div>
                                    </div>


                                    {/*<div className="row mb-3">*/}
                                    {/*    <label htmlFor="photo" className="col-sm-4 form-label">Photo*/}
                                    {/*    </label>*/}
                                    {/*    */}
                                    {/*</div>*/}



                                </div>
                                <div className="col-md-4">
                                    <div className="row mb-1">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-4 col-form-label">Invoice No</label>
                                        <div className="col-sm-8">
                                            <input type="file" name="requisitor_phone_no"
                                                className="form-control form-control-sm" id="exampleInputUsername2" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="row mb-1">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-4 col-form-label">Delivery Chalan No</label>
                                        <div className="col-sm-8">
                                            <input type="file" name="requisitor_phone_no"
                                                className="form-control form-control-sm" id="exampleInputUsername2" />
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>





                {/* <div className="row mt-2">
                    <div className="col-md-12 col-mg-12">

                        <MaterialTable
                            title={
                                <h6 style={{ fontWeight: '500' }}>Product Details</h6>
                            }
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
                                    fontSize: '.75rem',
                                    textAlign: 'center',
                                },
                                headerStyle: {
                                    fontSize: '.75rem',
                                    border: '1px solid #c9c9c9',
                                    textAlign: 'center',
                                    zIndex: '0',
                                    whiteSpace: 'nowrap'
                                },
                            }}
                        />
                    </div>
                </div> */}



                {/*{*/}
                {/*    (form_data.po_is_sent === null) ?*/}
                {/*        <button className="btn btn-sm btn-success float-end text-uppercase mt-3 me-2">*/}
                {/*            <i className="fas fa-save"></i> Save*/}
                {/*        </button>*/}
                {/*        : ''*/}
                {/*}*/}

                <button className="btn btn-sm btn-success float-end text-uppercase mt-3 me-2">
                    <i className="fas fa-save"></i> Save
                </button>

                {/*{*/}
                {/*    form_data.requisition_status === "approved" ?*/}
                {/*        <button type="button" onClick={() => sendRequestApprovalMail()} className="btn btn-sm btn-success float-end text-uppercase mt-3 me-2">*/}
                {/*            <i className="fas fa-paper-plane"></i> Email*/}
                {/*        </button>*/}
                {/*        : ''*/}
                {/*}*/}
{/* 
                {
                    user.user_type === "admin" && form_data.requisition_status === "new" ?
                        <>
                            <button className="btn btn-sm btn-success float-end text-uppercase mt-3 " type="submit">
                                <i className="fas fa-save"></i> Update
                            </button>
                            <button type="button" onClick={() => proceedToApproval()} className="btn btn-sm btn-success float-end text-uppercase mt-3 me-2">
                                <i className="fas fa-paper-plane"></i> Proceed To Approval
                            </button>
                        </>
                        : ''
                }
                {
                    user.user_type === "manager" && form_data.requisition_status === "pending" ?
                        <>
                            <button className="btn btn-sm btn-success float-end text-uppercase mt-3 " type="submit">
                                <i className="fas fa-save"></i> Update
                            </button>
                            <button type="button" onClick={() => proceedToApprove()} className="btn btn-sm btn-success float-end text-uppercase mt-3 me-2">
                                <i className="fas fa-paper-plane"></i> Approve
                            </button>
                            <button type="button" onClick={() => cancelByManager()} className="btn btn-sm btn-danger-action float-end text-uppercase mt-3 me-2">
                                <i className="fas fa-paper-plane"></i> Cancel
                            </button>
                        </>
                        : ''
                } */}





            </form>
            {/*requisition product*/
            }

        </div>

    )
}

export default AddCurrentStock
