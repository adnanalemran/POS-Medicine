import React, { useContext, useEffect, useRef, useState } from 'react';
import cashier from '../../front_assets/user_images/dummy.jpg';
import cash from '../../front_assets/Payment_images/cash.png';
import bkash from '../../front_assets/Payment_images/bkash.png';
import nagad from '../../front_assets/Payment_images/nagad.png';
import rocket from '../../front_assets/Payment_images/rocket.png';
import card from '../../front_assets/Payment_images/card.png';
import { useReactToPrint } from 'react-to-print';
import Modal from 'react-modal';
import Invoice from './Invoice';
import { propsContext } from '../dashboard';
import AuthUser from '../AuthUser';
import '../../CSS/Invoice.css'
import http from '../../http';
import { memberContext } from '../../navbar/auth';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import SalesReturnModal from '../SalesComponent/SalesReturnModal';
import moment from 'moment';
const RightSidebar = ({ pImage, setPImage, setSearchMedicine }) => {
    const [error, setError] = useState('');

    const { user } = AuthUser();
    // Context Api Start
    const { setPaymentMethod, paymentMethod, invoiceReload, setInvoiceReload,
        setCart, cart, allSubTotal,
        allSubTotalWithoutDiscount, invoice,
        setInvoiceId, invoiceId, isSpecialDiscount, setSpecialDiscount,
        specialDiscount, returnAmount, setReturnAmount, setUpdateTrack, updateTrack, paymentStatus,
        selectedInvoice, setSelectedInvoice, setAutoReloadInvoice, autoReloadInvoice, prescriptionImage, setPrescriptionImage, paidAmount, setPaidAmount } = useContext(propsContext)

    const { currentMember, setCurrentMember } = useContext(memberContext);
    const [cardType, setCardType] = useState('Visa Card');
    const [digitalType, setDigitalType] = useState('');
    // Context Api end 
    const handleChange = (event) => {
        setPaymentMethod(event.target.value)
    }

    const handleCartChange = (event) => {
        setCardType(event.target.value)
    }
    const handleDigitalChange = (event) => {
        setDigitalType(event.target.value)
    }



    const [grandTotal, setGrandTotal] = useState(0);
    const [specialDiscountType, setSpecialDiscountType] = useState('Fixed');
    const [invoiceAllTotal, setInvoiceAllTotal] = useState(0);

    // Sales side Discount 


    const [modalIsOpen, setIsOpen] = useState(false);

    const partialInvoice = (selectedInvoice?.paid_amount > 0 && selectedInvoice?.due_amount > 0 && selectedInvoice?.payment_status === "Partially Paid") ? true : false


    const [currentInvoiceId, setCurrentInvoiceId] = useState('');

    // Ending vat Tax from database
    console.log(partialInvoice, "partialInvoice")

    useEffect(() => {
        if (selectedInvoice?.paid_amount > 0 && selectedInvoice?.due_amount > 0 && selectedInvoice?.payment_status === "Partially Paid") {
            setGrandTotal(parseFloat(selectedInvoice?.due_amount))
            setInvoiceAllTotal(parseFloat(selectedInvoice?.sub_total))
        } else {
            setInvoiceAllTotal(parseFloat(allSubTotalWithoutDiscount).toFixed(2))
            setGrandTotal(parseFloat(invoiceAllTotal - specialDiscount).toFixed(2))
            setCurrentInvoiceId({ ...currentMember })
        }
    }, [
        allSubTotal,
        specialDiscount,
        allSubTotalWithoutDiscount,
        paymentMethod,
        modalIsOpen,
        cart
    ])


    // For payment calculation 
    const handlePay = (e) => {
        if (paymentMethod === 'Credit Payment') {
            setPaidAmount()
        } else {
            setPaidAmount(parseFloat(e.target.value))
        }
    }

    useEffect(() => {
        if (paidAmount > grandTotal) {
            setReturnAmount(paidAmount - grandTotal)
        } else {
            setReturnAmount(0)
        }

    }, [grandTotal, paidAmount])

    // Clear information 
    const clearInformation = (info) => {
        setCart([])
        setInvoiceReload(!invoiceReload);
        setIsOpen(false);
        // setCurrentMember({});
        setInvoiceId();
        setSpecialDiscount(0);
        setReturnAmount(0);
        setPaymentMethod('Cash');
        setPaidAmount();
        setPrescriptionImage('');
        setPImage('');
        setSearchMedicine('');
        setSelectedInvoice({});
        setSpecialDiscount('0');
        pImage.value = '';
        Swal.fire(
            {
                position: 'top-center',
                icon: 'success',
                title: `${info} !`,
                text: 'Your data has been saved',
                timer: 1000
            }

        )

    }
    const [digitalNumber, setDigitalNumber] = useState('')
    const handleDigitalNumber = (e) => {
        let { value } = e.target;
        // value = Math.max(parseFloat(min), Math.min(parseFloat(max), parseFloat(value)));
        setDigitalNumber(value);
    }
    // Special percentage calculation 
    const handleSpecialPercentage = (e) => {

        if (specialDiscountType === "Fixed" && e.target.value.length > 0) {
            let { value } = e.target;
            setSpecialDiscount(value)

        } else if (specialDiscountType === "Percentage" && e.target.value.length > 0) {
            let { value, min, max } = e.target;
            value = Math.max(parseFloat(min), Math.min(parseFloat(max), parseFloat(value)));
            setSpecialDiscount((parseInt(invoiceAllTotal) * value) / 100);
        } else {
            setSpecialDiscount(0)
        }
    }
    const [loading, setLoading] = useState(false);

    // print invoice 
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onAfterPrint: () => {
            clearInformation('Invoice Create');
        }
    });
    const handlePrintPreview = useReactToPrint({
        content: () => componentRef.current,

    });


    // Create New Invoice 
    const handleInvoiceGenerate = () => {

        const newCart = cart.filter(c => parseInt(c.pcs) > 0);
        const memberId = (currentMember.id ? currentMember.id : "");
        // console.log('member_id',medicineCart, memberId, invoice, invoiceAllTotal, vatTax, grandTotal,paymentMethod, salesDicount, specialDiscount, paidAmount, returnAmount);

        const formData = new FormData();

        formData.append('invoice_no', invoice)
        formData.append('member_id', memberId)

        formData.append('sub_total', invoiceAllTotal)
        formData.append('vat_tax_amount', 0)
        formData.append('payment_status', 'Unpaid')

        formData.append('grand_total', invoiceAllTotal)
        formData.append('discount_type', paymentMethod === 'Digital Payment' ?
            `${paymentMethod?.charAt(0)?.toUpperCase()} -  
        ${digitalType?.charAt(0)?.toUpperCase()} : ${digitalNumber} ` : paymentMethod === 'Card' ? `${paymentMethod?.charAt(0)?.toUpperCase()} -
         ${cardType?.charAt(0)?.toUpperCase()} : : ${digitalNumber}` : paymentMethod)
        formData.append('discount_amount', 0)

        formData.append('special_discount', specialDiscount)
        formData.append('paid_amount', 0)
        formData.append('return_amount', returnAmount)

        formData.append('prescription_image', prescriptionImage)
        formData.append('invoice_from', "web")
        formData.append('created_by', user?.name ? user?.name : "")

        formData.append('cart', JSON.stringify(newCart))



        http.post('invoice', formData).then((res) => {
            setAutoReloadInvoice(!autoReloadInvoice);
            if (res.data.status === 200) {
                handlePrint();
            } else {

                // console.log("res.data.errors",res.data.errors);
                setError(res.data.errors)

            }
        })
    }

    const handleUpdate = () => {
        setUpdateTrack(!updateTrack)
        setLoading(true);
        const id = invoiceId;
        const newCart = cart.filter(c => parseInt(c.pcs) > 0);
        // console.log("This invoice backend id is ..............", id, invoiceId);

        const memberId = (currentMember.id ? currentMember.id : "");
        // console.log('member_id',medicineCart, memberId, invoice, invoiceAllTotal, vatTax, grandTotal,paymentMethod, salesDicount);


        if (id) {

            const formData = new FormData();
            formData.append('invoice_no', invoice)
            // formData.append('member_id', memberId)

            formData.append('sub_total', invoiceAllTotal)
            formData.append('vat_tax_amount', 0)
            formData.append('payment_status', paymentMethod === "Credit Payment" ? 'Unpaid' : paidAmount < grandTotal ? 'Partially Paid' : 'Paid')
            formData.append('due_amount', paidAmount > 0 ? paidAmount >= grandTotal ? 0 : grandTotal - paidAmount : selectedInvoice?.due_amount)
            formData.append('delete_status', paymentMethod === "Credit Payment" ? 'null' : moment().format('YYYY-MM-DD'))

            formData.append('special_discount', specialDiscount)
            formData.append('paid_amount', partialInvoice ? parseFloat(paidAmount) + parseFloat(selectedInvoice?.paid_amount) : paidAmount)
            formData.append('return_amount', returnAmount)

            formData.append('grand_total', invoiceAllTotal)
            formData.append('discount_type', paymentMethod === 'Digital Payment' ?
                `${paymentMethod?.charAt(0)?.toUpperCase()} -  
        ${digitalType?.charAt(0)?.toUpperCase()} : ${digitalNumber} ` : paymentMethod === 'Card' ? `${paymentMethod?.charAt(0)?.toUpperCase()} -
         ${cardType?.charAt(0)?.toUpperCase()} : : ${digitalNumber}` : paymentMethod)
            formData.append('discount_amount', 0)

            formData.append('prescription_image', prescriptionImage)
            formData.append('invoice_from', "web")
            formData.append('cart', JSON.stringify(newCart))
            formData.append('updated_by', user?.name ? user?.name : "")

            http.post(`invoice/update/${id}`, formData).then(res => {
                setLoading(true);
                if (res.data.status === 200) {
                    setLoading(false)
                    setIsOpen(false)
                    http.post(`stock-out-multiple`, {
                        invoice_id: id,
                        invoice_no: invoice,
                        arrData: JSON.stringify(newCart)
                    })
                        .then(res => {
                            console.log(res, "stock-out-multiple")
                        })


                    // Swal.fire({
                    //     position: 'top-center',
                    //     icon: 'success',
                    //     title: "Payment Done",
                    //     timer: 1000
                    // })
                    clearInformation("Payment Done")
                } else {
                    setError(res.data.errors)
                }

            });
        } else {

            const formData = new FormData();

            // formData.append('invoice_no', invoice)
            formData.append('member_id', memberId)

            formData.append('sub_total', invoiceAllTotal)
            formData.append('vat_tax_amount', 0)
            formData.append('payment_status', paymentMethod === "Credit Payment" ? 'Unpaid' : paidAmount < grandTotal ? 'Partially Paid' : 'Paid')
            formData.append('due_amount', paymentMethod === "Credit Payment" ? grandTotal : paidAmount >= grandTotal ? 0 : grandTotal - paidAmount)
            formData.append('delete_status', paymentMethod === "Credit Payment" ? 'null' : moment().format('YYYY-MM-DD'))

            formData.append('grand_total', invoiceAllTotal)
            formData.append('discount_type', paymentMethod === 'Digital Payment' ?
                `${paymentMethod?.charAt(0)?.toUpperCase()}-${digitalType?.charAt(0)?.toUpperCase()} : ${digitalNumber} ` : paymentMethod === 'Card' ? `${paymentMethod?.charAt(0)?.toUpperCase()} - ${cardType?.charAt(0)?.toUpperCase()}:${digitalNumber}` : paymentMethod)
            formData.append('discount_amount', 0)

            formData.append('special_discount', specialDiscount)
            formData.append('paid_amount', paidAmount || 0)
            formData.append('return_amount', returnAmount)

            formData.append('prescription_image', prescriptionImage)
            formData.append('invoice_from', "web")
            formData.append('created_by', user?.name ? user?.name : "")
            formData.append('cart', JSON.stringify(newCart))
            http.post('invoice', formData).then((res) => {
                setAutoReloadInvoice(!autoReloadInvoice);

                if (res.data.status === 200) {
                    setLoading(false);
                    setIsOpen(false)
                    http.post(`stock-out-multiple`, {
                        invoice_id: res.data.invoice.id,
                        invoice_no: invoice,
                        arrData: JSON.stringify(newCart)
                    })
                        .then(res => {
                            console.log(res, "stock-out-multiple")
                        })

                    handlePrint();
                    //   setCurrentMember({});


                } else {

                    // console.log("res.data.errors",res.data.errors);
                    setError(res.data.errors)

                }
            })
        }


    }

    // Modal 
