
// import React from 'react';
// import { useParams } from 'react-router-dom';

// const ViewManagerMaterialReceiving = () => {
//     const {id} = useParams();
//     return (
//         <div>
//             <p>this is maneger view {id}</p>
//         </div>
//     );
// };

// export default ViewManagerMaterialReceiving;





// import React, {useEffect} from 'react'
// import {useState} from 'react';
// import Swal from 'sweetalert2';
// import {Link, useNavigate, useParams} from 'react-router-dom';
// import moment from "moment";
// import Select from 'react-select'
// import MaterialTable from "material-table";
// import AuthUser from '../../../../Components/AuthUser';
// import { toast } from 'react-toastify';
// function ViewManagerMaterialReceiving() {

//     const {id} = useParams();

//     const alertToast = (text) => toast.error(text);

//     const navigate = useNavigate();
//     const {http, user} = AuthUser();

//     const [purchase_order, setPurchaseOrder] = useState([]);
//     const [purchase_order_no_id, setPurchaseOrderId] = useState("");
//     const [supplier, setSupplier] = useState([]);
//     const [carrier, setCarrier] = useState([]);
//     const [manufacturer_id, setMNId] = useState("");
//     const [carrier_id, setCId] = useState("");
//     const [due_amount, setDueAmount] = useState();
//     const [paid_amount, setPaidAmount] = useState();
//     const [paidBtn, setPaidBtn] = useState(false);
//     const [vat, setVat] = useState([]);
//     const [tax, setTax] = useState([]);
//     const [commission, setCommission] = useState([]);
//     const [dnc, setDNCPicture] = useState([]);

//     const [req_po_data, setMrrInput] = useState([]);

//     const someDate = new Date();
//     const date = someDate.setDate(someDate.getDate());
//     const defaultDate = new Date(date).toISOString().split("T")[0];

//     const handleCInput = (e) => {
//         setCId(e.id);
//         console.log('carrier id', e.id);
//     }

//     const handleMNInput = (e) => {
//         setMNId(e.id);
//     }

//     const handlePaidInput = (e) => {
        
//         const paid = e.target.value;
//         setPaidAmount(paid);
//         if(paid > 0){
//             setPaidBtn(true);
//         }
//         const due_amount = total_bill_amount - paid;
//         setDueAmount(due_amount.toFixed(2));
//         handleInput(e)
//     }

//     const [selectedSuppValue, setSuppSelect] = useState();
//     const handleSuppChange = (e) => {
//         setSuppSelect(e.id)
//     }

//     useEffect(()=> {

//         if (purchase_order_no_id != null){
//             http.get(`view-purchase-order-for-mrr/${purchase_order_no_id}`).then(res=> {
//                 if (res.data.status === 200) {
//                     console.log("view Purchase orderaaaa",res.data.data);
//                     setMrrInput(res.data.data);
//                     setCart(res.data.req_details);
//                     setCommission(res.data.data.commission);
//                     setSuppSelect(res.data.data.supplier_id);
//                 } else {
//                     setError(res.data.errors);
//                 }
//             })
//         }

//     },[purchase_order_no_id]);

//     const [cart, setCart] = useState([]);

//     const total_amount = cart.reduce((total,item) => total+parseFloat(item.totalPrice),0)
//     const commission_amount = cart.reduce((previousValue, currentValue) =>previousValue + (commission * parseFloat(currentValue.totalPrice)) / 100, 0);
//     const cart_subtotal = total_amount+commission_amount;
//     const vat_amount = (cart_subtotal*vat.vat_name)/100;
//     const tax_amount = (cart_subtotal*tax.tax_name)/100;
//     const total_bill_amount = total_amount + vat_amount + tax_amount - commission_amount;


   
//     const boxSizeHandler = (item, e) => {
//         const existCart = [...cart];
//         existCart.map((pd) => {
//             if (pd.id === item.id) {

//                 pd.noOfBox = parseFloat(e.target.value);
//                 pd.req_unit = (pd.noOfBox * item.pktSize).toFixed(2);
//                 pd.totalPrice = (pd.price * pd.req_unit).toFixed(2);

