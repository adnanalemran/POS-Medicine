import React, { useContext, useEffect, useRef, useState } from 'react';
import { TiDocumentAdd } from 'react-icons/ti';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiPrinter } from 'react-icons/fi';
import { FaUserPlus } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';
import AuthUser from '../AuthUser';
import Modal from 'react-modal';
import QRCode from 'react-qr-code';
import Drawer from './Drawer';
// import TakePictureModal from "./TakePictureModal";
import logo from '../../front_assets/Pharmacy_images/pharmacy-logo.png';
import { Popover } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import RightSidebar from '../Common/RightSidebar';
import { propsContext } from '../dashboard';
import '../../CSS/Layout.css';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { memberContext } from '../../navbar/auth';
import moment from 'moment';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useQuery } from 'react-query';
import { FaCamera } from "react-icons/fa";
import Camera from './Camera';

const CashierPerson = () => {
  const { http, user } = AuthUser();
  const create = () => toast('Sticker Created!');
  const updated = () => toast('Sticker Updated');
  const alertToast = (text) => toast.error(text);
  const { data } = useQuery('current-stock', () =>
    http.get(`/current-stock-sales-counter`).then((res) => res.data),
  );
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '400px',
    },
  };
  const customStyles1 = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '260px',
      padding: '10px',
    },
  };


  const {
    cart,
    setCart,
    setAllSubTotal,
    setAllSubTotalWithoutDiscount,
    invoice,
    setInvoice,
    setStickerCart,
    invoiceReload,
    setInvoiceReload,
    invoiceId,
    setInvoiceId,
    setPaymentMethod,
    paymentMethod,
    setIsSpecialDiscount,
    setSpecialDiscount,
    setReturnAmount,
    updateTrack,
    setInvoicePaidUnpaid,
    paymentStatus,
    setPaymentStatus,
    autoReloadInvoice,
    setPrescriptionImage,
    setPaidAmount,
    setSelectedInvoice,
  } = useContext(propsContext);

  const { setCurrentMember, currentMember } = useContext(memberContext);

  useEffect(() => {
    http.get(`/invoice`).then(async (res) => {
      // console.log("all-invoices", res)

      if (res.data.data.length !== 0) {
        const rendomNumber = `INV-${res.data.data[0].id + 10001}`;
        setInvoice(rendomNumber);
        setCurrentMember({});
        setPaidAmount();
      } else {
        setInvoice('INV-10001');
        setCurrentMember({});
        setPaidAmount();
      }
    });
  }, [invoiceReload]);

  const [stickers, setStickers] = useState([]);
  const [selectedSticker, setSelectedSticker] = useState([]);
  const [openStickerModal, setOpenStickerModal] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [printStickers, setPrintStickers] = useState(null);

  const componentRefAllStickers = useRef();
  const handlePrintAllStickers = useReactToPrint({
    content: () => componentRefAllStickers.current,
  });

  // console.log("after clicking checked unchecked", selectedSticker);

  // End of Select with check box for printing stickers

  const boxQtyHandler = (item, e) => {
    const existCart = [...cart];
    existCart.map((pd) => {
      if (pd.id === item.id) {
        const temp = e.target.value;
        if (!temp) {
          pd.noOfBox = 0;
          pd.pcs = '';
          pd.totalPrice = 0;
          pd.totalPriceWithoutDiscount = 0;
        } else {
          if (parseFloat(temp) <= item.stock || parseFloat(temp) <= item.qty) {
            const test = parseFloat(temp / parseFloat(item.pktSize));
            // console.log("Calculated data",test);
            pd.noOfBox = test;
            pd.pcs = parseFloat(temp);
            pd.totalPrice = parseFloat(pd.drug.price) * parseFloat(pd.pcs);
            pd.totalPriceWithoutDiscount = parseFloat(pd.drug.price) * parseFloat(pd.pcs);
          } else {
            alertToast(
              `Not available more than ${item.stock ? item.stock : item.qty}`,
            );
          }
        }
      }
    });
    setCart(existCart);
  };



  useEffect(() => {
    if (cart.length > 0) {
      const subTotal = cart.reduce(
        (previousValue, currentValue) =>
          previousValue + parseFloat(currentValue.totalPrice),
        0,
      );
      const subTotalNoDisc = cart.reduce(
        (previousValue, currentValue) =>
          previousValue + parseFloat(currentValue.totalPrice),
        0,
      );
      // console.log('subTotal',subTotal)
      // console.log('discount',discount)
      setAllSubTotal(Number(subTotal).toFixed(2));
      setAllSubTotalWithoutDiscount(subTotalNoDisc);
      setStickerCart(cart);
    }
    // console.log('Discount main value', discount);
  }, [cart]);

  // Getting All invoices
  const [allInvoices, setAllInvoices] = useState([]);
  const [paidInvoices, setPaidInvoices] = useState([]);
  const [unPaidInvoices, setUnPaidInvoices] = useState([]);

  useEffect(() => {
    http.get('invoice').then((res) => {
      // console.log("All Invoices",res.data.data)
      setAllInvoices(res.data.data);
      setInvoicePaidUnpaid(res.data.data);

      setPaidInvoices(
        res.data.data.filter((item) => item.payment_status === 'Paid'),
      );
      // console.log("res.data?.data?.payment_status?.filter((item) => item === 'Paid')", res.data.data.filter((item) => item.payment_status === 'Paid'));
      setUnPaidInvoices(
        res.data.data.filter((item) => item.payment_status === 'Unpaid'),
      );
    });
  }, [updateTrack, autoReloadInvoice]);

  const handleIVInput = (e) => {
    // setPurchaseOrderId(e.id);
    setInvoiceId(e.id);
  };
  // End of getting All invoices
  const [update, setUpdate] = useState(false);
  const [pImage, setPImage] = useState('');
  // get selected invoice
  useEffect(() => {
    if (invoiceId !== null) {
      http.get(`view-selected-invoice/${invoiceId}`).then((res) => {
        console.log(res, 'prescription res');
        if (res.data.status === 200) {
          setSelectedInvoice(res.data.data);
          setPaymentMethod(res.data?.data?.discount_type);
          setAllSubTotalWithoutDiscount(res.data?.data?.sub_total);
          setCurrentMember({
            member_name: res.data?.data?.member_name,
            member_email: res.data?.data?.member_email,
            member_phone: res.data?.data?.member_phone,
          });
          //set paid unpaid status
          setPaymentStatus(res.data.data.payment_status);
          setCart(res.data.invoice_details);
          setInvoice(res.data.data.invoice_no);
          setPImage(res.data.data.prescription_image);
          setSpecialDiscount(res.data.data.special_discount);
        } else {
          // setError(res.data.errors);
        }
      });
    }
  }, [invoiceId, update]);

  // end of select invoice

  // sticker create
  const [stickerData, setStickerData] = useState({
    id: '',
    name: '',
    dose: '1',
    frequency: 'Daily',
    food: 'With Meal',
    route: 'Oral',
    others: '',
    qty: '',
    doctor: '',
    patient_name: '',
  });

  const createSticker = (item) => {
    // console.log("Items",item);

    let newStickerData = { ...stickerData };
    newStickerData.name = item.macrohealth_sg;
    newStickerData.qty = item.pcs;
    newStickerData.id = item.id;
    newStickerData.patient_name = currentMember.member_name;
    setStickerData(newStickerData);
    setIsOpen(true);
  };

  const removeMedicine = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#69b128',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const existCart = [...cart];
        let newSelectedStickers = [...selectedSticker];
        newSelectedStickers = newSelectedStickers.filter(
          (slt) => slt.id !== item.id,
        );
        const newCart = existCart.filter((pd) => pd.id !== item.id);
        setCart(newCart);
        setSelectedSticker(newSelectedStickers);

        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Deleted!',
          text: 'Your data has been deleted.',
          timer: 2500,
        });
      }
    });
  };

  const stickerModalOpen = (item) => {
    let newSticker = stickers.find((st) => st.id === item.id);
    setPrintStickers(newSticker);
    setOpenStickerModal(true);
  };

  const handleDoseInfo = (e) => {
    const { name, value } = e.target;
    setStickerData({ ...stickerData, [name]: value });
    // console.log("stickerData", stickerData);
  };

  // sticker print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const closeModal = () => {
    setIsOpen(false);
    setStickerData({
      id: '',
      name: '',
      dose: '1',
      frequency: 'Daily',
      food: 'With Meal',
      route: 'Oral',
      others: '',
      qty: '',
      doctor: '',
      patient_name: '',
    });
  };

  const addSticker = () => {
    const newSticker = [...stickers];
    let alreadyExist = false;
    newSticker.map((item) => {
      if (item.id === stickerData.id) {
        // console.log('from sticker old', item.id,stickerData.id);
        item.dose = stickerData.dose;
        item.frequency = stickerData.frequency;
        item.food = stickerData.food;
        item.route = stickerData.route;
        item.qty = stickerData.qty;
        item.others = stickerData.others;
        item.doctor = stickerData.doctor;
        item.patient_name = stickerData.patient_name;
        alreadyExist = true;
        updated();
      }
    });

    if (!alreadyExist) {
      newSticker.push({ ...stickerData });
      setStickers(newSticker);
      create();
    }

    setIsOpen(false);
    setStickerData({
      id: '',
      name: '',
      dose: '1',
      frequency: 'Daily',
      food: 'With Meal',
      route: 'Oral',
      others: '',
      qty: '',
      doctor: '',
    });
  };

  //   Clear all information
  const [searchMedicine, setSearchMedicine] = useState('');
  const clearInfo = () => {
    setCart([]);
    setInvoiceReload(!invoiceReload);
    setIsOpen(false);
    // setCurrentMember({});
    setInvoiceId();
    setSpecialDiscount(0);
    setReturnAmount(0);
    setPaymentMethod('Cash');
    setSelectedSticker([]);
    setPaymentStatus('Default');
    setPImage('');
    setSearchMedicine('');
    setSelectedInvoice({});
  };

  const formatResult = (item) => {
    return (
      <>
        <div
          className={`row d-flex align-items-center search-format ${item.stock < 1 ? 'bg-red text-white' : ''
            } `}
        >
          <div className='col-5'>
            <p>
              {item?.drug?.macrohealth_sg} - {item?.drug?.drug_description}
            </p>
            <p className='ms-2'>{item?.drug?.generic_name}</p>
          </div>
          <div className='col-3'>
            <p>{item?.drug?.manufacturer}</p>
          </div>
          <div className='col-2'>
            <p>{item.drug?.price} tk</p>
          </div>
          <div className='col-2 '>
            <div className='row'>
              <div className='col-7'>
                <p>{item.stock}</p>
              </div>
              <div className='col-3'>
                <i
                  style={{ fontSize: '12px' }}
                  className={`fas fa-circle ${item.stock < 1 ? 'text-danger' : 'text-success'
                    }`}
                ></i>
              </div>
            </div>
          </div>

        </div>
      </>
    );
  };

  const medicineSelect = (item) => {
    if (item.stock < 1) {
      toast.error('This product is out of stock');
    } else {
      let alreadyExist = false;
      const newCart = [...cart];

      newCart.map((pd) => {
        if (pd.id === item.id) {
          alreadyExist = true;
        }
      });

      if (!alreadyExist) {
        newCart.push({
          ...item,
          noOfBox: 0,
          pcs: '',
          pktSize: item.drug.pktSize,
          boxType: item.drug.boxType,
          expire_date: item.drug.expiry_date,
          totalPrice: 0,
          price: item.drug.price,
          totalPriceWithoutDiscount: 0,
        });
      }
      setCart(newCart);
    }
  };
  const imageURL = global.img_Url;
  const prescriptionImage = document.getElementById('prescription-image');
  console.log(cart, "cart")
  return (
    <>
      <div className={`col-12`}>
        <div className=''>
          {/* search start */}
          <div className='search-container pb-2 row'>
            <div className='search-box-container col-md-7 '>
              {/* </div> */}
              <ReactSearchAutocomplete
                showIcon={false}
                placeholder={'Search Medicine'}
                inputSearchString={searchMedicine || ''}
                onSearch={(value) => setSearchMedicine(value)}
                items={data}
                resultStringKeyName='name'
                maxResults={5}
                onSelect={(item) => medicineSelect(item)}
                autoFocus
                fuseOptions={{ keys: ['name'] }} // Search in the description text as well
                styling={{
                  borderRadius: '5px !important',
                  zIndex: 0,
                  minHeight: '36px',
                  position: 'static',
                  height: '36px',
                  fontSize: '13px',
                }}
                formatResult={formatResult}
              />
            </div>

            <div className='col-md-5 col-sm-12 d-flex search-invoice-section'>
              <div>
                <button
                  className='btn btn-primary btn-sm rounded px-2 mt-1 ms-4'
                  onClick={clearInfo}
                >
                  Clear
                </button>
              </div>
              <h6 className='mx-sm-2 text-xs mt-sm-2  mx-md-3 mt-1 whitespace-nowrap lg:text-[14px]'>
                Invoice No : {cart.length > 0 && invoice}
              </h6>
              {user.user_type === 'cashier' && (
                <Drawer
                  allInvoices={allInvoices}
                  paidInvoices={paidInvoices}
                  unPaidInvoices={unPaidInvoices}
                />
              )}
            </div>
          </div>
          {/* search end */}

          {/* prescription upload  */}
          <div className='prescription-upload pb-1 mt-2'>
            <div className='row'>
              <div className={`col-12`}>
                <div className='row'>
                  <div className='col-2 text-start'>
                    <p className='mt-1 mb-0 text-lg fw-bold lg:text-[14px] whitespace-nowrap ms-1 '>
                      Prescription Upload
                    </p>
                  </div>
                  <div className='col-4'>
                    <input
                      onChange={(e) => setPrescriptionImage(e.target.files[0])}
                      type='file'
                      accept='image/*'
                      id='prescription-image'
                      className='form-control form-control-sm ms-1'
                    />
                  </div>
                  <div className='col-1'>
                    {/* <FaCamera color='#69B128' size={20} /> */}
                    <Camera setPrescriptionImage={setPrescriptionImage} />
                    
                  </div>
                  <div className='col-4 d-flex'>
                    {user.user_type === 'cashier' && (
                      <div className='w-50'>
                        <Select
                          options={unPaidInvoices}
                          onChange={handleIVInput}
                          getOptionLabel={(unPaidInvoices) =>
                            `${unPaidInvoices.invoice_no}`
                          }
                          getOptionValue={(unPaidInvoices) =>
                            `${unPaidInvoices.invoice_no}`
                          }
                        />
                      </div>
                    )}
                    {invoiceId && (
                      <p
                        style={{ background: '#e4f1a3' }}
                        className='px-3 py-1 ms-1 rounded-pill fw-bold'
                      >
                        {paymentStatus}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* prescription upload  */}

          {/* medicine cart  */}

          <>
            <div
              style={{ marginLeft: '.85rem', marginRight: '.85rem' }}
              className='cart-container mt-2'
            >
              <div className='row'>
                {selectedSticker.length > 0 && (
                  <div className='d-flex justify-content-end my-2'>
                    <button
                      onClick={handlePrintAllStickers}
                      className='custom-btn'
                    >
                      Print All Stickers
                    </button>
                  </div>
                )}

                <table className='cart-table'>
                  <tr className='cart-table-head'>
                    <td width={'25%'}>Product Name</td>
                    <td>Exp. Date</td>
                    <td>Box Type</td>
                    <td> Size</td>
                    <td width={'6%'}>Box/Leaf</td>
                    <td>Unit</td>
                    <td width={'6%'}>Qty.</td>
                    <td>Discount</td>
                    <td>MRP</td>
                    <td>Total</td>
                    <td width={'8%'}>Action</td>
                  </tr>
                  {invoiceId ? (
                    <>
                      {cart.length > 0 &&
                        cart.map((item, i) => (
                          <tr key={i} className='border-bottom cart-table-body'>
                            <td width={'25%'}>{item.name}</td>
                            {/* <td>{item.batch}</td> */}
                            <td>{moment(item.expire_date).format('DD/MM/YYYY')}</td>
                            <td>{item?.boxType}</td>
                            <td>{item.pktSize}</td>

                            {paymentStatus !== 'Paid' ? (
                              <td width={'4%'}>
                                <input
                                  readOnly
                                  value={item.noOfBox}
                                  className='form-control form-control-sm '
                                  type='number'
                                />
                              </td>
                            ) : (
                              <td>{parseFloat(item.noOfBox).toFixed(2)}</td>
                            )}

                            <td style={{ textAlign: 'center' }}>Pcs</td>

                            {paymentStatus !== 'Paid' ? (
                              <td>
                                <input
                                  value={item.pcs}
                                  onChange={(e) => boxQtyHandler(item, e)}
                                  className='form-control form-control-sm'
                                  type='number'
                                />
                              </td>
                            ) : (
                              <td>{item.pcs}</td>
                            )}

                            <td style={{ textAlign: 'center' }}>0 %</td>

                            <td>
                              {item.drug
                                ? Number(item.drug.price).toFixed(2)
                                : Number(item.price).toFixed(2)}
                            </td>
                            <td width={'8%'}>
                              {/* <input type="text" value={item.cash_drug_discount ? ((item.price * item.pcs) - ((item.price * item.drug_discount * item.pcs) / 100)) : (item.price * item.pcs)} className="form-control form-control-sm" /> */}
                              {Number(item.totalPrice).toFixed(2)}
                            </td>
                            {paymentStatus !== 'Paid' && (
                              <td>
                                <TiDocumentAdd
                                  onClick={() => createSticker(item)}
                                  style={{
                                    fontSize: '16px',
                                    marginRight: '4px',
                                    cursor: 'pointer',
                                  }}
                                  title='Create Stiker'
                                />
                                <RiDeleteBinLine
                                  onClick={() => removeMedicine(item)}
                                  style={{
                                    fontSize: '16px',
                                    marginRight: '4px',
                                    cursor: 'pointer',
                                  }}
                                  title='Delete Item'
                                />
                                {stickers.map((stk) => {
                                  if (stk.id === item.id) {
                                    return (
                                      <FiPrinter
                                        onClick={() => stickerModalOpen(item)}
                                        style={{
                                          fontSize: '16px',
                                          cursor: 'pointer',
                                        }}
                                        title='Print Stiker'
                                      />
                                    );
                                  }
                                })}
                              </td>
                            )}
                          </tr>
                        ))}
                    </>
                  ) : (
                    <>
                      {cart.length > 0 &&
                        cart.map((item, i) => (
                          <tr key={i} className='border-bottom cart-table-body'>
                            <td width={'25%'}>{item?.drug?.macrohealth_sg}</td>
                            <td>
                              {moment(item?.drug?.expiry_date).format(
                                'DD-MM-YYYY',
                              )}
                            </td>
                            <td>{item?.drug?.boxType}</td>
                            <td>{item?.drug?.pktSize}</td>

                            {paymentStatus !== 'Paid' ? (
                              <td width={'4%'}>
                                <input
                                  readOnly
                                  value={item.noOfBox}
                                  className='form-control form-control-sm '
                                  type='number'
                                />
                              </td>
                            ) : (
                              <td>{parseFloat(item.noOfBox).toFixed(2)}</td>
                            )}

                            <td style={{ textAlign: 'center' }}>Pcs</td>

                            {paymentStatus !== 'Paid' ? (
                              <td>
                                <input
                                  value={item.pcs}
                                  onChange={(e) => boxQtyHandler(item, e)}
                                  className='form-control form-control-sm'
                                  type='number'
                                />
                              </td>
                            ) : (
                              <td>{item.pcs}</td>
                            )}

                            <td style={{ textAlign: 'center' }}>

                              0 %
                            </td>

                            <td>
                              {item.drug
                                ? Number(item.drug.price).toFixed(2)
                                : Number(item.price).toFixed(2)}
                            </td>
                            <td width={'8%'}>
                              {/* <input type="text" value={item.cash_drug_discount ? ((item.price * item.pcs) - ((item.price * item.drug_discount * item.pcs) / 100)) : (item.price * item.pcs)} className="form-control form-control-sm" /> */}
                              {Number(item.totalPrice).toFixed(2)}
                            </td>
                            {paymentStatus !== 'Paid' && (
                              <td>
                                <TiDocumentAdd
                                  onClick={() => createSticker(item)}
                                  style={{
                                    fontSize: '16px',
                                    marginRight: '4px',
                                    cursor: 'pointer',
                                  }}
                                  title='Create Stiker'
                                />
                                <RiDeleteBinLine
                                  onClick={() => removeMedicine(item)}
                                  style={{
                                    fontSize: '16px',
                                    marginRight: '4px',
                                    cursor: 'pointer',
                                  }}
                                  title='Delete Item'
                                />
                                {stickers.map((stk) => {
                                  if (stk.id === item.id) {
                                    return (
                                      <FiPrinter
                                        onClick={() => stickerModalOpen(item)}
                                        style={{
                                          fontSize: '16px',
                                          cursor: 'pointer',
                                        }}
                                        title='Print Stiker'
                                      />
                                    );
                                  }
                                })}
                              </td>
                            )}
                          </tr>
                        ))}
                    </>
                  )}
                </table>

                {/* sticker create modal start */}
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={() => setIsOpen(false)}
                  style={customStyles}
                  contentLabel='Example Modal'
                >
                  <p className='mb-4 fs-6'>{stickerData.name}</p>
                  <div className='row mb-2'>
                    <div className='col-3'>
                      <label>Dose</label>
                    </div>
                    <div className='col-9'>
                      <select
                        onChange={handleDoseInfo}
                        name='dose'
                        className='form-select form-select-sm mb-1'
                        aria-label='.form-select-sm example'
                      >
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='10 mls'>10 mls</option>
                        <option value='3.5 ml'>3.5 ml</option>
                        <option value='2.5 ml'>2.5 ml</option>
                        <option value='1/2'>1/2</option>
                      </select>
                    </div>
                  </div>
                  <div className='row mb-2'>
                    <div className='col-3'>
                      <label>Frequency</label>
                    </div>
                    <div className='col-9'>
                      <select
                        onChange={handleDoseInfo}
                        name='frequency'
                        className='form-select form-select-sm mb-1'
                        aria-label='.form-select-sm example'
                      >
                        <option value='Daily'>Daily</option>
                        <option value='TDS'>TDS</option>
                        <option value='BD'>BD</option>
                        <option value='At Night'>At Night</option>
                        <option value='In the evening'>In the evening</option>
                        <option value='Frequently'>Frequently</option>
                      </select>
                    </div>
                  </div>
                  <div className='row mb-2'>
                    <div className='col-3'>
                      <label>Food</label>
                    </div>
                    <div className='col-9'>
                      <select
                        onChange={handleDoseInfo}
                        name='food'
                        className='form-select form-select-sm mb-1'
                        aria-label='.form-select-sm example'
                      >
                        <option value='With Meal'>With Meal</option>
                        <option value='Before Meal'>Before Meal</option>
                        <option value='After Meal'>After Meal</option>
                      </select>
                    </div>
                  </div>
                  <div className='row mb-2'>
                    <div className='col-3'>
                      <label>Others</label>
                    </div>
                    <div className='col-9'>
                      <select
                        onChange={handleDoseInfo}
                        name='others'
                        className='form-select form-select-sm mb-1'
                        aria-label='.form-select-sm example'
                      >
                        <option value='Right Side'>Right Side</option>
                        <option value='Left Side'>Left Side</option>
                        <option value='Both Side'>Both Side</option>
                      </select>
                    </div>
                  </div>
                  <div className='row mb-2'>
                    <div className='col-3'>
                      <label>Route</label>
                    </div>
                    <div className='col-9'>
                      <select
                        onChange={handleDoseInfo}
                        name='route'
                        className='form-select form-select-sm mb-1'
                        aria-label='.form-select-sm example'
                      >
                        <option value='Oral'>Oral</option>
                        <option value='Injection'>Injection</option>
                        <option value='Tropical'>Tropical</option>
                        <option value='Rectal'>Rectal</option>
                      </select>
                    </div>
                  </div>
                  <div className='row mb-2'>
                    <div className='col-3'>
                      <label>Doctor</label>
                    </div>
                    <div className='col-7'>
                      <select
                        onChange={handleDoseInfo}
                        name='doctor'
                        className='form-select form-select-sm mb-1'
                        aria-label='.form-select-sm example'
                      >
                        <option defaultValue='Select'>Select</option>
                        <option value='Dr Wiwi'>Dr Wiwi</option>
                        <option value='Dr Blessing'>Dr Blessing</option>
                        <option value='Dr Sunshine'>Dr Sunshine</option>
                        <option value='Dr Grab'>Dr Grab</option>
                      </select>
                    </div>
                    <div className='col-2 d-flex justify-content-center align-items-center'>
                      <FaUserPlus
                        style={{
                          width: '80%',
                          height: '80%',
                          color: 'green',
                          cursor: 'pointer',
                        }}
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                      />
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                      >
                        <div className='left-popup p-2'>
                          <div className='row'>
                            <div className='col-3'>
                              <label>Name</label>
                            </div>
                            <div className='col-9'>
                              <input
                                type='text'
                                className='form-control form-control-sm'
                              />
                            </div>
                          </div>
                          <div className='row mt-2 mb-2'>
                            <div className='col-3'>
                              <label>Hospital</label>
                            </div>
                            <div className='col-9'>
                              <input
                                type='text'
                                className='form-control form-control-sm'
                              />
                            </div>
                          </div>
                          <div className='d-flex justify-content-end'>
                            <button
                              onClick={() => setAnchorEl(null)}
                              className='custom-btn me-2'
                            >
                              Cancel
                            </button>
                            <button className='custom-btn'>Add</button>
                          </div>
                        </div>
                      </Popover>
                    </div>
                  </div>
                  <div className='d-flex justify-content-end'>
                    <button onClick={closeModal} className='custom-btn me-2'>
                      Cancel
                    </button>
                    <button onClick={addSticker} className='custom-btn'>
                      Save
                    </button>
                  </div>
                </Modal>
                {/* sticker create modal end */}

                {/* sticker Print modal start */}
                <Modal
                  isOpen={openStickerModal}
                  onRequestClose={() => setOpenStickerModal(false)}
                  style={customStyles1}
                  contentLabel='Example Modal'
                >
                  <div ref={componentRef} className='d-flex align-items-center'>
                    <div className='sticker-print mt-2 mx-2'>
                      {printStickers ? (
                        <div className='row'>
                          <div className='col-9'>
                            <span className='sticker-patient-info-heading d-block'>
                              {printStickers.patient_name}
                            </span>
                            <div className='d-flex justify-content-between'>
                              <p>
                                <span className='sticker-patient-info-heading'>
                                  HN :
                                </span>
                                10223453
                              </p>
                              {/* <p><span className="sticker-patient-info-heading">DOB : </span> 03/05/1990</p> */}
                            </div>
                            <p>{printStickers.name}</p>
                            <span className='sticker-print-rule'>
                              Take {printStickers.route} {printStickers.dose}
                              {printStickers.frequency} {printStickers.food}
                            </span>
                          </div>
                          <div className='col-3'>
                            <div
                              style={{ marginLeft: '4px' }}
                              className='bg-warning px-1 rounded-1'
                            >
                              <span>Qty </span>
                              <span>{printStickers.qty}</span>
                            </div>
                            <div className='sticker-qr-code'>
                              <QRCode
                                value='Hello world'
                                style={{
                                  height: 'auto',
                                  maxWidth: '100%',
                                  width: '100%',
                                }}
                                viewBox={`0 0 256 256`}
                              />
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-7 d-flex'>
                              <img
                                style={{ height: '30px' }}
                                src={logo}
                                alt=''
                                className='img-fluid'
                              />
                              <span className='sticker-patient-info-heading mt-2'>
                                {user?.organization?.name}
                              </span>
                            </div>
                            <div className='col-5'>
                              <span className='sticker-patient-info-heading mt-2'>
                                {printStickers.doctor}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className='empty-sticker d-flex justify-content-center align-items-center'>
                          <h6>Please create a sticker !!</h6>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='d-flex justify-content-end mt-2'>
                    <button
                      onClick={() => setOpenStickerModal(false)}
                      className='custom-btn me-2'
                    >
                      Cancel
                    </button>
                    <button onClick={handlePrint} className='custom-btn'>
                      Print
                    </button>
                  </div>
                </Modal>
                {/* sticker print modal end */}

                {/*Strat All sticker print modal  */}
                {selectedSticker.length > 0 && (
                  <div
                    ref={componentRefAllStickers}
                    className='print-all-sticker'
                  >
                    {selectedSticker.map((st) => (
                      <div className='sticker-print mt-2 mx-2'>
                        <div className='row'>
                          <div className='col-9'>
                            <span className='sticker-patient-info-heading d-block'>
                              {st.patient_name}
                            </span>
                            <div className='d-flex justify-content-between'>
                              <p>
                                <span className='sticker-patient-info-heading'>
                                  HN :
                                </span>
                                10223453
                              </p>
                              {/* <p><span className="sticker-patient-info-heading">DOB : </span> 03/05/1990</p> */}
                            </div>
                            <p>{st.name}</p>
                            <span className='sticker-print-rule'>
                              Take {st.route} {st.dose} {st.frequency} {st.food}
                            </span>
                          </div>
                          <div className='col-3'>
                            <div
                              style={{ marginLeft: '4px' }}
                              className='bg-warning px-1 rounded-1'
                            >
                              <span>Qty </span>
                              <span>{st.qty}</span>
                            </div>
                            <div className='sticker-qr-code'>
                              <QRCode
                                value='Hello world'
                                style={{
                                  height: 'auto',
                                  maxWidth: '100%',
                                  width: '100%',
                                }}
                                viewBox={`0 0 256 256`}
                              />
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-7 d-flex'>
                              <img
                                style={{ height: '30px' }}
                                src={logo}
                                alt=''
                                className='img-fluid'
                              />
                              <span className='sticker-patient-info-heading mt-2'>
                                {user?.organization?.name}
                              </span>
                            </div>
                            <div className='col-5'>
                              <span className='sticker-patient-info-heading mt-2'>
                                {st.doctor}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* All sticker print modal end */}
              </div>
            </div>
          </>

          <RightSidebar pImage={prescriptionImage} setSearchMedicine={setSearchMedicine} setPImage={setPImage} />

          {pImage && pImage !== 'null' && (
            <div className='custom-card m-3 p-3'>
              <h3 className='text-center'> Prescription </h3>
              {
                pImage?.endsWith('.jpg') || pImage?.endsWith('.png') || pImage?.endsWith('.jpeg') || pImage?.endsWith('.webp') || pImage?.endsWith('.gif') ? 
                <img src={`${imageURL}/images/files/${pImage}`} className='prescription-img' alt='prescription' /> : 
                <img src={pImage} className='prescription-img' alt='prescription' />
              }
            </div>
          )}
        </div>
        {/* medicine cart */}
      </div>
    </>
  );
};

export default CashierPerson;
