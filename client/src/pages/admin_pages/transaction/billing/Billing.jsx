import Select from 'react-select'
import React, { useState, useRef } from 'react';
import { useReactToPrint } from "react-to-print";
import { InputAdornment, TextField } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import "./Billing.css";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import moment from "moment";
import women from '../../../../front_assets/images/women.jpg';
import img_logo from '../../../../front_assets/images/img_logo.png';
import product_scaner from '../../../../front_assets/images/product_scaner.png';
import MaterialTable from 'material-table';


const Billing = () => {
    const manufacturer = [
        { name: 'chocolate', label: 'Chocolate' },
        { name: 'strawberry', label: 'Strawberry' },
        { name: 'vanilla', label: 'Vanilla' }
    ];
    const [orderList, setOrderList] = useState([
        {
            id: 1,
            btn_name: "Order Received",
            classes: "btn__order__received",
            customer_name: "Randy Orton",
            order_no: "129644",
            price: "$ 180.00"
        },
        {
            id: 2,
            btn_name: "Order Arrived",
            classes: "btn__order__arrived",
            customer_name: "Randy Orton",
            order_no: "129644",
            price: "$ 180.00"
        },
        {
            id: 3,
            btn_name: "Order Delivered",
            classes: "btn__order__deliverd",
            customer_name: "Randy Orton",
            order_no: "129644",
            price: "$ 180.00"
        },
        {
            id: 4,
            btn_name: "Order Canceled",
            classes: "btn__order__canceled",
            customer_name: "Randy Orton",
            order_no: "129644",
            price: "$ 180.00"
        },
    ]);

    const row_data_list = [
        { id: 1, item_code: "30483458", name: "ggsg", qty: 10, unit: "Pcs", discount: "55%", amount: "$ 888", total: "100tk", reorder: "10pc", },
        { id: 2, item_code: "30483458", name: "ggsg", qty: 10, unit: "Pcs", discount: "55%", amount: "$ 888", total: "100tk", reorder: "10pc", },
    ];
    const columnsData = [
        {
            title: "SL", field: "", render: (row) => <div>{row.tableData.id + 1}</div>,
            width: "20 !important",
        },
        {
            title: "Item code", field: `item_code`,
        },
        {
            title: "Name", field: `name`,
        },
        {
            title: "Qty", field: `qty`,
        },
        {
            title: "Unit", field: `unit`,
        },
        {
            title: "Discount", field: `discount`,
        },
        {
            title: "Amount", field: `amount`,
        },
        {
            title: "Total", field: `total`,
        },
        // {
        //     title: "Status", field: `requisition_status`, render:(row)=> <div>{row.po_is_sent == "yes" && row.po_is_confirmed == null ? <span className="btn-warning-custom"><i className="fas fa-circle"></i> <span className="text-capitalize">Pending</span> </span> : row.po_is_sent == "yes" && row.po_is_confirmed == "yes" ? <span className="btn-success-custom"><i className="fas fa-circle"></i> <span className="text-capitalize">Accepted</span> </span> : '' }</div>
        // },
        {
            title: "Action",
            render: (rowData) => <div>
                {/* <Link to={`${row.po_is_sent == "yes" || row.po_is_confirmed == "yes" ? '/view-sales-purchase-order' : '/view-purchase-order' }/${row.id}`} data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" class="btn btn-sm action-btn">{row.po_is_sent == "yes" || row.po_is_confirmed == "yes" ?
                    <i className="far fa-eye"></i>: <i className="far fa-edit"></i> }</Link>&nbsp; */}
                <Link to={`/edit-billing/${rowData.id}`} className="btn btn-sm action-btn"><i className="far fa-edit"></i></Link>
                {/*<Link to={`/edit-manager-requisition/${row.id}`} class="btn btn-sm action-btn"><i class="far fa-edit"></i></Link>&nbsp;*/}
                {/* <button onClick={(e) => deleteRowData(e, row.id)} className="btn btn-sm action-btn"><i class="far fa-trash"></i></button> */}
                <button className="btn btn-sm action-btn"><i class="far fa-trash"></i></button>
            </div>,
            // cellStyle: {
            //     textAlign: "center",
            // },
        },
    ];

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });



    return (
        <div className="page-content" >
            <div className="custom-card patients-head">
                <h5 className="fw-normal custom_py-3 px-2  text-start mb-2 card-title">E-commerce Customer Billing</h5>
            </div>
            <div className="row g-2 billing__card">
                <div className="col-lg-4 col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col-sm-12">
                                    <Select
                                        options={manufacturer}
                                        // onChange={handleMNInput}
                                        placeholder={'All Bills'}
                                        getOptionLabel={(manufacturer) => `${manufacturer.name}`}
                                        getOptionValue={(manufacturer) => `${manufacturer.name}`}
                                    />
                                </div>
                            </div>
                            <div className="row g-2">
                                <div className="col-6 search__bill">
                                    <TextField
                                        id="input-with-icon-textfield"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="standard"
                                    />
                                </div>
                                <div className="col-2 search__bill">
                                    <Link className="btn btn__sm__filter" to="#">
                                        {/* <FilterAltIcon/> */}
                                        <i class="far fa-filter"></i>
                                    </Link>
                                </div>
                                <div className="col-4 search__bill">
                                    <Link className="btn btn__sm" to="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-plus mb-1">
                                            <line x1="12" y1="5" x2="12" y2="19"></line>
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                        </svg>
                                        Send a Bill
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-lg-8 col-md-8">
                    <div className="card">
                        <div className="row g-0">
                            <div className="col-md-2">
                                <div className="billing__img text-center pt-2">
                                    <img src={women} className="img-fluid" alt="..." />
                                </div>
                            </div>
                            <div className="col-md-10">
                                <div className="card-body">
                                    <div className="d-flex">
                                        <label className="col-sm-2 pt-1">Customer Name</label>
                                        <label className=" pt-1"><span> :</span> Randy Carder</label>
                                    </div>
                                    <div className="d-flex">
                                        <label className="col-sm-2 pt-1">Address</label>
                                        <label className=" pt-1"><span> :</span> 3, Dhakeshwhari road, Lalbagh, Dhaka</label>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex">
                                            <label className="pt-1">Contact Number</label>
                                            <label className="pt-1"><span> :</span> 06894586586</label>
                                        </div>
                                        <label className="float-end pt-1"><span >Paid on :  {moment().format('DD-MM-YYYY')} </span></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="row g-2 pt-2 billing__card">
                <div className="col-lg-4 col-md-4">
                    <div className="card">
                        {
                            orderList.length > 0 && orderList.map((item, id) => {
                                return (
                                    <>
                                        <div key={id} className="card-body">
                                            <div className="d-flex justify-content-between search__bill">
                                                <button className={`btn ${item.classes}`} to="#">
                                                    {item.btn_name}
                                                </button>
                                                <label className="pt-1">{item.price}</label>
                                            </div>
                                            <div className="d-flex pt-2">
                                                <label className="col-sm-4 pt-1">Customer Name</label>
                                                <label className="pt-1"><span> :</span> {item.customer_name}</label>
                                            </div>
                                            <div className="d-flex">
                                                <label className="col-sm-4 pt-1">Order Number</label>
                                                <label className="pt-1"><span> :</span> {item.order_no}</label>
                                            </div>
                                        </div>
                                        <hr className="hr__order" />
                                    </>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="col-lg-8 col-md-8">
                    <div className="card">
                        <div className="row pt-3 product__list">
                            <div className="col-md-12 mb-3">
                                <div className="row g-0">
                                    <div className="col-md-12">
                                        <div className="card-body">
                                            <h5 className="text-center mb-2">Product List</h5>
                                            <div className="d-flex justify-content-between">
                                                <div className="product__Logo__img text-center pt-2">
                                                    <img src={img_logo} className="img-fluid" alt="images" />
                                                </div>
                                                <div className="product__scaner__img text-center pt-2">
                                                    <img src={product_scaner} className="img-fluid" alt="images" />
                                                </div>
                                                <div className="d-flex">
                                                    <label className="pt-1">Bill No</label>
                                                    <label className="pt-1"><span> :</span> 06894586586</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 pe-md-4">
                                <Link className="btn btn__sm float-end" to="/add-product-details">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-plus mb-1">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    Add Product Details</Link>
                            </div>
                            <div className="col-md-12 grid-margin">
                                <div>
                                    <div
                                    // ref={detailsPrint}
                                    >
                                        <MaterialTable
                                            title="Positioning Actions Column Preview"
                                            columns={columnsData}
                                            // data={rowData}
                                            data={row_data_list}
                                            options={{
                                                search: true,
                                                showTitle: false,
                                                searchFieldAlignment: "left",
                                                pageSize: 10,
                                                emptyRowsWhenPaging: false,
                                                pageSizeOptions: [5, 10, 20, 50, 100],
                                                rowStyle: {
                                                    fontSize: '.75rem',
                                                    textAlign: 'center',
                                                },
                                                headerStyle: {
                                                    fontSize: '.75rem',
                                                    border: '1px solid #c9c9c9',
                                                    textAlign: 'center',
                                                    zIndex: '0',
                                                    whiteSpace: 'nowrap',
                                                },
                                                cellStyle: {
                                                    textAlign: "center",
                                                },
                                            }
                                            }
                                        // options={{
                                        //     actionsColumnIndex: -1,
                                        //     selection: true,
                                        //     showTitle: false,
                                        //     searchFieldAlignment: "left",
                                        // }},

                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 mb-3">
                                <div className="p-2">
                                    <h6>Notes:</h6>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit, lacinia nulla sed ornare turpis. Neque sem potenti nisi,
                                        quisque nam donec id faucibus. Id enim cras tellus in. Tortor a vel velit ac nunc, consectetur.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* print component section start  */}
                        <div className="card card__print" ref={componentRef}>
                            <div className="row g-0">
                                <div className="col-md-2">
                                    <div className="billing__img text-center pt-2">
                                        <img src={women} className="img-fluid" alt="..." />
                                    </div>
                                </div>
                                <div className="col-md-10">
                                    <div className="card-body">
                                        <div className="d-flex">
                                            <label className="col-sm-2 pt-1">Customer Name</label>
                                            <label className=" pt-1"><span> :</span> Randy Carder</label>
                                        </div>
                                        <div className="d-flex">
                                            <label className="col-sm-2 pt-1">Address</label>
                                            <label className=" pt-1"><span> :</span> 3, Dhakeshwhari road, Lalbagh, Dhaka</label>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex">
                                                <label className="pt-1">Contact Number</label>
                                                <label className="pt-1"><span> :</span> 06894586586</label>
                                            </div>
                                            <label className="float-end pt-1"><span >Paid on :  {moment().format('DD-MM-YYYY')} </span></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row px-4 pt-2">
                                <div className="col-md-12">
                                    <div>
                                        <table className="table table-bordered border-secandary w-100 ">
                                            <tbody>
                                                <tr>
                                                    <td>SL</td>
                                                    <td>Item code</td>
                                                    <td>Name</td>
                                                    <td>Qty</td>
                                                    <td>Unit</td>
                                                    <td>Discount</td>
                                                    <td>Amount</td>
                                                    <td>Total</td>
                                                </tr>
                                                <tr>
                                                    <td>1</td>
                                                    <td>34546565</td>
                                                    <td>sgdfhhg</td>
                                                    <td>12</td>
                                                    <td>Pcs</td>
                                                    <td>50%</td>
                                                    <td>88 tk</td>
                                                    <td>100 tk</td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>56567</td>
                                                    <td>ggh</td>
                                                    <td>52</td>
                                                    <td>Pcs</td>
                                                    <td>40%</td>
                                                    <td>556 tk</td>
                                                    <td>1060 tk</td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="row ps-3 pt-3">
                                <div className="col-md-12">
                                    <h6>Notes:</h6>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit, lacinia nulla sed ornare turpis. Neque sem potenti nisi,
                                        quisque nam donec id faucibus. Id enim cras tellus in. Tortor a vel velit ac nunc, consectetur.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* print component section end  */}

                        
                        <div className="row product__list">
                            <div className="col-md-12 mb-3 pt-2">
                                <div className="d-flex justify-content-end">
                                    <button
                                        // onClick={handlePrintAllStickers} 
                                        className="btn btn__pro">Save</button>
                                    <button
                                        // onClick={handlePrintAllStickers} 
                                        className="mx-2 btn btn__pro">Share</button>
                                    <button
                                        onClick={handlePrint}
                                        className="mx-2 btn btn__pro">Print</button>
                                    <button
                                        // onClick={handlePrintAllStickers} 
                                        className="mx-2 btn btn__view__pdf">View PDF</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Billing;