//             }
//         });
//         setCart(existCart);
//     };
//     const boxQtyHandler = (item, e) => {
//         const existCart = [...cart];
//         existCart.map((pd) => {
//             if (pd.id === item.id) {
//                 const temp = e.target.value
//                 const test = parseFloat(temp / pd.pktSize);
//                 console.log("Calculated data",test);
//                 pd.noOfBox = test.toFixed(2);

//                 pd.req_unit = parseFloat(temp);
//                 pd.totalPrice = (pd.price * pd.req_unit).toFixed(2);

//             }
//         });
//         setCart(existCart);
//     };

//     // product requisition

//     const closeImage = () => {
//         setDncImageUrl()
//         document.getElementById('delivery_no_docs').value = '';
//     }

//     const [dnc_image_error, setDncImageError] = useState();
//     const [DncimageUrl, setDncImageUrl] = useState();
//     const handleDNCImage = (e) => {
//         e.persist();
//         if (e.target.files[0].size < 2000048) {
//             setDNCPicture({ delivery_no_docs: e.target.files[0] })
//             setDncImageError(null)
//         } else {
//             setDncImageError("File size must be less than 2 mb !")
//         }
//         if (e.target.files && e.target.files[0] && e.target.files[0].size < 2000048) {
//             setDncImageUrl(URL.createObjectURL(e.target.files[0]))
//         } else {
//             setDncImageError("File size must be less than 2 mb !")
//         }

//     }

//     const [errors, setError] = useState([]);

//     const [form_data, setFormData] = useState({
//         purchase_order_no_id: "",
//         manufacturer_id: "",
//         supplier_id: "",
//         // expiry_date: "",
//         mrr_no: "",
//         carrier_id: "",
//         delivery_date: defaultDate,
//         carried_by: "",
//         contact_no: "",
//         vehicle_no: "",
//         remarks: "",
//         total_bill_amount: "",
//         paid_amount: "",
//         due_amount: "",
//         delivery_no_docs : "",
//         payment_type: "",
//         mrr_expiry_date: "",
//     });

//     const handleInput = (e) => {
//         // console.log(e.target.value);
//         setFormData({
//             ...form_data, [e.target.name]: e.target.value
//         });
//     }

//     useEffect(() => {

//         http.get(`edit-mrr/${id}`).then(res=> {
//             console.log("mrr_edit",res);
//             setFormData(res.data.mrr_data);
            
//             setCId(res.data.mrr_data.carrier_id);
//             setMNId(res.data.mrr_data.manufacturer_id)
//             setPurchaseOrderId(res.data.mrr_data.requisition_po_id);
//         })
//         http.get('carrier').then(res => {
//             setCarrier(res.data.data);
//         });
//         http.get('supplier').then(res => {
//             setSupplier(res.data.data);
//         });
//         http.get('purchase-order-dropdown-for-mrr').then(res => {
//             setPurchaseOrder(res.data.data);
//         });
//         http.get('requisition-vat-tax').then(res => {
//             setVat(res.data.vat);
//             setTax(res.data.tax);
//         });
       

//     }, []);

//     const columnsData = [
//         { title: 'Item Code', field: 'drug_code' },
//         { title: 'Name', field: 'drug_name', width: "100 !important"},
//         { title: 'Class', field: 'class' },
//         { title: 'Batch', field: 'batch' },
//         { title: 'Exp Date', field: 'expiry_date', render:(row) => <div>{moment(row.expiry_date).format('DD-MM-YYYY')}</div> },
//         { title: 'Box Type', field: 'boxType', render:(row) => <div className="text-capitalize">{row.boxType}</div> },
//         { title: 'Pkt Size', field: 'pktSize', render: (row) => <div className="text-capitalize">{row.pktSize}</div> },
//         { title: 'No. of Box/Bottle', field: 'noOfBox', render: (row) => <div className='w-[40%] mx-auto'>
//                 <input
//                     onChange={(e) => boxSizeHandler(row, e)}
//                     value={row.noOfBox}
//                     style={{width:'80px' ,margin:'auto'}}
//                     readOnly
//                     className="form-control form-control-sm text-center"
//                     type="number"
//                 />
//             </div> },
//         { title: 'Unit', field: 'unit', render: (row) => <div className="text-capitalize">{row.unit}</div> },
//         { title: 'Quantity', field: 'req_unit', render: (row) => <div className='w-[100%]'>
//                 <input className="form-control form-control-sm"
//                        value={row.req_unit}
//                        style={{width:'80px' ,margin:'auto'}}
//                        readOnly
//                        onChange={(e) => boxQtyHandler(row, e)}
//                        type="number"
//                 />
//             </div> },
//         { title: 'MRP', field: 'price', },

