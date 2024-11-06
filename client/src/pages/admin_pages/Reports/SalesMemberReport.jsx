import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import AuthUser from '../../../Components/AuthUser';
import { useReactToPrint } from 'react-to-print';
import http from '../../../http';
import { num } from '../../../converters';
import ReactDatePicker from 'react-datepicker';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { toast } from 'react-toastify';

export default function SalesMemberReport() {
    const { user } = AuthUser();
    const date = moment().format('YYYY-MM-DD');
    const [filterData, setFilterData] = useState({ startDate: date, endDate: date, member_id: '', brand_id: '', medicine_id: '' })
    const [reportData, setReportData] = useState([]);
    const [returnData, setReturnData] = useState([]);
    const handleFilter = (e) => {
        if (filterData.member_id) {
            http.post(`search-invoice-by-date`, { startDate: filterData.startDate, endDate: filterData.endDate, member_id: filterData.member_id })
                .then(res => {
                    console.log(res)
                    setReportData(res?.data?.data);
                    setReturnData(res?.data?.return);
                })
                .catch(err => console.log(err))
        } else {
            toast.error("Please select member");
        }
    }
    const [members, setMembers] = useState([]);
    useEffect(() => {
        http.get('/members')
            .then((res) => {
                if (res.status === 200) {
                    setMembers(res.data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })

    }, [date])
    const reportRef = useRef();
    const handlePrintTodaysReport = useReactToPrint({
        content: () => reportRef.current,
    });

    const handleOnSelect = (item) => {
        console.log("select", item);
        setFilterData({ ...filterData, member_id: item.id });
    };
    const handleOnClear = () => {
        setFilterData({ ...filterData, member_id: '' });
    };

    const formatResult = (item) => {
        return (
            <div className="result-wrapper">
                <span className="result-span">name: {item.member_name}</span> <br />
                <span className="result-span">Phone: {item.member_phone}</span>
            </div>
        );
    };

    console.log(returnData, "reportData");
    return (
        <div className="page-content">
            <div className="row ms-1">
                <div className="col-lg-12 col-md-4 requisition_status_blog">
                    <div className="card mb-2 billing_status">

                        <div className="row mb-1 p-2">
                            <div className="row col-11">
                                <div className="col-sm-4">
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Start Date</label>
                                        </div>
                                        <div className="col-9">
                                            <ReactDatePicker
                                                placeholderText='From Date'
                                                selected={filterData.startDate ? new Date(filterData.startDate) : new Date()}
                                                className='form-control form-control-sm custom-datepicker-input-width'
                                                dateFormat={'dd/MM/yyyy'}
                                                name='requisition_no'
                                                onChange={(d) =>
                                                    setFilterData({
                                                        ...filterData,
                                                        startDate: moment(d).format('YYYY-MM-DD'),
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="row">
                                        <div className="col-3">
                                            <label>End Date</label>
                                        </div>
                                        <div className="col-9">
                                            <ReactDatePicker
                                                placeholderText='From Date'
                                                selected={filterData.endDate ? new Date(filterData.endDate) : new Date()}
                                                className='form-control form-control-sm custom-datepicker-input-width'
                                                dateFormat={'dd/MM/yyyy'}
                                                name='requisition_no'
                                                onChange={(d) =>
                                                    setFilterData({
                                                        ...filterData,
                                                        endDate: moment(d).format('YYYY-MM-DD'),
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Member</label>
                                        </div>
                                        <div className="col-9">
                                            <ReactSearchAutocomplete
                                                items={members}
                                                maxResults={12}
                                                fuseOptions={{ keys: ["member_name", "member_email", "member_phone"] }}

                                                resultStringKeyName="member_name"
                                                onSelect={handleOnSelect}
                                                onClear={handleOnClear}
                                                showIcon={false}
                                                formatResult={formatResult}
                                                placeholder={"Search"}

                                                styling={{
                                                    height: "30px",
                                                    border: "1px solid gray",
                                                    borderRadius: "4px",
                                                    backgroundColor: "white",
                                                    boxShadow: "none",
                                                    hoverBackgroundColor: "#cbcec8",
                                                    color: "black",
                                                    fontSize: "12px",
                                                    fontFamily: "Courier",
                                                    iconColor: "gray",
                                                    lineColor: "gray",
                                                    placeholderColor: "gray",
                                                    clearIconMargin: "3px 8px 0 0",
                                                    zIndex: 2,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-1">
                                <button style={{ backgroundColor: '#69B128', color: 'white', paddingTop: "6px", paddingBottom: "7px", marginTop: '1px' }} onClick={handleFilter}
                                    className="btn btn-sm px-4 fw-bold">Search</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="me-1">
                <div className="custom-card p-2 report-table-wrapper g-doc-scroll">
                    <div className="d-flex justify-content-between">
                        <h6>Sales Report</h6>
                        <button onClick={handlePrintTodaysReport} className="btn btn-sm btn-primary float-end">Print</button>
                    </div>
                    <div className="mt-3">
                        <div ref={reportRef} className="daily-sales-report-table">
                            <div className="daily-report">
                                <div className="d-flex justify-content-center">
                                    <div className="text-center">
                                        <h5 className='report-org-name'>{user?.organization?.name}</h5>
                                        <p className='report-org-address'> {user?.organization?.address}</p>
                                        <p>Tel : {user?.organization?.mobile}</p>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <h6> Sales Report </h6>
                                    {
                                        filterData.startDate && filterData.endDate &&
                                        <h6>Dated: {moment(filterData.startDate).format('DD/MM/YYYY')} to {moment(filterData.endDate).format('DD/MM/YYYY')}</h6>
                                    }
                                    {
                                        !filterData.startDate && !filterData.endDate &&
                                        <h6>Dated: {moment(new Date()).format('DD/MM/YYYY')}</h6>
                                    }
                                </div>
                            </div>
                            <table className='mt-2'>
                                <tbody>
                                    <tr className='bg-light'>
                                        <td>SL</td>
                                        <td>Date</td>
                                        <td>Invoice No</td>
                                        <td>Member</td>
                                        <td>Payment Status</td>
                                        <td className='text-end'>TS Amount</td>
                                        {/* <td>Due Amount</td> */}
                                    </tr>
                                    {
                                        reportData.map((item, i) =>
                                            <>
                                                <tr key={i}>
                                                    <td width="5%">{i + 1}</td>
                                                    <td className='text-start' width='6%'>{moment(item?.created_at).format('DD/MM/YYYY')}</td>
                                                    <td width='' className='text-start'>{item?.invoice_no}</td>
                                                    <td width='' className='text-start'>{item?.member?.member_name}</td>
                                                    <td width='' className='text-start'>{item?.discount_type}</td>
                                                    <td width='' className='text-end'>{((parseFloat(item?.grand_total || 0) - parseFloat(item?.special_discount || 0)) || 0).toFixed(2)}</td>
                                                </tr>
                                            </>)
                                    }
                                    <tr>
                                        <td colSpan={5} className='text-end fw-bold'>Sales Total : </td>
                                        <td className='text-end fw-bold'>{(reportData.reduce((total, current) => total + parseFloat(current?.sub_total || 0), 0) - reportData.reduce((total, current) => total + parseFloat(current?.special_discount), 0)).toFixed(2)}</td>
                                    </tr>
                                    <h6 className='my-1'>Return</h6>
                                    <tr className='bg-light'>
                                        <td>SL</td>
                                        <td>Date</td>
                                        <td>Invoice</td>
                                        <td>Reference Invoice</td>
                                        <td>Member</td>
                                        <td className='text-end'>T Amount</td>
                                    </tr>
                                    {
                                        returnData.map((item, i) =>
                                            <>
                                                <tr key={i}>
                                                    <td width="5%">{i + 1}</td>
                                                    <td className='text-start' width='6%'>{moment(item?.created_at).format('DD/MM/YYYY')}</td>
                                                    <td width='' className='text-start'>{item?.return_invoice_no}</td>
                                                    <td width='' className='text-start'>{item?.reference_invoice_no}</td>
                                                    <td width='' className='text-start'>{item?.member?.member_name}</td>
                                                    <td width='' className='text-end'>{num(item?.total_amount)}</td>
                                                </tr>
                                            </>)
                                    }
                                    <tr>
                                        <td colSpan={5} className='text-end fw-bold'>Return Total : </td>
                                        <td className='text-end fw-bold'>{(returnData.reduce((total, current) => total + parseFloat(current?.total_amount || 0), 0)).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5} className='text-end fw-bold'>Grand Total (Sales - Return) : </td>
                                        <td className='text-end fw-bold'>{((reportData.reduce((total, current) => total + parseFloat(current?.sub_total || 0), 0) - reportData.reduce((total, current) => total + parseFloat(current?.special_discount), 0)) - returnData.reduce((total, current) => total + parseFloat(current?.total_amount || 0), 0)).toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
