import { InventorySharp } from '@mui/icons-material';
import { SwipeableDrawer } from '@mui/material';
import React, { useState } from 'react';

const Drawer = () => {
    //drawer
    const [state, setState] = React.useState(false);

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
    const [allInvoice, setAllInvoice] = useState([
        {
            id: 1119, time: "04:39 PM", status: "Unpaid",
        },
        {
            id: 1119, time: "04:39 PM", status: "Unpaid",
        },
        {
            id: 1119, time: "04:39 PM", status: "Unpaid",
        },
        {
            id: 1119, time: "04:39 PM", status: "Unpaid",
        },
        {
            id: 1119, time: "04:39 PM", status: "Unpaid",
        },
    ])
    return (
        <div>
            <button className="text-sm mt-sm-2 border-[1px] border-[#69B128] rounded-full px-2  whitespace-nowrap" onClick={toggleDrawer(true)}>All Invoice</button>
            <SwipeableDrawer
                anchor={"right"}
                open={state}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <div style={{ width: "300px" }}>
                    <div>
                        <i style={{ fontSize: "18px", cursor: "pointer" }} onClick={toggleDrawer(false)} className="float-right fa fa-times m-2"></i>
                    </div>
                    <div className="all-invoice-container p-2">
                        <table>
                            <tr className='all-invoice-thead'>
                                <td>Invoice No.</td>
                                <td>Time</td>
                                <td>Status</td>
                            </tr>
                            {
                                allInvoice.map((inv) => <tr className='border-bottom'>
                                    <td>{inv.id}</td>
                                    <td>{inv.time}</td>
                                    <td>{inv.status}</td>
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