//         { title: 'Total Price', field: 'totalPrice'},
//         {title: 'Action', field: 'action', render: (row) => <div className='flex justify-center gap-2'>
//                 {/* <div>
//                     <button type="button" onClick={() => removeMedicine(row)} className="btn btn-sm action-btn"><i
//                         className="far fa-trash"></i></button>
//                 </div> */}
//             </div>},
//     ]

//     const submitFormData = (e) => {
//         e.preventDefault();

//         const formData = new FormData();

//         formData.append('purchase_order_no_id', purchase_order_no_id);
//         formData.append('manufacturer_id', manufacturer_id);
//         formData.append('supplier_id', selectedSuppValue);
//         formData.append('mrr_expiry_date', form_data.mrr_expiry_date);
//         formData.append('mrr_no', form_data.mrr_no);
//         formData.append('carrier_id', carrier_id);
//         formData.append('delivery_date', form_data.delivery_date);
//         formData.append('carried_by', form_data.carried_by);
//         formData.append('contact_no', form_data.contact_no);
//         formData.append('vehicle_no', form_data.vehicle_no);
//         formData.append('remarks', form_data.remarks);
//         formData.append('total_bill_amount', total_bill_amount.toFixed(2));
//         formData.append('paid_amount', paid_amount);
//         formData.append('due_amount', due_amount);
//         formData.append('payment_type', form_data.payment_type);
//         formData.append('delivery_no_docs',  dnc.delivery_no_docs);
//         // formData.append('mrr_status',  'New');


//         http.post(`save-material-receiving`, formData).then(res => {
//             console.log('all response',res);
//             if (res.data.status === 200) {
//                 console.log(res)
//                 cart.map((item, i) => {
//                     const academic = new FormData();
//                     academic.append('material_receiving_master_id', `${purchase_order_no_id}`);

//                     academic.append('drug_id', item.id);
//                     academic.append('boxType', item.boxType);
//                     academic.append('pktSize', item.pktSize);
//                     academic.append('noOfBox', item.noOfBox);
//                     academic.append('disc', item.disc);

//                     // academic.append('pcs', item.pcs);
//                     academic.append('unit', item.unit);
//                     academic.append('req_unit', item.req_unit);
//                     academic.append('totalPrice', item.totalPrice);

//                     console.log("FromData Academic", academic);

//                     http.post('save-material-receiving-details', academic).then(res => {
//                         console.log("save-material-receiving-details")
//                     })

//                     // if (item.src_primary_key) {
//                     //
//                     //     academic.append('drug_id', item.id);
//                     //     http.post('save-requisitions-products', academic).then(res => {
//                     //         console.log("save-requisitions-products")
//                     //     })
//                     // } else {
//                     //     http.post(`/update-requisitions-products/${item.id}`, academic).then(res => {
//                     //         console.log("update-supplier-social-media")
//                     //     })
//                     // }

//                 })

//                 Swal.fire({
//                     position: 'top-center',
//                     icon: 'success',
//                     title: res.data.message,
//                     timer: 2500
//                 })
//                 navigate('/material-receiving');
//             } else {
//                 setError(res.data.errors)
//                 alertToast('Some field is required')
//             }

//         });

//     }


//     return (
//         <div className="page-content">

//             <div className="custom-card patients-head ">
//                 <h5 className="fw-normal custom_py-3 px-2  text-start mb-2 card-title">MRR
//                     <button className="btn btn-sm btn-warning float-end" onClick={() => navigate(-1)}>
//                         <i class="fal fa-long-arrow-left"></i> Back</button>
//                 </h5>
//             </div>


//             {/* <form  onSubmit={submitFormData}> */}

//                 <div className="row">
//                     <div className="col-lg-8 col-md-8">
//                         <div className="card">
//                             <div className="card-body">
//                                 <div className="row">
//                                     <div className="col-md-6">
//                                         <div className="row ">
//                                             <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Purchase Order
//                                             <span className={`ms-1 text-${errors.purchase_order_no_id ? 'danger' : 'dark'}`}>*</span>
                                            
