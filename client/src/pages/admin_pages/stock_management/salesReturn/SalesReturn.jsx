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

function SalesReturn() {

    const [row_data_list, setRowDataList] = useState([]);
    const [reload, setReload] = useState(false);
    const {user} = AuthUser();
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        http.get(`/sales-return-data`).then(res => {
            setSpinner(false);
            console.log("sales-return-data", res.data.data);
            if (res.status === 200) {
                setRowDataList(res.data.data);
            }
        })

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
                http.delete(`/delete-sales-return/${id}`).then(res => {
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

    const proceedToApproval = (id) => {
        const newForm = new FormData();
        newForm.append('user_id', user.id)

        Swal.fire({
            title: 'Are you sure?',
            text: "You want to send this Sales return for approval!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, send it!'
        }).then((result) => {
            if (result.isConfirmed) {

                http.post(`proceed-to-approval-sales-return-copy/${id}`, newForm).then(res => {
                    console.log("proceed to approval sales return", res);
                    if(res.status === 200){
                        setReload(!reload);
                        Swal.fire(
                            {
                                position: 'top-center',
                                icon: 'success',
                                title: 'Send!',
                                html: 'Your MRR has been sent to manager.',
                                timer: 2500
                            }
                        )
                    }
                })
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
            title: "P.O. No", field: `purchase_order_no`
        },
        {
            title: "Return Date", field: `return_date`
        },
        {
            title: "Return By", field: `return_by`
        },
        {
            title: "Reason", field: `reasons_of_return`
        },
        {
            title: "Total Amount", field: `total_amount`
        },
        {
            title: "Status", field: `sales_return_status`, render:(row)=> 

            <div>
                {
                    row.sales_return_status === 'new' 
                    ?
                    <span title='new store in' className="btn-success-custom">
                        <i className="fas fa-circle"></i> 
                        <span className="ms-1 text-capitalize">New</span> 
                    </span>
                    :
                        row.sales_return_status === 'pending' 
                        ?
                        <span title='Request for manager approval' className="btn-danger-custom">
                            <i className="fas fa-circle"></i> 
                            <span className="ms-1 text-capitalize">Pending</span> 
                        </span>
                        : 
                        (row.sales_return_status === 'cancelled') 
                            ?
                            <span style={{color:'red'}} title='Cancelled by manager' className="btn-success-custom">
                                <i className="fas fa-circle"></i> 
                                <span  className="ms-1 text-capitalize">Cancelled</span> 
                            </span>
                            :
                            <span title='approved by manager' className="btn-success-custom">
                                <i className="fas fa-circle"></i> 
                                <span className="ms-1 text-capitalize">{row.sales_return_status}</span> 
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
                    (row.sales_return_status !== 'pending' && row.sales_return_status !== 'approved' && row.sales_return_status !== 'cancelled') 
                    ?
                    <Link title='Edit store in' to={`/edit-sales-return/${row.id}`} class="btn btn-sm action-btn">
                        <i className="far fa-edit"></i>
                    </Link>
                    :
                    ""
                }
                
                {
                    row.sales_return_status !== 'new' 
                    ?
                    <Link title='View store in' to={`/view-sales-return/${row.id}`} class="btn btn-sm action-btn">
                        <i class="far fa-eye"></i>
                    </Link>
                    :
                    ""
                }

                {
                    (row.sales_return_status !== 'pending' && row.sales_return_status !== 'approved' && row.sales_return_status !== 'cancelled')
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
                    (row.sales_return_status !== 'pending' && row.sales_return_status !== 'approved' && row.sales_return_status !== 'cancelled')
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
                <h5 className="fw-normal custom_py-3 px-2  text-start mb-2 card-title">Sales Return
                    <Link className="btn btn-sm btn-primary float-end" to="/add-sales-return">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus mb-1">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Add Sales Return</Link>
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

export default SalesReturn;
















