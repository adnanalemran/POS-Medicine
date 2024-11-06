
import MaterialTable from 'material-table'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import http from '../../../http';

export default function AdjustmentType() {
    const addAdjustment = () => {
        setIsOpen(true);
    }
    const deleteRowData = (id) => {
       Swal.fire({
           title: 'Are you sure?',
           text: "You won't be able to revert this!",
           icon: 'warning',
           showCancelButton: true,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'Yes, delete it!'
       })
       .then((result) => {
           if (result.isConfirmed) {
               http.delete(`adjustment-type/${id}`)
                   .then((res) => {
                       setUpdate(!update);
                       setIsOpen(false);
                       Swal.fire({
                           position: 'top-center',
                           icon: 'success',
                           title: 'Success !',
                           text: 'Adjustment Deleted Successfully',
                           showConfirmButton: false,
                           timer: 1500
                       })
                   })
           }
       })
    }
    const editData = (id) => {
        http.get(`adjustment-type/${id}`)
            .then((res) => {
                setAdjustmentData(res.data);
                setIsOpen(true);
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const columns = [
        {
            title: "SL",
            field: "",
            render: (row) => <div>{row.tableData.id + 1}</div>,
            width: "20 !important",
            cellStyle: {
                textAlign: "center",
            },
        },

        {
            title: " Name",
            field: `name`,
            cellStyle: {
                textAlign: "center",
            },
        },


        {
            title: "Action",
            field: "patient",
            render: (row) => (
                <div>
                    <button
                        onClick={() => editData(row.id)}
                        className="btn btn-sm action-btn"
                    >
                        <i className="far fa-edit"></i>
                    </button>
                    &nbsp;
                    <button
                        onClick={() => deleteRowData(row.id)}
                        className="btn btn-sm action-btn"
                    >
                        <i className="far fa-trash"></i>
                    </button>
                </div>
            ),
            cellStyle: {
                textAlign: "center",
            },
        },
    ];
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState(false);
    const [spinner, setSpinner] = useState(false);
    useEffect(() => {
        const controller = new AbortController();
        setSpinner(true);
        http
            .get(`adjustment-type`)
            .then((res) => {
                setData(res.data)
                setSpinner(false);
            })
            .catch((err) => {
                console.log(err);
            });


        return () => {
            controller.abort();
        };
    }, [update]);
    // add modal 
    const customStyles = {
        content: {
            marginTop: '20px',
            marginBottom: '35px',
            top: '35%',
            left: '60%',
            // right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxHeight: "90%",
            width: "52%",
            height: "300px",
            padding: "10px",
        },
    };
    const [modalIsOpen, setIsOpen] = useState(false);
    const [adjustmentData, setAdjustmentData] = useState({
        name: "",
        country_id: 1
    })
    const handleChange = (e) => {
        setAdjustmentData({ ...adjustmentData, [e.target.name]: e.target.value });
    }
    const submitData = (e) => {
        e.preventDefault()
        if (adjustmentData.id) {
            http.put(`adjustment-type/${adjustmentData.id}`, adjustmentData)
                .then((res) => {
                    setUpdate(!update);
                    setIsOpen(false);
                    setAdjustmentData({ name: "",country_id: 1 });
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Success !',
                        text: 'Adjustment Updated Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch((err) => {
                    console.log(err)
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
        } else {
            http.post('adjustment-type', adjustmentData)
                .then((res) => {
                    setUpdate(!update);
                    setIsOpen(false);
                    setAdjustmentData({ name: "",country_id: 1 })
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Success !',
                        text: 'Adjustment Added Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch((err) => {
                    console.log(err)
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
        }

    }

    return (
        <div className='page-content adjustment-type-table'>
            <div className="custom-card p-2 d-flex justify-content-between mb-2 align-items-center">
                <h6>Adjustment Type</h6>
                <div>
                    <button style={{ marginTop: "1px" }} onClick={addAdjustment} className='btn btn-sm btn-primary float-end'>Add Adjustment</button>
                </div>
            </div>
            <MaterialTable
                columns={columns}
                data={data}
                isLoading={spinner}
                options={{
                    search: true,
                    showTitle: false,
                    searchFieldAlignment: "left",
                    pageSize: 10,
                    emptyRowsWhenPaging: false,
                    pageSizeOptions: [5, 10, 20, 50, 100],
                }}
            />

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="product_modal">
                    <div className="page-content">
                        <div className=" patients-head ">
                            <h5 className="fw-normal custom_py-3 px-2  text-start mb-2 card-name">Add Adjustment
                                <span style={{ cursor: "pointer", fontSize: "16px" }} onClick={() => setIsOpen(false)} className='float-end'><i className="fal fa-times"></i></span>
                            </h5>
                        </div>

                        <div className=" p-3">
                            <form onSubmit={submitData}>
                                <input onChange={handleChange} name='name' value={adjustmentData.name} type="text" className="form-control form-control-sm my-2" required placeholder="Adjustment Name" />
                                <button className="btn mt-2 btn-sm btn-success float-end text-uppercase" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-save mb-1"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg> Save</button>
                            </form>

                        </div>

                    </div>
                </div>
            </Modal>
        </div>
    )
}
