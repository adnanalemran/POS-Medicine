import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import AuthUser from '../../../Components/AuthUser';
import { useReactToPrint } from 'react-to-print';
import http from '../../../http';
import { num } from '../../../converters';

export default function ProductExpiryReport() {
    const { user } = AuthUser();
    const date = moment().format('YYYY-MM-DD');
    const [reportData, setReportData] = useState([]);


    useEffect(() => {
        http.get(`stock-expiry-report`)
            .then(res => {
                console.log(res)
                setReportData(res?.data?.data);
            })
    }, [date])
    const reportRef = useRef();
    const handlePrintTodaysReport = useReactToPrint({
        content: () => reportRef.current,
    });
    console.log(reportData, "reportData");
    let count = 0;
    return (
        <div className="page-content">
            <div className="me-1">
                <div className="custom-card p-2 report-table-wrapper g-doc-scroll">
                    <div className="d-flex justify-content-between">
                        <h6>Stock Expiry Report</h6>
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
                                    <h6>Stock Expiry Report </h6>
                                    <h6>Dated: {moment(new Date()).format('DD/MM/YYYY')}</h6>
                                </div>
                            </div>
                            <table>
                                <tbody>
                                    <tr className="bg-light">
                                        <td>SL</td>
                                        <td>Company</td>
                                        <td>Product</td>
                                        <td>Expiry Date</td>
                                        <td className='text-end'>Stock</td>
                                        <td className='text-end'>TP</td>
                                        <td className='text-end'>Total Stock Amount</td>
                                    </tr>
                                    {
                                        reportData.map((item, i) => {
                                            count++;
                                            return (
                                                <>
                                                    <tr key={i}>
                                                        <td width="5%">{count}</td>
                                                        <td className='text-start' width='15%'>{item?.drug?.manufacturer}</td>
                                                        <td width='15%' className='text-start'>{item?.drug?.macrohealth_sg}</td>
                                                        <td width='5%' className='text-end'>{item?.drug?.expiry_date}</td>
                                                        <td width='5%' className='text-end'>{item?.stock}</td>
                                                        <td width='5%' className='text-end'>{num(item?.drug?.drug_price)}</td>
                                                        <td width='8%' className='text-end'>{(num(item?.stock) * (num(item?.drug?.drug_price) + num(item?.drug?.vat))).toFixed(2)}</td>
                                                    </tr>
                                                </>)
                                        }

                                        )
                                    }
                                    <tr>
                                        <td colSpan={6} className='text-end fw-bold'> Grand Total : </td>
                                        <td className='text-end'>{(reportData.reduce((total, current) => total + (num(current?.stock) * (parseFloat(current?.drug?.drug_price || 0) + parseFloat(current?.drug?.vat || 0))), 0)).toFixed(2)}</td>
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
