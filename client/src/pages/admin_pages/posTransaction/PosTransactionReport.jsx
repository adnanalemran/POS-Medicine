import MaterialTable from 'material-table';
import moment from 'moment';
import React, { useContext, useEffect, useRef } from 'react';
import { useState } from 'react';
import Barcode from 'react-barcode/lib/react-barcode';
import { AiFillPrinter } from "react-icons/ai";
import { useReactToPrint } from 'react-to-print';
import AuthUser from '../../../Components/AuthUser';
import './PosTransaction.css';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

export default function PosTransactionReport() {
    const { http, user } = AuthUser();
    const [medicine, setMedicine] = useState([]);
    const [members, setMembers] = useState([]);
    const [brand, setBrand] = useState([]);
    const [paymentVouchar, setPaymentVouchar] = useState([]);
    useEffect(() => {

        http.get(`members`)
            .then(res => {
                setMembers(res.data.data)
            })
        http.get(`brand`)
            .then(res => {
                setBrand(res.data.data)
            })
        http.get(`current-stock-sales-counter`)
            .then(res => {
                setMedicine(res.data)
            })
        setFilterData({ startDate: '', endDate: '', medicine_id: '', member_id: '' })
        http.post(`return_invoice_details_by_date`, { startDate: moment(new Date()).format("YYYY-MM-DD"), endDate: moment(new Date()).format("YYYY-MM-DD") })
            .then(res => {
                if (res.status === 200) {
                    setReturnReportData(res.data.data);
                }
            })
            .catch(err => {
                console.log(err)
            })
        http.post(`serch-invoice-deatails-by-date`, { startDate: moment(new Date()).format("YYYY-MM-DD"), endDate: moment(new Date()).format("YYYY-MM-DD") })
            // http.post(`test_group_by`, { startDate: moment(new Date()).format("YYYY-MM-DD"), endDate: moment(new Date()).format("YYYY-MM-DD") })

            .then(res => {
                if (res.status === 200) {
                    setReportData(res.data.data);
                    // setTimeout(() => {
                    //     handlePrintTodaysReport();
                    // }, 500)
                }
            })

    }, []);

    // print invoice 
    const [invoiceData, setInvoiceData] = useState({
        invoice: {
            invoice_no: "",
            created_at: "",
            payment_status: "",
            grand_total: "",
        },
        invoiceDetails: [],
    });
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const [reportData, setReportData] = useState([]);
    const [returnReportData, setReturnReportData] = useState([]);
    const reportRef = useRef();
    const handlePrintTodaysReport = useReactToPrint({
        content: () => reportRef.current,
    });

    const [memberReportData, setMemberReportData] = useState([])
    const [filterData, setFilterData] = useState({
        startDate: "",
        endDate: "",
        medicine_id: '',
        member_id: '',
        brand_id: '',
    })
    const memberReportRef = useRef();
    const handlePrintMemberReport = useReactToPrint({
        content: () => memberReportRef.current,
    });
    const [brandReportData, setBrandReportData] = useState([]);
    const [filterBy, setFilterBy] = useState('date')
    const brandReportRef = useRef();
    const handlePrintBrandReport = useReactToPrint({
        content: () => brandReportRef.current,
    });
    const handeFilter = () => {
        if (filterBy === 'member') {
            http.post(`serch-invoice-by-member`, filterData)
                .then(res => {
                    setMemberReportData(res.data.data)
                    // setTimeout(() => {
                    //     handlePrintMemberReport();
                    // }, 500)
                })
        } else if (filterBy === 'brand') {
            http.post(`serch-invoice-by-medicine`, filterData)
                .then(res => {
                    setBrandReportData(res.data.data)
                    // setTimeout(() => {
                    //     handlePrintBrandReport();
                    // }, 500)
                    console.log(res, "res")
                })
        } else if (filterBy === 'date') {
            http.post(`return_invoice_details_by_date`, { startDate: filterData.startDate, endDate: filterData.endDate })
                .then(res => {
                    if (res.status === 200) {
                        setReturnReportData(res.data.data);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            http.post(`serch-invoice-deatails-by-date`, { startDate: filterData.startDate, endDate: filterData.endDate })
                .then(res => {
                    if (res.status === 200) {
                        console.log(res)
                        setReportData(res.data.data);
                    }
                })
        } else if (filterBy === "company") {
            http.post(`serch-invoice-deatails-by-company`, filterData)
                .then(res => {
                    if (res.status === 200) {
                        console.log(res.data.data, "resdata")
                        setReportData(res.data.data);
                        // setTimeout(() => {
                        //     handlePrintTodaysReport();
                        // }, 500)
                    }
                })
        }

    }
    const [tableShow, setTableShow] = useState('bill');
    console.log(returnReportData, "paymentVouchar")

    const [paymentInvoiceData, setPaymentInvoiceData] = useState({});
    const paymentInvoiceRef = useRef();
    const printPayment = useReactToPrint({
        content: () => paymentInvoiceRef.current,
    })
    const paymentInvoicePrint = (row) => {
        setPaymentInvoiceData(row)
        setTimeout(() => {
            printPayment();
        }, 300)
    }
    console.log(reportData, "reportData")
    return (
        <div className="page-content">
            <div className="row ms-1">
                <div className="col-lg-12 col-md-4 requisition_status_blog">
                    {/* <div className="card mb-2 billing_status">
                        <div className="card-body">
                            <div className="row d-flex align-items-center">
                                <div className="col-md-6">
                                    <h6>Sales Reports</h6>
                                </div>
                                <div className="col-md-6 ">
                                    <button style={{ backgroundColor: '#69B128', color: 'white', paddingTop: "6px", paddingBottom: "7px", marginTop: '1px' }} onClick={handleTodaysReport}
                                        className="btn btn-sm px-4 float-end  fw-bold">Today's Report</button>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <div className="card mb-2 billing_status">

                        <div className="row mb-1 p-2">
                            <div className="col-3">
                                <select onChange={(e) => { setFilterBy(e.target.value); setFilterData({ startDate: '', endDate: '', medicine_id: '', member_id: '', brand_id: '' }) }} name="" id="" className='form-select form-select-sm'>
                                    <option value="date">Search by date range</option>
                                    <option value="member">Search by member</option>
                                    <option value="brand">Search by brand name</option>
                                    <option value="company">Search by manufacturer</option>
                                </select>
                            </div>
                            <div className="col-sm-2">
                                <input
                                    className={`form-control form-control-sm`}
                                    type="date"
                                    value={filterData.startDate}
                                    id="exampleInputUsername2"
                                    onChange={(e) => setFilterData({ ...filterData, startDate: e.target.value })}
                                    name="requisition_no" />
                            </div>
                            <div className="col-sm-2">
                                <input
                                    className={`form-control form-control-sm`}
                                    type="date"
                                    id="exampleInputUsername2"
                                    value={filterData.endDate}
                                    onChange={(e) => setFilterData({ ...filterData, endDate: e.target.value })}
                                    name="requisition_no" />
                            </div>



                            <div className="col-sm-3">
                                {
                                    filterBy === "brand" ?
                                        <div className="">
                                            <ReactSearchAutocomplete
                                                showIcon={false}
                                                placeholder={"Search Medicine"}
                                                items={medicine}
                                                resultStringKeyName="name"
                                                maxResults={5}
                                                onSelect={(item) => {
                                                    setFilterData({ ...filterData, medicine_id: item.drug_id })
                                                }}
                                                fuseOptions={{ keys: ["name"] }} // Search in the description text as well
                                                styling={{
                                                    borderRadius: "5px !important",
                                                    zIndex: 3
                                                }}
                                            />
                                        </div> :
                                        filterBy === "member" ?
                                            <div className="">
                                                <ReactSearchAutocomplete
                                                    showIcon={false}
                                                    placeholder={"Search Member"}
                                                    items={members}
                                                    resultStringKeyName="member_name"
                                                    maxResults={5}
                                                    onSelect={(item) => {
                                                        setFilterData({ ...filterData, member_id: item.id })
                                                    }}
                                                    fuseOptions={{ keys: ["member_name", "member_phone"] }} // Search in the description text as well
                                                    styling={{
                                                        borderRadius: "5px !important",
                                                        zIndex: 3
                                                    }}
                                                />
                                            </div> :
                                            filterBy === "company" &&

                                            <div className="">
                                                <ReactSearchAutocomplete
                                                    showIcon={false}
                                                    placeholder={"Search Manufacturer"}
                                                    items={brand}
                                                    resultStringKeyName="title"
                                                    maxResults={5}
                                                    onSelect={(item) => {
                                                        setFilterData({ ...filterData, brand_id: item.id })
                                                    }}
                                                    fuseOptions={{ keys: ["title"] }} // Search in the description text as well
                                                    styling={{
                                                        borderRadius: "5px !important",
                                                        zIndex: 3
                                                    }}
                                                />
                                            </div>

                                }

                            </div>
                            <div className={`${filterBy === 'date' ? 'col-2' : filterBy === 'member' ? 'col-2' : 'col-2'}`}>
                                <button style={{ backgroundColor: '#69B128', color: 'white', paddingTop: "6px", paddingBottom: "7px", marginTop: '1px' }} onClick={handeFilter}
                                    className="btn btn-sm px-4 float-end fw-bold">Search</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="me-1">
                <div className="custom-card p-2 report-table-wrapper g-doc-scroll">
                    <div className="d-flex justify-content-between">
                        <h6>Daily Sales Report</h6>
                        <div>
                            {
                                (filterBy === 'date' && filterData.startDate && filterData.endDate) ?
                                    <button style={{ backgroundColor: '#69B128', color: 'white', paddingTop: "6px", paddingBottom: "7px", marginTop: '1px' }} onClick={handlePrintTodaysReport} className="btn btn-sm mb-1 px-4 float-end fw-bold">Print</button>
                                    :
                                    filterBy === 'brand' ?
                                        <button style={{ backgroundColor: '#69B128', color: 'white', paddingTop: "6px", paddingBottom: "7px", marginTop: '1px' }} onClick={handlePrintBrandReport} className="btn btn-sm mb-1 px-4 float-end fw-bold">Print</button>
                                        : filterBy === 'member' ?
                                            <button style={{ backgroundColor: '#69B128', color: 'white', paddingTop: "6px", paddingBottom: "7px", marginTop: '1px' }} onClick={handlePrintMemberReport} className="btn btn-sm mb-1 px-4 float-end fw-bold">Print</button>
                                            :
                                            <button style={{ backgroundColor: '#69B128', color: 'white', paddingTop: "6px", paddingBottom: "7px", marginTop: '1px' }} onClick={handlePrintTodaysReport} className="btn btn-sm mb-1 px-4 float-end fw-bold">Print</button>
                            }
                        </div>
                    </div>
                    <div className="daily-sales-report-table mt-3">
                        {
                            (filterBy === 'date' && filterData.startDate && filterData.endDate) ?
                                <>

                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>SL</td>
                                                <td>Invoice No</td>
                                                <td>Date</td>
                                                <td>Drug Name</td>
                                                <td>Price</td>
                                                <td>Qty</td>
                                                <td>Total Price</td>
                                            </tr>
                                            {
                                                reportData.map((item, i) =>
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{item.invoice?.invoice_no ? item.invoice?.invoice_no : item.invoice_no}</td>
                                                        <td>{moment(item.created_at).format('DD/MM/YYYY')}</td>
                                                        <td>{item.drug?.macrohealth_sg ? item.drug?.macrohealth_sg : item.macrohealth_sg}</td>
                                                        <td>{item.drug?.price ? item.drug?.price : item.price}</td>
                                                        <td>{item.qty}</td>
                                                        <td>{parseFloat(item.toal_price_witout_discount).toFixed(2)}</td>
                                                    </tr>)
                                            }
                                            <tr>
                                                <td colSpan={6} className='text-end fw-bold'> Sub Total : </td>
                                                <td className=''>{reportData.reduce((total, current) => total + parseFloat(current.toal_price_witout_discount), 0).toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={6} className='text-end fw-bold'> Discount Total : </td>
                                                <td className=''>{reportData.reduce((total, current) => total + parseFloat(current.invoice?.special_discount), 0).toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={6} className='text-end fw-bold'> Grand Total : </td>
                                                <td className=''>{(reportData.reduce((total, current) => total + parseFloat(current.toal_price_witout_discount), 0) - reportData.reduce((total, current) => total + parseFloat(current.invoice?.special_discount), 0)).toFixed(2)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <h6 className="text-center">Return Report</h6>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>SL</td>
                                                <td>Invoice No</td>
                                                <td>Date</td>
                                                <td>Drug Name</td>
                                                <td>Price</td>
                                                <td>Qty</td>
                                                <td>Total Price</td>
                                            </tr>
                                            {
                                                returnReportData.map((item, i) =>
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{item.invoice?.return_invoice_no}</td>
                                                        <td>{moment(item.created_at).format('DD/MM/YYYY')}</td>
                                                        <td>{item.drug?.macrohealth_sg}</td>
                                                        <td>{item.drug?.price}</td>
                                                        <td>{item.qty}</td>
                                                        <td>{parseFloat(item.total_price).toFixed(2)}</td>
                                                    </tr>)
                                            }
                                            <tr>
                                                <td colSpan={6} className='text-end fw-bold'> Total : </td>
                                                <td className=''>{returnReportData.reduce((total, current) => total + parseFloat(current.invoice?.total_amount), 0).toFixed(2)}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <h6 className="text-center">Summary</h6>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td colSpan={6} className='text-end fw-bold'> Total Sale : </td>
                                                <td className=''>{(reportData.reduce((total, current) => total + parseFloat(current.toal_price_witout_discount), 0) - reportData.reduce((total, current) => total + parseFloat(current.invoice?.special_discount), 0)).toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={6} className='text-end fw-bold'> Total Return : </td>
                                                <td className=''>{returnReportData.reduce((total, current) => total + parseFloat(current.invoice?.total_amount), 0).toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={6} className='text-end fw-bold'> Net Total : </td>
                                                <td className=''>{((reportData.reduce((total, current) => total + parseFloat(current.toal_price_witout_discount), 0) - reportData.reduce((total, current) => total + parseFloat(current.invoice?.special_discount), 0)) - returnReportData.reduce((total, current) => total + parseFloat(current.invoice?.total_amount), 0)).toFixed(2)}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </>
                                : filterBy === 'brand' ?
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>SL</td>
                                                <td>Invoice No</td>
                                                <td>Date</td>
                                                <td>Drug Name</td>
                                                <td>Price</td>
                                                <td>Qty</td>
                                                <td>Total Price</td>
                                            </tr>
                                            {
                                                brandReportData.map((item, i) =>
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{item.invoice?.invoice_no}</td>
                                                        <td>{moment(item.created_at).format('DD/MM/YYYY')}</td>
                                                        <td>{item.drug?.macrohealth_sg ? item.drug?.macrohealth_sg : item.macrohealth_sg}</td>
                                                        <td>{item.drug?.price}</td>
                                                        <td>{item.qty}</td>
                                                        <td>{parseFloat(item.toal_price_witout_discount).toFixed(2)}</td>
                                                    </tr>)
                                            }
                                            <tr>
                                                <td colSpan={6} className='text-end fw-bold'>Grand Total : </td>
                                                <td className=''>{brandReportData.reduce((total, current) => total + parseFloat(current.toal_price_witout_discount), 0).toFixed(2)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    : filterBy === 'member' ?
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>SL</td>
                                                    <td>Invoice No</td>
                                                    <td>Date</td>
                                                    {/* <td>Name</td> */}
                                                    <td>Mobile No</td>
                                                    <td>Medicine</td>
                                                    <td>Qty</td>
                                                    <td>Price</td>
                                                    <td>Total Price</td>
                                                    <td>Payment Status</td>
                                                    
                                                </tr>
                                                {
                                                    memberReportData.map((item, i) =>
                                                        <>
                                                            <tr>
                                                                <td>{i + 1}</td>
                                                                <td>{item.invoice_no}</td>
                                                                <td>{moment(item.created_at).format('DD/MM/YYYY')}</td>
                                                                {/* <td>{item.member?.member_name}</td> */}
                                                                <td>{item.member?.member_phone}</td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td>{item.grand_total}</td>
                                                                <td>{item.payment_status}</td>
                                                            </tr>
                                                            {/* <tr>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td>Drug Name</td>
                                                                <td>Qty</td>
                                                                <td>Price</td>
                                                                <td>Total Price</td>
                                                            </tr> */}
                                                            {
                                                                item.details.map((detail, j) =>
                                                                    <tr key={j}>
                                                                        <td></td>
                                                                        <td></td>
                                                                        <td></td>
                                                                        <td></td>
                                                                        <td>{detail.drug.macrohealth_sg}</td>
                                                                        <td>{detail.qty}</td>
                                                                        <td>{detail.drug.price}</td>
                                                                        <td></td>
                                                                        <td></td>
                                                                    </tr>
                                                                )
                                                            }

                                                        </>)
                                                }
                                                <tr>
                                                    <td colSpan={7} className='text-end fw-bold'>Grand Total : </td>
                                                    <td className=''>{memberReportData.reduce((total, current) => total + parseFloat(current.grand_total), 0)}</td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        :
                                        <>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>SL</td>
                                                        <td>Invoice No</td>
                                                        <td>Date</td>
                                                        <td>Drug Name</td>
                                                        <td>Price</td>
                                                        <td>Qty</td>
                                                        <td>Total Price</td>
                                                    </tr>
                                                    {
                                                        reportData.map((item, i) =>
                                                            <tr key={i}>
                                                                <td>{i + 1}</td>
                                                                <td>{item.invoice?.invoice_no ? item.invoice?.invoice_no : item.invoice_no}</td>
                                                                <td>{moment(item.created_at).format('DD/MM/YYYY')}</td>
                                                                <td>{item.drug?.macrohealth_sg ? item.drug?.macrohealth_sg : item.macrohealth_sg}</td>
                                                                <td>{item.drug?.price ? item.drug?.price : item.price}</td>
                                                                <td>{item.qty}</td>
                                                                <td>{parseFloat(item.toal_price_witout_discount).toFixed(2)}</td>
                                                            </tr>)
                                                    }
                                                    <tr>
                                                        <td colSpan={6} className='text-end fw-bold'> Sub Total : </td>
                                                        <td className=''>{reportData.reduce((total, current) => total + parseFloat(current.toal_price_witout_discount), 0).toFixed(2)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={6} className='text-end fw-bold'> Discount Total : </td>
                                                        <td className=''>{reportData.reduce((total, current) => total + parseFloat(current.invoice?.special_discount), 0).toFixed(2)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={6} className='text-end fw-bold'> Grand Total : </td>
                                                        <td className=''>{(reportData.reduce((total, current) => total + parseFloat(current.toal_price_witout_discount), 0) - reportData.reduce((total, current) => total + parseFloat(current.invoice?.special_discount), 0)).toFixed(2)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <h6 className="text-center">Return Report</h6>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>SL</td>
                                                        <td>Invoice No</td>
                                                        <td>Date</td>
                                                        <td>Drug Name</td>
                                                        <td>Price</td>
                                                        <td>Qty</td>
                                                        <td>Total Price</td>
                                                    </tr>
                                                    {
                                                        returnReportData.map((item, i) =>
                                                            <tr key={i}>
                                                                <td>{i + 1}</td>
                                                                <td>{item.invoice?.return_invoice_no}</td>
                                                                <td>{moment(item.created_at).format('DD/MM/YYYY')}</td>
                                                                <td>{item.drug?.macrohealth_sg}</td>
                                                                <td>{item.drug?.price}</td>
                                                                <td>{item.qty}</td>
                                                                <td>{parseFloat(item.total_price).toFixed(2)}</td>
                                                            </tr>)
                                                    }
                                                    <tr>
                                                        <td colSpan={6} className='text-end fw-bold'> Total : </td>
                                                        <td className=''>{returnReportData.reduce((total, current) => total + parseFloat(current.invoice?.total_amount), 0).toFixed(2)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <h6 className="text-center">Summary</h6>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td colSpan={6} className='text-end fw-bold'> Total Sale : </td>
                                                        <td className=''>{(reportData.reduce((total, current) => total + parseFloat(current.toal_price_witout_discount), 0) - reportData.reduce((total, current) => total + parseFloat(current.invoice?.special_discount), 0)).toFixed(2)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={6} className='text-end fw-bold'> Total Return : </td>
                                                        <td className=''>{returnReportData.reduce((total, current) => total + parseFloat(current.invoice?.total_amount), 0).toFixed(2)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={6} className='text-end fw-bold'> Net Total : </td>
                                                        <td className=''>{((reportData.reduce((total, current) => total + parseFloat(current.toal_price_witout_discount), 0) - reportData.reduce((total, current) => total + parseFloat(current.invoice?.special_discount), 0)) - returnReportData.reduce((total, current) => total + parseFloat(current.invoice?.total_amount), 0)).toFixed(2)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </>
                        }


                    </div>
                </div>
            </div>
            <div className='transaction-invoice'>
                <div style={{ paddingLeft: '35px', paddingRight: '35px' }} ref={componentRef} className='invoice-print'>
                    <div className="invoice-pharmacy-details d-flex justify-content-center">
                        <div className="text-center">
                            <h5>{user?.organization?.name}</h5>
                            <p>Location : {user?.organization?.address}</p>
                            <p>Tel : {user?.organization?.mobile}</p>
                            <p>Vat Reg No :534565 </p>
                            <h6 className="mt-2">CASH MEMO</h6>
                        </div>
                    </div>
                    <div className="invoice-date invoice-border-dashed">
                        {/* <p style={{ textAlign: 'center' }}>Invoice No : {invoiceData?.invoice?.invoice_no} </p>
                        <p style={{ textAlign: 'center' }}>Sales Person : Dummy </p> */}
                        <div>
                            <p> Name: {invoiceData.invoice?.member_name}</p>
                            <p>Phone parseFloat: {invoiceData.invoice?.member_phone}</p>
                            <p >Sales Person : Dummy </p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p style={{ textAlign: 'center' }}>Date : {moment(invoiceData?.invoice?.created_at).format('DD/MM/YYYY')} </p>
                            <p style={{ textAlign: 'center' }}>Time : {moment(invoiceData?.invoice?.created_at).format('hh:mm:ss')} </p>
                        </div>
                    </div>
                    <div className="invoice-item-table">
                        <table>
                            <tr className='invoice-border-dashed'>
                                <td width={'51%'}>Item</td>
                                <td width={'15%'} className='text-right'>Qty</td>
                                <td width={'20%'} className='text-right'>Price</td>
                                <td width={'15%'} className='text-right'>Total Price</td>
                            </tr>
                            {
                                invoiceData.invoiceDetails.map((item, i) =>
                                    <tr key={i}>
                                        <td width={"50%"} >{item.name ? item.name : item.drug?.macrohealth_sg}</td>
                                        <td width={"15%"} className='text-start'>{item.pcs || item.qty}</td>
                                        <td width={"20%"} className='text-start'>{item.price}</td>
                                        <td width={"15%"} className='text-end'>{item.toalPriceWitoutDiscount ? parseFloat(item.toalPriceWitoutDiscount).toFixed(2) : (parseInt(item.qty) * parseFloat(item.price)).toFixed(2)}</td>
                                    </tr>)
                            }
                            <tr className='invoice-border-dashed-top'>
                                <td colSpan={3} className='text-end fw-bolder'>Sub Total : </td>
                                <td className='text-end'>{parseFloat(invoiceData.invoice?.grand_total).toFixed(2)} </td>
                            </tr>

                            <tr>
                                <td colSpan={3} className='text-end'>VAT / TAX : </td>
                                <td className='text-end'>{0}</td>
                            </tr>

                            <tr>
                                <td colSpan={3} className='text-end'>Discount : </td>
                                <td className='text-end'>{0} </td>
                            </tr>
                            <tr>
                                <td colSpan={3} className='text-end'>Special Discount : </td>
                                <td className='text-end'>{0} </td>
                            </tr>
                            <tr className='invoice-border-dashed-top'>
                                <td colSpan={3} className='text-end fw-bold'>Bill Total : </td>
                                <td className='text-end'>{parseFloat(invoiceData?.invoice?.grand_total).toFixed(2)} </td>

                            </tr>
                        </table>
                    </div>
                    <div className=" invoice-creator mt-1">
                        <p>Provided By: Cashier</p>
                        {/* <p>Time : {new Date().toLocaleTimeString()}</p> */}
                        {/* <p>Date : {new Date().toLocaleDateString('en-GB')} </p> */}
                    </div>

                    <div>
                        <p className='border-bottom w-50 mt-2 fw-bold'>Terms & Condition:</p>
                        <p>১. ক্যাশ মেমো ছাড়া ওষুধ ফেরত নেওয়া হয় না ।</p>
                        <p >২. বিক্রিত ওষুধ ৭ দিন পর ফেরত নেওয়া হয় না ।</p>
                        <p >৩. ইনসুলিন ও বিদেশী ওষুধ ফেরত নেওয়া হয় না ।</p>
                        <p >৪. বিক্রিত ওষুধ এর টাকা ফেরত দেওয়া হয় না  ।</p>
                        <p>৫. কাটা ছেড়া ও ফ্রিজের বিক্রিত ওষুধ ফেরত নেওয়া হয় না । </p>
                    </div>
                    <div className="branding-section mt-3 mx-auto text-center mx-auto">
                        <p>Technology Partner Zaimah Technologies Ltd.</p>
                    </div>

                    <div className="invoice-greeting d-flex justify-content-center align-items-center mt-1">
                        <Barcode displayValue={false} height={40} width={3} value={16} />
                    </div>
                    <div className="d-flex justify-content-center branding-section">
                        <p>Thank You</p>
                    </div>
                </div>
            </div>

            <div ref={reportRef} className="daily-report">
                <div className="d-flex justify-content-center">
                    <div className="text-center">
                        <h5>{user?.organization?.name}</h5>
                        <p>Location : {user?.organization?.address}</p>
                        <p>Tel : {user?.organization?.mobile}</p>
                        <p>Vat Reg No :534565 </p>
                    </div>
                </div>
                <div className="d-flex justify-content-between mt-2">
                    <h6>Daily Sales Statement Report </h6>
                    {
                        filterData.startDate && filterData.endDate &&
                        <h6>Dated: {moment(filterData.startDate).format('DD/MM/YYYY')} to {moment(filterData.endDate).format('DD/MM/YYYY')}</h6>
                    }
                    {
                        !filterData.startDate && !filterData.endDate &&
                        <h6>Dated: {moment(new Date()).format('DD/MM/YYYY')}</h6>
                    }
                </div>
                <div className="daily-sales-report-table mt-3">
                    {
                        filterBy === "company" ?
                            <>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>SL</td>
                                            <td>Invoice No</td>
                                            <td>Date</td>
                                            <td>Drug Name</td>
                                            <td>Price</td>
                                            <td>Qty</td>
                                            <td>Total Price</td>
                                        </tr>
                                        {
                                            reportData.map((item, i) =>
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{item.invoice_no}</td>
                                                    <td>{moment(item.created_at).format('DD/MM/YYYY')}</td>
                                                    <td>{item.macrohealth_sg}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.qty}</td>
                                                    <td>{parseFloat(item.toal_price_witout_discount).toFixed(2)}</td>
                                                </tr>)
                                        }
                                        <tr>
                                            <td colSpan={6} className='text-end fw-bold'>Grand Total : </td>
                                            <td className=''>{reportData.reduce((total, current) => total + parseFloat(current.toal_price_witout_discount), 0).toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>
                            :
                            <>
                                <>

                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>SL</td>
                                                <td>Invoice No</td>
                                                <td>Date</td>
                                                <td>Drug Name</td>
                                                <td>Price</td>
                                                <td>Qty</td>
                                                <td>Total Price</td>
                                            </tr>
                                            {
                                                reportData.map((item, i) =>
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{item.invoice?.invoice_no ? item.invoice?.invoice_no : item.invoice_no}</td>
                                                        <td>{moment(item.created_at).format('DD/MM/YYYY')}</td>
                                                        <td>{item.drug?.macrohealth_sg ? item.drug?.macrohealth_sg : item.macrohealth_sg}</td>
                                                        <td>{item.drug?.price ? item.drug?.price : item.price}</td>
                                                        <td>{item.qty}</td>
                                                        <td>{parseFloat(item.toal_price_witout_discount).toFixed(2)}</td>
                                                    </tr>)
                                            }
                                            <tr>
                                                <td colSpan={6} className='text-end fw-bold'> Sub Total : </td>
                                                <td className=''>{reportData.reduce((total, current) => total + parseFloat(current.toal_price_witout_discount), 0).toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={6} className='text-end fw-bold'> Discount Total : </td>
                                                <td className=''>{reportData.reduce((total, current) => total + parseFloat(current.invoice?.special_discount), 0).toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={6} className='text-end fw-bold'> Grand Total : </td>
                                                <td className=''>{(reportData.reduce((total, current) => total + parseFloat(current.toal_price_witout_discount), 0) - reportData.reduce((total, current) => total + parseFloat(current.invoice?.special_discount), 0)).toFixed(2)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <h6 className="text-center">Return Report</h6>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>SL</td>
                                                <td>Invoice No</td>
                                                <td>Date</td>
                                                <td>Drug Name</td>
                                                <td>Price</td>
                                                <td>Qty</td>
                                                <td>Total Price</td>
                                            </tr>
                                            {
                                                returnReportData.map((item, i) =>
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{item.invoice?.return_invoice_no}</td>
                                                        <td>{moment(item.created_at).format('DD/MM/YYYY')}</td>
                                                        <td>{item.drug?.macrohealth_sg}</td>
                                                        <td>{item.drug?.price}</td>
                                                        <td>{item.qty}</td>
                                                        <td>{parseFloat(item.total_price).toFixed(2)}</td>
                                                    </tr>)
                                            }
                                            <tr>
                                                <td colSpan={6} className='text-end fw-bold'> Total : </td>
                                                <td className=''>{returnReportData.reduce((total, current) => total + parseFloat(current.invoice?.total_amount), 0).toFixed(2)}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <h6 className="text-center">Summary</h6>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td colSpan={6} className='text-end fw-bold'> Total Sale : </td>
                                                <td className=''>{(reportData.reduce((total, current) => total + parseFloat(current.toal_price_witout_discount), 0) - reportData.reduce((total, current) => total + parseFloat(current.invoice?.special_discount), 0)).toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={6} className='text-end fw-bold'> Total Return : </td>
                                                <td className=''>{returnReportData.reduce((total, current) => total + parseFloat(current.invoice?.total_amount), 0).toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={6} className='text-end fw-bold'> Net Total : </td>
                                                <td className=''>{((reportData.reduce((total, current) => total + parseFloat(current.toal_price_witout_discount), 0) - reportData.reduce((total, current) => total + parseFloat(current.invoice?.special_discount), 0)) - returnReportData.reduce((total, current) => total + parseFloat(current.invoice?.total_amount), 0)).toFixed(2)}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </>

                            </>
                    }

                </div >
            </div >

            <div ref={memberReportRef} className="daily-report">
                <div className="d-flex justify-content-center">
                    <div className="text-center">
                        <h5>{user?.organization?.name}</h5>
                        <p>Location : {user?.organization?.address}</p>
                        <p>Tel : {user?.organization?.mobile}</p>
                        <p>Vat Reg No :534565 </p>
                    </div>
                </div>
                {
                    memberReportData.length > 0 ?
                        <>

                            <div className="d-flex justify-content-between mt-2">
                                <h6>Customer Sales Statement Report </h6>
                                {
                                    filterData.startDate && filterData.endDate &&
                                    <h6>Dated: {moment(filterData.startDate).format('DD/MM/YYYY')} to {moment(filterData.endDate).format('DD/MM/YYYY')}</h6>
                                }
                                {
                                    !filterData.startDate && !filterData.endDate &&
                                    <h6>Dated: {moment(new Date()).format('DD/MM/YYYY')}</h6>
                                }

                            </div>
                            <div className="daily-sales-report-table mt-3">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>SL</td>
                                            <td>Invoice No</td>
                                            <td>Date</td>
                                            <td>Name</td>
                                            <td>Mobile No</td>
                                            <td>Payment Status</td>
                                            <td>Total Price</td>
                                        </tr>
                                        {
                                            memberReportData.map((item, i) =>
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{item.invoice_no}</td>
                                                    <td>{moment(item.created_at).format('DD/MM/YYYY')}</td>
                                                    <td>{item.member?.member_name}</td>
                                                    <td>{item.member?.member_phone}</td>
                                                    <td>{item.payment_status}</td>
                                                    <td>{item.grand_total}</td>
                                                </tr>)
                                        }
                                        <tr>
                                            <td colSpan={6} className='text-end fw-bold'>Grand Total : </td>
                                            <td className=''>{memberReportData.reduce((total, current) => total + parseFloat(current.grand_total), 0)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                        :
                        <div className="d-flex mt-5 justify-content-center">
                            <h6 className='text-danger'>No Data Found</h6>
                        </div>
                }

            </div>
            <div ref={brandReportRef} className="daily-report">
                <div className="d-flex justify-content-center">
                    <div className="text-center">
                        <h5>{user?.organization?.name}</h5>
                        <p>Location : {user?.organization?.address}</p>
                        <p>Tel : {user?.organization?.mobile}</p>
                        <p>Vat Reg No :534565 </p>
                    </div>
                </div>
                <div className="d-flex justify-content-between mt-2">
                    <h6> Sales Report :{brandReportData[0]?.drug?.drug_name} </h6>
                    {
                        filterData.startDate && filterData.endDate &&
                        <h6>Dated: {moment(filterData.startDate).format('DD/MM/YYYY')} to {moment(filterData.endDate).format('DD/MM/YYYY')}</h6>
                    }
                    {
                        !filterData.startDate && !filterData.endDate &&
                        <h6>Dated: {moment(new Date()).format('DD/MM/YYYY')}</h6>
                    }
                </div>
                <div className="daily-sales-report-table mt-3">
                    <table>
                        <tbody>
                            <tr>
                                <td>SL</td>
                                <td>Invoice No</td>
                                <td>Date</td>
                                <td>Drug Name</td>
                                <td>Price</td>
                                <td>Qty</td>
                                <td>Total Price</td>
                            </tr>
                            {
                                brandReportData.map((item, i) =>
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item.invoice?.invoice_no}</td>
                                        <td>{moment(item.invoice?.created_at).format('DD/MM/YYYY')}</td>
                                        <td>{item.drug?.macrohealth_sg}</td>
                                        <td>{item.drug?.price}</td>
                                        <td>{item.qty}</td>
                                        <td>{parseFloat(item.toal_price_witout_discount).toFixed(2)}</td>
                                    </tr>)
                            }
                            <tr>
                                <td colSpan={6} className='text-end fw-bold'>Grand Total : </td>
                                <td className=''>{parseFloat(brandReportData.reduce((total, current) => total + parseFloat(current.toal_price_witout_discount), 0)).toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div >
    )
}
