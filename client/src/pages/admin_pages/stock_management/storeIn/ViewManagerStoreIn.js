
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from "moment";
import Select from 'react-select'
import MaterialTable from "material-table";
import AuthUser from '../../../../Components/AuthUser';
function EditStoreIn() {

    const { id } = useParams();

    const navigate = useNavigate();
    const { http, user } = AuthUser();
    const [supplier, setSupplier] = useState([]);
    const [carrier, setCarrier] = useState([]);
    const [selected_mrr_id, setSelected_mrr_id] = useState("");
    const [manufacturer_id, setMNId] = useState("");
    const [carrier_id, setCId] = useState("");



    // ------------Taher------- 
    const [mrrData, setMrrData] = useState({});
    const someDate = new Date();
    const date = someDate.setDate(someDate.getDate());
    const defaultDate = new Date(date).toISOString().split("T")[0];

    const [storeIn, setStoreIn] = useState([]);
    const [cart, setCart] = useState([]);
    const [requisitionData, setRequisitionData] = useState({});
    const [selectedSelfAndRack, setSelectedSelfAndRack] = useState(0);
    const [storeInRecordNo, setStoreInRecordNo] = useState("");
    const [reload, setReload] = useState(false);



    useEffect(() => {
        setSelectedSelfAndRack(0)
        cart.map(item => {
            if (item.rack && item.self) {
                setSelectedSelfAndRack(selectedSelfAndRack + 1)
            }
        })

        // console.log(cart.length);

    }, [cart])


    const handleCInput = (e) => {
        // console.log(e.id);
        setCId(e.id);
    }

    const handleMNInput = (e) => {
        setMNId(e.id);
    }
    useEffect(() => {

        if (selected_mrr_id !== null) {

            // console.log("view-selected-mrr mrrrrrrrr");
            http.get(`view-selected-mrr/${selected_mrr_id}`).then(res => {
                // console.log('selected mrr', res);
                if (res.data.status === 200) {
                    setMrrData(res.data.data);
                    setCId(res.data.data.carrier_id)
                    setMNId(res.data.data.manufacturer_id)
                    setCart(res.data.mrr_details);
                    if (res.data.data?.requisition_po_id) {

                        http.get(`view-details-mrr/${res.data.data?.requisition_po_id}`).then(res => {
                            if (res.data.status === 200) {
                                // console.log("mrrrr details",res.data);
                                setRequisitionData(res.data.data)
                                // setCart(res.data.req_details);
                                setReload(!reload);
                                // setCommission(res.data.data.commission);
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

    }, [selected_mrr_id]);






    // product requisition

    const [errors, setError] = useState([]);

    const [form_data, setFormData] = useState({
        purchase_order_no_id: "",
        selected_mrr_id: '',
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
        delivery_no_docs: "",
        payment_type: "",
        mrr_expiry_date: "",
    });

    const handleInput = (e) => {
        setFormData({
            ...form_data, [e.target.name]: e.target.value
        });
    }

    // -------------------------------------------- 
    const [storeInDetails, setStoreInDetails] = useState([]);

    useEffect(() => {

        http.get(`edit-store-in/${id}`).then(res => {

            setStoreIn(res.data.data);
            setSelected_mrr_id(res.data.data.mrr_id);

            if (res.data.data.id) {

                http.get(`edit-store-in-details/${res.data.data.id}`).then(res => {

                    setStoreInDetails(res.data.data)

                    if (res.data.data) {

                        res.data.data.map(m => {

                            const newCart = [...cart];
                            newCart.map(item => {

                                if (item.drug_id == m.drug_id) {
                                    item.rack = m.rack;
                                    item.self = m.self;
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

        // http.get(`/store-in-data`).then(async (res) => {

        //     if ((res.data.data).length !== 0) {

        //         const randomNumber = `IN-${res.data.data[0].id + 10001}`
        //         setStoreInRecordNo(randomNumber);
        //     } else {
        //         setStoreInRecordNo('IN-10001');
        //     }

        // })

    }, [reload]);


    const columnsData = [
        // { title: 'Item Code', render: (row) => <div className='text-center'>{row.drug_code}</div> },
        {
            title: 'Add to Rack & Self', field: '', render: (row) =>
                <div style={{ width: '200px' }} className='d-flex gap-1'>

                    <div style={{ width: '100%' }} class="form-group">
                        <select
                            value={row.rack}
                            disabled
                            className={`form-select form-select-sm border-${errors.rack ? 'danger' : 'secondary'}`}
                            aria-label="select example">

                            <option value="1">1</option>
                            <option value="Rack-1">Rack-1</option>
                            <option value="Rack-2">Rack-2</option>
                            <option value="Rack-3">Rack-3</option>
                            <option value="Rack-4">Rack-4</option>
                        </select>
                    </div>

                    <div style={{ width: '100%' }} class="form-group">
                        <select
                            value={row.self}
                            disabled
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
        { title: 'Name ', render: (row) => <div className='text-center'>{row.macrohealth_sg}</div> },
        { title: 'Brand', render: (row) => <div className='text-center'>{row.manufacturer}</div> },
        // { title: 'Class', field: 'class' },
        // { title: 'Batch', field: 'batch' },
        { title: 'Exp Date', field: 'expiry_date', render: (row) => <div className='text-center'>{moment(row.expiry_date).format('DD-MM-YYYY')}</div> },
        { title: 'Box Type', field: 'boxType', render: (row) => <div className="text-capitalize text-center">{row.boxType}</div> },
        { title: 'Pkt Size', field: 'pktSize', render: (row) => <div className="text-capitalize text-center">{row.pktSize}</div> },
        {
            title: 'No. of Box/Bottle', field: 'noOfBox', render: (row) => <div className='w-[40%] mx-auto'>
                <input
                    value={row.noOfBox}
                    style={{ width: '80px', margin: 'auto' }}
                    readOnly
                    className="form-control form-control-sm text-center"
                    type="number"
                />
            </div>
        },

        {
            title: 'Total Qty.', field: 'req_unit', render: (row) => <div className='w-[100%]'>
                <input className="form-control form-control-sm"
                    value={row.req_unit}
                    style={{ width: '80px', margin: 'auto' }}
                    readOnly
                    type="number"
                />
            </div>
        },

        { title: 'Bonus Qty', field: 'unit', render: (row) => <div className="text-capitalize text-center">{row.bonus_qty}</div> },
        { title: 'Unit', field: 'unit', render: (row) => <div className="text-capitalize text-center">{row.unit}</div> },

        { title: 'PP', render: (row) => <div className='text-center'>{parseFloat(row.price ? row.price : 0).toFixed(2)}</div> },
        { title: 'VAT', render: (row) => <div className='text-center'>{parseFloat(row.vat ? row.vat : 0).toFixed(2)}</div> },
        { title: 'Discount', render: (row) => <div className='text-center'>{parseFloat(row.disc ? row.disc : 0).toFixed(2)}</div> },


        {
            title: 'Total Price', field: 'totalPrice',
            render: (row) => <div className='text-center'>{(parseFloat(row.totalPrice ? row.totalPrice : 0)).toFixed(2)}</div>,
            cellStyle: {
                textAlign: 'center'
            }
        },
    ]


    return (
        <div className="page-content mrr-data">

            <div className="custom-card patients-head ">
                <h5 className="fw-normal custom_py-3 px-2  text-start mb-2 card-title">Store In
                    <button className="btn btn-sm btn-warning float-end" onClick={() => navigate(-1)}>
                        <i class="fal fa-long-arrow-left"></i> Back</button>
                </h5>
            </div>


            <div className="row">
                <div className="col-lg-8 col-md-8">
                    <div className='card'>
                        <div className='card-body'>
                            <div className='row'>
                                <div className="col-md-6">
                                    <div className="row ">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Purchase In No

                                        </label>
                                        <div className="col-sm-7">
                                            <input type="text" className="form-control form-control-sm" id="exampleInputUsername2"
                                                value={mrrData?.mrr_no} name="mrr_no" readOnly />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='row mb-2'>
                                        <label htmlFor='exampleInputUsername2' className='col-sm-5'>
                                            Supplier
                                        </label>
                                        <div className='col-sm-7'>
                                            <Select
                                                options={supplier}
                                                onChange={handleMNInput}
                                                isDisabled={true}
                                                placeholder={'Select'}
                                                getOptionLabel={(supplier) =>
                                                    `${supplier.supplier_name}`
                                                }
                                                getOptionValue={(supplier) => `${supplier.id}`}
                                                value={supplier.filter(
                                                    (s) => s.id === Number(manufacturer_id),
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='row mb-2'>
                                        <label
                                            htmlFor='exampleInputUsername2'
                                            className='col-sm-5 col-form-label'
                                        >
                                            Reference Invoice No
                                        </label>
                                        <div className='col-sm-7'>
                                            <input
                                                type='text'
                                                className='form-control form-control-sm'
                                                id='exampleInputUsername2'
                                                value={mrrData.reference_invoice_no ? mrrData.reference_invoice_no : ''}
                                                name='requisition_no'
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='row mb-2'>
                                        <label
                                            htmlFor='exampleInputUsername2'
                                            className='col-sm-5 col-form-label'
                                        >
                                            Reference Order No
                                        </label>
                                        <div className='col-sm-7'>
                                            <input
                                                type='text'
                                                className='form-control form-control-sm'
                                                id='exampleInputUsername2'
                                                value={mrrData.reference_order_no ? mrrData.reference_order_no : ''}
                                                name='requisition_no'
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card mt-2'>
                        <div className='card-body'>
                            <div className='row'>
                                <div className="col-md-6">
                                    <div className="row mb-2">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-5">Date  </label>
                                        <div className="col-sm-7">
                                            <input type="date" className="form-control form-control-sm" id="exampleInputUsername2"
                                                onChange={handleInput} value={form_data.delivery_date} name="delivery_date" readOnly />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='row mb-2'>
                                        <label htmlFor='exampleInputUsername2' className='col-sm-5'>
                                            Store In Record No.
                                        </label>
                                        <div className='col-sm-7'>
                                            <input
                                                type='text'
                                                className='form-control form-control-sm'
                                                id='exampleInputUsername2'
                                                value={storeInRecordNo}
                                                name='mrr_no'
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-12'>
                                    <div className='mt-1'>
                                        <div className=''>
                                            <textarea
                                                name='remarks'
                                                readOnly
                                                onChange={handleInput}
                                                value={mrrData.remarks}
                                                className='form-control '
                                                placeholder='Remarks...'
                                                rows='4'
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-lg-4 col-md-4 requisition_status_blog">
                  
                    <div className='card payment_block'>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <h6>Payment</h6>
                                    <hr className='mrr_heading' />
                                    <div className='row mb-1'>
                                        <div className='col-sm-4'>
                                            <label
                                                htmlFor='exampleInputUsername2'
                                                className='col-form-label'
                                            >
                                                Sub Total
                                                <span>*</span>
                                            </label>
                                        </div>
                                        <div className='col-sm-8'>
                                            <input
                                                type='text'
                                                className='form-control form-control-sm'
                                                id='exampleInputUsername2'
                                                name='paid_amount'
                                                value={(parseFloat(mrrData?.total_bill_amount ? mrrData?.total_bill_amount : 0) + parseFloat(mrrData?.special_discount ? mrrData?.special_discount : 0) - parseFloat(mrrData?.vat ? mrrData?.vat : 0)).toFixed(2)}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className='col-sm-4'>
                                            <label
                                                htmlFor='exampleInputUsername2'
                                                className='col-form-label'
                                            >
                                                Vat
                                                <span>*</span>
                                            </label>
                                        </div>
                                        <div className='col-sm-8'>
                                            <input
                                                type='text'
                                                className='form-control form-control-sm'
                                                id='exampleInputUsername2'
                                                name='paid_amount'
                                                value={parseFloat(mrrData?.vat ? mrrData?.vat : 0).toFixed(2)}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className='col-sm-4'>
                                            <label
                                                htmlFor='exampleInputUsername2'
                                                className='col-form-label'
                                            >
                                                Discount
                                                <span>*</span>
                                            </label>
                                        </div>
                                        <div className='col-sm-8'>
                                            <input
                                                type='text'
                                                className='form-control form-control-sm'
                                                id='exampleInputUsername2'
                                                name='paid_amount'
                                                value={parseFloat(mrrData?.special_discount ? mrrData?.special_discount : 0).toFixed(2)}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className='col-sm-4'>
                                            <label
                                                htmlFor='exampleInputUsername2'
                                                className=' col-form-label'
                                            >
                                                Grand Total
                                                <span>*</span>
                                            </label>
                                        </div>
                                        <div className='col-sm-8'>
                                            <input
                                                type='text'
                                                className='form-control form-control-sm'
                                                id='exampleInputUsername2'
                                                name='paid_amount'
                                                value={parseFloat(mrrData?.total_bill_amount ? mrrData?.total_bill_amount : 0).toFixed(2)}
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-sm-4'>
                                            <label
                                                htmlFor='exampleInputUsername2'
                                                className='col-form-label'
                                            >
                                                Paid
                                                <span>*</span>
                                            </label>
                                        </div>
                                        <div className='col-sm-8'>
                                            <input
                                                type='text'
                                                className='form-control form-control-sm'
                                                id='exampleInputUsername2'
                                                name='paid_amount'
                                                value={parseFloat(mrrData?.paid_amount ? mrrData?.paid_amount : 0).toFixed(2)}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-4'>
                                            <label
                                                htmlFor='exampleInputUsername2'
                                                className='col-form-label'
                                            >
                                                Due
                                                <span>*</span>
                                            </label>
                                        </div>
                                        <div className='col-sm-8'>
                                            <input
                                                type='text'
                                                className='form-control form-control-sm'
                                                id='exampleInputUsername2'
                                                readOnly
                                                value={parseFloat(mrrData.due_amount ? mrrData.due_amount : 0).toFixed(2)}
                                                name='due_amount'
                                            />
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
        </div>

    )
}

export default EditStoreIn

