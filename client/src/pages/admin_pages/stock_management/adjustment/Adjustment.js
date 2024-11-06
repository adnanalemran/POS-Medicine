import MaterialTable from 'material-table';
import React, { useEffect, useRef, useState } from 'react';
import { FiEdit } from "react-icons/fi";
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { MdDelete } from "react-icons/md";
import { ImPlus } from "react-icons/im";
import { useReactToPrint } from 'react-to-print';
import {Link, useNavigate} from "react-router-dom";
import AuthUser from '../../../../Components/AuthUser';
import Swal from 'sweetalert2';

const Adjustment = () => {
    const {user, http} = AuthUser();
    const [reload, setReload] = useState(false);

    const [rowData, setRowData] = useState([]);
    const navigate = useNavigate();
    const [spinner, setSpinner] = useState(true);

    useEffect(() =>{
        http.get('adjustment').then(res => {
            setSpinner(false);
            console.log('res all adjustment list', res);
            setRowData(res.data.data);
        })
    },[reload])

    const proceedToApproval = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to send these requisitions for approval!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, send it!'
        }).then((result) => {
            if (result.isConfirmed) {

                http.post(`/proceed-to-adjustment-copy/${id}`).then(res => {
                    setReload(!reload);
                    navigate(`/adjustment`);
                })
                Swal.fire(
                {
                    position: 'top-center',
                    icon: 'success',
                    title: 'Send!',
                    html: 'Your requisitions has been sent to manager.',
                    timer: 2500
                })
            }
        })
    }

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
                http.delete(`/delete-adjustment/${id}`).then(res => {
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

    const columnsData = [
        {
            title: "SL", field: "", render: (row) => <div>{row.tableData.id + 1}</div>,
            width: "20 !important",
            cellStyle: {
                textAlign: "center",
            },
        },
        {
            title: "Adjustment No.", field: `adjustment_no`,
                cellStyle: {
                whiteSpace: 'nowrap',
            },
        },
        {
            title: "Adjustment Date", field: `adjustment_date`,
                cellStyle: {
                whiteSpace: 'nowrap',
            },
        },
        {
            title: "Requested by", field: `requested_by`,
                cellStyle: {
                whiteSpace: 'nowrap',
            },
        },
        {
            title: "Phone No.", field: `phone_no`,
                cellStyle: {
                whiteSpace: 'nowrap',
            },
        },
        {
            title: "Email Address", field: `email_address`,
                cellStyle: {
                whiteSpace: 'nowrap',
            },
        },
        {
            title: "Status", field: `adjustment_status`, render:(row)=> 

            <div>
                {
                    row.adjustment_status === 'new' 
                    ?
                    <span title='new store in' className="btn-success-custom">
                        <i className="fas fa-circle"></i> 
                        <span className="ms-1 text-capitalize">New</span> 
                    </span>
                    :
                        row.adjustment_status === 'pending' 
                        ?
                        <span title='Request for manager approval' className="btn-danger-custom">
                            <i className="fas fa-circle"></i> 
                            <span className="ms-1 text-capitalize">Pending</span> 
                        </span>
                        : 
                        (row.adjustment_status === 'cancelled') 
                            ?
                            <span style={{color:'red'}} title='Cancelled by manager' className="btn-success-custom">
                                <i className="fas fa-circle"></i> 
                                <span  className="ms-1 text-capitalize">Cancelled</span> 
                            </span>
                            :
                            <span title='approved by manager' className="btn-success-custom">
                                <i className="fas fa-circle"></i> 
                                <span className="ms-1 text-capitalize">{row.adjustment_status}</span> 
                            </span>
                }
                
            </div>

        },
        {
            title: "Action",
            field: "patient",
            render: (row) => 
            <div>

                {
                    (row.adjustment_status !== 'pending' && row.adjustment_status !== 'approved' && row.adjustment_status !== 'cancelled') 
                    ?
                    <Link title='Edit store in' to={`/edit-adjustment/${row.id}`} class="btn btn-sm action-btn">
                        <i className="far fa-edit"></i>
                    </Link>
                    :
                    ""
                }
                
                {
                    row.adjustment_status !== 'new' 
                    ?
                    <Link title='View adjustment' to={`/view-adjustment/${row.id}`} class="btn btn-sm action-btn">
                        <i class="far fa-eye"></i>
                    </Link>
                    :
                    ""
                }

                {
                    (row.adjustment_status !== 'pending' && row.adjustment_status !== 'approved' && row.adjustment_status !== 'cancelled')
                    ?
                    <button 
                        type="button" 
                        title='Proceed To Approval'
                        onClick={() => proceedToApproval(row.id)} 
                        className="btn btn-sm action-btn me-2">
                        <i className="fas fa-paper-plane"></i>
                    </button>
                    :
                    ""
                }
               
                
                {
                    (row.adjustment_status !== 'pending' && row.adjustment_status !== 'approved' && row.adjustment_status !== 'cancelled')
                    ?
                    <button 
                        title='Delete Mrr' 
                        onClick={(e) => deleteRowData(e, row.id)} 
                        className="btn btn-sm action-btn">
                        <i class="far fa-trash"></i>
                    </button>
                    :
                    ""
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
                <h5 className="fw-normal custom_py-3 px-2  text-start mb-2 card-title">Adjustment
                    <Link className="btn btn-sm btn-primary float-end" to="/add-adjustment">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-plus mb-1">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Add Adjustment</Link>
                </h5>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin">
                    <div>
                        <div
                        >
                            <MaterialTable
                                title="Positioning Actions Column Preview"
                                columns={columnsData}
                                data={rowData}
                                isLoading= {spinner ? true : false}
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
                                    }
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
            </div>
        </div>

    );
};

export default Adjustment;