//                                             </label>
//                                             <div className="col-sm-7">
//                                                 {/* <Select
//                                                     options={purchase_order}
//                                                     placeholder={'Select'}
//                                                     // isDisabled={true}
//                                                     onChange={handlePoInput}
//                                                     getOptionLabel={(purchase_order) => `${purchase_order.purchase_order_no}`}
//                                                     getOptionValue={(purchase_order) => `${purchase_order.id}`}
//                                                     value={purchase_order.filter(p => p.id == purchase_order_no_id)}
//                                                 /> */}
//                                                 {/* <input type="text" value={req_po_data.purchase_order_no} readOnly/> */}
//                                                 <input type="text" className="form-control form-control-sm" id="exampleInputUsername2"
//                                                         value={req_po_data.purchase_order_no} name="requisition_no" readOnly/>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="row mb-2">
//                                             <label htmlFor="exampleInputUsername2" className="col-sm-5">Manufacturer
//                                                 <span className={`ms-1 text-${errors.manufacturer_id ? 'danger' : 'dark'}`}>*</span>
//                                             </label>
//                                             <div className="col-sm-7">
//                                                 <Select
//                                                     options={supplier}
//                                                     onChange={handleMNInput}
//                                                     isDisabled={true}
//                                                     placeholder={'Select'}
//                                                     getOptionLabel={(supplier) => `${supplier.supplier_name}`}
//                                                     getOptionValue={(supplier) => `${supplier.id}`}
//                                                     value={supplier.filter(s => s.id === manufacturer_id)}
//                                                 />

//                                                 {/* <Select
//                                                     options={supplier}
//                                                     onChange={handleSuppChange}
//                                                     placeholder={'Select'}
//                                                     isDisabled={true}
//                                                     getOptionLabel={(supplier) => `${supplier.supplier_name}`}
//                                                     getOptionValue={(supplier) => `${supplier.id}`}
//                                                     value={supplier.filter(supplier => supplier.id === selectedSuppValue)}
//                                                 /> */}
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="row mb-2">
//                                             <label htmlFor="exampleInputUsername2" className="col-sm-5">Supplier</label>
//                                             <div className="col-sm-7">
//                                                 <Select
//                                                     options={supplier}
//                                                     onChange={handleSuppChange}
//                                                     placeholder={'Select'}
//                                                     isDisabled={true}
//                                                     getOptionLabel={(supplier) => `${supplier.supplier_name}`}
//                                                     getOptionValue={(supplier) => `${supplier.id}`}
//                                                     value={supplier.filter(supplier => supplier.id === selectedSuppValue)}
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="row ">
//                                             <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Expiry Date
//                                                 <span className={`ms-1 text-${errors.expiry_date ? 'danger' : 'dark'}`}>*</span>
//                                             </label>
//                                             <div className="col-sm-7">
//                                                 <input type="date" className="form-control form-control-sm" id="exampleInputUsername2"
//                                                        onChange={handleInput} value={form_data.mrr_expiry_date} name="mrr_expiry_date" readOnly/>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="row mb-2">
//                                             <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Order By</label>
//                                             <div className="col-sm-7">
//                                                 <input type="text" className="form-control form-control-sm" id="exampleInputUsername2"
//                                                        onChange={handleInput} value={req_po_data.name} name="requisition_no" readOnly/>
//                                             </div>
//                                         </div>
//                                     </div>


