import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import http from '../../../http'
import Modal from 'react-modal';
import MaterialTable from 'material-table'
import Swal from 'sweetalert2'

export default function Customers() {
    const [update,setUpdate] = useState("members");
    const [isLoading,setIsLoading] =useState(true);
    const [data,setData] = useState([]);
    useEffect(() => {
        http.get(`members`).then(res => {
            setData(res.data.data)
            setIsLoading(false)
        })
        Modal.setAppElement('body')
    },[update])
    // const { data, isLoading } = useQuery(update, () => http.get(`members`).then(res => res.data.data));
    const columns = [
        {
            title: "SL",
            field: "",
            render: (row) => <div className='text-center'>{row.tableData.id + 1}</div>,
            width: "20 !important",

        },

        {
            title: " Name",
            field: `member_name`,
            cellStyle: {
                textAlign: "center",
            },

        },
        {
            title: " Phone",
            field: `member_phone`,
            cellStyle: {
                textAlign: "center",
            },

        },
        {
            title: " Email",
            field: `member_email`,
            cellStyle: {
                textAlign: "center",
            },

        },


        {
            title: "Action",
            field: "patient",
            render: (row) => (
                <div className='text-center'>
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
                width: "10%",
                textAlign: "center",
            }

        },
    ];
    const [member, setMember] = useState({
        member_name: '',
        member_email: '',
        member_phone: ''
    })
    const [isOpen, setIsOpen] = useState(false);
    const submitData = (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append('member_name', member.member_name);
        formData.append('member_email', member.member_email);
        formData.append('member_phone', member.member_phone);

        if (member.id) {
            http.post(`members-update/${member.id}`, formData).then(res => {
                if (res.data.status === 200) {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: `Member Updated Successfully`,
                        timer: 2500
                    })

                    setIsOpen(false)
                    setUpdate(!update)
                    setMember({
                        member_name: '',
                        member_email: '',
                        member_phone: ''
                    })
                } 
            })
        } else {
            http.post('members', formData).then(res => {

                if (res.data.status === 200) {

                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: `<div><h1 style={{color:'green'}}>Congratulations!</h1><h4>${member.member_name}</h4> <h6>You are now our member</h6></div>`,
                        timer: 2500
                    })

                    setIsOpen(false)
                    setUpdate(!update)
                    setMember({
                        member_name: '',
                        member_email: '',
                        member_phone: ''
                    })
                } else {

                }
            })
        }

    }
    const customStyles = {
        content: {
            marginTop: '20px',
            marginBottom: '35px',
            top: '45%',
            left: '60%',
            // right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxHeight: "90%",
            width: "52%",
            height: "370px",
            padding: "10px",
        },
    };
    const handleInput = (e) => [
        setMember({ ...member, [e.target.name]: e.target.value })
    ]
    const editData = (id) => {
        http.get(`members/${id}`).then(res => {
            setMember(res.data.data)
            setIsOpen(true)
        })
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
                http.delete(`members/${id}`)
                    .then((res) => {
                        setUpdate(!update);
                        setIsOpen(false);
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'Success !',
                            text: 'Member Deleted Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
            }
        })
     }
    const closeModal = () => {
        setIsOpen(false)
        setMember({
            member_name: '',
            member_email: '',
            member_phone: ''
        })
    }
    return (
        <div className='page-content adjustment-type-table'>
            <div className="custom-card p-2 d-flex justify-content-between mb-2 align-items-center">
                <h6>Members</h6>
                <div>
                    <button style={{ marginTop: "1px" }} onClick={() => setIsOpen(true)} className='btn btn-sm btn-primary float-end'>Add Member</button>
                </div>
            </div>
            <div className='data-table-container'>
            <MaterialTable
                columns={columns}
                data={data}
                isLoading={isLoading}
                options={{
                    search: true,
                    showTitle: false,
                    searchFieldAlignment: "left",
                    pageSize: 10,
                    emptyRowsWhenPaging: false,
                    pageSizeOptions: [5, 10, 20, 50, 100],
                }}
            />
            </div>

            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="product_modal">
                    <div className="page-content">
                        <div className=" patients-head ">
                            <h5 className="fw-normal custom_py-3 px-2  text-start mb-2 card-name">{member.id ? 'Edit' : 'Add'} Membership
                                <span style={{ cursor: "pointer", fontSize: "16px" }} onClick={closeModal} className='float-end'><i className="fal fa-times"></i></span>
                            </h5>
                        </div>

                        <div className="new-member-reg p-2">
                            <form onSubmit={submitData}>
                                <h5 className='text-center'>{member.id ? 'Edit' : 'New'} Membership Form</h5>
                                <hr />
                                <div className="form-group mb-2">
                                    <label>Name <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control form-control-sm" name='member_name' value={member.member_name} onChange={handleInput} />
                                </div>
                                <div className="form-group mb-2">
                                    <label>Phone <span className="text-danger">*</span></label>
                                    <input type="number" className="form-control form-control-sm" name='member_phone' value={member.member_phone} onChange={handleInput} />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Email</label>
                                    <input type="email" className="form-control form-control-sm" name='member_email' value={member.member_email} onChange={handleInput} />
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button onClick={() => setIsOpen(false)} className="custom-btn-outline me-2">Cancel</button>
                                    <button className="custom-btn" type='submit'>Submit</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </Modal>
        </div>
    )
}
