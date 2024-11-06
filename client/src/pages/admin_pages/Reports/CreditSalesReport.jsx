import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import AuthUser from '../../../Components/AuthUser';
import { useReactToPrint } from 'react-to-print';
import http from '../../../http';
import { num } from '../../../converters';
import ReactDatePicker from 'react-datepicker';

export default function CreditSalesReport() {
    const { user } = AuthUser();
    const date = moment().format('YYYY-MM-DD');
    const [filterData, setFilterData] = useState({ startDate: date, endDate: date, member_id: '', brand_id: '', medicine_id: '' })
    const [reportData, setReportData] = useState([]);
    const handleFilter = (e) => {
        http.post(`search-invoice-by-date`, { startDate: filterData.startDate, endDate: filterData.endDate })
            .then(res => {
                console.log(res)
                setReportData(res?.data?.data);
            })
    }

    useEffect(() => {
        http.post(`search-invoice-by-date`, { startDate: date, endDate: date })
            .then(res => {
                console.log(res)
                setReportData(res?.data?.data);
            })
    }, [date])
    const creditReports = reportData?.filter((item) => item?.payment_status === 'Unpaid' || item?.payment_status === 'Partially Paid');
    const reportRef = useRef();
    const handlePrintTodaysReport = useReactToPrint({
        content: () => reportRef.current,
    });
    console.log(creditReports, "creditReports");
    return (
        <div className="page-content">
            <div className="row ms-1">
                <div className="col-lg-12 col-md-4 requisition_status_blog">
                    <div className="card mb-2 billing_status">

                        <div className="row mb-1 p-2">
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
                            <div className="col-sm-3">
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
                        <h6>Credit Sales Report</h6>
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
                                    <h6>Credit Sales Report </h6>
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
                                        <td className='text-end'>Total Sales Amount</td>
                                        <td className='text-end'>Collection Amount</td>
                                        <td className='text-end'>Due Amount</td>
                                    </tr>
                                    {
                                        creditReports.map((item, i) =>
                                            <>
                                                <tr key={i}>
                                                    <td width="5%">{i + 1}</td>
                                                    <td className='text-start' width='6%'>{moment(item?.created_at).format('DD/MM/YYYY')}</td>
                                                    <td width='' className='text-start'>{item?.invoice_no}</td>
                                                    <td width='' className='text-start'>{item?.member?.member_name}</td>
                                                    <td width='' className='text-end'>{((parseFloat(item?.grand_total || 0) - parseFloat(item?.special_discount || 0)) || 0).toFixed(2)}</td>
                                                    <td width='' className='text-end'>{num(item?.paid_amount)}</td>
                                                    <td width='' className='text-end'>{num(item?.due_amount)}</td>
                                                </tr>
                                            </>)
                                    }

                                    <tr>
                                        <td colSpan={4} className='text-end fw-bold'> Grand Total : </td>
                                        <td className='text-end fw-bold'>{(creditReports.reduce((total, current) => total + parseFloat(current?.sub_total || 0), 0) - creditReports.reduce((total, current) => total + parseFloat(current?.special_discount || 0), 0)).toFixed(2)}</td>
                                        <td className='text-end fw-bold'>{(creditReports.reduce((total, current) => total + parseFloat(current?.paid_amount || 0), 0)).toFixed(2)}</td>
                                        <td className='text-end fw-bold'>{(creditReports.reduce((total, current) => total + parseFloat(current?.due_amount || 0), 0)).toFixed(2)}</td>
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
