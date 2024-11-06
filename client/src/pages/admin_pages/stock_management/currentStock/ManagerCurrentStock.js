import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import http from '../../../../http';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import MaterialTable from 'material-table';
import '../../../../imageUrl';
import moment from "moment";
// import AuthUser from "../../../../Components/AuthUser";
import cartImage from '../../../../front_assets/images/shopping_cart.png'
import AuthUser from '../../../../Components/AuthUser';
import { useContext } from 'react';
import { memberContext } from '../../../../navbar/auth';
import './CurrentStock.css';
// import Select from 'react-select/dist/declarations/src/Select';
import Select from 'react-select'

const ManagerCurrentStock = () => {
    const {user, http} = AuthUser();
    const navigate = useNavigate();

    const [row_data_list, setRowDataList] = useState([]);
    const [load, setLoad] = useState(false);
    const [data, setData] = useState([]);
    const {cart,setCart} = useContext(memberContext);

    const [spinner, setSpinner] = useState(true);
    // newStock

    useEffect(() => {
        http.get(`/current-stock`).then(res => {
            setSpinner(false);

            if (res.status === 200) {
                // console.log(res);
                // setRowDataList(res.data.current_stock);
                // setData(res.data.current_stock);
                res.data.current_stock.map(item => {
                    let s_in = 0;
                    let s_box = 0;

                    let s_return = 0;
                    let s_return_box = 0;

                    let adj = 0;
                    let adj_box = 0;

                    let totalStockReport = 0;
                    let totalStockReport_box = 0.0;

                    item.store_in.map(i => {
                        s_in = s_in + parseInt(i.total_qty);
                        s_box = s_box + parseFloat(i.no_of_box);
                    })
                    totalStockReport = totalStockReport + s_in;
                    totalStockReport_box = totalStockReport_box + s_box;
                    item.newStock = s_in;
                    item.newStockBox = s_box;


                    item.sales_return.map(i => {
                        s_return = s_return + parseInt(i.pcs);
                        s_return_box = s_return_box + parseFloat(i.noOfBox);
                    })
                    totalStockReport = totalStockReport - s_return;
                    totalStockReport_box = totalStockReport_box - s_return_box;
                    item.newSalesReturn = s_return;
                    item.newSalesReturnBox = s_return_box;


                    item.adjustment.map(i => {
                        adj = adj + parseInt(i.decrease) + parseInt(i.increase);
                        adj_box = adj_box + parseFloat(i.decrease) + parseFloat(i.increase);
                    })
                    totalStockReport = totalStockReport + adj;
                    totalStockReport_box = totalStockReport_box + adj;
                    item.newAdjustment = adj;
                    item.newAdjustmentBox = adj_box;

                    item.totalStockReport = totalStockReport;
                    item.totalStockReportBox = totalStockReport_box;

                    
                })
                console.log(res);
                setRowDataList(res.data.current_stock);
                setData(res.data.current_stock);
            }
        });

    }, [load]);

    const handleFilter = (e) =>{
        console.log(e.target.value);

        if(parseInt(e.target.value) === 1){
            console.log(e.target.value);
            setRowDataList(data);
        }
        else if(parseInt(e.target.value) === 2){
            console.log('re-order', e.target.value);
            const available_stock = data.filter(d => (d.totalStockReport && d.totalStockReport > 0));
            console.log(available_stock);
            setRowDataList(available_stock);
        }
        else if(parseInt(e.target.value) === 3){
            console.log(e.target.value);
        }
        else if(parseInt(e.target.value) === 4){
            console.log(e.target.value);
        }
        else if(parseInt(e.target.value) === 5){
            console.log(e.target.value);
        }
        else if(parseInt(e.target.value) === 6){
            console.log('re-order', e.target.value);
            const reOrder = data.filter(d => (d.totalStockReport < d.qty && d.totalStockReport > 0));
            console.log(reOrder);
            setRowDataList(reOrder);
        }
    }
    
    const [years, setYears] = useState([]);
    useEffect(() => {
        let temp = 1;
        let arr = [];
        for(let i = 2001; i <= 2020; i++){
            arr.push({id:temp, name:i});
            temp++;
        }
        setYears(arr);
    },[])
    
    const [selectedYear, setSelectedYear] = useState();
    const handleYears = (e) =>{
        setSelectedYear(e.name)
    }

    const [selectedMonth, setSelectedMonth] = useState();
    const handleMonth = (e) =>{
        console.log(e.target.value);
        // setSelectedMonth(e.name)
    }

    
    const columns = [
        {
            title: "SL", field: "", render: (row) => <div>{row.tableData.id + 1}</div>,
            width: "20 !important",
            cellStyle: {
                textAlign: "center",
            },
        },
        {
            title: "Item code", field: `drug_code`,
                cellStyle: {
                whiteSpace: 'nowrap',
            },
        },
        {
            title: "Name", field: `drug_name`,
                cellStyle: {
                whiteSpace: 'nowrap',
            },
        },
        {
            title: "Brand-id", field: `brand_id`,
                cellStyle: {
                whiteSpace: 'nowrap',
            },
        },
        // {
        //     title: "Mf", field: `mf`,
        //         cellStyle: {
        //         whiteSpace: 'nowrap',
        //     },
        // },
        {
            title: "Category",  render:(row) => 
            <p>{row.category.title}</p>,
            cellStyle: {
            whiteSpace: 'nowrap',
            },
        },
        {
            title: "Batch", field: `batch`,
                cellStyle: {
                whiteSpace: 'nowrap',
            },
        },
        {
            title: "Box Type", field: `boxType`,
                cellStyle: {
                whiteSpace: 'nowrap',
            },
        },
        {
            title: "Pkt Size", field: `pktSize`,
                cellStyle: {
                whiteSpace: 'nowrap',
            },
        },
        {
            title: "No of Box",  render:(row) => 
            <p>{row.totalStockReportBox === null ? 0 : row.totalStockReportBox}</p>,

            cellStyle: {
            whiteSpace: 'nowrap',
            },
        },

        {
            title: "Store In",  render:(row) => 
            <p>{row.newStock}</p>,

            cellStyle: {
            whiteSpace: 'nowrap',
            },
        },
        {
            title: "Sales Return",  render:(row) => 
            <p>{row.newSalesReturn}</p>,

            cellStyle: {
            whiteSpace: 'nowrap',
            },
        },
        {
            title: "Adjustment",  render:(row) => 
            <p>{row.newAdjustment}</p>,

            cellStyle: {
            whiteSpace: 'nowrap',
            },
        },

        {
            title: "Stock", render:(row) => 
                <p>{row.totalStockReport}</p>,

                cellStyle: {
                whiteSpace: 'nowrap',
            },
        },
        {
            title: "Qty", field: `qty`,
                cellStyle: {
                whiteSpace: 'nowrap',
            },
        },
        {
            title: "Unit", field: `unit`,
                cellStyle: {
                whiteSpace: 'nowrap',
            },
        },
        {
            title: "Reorder", render:(row) => 
            <div style={{backgroundColor: `${row.totalStockReport < row.qty ? 'red' : '#e9ecef'}`,
                color: `${row.totalStockReport < row.qty ? 'white' : 'black'}` ,
                border:'none', 
                width:'65px' ,
                margin:'auto'}}>
                <p style={{padding:'5px', fontWeight:'bold', textAlign:'center'}}>{row.totalStockReport === null ? 0 : row.totalStockReport}</p>
            </div>
            ,
                cellStyle: {
                whiteSpace: 'nowrap',
            },
        },
        {
            title: "Action",
            render: (rowData) => 
            <div>
                <button className="btn btn-sm action-btn"><i class="fas fa-plus me-2"></i></button>
                <Link to={`/edit-current-stock-m/${rowData.id}`} className="btn btn-sm action-btn me-2"><i className="far fa-edit"></i></Link>
                <button className="btn btn-sm action-btn"><i class="far fa-trash"></i></button>
            </div>,
                cellStyle: {
                textAlign: "center",
            },
        },
    ];


    return (
        <div className="page-content">

            <div className="custom-card patients-head ">
                <h5 className="fw-normal custom_py-3 px-2 text-start mb-2 card-title"> Current Stock </h5>
            </div>


            <div className="custom-card patients-head mb-2 p-2">
                <div class="row gx-3">
                    <div class="col-3">
                        <select 
                            onChange={(e) => handleFilter(e)}
                            style={{width:'110px'}} class="form-select form-select-sm" aria-label=".form-select-sm example">
                            {/* <option selected disabled>Filter</option> */}
                            <option value="1" selected>All</option>
                            {/* <option value="2">Name</option> */}
                            <option value="2">Available</option>
                            {/* <option value="3">ID No.</option> */}
                            {/* <option value="4">Brand</option> */}
                            {/* <option value="5">Manufacture</option> */}
                            <option value="6" name='reorder'>Reorder</option>
                        </select>
                    </div>
                    <div class="col-1">
                        <div class="p-1 border bg-light">Summerize</div>
                    </div>
                    <div class="col">
                        <input 
                        onChange={(e) => handleMonth(e)}
                        style={{border:'1px solid #E9ECEF'}} 
                        type="month" class="form-control-sm" 
                        aria-label="Username" 
                        />
                    </div>

                    <div className="col">
                        <div className="row">
                            <div className="col-sm-7">
                                <Select
                                    options={years}
                                    onChange={(e) => handleYears(e)}
                                    placeholder={'Year'}
                                    getOptionLabel={(years) => `${years.name}`}
                                    getOptionValue={(years) => `${years.id}`}
                                />
                            </div>
                        </div>
                    </div>

                    <div class="col-2">
                        <button style={{background:'#69b128', color:'white'}} type="button" class="btn btn-sm mt-1" onClick={() => navigate('/re-order-requisition')}>Add To Requisition</button>
                    </div>
                    {/* <div class="col">
                        <button style={{background:'#69b128', color:'white'}} type="button" class="btn btn-sm mt-1" onClick={() => setLoad(!load)}>Clear</button>
                    </div> */}
                   
                    <div class="col-1">
                        <div style={{position:'relative'}}>
                            {
                                cart.length > 0 
                                // selectedItem.length > 0
                                ?
                                <span style={{position:'absolute', background:'#69b128', color:'white', right:"49px", top:'-8px'}} className="px-1 py-0 rounded-circle">{cart.length}</span>
                                :
                                ""
                            }
                            <img style={{width:'30px'}} src={cartImage} alt="" srcset="" />
                        </div>
                    </div>
                </div>
            </div>

            
            
            <div className="row">
            <div className="col-md-12 grid-margin">
                <div>
                    <div>
                        <MaterialTable
                            columns={columns}
                            data={row_data_list}
                            isLoading= {spinner ? true : false}
                            options={{
                                selection: true,
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
                                }
                            }}
                            onSelectionChange={(rows) => setCart(rows)}
                        />
                    </div>
                </div>
            </div>
        </div>
            
            
        </div>

    )
}

export default ManagerCurrentStock;
















