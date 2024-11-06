import MaterialTable from 'material-table';
import React, { useRef } from 'react';
import { FiEdit } from "react-icons/fi";
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { MdDelete } from "react-icons/md";
import { ImPlus } from "react-icons/im";
import { useReactToPrint } from 'react-to-print';
import {Link} from "react-router-dom";

const CurrentStock = () => {

    const detailsPrint = useRef();
    const handlePrintAllStickers = useReactToPrint({
        content: () => detailsPrint.current,
    });

    const columnsData = [
        { title: 'Item Code', field: 'itemCode' },
        { title: 'Name', field: 'name' },
        { title: 'Brand', field: 'brand' },
        { title: 'Mf', field: 'mf' },
        { title: 'Category', field: 'category' },
        { title: 'Batch', field: 'batch' },
        { title: 'Box Type', field: 'boxType' },
        { title: 'Pkt Size', field: 'pktSize' },
        { title: 'No of Box', field: 'noOfBox' },
        { title: 'No of pkt', field: 'noOfPkt' },
        { title: 'Qty', field: 'qty' },
        { title: 'Unit ', field: 'unit' },
        { title: 'Total', field: 'total' },
        {
            title: 'Reorder ',
            field: 'reorder',
            cellStyle: {
                backgroundColor: 'red',
                color: '#FFF'
            },
            headerStyle: {
                backgroundColor: 'red',
                color: '#FFF'
            }
        },
        {
            title: 'Action', field: 'action', render: (row) => <div><Link to={`/edit-brand/${row.id}`} class="btn btn-sm action-btn"><i
                className="far fa-edit"></i></Link>&nbsp;
                <button  className="btn btn-sm action-btn"><i className="far fa-trash"></i></button>
            </div>
        },
    ]

    const rowData = [
        {
            id: 1,
            itemCode: 'jc-001',
            name: 'Napa650mg',
            brand: 'Incepta',
            mf: 'Square',
            category: 'Pharma',
            batch: '1',
            boxType: 'Leaf 1/10',
            pktSize: '10 x 12',
            noOfBox: '1',
            noOfPkt: '10',
            qty: '10',
            unit: 'Pcs',
            total: '100TK',
            reorder: '10 - LIST'
        },
        {
            id: 1,
            itemCode: 'jc-001',
            name: 'Napa650mg',
            brand: 'Incepta',
            mf: 'Square',
            category: 'Pharma',
            batch: '1',
            boxType: 'Leaf 1/10',
            pktSize: '10 x 12',
            noOfBox: '1',
            noOfPkt: '10',
            qty: '10',
            unit: 'Pcs',
            total: '100TK',
            reorder: '10 - LIST'
        },
        {
            id: 1,
            itemCode: 'jc-001',
            name: 'Napa650mg',
            brand: 'Incepta',
            mf: 'Square',
            category: 'Pharma',
            batch: '1',
            boxType: 'Leaf 1/10',
            pktSize: '10 x 12',
            noOfBox: '1',
            noOfPkt: '10',
            qty: '10',
            unit: 'Pcs',
            total: '100TK',
            reorder: '10 - LIST'
        },
        {
            id: 1,
            itemCode: 'jc-001',
            name: 'Napa650mg',
            brand: 'Incepta',
            mf: 'Square',
            category: 'Pharma',
            batch: '1',
            boxType: 'Leaf 1/10',
            pktSize: '10 x 12',
            noOfBox: '1',
            noOfPkt: '10',
            qty: '10',
            unit: 'Pcs',
            total: '100TK',
            reorder: '10 - LIST'
        },
        {
            id: 1,
            itemCode: 'jc-001',
            name: 'Napa650mg',
            brand: 'Incepta',
            mf: 'Square',
            category: 'Pharma',
            batch: '1',
            boxType: 'Leaf 1/10',
            pktSize: '10 x 12',
            noOfBox: '1',
            noOfPkt: '10',
            qty: '10',
            unit: 'Pcs',
            total: '100TK',
            reorder: '10 - LIST'
        },
        {
            id: 1,
            itemCode: 'jc-001',
            name: 'Napa650mg',
            brand: 'Incepta',
            mf: 'Square',
            category: 'Pharma',
            batch: '1',
            boxType: 'Leaf 1/10',
            pktSize: '10 x 12',
            noOfBox: '1',
            noOfPkt: '10',
            qty: '10',
            unit: 'Pcs',
            total: '100TK',
            reorder: '10 - LIST'
        },
        {
            id: 1,
            itemCode: 'jc-001',
            name: 'Napa650mg',
            brand: 'Incepta',
            mf: 'Square',
            category: 'Pharma',
            batch: '1',
            boxType: 'Leaf 1/10',
            pktSize: '10 x 12',
            noOfBox: '1',
            noOfPkt: '10',
            qty: '10',
            unit: 'Pcs',
            total: '100TK',
            reorder: '10 - LIST'
        },
        {
            id: 1,
            itemCode: 'jc-001',
            name: 'Napa650mg',
            brand: 'Incepta',
            mf: 'Square',
            category: 'Pharma',
            batch: '1',
            boxType: 'Leaf 1/10',
            pktSize: '10 x 12',
            noOfBox: '1',
            noOfPkt: '10',
            qty: '10',
            unit: 'Pcs',
            total: '100TK',
            reorder: '10 - LIST'
        },
    ]

    return (


        <div className="page-content">
            <div className="custom-card patients-head ">
                <h5 className="fw-normal custom_py-3 px-2  text-start mb-2 card-title">Current Stock List
                    <Link className="btn btn-sm btn-primary float-end" to="/add-brand">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-plus mb-1">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Add Current Stock</Link>
                </h5>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin">
                    <div>
                        <div ref={detailsPrint}>
                            <MaterialTable
                                title="Positioning Actions Column Preview"
                                columns={columnsData}
                                data={rowData}
                                options={{
                                    actionsColumnIndex: -1,
                                    selection: true,
                                    showTitle: false,
                                    searchFieldAlignment: "left",

                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="float-end">
                        <button onClick={handlePrintAllStickers} className="btn btn-sm btn-info">Export</button>
                        <button onClick={handlePrintAllStickers} className="mx-2 btn btn-sm btn-info">Print</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CurrentStock;