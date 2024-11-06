
import React, { useState } from 'react'
import Modal from "react-modal";
import http from '../../http';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import AuthUser from '../AuthUser';
export default function SalesReturnModal({ invoiceId, clearInformation }) {
    const { user } = AuthUser();

    const [test, setTest] = useState([]);

    const customStyles = {
        content: {
            top: "40%",
            left: "57%",
            // right: "-30%",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "72%",
        },
    };
    const [modalIsOpen, setIsOpen] = useState(false);
    const [invoiceData, setInvoiceData] = useState({});
    const openModal = () => {
        http.get(`/view-selected-invoice/${invoiceId}`)
            .then((res) => {
                console.log(res, "invo res")
                setTest(res.data?.invoice_details)
                setInvoiceData(res.data.data);
                setIsOpen(true);
            })
            .catch((err) => {
                console.log(err);
            })

    }
    const [returnList, setReturnList] = useState([]);
    const handleMedicineSelect = (item, e) => {
        const newMedicine = [...returnList];
        if (e.target.checked) {
            newMedicine.push(item);
            setReturnList(newMedicine);
        } else {
            let newSelectedMedicine = returnList.filter(slt => slt.id !== item.id);
            setReturnList(newSelectedMedicine);
        }
    }
    const returnQtyHandler = (item, e) => {
        const existQty = test.find(slt => slt.id === item.id)?.pcs;
        const medicine = [...returnList];
        if (e.target.value <= Number(existQty)) {
            medicine.map(pd => {
                if (pd.id === item.id) {
                    pd.qty = e.target.value;
                    // pd.pcs = e.target.value;
                }
            })
        } else {
            toast.error(`Not available more than ${existQty}`)
        }

        setReturnList(medicine);
    }
    const allReturn = returnList.reduce((a, b) => a + parseInt(b.qty),0);

    const handleSaleReturn = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#69b128',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, return it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const returnData = {
                    reference_invoice_no: invoiceData?.invoice_no,
                    sales_invoice_id: invoiceId,
                    sales_person_id: user?.id,
                    member_id: invoiceData?.member_id ? invoiceData?.member_id : 'null',
                    total_amount: returnList.reduce((a, b) => a + parseFloat(b.qty) * parseFloat(b.price), 0),
                    arrData: JSON.stringify(returnList)
                }
                http.post(`save-return-invoice-details`, returnData)
                    .then(res => {
                        console.log(res)
                        http.post(`invoice-product-return-multiple`, { arrData: JSON.stringify(returnList) })
                            .then(res => {
                                console.log(res, "return res")
                                http.post(`return-invoice-update/${invoiceId}`, {qty: allReturn})
                                    .then(res => {
                                        console.log(res)
                                    })
                            })
                        toast.success(res.data.message)
                        setIsOpen(false);
                        clearInformation('Return Invoice Done');
                    })
                    .catch(err => {
                        console.log(err);
                    })


            }
        })
    }
    console.log(global.img_url, "global")
    const closeModal = () => {
        setIsOpen(false);
        setReturnList([]);
        setTest([]);
        setInvoiceData({});
        clearInformation('Return Invoice Canceled');
    };
    
    return (
        <>
            <button style={{ backgroundColor: '#69B128', color: 'white' }}
                onClick={openModal} className="btn btn-sm mt-2 me-lg-2 px-4 fw-bold">Return</button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <span className='float-end' style={{ fontSize: "15px", cursor: "pointer", marginTop: "-10px" }} onClick={closeModal}><i class="fal fa-times"></i></span>
                <br />
                <table className="cart-table">
                    <tr className="cart-table-head">
                        <td>  </td>
                        <td width={"25%"}>Product Name</td>
                        <td>Box Type</td>
                        <td> Size</td>
                        <td width={"6%"}>Box/Leaf</td>
                        <td>Unit</td>
                        <td width={"6%"}>Qty.</td>
                        <td>Discount</td>
                        <td>MRP</td>
                        <td>Total</td>
                        {/* <td width={"8%"}>Action</td> */}
                    </tr>
                    {test.length > 0 &&
                        test.map((item, i) => {
                            let exist = returnList.find(slt => slt.id === item.id);
                            return (
                                <tr key={i} className="border-bottom cart-table-body">
                                    <td>
                                        <input type="checkbox" onChange={(e) => handleMedicineSelect(item, e)} className="form-check" />
                                    </td>
                                    <td width={"25%"}>{item.name}</td>
                                    <td>Leaf</td>
                                    <td>1/10</td>
                                    <td>{item.noOfBox}</td>
                                    <td style={{ textAlign: "center" }}>Pcs</td>
                                    <td>
                                        {
                                            exist ?
                                                <input
                                                    value={item.qty}
                                                    onChange={(e) => returnQtyHandler(item, e)}
                                                    className="form-control form-control-sm"
                                                    type="number"
                                                /> :
                                                item.qty
                                        }

                                    </td>


                                    <td style={{ textAlign: "center" }}>

                                        0
                                        %</td>

                                    <td>{Number(item.price).toFixed(2)}</td>
                                    <td width={"8%"}>
                                        {/* <input type="text" value={item.cash_drug_discount ? ((item.price * item.pcs) - ((item.price * item.drug_discount * item.pcs) / 100)) : (item.price * item.pcs)} className="form-control form-control-sm" /> */}
                                        {(Number(item.price) * Number(item.qty)).toFixed(2)}
                                    </td>
                                    {

                                        // <td>
                                        //     <RiDeleteBinLine
                                        //         onClick={() => removeMedicine(item)}
                                        //         style={{ fontSize: '16px', marginRight: '4px', cursor: 'pointer' }}
                                        //         title="Delete Item"
                                        //     />
                                        // </td>
                                    }

                                </tr>
                            )
                        })}
                </table>
                {/* <button style={{ backgroundColor: '#69B128', color: 'white' }}
                    onClick={handleSaleReturn} className="btn btn-sm mt-3 float-end  me-lg-2 px-4 fw-bold">Return</button> */}
                {
                    Number(invoiceData?.return_status) === 1 ?

                        <button style={{ backgroundColor: '#69B128', color: 'white' }}
                            onClick={() => toast.error("Invoice already returned")} className="btn btn-sm mt-2 me-lg-2 px-4 fw-bold float-end ">Return</button>
                        :
                        <button style={{ backgroundColor: '#69B128', color: 'white' }}
                            onClick={handleSaleReturn} className="btn btn-sm mt-2 me-lg-2 px-4 fw-bold float-end ">Return</button>
                }
            </Modal>

        </>
    )
}
