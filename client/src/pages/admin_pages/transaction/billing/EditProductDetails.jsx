import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import http from "../../../../http";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from "moment";
// import {user} from "../../../../public/assets/vendors/feather-icons/feather";
import Select from 'react-select'
import MaterialTable from "material-table";
import AuthUser from '../../../../Components/AuthUser';


const EditProductDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();
    const { http, user } = AuthUser();

    const manufacturer = [
        { name: 'chocolate', label: 'Chocolate' },
        { name: 'strawberry', label: 'Strawberry' },
        { name: 'vanilla', label: 'Vanilla' }
    ]

    // const { id } = useParams();
    // const navigate = useNavigate();
    // const { http, user } = AuthUser();

    // const [purchase_order, setPurchaseOrder] = useState([]);
    // const [supplier, setSupplier] = useState([]);
    // const [carrier, setCarrier] = useState([]);
    // const [purchase_order_no_id, setPurchaseOrderId] = useState();
    // const [manufacturer_id, setMNId] = useState();
    // const [carrier_id, setCId] = useState();
    // const [due_amount, setDueAmount] = useState();
    // const [paid_amount, setPaidAmount] = useState();
    // const [vat, setVat] = useState([]);
    // const [tax, setTax] = useState([]);
    // const [commission, setCommission] = useState([]);
    // const [dnc, setDNCPicture] = useState([]);


    // const handlePoInput = (e) => {
    //     setPurchaseOrderId(e.id);
    // }

    // const handleCInput = (e) => {
    //     setCId(e.id);
    // }

    // const handleMNInput = (e) => {
    //     setMNId(e.id);
    // }

    // const handlePaidInput = (e) => {
    //     // alert(e.target.value);
    //     // setMNId(e.id);
    //     // if (total_bill_amount > 0){
    //     //
    //     // }else{
    //     //     alert(total_bill_amount.toFixed(2));
    //     //
    //     // }
    //     const paid = e.target.value;
    //     setPaidAmount(paid);
    //     const due_amount = total_bill_amount - paid;
    //     setDueAmount(due_amount.toFixed(2));
    // }

    // const [selectedSuppValue, setSuppSelect] = useState();
    // const handleSuppChange = (e) => {
    //     setSuppSelect(e.id)
    // }

    // useEffect(() => {

    //     if (purchase_order_no_id !== null) {
    //         http.get(`view-purchase-order-for-mrr/${purchase_order_no_id}`).then(res => {
    //             if (res.data.status === 200) {
    //                 console.log("view Purchase orderaaaa", res.data.data);
    //                 setMrrInput(res.data.data);
    //                 setCart(res.data.req_details);
    //                 setCommission(res.data.data.commission);
    //                 setSuppSelect(res.data.data.supplier_id);
    //             } else {
    //                 setError(res.data.errors);
    //             }
    //         })
    //     }

    // }, [purchase_order_no_id]);

    // const [filteredMedicine, setFilteredMedicine] = useState([]);
    // const [cart, setCart] = useState([]);
    // const [searchWord, setSearchWord] = useState("");

    // const total_amount = cart.reduce((total, item) => total + parseFloat(item.totalPrice), 0)
    // const commission_amount = cart.reduce((previousValue, currentValue) => previousValue + (commission * parseFloat(currentValue.totalPrice)) / 100, 0);
    // const cart_subtotal = total_amount + commission_amount;
    // const vat_amount = (cart_subtotal * vat.vat_name) / 100;
    // const tax_amount = (cart_subtotal * tax.tax_name) / 100;
    // const total_bill_amount = total_amount + vat_amount + tax_amount - commission_amount;

    // const [activeId, setActiveId] = useState(0);
    // const [loading, setLoading] = useState(false);
    // const handleKeyPress = (e) => {
    //     if (e.code === "ArrowDown") {
    //         if (activeId < filteredMedicine.length - 1) {
    //             setActiveId((prev) => prev + 1);
    //         }
    //     } else if (e.code === "ArrowUp") {
    //         if (activeId !== 0) {
    //             setActiveId((prev) => prev - 1);
    //         }
    //     } else if (e.code === "Enter") {
    //         let alreadyExist = false;
    //         const newCart = [...cart];
    //         let item = filteredMedicine[activeId]
    //         newCart.map((item) => {
    //             if (item.id === filteredMedicine[activeId].id) {
    //                 item.qty++;
    //                 alreadyExist = true;
    //             }
    //         });
    //         if (!alreadyExist && filteredMedicine.length > 0) {
    //             newCart.push({
    //                 ...filteredMedicine[activeId],
    //                 qty: 1,
    //                 boxType: "leaf",
    //                 unit: "pcs",
    //                 pktSize: 10,
    //                 noOfBox: 1,
    //                 pcs: 10,
    //                 // price: 20,
    //                 disc: 10,
    //                 totalPrice: item.price * 10,

    //             });
    //         }

    //         setCart(newCart);
    //     }
    // };

    // const medicineHandler = (item, i) => {
    //     let alreadyExist = false;
    //     const newCart = [...cart];
    //     newCart.map((pd) => {
    //         if (pd.id === item.id) {
    //             pd.qty++;
    //             alreadyExist = true;
    //         }
    //     });
    //     if (!alreadyExist) {
    //         newCart.push({
    //             ...item,
    //             qty: 1,
    //             boxType: "leaf",
    //             unit: "pcs",
    //             pktSize: 10,
    //             noOfBox: 1,
    //             pcs: 10,
    //             // price: 20,
    //             disc: 10,
    //             totalPrice: item.price * 10,
    //         });
    //     }
    //     setCart(newCart);
    //     setActiveId(i);
    // };

    // const removeMedicine = (item) => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this data!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             const existCart = [...cart];
    //             const newCart = existCart.filter((pd) => pd.id !== item.id);
    //             setCart(newCart);
    //             http.delete(`/destroy-requisition-details/${item.id}`).then(res => {
    //                 console.log("certificate row Detele");

    //             })
    //             Swal.fire(
    //                 'Deleted!',
    //                 'Your data has been deleted.',
    //                 'success'
    //             )
    //         }
    //     })


    // };

    // const proceedToApproval = () => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You want to send these requisitions for approval!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, send it!'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             http.post(`/proceed-to-requisitions/${id}`).then(res => {
    //                 // console.log("certificate row Detele");
    //                 navigate(`/edit-manager-requisition/${id}`);
    //             })
    //             Swal.fire(
    //                 {
    //                     position: 'top-center',
    //                     icon: 'success',
    //                     title: 'Send!',
    //                     html: 'Your requisitions has been sent to manager.',
    //                     timer: 2500
    //                 }
    //             )
    //         }
    //     })
    // }
    // const sendRequestApprovalMail = () => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You want to send these requisitions mail to sales!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, send it!'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             http.get(`/send-approval-mail-to-sales/${id}`).then(res => {
    //                 navigate(`/edit-manager-requisition/${id}`);
    //             })
    //             Swal.fire(
    //                 {
    //                     position: 'top-center',
    //                     icon: 'success',
    //                     title: 'Send!',
    //                     html: 'Your requisitions approval mail has been sent to sales.',
    //                     timer: 2500
    //                 }
    //             )
    //         }
    //     })
    // }

    // const proceedToApprove = () => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You want to approve these requisitions!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, send it!'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             http.post(`/proceed-to-approve/${id}`).then(res => {
    //                 navigate(`/approved-requisition/${id}`);

    //                 console.log("certificate row Detele");
    //             })
    //             Swal.fire(
    //                 {
    //                     position: 'top-center',
    //                     icon: 'success',
    //                     title: 'Send!',
    //                     html: 'Requisition approved by manager.',
    //                     timer: 2500
    //                 }
    //             )
    //         }
    //     })
    // }

    // const cancelByManager = () => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You want to cancel these requisitions!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, send it!'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             http.get(`/cancel-by-manager/${id}`).then(res => {
    //                 navigate(`/edit-manager-requisition/${id}`);

    //                 console.log("certificate row Delete");
    //             })
    //             Swal.fire(
    //                 {
    //                     position: 'top-center',
    //                     icon: 'success',
    //                     title: 'Send!',
    //                     html: 'Requisition cancelled by manager.',
    //                     timer: 2500
    //                 }
    //             )
    //         }
    //     })
    // }

    // const boxTypeHandler = (item, e) => {
    //     const existCart = [...cart];
    //     existCart.map((pd) => {
    //         if (pd.id === item.id) {
    //             pd.boxType = e.target.value;
    //         }
    //     });
    //     setCart(existCart);
    // };

    // const unitHandler = (item, e) => {
    //     const existCart = [...cart];
    //     existCart.map((pd) => {
    //         if (pd.id === item.id) {
    //             pd.unit = e.target.value;
    //         }
    //     });
    //     setCart(existCart);
    // };

    // const pktSizeHandler = (item, e) => {
    //     const existCart = [...cart];
    //     existCart.map((pd) => {
    //         if (pd.id === item.id) {
    //             pd.pktSize = parseFloat(e.target.value);
    //             pd.req_unit = item.noOfBox * pd.pktSize;
    //             pd.totalPrice = pd.price * pd.req_unit;
    //         }
    //         setCart(existCart);
    //     });
    // };
    // const boxSizeHandler = (item, e) => {
    //     const existCart = [...cart];
    //     existCart.map((pd) => {
    //         if (pd.id === item.id) {

    //             pd.noOfBox = parseFloat(e.target.value);
    //             pd.req_unit = (pd.noOfBox * item.pktSize).toFixed(2);
    //             pd.totalPrice = (pd.price * pd.req_unit).toFixed(2);

    //         }
    //     });
    //     setCart(existCart);
    // };
    // const boxQtyHandler = (item, e) => {
    //     const existCart = [...cart];
    //     existCart.map((pd) => {
    //         if (pd.id === item.id) {
    //             const temp = e.target.value
    //             const test = parseFloat(temp / pd.pktSize);
    //             console.log("Calculated data", test);
    //             pd.noOfBox = test.toFixed(2);

    //             pd.req_unit = parseFloat(temp);
    //             pd.totalPrice = (pd.price * pd.req_unit).toFixed(2);

    //         }
    //     });
    //     setCart(existCart);
    // };

    // // product requisition

    // const closeImage = () => {
    //     setDncImageUrl()
    //     document.getElementById('delivery_no_docs').value = '';
    // }
    // const [dnc_image_error, setDncImageError] = useState();
    // const [DncimageUrl, setDncImageUrl] = useState();
    // const handleDNCImage = (e) => {
    //     e.persist();
    //     if (e.target.files[0].size < 2000048) {
    //         setDNCPicture({ delivery_no_docs: e.target.files[0] })
    //         setDncImageError(null)
    //     } else {
    //         setDncImageError("File size must be less than 2 mb !")
    //     }
    //     if (e.target.files && e.target.files[0] && e.target.files[0].size < 2000048) {
    //         setDncImageUrl(URL.createObjectURL(e.target.files[0]))
    //     } else {
    //         setDncImageError("File size must be less than 2 mb !")
    //     }

    // }

    // const [errors, setError] = useState([]);

    const [form_data, setFormData] = useState({
        purchase_order_no_id: "",
        manufacturer_id: "",
        supplier_id: "",
        expiry_date: "",
        mrr_no: "",
        carrier_id: "",
        delivery_date: "",
        carried_by: "",
        contact_no: "",
        vehicle_no: "",
        remarks: "",
        total_bill_amount: "",
        paid_amount: "",
        due_amount: "",
        delivery_no_docs: "",
        payment_type: "",
    });

    // const [form_data, setMrrInput] = useState({
    //    mrr_expiry_date: "",
    //    delivery_date: "",
    //    carried_by: "",
    //    contact_no: "",
    //    vehicle_no: "",
    //    remarks: "",
    // });

    const handleInput = (e) => {
        setFormData({
            ...form_data, [e.target.name]: e.target.value
        });
    }

    const [req_po_data, setMrrInput] = useState([]);

    // const handleMrrInput = (e) => {
    //     setMrrInput({
    //         ...form_data, [e.target.name]: e.target.value
    //     });
    // }

    // useEffect(() => {
    //     http.get(`view-purchase-order/${id}`).then(res => {
    //         if (res.data.status === 200) {
    //             setMrrInput(res.data.data);
    //             setCart(res.data.req_details);
    //             setCommission(res.data.data.commission)
    //         } else {
    //             setError(res.data.errors);
    //         }
    //     })
    //     http.get('carrier').then(res => {
    //         setCarrier(res.data.data);
    //     });
    //     http.get('supplier').then(res => {
    //         setSupplier(res.data.data);
    //     });
    //     http.get('purchase-order-dropdown-for-mrr').then(res => {
    //         setPurchaseOrder(res.data.data);
    //     });
    //     http.get('requisition-vat-tax').then(res => {
    //         setVat(res.data.vat);
    //         setTax(res.data.tax);
    //     });
    //     http.get(`/material-receiving`).then(async (res) => {
    //         console.log("material receiving", res.data.data[0].id)

    //         const rendomNumber = `MRR-${res.data.data[0].id + 10001}`
    //         // const requisitor_email = user.email
    //         // const requisitor_mobile = user.mobile
    //         // console.log(requisitor_email)
    //         setFormData({
    //             ...form_data,
    //             mrr_no: rendomNumber,
    //             // requisitor_contact_email: requisitor_email,
    //             // requisitor_phone_no: requisitor_mobile,
    //         });

    //     })

    // }, []);


    const cartData = [
        { id: 1, drug_code: "30483458", brand: "ggsg", class: "class", batch: 1, expiry_date: "expiry date", boxType: "hdh", pktSize: "10x3", noOfBox: 1, qty: 10, totalQty: "234", unit: "Pcs", mrp: "7fgyt", purchase_price: "2433", totalPrice: "100tk", addToRackSelf: "hdfdg" },
        { id: 2, drug_code: "30483458", brand: "ggsg", class: "class", batch: 1, expiry_date: "expiry date", boxType: "hdh", pktSize: "10x3", noOfBox: 1, qty: 10, totalQty: "234", unit: "Pcs", mrp: "7fgyt", purchase_price: "2433", totalPrice: "100tk", addToRackSelf: "hdfdg" },
    ];
    const columnsData = [
        { title: 'Item Code', field: 'drug_code' },
        { title: 'Name & Generic', field: 'drug_code', width: "100 !important" },
        { title: 'Brand', field: 'brand' },
        { title: 'Class', field: 'class' },
        { title: 'Batch', field: 'batch' },
        { title: 'Exp. Date', field: 'expiry_date', render: (row) => <div>{moment(row.expiry_date).format('DD-MM-YYYY')}</div> },
        { title: 'Box Type', field: 'boxType', render: (row) => <div className="text-capitalize">{row.boxType}</div> },
        { title: 'Pkt Size', field: 'pktSize', render: (row) => <div className="text-capitalize">{row.pktSize}</div> },
        {
            title: 'No. of Box/Bottle', field: 'noOfBox', render: (row) => <div className='w-[40%] mx-auto'>
                <input
                    // onChange={(e) => boxSizeHandler(row, e)}
                    // defaultValue="1"
                    // value={row.noOfBox}
                    className="form-control form-control-sm text-center"
                    type="number"
                />
            </div>
        },
        {
            title: 'Qty.', field: 'qty', render: (row) => <div className='w-[40%] mx-auto'>
                <input
                    // onChange={(e) => boxSizeHandler(row, e)}
                    // defaultValue="1"
                    // value={row.qty}
                    className="form-control form-control-sm text-center"
                    type="number"
                />
            </div>
        },
        {
            title: 'Total Qty.', field: 'totalQty', render: (row) => <div className='w-[100%]'>
                <input className="form-control form-control-sm"
                    // value={row.req_unit}
                    // onChange={(e) => boxQtyHandler(row, e)}
                    type="number"
                />
            </div>
        },
        { title: 'Unit', field: 'unit', render: (row) => <div className="text-capitalize">{row.unit}</div> },

        { title: 'MRP', field: 'mrp', },

        { title: 'Purchase Price', field: 'purchase_price' },
        { title: 'Total Price', field: 'totalPrice' },
        { title: 'Add to Rack &  Self', field: 'addToRackSelf' },
        {
            title: 'Action', field: 'action',
            cellStyle: {
                textAlign: "center",
            },
            render: (row) => <div className='flex justify-center gap-2'>
                <div>
                    {/* <Link to={`/edit-current-stock-m/${rowData.id}`} className="btn btn-sm action-btn"><i className="far fa-edit"></i></Link> */}
                    {/* <Link to="#" className="btn btn-sm action-btn"><i className="far fa-edit"></i></Link> */}
                    <button type="button" className="btn btn-sm action-btn"
                    // onClick={() => removeMedicine(row)} 
                    ><i className="far fa-trash"></i>
                    </button>
                </div>
            </div>
        },
    ];


    // const submitFormData = (e) => {
    //     e.preventDefault();

    //     const formData = new FormData();

    //     formData.append('purchase_order_no_id', purchase_order_no_id);
    //     formData.append('manufacturer_id', manufacturer_id);
    //     formData.append('supplier_id', selectedSuppValue);
    //     formData.append('mrr_expiry_date', form_data.mrr_expiry_date);
    //     formData.append('mrr_no', form_data.mrr_no);
    //     formData.append('carrier_id', carrier_id);
    //     formData.append('delivery_date', form_data.delivery_date);
    //     formData.append('carried_by', form_data.carried_by);
    //     formData.append('contact_no', form_data.contact_no);
    //     formData.append('vehicle_no', form_data.vehicle_no);
    //     formData.append('remarks', form_data.remarks);
    //     formData.append('total_bill_amount', total_bill_amount.toFixed(2));
    //     formData.append('paid_amount', paid_amount);
    //     formData.append('due_amount', due_amount);
    //     formData.append('payment_type', form_data.payment_type);
    //     formData.append('delivery_no_docs', dnc.delivery_no_docs);

    //     // formData.append('delivery_mode', form_data.delivery_mode == null ? '' : form_data.delivery_mode);
    //     // formData.append('payment_mode', form_data.payment_mode == null ? '' : form_data.payment_mode);
    //     // formData.append('recurring_order', form_data.recurring_order == null ? '' : form_data.recurring_order);
    //     // formData.append('requisition_frequency_id', form_data.requisition_frequency_id == null ? '' : form_data.requisition_frequency_id);
    //     // formData.append('frequency_start_date', form_data.frequency_start_date == null ? '' : form_data.frequency_start_date);
    //     // formData.append('frequency_end_date', form_data.frequency_end_date == null ? '' : form_data.frequency_end_date);
    //     // formData.append('special_instruction', form_data.special_instruction == null ? '' : form_data.special_instruction);
    //     // formData.append('requisition_category_id', form_data.requisition_category_id == null ? '' : form_data.requisition_category_id);
    //     // formData.append('total_amount', total_amount.toFixed(2));
    //     // formData.append('commission_amount', commission_amount.toFixed(2));
    //     // formData.append('vat_amount', vat_amount.toFixed(2));
    //     // formData.append('tax_amount', tax_amount.toFixed(2));
    //     // formData.append('total_bill_amount', total_bill_amount.toFixed(2));


    //     http.post(`save-material-receiving`, formData).then(res => {
    //         console.log('all response', res);
    //         if (res.data.status === 200) {
    //             console.log(cart)
    //             cart.map((item, i) => {
    //                 const academic = new FormData();
    //                 academic.append('material_receiving_master_id', `${purchase_order_no_id}`);

    //                 academic.append('drug_id', item.id);
    //                 academic.append('boxType', item.boxType);
    //                 academic.append('pktSize', item.pktSize);
    //                 academic.append('noOfBox', item.noOfBox);
    //                 academic.append('disc', item.disc);

    //                 // academic.append('pcs', item.pcs);
    //                 academic.append('unit', item.unit);
    //                 academic.append('req_unit', item.req_unit);
    //                 academic.append('totalPrice', item.totalPrice);

    //                 console.log("FromData Academic", academic);

    //                 http.post('save-material-receiving-details', academic).then(res => {
    //                     console.log("save-material-receiving-details")
    //                 })

    //                 // if (item.src_primary_key) {
    //                 //
    //                 //     academic.append('drug_id', item.id);
    //                 //     http.post('save-requisitions-products', academic).then(res => {
    //                 //         console.log("save-requisitions-products")
    //                 //     })
    //                 // } else {
    //                 //     http.post(`/update-requisitions-products/${item.id}`, academic).then(res => {
    //                 //         console.log("update-supplier-social-media")
    //                 //     })
    //                 // }

    //             })

    //             Swal.fire({
    //                 position: 'top-center',
    //                 icon: 'success',
    //                 title: res.data.message,
    //                 timer: 2500
    //             })
    //             navigate('/material-receiving');
    //         } else {
    //             setError(res.data.errors)
    //         }

    //     });

    // }


    return (
        <div className="page-content">

            <div className="custom-card patients-head ">
                <h5 className="fw-normal custom_py-3 px-2  text-start mb-2 card-title">Edit Product Details
                    <button className="btn btn-sm btn-warning float-end" onClick={() => navigate(-1)}>
                        <i class="fal fa-long-arrow-left"></i> Back</button>
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
                                        <div className="row mb-2">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">MRR No</label>
                                            <div className="col-sm-7">
                                                <Select
                                                    options={manufacturer}
                                                    // onChange={handleMNInput}
                                                    placeholder={'Select'}
                                                    getOptionLabel={(manufacturer) => `${manufacturer.name}`}
                                                    getOptionValue={(manufacturer) => `${manufacturer.name}`}
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
                                    <div className="col-md-6">
                                        <div className="row mb-2">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5">Manufacturer</label>
                                            <div className="col-sm-7">
                                                <Select
                                                    options={manufacturer}
                                                    // onChange={handleMNInput}
                                                    placeholder={'Select'}
                                                    getOptionLabel={(manufacturer) => `${manufacturer.name}`}
                                                    getOptionValue={(manufacturer) => `${manufacturer.name}`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row mb-2">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5">Supplier</label>
                                            <div className="col-sm-7">
                                                <Select
                                                    options={manufacturer}
                                                    // onChange={handleMNInput}
                                                    placeholder={'Select'}
                                                    getOptionLabel={(manufacturer) => `${manufacturer.name}`}
                                                    getOptionValue={(manufacturer) => `${manufacturer.name}`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row mb-2">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Purchase Order</label>
                                            <div className="col-sm-7">
                                                <Select
                                                    options={manufacturer}
                                                    // onChange={handleMNInput}
                                                    placeholder={'Select'}
                                                    getOptionLabel={(manufacturer) => `${manufacturer.name}`}
                                                    getOptionValue={(manufacturer) => `${manufacturer.name}`}
                                                />
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

                                </div>
                            </div>
                        </div>

                        <div className="card mt-2">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="row mb-2">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5">Purchase No</label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control form-control-sm" id="exampleInputUsername2"
                                                    //    onChange={handleInput} value={form_data.mrr_no} name="mrr_no"
                                                    readOnly />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row mb-2">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5">Date : </label>
                                            <div className="col-sm-7">
                                                {moment().format('DD-MM-YYYY')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row ">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Carrier</label>
                                            <div className="col-sm-7">
                                                <Select
                                                    options={manufacturer}
                                                    // onChange={handleMNInput}
                                                    placeholder={'Select'}
                                                    getOptionLabel={(manufacturer) => `${manufacturer.name}`}
                                                    getOptionValue={(manufacturer) => `${manufacturer.name}`}
                                                />
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
                                            <input type="radio" className="form-check-input" id="cash_payment1"
                                            //  onChange={handleInput} value="cash" name="payment_type"  
                                            />
                                            <label className="form-check-label" htmlFor="cash_payment1">
                                                Cash
                                            </label>
                                        </div>
                                        <div className="form-check mb-2">
                                            <input type="radio" className="form-check-input"
                                                // onChange={handleInput} value="card" name="payment_type"
                                                id="card_payment1" />
                                            <label className="form-check-label" htmlFor="card_payment1">
                                                Credit/Debit Card
                                            </label>
                                        </div>
                                        <div className="row mb-1">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-12 pt-1">Total :
                                                {/* {total_bill_amount.toFixed(2)}  */}
                                            </label>
                                        </div>
                                        <div className="row">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Paid</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control form-control-sm" id="exampleInputUsername2"
                                                //    onChange={handlePaidInput} name="paid_amount"
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Due</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control form-control-sm" id="exampleInputUsername2" readOnly
                                                //    onChange={handleInput} value={due_amount} name="due_amount"
                                                />
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
                            // data={cart}
                            data={cartData}
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

                {/* {
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
                }

 */}
            </form>
            {/*requisition product*/
            }

        </div>

    )
}

export default EditProductDetails;