//                                 </div>
//                             </div>
//                         </div>
//                         <div className="card mt-2">
//                             <div className="card-body">
//                                 <div className="row">
//                                     <div className="col-md-6">
//                                         <div className="row mb-2">
//                                             <label htmlFor="exampleInputUsername2" className="col-sm-5">MRR No.</label>
//                                             <div className="col-sm-7">
//                                                 <input type="text" className="form-control form-control-sm" id="exampleInputUsername2"
//                                                        onChange={handleInput} value={form_data.mrr_no} name="mrr_no" readOnly />
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="row mb-2">
//                                             <label htmlFor="exampleInputUsername2" className="col-sm-5">Date  </label>
//                                             <div className="col-sm-7">
//                                                 {/* {moment().format('DD-MM-YYYY')} */}
//                                                 <input type="date" className="form-control form-control-sm" id="exampleInputUsername2"
//                                                     onChange={handleInput} value={form_data.delivery_date} name="delivery_date" readOnly/>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="row ">
//                                             <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Carrier
//                                             <span className={`ms-1 text-${errors.carrier_id ? 'danger' : 'dark'}`}>*</span>
//                                             </label>
//                                             <div className="col-sm-7">
//                                                 <Select
//                                                     options={carrier}
//                                                     onChange={handleCInput}
//                                                     placeholder={'Select'}
//                                                     isDisabled={true}
//                                                     getOptionLabel={(carrier) => `${carrier.carrier_name}`}
//                                                     getOptionValue={(carrier) => `${carrier.id}`}
//                                                     value={carrier.filter(carrier => carrier.id === carrier_id)}
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="col-md-6">
//                                         <div className="row ">
//                                             <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Delivery Date</label>
//                                             <div className="col-sm-7">
//                                                 <input type="date" className="form-control form-control-sm" id="exampleInputUsername2"
//                                                        onChange={handleInput} value={form_data.delivery_date} name="delivery_date" readOnly/>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="col-md-6">
//                                         <div className="row ">
//                                             <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">
//                                                 Carried By
//                                             </label>
//                                             <div className="col-sm-7">
//                                                 <input type="text" className="form-control form-control-sm" id="exampleInputUsername2"
//                                                        onChange={handleInput} value={form_data.carried_by} name="carried_by" readOnly/>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="row ">
//                                             <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Contact No
//                                             <span className={`ms-1 text-${errors.contact_no ? 'danger' : 'dark'}`}>*</span>
                                            
//                                             </label>
//                                             <div className="col-sm-7">
//                                                 <input type="text" className="form-control form-control-sm" id="exampleInputUsername2"
//                                                        onChange={handleInput} value={form_data.contact_no} name="contact_no" readOnly/>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="row">
//                                             <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Vehicle No
//                                             <span className={`ms-1 text-${errors.vehicle_no ? 'danger' : 'dark'}`}>*</span>
                                            
//                                             </label>
//                                             <div className="col-sm-7">
//                                                 <input type="text" className="form-control form-control-sm" id="exampleInputUsername2"
//                                                        onChange={handleInput} value={form_data.vehicle_no} name="vehicle_no" readOnly/>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-12">
//                                         <div className="mt-1">
//                                             {/*<label htmlFor="exampleInputUsername2" className="col-form-label">Remark</label>*/}
//                                             <div className="">

//                                                 <textarea name="remarks" 
//                                                     onChange={handleInput} value={form_data.remarks}
//                                                     className="form-control "
//                                                     placeholder="Remarks..."
//                                                     rows="7"
//                                                     readOnly
//                                                     >
//                                                 </textarea>

//                                                 {/* <textarea name="remarks" 
//                                                 onChange={handleInput} value={form_data.remarks}
//                                                 className="form-control form-control-sm" maxLength="100" rows="8"
//                                                 placeholder="Remarks..."></textarea> */}
//                                             </div>
//                                         </div>
//                                     </div>

//                                 </div>
//                             </div>
//                         </div>

