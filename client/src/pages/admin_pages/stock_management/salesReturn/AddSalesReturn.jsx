import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from "moment";
import Select from 'react-select'
import MaterialTable from "material-table";
import AuthUser from '../../../../Components/AuthUser';
import Swal from 'sweetalert2';


const AddSalesReturn = () => {

    const columnsData = [
        { title: 'Item Code', field: 'drug_code' },
        { title: 'Name & Generic', field: 'drug_code', width: "100 !important" },
        { title: 'Brand', field: 'title' },
        { title: 'Class', field: 'class' },
        { title: 'Batch', field: 'batch' },
        { title: 'Exp. Date', field: 'expiry_date', render: (row) => <div>{moment(row.expiry_date).format('DD-MM-YYYY')}</div> },
        { title: 'Box Type', field: 'boxType', render: (row) => <div className="text-capitalize">{row.boxType}</div> },
        { title: 'Pkt Size', field: 'pktSize', render: (row) => <div className="text-capitalize">{row.pktSize}</div> },
        {
            title: 'No. of Box/Bottle', field: 'noOfBox', render: (row) => <div className='w-[40%] mx-auto'>
                <input
                    style={{width:'80px' ,margin:'auto'}}
                    onChange={(e) => boxSizeHandler(row, e)}
                    value={row.noOfBox}
                    className="form-control form-control-sm text-center"
                    type="number"
                />
            </div>
        },
        {
            title: 'Total Qty.', field: 'pcs', render: (row) => <div className='w-[40%] mx-auto'>
                <input
                    style={{width:'80px' ,margin:'auto'}}
                    onChange={(e) => boxQtyHandler(row, e)}
                    value={row.pcs}
                    className="form-control form-control-sm text-center"
                    type="number"
                />
            </div>
        },
        { title: 'Unit', field: 'unit', render: (row) => <div className="text-capitalize">{row.unit}</div> },

        { title: 'MRP', field: 'price', },
        { title: 'Total Price', field: 'totalPrice' },
        {
            title: 'Action', field: 'action',
            cellStyle: {
                textAlign: "center",
            },
            render: (row) => <div className='flex justify-center gap-2'>
                <div>
                    <button type="button" className="btn btn-sm action-btn"
                    onClick={() => removeMedicine(row)} 
                    ><i className="far fa-trash"></i>
                    </button>
                </div>
            </div>
        },
    ];


    // ---------------------------------------------------------- 
    

    const [cart, setCart] = useState([]);
    const [commission, setCommission] = useState([]);
    const [errors, setError] = useState([]);
    
    const [supplier, setSupplier] = useState([]);
    const [selectedSuppValue, setSuppSelect] = useState();

    const [reqData, setReqData] = useState([]);
    const [mrrData, setMrrData] = useState({});
    const [purchaseOrder, setPurchaseOrder] = useState([]);
    const [purchaseOrderId, setPurchaseOrderId] = useState();
    const navigate = useNavigate();
    const { http, user } = AuthUser();

    const someDate = new Date();
    const date = someDate.setDate(someDate.getDate());
    const defaultDate = new Date(date).toISOString().split("T")[0];

    useEffect(() =>{

        http.get('sales-return-dropdown-requisition-po-data').then(res => {
            setPurchaseOrder(res.data.data);
        });
        http.get('supplier').then(res => {
            setSupplier(res.data.data);
        });

    },[])

    const handlePoInput = (e) => {
        console.log(e);
        setPurchaseOrderId(e.id);
    }

    useEffect(()=> {

        if (purchaseOrderId !== null){
            http.get(`view-purchase-order-for-sales-return/${purchaseOrderId}`).then(res=> {
                if (res.data.status === 200) {
                    console.log("view Purchase orderaaaa",res);
                    setReqData(res.data.data);
                    setCart(res.data.req_details);
                    setMrrData(res.data.mrr);
                    // setCommission(res.data.data.commission);
                    setSuppSelect(res.data.data.supplier_id);

                } else {
                    setError(res.data.errors);
                }
            })
        }

    },[purchaseOrderId]);

    const [form_data, setFormData] = useState({
        return_date: defaultDate,
        return_by: '',
        reasons_of_return: '',
        product_details_note: '',
        // total_price: '',
        photo: '',
    });
    const handleInput = (e) => {
        setFormData({...form_data, [e.target.name]: e.target.value});
    }

    const boxSizeHandler = (item, e) => {
        const existCart = [...cart];
        existCart.map((pd) => {
            if (pd.id === item.id) {
                // const temp = e.target.value;
                const temp = parseFloat(e.target.value);
                if(!temp || temp < 0){
                    pd.noOfBox = 0;
                    pd.pcs = 0;
                    pd.totalPrice = 0;
                }
                else{
                    pd.noOfBox = parseFloat(e.target.value);
                    pd.pcs = (pd.noOfBox * item.pktSize).toFixed(2);
                    pd.totalPrice = (pd.price * pd.pcs).toFixed(2);
                    // pd.totalPrice = pd.price * item.pcs*parseFloat(e.target.value);
                }
            }
        });
        setCart(existCart);
    };
    
    const boxQtyHandler = (item, e) => {
        const existCart = [...cart];
        existCart.map((pd) => {
            if (pd.id === item.id) {

                const temp = parseFloat(e.target.value);

                if(!temp || temp < 0){
                    pd.noOfBox = 0;
                    pd.pcs = 0;
                    pd.totalPrice = 0;
                }else{
                    const test = parseFloat(temp / pd.pktSize);
                    pd.noOfBox = test.toFixed(2);
    
                    pd.pcs = parseFloat(temp);
                    pd.totalPrice = (pd.price * pd.pcs).toFixed(2);
                }
            }
        });
        setCart(existCart);
    };
    const removeMedicine = (item) => {
        const existCart = [...cart];
        const newCart = existCart.filter((pd) => pd.id !== item.id);
        setCart(newCart);
    };

    // cart total
    const total_amount = cart.reduce((total, item) => total + (item.price * item.pcs), 0)
    // const commission_amount = cart.reduce((previousValue, currentValue) => previousValue + ((commission !== 'NaN' ? commission : 0) * currentValue.totalPrice) / 100, 0);
    // const cart_subtotal = total_amount + commission_amount;
    // const vat_amount = (cart_subtotal * vat.vat_name) / 100;
    // const tax_amount = (cart_subtotal * tax.tax_name) / 100;
    // const total_bill_amount = total_amount + vat_amount + tax_amount + commission_amount;


    const submitData = () =>{
        const formData = new FormData();

        formData.append('requisition_po_id', reqData.id);
        formData.append('purchase_order_no', reqData.purchase_order_no);

        formData.append('return_date', form_data.return_date);
        formData.append('return_by', user.name);
        formData.append('reasons_of_return', form_data.reasons_of_return);
        formData.append('product_details_note', form_data.product_details_note);
        formData.append('total_amount', total_amount);
        formData.append('sales_return_status', 'new');

        http.post(`save-sales-return`, formData).then(res => {
            console.log('save-sales-return', res);

            if (res.data.status === 200) {

                cart.map((item, i) => {

                    const newFormData = new FormData();
                    newFormData.append('sales_return_master_id', res.data.data.id);

                    newFormData.append('drug_id', item.drug_id);
                    newFormData.append('noOfBox', item.noOfBox);
                    newFormData.append('pcs', item.pcs);
                    newFormData.append('totalPrice', item.totalPrice);
                    // newFormData.append('quantity_status', "Sales Return");

                    http.post('save-sales-return-details', newFormData).then(res => {
                        console.log("save-sales-return-details", res);
                    })

                })

                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res.data.message,
                    timer: 2500
                })
                navigate('/sales-return');
            } else {
                setError(res.data.errors)
            }

        });        


    }

    // console.log('form data', form_data);
    // console.log('cart data', cart);



    return (
        <div className="page-content">

            <div className="custom-card patients-head ">
                <h5 className="fw-normal custom_py-3 px-2  text-start mb-2 card-title">Add Sales Return
                    <button className="btn btn-sm btn-warning float-end" onClick={() => navigate(-1)}>
                        <i class="fal fa-long-arrow-left"></i> Back</button>
                </h5>
            </div>
            <div className="row">
                <div className="col-lg-8 col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">

                                <div className="col-md-8">
                                    <div className="row mb-2">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-6 col-form-label">Purchase Order No.</label>
                                        <div className="col-sm-6">

                                            <Select
                                                options={purchaseOrder}
                                                onChange={handlePoInput}
                                                getOptionLabel={(purchase_order) => `${purchase_order.purchase_order_no}`}
                                                getOptionValue={(purchase_order) => `${purchase_order.id}`}
                                            />

                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-8">
                                    <div className="row mb-2">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-6 col-form-label">Supplier / Manufacturer</label>
                                        <div className="col-sm-6">
                                                <Select
                                                options={supplier}
                                                // onChange={handleSupplierInput}
                                                isDisabled={true}
                                                placeholder={'Select'}
                                                getOptionLabel={(supplier) => `${supplier.supplier_name}`}
                                                getOptionValue={(supplier) => `${supplier.id}`}
                                                value={supplier.filter(s => s.id === selectedSuppValue)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-8">
                                    <div className="row mb-2">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-6 col-form-label">Return Date </label>
                                        <div className="col-sm-6">
                                            <input type="date" className="form-control form-control-sm" id="exampleInputUsername2"
                                                onChange={handleInput} value={form_data.return_date} name="return_date"
                                                />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-8">
                                    <div className="row mb-2">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-6 col-form-label">Return By </label>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control form-control-sm" id="exampleInputUsername2"
                                                value={user.name} name="return_by"
                                                />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="row mt-2">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Reasons of Return</label>
                                        <div className="col-sm-9">
                                            <textarea 
                                                name="reasons_of_return"
                                                value={form_data.reasons_of_return}
                                                onChange={handleInput} 
                                                style={{height:'70px'}}
                                                className=" form-control form-control-sm" maxLength="100" rows="3"
                                                placeholder="write here..."></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row mt-2">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Product Detail Notes</label>
                                        <div className="col-sm-9">
                                            <textarea 
                                                style={{height:'70px'}}
                                                name="product_details_note"
                                                value={form_data.product_details_note}
                                                onChange={handleInput} 
                                                className=" form-control form-control-sm" maxLength="100" rows="3"
                                                placeholder="write here..."></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div className="row mt-2">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-4 col-form-label">Photo Upload</label>
                                        <div className="col-sm-8">
                                            <input type="file" className="form-control form-control-sm" id="exampleInputUsername2"
                                                //    onChange={handleInput} value={form_data.mrr_expiry_date} name="mrr_expiry_date"
                                                readOnly />
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
                                    <h6>Received Details</h6>
                                    <hr className="mrr_heading" />
                                    <div className="row mb-1">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-12">Roger George</label>
                                        <label htmlFor="exampleInputUsername2" className="col-sm-12">ID: 500 - 700 - 900</label>
                                        <label htmlFor="exampleInputUsername2" className="col-sm-12">Received Date: July 21, 2022</label>
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
                                        <input type="radio" className="form-check-input" value="cash" name="payment_type" id="cash_payment1" 
                                            checked={mrrData.payment_type === "cash"} 
                                            />
                                            <label className="form-check-label" htmlFor="cash_payment1">
                                                Cash
                                            </label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input type="radio" className="form-check-input" value="card" name="payment_type" id="card_payment1" 
                                            checked={mrrData.payment_type === "card"}
                                            />
                                            <label className="form-check-label" htmlFor="card_payment1">
                                                Credit/Debit Card
                                            </label>
                                    </div>
                                    <div className="row mb-1">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-12 pt-1">Total : 
                                        {mrrData.total_bill_amount} 
                                        </label>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Paid
                                        
                                        </label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control form-control-sm" id="exampleInputUsername2"
                                                value={mrrData.paid_amount}   
                                                name="paid_amount" readOnly/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Due</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control form-control-sm" id="exampleInputUsername2" readOnly
                                                value={mrrData.due_amount} 
                                                name="due_amount"/>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>


            {/*Product Details*/}

            <div className="row mt-3">
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
            </div>

            <button
                onClick={submitData} 
                className="btn btn-sm btn-success float-end text-uppercase mt-3 me-2">
                <i className="fas fa-save"></i> Save
            </button>

        </div>

    )
}

export default AddSalesReturn;

