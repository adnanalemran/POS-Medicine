import axios from 'axios';
import React, {useEffect} from 'react'
import {useState} from 'react';
import http from "../../../http";
import {toast} from 'react-toastify';
import Swal from 'sweetalert2';
import {Link, useNavigate, useParams} from 'react-router-dom';
import AuthUser from "../../../Components/AuthUser";
import moment from "moment";
// import {user} from "../../../../public/assets/vendors/feather-icons/feather";
import Select from 'react-select'
import MaterialTable from "material-table";
function ViewPurchaseOrder() {

    const {id} = useParams();

    const navigate = useNavigate();
    const {http, user} = AuthUser();

    const [requisition_category, setRequisitionCategory] = useState([]);
    const [requisition_frequency, setRequisitionFrequency] = useState([]);
    const [purchase_order, setPurchaseOrder] = useState([]);
    const [supplier, setSupplier] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [purchase_order_no_id, setPurchaseOrderId] = useState();
    const [vat, setVat] = useState([]);
    const [tax, setTax] = useState([]);
    const [commission, setCommission] = useState([]);

    const [delivery_mode, setDeliveryMode] = useState([]);
    const [delivery_channel, setDeliveryChannel] = useState([]);
    const [payment_mode, setPaymentMode] = useState([]);
    const [payment_channel, setPaymentChannel] = useState([]);


    const handlePoInput = (e) => {
        setPurchaseOrderId(e.id);
    }

    const [selectedDMValue, setDMSelect] = useState();
    const handleDMChange = (e) => {
        setDMSelect(e.id);
    }

    const [selectedPMValue, setPMSelect] = useState();
    const handlePMChange = (e) => {
        setPMSelect(e.id);
    }

    const [selectedPCValue, setPCSelect] = useState();
    const handlePCChange = (e) => {
        setPCSelect(e.id)
        setFormData({...form_data, preferred_payment_channel: e.id})
    }
console.log(selectedPCValue , "dd")
    const [selectedDCValue, setDCSelect] = useState();
    const handleDCChange = (e) => {
        setDCSelect(e.id)
        setFormData({...form_data, delivery_channel_id: e.id})
    }

    useEffect(()=> {

        if (purchase_order_no_id !== null){
            http.get(`view-purchase-order/${purchase_order_no_id}`).then(res=> {
                if (res.data.status === 200) {
                    console.log("view Purchase orderaaaa",res.data.data);
                    setFormData(res.data.data);
                    setCart(res.data.req_details);
                    setCommission(res.data.data.commission)
                } else {
                    setError(res.data.errors);
                }
            })
        }

    },[purchase_order_no_id]);

    // product requisition
    const [filteredMedicine, setFilteredMedicine] = useState([]);
    const [cart, setCart] = useState([]);
    const [searchWord, setSearchWord] = useState("");

    // console.log("latest cart",cart)
    const total_amount = cart.reduce((total,item) => total+parseFloat(item.totalPrice),0)
    const commission_amount = cart.reduce((previousValue, currentValue) =>previousValue + (commission * parseFloat(currentValue.totalPrice)) / 100, 0);
    const cart_subtotal = total_amount+commission_amount;
    const vat_amount = (cart_subtotal*vat.vat_name)/100;
    const tax_amount = (cart_subtotal*tax.tax_name)/100;
    const total_bill_amount = total_amount + vat_amount + tax_amount - commission_amount;

    const [activeId, setActiveId] = useState(0);
    const [loading, setLoading] = useState(false);
    const handleKeyPress = (e) => {
        if (e.code === "ArrowDown") {
            if (activeId < filteredMedicine.length - 1) {
                setActiveId((prev) => prev + 1);
            }
        } else if (e.code === "ArrowUp") {
            if (activeId !== 0) {
                setActiveId((prev) => prev - 1);
            }
        } else if (e.code === "Enter") {
            let alreadyExist = false;
            const newCart = [...cart];
            let item = filteredMedicine[activeId]
            newCart.map((item) => {
                if (item.id === filteredMedicine[activeId].id) {
                    item.qty++;
                    alreadyExist = true;
                }
            });
            if (!alreadyExist && filteredMedicine.length > 0) {
                newCart.push({
                    ...filteredMedicine[activeId],
                    qty: 1,
                    boxType: "leaf",
                    unit: "pcs",
                    pktSize: 10,
                    noOfBox: 1,
                    pcs: 10,
                    // price: 20,
                    disc: 10,
                    totalPrice: item.price*10,

                    // totalPrice: 200,
                });
            }

            setCart(newCart);
        }
    };

    const medicineHandler = (item, i) => {
        let alreadyExist = false;
        const newCart = [...cart];
        newCart.map((pd) => {
            if (pd.id === item.id) {
                pd.qty++;
                alreadyExist = true;
            }
        });
        if (!alreadyExist) {
            newCart.push({
                ...item,
                qty: 1,
                boxType: "leaf",
                unit: "pcs",
                pktSize: 10,
                noOfBox: 1,
                pcs: 10,
                // price: 20,
                disc: 10,
                totalPrice: item.price*10,
            });
        }
        setCart(newCart);
        setActiveId(i);
    };

    const removeMedicine = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this data!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const existCart = [...cart];
                const newCart = existCart.filter((pd) => pd.id !== item.id);
                setCart(newCart);
                http.delete(`/destroy-requisition-details/${item.id}`).then(res => {
                    console.log("certificate row Detele");

                })
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                )
            }
        })


    };

    const proceedToApproval = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to send these requisitions for approval!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, send it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // const existCart = [...cart];
                // const newCart = existCart.filter((pd) => pd.id !== item.id);
                // setCart(newCart);
                http.post(`/proceed-to-po/${id}`).then(res => {
                    // console.log("certificate row Detele");
                    navigate(`/view-sales-purchase-order/${id}`);
                })
                Swal.fire(
                    {
                        position: 'top-center',
                        icon: 'success',
                        title: 'Send!',
                        html: 'Your requisitions has been sent to manager.',
                        timer: 2500
                    }
                )
            }
        })
    }
    const sendRequestApprovalMail = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to send these requisitions mail to sales!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, send it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // const existCart = [...cart];
                // const newCart = existCart.filter((pd) => pd.id !== item.id);
                // setCart(newCart);
                http.get(`/send-approval-mail-to-sales/${id}`).then(res => {
                    // console.log("certificate row Detele");
                    navigate(`/edit-manager-requisition/${id}`);
                })
                Swal.fire(
                    {
                        position: 'top-center',
                        icon: 'success',
                        title: 'Send!',
                        html: 'Your requisitions approval mail has been sent to sales.',
                        timer: 2500
                    }
                )
            }
        })
    }

    const proceedToApprove = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to approve these requisitions!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, send it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // const existCart = [...cart];
                // const newCart = existCart.filter((pd) => pd.id !== item.id);
                // setCart(newCart);
                http.post(`/proceed-to-approve/${id}`).then(res => {
                    navigate(`/approved-requisition/${id}`);

                    console.log("certificate row Detele");
                })
                Swal.fire(
                    {
                        position: 'top-center',
                        icon: 'success',
                        title: 'Send!',
                        html: 'Requisition approved by manager.',
                        timer: 2500
                    }
                )
            }
        })
    }

    const cancelByManager = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to cancel these requisitions!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, send it!'
        }).then((result) => {
            if (result.isConfirmed) {
                http.get(`/cancel-by-manager/${id}`).then(res => {
                    navigate(`/edit-manager-requisition/${id}`);

                    console.log("certificate row Delete");
                })
                Swal.fire(
                    {
                        position: 'top-center',
                        icon: 'success',
                        title: 'Send!',
                        html: 'Requisition cancelled by manager.',
                        timer: 2500
                    }
                )
            }
        })
    }

    const boxTypeHandler = (item, e) => {
        const existCart = [...cart];
        existCart.map((pd) => {
            if (pd.id === item.id) {
                pd.boxType = e.target.value;
            }
        });
        setCart(existCart);
    };

    const unitHandler = (item, e) => {
        const existCart = [...cart];
        existCart.map((pd) => {
            if (pd.id === item.id) {
                pd.unit = e.target.value;
            }
        });
        setCart(existCart);
    };

    const pktSizeHandler = (item, e) => {
        const existCart = [...cart];
        existCart.map((pd) => {
            if (pd.id === item.id) {
                pd.pktSize = parseFloat(e.target.value);
                pd.req_unit = item.noOfBox * pd.pktSize;
                pd.totalPrice = pd.price * pd.req_unit;
            }
            setCart(existCart);
        });
    };
    const boxSizeHandler = (item, e) => {
        const existCart = [...cart];
        existCart.map((pd) => {
            if (pd.id === item.id) {
                // pd.noOfBox = parseFloat(e.target.value);
                // pd.req_unit = pd.noOfBox * item.pktSize;
                // pd.totalPrice = pd.price * pd.req_unit;

                pd.noOfBox = parseFloat(e.target.value);
                pd.req_unit = (pd.noOfBox * item.pktSize).toFixed(2);
                pd.totalPrice = (pd.price * pd.req_unit).toFixed(2);

            }
        });
        setCart(existCart);
    };
    const boxQtyHandler = (item, e) => {
        const existCart = [...cart];
        existCart.map((pd) => {
            if (pd.id === item.id) {
                // pd.req_unit = parseFloat(e.target.value);
                // pd.totalPrice = pd.price * pd.req_unit;

                const temp = e.target.value
                const test = parseFloat(temp / pd.pktSize);
                console.log("Calculated data",test);
                pd.noOfBox = test.toFixed(2);

                pd.req_unit = parseFloat(temp);
                pd.totalPrice = (pd.price * pd.req_unit).toFixed(2);

            }
        });
        setCart(existCart);
    };

    // product requisition





    const [errors, setError] = useState([]);

    const [form_data, setFormData] = useState({
        requisition_no: "",
        requisition_category_id: "",
        expected_date_of_delivery: "",
        requisitor_contact_email: "",
        requisitor_phone_no: "",
        date_and_time: "",
        test_sample: "",
        supplier_id: "",

        delivery_mode: "",
        delivery_channel: "",
        payment_mode: "",
        payment_channel: "",

        recurring_order: "",
        requisition_frequency_id: "",
        frequency_start_date: "",
        frequency_end_date: "",
        special_instruction: "",

        total_amount: "",
        commission_amount: "",
        vat_amount: "",
        tax_amount: "",
        total_bill_amount: "",
        preferred_delivery_mode: "",
        preferred_payment_mode: "",
        preferred_payment_channel: "",
        preferred_payment_channel_id:""

    });

    const handleInput = (e) => {
        setFormData({
            ...form_data, [e.target.name]: e.target.value
        });
    }

    // ......................................................................

    useEffect(() => {
        http.get(`view-purchase-order/${id}`).then(res=> {
            if (res.data.status === 200) {
                console.log("view Purchase orderuuuuuuuuuu",res.data.data);
                setFormData(res.data.data);
                setCart(res.data.req_details);
                setCommission(res.data.data.commission);
                setDMSelect(res.data.data.delivery_mode_id);
                setPMSelect(res.data.data.delivery_mode_id);
                setPCSelect(res.data.data.payment_channel_id);
                setDCSelect(res.data.data.delivery_channel_id);
            } else {
                setError(res.data.errors);
            }
        })
        http.get('requisition-category').then(res => {
            setRequisitionCategory(res.data.data);
        });
        http.get('supplier').then(res => {
            setSupplier(res.data.data);
        });
        http.get('requisition-frequency').then(res => {
            setRequisitionFrequency(res.data.data);
        });
        http.get('purchase-order-dropdown').then(res => {
            console.log(res.data.data)
            setPurchaseOrder(res.data.data);
        });
        http.get('requisition-vat-tax').then(res => {
            // console.log(res.data.vat)
            setVat(res.data.vat);
            setTax(res.data.tax);
        });
        http.get('delivery-mode').then(res => {
            setDeliveryMode(res.data.data);
        });
        http.get('payment-mode').then(res => {
            setPaymentMode(res.data.data);
        });
        http.get('payment-channel').then(res => {
            setPaymentChannel(res.data.data);
        });
        http.get('delivery-channel').then(res => {
            setDeliveryChannel(res.data.data);
        });
    }, []);


    const submitFormData = (e) => {
        e.preventDefault();

        const formData = new FormData();

        // formData.append('src_primary_key', total_amount);
        // formData.append('src_primary_key', form_data.src_primary_key);
        formData.append('requisition_no', form_data.requisition_no == null ? '' : form_data.requisition_no);
        formData.append('requisition_category_id', form_data.requisition_category_id == null ? '' : form_data.requisition_category_id);
        formData.append('expected_date_of_delivery', form_data.expected_date_of_delivery == null ? '' : form_data.expected_date_of_delivery);
        formData.append('requisitor_contact_email', form_data.requisitor_contact_email == null ? '' : form_data.requisitor_contact_email);
        formData.append('requisitor_phone_no', form_data.requisitor_phone_no == null ? '' : form_data.requisitor_phone_no);
        formData.append('date_and_time', form_data.date_and_time == null ? '' : form_data.date_and_time);
        formData.append('test_sample', form_data.test_sample == null ? '' : form_data.test_sample);
        formData.append('supplier_id', form_data.supplier_id == null ? '' : form_data.supplier_id);
        formData.append('delivery_mode', form_data.delivery_mode == null ? '' : form_data.delivery_mode);
        formData.append('payment_mode', form_data.payment_mode == null ? '' : form_data.payment_mode);
        formData.append('recurring_order', form_data.recurring_order == null ? '' : form_data.recurring_order);
        formData.append('requisition_frequency_id', form_data.requisition_frequency_id == null ? '' : form_data.requisition_frequency_id);
        formData.append('frequency_start_date', form_data.frequency_start_date == null ? '' : form_data.frequency_start_date);
        formData.append('frequency_end_date', form_data.frequency_end_date == null ? '' : form_data.frequency_end_date);
        formData.append('special_instruction', form_data.special_instruction == null ? '' : form_data.special_instruction);
        formData.append('requisition_category_id', form_data.requisition_category_id == null ? '' : form_data.requisition_category_id);
        formData.append('total_amount', total_amount.toFixed(2));
        formData.append('commission_amount', commission_amount.toFixed(2));
        formData.append('vat_amount', vat_amount.toFixed(2));
        formData.append('tax_amount', tax_amount.toFixed(2));
        formData.append('total_bill_amount', total_bill_amount.toFixed(2));

        formData.append('preferred_delivery_mode_id', selectedDMValue);
        formData.append('preferred_payment_mode_id', selectedPMValue);
        formData.append('preferred_payment_channel_id', selectedPCValue);
        formData.append('delivery_channel_id', selectedDCValue);

        // formData.append('purchase_order_no_id', purchase_order_no_id);

        http.post(`update-purchase-order/${id}`, formData).then(res => {
            console.log(res);
            if (res.data.status === 200) {
                console.log(cart)
                cart.map((item, i) => {
                    const academic = new FormData();
                    academic.append('requisition_master_id', `${id}`);

                    academic.append('boxType', item.boxType);
                    academic.append('pktSize', item.pktSize);
                    academic.append('noOfBox', item.noOfBox);
                    academic.append('disc', item.disc);

                    // academic.append('pcs', item.pcs);
                    academic.append('unit', item.unit);
                    academic.append('req_unit', item.req_unit);
                    academic.append('totalPrice', item.totalPrice);

                    console.log("FromData Academic", academic);


                    if (item.src_primary_key) {

                        academic.append('drug_id', item.id);
                        http.post('save-requisitions-products', academic).then(res => {
                            console.log("save-requisitions-products")
                        })
                    } else {
                        http.post(`/update-requisitions-products/${item.id}`, academic).then(res => {
                            console.log("update-supplier-social-media")
                        })
                    }

                })

                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res.data.message,
                    timer: 2500
                })
                navigate('/purchase-order');
            } else {
                setError(res.data.errors)
            }

        });

    }



    const handleChangeCertificate = (e, index) => {
        const {name, value} = e.target;
        const list = [...cart];
        list[index][name] = value;
        setCart(list);
    }

    // console.log("set cart",cart)

    const columnsData = [
        { title: 'Item Code', field: 'drug_code' },
        { title: 'Name', field: 'drug_name', width: "100 !important"},
        { title: 'Class', field: 'class' },
        { title: 'Batch', field: 'batch' },
        { title: 'Exp Date', field: 'expiry_date', render:(row) => <div>{moment(row.expiry_date).format('DD-MM-YYYY')}</div> },
        { title: 'Box Type', field: 'boxType', render:(row) => <div className="text-capitalize">{row.boxType}</div> },
        { title: 'Pkt Size', field: 'pktSize', render: (row) => <div className="text-capitalize">{row.pktSize}</div> },
        { title: 'No. of Box/Bottle', field: 'noOfBox', render: (row) => <div className='w-[40%] mx-auto'>
                <input
                    onChange={(e) => boxSizeHandler(row, e)}
                    // defaultValue="1"
                    style={{width:'80px' ,margin:'auto'}}
                    readOnly
                    value={row.noOfBox}
                    className="form-control form-control-sm text-center"
                    type="number"
                />
            </div> },
        { title: 'Unit', field: 'unit', render: (row) => <div className="text-capitalize">{row.unit}</div> },
        { title: 'Quantity', field: 'req_unit', render: (row) => <div className='w-[100%]'>
                <input className="form-control form-control-sm"
                       value={row.req_unit}
                       readOnly
                       style={{width:'80px' ,margin:'auto'}}
                       onChange={(e) => boxQtyHandler(row, e)}
                       type="number"
                />
            </div> },
        { title: 'MRP', field: 'price', },

        { title: 'Total Price', field: 'totalPrice'},
        // {title: 'Action', field: 'action', render: (row) => 
        //     <div className='flex justify-center gap-2'>
        //         <div>
        //             <button type="button" onClick={() => removeMedicine(row)} className="btn btn-sm action-btn"><i
        //                 className="far fa-trash"></i></button>
        //         </div>
        //     </div>},
    ]

    


    return (
        <div className="page-content">

            <div className="custom-card patients-head ">
                <h5 className="fw-normal custom_py-3 px-2  text-start mb-2 card-title">Purchase Order
                    <button className="btn btn-sm btn-warning float-end" onClick={() => navigate(-1)}>
                        <i class="fal fa-long-arrow-left"></i> Back</button>
                </h5>
            </div>


            <form  onSubmit={submitFormData}>

                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="card purchase_order_info">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h6 className="mb-3">Purchase Order Info</h6>
                                        <div className="row mb-3">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5">Purchase Order No</label>
                                            <div className="col-sm-7">
                                                :   <span >{form_data.purchase_order_no}</span>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5">P.O. Date</label>
                                            <div className="col-sm-7">
                                                :   <span >{moment(form_data.po_create_date).format("DD-MM-YYYY")}</span>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5">Requisition No.</label>
                                            <div className="col-sm-7">
                                                :   <span >{form_data.requisition_no}</span>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5">R.Q. Date</label>
                                            <div className="col-sm-7">
                                                :   <span >{form_data.date_and_time=== null ? '' : moment(form_data.date_and_time).format('DD-MM-YYYY')}</span>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5">Submitted By</label>
                                            <div className="col-sm-7">
                                                :   <span >{form_data.name}</span>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5">Exp. Date of Delivery</label>
                                            <div className="col-sm-7">
                                                :   <span >{form_data.expected_date_of_delivery=== null ? '' : moment(form_data.expected_date_of_delivery).format('DD-MM-YYYY')}</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5">Date</label>
                                            <div className="col-sm-7">
                                                :   <span >{moment().format('DD-MM-YYYY')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="col-lg-6 col-md-6 requisition_status_blog">
                        <div className="card mb-2 supplier_info">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h6 className="mb-2">Supplier Info</h6>
                                        <div className="row mb-1">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5">Category</label>
                                            <div className="col-sm-7">
                                                :   <span >{form_data.requisition_category_name}</span>
                                            </div>
                                        </div>
                                        <div className="row mb-1">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5">Name</label>
                                            <div className="col-sm-7">
                                                :   <span >{form_data.supplier_name}</span>
                                            </div>
                                        </div>
                                        <div className="row mb-1">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5">Contact Email</label>
                                            <div className="col-sm-7">
                                                :   <span >{form_data.supplier_email}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h6 className="mb-1">Delivery Details</h6>
                                        <div className="row">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Preferred Delivery Mode</label>
                                            <div className="col-sm-7">
                                                <Select
                                                    options={delivery_mode}
                                                    onChange={handleDMChange}
                                                    placeholder={'Select'}
                                                    getOptionLabel={(delivery_mode) => `${delivery_mode.delivery_mode_name}`}
                                                    getOptionValue={(delivery_mode) => `${delivery_mode.id}`}
                                                    value={delivery_mode.filter(delivery_mode => delivery_mode.id === Number(form_data.delivery_mode_id))}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Preferred Payment Mode</label>
                                            <div className="col-sm-7">
                                                <Select
                                                    options={payment_mode}
                                                    onChange={handlePMChange}
                                                    placeholder={'Select'}
                                                    getOptionLabel={(payment_mode) => `${payment_mode.payment_mode_name}`}
                                                    getOptionValue={(payment_mode) => `${payment_mode.id}`}
                                                    value={payment_mode.filter(payment_mode => payment_mode.id === Number(form_data.payment_mode_id))}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Preferred Payment Channel</label>
                                            <div className="col-sm-7">
                                                {console.log(payment_channel, form_data)}
                                                <Select
                                                    options={payment_channel}
                                                    onChange={handlePCChange}
                                                    placeholder={'Select'}
                                                    getOptionLabel={(payment_channel) => `${payment_channel.payment_channel_name}`}
                                                    getOptionValue={(payment_channel) => `${payment_channel.id}`}
                                                    value={payment_channel.filter(payment_channel => payment_channel.id === Number(form_data.preferred_payment_channel))}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Delivery Channel</label>
                                            <div className="col-sm-7">
                                                <Select
                                                    options={delivery_channel}
                                                    onChange={handleDCChange}
                                                    placeholder={'Select'}
                                                    getOptionLabel={(delivery_channel) => `${delivery_channel.delivery_channel_name}`}
                                                    getOptionValue={(delivery_channel) => `${delivery_channel.id}`}
                                                    value={delivery_channel.filter(delivery_channel => delivery_channel.id === form_data.delivery_channel_id)}
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
                            <div className="card-body">
                                <h6 className="mb-3">Product Details</h6>
                                {/* <input
                                    
                                    type="text"
                                    placeholder="Search"
                                    readOnly
                                    onKeyDown={handleKeyPress}
                                    value={searchWord}
                                    onChange={(e) => {
                                        setSearchWord(e.target.value)
                                        if (e.target.value.length > 1) {
                                            setLoading(true);
                                            http
                                                .get(
                                                    `search-drug/${e.target.value}`
                                                )
                                                .then((res) => {
                                                    setFilteredMedicine(res.data);
                                                    setLoading(false);
                                                });
                                            setActiveId(0);
                                        } else {
                                            setFilteredMedicine([]);
                                            setLoading(false);
                                            setActiveId(0);
                                        }
                                    }}
                                    className="form-control form-control-sm"
                                /> */}

                                <input
                                    type="text"
                                    placeholder="Search"
                                    onKeyDown={handleKeyPress}
                                    readOnly
                                    value={searchWord}
                                    onChange={(e) => {
                                        setSearchWord(e.target.value)
                                        if (e.target.value.length > 1) {
                                            setLoading(true);
                                            http
                                                .get(
                                                    `search-drug/${e.target.value}`
                                                )
                                                .then((res) => {
                                                    setFilteredMedicine(res.data);
                                                    setLoading(false);
                                                });
                                            setActiveId(0);
                                        } else {
                                            setFilteredMedicine([]);
                                            setLoading(false);
                                            setActiveId(0);
                                        }
                                    }}
                                    className="form-control form-control-sm"
                                />
                                {filteredMedicine.length > 0 && !loading && (
                                    <div className="search-result-container g-doc-scroll pt-2">
                                        {filteredMedicine.map((item, i) => (
                                            <div
                                                onClick={() => medicineHandler(item, i)}
                                                className={`${activeId === i && "active-medicine"
                                                } row filtered-medicine mb-2`}
                                            >
                                                {/*<div className="col-3">*/}
                                                {/*    <p>{item.macrohealth_sg}</p>*/}
                                                {/*</div>*/}
                                                <div className="col-4">
                                                    <p>{item.drug_name}</p>
                                                </div>
                                                <div className="col-3">
                                                    <p>Exp.date: June, 2022</p>
                                                </div>
                                                <div className="col-2">
                                                    <p>
                                                        <span className="medicine-inStock">
                                                        In Stock{" "}
                                                            <i
                                                                style={{fontSize: "7px"}}
                                                                className=" ms-2 fa-solid fa-circle"
                                                            ></i>
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/*<table className="table table-striped table-striped table-hover mt-3">*/}
                                {/*    <tr className="cart-table-head">*/}
                                {/*        <td width={"7%"}>Drug Code</td>*/}
                                {/*        <td width={"12%"}>Name</td>*/}
                                {/*        /!*<td width={"7%"}>Brand</td>*!/*/}
                                {/*        <td width={"7%"}>Exp. Date</td>*/}
                                {/*        <td width={"11%"}>Box Type</td>*/}
                                {/*        <td width={"9%"}>Size</td>*/}
                                {/*        <td width={"7%"}>Box</td>*/}
                                {/*        <td width={"9%"}>Unit</td>*/}
                                {/*        <td width={"10%"}>Qty.</td>*/}
                                {/*        <td width={"7%"}>Discount</td>*/}
                                {/*        <td width={"8%"}>MRP</td>*/}
                                {/*        <td width={"8%"}>Total</td>*/}
                                {/*        <td width={"5%"}>Action</td>*/}
                                {/*    </tr>*/}
                                {/*    {cart.length > 0 &&*/}
                                {/*    cart.map((item, i) => (*/}
                                {/*        <tr key={i} className="border-bottom">*/}
                                {/*            <td width={"7%"}>*/}
                                {/*                /!*<input type="hidden" className="form-control form-control-sm"*!/*/}
                                {/*                /!*       value={item.id} name="drug_id"*!/*/}
                                {/*                /!*    onChange={e => handleChangeCertificate(e, i)}*!/*/}
                                {/*                /!*       className="form-check"/>*!/*/}
                                {/*                {item.drug_code}*/}
                                {/*            </td>*/}
                                {/*            <td width={"12%"}>{item.drug_name}*/}
                                {/*                /!*& {item.generic_name.generic_name}*!/*/}
                                {/*            </td>*/}
                                {/*            /!*<td width={"7%"}>*!/*/}
                                {/*            /!*{item.brand.title}*!/*/}
                                {/*            /!*</td>*!/*/}
                                {/*            <td width={"7%"}>{item.expiry_date}</td>*/}

                                {/*            <td width={"11%"}>*/}
                                {/*                <select name="leaf"*/}
                                {/*                        value={item.boxType}*/}
                                {/*                        onChange={(e) => boxTypeHandler(item, e)}*/}
                                {/*                        aria-label=".form-select-sm example" className="form-select form-select-sm"*/}
                                {/*                >*/}
                                {/*                    <option value="Leaf">Leaf</option>*/}
                                {/*                    <option value="Full Box">Full Box</option>*/}
                                {/*                    <option value="Bottle">Bottle</option>*/}
                                {/*                </select>*/}
                                {/*            </td>*/}
                                {/*            <td width={"9%"}>*/}
                                {/*                <select className="form-select form-select-sm" value={item.pktSize}*/}
                                {/*                        onChange={(e) => pktSizeHandler(item, e)}*/}
                                {/*                        aria-label=".form-select-sm example"*/}
                                {/*                >*/}
                                {/*                    <option value="10">1/10</option>*/}
                                {/*                    <option value="16">1/16</option>*/}
                                {/*                </select>*/}
                                {/*            </td>*/}
                                {/*            <td width={"7%"}>*/}
                                {/*                <input className="form-control form-control-sm" name="size"*/}
                                {/*                       onChange={(e) => boxSizeHandler(item, e)}*/}
                                {/*                       defaultValue={item.noOfBox}*/}
                                {/*                       className="form-control form-control-sm "*/}
                                {/*                       type="number"*/}
                                {/*                />*/}
                                {/*            </td>*/}
                                {/*            <td width={"9%"}>*/}
                                {/*                <select value={item.unit} onChange={(e) => unitHandler(item, e)} aria-label=".form-select-sm example" className="form-select form-select-sm">*/}
                                {/*                    <option value="pcs">Pcs</option>*/}
                                {/*                    <option value="bottle">Bottle</option>*/}
                                {/*                </select>*/}
                                {/*            </td>*/}
                                {/*            <td width={"10%"}>*/}
                                {/*                <input className="form-control form-control-sm"*/}
                                {/*                       defaultValue={item.req_unit}*/}
                                {/*                       onChange={(e) => boxQtyHandler(item, e)}*/}
                                {/*                       className="form-control form-control-sm"*/}
                                {/*                       type="number"*/}
                                {/*                />*/}
                                {/*            </td>*/}
                                {/*            <td width={"7%"}>{item.disc}%</td>*/}
                                {/*            <td width={"8%"}>{item.price}</td>*/}
                                {/*            <td width={"8%"}>*/}
                                {/*                {item.totalPrice}*/}
                                {/*            </td>*/}
                                {/*            <td width={"5%"}>*/}
                                {/*                <button type="button" onClick={() => removeMedicine(item)} className="btn btn-sm action-btn"><i*/}
                                {/*                    className="far fa-trash"></i></button>*/}
                                {/*            </td>*/}
                                {/*        </tr>*/}
                                {/*    ))}*/}
                                {/*</table>*/}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-md-12 col-mg-12">

                        <MaterialTable
                            title={
                                <h6 style={{fontWeight:'500'}}>Product Details</h6>
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
                                rowStyle:{
                                    fontSize:'.75rem',
                                    textAlign:'center',
                                },
                                headerStyle:{
                                    fontSize:'.75rem',
                                    border:'1px solid #c9c9c9' ,
                                    textAlign:'center',
                                    zIndex:'0',
                                    whiteSpace: 'nowrap'
                                },
                            }}
                        />
                    </div>
                </div>

                {/* <button className="btn btn-sm btn-success float-end text-uppercase mt-3 me-2" onClick={updatePurchaseOrder}>
                    <i className="fas fa-save"></i> Update
                </button> */}

                {
                    (form_data.po_is_sent === null) ?
                        <button type="button" onClick={() => proceedToApproval()} className="btn btn-sm btn-success float-end text-uppercase mt-3 me-2">
                            <i className="fas fa-paper-plane"></i> Send PO
                        </button>
                        : ''
                }



                {/*{*/}
                {/*    form_data.requisition_status === "approved" ?*/}
                {/*        <button type="button" onClick={() => sendRequestApprovalMail()} className="btn btn-sm btn-success float-end text-uppercase mt-3 me-2">*/}
                {/*            <i className="fas fa-paper-plane"></i> Email*/}
                {/*        </button>*/}
                {/*        : ''*/}
                {/*}*/}






            </form>
            {/*requisition product*/
            }

        </div>

    )
}

export default ViewPurchaseOrder
