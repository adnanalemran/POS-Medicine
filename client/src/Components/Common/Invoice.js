
import React, { useContext } from 'react';
import { propsContext } from '../dashboard';
import Barcode from 'react-barcode';
import '../../CSS/Invoice.css';
import AuthUser from '../AuthUser';
import moment from 'moment';

const Invoice = ({ specialDiscount, invoice, currentMember }) => {
    const { user } = AuthUser();
    const { allSubTotalWithoutDiscount,cart, stickerCart, paidAmount } = useContext(propsContext);
    // const { currentMember } = useContext(memberContext);
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const currentMember2 = { ...currentMember };
    console.log(cart, "cart")
    return (
        <div style={{ paddingLeft: '35px', paddingRight: '35px' }} className='invoice-print'>
            <div className="invoice-pharmacy-details d-flex justify-content-center">
                <div className="text-center">
                    <h5>{user?.organization?.name}</h5>
                    <p>Location : {user?.organization?.address}</p>
                    <p>Tel : 0171238765</p>
                    <p>Vat Reg No :534565 </p>
                    <h6 className="mt-2">CASH MEMO</h6>
                </div>
            </div>
            <div className="invoice-date invoice-border-dashed">
                {/* <p style={{textAlign:'center'}}>Invoice No : {invoice} </p>
                <p style={{textAlign:'center'}}>Sales Person : Dummy </p> */}
                {
                    currentMember2.member_name &&
                    <div>
                        <p>Member Name: {currentMember2.member_name}</p>
                        <p>Phone Number: {currentMember2.member_phone}</p>
                    </div>
                }

                <div className='d-flex justify-content-between'>
                    <div>
                        <p >Sales Person : {user?.name} </p>
                        <p >Date : {new Date().toLocaleDateString('en-GB')} </p>
                    </div>
                    <div>
                        <p style={{ textAlign: 'end' }}>Invoice No : {invoice} </p>
                        <p style={{ textAlign: 'end' }}>Time : {moment(time, 'HH:mm:ss').format('hh:mm A')} </p>
                    </div>
                </div>
            </div>
            <div className="invoice-item-table">
                <table>
                    <tr className='invoice-border-dashed'>
                        <td width={'51%'}>Item</td>
                        <td width={'15%'} className='text-right'>Qty</td>
                        <td width={'20%'} className='text-right'>Price</td>
                        <td width={'15%'} className='text-right'>Total Price</td>
                    </tr>
                    {
                        stickerCart.filter(c => parseInt(c.pcs) > 0).map((item, i) =>
                            <tr key={i}>
                                <td width={"51%"} >{item.name}</td>
                                <td width={"15%"} className='text-start'>{item?.pcs}</td>
                                <td width={"20%"} className='text-start'>{item?.price}</td>
                                <td width={"15%"} className='text-end'>{Number(item.totalPrice)?.toFixed(2)}</td>
                            </tr>)
                    }
                    <tr className='invoice-border-dashed-top'>
                        <td colSpan={3} className='text-end fw-bolder'>Sub Total : </td>
                        <td className='text-end'>{Number(allSubTotalWithoutDiscount)?.toFixed(2)} </td>
                    </tr>

                    <tr>
                        <td colSpan={3} className='text-end'>VAT / TAX : </td>
                        <td className='text-end'>0</td>
                    </tr>
                    {
                        user.user_type === "cashier" &&
                        <tr>
                            <td colSpan={3} className='text-end'>Special Discount : </td>
                            <td className='text-end'>{specialDiscount}</td>
                        </tr>
                    }

                    <tr className='invoice-border-dashed-top'>
                        <td colSpan={3} className='text-end fw-bold'>Bill Total : </td>

                        <td className='text-end'>{(allSubTotalWithoutDiscount - specialDiscount)?.toFixed(2)} </td>


                    </tr>

                    {
                        user.user_type === "cashier"
                        &&
                        <tr>
                            <td colSpan={3} className='text-end'>Paid Amount : </td>
                            <td className='text-end'>{paidAmount} </td>
                        </tr>
                    }

                    {
                        user.user_type === "cashier"
                        &&
                        <tr className='invoice-border-dashed'>
                            <td colSpan={3} className='text-end'>Return Amount : </td>
                            {
                                paidAmount > allSubTotalWithoutDiscount ?
                                    <td className='text-end'>{(parseFloat(paidAmount) - (allSubTotalWithoutDiscount - specialDiscount)) > 1 ? (parseFloat(paidAmount) - (allSubTotalWithoutDiscount  - specialDiscount))?.toFixed(2) : 0} </td>
                                    :
                                    <td className='text-end'>0</td>
                            }

                        </tr>
                    }
                </table>
            </div>
            <div className=" invoice-creator mt-1">
                <p>Provided By: Cashier</p>
            </div>
            <div className='row mt-3'>
                <p className='border-bottom w-50 mt-2 fw-bold'>Terms & Condition:</p>
                <p>১. ক্যাশ মেমো ছাড়া ওষুধ ফেরত নেওয়া হয় না ।</p>
                <p >২. বিক্রিত ওষুধ ৭ দিন পর ফেরত নেওয়া হয় না ।</p>
                <p >৩. ইনসুলিন ও বিদেশী ওষুধ ফেরত নেওয়া হয় না ।</p>
                <p >৪. বিক্রিত ওষুধ এর টাকা ফেরত দেওয়া হয় না  ।</p>
                <p>৫. কাটা ছেড়া ও ফ্রিজের বিক্রিত ওষুধ ফেরত নেওয়া হয় না । </p>

            </div>
            <div className="branding-section mt-3 mx-auto text-center mx-auto">
                <p>Technology Partner Zaimah Technologies Ltd.</p>
            </div>

            <div className="invoice-greeting d-flex justify-content-center align-items-center mt-1">
                <Barcode displayValue={false} height={40} width={3} value={invoice} />
            </div>
            <div className="d-flex justify-content-center branding-section">
                <p>Thank You</p>
            </div>
        </div>
    );
};

export default Invoice;