
import React, {useEffect} from 'react'
import {useState} from 'react';
import Swal from 'sweetalert2';
import {Link, useNavigate, useParams} from 'react-router-dom';
import moment from "moment";
import Select from 'react-select'
import MaterialTable from "material-table";
import AuthUser from '../../../../Components/AuthUser';
import { toast } from 'react-toastify';
function EditStoreIn() {

    const {id} = useParams();

    const alertToast = (text) => toast.error(text);
    const navigate = useNavigate();
    const {http, user} = AuthUser();
    const [supplier, setSupplier] = useState([]);
    const [carrier, setCarrier] = useState([]);
    const [selected_mrr_id, setSelected_mrr_id] = useState("");
    const [manufacturer_id, setMNId] = useState("");
    const [carrier_id, setCId] = useState("");
    const [due_amount, setDueAmount] = useState();
    const [paid_amount, setPaidAmount] = useState();
    const [paidBtn, setPaidBtn] = useState(false);
    const [vat, setVat] = useState([]);
    const [tax, setTax] = useState([]);
    const [commission, setCommission] = useState([]);

    
    // ------------Taher------- 
    const [mrrData, setMrrData] = useState({});
    const someDate = new Date();
    const date = someDate.setDate(someDate.getDate());
    const defaultDate = new Date(date).toISOString().split("T")[0];

    const [storeIn, setStoreIn] = useState([]);
    const [cart, setCart] = useState([]);
    const [requisitionData, setRequisitionData] = useState({});
    const [selectedSelfAndRack, setSelectedSelfAndRack] = useState(0);
    const [storeInRecordNo , setStoreInRecordNo] = useState("");
    const [reload, setReload] = useState(false);


    
    const handleRack = (e, item) =>{
        const newCart = [...cart];
        newCart.map(md => {
            if(md.id === item.id){
                md.rack = e.target.value;
            }
        })
        setCart(newCart)
    }


    const handleSelf = (e, item) =>{
        const newCart = [...cart];
        newCart.map(md => {
            if(md.id === item.id){
                md.self = e.target.value;
            }
        })
        setCart(newCart)
    }


    useEffect(() =>{
        setSelectedSelfAndRack(0)
        cart.map(item => {
            if(item.rack && item.self){
                setSelectedSelfAndRack(selectedSelfAndRack + 1)
            }
        })

    },[cart])


    const handleCInput = (e) => {
        setCId(e.id);
    }

    const handleMNInput = (e) => {
        setMNId(e.id);
    }

    const handlePaidInput = (e) => {
        
        const paid = e.target.value;
        setPaidAmount(paid);
        if(paid > 0){
            setPaidBtn(true);
        }
        const due_amount = total_bill_amount - paid;
        setDueAmount(due_amount.toFixed(2));
    }

    const [selectedSuppValue, setSuppSelect] = useState();
    const handleSuppChange = (e) => {
        setSuppSelect(e.id)
    }

    useEffect(()=> {
        
        if (selected_mrr_id !== null){
            
            http.get(`view-selected-mrr/${selected_mrr_id}`).then(res=> {
                if (res.data.status === 200) {
                    setMrrData(res.data.data[0]);
                    setCId(res.data.data[0].carrier_id)
                    setMNId(res.data.data[0].manufacturer_id)

                    if(res.data.data[0]?.requisition_po_id){

                        http.get(`view-details-mrr/${res.data.data[0]?.requisition_po_id}`).then(res=> {
                            if (res.data.status === 200) {
                                setRequisitionData(res.data.data)
                                setCart(res.data.req_details);
                                setReload(!reload);
                                setSuppSelect(res.data.data.supplier_id);
                            } else {
                                setError(res.data.errors);
                            }
                        })
                    }

                } else {
                    // setError(res.data.errors);
                }
            })
        }

    },[selected_mrr_id]);

    

    const total_amount = cart.reduce((total,item) => total+parseFloat(item.totalPrice),0)
    const commission_amount = cart.reduce((previousValue, currentValue) =>previousValue + (commission * parseFloat(currentValue.totalPrice)) / 100, 0);
    const cart_subtotal = total_amount+commission_amount;
    const vat_amount = (cart_subtotal*vat.vat_name)/100;
    const tax_amount = (cart_subtotal*tax.tax_name)/100;
    const total_bill_amount = total_amount + vat_amount + tax_amount - commission_amount;



    // product requisition

    const [errors, setError] = useState([]);

    const [form_data, setFormData] = useState({
        purchase_order_no_id: "",
        selected_mrr_id:'',
        manufacturer_id: "",
        supplier_id: "",
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
        delivery_no_docs : "",
        payment_type: "",
        mrr_expiry_date: "",
    });

    const handleInput = (e) => {
        setFormData({
            ...form_data, [e.target.name]: e.target.value
        });
    }

    // -------------------------------------------- 

    useEffect(() => {

        http.get(`edit-store-in/${id}`).then(res=> {

            setStoreIn(res.data.data);
            setStoreInRecordNo(res.data.data.store_in_record_no)
            setSelected_mrr_id(res.data.data.mrr_id);

            if(res.data.data.id){

                http.get(`edit-store-in-details/${res.data.data.id}`).then(res=> {

                    if(res.data.data){
                        
                        res.data.data.map(m => {

                            const newCart = [...cart];
                            newCart.map(item =>{

                                if(item.drug_id == m.drug_id){
                                    item.rack = m.rack;
                                    item.self = m.self;
                                    item.details_id = m.id;
                                }
                            })
                            setCart(newCart);
                            
                        })
                    }
                })
            }
        });

        http.get('carrier').then(res => {
            setCarrier(res.data.data);
        });
        
        http.get('supplier').then(res => {
            setSupplier(res.data.data);
        });

    }, [reload]);


    const columnsData = [
        { title: 'Item Code', field: 'drug_code' },
        {title: 'Add to Rack & Self', field: '', render: (row) => 
            <div style={{width:'200px'}}  className='d-flex gap-1'>
                
                <div style={{width:'100%'}} class="form-group">
                    <select 
                        value = {row.rack}
                        onChange={(e) => handleRack(e, row)}
                        className={`form-select form-select-sm border-${errors.rack ? 'danger' : 'secondary'}`}
                        aria-label="select example">

                        <option value="1">1</option>
                        <option value="Rack-1">Rack-1</option>
                        <option value="Rack-2">Rack-2</option>
                        <option value="Rack-3">Rack-3</option>
                        <option value="Rack-4">Rack-4</option>
                    </select>
                </div>
                
                <div style={{width:'100%'}} class="form-group">
                    <select
                        value = {row.self}
                        onChange={(e) => handleSelf(e , row)} 
                        className={`form-select form-select-sm border-${errors.self ? 'danger' : 'secondary'}`} 
                        aria-label="select example">
                        
                        <option value="1">1</option>
                        <option value="Self-1">Self-1</option>
                        <option value="Self-2">Self-2</option>
                        <option value="Self-3">Self-3</option>
                        <option value="Self-4">Self-4</option>
                    </select>
                </div>

            </div>
        },
        { title: 'Name & Generic', field: 'drug_name', width: "100 !important"},
        { title: 'Brand', field: 'brand' },
        { title: 'Class', field: 'class' },
        { title: 'Batch', field: 'batch' },
        { title: 'Exp Date', field: 'expiry_date', render:(row) => <div>{moment(row.expiry_date).format('DD-MM-YYYY')}</div> },
        { title: 'Box Type', field: 'boxType', render:(row) => <div className="text-capitalize">{row.boxType}</div> },
        { title: 'Pkt Size', field: 'pktSize', render: (row) => <div className="text-capitalize">{row.pktSize}</div> },
        { title: 'No. of Box/Bottle', field: 'noOfBox', render: (row) => <div className='w-[40%] mx-auto'>
                <input
                    value={row.noOfBox}
                    style={{width:'80px' ,margin:'auto'}}
                    readOnly
                    className="form-control form-control-sm text-center"
                    type="number"
                />
            </div> },
        
        { title: 'Total Qty.', field: 'req_unit', render: (row) => <div className='w-[100%]'>
                <input className="form-control form-control-sm"
                       value={row.req_unit}
                       style={{width:'80px' ,margin:'auto'}}
                       readOnly
                       type="number"
                />
            </div> },
        // { title: 'Total Qty.', field: '', render: (row) => <div className="text-capitalize">{row.unit}</div> },

        { title: 'Unit', field: 'unit', render: (row) => <div className="text-capitalize">{row.unit}</div> },

        { title: 'MRP', field: 'price', },

        // { title: 'Purchase price', field: ''},

        { title: 'Total Price', field: 'totalPrice'},

        
        // {title: 'Action', field: 'action', render: (row) => <div className='flex justify-center gap-2'>
        //         <div>
        //             <button type="button" onClick={() => removeMedicine(row)} className="btn btn-sm action-btn"><i
        //                 className="far fa-trash"></i></button>
        //         </div>
        //     </div>},
    ]

    // Update store in 
    const submitFormData = (e, fire) => {
        e.preventDefault();

        cart.map(item => {

            const formDataDetails = new FormData();

            formDataDetails.append('rack', item.rack);
            formDataDetails.append('self', item.self);

            http.post(`update-store-in-details/${item.details_id}`, formDataDetails).then(res => {
               
            })
        })

        if(fire){
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: "Updated successfully",
                timer: 1000
            })
        }
        navigate('/manager-store-in');

    }

    console.log("cart data list table ", cart);

    //  Proceed to approval 
    const proceedToApproval = (e) => {
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

                submitFormData(e, false);

                http.post(`/manager-proceed-to-store-in/${id}`).then(res => {
                    navigate(`/manager-store-in`);  
                })
                Swal.fire(
                {
                    position: 'top-center',
                    icon: 'success',
                    title: 'Send!',
                    html: 'Your requisitions has been sent to manager.',
                    timer: 2500
                })
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
                http.get(`/store-in-cancel-by-manager/${id}`).then(res => {
                    console.log(res);
                    console.log("row Delete", res);
                    
                    navigate(`/manager-material-receiving`);

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


    return (
        <div className="page-content">

            <div className="custom-card patients-head ">
                <h5 className="fw-normal custom_py-3 px-2  text-start mb-2 card-title">Store In
                    <button className="btn btn-sm btn-warning float-end" onClick={() => navigate(-1)}>
                        <i class="fal fa-long-arrow-left"></i> Back</button>
                </h5>
            </div>


            <div className="row">
                <div className="col-lg-8 col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row ">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">MRR No
                                        
                                        </label>
                                        <div className="col-sm-7">
                                            <input type="text" className="form-control form-control-sm" id="exampleInputUsername2"
                                                value={mrrData.mrr_no} name="mrr_no" readOnly/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row mb-2">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-5">Manufacturer
                                            {/* <span className={`ms-1 text-${errors.manufacturer_id ? 'danger' : 'dark'}`}>*</span> */}
                                        </label>
                                        <div className="col-sm-7">
                                            <Select
                                                options={supplier}
                                                onChange={handleMNInput}
                                                isDisabled={true}
                                                placeholder={'Select'}
                                                getOptionLabel={(supplier) => `${supplier.supplier_name}`}
                                                getOptionValue={(supplier) => `${supplier.id}`}
                                                value={supplier.filter(s => s.id === manufacturer_id)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row mb-2">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-5">Supplier</label>
                                        <div className="col-sm-7">
                                            <Select
                                                options={supplier}
                                                onChange={handleSuppChange}
                                                placeholder={'Select'}
                                                isDisabled={true}
                                                getOptionLabel={(supplier) => `${supplier.supplier_name}`}
                                                getOptionValue={(supplier) => `${supplier.id}`}
                                                value={supplier.filter(s => s.id === manufacturer_id)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row ">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Expiry Date
                                        </label>
                                        <div className="col-sm-7">
                                            <input type="date" className="form-control form-control-sm" id="exampleInputUsername2"
                                                    onChange={handleInput} value={mrrData.mrr_expiry_date} name="mrr_expiry_date" readOnly/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row mb-2">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Order By</label>
                                        <div className="col-sm-7">
                                            <input type="text" className="form-control form-control-sm" id="exampleInputUsername2"
                                                    value={requisitionData.created_by} name="requisition_no" readOnly/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row mb-2">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Purchase Order</label>
                                        <div className="col-sm-7">
                                            <input type="text" className="form-control form-control-sm" id="exampleInputUsername2"
                                                value={requisitionData.purchase_order_no} name="requisition_no" readOnly/>
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
                                        <label htmlFor="exampleInputUsername2" className="col-sm-5">Purchase No.</label>
                                        <div className="col-sm-7">
                                            <input type="text" className="form-control form-control-sm" id="exampleInputUsername2"
                                                value={requisitionData.purchase_order_no} name="mrr_no" readOnly />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row mb-2">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-5">Date  </label>
                                        <div className="col-sm-7">
                                            {/* {moment().format('DD-MM-YYYY')} */}
                                            <input type="date" className="form-control form-control-sm" id="exampleInputUsername2"
                                                onChange={handleInput} value={form_data.delivery_date} name="delivery_date" readOnly/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row ">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Carrier
                                        {/* <span className={`ms-1 text-${errors.carrier_id ? 'danger' : 'dark'}`}>*</span> */}
                                        </label>
                                        <div className="col-sm-7">
                                            <Select
                                                options={carrier}
                                                onChange={handleCInput}
                                                isDisabled={true}
                                                placeholder={'Select'}
                                                getOptionLabel={(carrier) => `${carrier.carrier_name}`}
                                                getOptionValue={(carrier) => `${carrier.id}`}
                                                value={carrier.filter(carrier => carrier.id === carrier_id)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="row ">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Delivery Date</label>
                                        <div className="col-sm-7">
                                            <input type="date" className="form-control form-control-sm" id="exampleInputUsername2"
                                                    onChange={handleInput} value={mrrData.delivery_date} name="delivery_date" readOnly/>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="row ">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Carried By
                                        
                                        </label>
                                        <div className="col-sm-7">
                                            <input type="text" className="form-control form-control-sm" id="exampleInputUsername2"
                                                    onChange={handleInput} value={mrrData.carried_by} name="carried_by" readOnly/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row ">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Contact No
                                        
                                        </label>
                                        <div className="col-sm-7">
                                            <input type="text" className="form-control form-control-sm" id="exampleInputUsername2"
                                                onChange={handleInput} value={mrrData.contact_no} name="contact_no" readOnly/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Vehicle No
                                        {/* <span className={`ms-1 text-${errors.vehicle_no ? 'danger' : 'dark'}`}>*</span> */}
                                        
                                        </label>
                                        <div className="col-sm-7">
                                            <input type="text" className="form-control form-control-sm" id="exampleInputUsername2"
                                                    onChange={handleInput} value={mrrData.vehicle_no} name="vehicle_no" readOnly/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row mb-2">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-5">Store In Record No.</label>
                                        <div className="col-sm-7">
                                            <input type="text" className="form-control form-control-sm" id="exampleInputUsername2"
                                                value={storeInRecordNo} name="mrr_no" readOnly />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mt-1">
                                        {/*<label htmlFor="exampleInputUsername2" className="col-form-label">Remark</label>*/}
                                        <div className="">

                                            <textarea name="remarks" 
                                                readOnly
                                                onChange={handleInput} value={mrrData.remarks}
                                                className="form-control "
                                                placeholder="Remarks..."
                                                rows="7"
                                                >
                                            </textarea>

                                            {/* <textarea name="remarks" 
                                            onChange={handleInput} value={form_data.remarks}
                                            className="form-control form-control-sm" maxLength="100" rows="8"
                                            placeholder="Remarks..."></textarea> */}
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
                                        <input type="radio" className="form-check-input" value="cash" name="payment_type" id="cash_payment1" checked={mrrData.payment_type === "cash"} />
                                            <label className="form-check-label" htmlFor="cash_payment1">
                                                Cash
                                            </label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input type="radio" className="form-check-input" value="card" name="payment_type" id="card_payment1" checked={mrrData.payment_type === "card"}/>
                                            <label className="form-check-label" htmlFor="card_payment1">
                                                Credit/Debit Card
                                            </label>
                                    </div>
                                    <div className="row mb-1">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-12 pt-1">Total : {mrrData.total_bill_amount} </label>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Paid
                                        
                                        </label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control form-control-sm" id="exampleInputUsername2"
                                                value={mrrData.paid_amount}   name="paid_amount" readOnly/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Due</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control form-control-sm" id="exampleInputUsername2" readOnly
                                                value={mrrData.due_amount} name="due_amount"/>
                                        </div>
                                    </div>

                                </div>
                            </div>
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
            
            <button className="btn btn-sm btn-success float-end text-uppercase mt-3 me-2" onClick={(e) => submitFormData(e, true)}>
                <i className="fas fa-save"></i> Update
            </button>
            <button type="button" onClick={(e) => proceedToApproval(e)} className="btn btn-sm btn-success float-end text-uppercase mt-3 me-2">
                <i className="fas fa-paper-plane"></i> Approve
            </button>
            <button type="button" onClick={() => cancelByManager()} className="btn btn-sm btn-danger-action float-end text-uppercase mt-3 me-2">
                <i class="fas fa-times-circle"></i> Cancel
            </button>

                
        </div>

    )
}

export default EditStoreIn


