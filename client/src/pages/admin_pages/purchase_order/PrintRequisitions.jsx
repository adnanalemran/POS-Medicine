import React, {useEffect, useRef, useState} from 'react';
import {HiLocationMarker} from "react-icons/hi";
import {BsFillTelephoneFill} from "react-icons/bs";
import MaterialTable from 'material-table';
import './PurchaseOrder.css'
import logo from '../../../front_assets/Logo_Image/greatpharmalogo.png'
import {useNavigate, useParams} from "react-router-dom";
import {useReactToPrint} from 'react-to-print';
import http from "../../../http";


const PrintRequisitions = ({setIsOpen}) => {

    const [paymentMode, setPaymentMode] = useState([]);
    const [deliveryMode, setDeliveryMode] = useState([]);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const navigate = useNavigate();

    const [form_data, setFormData] = useState([]);
    const [cart, setCart] = useState([]);
    const {id} = useParams();

    // const columnsData = [
    //     {title: 'Item Code', field: 'itemCode'},
    //     {title: 'Name & Generic', field: 'nameAndGeneric'},
    //     {title: 'Brand Name', field: 'brandName'},
    //     {title: 'Dosage Form', field: 'dosageForm'},
    //     {title: 'Strength', field: 'strength'},
    //     {title: 'Packet Size', field: 'packetSize'},
    //     {title: 'Qty', field: 'qty'},
    //     {title: 'Rate', field: 'rate'},
    //     {title: 'Total', field: 'total'},
    // ]

    // const rowData = [
    //     {
    //         itemCode: '#5954',
    //         nameAndGeneric: 'Napa650mgetamol',
    //         brandName: 'Incepta',
    //         dosageForm: 'tablet',
    //         strength: '250mg',
    //         packetSize: '1*61 pack',
    //         qty: '10',
    //         rate: '100',
    //         total: '1000'
    //     },
    //     {
    //         itemCode: '#5954',
    //         nameAndGeneric: 'Napa650mgetamol',
    //         brandName: 'Incepta',
    //         dosageForm: 'Injectic',
    //         strength: '100mg',
    //         packetSize: '1*61 pack',
    //         qty: '20',
    //         rate: '200',
    //         total: '2000'
    //     },
    //     {
    //         itemCode: '#5954',
    //         nameAndGeneric: 'Napa650mgetamol',
    //         brandName: 'Incepta',
    //         dosageForm: 'Injectic',
    //         strength: '100mg',
    //         packetSize: '1*61 pack',
    //         qty: '20',
    //         rate: '200',
    //         total: '2000'
    //     },
    //     {
    //         itemCode: '#5954',
    //         nameAndGeneric: 'Napa650mgetamol',
    //         brandName: 'Incepta',
    //         dosageForm: 'Injectic',
    //         strength: '100mg',
    //         packetSize: '1*61 pack',
    //         qty: '20',
    //         rate: '200',
    //         total: '2000'
    //     },
    // ]



    
    // const [dmName, setdmName] = useState({});
    // const [pmName, setpmName] = useState({});


    useEffect(() => {
        http.get(`view-purchase-order/${id}`).then(res=> {
            if (res.data.status === 200) {
                console.log("view Purchase order",res.data.data);
                setFormData(res.data.data);
                setCart(res.data.req_details);
            } else {
                // setError(res.data.errors);
            }
        })

        http.get('delivery-mode').then(res => {
            console.log("res", res);
            setDeliveryMode(res.data.data);
        });
        http.get('payment-mode').then(res => {
            setPaymentMode(res.data.data);
        });

    },[])

    // setdmName(deliveryMode.find(delivery_mode => delivery_mode.id === form_data.delivery_mode_id));

    // console.log(deliveryMode);
    // console.log(form_data.delivery_mode_id);
    // console.log(dmName);




    return (


        <div className="page-content">

            <div className="custom-card patients-head ">
                <h5 className="fw-normal custom_py-3 px-2  text-start mb-2 card-title">Add Generic Name
                    <button className="btn btn-sm btn-warning float-end" onClick={() => navigate(-1)}>
                        <i className="fal fa-long-arrow-left"></i> Back</button>
                </h5>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body p-5 m-4" ref={componentRef}>
                            <div className="container-fluid d-flex justify-content-between">
                                <div className="col-lg-3 ps-0">
                                    {/*<a href="#" className="noble-ui-logo d-block mt-3">Noble<span>UI</span></a>*/}
                                    <img style={{width:'30%'}} className="noble-ui-logo d-block mt-3" src={logo} alt=""/>
                                    <p className="mt-1 mb-1"><b>Al-Shefa Pharma</b></p>
                                    <p>Lalbag, Dhaka <br/>
                                        +880 1749531677</p>
                                    {/*<h5 className="mt-5 mb-2 text-muted">Invoice to :</h5>*/}
                                    {/*<p>Joseph&nbsp;E&nbsp;Carr,<br /> 102, 102  Crown Street,<br /> London, W3 3PR.</p>*/}
                                </div>
                                <div className="col-lg-6">
                                    <div className="text-center mt-5">
                                        <h3>Requisition</h3>
                                    </div>
                                </div>
                                <div className="col-lg-3 pe-0">
                                    <h4 className="fw-bolder text-uppercase text-end mt-4 mb-2">Requisition</h4>
                                    <h6 className="text-end mb-5 pb-4"># {form_data.requisition_no}</h6>
                                    {/*<p className="text-end mb-1">Balance Due</p>*/}
                                    {/*<h4 className="text-end fw-normal">$ 72,420.00</h4>*/}
                                    {/*<h6 className="mb-0 mt-3 text-end fw-normal mb-2"><span className="text-muted">Invoice Date :</span> 25rd Jan 2022</h6>*/}
                                    {/*<h6 className="text-end fw-normal"><span className="text-muted">Due Date :</span> 12th Jul 2022</h6>*/}

                                </div>
                            </div>


                            <div className="d-flex container-fluid mt-5">
                                <div className="w-50">
                                    <p className="pt-2">Requisition No. <span className="req_no">: {form_data.requisition_no}</span></p>
                                    <p className="pt-2">Category <span className="req_cat">: {form_data.requisition_category_name}</span></p>
                                    <p className="pt-2">Exp. Date of Delivery <span>: {form_data.expected_date_of_delivery}</span></p>
                                    <p className="pt-2">Email <span className="req_email">: {form_data.requisitor_contact_email}</span></p>
                                    <p className="pt-2">R.Q. Date <span className="req_date">: {form_data.date_and_time}</span></p>
                                </div>
                                <div className="w-50 req_details_print">
                                    <p className="pt-2">P.O. Date <span className="po_date">: {form_data.date_and_time}</span></p>
                                    <p className="pt-2">At tests/Sample <span className="at_tst_smpl">: {form_data.test_sample}</span></p>
                                    <p className="pt-2">Supplier/Vendor <span>: {form_data.supplier_name}</span></p>
                                    <p className="pt-2">Delivery Mode <span className="dm_mode text-capitalize">: {form_data.preferred_delivery_mode}</span></p>
                                    {/* <p className="pt-2">Delivery Mode <span className="dm_mode text-capitalize">: value={deliveryMode.filter(delivery_mode => delivery_mode.id === form_data.delivery_mode_id)}</span></p> */}
                                    <p className="pt-2">Payment Mode <span className="pm_mode text-capitalize">: {form_data.preferred_payment_mode}</span></p>

                                </div>
                            </div>


                            <div className="container-fluid mt-5 d-flex justify-content-center w-100 po_table">
                                <div className="table-responsive w-100">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th className="text-end">Brand</th>
                                            <th className="text-end">MRP</th>
                                            <th className="text-end">Quantity</th>
                                            <th className="text-end">Total</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        {cart.length > 0 &&
                                        cart.map((item, i) => (

                                        <tr className="text-end">
                                            <td className="text-start" width={5}>{item.drug_code} : {item.drug_name}</td>
                                            <td>{item.title}</td>
                                            <td>{item.price}</td>
                                            <td>{item.req_unit}</td>
                                            <td>{item.totalPrice} /-</td>
                                        </tr>
                                        ))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="container-fluid mt-5 float-end d-flex mb-6">
                                <div className="w-50">
                                    <div className="w-50 po_sig">
                                        {/*<hr />*/}
                                        {/*<h6>Signature</h6>*/}
                                    </div>
                                </div>
                                <div className="w-50">
                                    <div className="table-responsive tot_bill">
                                        <table className="table">
                                            <tbody>
                                            <tr>
                                                <td>Total</td>
                                                <td className="text-end">{form_data.total_amount} /-</td>
                                            </tr>
                                            <tr>
                                                <td>Vat</td>
                                                <td className="text-end">{form_data.vat_amount} /-</td>
                                            </tr>
                                            <tr>
                                                <td>Tax</td>
                                                <td className="text-end">{form_data.tax_amount} /-</td>
                                            </tr>
                                            <tr>
                                                <td>Commission</td>
                                                <td className="text-end">{form_data.commission_amount} /-</td>
                                            </tr>
                                            <tr>
                                                <td>Total Bill Amount</td>
                                                <td className="text-end">{form_data.total_bill_amount} /-</td>
                                            </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {/*<div className="row">*/}
                                {/*    <div className="col-md-6 ms-auto">*/}
                                {/*        */}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>

                            <div className="container-fluid d-flex mt-5">

                                <div className="mng_sig">
                                    <hr />
                                    <h6 className="text-center">Approved By</h6>
                                </div>
                                <div className="app_sig">
                                    <hr />
                                    <h6 className="text-center">Accepted By</h6>
                                </div>
                                <div className="supp_sig">
                                    <hr />
                                    <h6 className="text-center">Delivered By</h6>
                                </div>

                                {/*<div className="row">*/}
                                {/*    <div className="col-md-4">*/}
                                {/*        <hr />*/}
                                {/*        <h6>Signature</h6>    */}
                                {/*    </div>*/}
                                {/*    <div className="col-md-4">*/}
                                {/*        <hr />*/}
                                {/*        <h6>Signature</h6>*/}
                                {/*    </div>*/}
                                {/*    <div className="col-md-4">*/}
                                {/*        <hr />*/}
                                {/*        <h6>Signature</h6>*/}
                                {/*    </div>*/}
                                {/*</div>*/}


                                {/*<div className="w-75">*/}
                                {/*    */}
                                {/*</div>*/}
                                {/*<div className="w-25">*/}
                                {/*    <hr />*/}
                                {/*    <h6>Signature</h6>*/}
                                {/*</div>*/}
                            </div>


                        </div>
                    </div>
                </div>
                <div className="container-fluid w-100">
                    <button onClick={handlePrint} className="btn btn-sm btn-success float-end text-uppercase mt-3"><i
                        className="fas fa-print"></i> Print
                    </button>
                </div>
            </div>


        </div>


    );
};

export default PrintRequisitions;