import AuthUser from "./AuthUser";
import { createContext, useState } from "react";
import '../CSS/Layout.css'
import CashierPerson from "./SalesComponent/CashierPerson";
import ManagementPerson from "./ManagementComponent/ManagementPerson";
export const propsContext = createContext();

export default function Dashboard() {
    const { user } = AuthUser();
    const [allDiscount, setAllDiscount] = useState([])
    const [allSubTotal, setAllSubTotal] = useState([])
    const [allSubTotalWithoutDiscount, setAllSubTotalWithoutDiscount] = useState([])
    const [invoice, setInvoice] = useState(0);
    const [stickerCart, setStickerCart] = useState([]);
    const [invoiceReload, setInvoiceReload] = useState(true);
    const [cart, setCart] = useState([]);
    const [invoiceId, setInvoiceId] = useState();
    const [paymentMethod, setPaymentMethod] = useState('Cash');
    const [specialDiscount, setSpecialDiscount] = useState(0);
    const [returnAmount, setReturnAmount] = useState(0);
    const [updateTrack, setUpdateTrack] = useState(false);
    const [invoicePaidUnpaid, setInvoicePaidUnpaid] = useState([]);
    const [paymentStatus, setPaymentStatus] = useState('Default');
    const [autoReloadInvoice, setAutoReloadInvoice] = useState(false);
    const [prescriptionImage, setPrescriptionImage] = useState('');
    const [paidAmount , setPaidAmount] = useState();
    const [selectedInvoice,setSelectedInvoice] = useState({});
    const [invoiceType,setinvoiceType] = useState("All");


    return (
        <propsContext.Provider value={{
            autoReloadInvoice,
            setAutoReloadInvoice,
            paymentStatus,
            setPaymentStatus,
            invoicePaidUnpaid,
            setInvoicePaidUnpaid,
            invoiceType,
            setinvoiceType,
            updateTrack,
            setUpdateTrack,
            returnAmount,
            setReturnAmount,
            setSpecialDiscount,
            specialDiscount,
            setPaymentMethod,
            paymentMethod,
            invoiceId,
            setInvoiceId,
            cart,
            setCart,
            invoiceReload,
            setInvoiceReload,
            stickerCart,
            setStickerCart,
            allDiscount,
            setAllDiscount,
            allSubTotal,
            setAllSubTotal,
            allSubTotalWithoutDiscount,
            setAllSubTotalWithoutDiscount,
            invoice,
            setInvoice,
            setPrescriptionImage,
            prescriptionImage,
            paidAmount , setPaidAmount,
            selectedInvoice,setSelectedInvoice
                   }}>
            <div style={{ backgroundColor: '#FFFFFF' }} className="page-content ">
                {
                    user.user_type === "sales" || user.user_type === "cashier"

                        ?
                        <CashierPerson />
                        :

                        <>
                            <ManagementPerson />
                        </>

                }
            </div>
        </propsContext.Provider>

    )
}