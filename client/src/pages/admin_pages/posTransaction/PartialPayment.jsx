import React, { useEffect } from 'react'
import { useState } from 'react';
import Modal from 'react-modal';
import { HiOutlineCurrencyBangladeshi } from "react-icons/hi";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import http from '../../../http';
import AuthUser from '../../../Components/AuthUser';

export default function PartialPayment({ data, updatePaymentData }) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const customStyles = {
        content: {
            marginTop: '20px',
            marginBottom: '35px',
            top: '40%',
            left: '60%',
            // right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxHeight: "90%",
            width: "52%",
            height: "300px",
            padding: "10px",
            zIndex:999999
        },
    };
    const { invoice_no, due_amount, total_amount, id, paid_amount, created_by_name, created_by_email } = data;
    const [payAmount, setPayAmount] = useState('')
    useEffect(() => {
        Modal.setAppElement('body');
        setPayAmount(parseFloat(due_amount));
    }, [due_amount]);
    console.log(data, "data");
   
    const [active, setActive] = useState(false)

    const handleDueAmount = (e) => {
        const { value } = e.target;
        if (value > 0) {
            setPayAmount(value)
        } else {
            toast.error("Please provide valid input !")
        }
    }

    const handlePayDue = () => {
        if (payAmount > 0 && payAmount <= parseFloat(data.due_amount)) {
            Swal.fire({
                title: 'Have you received the due amount?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, pay it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const info = {
                        id: id,
                        invoice_no: invoice_no,
                        paid_amount: payAmount > 0 ? payAmount : due_amount,
                        requested_amount: total_amount,
                        payment_time: new Date().toLocaleTimeString(),
                        total_amount_paid: parseFloat(paid_amount) + parseFloat(payAmount),
                        created_by_email: created_by_email,
                        created_by_name: created_by_name,
                    }
                    http.post('save-money-recipt', info)
                        .then(res => {
                            console.log(res)
                            updatePaymentData();
                            Swal.fire({
                                position: 'top-center',
                                icon: 'success',
                                title: 'Success !',
                                text: 'Payment Successfully',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            setActive(false)
                            setIsOpen(false)
                            setPayAmount('')
                        })

                }
            })

        } else {
            toast.error("Please enter the correct payment amount!")
        }
    }

    return (
        <>
            <button data-bs-toggle="tooltip" title="Make Payment" onClick={() => setIsOpen(true)} className={`btn btn-sm action-btn `}> < HiOutlineCurrencyBangladeshi style={{ fontSize: "16px" }} /> </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <span style={{ cursor: "pointer", fontSize: "16px" }} onClick={() => setIsOpen(false)} className='float-end'><i className="fal fa-times"></i></span>

                <div className="product_modal">
                    <div className="p-3 mt-2 pt-4">
                        <h6>Payment Request</h6>
                        <p>A request has been made for you to submit payment for medical experience of the patient listed below.</p>
                        <div className="mt-2">
                            <label>Required Payment Amount</label>

                            <div className="row">
                                <div className="col-4">
                                    {
                                        !active && !payAmount ?
                                        <>
                                            <span>BDT</span>
                                            <span onClick={() => setActive(true)} className='money-amount-box d-inline-block ms-4'>{data?.due_amount}</span>
                                        </>
                                        : 
                                        <div className="row">
                                            <div className="col-3">
                                                <span>BDT</span>
                                            </div>
                                            <div className="col-9">
                                                <input autoFocus onBlur={() => setActive(false)} onChange={handleDueAmount} defaultValue={data?.due_amount} type="number" className="form-control form-control-sm" />
                                            </div>
                                        </div>

                                    }
                                   

                                </div>
                                <div className="col-3">
                                    <button disabled={parseFloat(data.due_amount) === 0} onClick={handlePayDue} className="btn btn-sm btn-primary mt-1">Pay Now</button>

                                </div>
                                <div className="col-4">
                                    {/* <button disabled className="vaital-setup-btn ms-2">Payment Link</button> */}
                                    {/* <a className='text-decoration-none' disabled href="#">Payment Link</a> */}
                                </div>
                            </div>
                        </div>
                        <div className="mt-2">
                            <h6>Remark</h6>
                            <div className="row mt-2">
                                <div className="col-5">
                                    <span>Deposit for</span> <span className="fw-bold ms-2">Due</span>
                                </div>
                                <div className="col-5">
                                    {/* <div className="row">
                                        <div className="col-3">
                                            <label>Other</label>
                                        </div>
                                        <div className="col-9">
                                            <input type="text" className="form-control form-control-sm" />
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <p>If you have any question or need help, please contact us.</p>
                    </div>
                </div>
            </Modal>
        </>
    )
}
