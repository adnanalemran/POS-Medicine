import React, {useState} from 'react'
import {useEffect} from 'react';
import {Link} from 'react-router-dom'
import http from '../../../http';
import Swal from 'sweetalert2';
import MaterialTable from 'material-table';
import '../../../imageUrl';
import moment from "moment";
import AuthUser from "../../../Components/AuthUser";

function ManagerPurchaseOrder() {

    const [row_data_list, setRowDataList] = useState([]);
    const {user} = AuthUser();
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        http.get(`/purchase-order`).then(res => {
            setSpinner(false);
            console.log(res.data.data);
            if (res.status === 200) {
                setRowDataList(res.data.data);
            }
        });
    }, []);

    const deleteRowData = (e, id) => {

        e.preventDefault();
        const thisClicked = e.currentTarget;

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                http.delete(`/delete-purchase-order/${id}`).then(res => {
                    if (res.data.status === 200) {
                        thisClicked.closest("tr").remove();
                    }
                });
                Swal.fire(
                    {
                        position: 'top-center',
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'Your data has been deleted.',
                        timer: 2500
                    }
                )
            }
        })

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
            title: "Purchase Order No", field: `purchase_order_no`,
            cellStyle: {
                textAlign: "center",
            },
        },
        {
            title: "Requisition No", field: `requisition_no`,
            cellStyle: {
                textAlign: "center",
            },
        },
        {
            title: "P.O. Creator", field: `po_creator`,
            cellStyle: {
                textAlign: "center",
            },
        },
        {
            title: "Date", field: `po_create_date`, render:(row)=><div className='text-center'>{moment(row.po_create_date).format('DD-MM-YYYY')}</div>
        },
        {
            title: "Total Cost", field: `total_bill_amount`,
            cellStyle: {
                textAlign: "center",
            },
        },
        {
            title: "Status", field: `requisition_status`, render:(row)=> 
            <div className='text-center'>
                {
                    row.po_is_confirmed === 'yes'
                    ?
                    <span title='Confirmed by manager' className="btn-success-custom"><i className="fas fa-circle"></i> <span className="text-capitalize">PO Confirmed</span> </span>  
                    :
                        row.requisition_status === "PO_Created" 
                        ?
                        <span title='Pending for manager approval' className="btn-warning-custom"><i className="fas fa-circle"></i> <span className="text-capitalize">Pending PO</span> </span>
                        :
                        <span title='Others' className="btn-warning-custom"><i className="fas fa-circle"></i> <span className="text-capitalize">{row.requisition_status}</span> </span>

                }

                {/* {row.po_is_sent == "yes" && row.po_is_confirmed == null 
                ? 
                <span className="btn-warning-custom"><i className="fas fa-circle"></i> <span className="text-capitalize">Pending</span> </span> 
                : 
                    row.po_is_sent == "yes" && row.po_is_confirmed == "yes" 
                    ? 
                    <span className="btn-success-custom"><i className="fas fa-circle"></i> <span className="text-capitalize">Accepted</span> </span> 
                    : '' } */}
            </div>

            // title: "Status", field: `requisition_status`, render:(row)=> <div>{row.po_is_sent == "yes" && row.po_is_confirmed == null ? <span className="btn-warning-custom text-uppercase">Pending</span> : row.po_is_sent == "yes" && row.po_is_confirmed == "yes" ? <span className="btn-success-custom text-uppercase">Accepted</span> : '' }</div>
        },
        {
            title: "Action",
            field: "patient",
            render: (row) => <div>
                {/* <Link to={`${row.po_is_sent == "yes" && row.po_is_confirmed == 'yes' ? '/view-manager-purchase-order' : '/edit-manager-purchase-order' }/${row.id}`} data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" class="btn btn-sm action-btn">{row.po_is_sent == "yes" && row.po_is_confirmed == 'yes' ?
                    <i className="far fa-eye"></i>: <i className="far fa-edit"></i>}</Link>&nbsp; */}

                <Link to={`${ row.po_is_confirmed == 'yes' ? '/view-manager-purchase-order' : '/edit-manager-purchase-order' }/${row.id}`} 
                    data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" class="btn btn-sm action-btn">
                    {row.po_is_confirmed == 'yes' 
                    ? <i className="far fa-eye"></i>
                    : <i className="far fa-edit"></i>}
                </Link>&nbsp;

                {/*<Link to={`/edit-manager-requisition/${row.id}`} class="btn btn-sm action-btn"><i class="far fa-edit"></i></Link>&nbsp;*/}
                {
                    (row.requisition_status === 'PO_Created' || row.requisition_status === 'PO_Confirmed' )
                    ? ""
                    : <button onClick={(e) => deleteRowData(e, row.id)} className="btn btn-sm action-btn"><i class="far fa-trash"></i></button>
                }

            </div>,
            cellStyle: {
                textAlign: "center",
            },
        },
    ];

    return (
        <div className="page-content">
            <div className="custom-card patients-head ">
                <h5 className="fw-normal custom_py-3 px-2  text-start mb-2 card-title">Purchase Order List
                    <Link className="btn btn-sm btn-primary float-end" to="/add-purchase-order">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus mb-1">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Add Purchase Order</Link>
                </h5>
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
                                    search: true,
                                    showTitle: false,
                                    searchFieldAlignment: "left",
                                    pageSize: 10,
                                    emptyRowsWhenPaging: false,
                                    pageSizeOptions: [5, 10, 20, 50, 100]
                                }}

                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ManagerPurchaseOrder
















