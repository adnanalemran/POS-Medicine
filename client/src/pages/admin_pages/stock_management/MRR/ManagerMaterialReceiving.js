import React, {useState} from 'react'
import {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2';
import MaterialTable from 'material-table';
// import '../../../imageUrl';
import '../../../../imageUrl';
import moment from "moment";
import http from '../../../../http';
import AuthUser from '../../../../Components/AuthUser';

function ManagerMaterialReceiving() {

    const [row_data_list, setRowDataList] = useState([]);
    const {user} = AuthUser();
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        http.get(`/manager-material-receiving`).then(res => {
            setSpinner(false);
            console.log("manager-material-receiving", res);
            console.log(res.data.data);
            if (res.status === 200) {
                setRowDataList(res.data.data);
            }
        });
    }, [reload]);

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
                http.delete(`/delete-material-receiving/${id}`).then(res => {
                    // console.log("mrr delete res",res);
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
    

    const cancelByManager = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to cancel these requisitions!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, send it!'
        }).then((result) => {
            if (result.isConfirmed) {

                const formData = new FormData();
                formData.append('user_id',user.id);

                http.post(`/mrr-cancel-by-manager-copy/${id}`, formData).then(res => {
                    console.log(res);
                    console.log("row Delete", res);
                    setReload(!reload)

                })
                Swal.fire(
                    {
                        position: 'top-center',
                        icon: 'success',
                        title: 'Send!',
                        html: 'Requisition cancelled by manager.',
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
            title: "Purchase In No", field: `mrr_no`,
            cellStyle: {
                textAlign: "center",
            },
        },
        // {
        //     title: "P.O. Creator", field: `user.name`
        // },
        {
            title: "Delivery Date", field: `delivery_date`, render:(row)=><div className='text-center'>{moment(row.po_create_date).format('DD-MM-YYYY')}</div>
        },
        {
            title: "Total Cost", field: `total_bill_amount`,
            render:(row)=><div>{parseFloat(row.total_bill_amount || 0).toFixed(2)}</div>,
            cellStyle: {
                textAlign: "center",
            },
        },
        {
            title: "Contact No", field: `contact_no`,
            cellStyle: {
                textAlign: "center",
            },
        },
        {
            title: "Status", field: `requisition_status`, render:(row)=> 

            <div className='text-center'>
                {
                    (row.mrr_status === 'pending' )
                    ?
                    <span title='New MRR' className="btn-danger-custom">
                        <i className="fas fa-circle"></i> 
                        <span className="ms-1 text-capitalize">Pending</span> 
                    </span>
                    :
                        (row.mrr_status === 'cancelled') 
                        ?
                        <span style={{color:'red'}} title='Cancelled by manager' className="btn-success-custom">
                            <i className="fas fa-circle"></i> 
                            <span  className="ms-1 text-capitalize">Cancelled</span> 
                        </span>
                        :
                        <span title='Approval request' className="btn-success-custom">
                            <i className="fas fa-circle"></i> 
                            <span className="ms-1 text-capitalize">{row.mrr_status}</span> 
                        </span>
                     
                }
                
            </div>

        },
        {
            title: "Action",
            field: "patient",
            render: (row) => 
            <div className='text-center'>
                {
                    (row.mrr_status !== 'approved' && row.mrr_status !== 'cancelled' )
                    ?
                    <Link title='Edit Purchase In' to={`/edit-manager-material-receiving/${row.id}`} class="btn btn-sm action-btn">
                        <i className="far fa-edit"></i>
                    </Link>
                    : ""
                }
                
                
                {
                    (row.mrr_status !== 'pending'  )
                    ?
                    <Link title='View Purchase In' to={`/view-material-receiving/${row.id}`} class="btn btn-sm action-btn">
                        <i class="far fa-eye"></i>
                    </Link>
                    :
                    ""
                }

                
               {
                    (row.mrr_status !== 'approved' && row.mrr_status !== 'cancelled' )
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
                    (row.mrr_status !== 'pending' && row.mrr_status !== 'approved' && row.mrr_status !== 'cancelled' )
                    ?
                    <button 
                        title='Delete Purchase In' 
                        onClick={(e) => deleteRowData(e, row.id)} 
                        className="btn btn-sm action-btn">
                        <i class="far fa-trash"></i>
                    </button>
                    : ""

                }
                {
                    (row.mrr_status !== 'approved' && row.mrr_status !== 'cancelled' )
                    ?
                    <button 
                        type="button" 
                        onClick={() => cancelByManager(row.id)} 
                        title='Cancel' 
                        className="btn btn-sm action-btn me-2">
                        <i class="fas fa-times-circle"></i>
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



    const proceedToApproval = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to send this mrr for approval!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, send it!'
        }).then((result) => {
            if (result.isConfirmed) {

                const formData = new FormData();
                formData.append('user_id',user.id);

                http.post(`/mrr-proceed-to-approve-copy/${id}`, formData).then(res => {
                    console.log("proceed to approval mrr", res);
                    setReload(!reload)
                })
                Swal.fire(
                    {
                        position: 'top-center',
                        icon: 'success',
                        title: 'Send!',
                        html: 'Your requisitions has been sent to manager.',
                        timer: 2500
                    }
                )
            }
        })
    }

    return (
        <div className="page-content">
            <div className="custom-card patients-head ">
                <h5 className="fw-normal custom_py-3 px-2  text-start mb-2 card-title">Purchase In List
                    <Link className="btn btn-sm btn-primary float-end" to="/add-manager-material-receiving">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus mb-1">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Add Purchase In</Link>
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

export default ManagerMaterialReceiving;
















