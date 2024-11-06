import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import http from '../../../http';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import MaterialTable from 'material-table';
import '../../../imageUrl';

function Banner() {

    const [countrylist, setCountryList] = useState([]);

    useEffect(() => {
        http.get(`/banner`).then(res => {
            console.log(res.data.data);
            if (res.status === 200) {
                setCountryList(res.data.data);
            }

        });

    }, []);

    const deleteCountry = (e, id) => {

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
                http.delete(`/banner/${id}`).then(res => {
                    if (res.data.status === 200) {
                        thisClicked.closest("tr").remove();
                    }
                });
                Swal.fire(
                    { position: 'top-center',
                     icon: 'success',
                     title: 'Deleted!',
                     text:'Your data has been deleted.',
                     timer: 2500}
 
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
            title: "Title", field: `title`,
            cellStyle: {
                textAlign: "center",
            }
        },
        {
            title: "Slug", field: `slug`,
            cellStyle: {
                textAlign: "center",
            }

        },
        
        {
            title: "Photo", field: `photo`, render: (row) =><div className='text-center'>{row.photo !== null ? <img src={`${global.img_url}/files/banner/${row.photo}`} width="70" alt="No Image" /> : <img src={`${global.img_url}/files/no_images.png`} width="70px" alt="No Image" />}</div>

        },
        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-banner/${row.id}`} class="btn btn-sm action-btn"><i class="far fa-edit"></i></Link>&nbsp;<button onClick={(e) => deleteCountry(e, row.id)} className="btn btn-sm action-btn"> <i class="far fa-trash"></i> </button></div>,
            cellStyle: {
                textAlign: "center",
            },
        },
    ];

    return (
        <div className="page-content" >
            {/* style={{ padding:'15px' }} */}
            {/* <nav className="page-breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Admin Setup</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Brand</li>
                    
                </ol>
            </nav> */}

            {/* <div className="card">
                <div className="card-body">
                <h6 className="card-title">Brand List
                <Link className="btn btn-sm btn-primary float-end"  to="/add-brand">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus mb-1"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    
                    
                     Add</Link>
                            
                            </h6>
                </div>
            </div> */}

            <div className="custom-card patients-head ">
                <h5 className="fw-normal custom_py-3 px-2  text-start mb-2 card-title">Banner List
                <Link className="btn btn-sm btn-primary float-end"  to="/add-banner">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus mb-1"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                     Add Banner</Link>
                </h5>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin">
                <div>
                        <div>
                            <MaterialTable
                                    columns={columns}
                                    data={countrylist}
                                    options={{
                                        search: true,
                                        showTitle: false,
                                        searchFieldAlignment: "left",
                                        pageSize: 10,
                                        emptyRowsWhenPaging:false,
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

export default Banner
















