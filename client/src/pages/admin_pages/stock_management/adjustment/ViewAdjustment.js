import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from "moment";
import MaterialTable from "material-table";
import AuthUser from '../../../../Components/AuthUser';
import { ImCross } from 'react-icons/im';
import { num } from '../../../../converters';


const ViewAdjustment = () => {

    const { id } = useParams();

    const someDate = new Date();
    const date = someDate.setDate(someDate.getDate());
    const defaultDate = new Date(date).toISOString().split("T")[0];

    const navigate = useNavigate();
    const { http, user } = AuthUser();


    const [cart, setCart] = useState([]);



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
    const [adjustmentType, setAdjustmentType] = useState([]);

    useEffect(() => {
        http.get(`edit-adjustment/${id}`).then(res => {
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
        {
            title: "Name", field: `name`, render: (row) => <div className='text-center'>{row?.drug?.name}</div>,
            cellStyle: {
                width: 400
            },
        },

        { title: 'Box Type', field: 'boxType', render: (row) => <div className="text-capitalize text-center">{row?.drug?.box_type}</div> },
        { title: 'Pkt Size', field: 'pktSize', render: (row) => <div className="text-capitalize text-center">{row?.drug?.pkt_size}</div> },


        { title: 'Unit', field: 'unit', render: (row) => <div className="text-capitalize text-center">{row?.drug?.unit}</div> },

        { title: 'TP', field: 'mrp', render: (row) => <div className="text-capitalize text-center">{row?.drug?.drug_price}</div> },
        
        { title: 'Total Price', render:(row)=> <div className='text-center'>{num(row?.increase)>0 ? parseFloat(row?.increase)* parseFloat(row?.drug?.drug_price) : num(row?.decrease) > 0 ? parseFloat(row?.decrease)* parseFloat(row?.drug?.drug_price) : 0}</div> },
        {
            title: 'Increase', field: 'increase', render: (row) => <div className='w-[100%]'>
                <input className="form-control form-control-sm"
                    readOnly
                    value={row.increase}
                    style={{ width: '60px', margin: 'auto' }}
                    type="number"
                />
            </div>
        },

        {
            title: 'Decrease', field: 'decrease', render: (row) => <div className='w-[100%]'>
                <input className="form-control form-control-sm"
                    readOnly
                    value={row.decrease}
                    style={{ width: '60px', margin: 'auto' }}
                    type="number"
                />
            </div>
        },

        {
            title: 'Reason', field: '', render: (row) =>
                <div style={{ width: '120px' }} className='d-flex gap-1'>

                    <div style={{ width: '100%' }} class="form-group">
                        <select
                            disabled
                            value={row.reason}
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
    ]
    


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
                                                readOnly
                                                style={{ height: '50px' }}
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
                                                readOnly
                                                style={{ height: '50px' }}
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
        </div>

    )
}

export default ViewAdjustment;