//                     </div>
//                     <div className="col-lg-4 col-md-4 requisition_status_blog">
//                         <div className="card mb-2 supplier_info">
//                             <div className="card-body">
//                                 <div className="row">
//                                     <div className="col-md-12">
//                                         <h6>Ship To</h6>
//                                         <hr className="mrr_heading" />
//                                         <div className="row mb-1">
//                                             <label htmlFor="exampleInputUsername2" className="col-sm-12">{user?.organization?.name}</label>
//                                             <label htmlFor="exampleInputUsername2" className="col-sm-12">{user?.organization?.address}</label>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="card">
//                             <div className="card-body">
//                                 <div className="row">
//                                     <div className="col-md-12">
//                                         <h6>Bill To</h6>
//                                         <hr className="mrr_heading" />
//                                         <div className="row mb-1">
//                                             <label htmlFor="exampleInputUsername2" className="col-sm-12">{user?.organization?.name}</label>
//                                             <label htmlFor="exampleInputUsername2" className="col-sm-12">{user?.organization?.address}</label>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="card mt-2 payment_block">
//                             <div className="card-body">
//                                 <div className="row">
//                                     <div className="col-md-12">
//                                         <h6>Payment</h6>
//                                         <hr className="mrr_heading" />
//                                         <span>Paid By : </span>
//                                         <hr className="mrr_heading" />


                                        
//                                         <div className="form-check mb-2">
//                                             <input type="radio" className="form-check-input" onChange={handleInput} value="cash" name="payment_type" id="cash_payment1" checked={form_data.payment_type === "cash"} />
//                                                 <label className="form-check-label" htmlFor="cash_payment1">
//                                                     Cash
//                                                 </label>
//                                         </div>
//                                         <div className="form-check mb-2">
//                                             <input type="radio" className="form-check-input" onChange={handleInput} value="card" name="payment_type" id="card_payment1" checked={form_data.payment_type === "card"}/>
//                                                 <label className="form-check-label" htmlFor="card_payment1">
//                                                     Credit/Debit Card
//                                                 </label>
//                                         </div>

//                                         <div className="row mb-1">
//                                             <label htmlFor="exampleInputUsername2" className="col-sm-12 pt-1">Total : {total_bill_amount.toFixed(2)} </label>
//                                         </div>
//                                         <div className="row">
//                                             <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Paid
//                                             <span>*</span>
                                            
//                                             </label>
//                                             <div className="col-sm-9">
//                                                 <input type="text" className="form-control form-control-sm" id="exampleInputUsername2"
//                                                        onChange={handlePaidInput} name="paid_amount" value={form_data.paid_amount} readOnly/>
//                                             </div>
//                                         </div>
//                                         <div className="row">
//                                             <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Due</label>
//                                             <div className="col-sm-9">
//                                                 <input type="text" className="form-control form-control-sm" id="exampleInputUsername2" readOnly
//                                                        onChange={handleInput} value={form_data.due_amount} name="due_amount"/>
//                                             </div>
//                                         </div>

//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                     </div>

//                 </div>


//                 {/*requisition list*/}


//                 <div className="row mt-2">
//                     <div className="col-lg-12 col-md-12">
//                         <div className="card">
//                             <div className="card-body row">
//                                 <h6 className="mb-3">Reference Invoice No</h6>
//                                 <div className="col-md-4">
//                                     <div className="row mb-1">
//                                         <label htmlFor="exampleInputUsername2" className="col-sm-4 col-form-label">Delivery No</label>
//                                         <div className="col-sm-8">
//                                             <input type="file" name="delivery_no_docs" id="delivery_no_docs" onChange={handleDNCImage} className="col-sm-8 form-control form-control-sm"
//                                                    accept="image/jpg,image/jpeg,image/gif,image/png"/>
//                                             {
//                                                 dnc_image_error == null ? <p className="doc_image_size">Image size must be less than 2 mb</p> :
//                                                     <p className="photo_size_error">{dnc_image_error}</p>
//                                             }

//                                             {DncimageUrl == null ? '' :
//                                                 <div className="photo_close">
//                                                     <img src={DncimageUrl} className="photo_preview_url" width="100" height="100" alt="preview image"/>
//                                                     <i onClick={closeImage} className="far fa-times-circle"></i>
//                                                 </div>
//                                             }
//                                             {/*<span className="text-danger">{errors.photo}</span>*/}
//                                         </div>
//                                     </div>


//                                     {/*<div className="row mb-3">*/}
//                                     {/*    <label htmlFor="photo" className="col-sm-4 form-label">Photo*/}
//                                     {/*    </label>*/}
//                                     {/*    */}
//                                     {/*</div>*/}



//                                 </div>
//                                 <div className="col-md-4">
//                                     <div className="row mb-1">
//                                         <label htmlFor="exampleInputUsername2" className="col-sm-4 col-form-label">Invoice No</label>
//                                         <div className="col-sm-8">
//                                             <input type="file" name="requisitor_phone_no"
//                                                    className="form-control form-control-sm" id="exampleInputUsername2"/>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4">
//                                     <div className="row mb-1">
//                                         <label htmlFor="exampleInputUsername2" className="col-sm-4 col-form-label">Delivery Chalan No</label>
//                                         <div className="col-sm-8">
//                                             <input type="file" name="requisitor_phone_no"
//                                                    className="form-control form-control-sm" id="exampleInputUsername2"/>
//                                         </div>
//                                     </div>
//                                 </div>