console.log(prescriptionImage,"prescriptionImage")
    const customStyles = {
        content: {
            marginTop: '35px',
            marginBottom: '35px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxHeight: "90%"
        },
    };
    console.log(user?.user_name, "ddf")
    return (
        <div className=" mt-2">
            {
                (selectedInvoice.fully_return == null || selectedInvoice.fully_return === 'null') &&
                <>
                    {
                        cart.length > 0 &&
                        <div className="d-flex justify-content-end ">
                            <span className="cart-sub-total me-md-2 me-lg-4 mt-2 fw-bold fs-5"> Sub Total : {Number(allSubTotal).toFixed(2)}</span>

                            {
                                invoiceId ?
                                    user.user_type === "cashier" && (paymentStatus === "Unpaid" || paymentStatus === "Partially Paid") && allSubTotalWithoutDiscount > 0
                                        ?
                                        <>
                                            <button style={{ backgroundColor: '#69B128', color: 'white' }}
                                                onClick={() => { setIsOpen(true); setPaidAmount(); setPaymentMethod("Cash"); }} className="btn btn-sm mt-2 me-lg-2 px-4 fw-bold">Pay Now</button>
                                            {
                                                (paymentMethod === "Credit Payment" || paymentStatus === "Partially Paid") &&
                                                <SalesReturnModal clearInformation={clearInformation} invoiceId={invoiceId} />
                                            }
                                        </>

                                        : paymentStatus === "Paid" ?
                                            <>
                                                <SalesReturnModal clearInformation={clearInformation} invoiceId={invoiceId} />
                                            </>
                                            :
                                            <button style={{ backgroundColor: '#69B128', color: 'white' }}
                                                onClick={() => { setIsOpen(true); setPaidAmount(); }} className="btn btn-sm mt-2 me-lg-2 px-4 fw-bold">Pay Now</button>

                                    :
                                    user.user_type === "cashier" && (paymentStatus === "Unpaid" || paymentStatus === "Default") && allSubTotalWithoutDiscount > 0
                                        ?
                                        <button style={{ backgroundColor: '#69B128', color: 'white' }}
                                            onClick={() => { setIsOpen(true); setPaidAmount(); }} className="btn btn-sm mt-2 me-lg-2 px-4 fw-bold">Pay Now</button>

                                        :
                                        Number(allSubTotal) > 0 && <button style={{ backgroundColor: '#69B128', color: 'white' }} onClick={() => { handleInvoiceGenerate(); }}
                                            className="btn btn-sm mt-2 me-lg-2 px-4 fw-bold">Save </button>

                            }
                        </div>
                    }
                </>
            }

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >


                <div className='g-doc-scroll'>

                    <div className="row right-sidebar-head border-bottom">
                        <div className="col-3 text-center border-end">
                            <span className="right-side-cash-count d-block">Counter</span>
                            <span className="right-side-cash-count-number d-block">1</span>
                        </div>
                        <div className="col-9 d-flex justify-content-between align-items-center px-2">
                            <div className="text-center right-sidebar-cashier">
                                <h6>{user.name}</h6>
                                <span>User Role: {user.user_type}</span>
                            </div>
                            <div className="text-center right-sidebar-cashier-img">
                                {
                                    user?.photo
                                        ? <img src={user.photo} alt="" />
                                        : <img src={cashier} alt="" />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="pos-payment-method-container mt-2">
                        <h6 className='pos-right-heading mb-1'>Payment Method</h6>
                        {/* Cash payment  */}
                        <div className="d-flex justify-content-between border rounded p-1 align-items-center mb-2">
                            <div className="form-check">
                                <input
                                    value="Cash"
                                    checked={paymentMethod === 'Cash'}
                                    onChange={handleChange}
                                    defaultChecked={true} className="form-check-input" type="radio" name="paymentMethod" id="flexRadioDefault1" />
                                <label className="form-check-label" for="flexRadioDefault1">Cash</label>
                            </div>
                            <div className="d-flex">
                                <img src={cash} alt="" className="payment-method-img" />
                            </div>
                        </div>


                        {/* Card payment  */}
                        <div className="border rounded p-1 mb-2">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check">
                                    <input
                                        value="Card"
                                        checked={paymentMethod === 'Card'}
                                        onChange={handleChange}
                                        className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                    <label className="form-check-label" for="flexRadioDefault1"> Credit / Debit Card</label>
                                </div>
                                <div className="d-flex">
                                    <img src={card} alt="" className="payment-method-img" />
                                </div>

                            </div>

                            {
                                paymentMethod === "Card" && user.user_type === "cashier" &&
                                <div className="mt-1 payment-card">

                                    <div className="row">
                                        <div className="p-2  mb-2 d-flex gap-2 ms-1">

                                            <div className="radio-container">
                                                <div className="d-flex">
                                                    <input
                                                        type="radio"
                                                        name="visa"
                                                        value="Visa Card"
                                                        id="visa"
                                                        checked={cardType === "Visa Card"}
                                                        onChange={handleCartChange}
                                                    />
                                                    <label className="pt-1 ps-2" htmlFor="Visa Card">
                                                        Visa
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="radio-container">
                                                <div className="d-flex">
                                                    <input
                                                        type="radio"
                                                        name="MasterCard"
                                                        value="Master Card"
                                                        id="MasterCard"
                                                        checked={cardType === "Master Card"}
                                                        onChange={handleCartChange}
                                                    />
                                                    <label className="pt-1 ps-2" htmlFor="Master Card">
                                                        Master Card
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="radio-container">
                                                <div className="d-flex">
                                                    <input
                                                        type="radio"
                                                        name="AmericanExpress"
                                                        value="American Express"
                                                        id="AmericanExpress"
                                                        checked={
                                                            cardType === "American Express"
                                                        }
                                                        onChange={handleCartChange}
                                                    />
                                                    <label
                                                        className="pt-1 ps-2"
                                                        htmlFor="American Express"
                                                    >
                                                        American Express
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="row ">
                                        <div className="col-5 ">
                                            <label >{cardType} No.</label>
                                        </div>
                                        <div className="col-7 ">
                                            <input type="number" min='11' max='13' onChange={handleDigitalNumber} className="form-control form-control-sm" />
                                        </div>
                                    </div>

                                </div>
                            }
                        </div>

                        {/* Digital payment  */}
                        <div className="border rounded p-1 mb-2">

                            <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check">
                                    <input
                                        value="Digital Payment"
                                        checked={paymentMethod === 'Digital Payment'}
                                        onChange={handleChange}
                                        className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                    <label className="form-check-label" for="flexRadioDefault1"> Digital Payment</label>
                                </div>
                                <div className="d-flex">
                                    <div className="d-flex gap-2 w-75">
                                        <img style={{ padding: '0 0 2px 0', height: '20px' }} src={rocket} alt="" className="payment-method-img border-bottom-3 border-primary w-100 " />
                                        <img style={{ padding: '0 0 2px 0', height: '20px' }} src={nagad} alt="" className="payment-method-img border-bottom-3 border-primary w-100 " />
                                        <img style={{ padding: '0 0 2px 0', height: '20px' }} src={bkash} alt="" className="payment-method-img border-bottom-3 border-primary w-100 " />
                                    </div>
                                </div>

                            </div>
                            {
                                paymentMethod === "Digital Payment" && user.user_type === "cashier" &&
                                <div className="mt-1 payment-digital">

                                    <div className="row">
                                        <div className="p-2  mb-2 d-flex gap-2 ms-1">

                                            <div className="radio-container">
                                                <div className="d-flex">
                                                    <input
                                                        type="radio"
                                                        name="R"
                                                        value="R"
                                                        id="rocket"
                                                        checked={digitalType === "R"}
                                                        onChange={handleDigitalChange}
                                                    />
                                                    <label className="pt-1 ps-2" htmlFor="rocket">
                                                        Rocket
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="radio-container">
                                                <div className="d-flex">
                                                    <input
                                                        type="radio"
                                                        name="N"
                                                        value="N"
                                                        id="nagad"
                                                        checked={digitalType === "N"}
                                                        onChange={handleDigitalChange}
                                                    />
                                                    <label className="pt-1 ps-2" htmlFor="nagad">
                                                        Nagad
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="radio-container">
                                                <div className="d-flex">
                                                    <input
                                                        type="radio"
                                                        name="B"
                                                        value="B"
                                                        id="bkash"
                                                        checked={
                                                            digitalType === "B"
                                                        }
                                                        onChange={handleDigitalChange}
                                                    />
                                                    <label
                                                        className="pt-1 ps-2"
                                                        htmlFor="bkash"
                                                    >
                                                        Bkash
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="row ">
                                        <div className="col-5 ">
                                            <label >{digitalType} No.</label>
                                        </div>
                                        <div className="col-7 ">
                                            <input type="number" min='11' max='13' onChange={handleDigitalNumber} className="form-control form-control-sm" />
                                        </div>
                                    </div>

                                </div>
                            }

                        </div>
                    </div>

                    <div className={`pos-invoice-preview px-2 mt-2 `}>
                        <h6 className='pos-right-heading'>Invoice Preview</h6>
                        <div className="pos-invoice-content m-2 p-2">
                            <div className="invoice-item mt-1 d-flex"><span className="invoice-sub-item">Total</span><span className="invoice-item-price w-50 text-end">{invoiceAllTotal > 0 ? invoiceAllTotal : "0.00"}</span></div>
                            <div className="invoice-item mt-1 d-flex"><span className="invoice-sub-item"> Discount </span> <span className="invoice-item-price text-end w-50"> {specialDiscount > 0 ? specialDiscount : "0.00"}</span></div>
                            {
                                selectedInvoice?.special_discount ?
                                    <></>
                                    :
                                    <div className="ms-1 special-discount-container p-1 row">
                                        <div className="col-9">
                                            <div>
                                                <input onChange={() => { setSpecialDiscountType("Fixed"); setSpecialDiscount('') }} type="radio" defaultChecked={specialDiscountType === "Fixed" && true} name="disc" />
                                                <label >Fixed</label>
                                            </div>
                                            <div>
                                                <input onChange={() => { setSpecialDiscountType("Percentage"); setSpecialDiscount('') }} type="radio" name="disc" />
                                                <label >Percentage</label>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            {
                                                specialDiscountType === "Fixed" ?
                                                    <input type="number" onChange={(e) => handleSpecialPercentage(e)} className='form-control form-control-sm mt-1' />
                                                    :
                                                    <input type="number" onChange={(e) => handleSpecialPercentage(e)} min="1" max="100" className='form-control form-control-sm mt-1' />
                                            }

                                        </div>
                                    </div>
                            }

                            <div className="invoice-item mt-1 d-flex"><span className="invoice-sub-item">VAT/TAX</span> <span className="invoice-item-price text-end w-50">0</span></div>
                            {
                                partialInvoice ?
                                    <>
                                        <div className="invoice-item mt-1 d-flex"><span className="invoice-sub-item">Paid</span> <span className="invoice-item-price text-end w-50">{selectedInvoice?.paid_amount > 0 ? selectedInvoice?.paid_amount : "0.00"}</span></div>
                                        <div className="mt-2 invoice-total d-flex">
                                            <h6 className='w-50 mt-2 fw-bolder'>Due</h6>
                                            <span className='mt-2 w-50 text-end me-3'>{grandTotal > 0 ? grandTotal : "0.00"}</span>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="mt-2 invoice-total d-flex">
                                            <h6 className='w-50 mt-2 fw-bolder'>Grand Total</h6>
                                            <span className='mt-2 w-50 text-end me-3'>{grandTotal > 0 ? grandTotal : "0.00"}</span>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>

                    <div className={`pos-invoice-cash px-2 mt-2`}>
                        {
                            selectedInvoice?.payment_status === 'Partially Paid' ?
                                <></>
                                :
                                <div className='d-flex justify-content-between'>
                                    <h6 className='pos-right-heading'>Cash Collection</h6>
                                    <div className="d-flex">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="Credit Payment"
                                            id="credit_payment"
                                            onChange={handleChange}
                                            disabled={paymentMethod === "Credit Payment"}
                                        />
                                        <label className="pt-1 ps-2" htmlFor="credit_payment">
                                            Credit Payment
                                        </label>
                                    </div>
                                </div>
                        }

                        <div className="pos-invoice-cash-content m-2 p-2">
                            <div className="invoice-item mt-1 d-flex"><span className="invoice-sub-item">Grand Total:</span><span className="invoice-item-price w-50 text-end">{grandTotal > 0 ? parseFloat(grandTotal).toFixed(2) : "0.00"}</span></div>
                            <div className="invoice-item mt-2 d-flex"><span className="invoice-sub-item">Paid Amount:</span> <input onChange={(e) => handlePay(e)} type="number" value={paidAmount} className="form-control form-control-sm w-50 text-end" /></div>
                            <div className="invoice-item mt-1 d-flex"><span className="invoice-sub-item">Return Amount:</span> <span className="invoice-item-price text-end w-50">{parseFloat(returnAmount).toFixed(2)}</span></div>

                        </div>

                    </div>

                    <div className={`mt-2 right-sidebar-btn-container px-2`}>
                        <div style={{ margin: '12px -4px 12px -4px' }} className="row">
                            <div className="col-4 ">
                                <button onClick={() => { setIsOpen(false); setPaidAmount(); setPaymentMethod('Cash') }} className="custom-btn-outline w-100">Cancel</button>
                            </div>
                            {
                                (paidAmount > 0 || paymentMethod === "Credit Payment")
                                    ?
                                    <div className="col-4 ">
                                        {
                                            loading ?
                                                <button disabled className="custom-btn ms-1 w-100">Payment</button>
                                                :
                                                <button onClick={() => { handleUpdate() }} className="custom-btn ms-1 w-100">Payment</button>
                                        }
                                    </div>
                                    :
                                    <div className="col-4 ">
                                        <button onClick={() => toast.error('You need to pay first')} title={'You need to pay first'} className="custom-btn-disabled ms-1 w-100">Pay First</button>
                                    </div>
                            }
                            <div className="col-4 ">
                                <button onClick={() => { handlePrintPreview() }} className="custom-btn w-100">Preview</button>
                            </div>
                        </div>

                    </div>
                </div>
            </Modal>
            <div ref={componentRef} className="sales-invoice">
                <Invoice isSpecialDiscount={isSpecialDiscount} invoice={invoice} salesDicount='0.00' grandTotal={grandTotal} paidAmount={paidAmount} returnAmount={returnAmount} specialDiscount={specialDiscount} currentMember={currentMember} />
            </div>
        </div>

    );
};

export default RightSidebar;