// import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
// import http from "../../../http";
// import {toast} from 'react-toastify';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import AuthUser from '../../../Components/AuthUser';
import Select from 'react-select';
// import MomentInput from "react-moment-input";
import MaterialTable from 'material-table';
import moment from 'moment';
import { ImCross } from 'react-icons/im';
import { useQuery } from 'react-query';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
// import {user} from "../../../../public/assets/vendors/feather-icons/feather";

function EditRequisition() {
  const { id } = useParams();

  const navigate = useNavigate();
  const { http, user } = AuthUser();

  const [requisition_category, setRequisitionCategory] = useState([]);
  const [requisition_frequency, setRequisitionFrequency] = useState([]);
  const [delivery_mode, setDeliveryMode] = useState([]);
  const [payment_mode, setPaymentMode] = useState([]);
  const [vat, setVat] = useState([]);
  const [tax, setTax] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [commission, setCommission] = useState([]);
  const [purchase_order_no_id, setPurchaseOrderId] = useState();
  // const [startDate, setStartDate] = useState(null);

  // console.log('asdf asdf asdf a', new Date());
  const grid_view = (event) => {
    setIsActive((current) => !current);
  };
  // const handlePoInput = (e) => {
  //     setPurchaseOrderId(e.target.value);
  // }

  const [selectedPoValue, setPoSelect] = useState();
  const [suplierDetails, setSuplierDetails] = useState({
    vat: 0,
    tax: 0,
    commission: 0,
  });
  const [brands, setBrands] = useState([]);
  const handlePoInput = (e) => {
    setSuplierDetails({
      ...suplierDetails,
      vat: e.vat ? parseFloat(e.vat) : 0,
      tax: e.tax ? parseFloat(e.tax) : 0,
      commission: e.fax ? parseFloat(e.fax) : 0,
    });
    setPurchaseOrderId(e.id);
    console.log(e, 'purchase order');
    http.get(`/supplier-brands/${e.id}`).then((res) => {
      if (res.status === 200) {
        if (res.data.data.length > 0) {
          setBrands(res.data.data);
        }
      }
    });
  };

  const [selectedReqCatValue, setReqCatSelect] = useState();
  const handleReqCatChange = (e) => {
    // alert(e.id);
    setReqCatSelect(e.id);
  };
  const [selectedDMValue, setDMSelect] = useState();
  const handleDMChange = (e) => {
    setDMSelect(e.id);
  };

  const [selectedPMValue, setPMSelect] = useState();
  const handlePMChange = (e) => {
    setPMSelect(e.id);
  };
  const [selectedRFValue, setRFSelect] = useState();
  const handleRFChange = (e) => {
    setRFSelect(e.id);
  };

  const [selectedTSValue, setTSSelect] = useState();
  const handleTSInput = (e) => {
    // alert(e.value)
    setTSSelect(e.value);
  };

  const test_sample = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];

  useEffect(() => {
    if (purchase_order_no_id !== null) {
      http.get(`supplier/${purchase_order_no_id}/edit`).then((res) => {
        if (res.data.status === 200) {
          setSuplierDetails({
            ...suplierDetails,
            vat: res.data.data?.vat,
            tax: res.data.data?.tax,
            commission: res.data.data?.commission,
          });
          setCommission(res.data.data.commission);
          // setFormData(res.data.data.id);
        } else {
          setError(res.data.errors);
        }
      });
    }
  }, [purchase_order_no_id]);

  // product requisition
  const [cart, setCart] = useState([]);

  // cart total
  // console.log(item)
  const total_amount = cart.reduce(
    (total, item) => total + parseFloat(item.drug_price * item.pcs),
    0,
  );
  // const commission_amount = cart.reduce((previousValue, currentValue) =>previousValue + (commission * parseFloat(currentValue.totalPrice)) / 100, 0);
  // const cart_subtotal = total_amount+commission_amount;
  const commission_amount = 0;
  const vat_amount = cart.reduce(
    (total, item) => total + parseFloat(item.vat * item.pcs),
    0,
  );
  const tax_amount = 0;
  const total_bill_amount = total_amount ;

  const [loading, setLoading] = useState(false);

  const removeMedicine = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this data!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const existCart = [...cart];
        const newCart = existCart.filter((pd) => pd.id !== item.id);
        setCart(newCart);
        http.delete(`/destroy-requisition-details/${item.id}`).then((res) => {
          console.log('certificate row Detele');
        });
        Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
      }
    });
  };

  const proceedToApproval = (e) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to send these requisitions for approval!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, send it!',
    }).then((result) => {
      if (result.isConfirmed) {
        submitFormData(e, false);

        http.post(`/proceed-to-requisitions/${id}`).then((res) => {
          // console.log("certificate row Detele");
          navigate(`/requisitions`);
        });
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Send!',
          html: 'Your requisitions has been sent to manager.',
          timer: 2500,
        });
      }
    });
  };
  const sendRequestApprovalMail = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to send these requisition mail to manager!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, send it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // const existCart = [...cart];
        // const newCart = existCart.filter((pd) => pd.id !== item.id);
        // setCart(newCart);
        http.get(`/send-requisition-mail-to-manager/${id}`).then((res) => {
          // console.log("certificate row Detele");
          navigate(`/edit-requisition/${id}`);
        });
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Send!',
          html: 'Your requisition mail has been sent to manager.',
          timer: 2500,
        });
      }
    });
  };

  const proceedToApprove = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to approve these requisitions!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, send it!',
    }).then((result) => {
      if (result.isConfirmed) {
        http.post(`/proceed-to-approve/${id}`).then((res) => {
          navigate(`/edit-requisition/${id}`);
        });
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Send!',
          html: 'Requisition approved by manager.',
          timer: 2500,
        });
      }
    });
  };

  const boxSizeHandler = (item, e) => {
    const existCart = [...cart];
    existCart.map((pd) => {
      if (pd.id === item.id) {
        // const temp = e.target.value;
        const temp = parseFloat(e.target.value);
        if (!temp || temp < 0) {
          pd.noOfBox = 0;
          pd.pcs = 0;
          pd.totalPrice = 0;
        } else {
          pd.noOfBox = parseFloat(e.target.value);
          pd.pcs = (pd.noOfBox * parseFloat(item.pktSize) * parseFloat(item.box_size)).toFixed(2);
          pd.totalPrice = (parseFloat(pd.drug_price) * pd.pcs).toFixed(2);
          // pd.totalPrice = pd.price * item.pcs*parseFloat(e.target.value);
        }
      }
    });
    setCart(existCart);
  };

  const drugPriceHandler = (row, e) => {
    const existCart = [...cart];
    const { value } = e.target;
    existCart.map((item) => {
      if (item.id === row.id) {
        item.drug_price = parseFloat(value)/parseFloat(row.pcs);
        item.totalPrice = parseFloat(value);
      }
    });
    setCart(existCart);
  };


  // product requisition

  const [errors, setError] = useState([]);

  const [form_data, setFormData] = useState({
    requisition_no: '',
    requisition_category_id: '',
    expected_date_of_delivery: '',
    requisitor_contact_email: '',
    requisitor_phone_no: '',
    date_and_time: '',
    test_sample: '',
    supplier_id: '',
    delivery_mode_id: '',
    payment_mode_id: '',
    recurring_order: '',
    requisition_frequency_id: '',
    frequency_start_date: '',
    frequency_end_date: '',
    special_instruction: '',

    total_amount: '',
    commission_amount: '',
    vat_amount: '',
    tax_amount: '',
    total_bill_amount: '',
  });

  const handleInput = (e) => {
    setFormData({
      ...form_data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    http.get(`requisition/${id}/edit`).then((res) => {
      if (res.data.status === 200) {
        console.log('selected requisiton', res);
        setFormData(res.data.data);

        setCart(res.data.req_details);

        setCommission(res.data.data.commission);
        setReqCatSelect(res.data.data.requisition_category_id);
        setPoSelect(res.data.data.supplier_id);
        setPurchaseOrderId(res.data.data.supplier_id);
        setTSSelect(res.data.data.test_sample);
        setDMSelect(res.data.data.delivery_mode_id);
        setPMSelect(res.data.data.payment_mode_id);
        setRFSelect(res.data.data.requisition_frequency_id);
      } else {
        setError(res.data.errors);
      }
    });
    http.get('requisition-category').then((res) => {
      setRequisitionCategory(res.data.data);
    });
    http.get('requisition-vat-tax').then((res) => {
      // console.log(res.data.vat)
      setVat(res.data.vat);
      setTax(res.data.tax);
    });
    http.get('supplier').then((res) => {
      setSupplier(res.data.data);
    });
    http.get('requisition-frequency').then((res) => {
      setRequisitionFrequency(res.data.data);
    });
    http.get('delivery-mode').then((res) => {
      setDeliveryMode(res.data.data);
    });
    http.get('payment-mode').then((res) => {
      setPaymentMode(res.data.data);
    });
  }, []);

  const handlePriceChange = (row, e) => { };

  const columnsData = [
    {
      title: 'Name',
      field: `macrohealth_sg`,
      cellStyle: {
        width: 400,
        textAlign: 'center',
      },
    },

    {
      title: 'MF',
      field: 'boxType',
      render: (row) => (
        <div className='text-capitalize'>{row.title}</div>
      ),
      cellStyle: {
        textAlign: 'center',
      },
    },
    {
      title: 'Box Type',
      field: 'boxType',
      render: (row) => <div className='text-capitalize'>{row.boxType}</div>,
      cellStyle: {
        textAlign: 'center',
      },
    },
    {
      title: 'Box Size',
      field: 'boxType',
      render: (row) => <div className='text-capitalize'>{row.box_size}</div>,
      cellStyle: {
        textAlign: 'center',
      },
    },
    {
      title: 'Pkt Size',
      field: 'pktSize',
      render: (row) => <div className='text-capitalize'>{row.pktSize}</div>,
      cellStyle: {
        textAlign: 'center',
      },
    },
    {
      title: 'No. of Box/Bottle',
      field: 'noOfBox',
      render: (row) => (
        <div className='w-[40%] mx-auto text-center'>
          <input
            style={{ width: '80px', margin: 'auto' }}
            onChange={(e) => boxSizeHandler(row, e)}
            value={row.noOfBox}
            className='form-control form-control-sm text-center'
            type='number'
          />
        </div>
      ),
    },
    {
      title: 'Unit',
      field: 'unit',
      render: (row) => (
        <div className='text-capitalize text-center'>{row.unit}</div>
      ),
    },
    {
      title: 'Quantity',
      field: 'pcs',
      render: (row) => (
        <div className='w-[100%] text-center'>
          <input
            className='form-control form-control-sm'
            style={{ width: '80px', margin: 'auto' }}
            value={row.pcs}
            // onChange={(e) => boxQtyHandler(row, e)}
            disabled
            type='number'
          />
        </div>
      ),
    },
    {
      title: 'PP',
      field: 'drug_price',
      cellStyle: {
        textAlign: 'center',
      },
    },
    // {
    //   title: 'Vat',
    //   field: 'vat',
    //   render: (row) => {
    //     return (
    //       <div className='w-[100%] text-center'>
    //         <input
    //           className='form-control form-control-sm'
    //           style={{ width: '80px', margin: 'auto' }}
    //           onChange={(e) => handleVat(row, e)}
    //           type='number'
    //         />
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: 'Total PVT',
    //   field: 'purchase_price_with_vat',
    //   render: (row) => {
    //     return <span>{row.purchase_price_with_vat}</span>;
    //   },
    //   cellStyle: {
    //     textAlign: 'center',
    //   },
    // },

    {
      title: 'Total Price',
      field: 'totalPrice',
      render: (row) => {
        return (
          <div className='w-[100%] text-center'>
            <input
              className='form-control form-control-sm'
              style={{ width: '80px', margin: 'auto' }}
              value={row.totalPrice}
              onChange={(e) => drugPriceHandler(row, e)}
              type='number'
              disabled={row.pcs > 0 ? false : true}
            />
          </div>
        );
      },
      cellStyle: {
        textAlign: 'center',
      },
    },
    {
      title: 'Action',
      field: 'action',
      render: (row) => (
        <div className='d-flex justify-content-center gap-2'>
          <div>
            <button
              type='button'
              onClick={() => removeMedicine(row)}
              className='btn btn-sm action-btn'
            >
              <i className='far fa-trash'></i>
            </button>
          </div>
        </div>
      ),
    },
  ];

  const submitFormData = (e, show) => {
    e.preventDefault();
    // console.log("react selected req cat",selectedReqCatValue);
    const formData = new FormData();

    // formData.append('src_primary_key', total_amount);
    // formData.append('src_primary_key', form_data.src_primary_key);
    formData.append(
      'requisition_no',
      form_data.requisition_no == null ? '' : form_data.requisition_no,
    );
    // formData.append('requisition_category_id',  selectedReqCatValue);
    formData.append(
      'requisition_category_id',
      form_data.requisition_category_id == null ? '' : selectedReqCatValue,
    );
    formData.append(
      'expected_date_of_delivery',
      form_data.expected_date_of_delivery == null
        ? ''
        : form_data.expected_date_of_delivery,
    );
    formData.append(
      'requisitor_contact_email',
      form_data.requisitor_contact_email == null
        ? ''
        : form_data.requisitor_contact_email,
    );
    formData.append(
      'requisitor_phone_no',
      form_data.requisitor_phone_no == null
        ? ''
        : form_data.requisitor_phone_no,
    );
    formData.append(
      'date_and_time',
      form_data.date_and_time == null ? '' : form_data.date_and_time,
    );
    formData.append(
      'test_sample',
      form_data.test_sample == null ? '' : selectedTSValue,
    );
    formData.append(
      'supplier_id',
      form_data.supplier_id == null ? '' : purchase_order_no_id,
    );
    formData.append(
      'delivery_mode_id',
      form_data.delivery_mode_id == null ? '' : selectedDMValue,
    );
    formData.append(
      'payment_mode_id',
      form_data.payment_mode_id == null ? '' : selectedPMValue,
    );
    formData.append(
      'recurring_order',
      form_data.recurring_order == null ? '' : form_data.recurring_order,
    );
    formData.append(
      'requisition_frequency_id',
      form_data.requisition_frequency_id == null ? '' : selectedRFValue,
    );
    formData.append(
      'frequency_start_date',
      form_data.frequency_start_date == null
        ? ''
        : form_data.frequency_start_date,
    );
    formData.append(
      'frequency_end_date',
      form_data.frequency_end_date == null ? '' : form_data.frequency_end_date,
    );
    formData.append(
      'special_instruction',
      form_data.special_instruction == null
        ? ''
        : form_data.special_instruction,
    );
    formData.append(
      'reference_invoice_no',
      form_data.reference_invoice_no == null
        ? ''
        : form_data.reference_invoice_no,
    );
    formData.append(
      'reference_order_no',
      form_data.reference_order_no == null
        ? ''
        : form_data.reference_order_no,
    );

    formData.append('total_amount', total_amount.toFixed(2));
    formData.append('commission_amount', commission_amount.toFixed(2));
    formData.append('vat_amount', vat_amount.toFixed(2));
    formData.append('tax_amount', tax_amount.toFixed(2));
    formData.append('total_bill_amount', total_bill_amount.toFixed(2));

    http.post(`requisition/update/${id}`, formData).then((res) => {
      if (res.data.status === 200) {
        console.log(cart);
        cart.map((item, i) => {
          const academic = new FormData();
          academic.append('requisition_master_id', `${id}`);

          academic.append('boxType', item.boxType);
          academic.append('pktSize', item.pktSize);
          academic.append('noOfBox', item.noOfBox);
          academic.append('disc', item.disc);

          // academic.append('pcs', item.pcs);
          academic.append('drug_id', item.drug_id);
          academic.append('drug_price', item.drug_price);
          academic.append('unit', item.unit);
          academic.append('req_unit', item.pcs);
          academic.append('pcs', item.pcs);
          academic.append('totalPrice', item.totalPrice);

          if (item.src_primary_key) {
            academic.append('drug_id', item.id);
            http.post('save-requisitions-products', academic).then((res) => {
              console.log('save-requisitions-products');
            });
          } else {
            http
              .post(`/update-requisitions-products/${item.id}`, academic)
              .then((res) => {
                console.log('update-supplier-social-media');
              });
          }
        });

        if (show) {
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: res.data.message,
            timer: 2500,
          });
        }
        navigate('/requisitions');
      } else {
        setError(res.data.errors);
      }
    });
  };

  const [brand, setBrand] = useState('');
  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };
  const { data } = useQuery(
    'current-stock',
    () => http.get(`/products-salse-counter/${brand}`).then((res) => res.data),
    {
      enabled: !!brand,
    },
  );

  const formatResult = (item) => {
    return (
      <>
        <div
          onClick={() => {
            medicineSelect(item);
          }}
          className={`row d-flex align-items-center search-format  `}
        >
          <div className='col-5'>
            <p>
              {item.macrohealth_sg} - {item?.drug_description}
            </p>
            <p className='ms-2'>{item?.generic_Name}</p>
          </div>
          <div className='col-3'>
            <p>{item?.manufacturer}</p>
          </div>
          <div className='col-2'>
            <p>{item.price} tk</p>
          </div>
          <div className='col-2 '>
            <div className='row'>
              <div className='col-7'>
                <p>
                  {item?.current_stock?.stock ? item.current_stock.stock : 0}
                </p>
              </div>
              <div className='col-3'>
                <i
                  style={{ fontSize: '12px' }}
                  className={`fas fa-circle ${item?.current_stock?.stock ? 'text-success' : ' text-danger'
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
        pcs: 0,

        totalPrice:
          item.cash_drug_discount &&
            item.cash_drug_discount != 0 &&
            item.cash_drug_discount !== null
            ? parseInt(item.price) * 0 * 0 -
            (parseInt(item.price) * item.cash_drug_discount * 0 * 0) / 100
            : parseInt(item.price) * 0 * 0,
        toalPriceWitoutDiscount: item.price * 0 * 0,
      });
    }
    setCart(newCart);
  };
  console.log(cart, 'dde');
  return (
    <div className='page-content'>
      <div className='custom-card patients-head '>
        <h5 className='fw-normal custom_py-3 px-2  text-start mb-2 card-title'>
          Add Requisition
          <button
            className='btn btn-sm btn-warning float-end'
            onClick={() => navigate(-1)}
          >
            <i class='fal fa-long-arrow-left'></i> Back
          </button>
        </h5>
      </div>
      <div className='custom-card patients-head '>
        <h5 className='fw-normal custom_py-3 px-2  text-start mb-2 card-title'>
          {user?.organization?.name}
        </h5>
      </div>
      {/* <form  onSubmit={}> */}

      <div className='row'>
        <div className='col-lg-8 col-md-8'>
          <div className='card'>
            <div className='card-body'>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='row mb-1'>
                    <label
                      htmlFor='exampleInputUsername2'
                      className='col-sm-5 col-form-label'
                    >
                      Requisition No
                    </label>
                    <div className='col-sm-7'>
                      <input
                        type='text'
                        className='form-control form-control-sm'
                        readOnly
                        id='exampleInputUsername2'
                        onChange={handleInput}
                        value={form_data.requisition_no}
                        name='requisition_no'
                      />
                    </div>
                  </div>
                  <div className='row mb-1'>
                    <label
                      htmlFor='exampleInputUsername2'
                      className='col-sm-5 col-form-label'
                    >
                      Category
                    </label>
                    <div className='col-sm-7'>
                      {/*<select className="form-select form-select-sm" name="requisition_category_id" onChange={handleInput}*/}
                      {/*        value={form_data.requisition_category_id} id="status">*/}
                      {/*    <option selected="" disabled="">Select</option>*/}
                      {/*    {*/}
                      {/*        requisition_category.map((item) => {*/}
                      {/*            return (*/}
                      {/*                <option value={item.id} key={item.id}>{item.requisition_category_name}</option>*/}
                      {/*            )*/}
                      {/*        })*/}
                      {/*    }*/}
                      {/*</select>*/}

                      <Select
                        options={requisition_category}
                        onChange={handleReqCatChange}
                        placeholder={'Select'}
                        getOptionLabel={(requisition_category) =>
                          `${requisition_category.requisition_category_name}`
                        }
                        getOptionValue={(requisition_category) =>
                          `${requisition_category.id}`
                        }
                        value={requisition_category.filter(
                          (requisition_category) =>
                            requisition_category.id ===
                            Number(selectedReqCatValue),
                        )}
                      />
                    </div>
                  </div>
                  <div className='row mb-1'>
                    <label
                      htmlFor='exampleInputUsername2'
                      className='col-sm-5 col-form-label'
                    >
                      EDOD
                    </label>
                    <div className='col-sm-7'>
                      <input
                        type='date'
                        name='expected_date_of_delivery'
                        onChange={handleInput}
                        value={form_data.expected_date_of_delivery}
                        className='form-control form-control-sm'
                        id='exampleInputUsername2'
                      />
                    </div>
                  </div>
                  <div className='row mb-1'>
                    <label
                      htmlFor='exampleInputUsername2'
                      className='col-sm-5 col-form-label'
                    >
                      Contact Email
                    </label>
                    <div className='col-sm-7'>
                      <input
                        type='text'
                        name='requisitor_contact_email'
                        onChange={handleInput}
                        value={form_data.requisitor_contact_email}
                        className='form-control form-control-sm'
                        id='exampleInputUsername2'
                        readOnly
                      />
                    </div>
                  </div>
                  <div className='row mb-1'>
                    <label
                      htmlFor='exampleInputUsername2'
                      className='col-sm-5 col-form-label'
                    >
                      Phone Number
                    </label>
                    <div className='col-sm-7'>
                      <input
                        type='text'
                        name='requisitor_phone_no'
                        onChange={handleInput}
                        value={form_data.requisitor_phone_no}
                        className='form-control form-control-sm'
                        id='exampleInputUsername2'
                        readOnly
                      />
                    </div>
                  </div>
                  <div className='row mb-1'>
                    <label
                      htmlFor='exampleInputUsername2'
                      className='col-sm-5 col-form-label'
                    >
                      Reference Invoice No
                      <span
                        className={`text-danger`}
                      >
                        *
                      </span>
                    </label>
                    <div className='col-sm-7'>
                      <input
                        type='text'
                        name='reference_invoice_no'
                        onChange={handleInput}
                        value={form_data.reference_invoice_no}
                        className='form-control form-control-sm'
                        id='exampleInputUsername2'

                      />
                    </div>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='row mb-1'>
                    <label
                      htmlFor='exampleInputUsername2'
                      className='col-sm-5 col-form-label'
                    >
                      Date & Time
                    </label>
                    <div className='col-sm-7'>
                      <input
                        type='date'
                        onChange={handleInput}
                        name='date_and_time'
                        value={form_data.date_and_time}
                        className='form-control form-control-sm'
                        id='exampleInputUsername2'
                        placeholder='64854645'
                      />
                    </div>
                  </div>
                  <div className='row mb-1'>
                    <label
                      htmlFor='exampleInputUsername2'
                      className='col-sm-5 col-form-label'
                    >
                      At Tests/Sample
                    </label>
                    <div className='col-sm-7'>
                      <Select
                        options={test_sample}
                        onChange={handleTSInput}
                        placeholder={'Select'}
                        getOptionLabel={(test_sample) => `${test_sample.label}`}
                        getOptionValue={(test_sample) => `${test_sample.value}`}
                        value={test_sample.filter(
                          (test_sample) =>
                            test_sample.value === selectedTSValue,
                        )}
                      />
                    </div>
                  </div>
                  <div className='row mb-1'>
                    <label
                      htmlFor='exampleInputUsername2'
                      className='col-sm-5 col-form-label'
                    >
                      Supplier/Vendor
                    </label>
                    <div className='col-sm-7'>
                      <Select
                        options={supplier}
                        onChange={handlePoInput}
                        placeholder={'Select'}
                        getOptionLabel={(supplier) =>
                          `${supplier.supplier_name}`
                        }
                        getOptionValue={(supplier) => `${supplier.id}`}
                        value={supplier.filter(
                          (supplier) => supplier.id === Number(selectedPoValue),
                        )}
                      />
                    </div>
                  </div>
                  <div className='row mb-1'>
                    <label
                      htmlFor='exampleInputUsername2'
                      className='col-sm-5 col-form-label'
                    >
                      Delivery Mode
                    </label>
                    <div className='col-sm-7'>
                      <Select
                        options={delivery_mode}
                        onChange={handleDMChange}
                        placeholder={'Select'}
                        getOptionLabel={(delivery_mode) =>
                          `${delivery_mode.delivery_mode_name}`
                        }
                        getOptionValue={(delivery_mode) =>
                          `${delivery_mode.id}`
                        }
                        value={delivery_mode.filter(
                          (delivery_mode) =>
                            delivery_mode.id === Number(selectedDMValue),
                        )}
                      />
                    </div>
                  </div>
                  <div className='row mb-1'>
                    <label
                      htmlFor='exampleInputUsername2'
                      className='col-sm-5 col-form-label'
                    >
                      Payment Mode
                    </label>
                    <div className='col-sm-7'>
                      <Select
                        options={payment_mode}
                        onChange={handlePMChange}
                        placeholder={'Select'}
                        getOptionLabel={(payment_mode) =>
                          `${payment_mode.payment_mode_name}`
                        }
                        getOptionValue={(payment_mode) => `${payment_mode.id}`}
                        value={payment_mode.filter(
                          (payment_mode) =>
                            payment_mode.id === Number(selectedPMValue),
                        )}
                      />
                    </div>
                  </div>
                  <div className='row mb-1'>
                    <label
                      htmlFor='exampleInputUsername2'
                      className='col-sm-5 col-form-label'
                    >
                      Reference Order No
                      <span
                        className={`text-danger`}
                      >
                        *
                      </span>
                    </label>
                    <div className='col-sm-7'>
                      <input
                        type='text'
                        name='reference_order_no'
                        onChange={handleInput}
                        value={form_data.reference_order_no}
                        className='form-control form-control-sm'
                        id='exampleInputUsername2'

                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-4 col-md-4 requisition_status_blog'>
          {/*{*/}
          {/*    form_data.requisition_status === "new" ?*/}
          {/*        <>*/}
          {/*            <span className="btn btn-sm add_new_requisition mt-0 mb-1">New</span>*/}
          {/*        </>*/}
          {/*        : ''*/}
          {/*}*/}

          {form_data.requisition_status == 'new' ? (
            <span className='btn btn-sm add_new_requisition mt-0 mb-1 text-capitalize'>
              {form_data.requisition_status.replaceAll('_', ' ')}
            </span>
          ) : form_data.requisition_status == 'pending' ? (
            <span className='btn btn-sm pending_requisition mt-0 mb-1 text-capitalize'>
              {form_data.requisition_status.replaceAll('_', ' ')}
            </span>
          ) : form_data.requisition_status == 'cancelled' ? (
            <span className='btn btn-sm cancelled_requisition mt-0 mb-1 text-capitalize'>
              {form_data.requisition_status.replaceAll('_', ' ')}
            </span>
          ) : form_data.requisition_status == 'approved' ? (
            <span className='btn btn-sm apprved_requisition mt-0 mb-1 text-capitalize'>
              {form_data.requisition_status.replaceAll('_', ' ')}
            </span>
          ) : form_data.requisition_status == 'confirmed' ? (
            <span className='btn btn-sm confirmed_requisition mt-0 mb-1 text-capitalize'>
              {form_data.requisition_status.replaceAll('_', ' ')}
            </span>
          ) : (
            ''
          )}
          <div className='card'>
            <div className='card-body requisition_preview'>
              <h5>Requisition Preview</h5>
              <p className='mt-3'>
                <span className='requisition-preview-details'> Sub Total </span>
                : <span className='ms-3'></span> {total_amount.toFixed(2)}
              </p>
              <p className='mt-2'>
                <span className='requisition-preview-details'>Commission</span>:{' '}
                <span className='ms-3'></span> {commission_amount.toFixed(2)}
              </p>
              <p className='mt-2'>
                <span className='requisition-preview-details'>Vat</span>:{' '}
                <span className='ms-3'></span> {vat_amount.toFixed(2)}
              </p>
              <p className='mt-2'>
                <span className='requisition-preview-details'>Tax</span>:{' '}
                <span className='ms-3'></span> {tax_amount.toFixed(2)}
              </p>
              <p className='mt-2'>
                <span className='requisition-preview-details'> Total </span>:
                <span className='ms-3'></span> {total_bill_amount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='row mt-2'>
        <div className='col-lg-12 col-md-12'>
          <div className='card'>
            <div className='accordion-card-body'>
              <div className='accordion' id='accordionExample'>
                <div>
                  <h2 className='accordion-header' id='headingThree'>
                    <button
                      className='accordion-button collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseThree'
                      aria-expanded='false'
                      aria-controls='collapseThree'
                    >
                      Recurring Order
                    </button>
                  </h2>
                  <div
                    id='collapseThree'
                    className='accordion-collapse collapse'
                    aria-labelledby='headingThree'
                    data-bs-parent='#accordionExample'
                  >
                    <div className='accordion-body'>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='form-check mb-2'>
                            <input
                              type='checkbox'
                              className='form-check-input'
                              name='recurring_order'
                              onClick={() => grid_view()}
                              id='checkDefault'
                              onChange={handleInput}
                              value='yes'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='checkDefault'
                            >
                              Recurring Order
                            </label>
                          </div>
                          <div
                            className={
                              isActive ? 'row mb-1' : 'd-none row mb-1'
                            }
                          >
                            <label
                              htmlFor='exampleInputUsername2'
                              className='col-sm-5 col-form-label'
                            >
                              Frequency
                            </label>
                            <div className='col-sm-7'>
                              <Select
                                options={requisition_frequency}
                                onChange={handleRFChange}
                                placeholder={'Select'}
                                getOptionLabel={(requisition_frequency) =>
                                  `${requisition_frequency.requisition_frequency_name}`
                                }
                                getOptionValue={(requisition_frequency) =>
                                  `${requisition_frequency.id}`
                                }
                                value={requisition_frequency.filter(
                                  (requisition_frequency) =>
                                    requisition_frequency.id ===
                                    selectedRFValue,
                                )}
                              />
                            </div>
                          </div>
                          <div
                            className={
                              isActive ? 'row mb-1' : 'd-none row mb-1'
                            }
                          >
                            <label
                              htmlFor='exampleInputUsername2'
                              className='col-sm-5 col-form-label'
                            >
                              Start Date
                            </label>
                            <div className='col-sm-7'>
                              <input
                                type='date'
                                name='frequency_start_date'
                                onChange={handleInput}
                                value={form_data.frequency_start_date}
                                className='form-control form-control-sm'
                                id='exampleInputUsername2'
                                placeholder='64854645'
                              />
                            </div>
                          </div>

                          <div className={isActive ? 'row' : 'd-none row'}>
                            <label
                              htmlFor='exampleInputUsername2'
                              className='col-sm-5 col-form-label'
                            >
                              End Date
                            </label>
                            <div className='col-sm-7'>
                              <input
                                type='date'
                                name='frequency_end_date'
                                onChange={handleInput}
                                value={form_data.frequency_end_date}
                                className='form-control form-control-sm'
                                id='exampleInputUsername2'
                              />
                            </div>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='special_instruction'
                              className='form-label'
                            >
                              Description
                            </label>
                            <textarea
                              name='special_instruction'
                              onChange={handleInput}
                              value={form_data.special_instruction}
                              className='form-control form-control-sm'
                              maxLength='100'
                              rows='5'
                              placeholder='Description...'
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*requisition list*/}

      <div className='row mt-2'>
        <div className='col-lg-12 col-md-12'>
          <div className='card'>
            <div className='row mt-2'>
              <div className='col-2'>
                <h6 className='ms-2'>Select Brand</h6>
              </div>
              <div className='col-8'>
                {brands.map((brand, index) => {
                  return (
                    <div className='form-check form-check-inline' key={index}>
                      <input
                        class='form-check-input'
                        type='radio'
                        name='inlineRadioOptions'
                        id='inlineRadio1'
                        value={brand.brand_id}
                        onChange={handleBrandChange}
                      />
                      <label class='form-check-label' for='inlineRadio1'>
                        {brand.brand_name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className='card-body medicine-custom-search'>
              <ReactSearchAutocomplete
                showIcon={false}
                placeholder={'Search Medicine'}
                items={data?.data}
                resultStringKeyName='macrohealth_sg'
                maxResults={5}
                onSelect={(item) => medicineSelect(item)}
                autoFocus
                fuseOptions={{ keys: ['macrohealth_sg'] }} // Search in the description text as well
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

              {loading && (
                <i
                  style={{ fontSize: '20px', marginLeft: '50%' }}
                  className=' mt-2 fas fa-spinner fa-spin'
                ></i>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='row mt-2'>
        <div className='col-md-12 col-mg-12'>
          <MaterialTable
            title={<h6 style={{ fontWeight: '500' }}>Product Details</h6>}
            columns={columnsData}
            data={cart}
            options={{
              actionsColumnIndex: -1,
              selection: false,
              search: false,
              showTitle: true,
              pageSize: 5,
              pageSizeOptions: [5, 10, 20, 50, 100],
              emptyRowsWhenPaging: false,
              rowStyle: {
                fontSize: '.75rem',
                textAlign: 'center',
              },
              headerStyle: {
                fontSize: '.75rem',
                border: '1px solid #c9c9c9',
                textAlign: 'center',
                zIndex: '0',
                whiteSpace: 'nowrap',
              },
            }}
          />
        </div>
      </div>

      {form_data.requisition_status === 'pending' ? (
        <button
          type='button'
          onClick={() => sendRequestApprovalMail()}
          className='btn btn-sm btn-success float-end text-uppercase mt-3 me-2'
        >
          <i className='fas fa-paper-plane'></i> Email
        </button>
      ) : (
        ''
      )}

      {(user.user_type === 'admin' || user.user_type === 'manager') &&
        form_data.requisition_status === 'new' ? (
        <>
          <button
            className='btn btn-sm btn-success float-end text-uppercase mt-3 '
            onClick={(e) => submitFormData(e, true)}
          >
            <i className='fas fa-save'></i> Update
          </button>
          <button
            type='button'
            onClick={(e) => proceedToApproval(e)}
            className='btn btn-sm btn-success float-end text-uppercase mt-3 me-2'
          >
            <i className='fas fa-paper-plane'></i> Proceed To Approval
          </button>
        </>
      ) : (
        ''
      )}

      {(user.user_type === 'admin' || user.user_type === 'manager') &&
        form_data.requisition_status === 'pending' ? (
        <>
          <button
            className='btn btn-sm btn-success float-end text-uppercase mt-3 '
            onClick={(e) => submitFormData(e, true)}
          >
            <i className='fas fa-save'></i> Update
          </button>
          <button
            type='button'
            onClick={(e) => proceedToApprove(e)}
            className='btn btn-sm btn-success float-end text-uppercase mt-3 me-2'
          >
            <i className='fas fa-paper-plane'></i> Approve
          </button>
        </>
      ) : (
        ''
      )}
    </div>
  );
}

export default EditRequisition;