//                             </div>
//                         </div>
//                     </div>
//                 </div>





//                 <div className="row mt-2">
//                     <div className="col-md-12 col-mg-12">

//                         <MaterialTable
//                             title={
//                                 <h6 style={{fontWeight:'500'}}>Product Details</h6>
//                             }
//                             columns={columnsData}
//                             data={cart}
//                             options={{
//                                 actionsColumnIndex: -1,
//                                 selection: false,
//                                 search: false,
//                                 showTitle: true,
//                                 pageSize: 5,
//                                 pageSizeOptions: [5, 10, 20, 50, 100],
//                                 emptyRowsWhenPaging: false,
//                                 rowStyle:{
//                                     fontSize:'.75rem',
//                                     textAlign:'center',
//                                 },
//                                 headerStyle:{
//                                     fontSize:'.75rem',
//                                     border:'1px solid #c9c9c9' ,
//                                     textAlign:'center',
//                                     zIndex:'0',
//                                     whiteSpace: 'nowrap'
//                                 },
//                             }}
//                         />
//                     </div>
//                 </div>


//                 {/* <button className="btn btn-sm btn-success float-end text-uppercase mt-3 me-2" onClick={submitFormData}>
//                     <i className="fas fa-save"></i> Print
//                 </button> */}



//                 {/* {
//                     (paidBtn === false)
//                     ?
//                     <button disabled className="btn btn-sm btn-success float-end text-uppercase mt-3 me-2">
//                         <i className="fas fa-save"></i> Pay First
//                     </button>
//                     :
//                     <button className="btn btn-sm btn-success float-end text-uppercase mt-3 me-2" onClick={submitFormData}>
//                         <i className="fas fa-save"></i> Save
//                     </button>
//                 } */}
                

//                 {/* <button type="button" onClick={() => proceedToApproval()} className="btn btn-sm btn-success float-end text-uppercase mt-3 me-2">
//                     <i className="fas fa-paper-plane"></i> Proceed To Approval
//                 </button> */}

//                 {/*{*/}
//                 {/*    form_data.requisition_status === "approved" ?*/}
//                 {/*        <button type="button" onClick={() => sendRequestApprovalMail()} className="btn btn-sm btn-success float-end text-uppercase mt-3 me-2">*/}
//                 {/*            <i className="fas fa-paper-plane"></i> Email*/}
//                 {/*        </button>*/}
//                 {/*        : ''*/}
//                 {/*}*/}

//                 {/* {
//                     user.user_type === "admin" && form_data.requisition_status === "new" ?
//                         <>
//                             <button className="btn btn-sm btn-success float-end text-uppercase mt-3 " type="submit">
//                                 <i className="fas fa-save"></i> Update
//                             </button>
//                             <button type="button" onClick={() => proceedToApproval()} className="btn btn-sm btn-success float-end text-uppercase mt-3 me-2">
//                                 <i className="fas fa-paper-plane"></i> Proceed To Approval
//                             </button>
//                         </>
//                         : ''
//                 } */}
//                 {/* {
//                     user.user_type === "manager" && form_data.requisition_status === "pending" ?
//                         <>
//                             <button className="btn btn-sm btn-success float-end text-uppercase mt-3 " type="submit">
//                                 <i className="fas fa-save"></i> Update
//                             </button>
//                             <button type="button" onClick={() => proceedToApprove()} className="btn btn-sm btn-success float-end text-uppercase mt-3 me-2">
//                                 <i className="fas fa-paper-plane"></i> Approve
//                             </button>
//                             <button type="button" onClick={() => cancelByManager()} className="btn btn-sm btn-danger-action float-end text-uppercase mt-3 me-2">
//                                 <i className="fas fa-paper-plane"></i> Cancel
//                             </button>
//                         </>
//                         : ''
//                 } */}

//             {/* </form> */}
//             {/*requisition product*/
//             }

//         </div>

//     )
// }

// export default ViewManagerMaterialReceiving



