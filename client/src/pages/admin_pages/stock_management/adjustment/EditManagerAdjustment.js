import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import http from "../../../../http";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import AuthUser from "../../../../Components/AuthUser";
import moment from "moment";
// import {user} from "../../../../public/assets/vendors/feather-icons/feather";
import Select from 'react-select'
import MaterialTable from "material-table";
import AuthUser from '../../../../Components/AuthUser';
import { ImCross } from 'react-icons/im';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useQuery } from 'react-query';


const EditManagerAdjustment = () => {

    const { id } = useParams();

    const someDate = new Date();
    const date = someDate.setDate(someDate.getDate());
    const defaultDate = new Date(date).toISOString().split("T")[0];

    const navigate = useNavigate();
    const { http, user } = AuthUser();


    const [activeId, setActiveId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [filteredMedicine, setFilteredMedicine] = useState([]);
    const [searchWord, setSearchWord] = useState("");



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
                    increase: 0,
                    decrease: 0,
                    reason: 'Shortage',
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
                increase: 0,
                decrease: 0,
                reason: 'Shortage',
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

                if (!temp || temp < 0) {
                    pd.noOfBox = 0;
                    pd.pcs = 0;
                    pd.totalPrice = 0;
                } else {
                    const test = parseFloat(temp / pd.pktSize);
                    console.log("Calculated data", test);
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
        adjustment_no: "",
        adjustment_date: defaultDate,
        requested_by: user.name,
        phone_no: user.mobile,
        email_address: user.email,
        remark: "",
        notes: "",
    });

    const handleInput = (e) => {
        setFormData({
            ...form_data, [e.target.name]: e.target.value
        });
    }

    const increaseHandler = (item, e) => {
        const existCart = [...cart];
        existCart.map((pd) => {
            if (pd.id === item.id) {
                const temp = parseFloat(e.target.value);
                if (!temp || temp < 0) {
                    pd.increase = 0;
                }
                else {
                    pd.increase = e.target.value;
                    pd.decrease = 0;
                }
            }
        });
        setCart(existCart);
    };

    const decreaseHandler = (item, e) => {
        const existCart = [...cart];
        existCart.map((pd) => {
            if (pd.id === item.id) {
                const temp = parseFloat(e.target.value);
                if (!temp || temp < 0) {
                    pd.decrease = 0;
                }
                else {
                    pd.decrease = e.target.value;
                    pd.increase = 0;
                }
            }
        });
        setCart(existCart);
    };

    const handleReason = (item, e) => {

        const existCart = [...cart];
        existCart.map((pd) => {
            if (pd.id === item.id) {
                pd.reason = e.target.value;
            }
        });
        setCart(existCart);

    }
    const [adjustmentType, setAdjustmentType] = useState([]);

    useEffect(() => {
        http.get(`edit-adjustment/${id}`).then(res => {
            console.log(res);
            setFormData(res.data.data);
            setCart(res.data.adjustment_details);
        })
        http
            .get(`adjustment-type`)
            .then((res) => {
                setAdjustmentType(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])


    // Column data  
    const columnsData = [
        { title: 'Item Code', field: 'item_code', render:(row)=><>{row?.stock?.item_code}</> },
        {
            title: "Name", field: `name`,render:(row)=><>{row?.stock?.name}</>,
            cellStyle: {
                width: 400
            },
        },

        { title: 'Box Type', field: 'boxType', render: (row) => <div className="text-capitalize">{row?.stock?.box_type}</div> },
        { title: 'Pkt Size', field: 'pktSize', render: (row) => <div className="text-capitalize">{row?.stock?.pkt_size}</div> },


        { title: 'Unit', field: 'unit', render: (row) => <div className="text-capitalize">{row?.stock?.unit}</div> },

        { title: 'MRP', field: 'mrp', render: (row) => <div className="text-capitalize">{row?.stock?.price}</div> },
        {
            title: 'Increase', field: 'increase', render: (row) => <div className='w-[100%]'>
                <input className="form-control form-control-sm"
                    value={row.increase}
                    onChange={(e) => increaseHandler(row, e)}
                    style={{ width: '60px', margin: 'auto' }}
                    type="number"
                />
            </div>
        },

        {
            title: 'Decrease', field: 'decrease', render: (row) => <div className='w-[100%]'>
                <input className="form-control form-control-sm"
                    value={row.decrease}
                    onChange={(e) => decreaseHandler(row, e)}
                    style={{ width: '60px', margin: 'auto' }}
                    type="number"
                />
            </div>
        },

        {
            title: 'Reason', field: '', render: (row) =>
                <div style={{ width: '120px' }} className='d-flex gap-1'>

                    <div style={{ width: '100%' }} className="form-group">
                        <select
                            onChange={(e) => handleReason(row, e)}
                            className={`form-select form-select-sm border-${errors.rack ? 'danger' : 'secondary'}`}
                            aria-label="select example">
                            {
                                adjustmentType.map((item) => {
                                    return <option value={item.id}>{item.name}</option>
                                })
                            }

                        </select>
                    </div>
                </div>
        },

        {
            title: 'Action', field: 'action', render: (row) => <div className='d-flex justify-center'>
                <div>
                    <button type="button" onClick={() => removeMedicine(row)} className="btn btn-sm action-btn"><i
                        className="far fa-trash"></i></button>
                </div>
            </div>
        },
    ]



    // form submit 
    const submitFormData = (e, result) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('adjustment_no', form_data.adjustment_no);
        formData.append('adjustment_date', form_data.adjustment_date);
        formData.append('requested_by', form_data.requested_by);
        formData.append('phone_no', form_data.phone_no);
        formData.append('email_address', form_data.email_address);
        formData.append('remark', form_data.remark);
        formData.append('notes', form_data.notes);
        formData.append('created_by', form_data.requested_by);
        formData.append('adjustment_status', 'pending');

        http.post(`update-adjustment/${id}`, formData).then(res => {
            console.log('adjustment list', res);

            if (res.data.status === 200) {
                cart.map((item) => {
                    const details = new FormData();
                    // console.log('details', item);

                    details.append('noOfBox', item.noOfBox);
                    details.append('pcs', item.pcs);
                    details.append('totalPrice', item.totalPrice);

                    details.append('increase', item.increase);
                    details.append('decrease', item.decrease);
                    details.append('reason', item.reason);

                    if (item.src_primary_key) {
                        details.append('adjustment_master_id', id);
                        details.append('drug_id', item.drug_id);

                        http.post('save-adjustment-details', details).then(res => {
                            console.log("Adjustment details", res);
                        })
                    } else {
                        details.append('updated_by', user.name)
                        http.post(`/update-adjustment-details/${item.id}`, details).then(res => {
                            console.log("update adjustment details");
                        })
                    }
                })
                if (result) {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: res.data.message,
                        timer: 2500
                    })
                }
                navigate('/manager-adjustment');

            } else {
                setError(res.data.errors)
            }
        });
    }

    // Proceed to approval 
    const proceedToApproval = (e) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to send these adjustment for approval!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, send it!'
        }).then((result) => {
            if (result.isConfirmed) {

                submitFormData(e, false);

                http.post(`/manager-approved-adjustment-copy/${id}`).then(res => {
                    http.post(`adjustment-multiple`, { arrData: JSON.stringify(cart) }).then(res => {
                        console.log("adjustment details", res)
                    })
                    navigate(`/manager-adjustment`);
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

                http.post(`/cancel-adjustment/${id}`).then(res => {
                    navigate('/manager-adjustment');
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

    // console.log("form data", form_data);
    const { data } = useQuery('current-stock', () => http.get(`/current-stock-sales-counter`).then(res => res.data))

    const formatResult = (item) => {
        return (
            <>
                <div
                    onClick={() => {
                        if (item.stock_report != 0) {
                            medicineHandler(item,)
                        }

                    }}
                    className={`row d-flex align-items-center search-format ${item.stock < 1 ? "bg-red text-white" : ""} `}
                >
                    <div className="col-5">
                        <p>{item.name} - {item?.drug?.drug_description}</p>
                        <p className="ms-2">{item?.drug?.generic_name}</p>
                    </div>
                    <div className="col-3">
                        <p>{item?.manufacturer}</p>
                    </div>
                    <div className="col-2">
                        <p>{item.price} tk</p>
                    </div>
                    <div className="col-2 ">
                        <div className="row">
                            <div className="col-7">
                                <p>{item.stock}</p>
                            </div>
                            <div className="col-3">
                                <i style={{ fontSize: "12px" }} className={`fas fa-circle ${item.stock < 1 ? "text-danger" : "text-success"}`}></i>
                            </div>
                        </div>

                    </div>
                    {/* <div className="col-1">
                <p>
                  <i className={`fas fa-circle ${item.stock < 1 ? "text-danger" : "text-success"}`}></i>
                </p>
              </div> */}
                    {/* <div className="col-2">
                      <p>{item.expiry_date && `Exp. ${moment(item?.expiry_date).format("Do-MMM-YYYY")}`}</p>
                    </div> */}

                </div>
            </>
        )
    }

    const medicineSelect = (item) => {
        let alreadyExist = false;
        const newCart = [...cart];

        newCart.map((pd) => {
            if (pd.id === item.id) {
                alreadyExist = true;
            }
        });

        if (!alreadyExist) {
            newCart.push({
                ...item,
                noOfBox: 0,
                pcs: 0,
                increase: 0,
                decrease: 0,
                totalPrice:
                    item.cash_drug_discount &&
                        item.cash_drug_discount != 0 &&
                        item.cash_drug_discount !== null
                        ? parseInt(item.price) * 0 * 0 -
                        (parseInt(item.price) *
                            item.cash_drug_discount *
                            0 *
                            0) /
                        100
                        : parseInt(item.price) * 0 * 0,
                toalPriceWitoutDiscount: item.price * 0 * 0,
            });
        }
        setCart(newCart);
    }

    return (
        <div className="page-content">

            <div className="custom-card patients-head ">
                <h5 className="fw-normal custom_py-3 px-2  text-start mb-2 card-title">Add Adjustment
                    <button className="btn btn-sm btn-warning float-end" onClick={() => navigate(-1)}>
                        <i class="fal fa-long-arrow-left"></i> Back</button>
                </h5>
            </div>

            <div className="row">
                <div className="col-lg-12 col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row mb-2">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-4 col-form-label">Adjustment No. </label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control form-control-sm" id="exampleInputUsername2"
                                                value={form_data.adjustment_no}
                                                readOnly />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row ">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-4 col-form-label">Adjustment Date</label>
                                        <div className="col-sm-8">
                                            <input
                                                readOnly
                                                value={form_data.adjustment_date}
                                                type="date"
                                                className="form-control form-control-sm"
                                                id="exampleInputUsername2"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="row ">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-6 col-form-label">Requested by</label>
                                        <div className="col-sm-6">
                                            <input
                                                value={form_data.requested_by}
                                                type="text"
                                                className="form-control form-control-sm"
                                                id="exampleInputUsername2"
                                                readOnly />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="row ">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-4 col-form-label">Phone No.</label>
                                        <div className="col-sm-8">
                                            <input
                                                value={form_data.phone_no}
                                                type="number"
                                                className="form-control form-control-sm"
                                                id="exampleInputUsername2"
                                                readOnly />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="row ">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-4 col-form-label">Email Address</label>
                                        <div className="col-sm-8">
                                            <input
                                                value={form_data.email_address}
                                                type="text"
                                                className="form-control form-control-sm"
                                                id="exampleInputUsername2"
                                                readOnly />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row mt-2">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-2 col-form-label">Remark</label>
                                        <div className="col-sm-10">
                                            <textarea
                                                style={{ height: '50px' }}
                                                onChange={handleInput}
                                                name="remark"
                                                value={form_data.remark}
                                                className=" form-control form-control-sm"
                                                maxLength="100" rows="3"
                                                placeholder="write here..."></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row mt-2">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-2 col-form-label">Notes</label>
                                        <div className="col-sm-10">
                                            <textarea
                                                style={{ height: '50px' }}
                                                onChange={handleInput}
                                                name="notes"
                                                value={form_data.notes}
                                                className=" form-control form-control-sm"
                                                maxLength="100" rows="3"
                                                placeholder="write here..."></textarea>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* <div className="row mt-2">
                <div className="col-lg-12 col-md-12">
                    <div className='card'>
                        <div className="card-body medicine-custom-search">
                            <ReactSearchAutocomplete
                                showIcon={false}
                                placeholder={"Search Medicine"}
                                items={data}
                                resultStringKeyName="name"
                                maxResults={5}
                                onSelect={(item) => medicineSelect(item)}
                                autoFocus
                                fuseOptions={{ keys: ["name"] }} // Search in the description text as well
                                styling={{
                                    borderRadius: "5px !important",
                                    zIndex: 0,
                                    minHeight: "36px",
                                    position: "static",
                                    height: "36px",
                                    fontSize: "13px"
                                }}
                                formatResult={formatResult}
                            />
                        </div>
                    </div>
                </div>
            </div> */}

            {/*Product Details*/}
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

            {
                cart.length > 0
                    ?
                    <>
                        <button className="btn btn-sm btn-success float-end text-uppercase mt-3 me-2" onClick={(e) => submitFormData(e, true)}>
                            <i className="fas fa-save"></i> Update
                        </button>
                        <button type="button" onClick={(e) => proceedToApproval(e)} className="btn btn-sm btn-success float-end text-uppercase mt-3 me-2">
                            <i className="fas fa-paper-plane"></i> Proceed To Approval
                        </button>
                        <button type="button" onClick={() => cancelByManager()} className="btn btn-sm btn-danger-action float-end text-uppercase mt-3 me-2">
                            <i class="fas fa-times-circle"></i> Cancel
                        </button>
                    </>
                    :
                    <button className="btn btn-sm btn-success float-end text-uppercase mt-3 me-2" disabled>
                        select medicine first
                    </button>

            }



        </div>

    )
}

export default EditManagerAdjustment;

