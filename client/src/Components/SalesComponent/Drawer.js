
import { SwipeableDrawer } from '@mui/material';
import React, { useContext, useState } from 'react';
import { propsContext } from '../dashboard';
import Select from 'react-select'
import '../../CSS/Drawer.css'
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

const Drawer = ({ allInvoices, paidInvoices, unPaidInvoices }) => {
    //drawer
    const [state, setState] = React.useState(false);
    const { setInvoiceId, invoiceType, setinvoiceType, invoicePaidUnpaid, setInvoicePaidUnpaid } = useContext(propsContext);


    const handleIVInput = (e) => {
        setInvoiceId(e.id)
    }

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState(open);
    };

    // const [invoiceType, setinvoiceType] = useState('All');

    const handleChange = (e) => {
        setinvoiceType(e.target.value)

        e.target.value === 'All' &&
            setInvoicePaidUnpaid(allInvoices)

        e.target.value === 'Paid' &&
            setInvoicePaidUnpaid(paidInvoices)

        e.target.value === 'Unpaid' &&
            setInvoicePaidUnpaid(unPaidInvoices)
    }
    console.log(invoiceType)
    const formatResult = (item) => {
        return (
            <>
                <div
                    className={`row d-flex align-items-center search-format ${item.stock < 1 ? 'bg-red text-white' : ''
                        } `}
                >
                    <div className='col-12'>
                        <p>
                            {item?.invoice_no}
                        </p>
                    </div>
                    {/* <div className='col-3'>
                        <p>{item?.drug?.manufacturer}</p>
                    </div> */}
                </div>
            </>
        );
    };
const [searchInvoice, setSearchInvoice] = useState('');
    const medicineSelect = (item) => {
        setInvoiceId(item.id)
        setSearchInvoice('')
    };
    console.log(invoicePaidUnpaid ,"ddf" )
    return (
        <div>
            <button className="btn btn-primary btn-sm rounded px-2 mt-1 ms-4" onClick={toggleDrawer(true)}>All Invoices</button>
            <SwipeableDrawer
                anchor={"right"}
                open={state}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >



                <div style={{ width: "300px" }} className="overflow-hidden">

                    <div>
                        <i style={{ fontSize: "18px", cursor: "pointer" }} onClick={toggleDrawer(false)} className="float-right fa fa-times m-2"></i>
                    </div>

                    <div className='d-flex justify-content-center custom_button'>
                        <div class="btn-group btn-group-sm" role="group" aria-label="Basic radio toggle button group">

                            <input
                                value="All"
                                checked={invoiceType === 'All'}
                                onChange={handleChange}
                                type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" />
                            <label class="btn btn-outline-success" for="btnradio1">All</label>

                            <input
                                value="Paid"
                                checked={invoiceType === 'Paid'}
                                onChange={handleChange}
                                type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" />
                            <label class="btn btn-outline-success" for="btnradio2">Paid</label>

                            <input
                                value="Unpaid"
                                checked={invoiceType === 'Unpaid'}
                                onChange={handleChange}
                                type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" />
                            <label class="btn btn-outline-success" for="btnradio3">Unpaid</label>

                        </div>
                    </div>

                    <div className='d-flex justify-content-center mt-1'>
                        <div style={{ margin: '0 50px' }} className='w-100'>
                            <ReactSearchAutocomplete
                                showIcon={false}
                                placeholder={'Search Invoice'}
                                inputSearchString={searchInvoice || ''}
                                onSearch={(value) => setSearchInvoice(value)}
                                items={invoicePaidUnpaid}
                                resultStringKeyName='invoice_no'
                                maxResults={3}
                                onSelect={(item) => medicineSelect(item)}
                                autoFocus
                                fuseOptions={{ keys: ['invoice_no','member_phone'] }} // Search in the description text as well
                                styling={{
                                    borderRadius: '5px !important',
                                    zIndex: 0,
                                    minHeight: '36px',
                                    position: 'static',
                                    height: '36px',
                                    fontSize: '13px',
                                }}
                                formatResult={formatResult}
                            />
                        </div>
                    </div>

                    <div className="all-invoice-container p-2 h-75 overflow-auto">
                        <table className=''>
                            <tr className='all-invoice-thead  py-2'>
                                <td>Invoice No.</td>
                                {/* <td>Time</td> */}
                                <td>Status</td>
                            </tr>
                            {
                                invoiceType === 'All' &&
                                allInvoices.map((inv) => <tr className='border-bottom'>
                                    <td className='drawer_style' onClick={() => { setInvoiceId(inv.id) }}>{inv.invoice_no}</td>
                                    {/* <td>{inv.time}</td> */}
                                    <td>{inv.payment_status}</td>
                                </tr>)
                            }

                            {
                                invoiceType === 'Paid' &&
                                paidInvoices.map((inv) => <tr className='border-bottom'>
                                    <td className='drawer_style' onClick={() => { setInvoiceId(inv.id) }}>{inv.invoice_no}</td>
                                    {/* <td>{inv.time}</td> */}
                                    <td>{inv.payment_status}</td>
                                </tr>)
                            }

                            {
                                invoiceType === 'Unpaid' &&
                                unPaidInvoices.map((inv) => <tr className='border-bottom'>
                                    <td className='drawer_style' onClick={() => { setInvoiceId(inv.id) }}>{inv.invoice_no}</td>
                                    {/* <td>{inv.time}</td> */}
                                    <td>{inv.payment_status}</td>
                                </tr>)
                            }
                        </table>
                    </div>
                </div>


            </SwipeableDrawer>
        </div>
    );
};

export default Drawer;