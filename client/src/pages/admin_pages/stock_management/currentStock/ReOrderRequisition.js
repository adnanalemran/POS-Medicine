
import React, { useEffect } from 'react'
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
// import AuthUser from "../../../Components/AuthUser";
import moment from 'moment';
import { ImCross } from "react-icons/im";
import Select from "react-select";
import MaterialTable from "material-table";
import { toast } from 'react-toastify';
import '../../requisition/Requisition.css'
import AuthUser from '../../../../Components/AuthUser';
import { useContext } from 'react';
import { memberContext } from '../../../../navbar/auth';

// function addMonths(date, months) {
//     var d = date.getDate();
//     date.setMonth(date.getMonth() + +months);
//     if (date.getDate() != d) {
//       date.setDate(0);
//     }
//     return date;
// }

function ReOrderRequisition() {

    const navigate = useNavigate();
    const { http, user } = AuthUser();
    const { cart, setCart } = useContext(memberContext);

    const [requisition_category, setRequisitionCategory] = useState([]);
    const [requisition_frequency, setRequisitionFrequency] = useState([]);
    const [delivery_mode, setDeliveryMode] = useState([]);
    const [payment_mode, setPaymentMode] = useState([]);
    const [requisition_category_select, setRequisitionCategorySelect] = useState("");
    const [delivery_mode_id, setDMSelect] = useState("");
    const [payment_mode_id, setPMSelect] = useState("");
    const [requisition_frequency_id, setRFSelect] = useState("");
    const [ts_select, setTSSelect] = useState("");
    const [vat, setVat] = useState([]);
    const [tax, setTax] = useState([]);
    const [commission, setCommission] = useState([]);
    const [supplier, setSupplier] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [purchase_order_no_id, setPurchaseOrderId] = useState("");
    // const [endDate,setEndDate] = useState();


    const alertToast = (text) => toast.error(text);

    const someDate = new Date();
    const date = someDate.setDate(someDate.getDate());
    const defaultDate = new Date(date).toISOString().split("T")[0];

    const numberOfDaysToAdd = 15;
    const afterDate = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    const defaultAfterDate = new Date(afterDate).toISOString().split("T")[0];


    const [brands, setBrands] = useState([]);
    const [suplierDetails, setSuplierDetails] = useState({ vat: 0, tax: 0, commission: 0 });
    const handlePoInput = (e) => {
        setSuplierDetails({
            ...suplierDetails,
            vat: e.vat ? parseFloat(e.vat) : 0,
            tax: e.tax ? parseFloat(e.tax) : 0,
            commission: e.fax ? parseFloat(e.fax) : 0
        })
        setPurchaseOrderId(e.id);
        console.log(e, "purchase order");
        http.get(`/supplier-brands/${e.id}`).then(res => {
            if (res.status === 200) {
                if (res.data.data.length > 0) {
                    setBrands(res.data.data);
                }
            }

        });
    }

    const handleCatInput = (e) => {
        setRequisitionCategorySelect(e.id)
    }
    const handlePMInput = (e) => {
        setPMSelect(e.id)
    }

    const handleRFInput = (e) => {
        setRFSelect(e.id)
        const selected = requisition_frequency.find(f => f.id === e.id);
        // console.log(e.requisition_frequency_name);
        // const selectedFrequency = parseFloat(selected.requisition_frequency_name);

        // const calculate_freq = addMonths(new Date(defaultDate),selectedFrequency);
        // setEndDate(calculate_freq);
        // console.log("frequency calculation", calculate_freq);
    }

    const handleDMInput = (e) => {
        // console.log("selected delivery mode",e.id);
        setDMSelect(e.id)
    }

    const handleTSInput = (e) => {
        setTSSelect(e.value)
    }

    useEffect(() => {

        if (purchase_order_no_id !== null) {
            http.get(`supplier/${purchase_order_no_id}/edit`).then(res => {
                if (res.data.status === 200) {
                    console.log('commisions', res);
                    setCommission(res.data.data.commission);
                } else {
                    setError(res.data.errors);
                }
            })
        }

    }, [purchase_order_no_id]);

    const grid_view = (event) => {
        setIsActive((current) => !current);
    };

    // product requisition
    const [filteredMedicine, setFilteredMedicine] = useState([]);
    const [searchWord, setSearchWord] = useState("");

    // cart total
    const total_amount = cart.reduce((total, item) => total + parseFloat(item.price) * parseFloat(item.pcs ? item.pcs : 0), 0)
    const commission_amount = 0;
    const cart_subtotal = total_amount + commission_amount;
    const vat_amount = (cart_subtotal * suplierDetails.vat) / 100;
    const tax_amount = (cart_subtotal * suplierDetails.tax) / 100;
    const total_bill_amount = total_amount + vat_amount + tax_amount + commission_amount;

    const test_sample = [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
    ]
    console.log(total_amount, "to")
    const columnsData = [
        { title: 'Item Code', field: 'item_code' },
        // { title: 'Name', field: 'drug_name', width: "100 !important"},
        {
            title: "Name", field: `name`,
            cellStyle: {
                width: 400
            },
        },

        { title: 'Box Type', field: 'boxType', render: (row) => <div className="text-capitalize">{row.box_type}</div> },
        { title: 'Pkt Size', field: 'pktSize', render: (row) => <div className="text-capitalize">{row.pkt_size}</div> },
        {
            title: 'No. of Box/Bottle', field: 'noOfBox', render: (row) => <div className='w-[40%] mx-auto'>
                <input
                    style={{ width: '80px', margin: 'auto' }}
                    onChange={(e) => boxSizeHandler(row, e)}
                    value={row.noOfBox}
                    className="form-control form-control-sm text-center"
                    type="number"
                />
            </div>
        },
        { title: 'Unit', field: 'unit', render: (row) => <div className="text-capitalize">{row.unit}</div> },
        {
            title: 'Quantity', field: 'pcs', render: (row) => <div className='w-[100%]'>
                <input className="form-control form-control-sm"
                    style={{ width: '80px', margin: 'auto' }}
                    value={row.pcs}
                    onChange={(e) => boxQtyHandler(row, e)}
                    type="number"
                />
            </div>
        },
        { title: 'MRP', field: 'price', },

        { title: 'Total Price', field: 'totalPrice' },
        {
            title: 'Action', field: 'action', render: (row) => <div className='flex justify-center gap-2'>
                <div>
                    <button type="button" onClick={() => removeMedicine(row)} className="btn btn-sm action-btn"><i
                        className="far fa-trash"></i></button>
                </div>
            </div>
        },
    ]

    // req details data

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

            console.log("from editRequisition", cart);
            let alreadyExist = false;
            const newCart = [...cart];
            let item = filteredMedicine[activeId]
            console.log("from editRequisition item = ", item);

            newCart.map((item) => {
                if (item.id === filteredMedicine[activeId].id || item.drug_id === filteredMedicine[activeId].id) {
                    console.log("from editRequisition selected medicine", item);
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
                    disc: commission,
                    totalPrice: item.price * 10,

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
            if (pd.id === item.id || pd.drug_id === item.id) {
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
                disc: commission,
                totalPrice: item.price * 10,
            });
        }
        setCart(newCart);
        setActiveId(i);
    };

    const removeMedicine = (item) => {
        const existCart = [...cart];
        const newCart = existCart.filter((pd) => pd.id !== item.id);
        setCart(newCart);
    };


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
                }
                else {
                    pd.noOfBox = parseFloat(e.target.value);
                    pd.pcs = (pd.noOfBox * item.pkt_size).toFixed(2);
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

                if (!temp || temp < 0) {
                    pd.noOfBox = 0;
                    pd.pcs = 0;
                    pd.totalPrice = 0;
                } else {
                    const test = parseFloat(temp / pd.pkt_size);
                    pd.noOfBox = test.toFixed(2);

                    pd.pcs = parseFloat(temp);
                    pd.totalPrice = (pd.price * pd.pcs).toFixed(2);
                }
            }
        });
        setCart(existCart);
    };

    // product requisition

    // console.log(endDate);
    const [errors, setError] = useState([]);

    const [form_data, setFormData] = useState({
        requisition_no: "",
        requisition_category_id: "",
        expected_date_of_delivery: defaultAfterDate,
        requisitor_contact_email: "",
        requisitor_phone_no: "",
        date_and_time: defaultDate,
        test_sample: "",
        supplier_id: "",
        delivery_mode_id: "",
        payment_mode_id: "",
        recurring_order: "",
        requisition_frequency_id: "",
        frequency_start_date: defaultDate,
        frequency_end_date: "",
        special_instruction: "",

        total_amount: "",
        commission_amount: "",
        vat_amount: "",
        tax_amount: "",
        total_bill_amount: "",
        created_by: user.name,

    });

    const handleInput = (e) => {
        setFormData({
            ...form_data, [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        http.get('requisition-category').then(res => {
            setRequisitionCategory(res.data.data);
        });
        http.get('requisition-vat-tax').then(res => {
            // console.log(res.data.tax)
            setVat(res.data.vat);
            setTax(res.data.tax);
        });
        http.get('supplier').then(res => {
            setSupplier(res.data.data);
        });
        http.get('requisition-frequency').then(res => {
            setRequisitionFrequency(res.data.data);
        });
        http.get('delivery-mode').then(res => {
            // console.log("Delivery mode",res.data.data);
            setDeliveryMode(res.data.data);
        });
        http.get('payment-mode').then(res => {
            setPaymentMode(res.data.data);
        });
        // Just for create requisition random number 
        http.get(`/requisition`).then(async (res) => {
            console.log("requisition", res.data.data)

            const requisitor_email = user.email
            const requisitor_mobile = user.mobile

            if ((res.data.data).length !== 0) {

                const rendomNumber = `GFRN-${res.data.data[0].id + 10001}`
                setFormData({
                    ...form_data,
                    requisition_no: rendomNumber,
                    requisitor_contact_email: requisitor_email,
                    requisitor_phone_no: requisitor_mobile,
                });
            } else {
                setFormData({
                    ...form_data,
                    requisition_no: 'GFRN-10001',
                    requisitor_contact_email: requisitor_email,
                    requisitor_phone_no: requisitor_mobile,
                });
            }


        })

    }, []);



    console.log("set cart", cart)

    const submitFormData = (e) => {
        e.preventDefault();

        const formData = new FormData();

        // formData.append('src_primary_key', total_amount);
        // formData.append('src_primary_key', form_data.src_primary_key);
        formData.append('requisition_no', form_data.requisition_no);
        formData.append('requisition_category_id', requisition_category_select);
        formData.append('expected_date_of_delivery', form_data.expected_date_of_delivery);
        formData.append('requisitor_contact_email', form_data.requisitor_contact_email);
        formData.append('requisitor_phone_no', form_data.requisitor_phone_no);
        formData.append('date_and_time', form_data.date_and_time);
        formData.append('test_sample', ts_select);
        formData.append('supplier_id', purchase_order_no_id);
        formData.append('delivery_mode_id', delivery_mode_id);
        formData.append('payment_mode_id', payment_mode_id);
        formData.append('recurring_order', form_data.recurring_order);
        formData.append('requisition_frequency_id', requisition_frequency_id);
        formData.append('frequency_start_date', form_data.frequency_start_date);
        formData.append('frequency_end_date', form_data.frequency_end_date);
        formData.append('special_instruction', form_data.special_instruction);
        formData.append('created_by', form_data.created_by);
        // formData.append('requisition_category_id', form_data.requisition_category_id);
        formData.append('total_amount', total_amount.toFixed(2));
        formData.append('commission_amount', commission_amount.toFixed(2));
        formData.append('vat_amount', vat_amount.toFixed(2));
        formData.append('tax_amount', tax_amount.toFixed(2));
        formData.append('total_bill_amount', total_bill_amount.toFixed(2));

        if (cart.length > 0) {

            http.post('requisition', formData).then(res => {

                console.log('When send a request for add requisition', res);

                if (res.data.status === 200) {

                    cart.map((item, i) => {
                        const academic = new FormData();
                        academic.append('requisition_master_id', res.data.requisition.id);

                        academic.append('drug_id', item.id);
                        academic.append('boxType', item.boxType);
                        academic.append('pktSize', item.pktSize);
                        academic.append('noOfBox', item.noOfBox);

                        academic.append('disc', item.disc);
                        academic.append('unit', item.unit);
                        academic.append('req_unit', item.pcs);
                        academic.append('pcs', item.pcs);
                        academic.append('totalPrice', item.totalPrice);

                        console.log("FromData Academic", academic);
                        http.post('save-requisitions-products', academic).then(res => {
                            // console.log("save-requisition details",res)
                        })

                    })

                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: res.data.message,
                        timer: 2500
                    })
                    navigate('/requisitions');
                } else {
                    console.log('When send a request for add requisition', res.data.errors);
                    alertToast("Input Field required")
                    setError(res.data.errors)
                }

            });
        }
        else {
            setError('You need to add medicine');
            alertToast('Need to add medicine')
        }

    }

    // key event 
    useEffect(() => {

        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                console.log('Close')
                setSearchWord("");
                setFilteredMedicine([])
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    return (
        <div className="page-content">

            <div className="custom-card patients-head ">
                <h5 className="fw-normal custom_py-3 px-2  text-start mb-2 card-title"> Add Requisition
                    <button className="btn btn-sm btn-warning float-end" onClick={() => navigate('/current-stock')}>
                        <i class="fal fa-long-arrow-left"></i> Back </button>
                </h5>
            </div>
            <div className="custom-card patients-head ">
                <h5 className="fw-normal custom_py-3 px-2  text-start mb-2 card-title">{user?.organization?.name}</h5>
            </div>
            {/* <form className="" onSubmit={submitFormData}> */}

            <div className="row">
                <div className="col-lg-8 col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row mb-1">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">
                                            Requisition No
                                            <span className={`text-${errors.requisition_no ? 'danger' : 'dark'}`}>*</span>
                                        </label>
                                        <div className="col-sm-7">
                                            <input
                                                // style={{border:`${errors.requisition_no ? '1px solid errorColor ' : '1px solid successColor'}`}}
                                                // className={`form-control form-control-sm border border-${errors.requisition_no ? 'danger' : 'dark'}`}
                                                className={`form-control form-control-sm`}
                                                type="text"
                                                readOnly id="exampleInputUsername2"
                                                onChange={handleInput} value={form_data.requisition_no} name="requisition_no" />
                                        </div>
                                        <span className="text-danger" >{errors.requisition_no}</span>
                                    </div>
                                    <div className="row mb-1">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Category
                                            <span className={`text-${errors.requisition_category_id ? 'danger' : 'dark'}`}>*</span></label>
                                        <div className="col-sm-7">
                                            <Select
                                                options={requisition_category}
                                                onChange={handleCatInput}
                                                placeholder={'Select'}
                                                getOptionLabel={(requisition_category) => `${requisition_category.requisition_category_name}`}
                                                getOptionValue={(requisition_category) => `${requisition_category.id}`}
                                            />
                                        </div>
                                        <span className="text-danger">{errors.requisition_category_id}</span>
                                    </div>
                                    <div className="row mb-1">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">EDOD <span className={`text-${errors.expected_date_of_delivery ? 'danger' : 'dark'}`}>*</span></label>
                                        <div className="col-sm-7">
                                            <input
                                                // style={{border:`${errors.requisition_no ? '1px solid errorColor ' : '1px solid successColor'}`}}
                                                type="date" name="expected_date_of_delivery"
                                                data-date-format="DD MMMM YYYY"
                                                onChange={handleInput}
                                                value={form_data.expected_date_of_delivery}
                                                className="form-control form-control-sm" id="exampleInputUsername2" />

                                            {/* <input type="date" id="start" name="trip-start"
                                                onChange={handleInput}
                                                value={form_data.expected_date_of_delivery}></input> */}
                                        </div>
                                        <span className="text-danger">{errors.expected_date_of_delivery}</span>
                                    </div>
                                    <div className="row mb-1">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Contact Email</label>
                                        <div className="col-sm-7">
                                            <input type="text" name="requisitor_contact_email" onChange={handleInput}
                                                value={form_data.requisitor_contact_email}
                                                className="form-control form-control-sm" id="exampleInputUsername2"
                                                readOnly />
                                        </div>
                                    </div>
                                    <div className="row mb-1">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Phone Number</label>
                                        <div className="col-sm-7">
                                            <input type="text" name="requisitor_phone_no" onChange={handleInput}
                                                value={form_data.requisitor_phone_no}
                                                className="form-control form-control-sm" id="exampleInputUsername2"
                                                readOnly />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row mb-1">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Date & Time <span className={`text-${errors.date_and_time ? 'danger' : 'dark'}`}>*</span></label>
                                        <div className="col-sm-7">
                                            <input
                                                type="date" onChange={handleInput}
                                                name="date_and_time" value={form_data.date_and_time}
                                                className="form-control form-control-sm" id="exampleInputUsername2"
                                            />
                                        </div>
                                        <span className="text-danger">{errors.date_and_time}</span>
                                    </div>
                                    <div className="row mb-1">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">At Tests/Sample <span className={`text-${errors.test_sample ? 'danger' : 'dark'}`}>*</span></label>
                                        <div className="col-sm-7">
                                            <Select
                                                options={test_sample}
                                                onChange={handleTSInput}
                                                placeholder={'Select'}
                                                getOptionLabel={(test_sample) => `${test_sample.label}`}
                                                getOptionValue={(test_sample) => `${test_sample.value}`}
                                            />

                                        </div>
                                        <span className="text-danger">{errors.test_sample}</span>
                                    </div>
                                    <div className="row mb-1">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Supplier/Vendor <span className={`text-${errors.supplier_id ? 'danger' : 'dark'}`}>*</span></label>
                                        <div className="col-sm-7">

                                            <Select
                                                options={supplier}
                                                onChange={handlePoInput}
                                                placeholder={'Select'}
                                                getOptionLabel={(supplier) => `${supplier.supplier_name}`}
                                                getOptionValue={(supplier) => `${supplier.id}`}
                                            />

                                        </div>
                                        <span className="text-danger">{errors.supplier_id}</span>
                                    </div>
                                    <div className="row mb-1">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Delivery Mode <span className={`text-${errors.delivery_mode_id ? 'danger' : 'dark'}`}>*</span></label>
                                        <div className="col-sm-7">
                                            <Select
                                                options={delivery_mode}
                                                onChange={handleDMInput}
                                                placeholder={'Select'}
                                                getOptionLabel={(delivery_mode) => `${delivery_mode.delivery_mode_name}`}
                                                getOptionValue={(delivery_mode) => `${delivery_mode.id}`}
                                            />
                                        </div>
                                        <span className="text-danger">{errors.delivery_mode_id}</span>
                                    </div>
                                    <div className="row mb-1">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Payment Mode <span className={`text-${errors.payment_mode_id ? 'danger' : 'dark'}`}>*</span></label>
                                        <div className="col-sm-7">
                                            <Select
                                                options={payment_mode}
                                                onChange={handlePMInput}
                                                placeholder={'Select'}
                                                getOptionLabel={(payment_mode) => `${payment_mode.payment_mode_name}`}
                                                getOptionValue={(payment_mode) => `${payment_mode.id}`}
                                            />
                                        </div>
                                        <span className="text-danger">{errors.payment_mode_id}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 requisition_status_blog">
                    <span className="btn btn-sm add_new_requisition mt-0 mb-1">
                        New
                    </span>
                    <div className="card">
                        <div className="card-body requisition_preview">
                            <h5>Requisition Preview</h5>
                            <p className="mt-3"><span className='requisition-preview-details'> Sub Total  </span>: <span className="ms-3"></span>  {total_amount.toFixed(2)}</p>
                            <p className="mt-2"><span className='requisition-preview-details'> Commission ({suplierDetails.commission}%) </span>: <span className="ms-3"></span>  {commission_amount.toFixed(2)} </p>
                            <p className="mt-2"><span className='requisition-preview-details'> Vat ({suplierDetails.vat}%)  </span>: <span className="ms-3"></span>  {vat_amount.toFixed(2)} </p>
                            <p className="mt-2"><span className='requisition-preview-details'> Tax ({suplierDetails.tax}%)  </span>: <span className="ms-3"></span>  {tax_amount.toFixed(2)} </p>
                            <p className="mt-2"><span className='requisition-preview-details'> Total  </span>: <span className="ms-3"></span>  {total_bill_amount.toFixed(2)} </p>
                        </div>
                    </div>
                </div>

            </div>


            <div className="row mt-2">
                <div className="col-lg-12 col-md-12">
                    <div className="card">
                        <div className="accordion-card-body">
                            <div className="accordion" id="accordionExample">
                                <div>
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapseThree"
                                            aria-expanded="false" aria-controls="collapseThree">
                                            Recurring Order
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree"
                                        data-bs-parent="#accordionExample">
                                        <div className="accordion-body">

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-check mb-2">
                                                        <input type="checkbox" className="form-check-input" name="recurring_order"
                                                            onClick={() => grid_view()} id="checkDefault" onChange={handleInput} value="yes" />
                                                        <label className="form-check-label" htmlFor="checkDefault">
                                                            Recurring Order
                                                        </label>
                                                    </div>
                                                    <div className={isActive ? "row mb-1" : "d-none row mb-1"}>
                                                        <label htmlFor="exampleInputUsername2"
                                                            className="col-sm-5 col-form-label">Frequency</label>
                                                        <div className="col-sm-7">

                                                            <Select
                                                                options={requisition_frequency}
                                                                onChange={
                                                                    handleRFInput}
                                                                placeholder={'Select'}
                                                                getOptionLabel={(requisition_frequency) => `${requisition_frequency.requisition_frequency_name}`}
                                                                getOptionValue={(requisition_frequency) => `${requisition_frequency.id}`}
                                                            />

                                                        </div>
                                                    </div>
                                                    <div className={isActive ? "row mb-1" : "d-none row mb-1"}>
                                                        <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Start
                                                            Date</label>
                                                        <div className="col-sm-7">
                                                            <input type="date" name="frequency_start_date" onChange={handleInput}
                                                                value={form_data.frequency_start_date}
                                                                className="form-control form-control-sm" id="exampleInputUsername2"
                                                                placeholder="64854645" />
                                                        </div>
                                                    </div>

                                                    <div className={isActive ? "row" : "d-none row"}>
                                                        <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">End
                                                            Date</label>
                                                        <div className="col-sm-7">
                                                            <input type="date" name="frequency_end_date" onChange={handleInput}
                                                                value={form_data.frequency_end_date}
                                                                className="form-control form-control-sm" id="exampleInputUsername2" />
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label htmlFor="special_instruction" className="form-label">Description</label>
                                                        <textarea name="special_instruction" onChange={handleInput}
                                                            value={form_data.special_instruction}
                                                            className="form-control form-control-sm" maxLength="100" rows="5"
                                                            placeholder="Description..."></textarea>
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

            {/*requisition list*/}


            <div className="row mt-2">
                <div className="col-lg-12 col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <input
                                type="text"
                                placeholder="Search"
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
                            />

                            {
                                loading
                                &&
                                (<i
                                    style={{ fontSize: "20px", marginLeft: "50%" }}
                                    className=" mt-2 fas fa-spinner fa-spin"
                                ></i>
                                )
                            }

                            {
                                searchWord &&
                                <ImCross className="close_icon" onClick={() => {
                                    setSearchWord("");
                                    setFilteredMedicine([])
                                }}></ImCross>
                            }
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
                                                <p>Exp.date: {moment(item.expiry_date).format('DD-MM-YYYY')}</p>
                                            </div>
                                            <div className="col-2">
                                                <p>
                                                    <span className="medicine-inStock">
                                                        In Stock{" "}
                                                        <i
                                                            style={{ fontSize: "7px" }}
                                                            className="ms-2 fas fa-circle"
                                                        ></i>
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-2">
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

            <button className="btn btn-sm btn-success float-end text-uppercase mt-3" onClick={submitFormData}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" className="feather feather-save mb-1">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                    <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                Save
            </button>

            {/* </form> */}
            {/*requisition product*/
            }

        </div>

    )
}

export default ReOrderRequisition
