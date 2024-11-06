import React, { useEffect } from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import AuthUser from '../../../Components/AuthUser';
import Select from 'react-select';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';
import './Requisition.css';
import { useQuery } from 'react-query';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

function AddRequisition() {
  const navigate = useNavigate();
  const { http, user } = AuthUser();

  const [requisition_category, setRequisitionCategory] = useState([]);
  const [requisition_frequency, setRequisitionFrequency] = useState([]);
  const [delivery_mode, setDeliveryMode] = useState([]);
  const [payment_mode, setPaymentMode] = useState([]);
  const [requisition_category_select, setRequisitionCategorySelect] = useState('');
  const [delivery_mode_id, setDMSelect] = useState('');
  const [payment_mode_id, setPMSelect] = useState('');
  const [requisition_frequency_id, setRFSelect] = useState('');
  const [ts_select, setTSSelect] = useState('');

  const [commission, setCommission] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [purchase_order_no_id, setPurchaseOrderId] = useState('');
  const [spinner, setSpinner] = useState(true);
  // const [endDate,setEndDate] = useState();

  const alertToast = (text) => toast.error(text);

  const someDate = new Date();
  const date = someDate.setDate(someDate.getDate());
  const defaultDate = new Date(date).toISOString().split('T')[0];

  const numberOfDaysToAdd = 15;
  const afterDate = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
  const defaultAfterDate = new Date(afterDate).toISOString().split('T')[0];

  const [brands, setBrands] = useState([]);
  const [suplierDetails, setSuplierDetails] = useState({
    vat: 0,
    tax: 0,
    commission: 0,
  });
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
  const handleCatInput = (e) => {
    setRequisitionCategorySelect(e.id);
  };
  const handlePMInput = (e) => {
    setPMSelect(e.id);
  };

  const handleRFInput = (e) => {
    setRFSelect(e.id);
    const selected = requisition_frequency.find((f) => f.id === e.id);
    // console.log(e.requisition_frequency_name);
    // const selectedFrequency = parseFloat(selected.requisition_frequency_name);

    // const calculate_freq = addMonths(new Date(defaultDate),selectedFrequency);
    // setEndDate(calculate_freq);
    // console.log("frequency calculation", calculate_freq);
  };

  const handleDMInput = (e) => {
    // console.log("selected delivery mode",e.id);
    setDMSelect(e.id);
  };

  const handleTSInput = (e) => {
    setTSSelect(e.value);
  };
  const grid_view = (event) => {
    setIsActive((current) => !current);
  };

  // product requisition
  const [cart, setCart] = useState([]);
  // cart total
  const total_amount = cart.reduce(
    (total, item) => total + parseFloat(item.drug_price) * parseFloat(item.pcs),
    0,
  );
  const commission_amount = 0;
  const cart_subtotal = total_amount + commission_amount;
  const vat_amount =
    parseFloat(
      cart.reduce(
        (total, item) =>
          total +
          parseFloat(item.purchase_price_with_vat) * parseFloat(item.pcs),
        0,
      ),
    ) - cart_subtotal;
  const tax_amount = 0;
  const total_bill_amount = total_amount 

  const test_sample = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];

  console.log('this is Cart Data:::::', cart);
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
        <div className='text-capitalize'>{row.manufacturer}</div>
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
              // value={row.totalPrice}
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

  // req details data

  const [loading, setLoading] = useState(false);



  const removeMedicine = (item) => {
    const existCart = [...cart];
    const newCart = existCart.filter((pd) => pd.id !== item.id);
    setCart(newCart);
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
          // pd.totalPrice = (parseFloat(pd.drug_price) * pd.pcs).toFixed(2);
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



  const boxQtyHandler = (item, e) => {
    const existCart = [...cart];
    existCart.map((pd) => {
      if (pd.id === item.id) {
        const temp = parseFloat(e.target.value);

        if (!temp || temp < 0) {
          pd.noOfBox = 0;
          pd.pcs = 0;
          pd.totalPrice = 0;
        } else {
          const test = parseFloat(temp / pd.pktSize);
          pd.noOfBox = test.toFixed(2);

          pd.pcs = parseFloat(temp);
          pd.totalPrice = (
            parseFloat(pd.purchase_price_with_vat) * parseFloat(pd.pcs)
          ).toFixed(2);
        }
      }
    });
    setCart(existCart);
  };

  // product requisition

  // console.log(endDate);
  const [errors, setError] = useState([]);

  const [form_data, setFormData] = useState({
    requisition_no: '',
    requisition_category_id: '',
    expected_date_of_delivery: defaultAfterDate,
    requisitor_contact_email: '',
    requisitor_phone_no: '',
    date_and_time: defaultDate,
    test_sample: '',
    supplier_id: '',
    delivery_mode_id: '',
    payment_mode_id: '',
    recurring_order: '',
    requisition_frequency_id: '',
    frequency_start_date: defaultDate,
    frequency_end_date: '',
    special_instruction: '',
    reference_invoice_no: '',
    reference_order_no: '',

    total_amount: '',
    commission_amount: '',
    vat_amount: '',
    tax_amount: '',
    total_bill_amount: '',
    created_by: user.name,
  });

  const handleInput = (e) => {
    setFormData({
      ...form_data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    http.get('requisition-category').then((res) => {
      setRequisitionCategory(res.data.data);
    });

    http.get('supplier').then((res) => {
      setSupplier(res.data.data);
    });
    http.get('requisition-frequency').then((res) => {
      setRequisitionFrequency(res.data.data);
    });
    http.get('delivery-mode').then((res) => {
      // console.log("Delivery mode",res.data.data);
      setDeliveryMode(res.data.data);
    });
    http.get('payment-mode').then((res) => {
      setPaymentMode(res.data.data);
    });
    // Just for create requisition random number
    http.get(`/requisition`).then(async (res) => {
      const requisitor_email = user.email;
      const requisitor_mobile = user.mobile;

      if (res.data.data.length !== 0) {
        const rendomNumber = `GFRN-${res.data.data[0].id + 10001}`;
        setFormData({
          ...form_data,
          requisition_no: rendomNumber,
          requisitor_contact_email: requisitor_email,
          requisitor_phone_no: requisitor_mobile,
        });
      } else {
        setFormData({
          ...form_data,
          requisition_no: 'GFRN-10001',
          requisitor_contact_email: requisitor_email,
          requisitor_phone_no: requisitor_mobile,
        });
      }
    });
  }, []);

  const submitFormData = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // formData.append('src_primary_key', total_amount);
    // formData.append('src_primary_key', form_data.src_primary_key);
    formData.append('requisition_no', form_data.requisition_no);
    formData.append('requisition_category_id', requisition_category_select);
    formData.append(
      'expected_date_of_delivery',
      form_data.expected_date_of_delivery,
    );
    formData.append(
      'requisitor_contact_email',
      form_data.requisitor_contact_email,
    );
    formData.append('requisitor_phone_no', form_data.requisitor_phone_no);
    formData.append('date_and_time', form_data.date_and_time);
    formData.append('test_sample', ts_select);
    formData.append('supplier_id', purchase_order_no_id);
    formData.append('delivery_mode_id', delivery_mode_id);
    formData.append('payment_mode_id', payment_mode_id);
    formData.append('recurring_order', form_data.recurring_order);
    formData.append('requisition_frequency_id', requisition_frequency_id);
    formData.append('frequency_start_date', form_data.frequency_start_date);
    formData.append('frequency_end_date', form_data.frequency_end_date);
    formData.append('special_instruction', form_data.special_instruction);
    formData.append('created_by', form_data.created_by);
    formData.append('reference_invoice_no', form_data.reference_invoice_no);
    formData.append('reference_order_no', form_data.reference_order_no);
    // formData.append('requisition_category_id', form_data.requisition_category_id);
    formData.append('total_amount', total_amount.toFixed(2));
    formData.append('commission_amount', commission_amount.toFixed(2));
    formData.append('vat_amount', vat_amount.toFixed(2));
    formData.append('tax_amount', tax_amount.toFixed(2));
    formData.append('total_bill_amount', total_bill_amount.toFixed(2));

    if (cart.length > 0) {
      http.post('requisition', formData).then((res) => {
        console.log('When send a request for add requisition', res);

        if (res.data.status === 200) {
          cart.map((item, i) => {
            const academic = new FormData();
            academic.append('requisition_master_id', res.data.requisition.id);

            academic.append('drug_id', item.id);
            academic.append('boxType', item.boxType);
            academic.append('pktSize', item.pktSize);
            academic.append('noOfBox', item.noOfBox);

            academic.append('disc', item.disc);
            academic.append('unit', item.unit);
            academic.append('req_unit', item.pcs);
            academic.append('pcs', item.pcs);
            academic.append('price', item.price);
            academic.append('drug_price', item.drug_price);
            academic.append('totalPrice', item.totalPrice);
            academic.append(
              'purchase_price_with_vat',
              item.purchase_price_with_vat ? item.purchase_price_with_vat : 0,
            );
            academic.append('vat', item.vat ? item.vat : 0);
            http.post('save-requisitions-products', academic).then((res) => {
              console.log('save-requisition details', res);
            });
          });

          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: res.data.message,
            timer: 2500,
          });
          navigate('/requisitions');
        } else {
          console.log(
            'When send a request for add requisition',
            res.data.errors,
          );
          alertToast('Input Field required');
          setError(res.data.errors);
        }
      });
    } else {
      setError('You need to add medicine');
      alertToast('Need to add medicine');
    }
  };

  const [brand, setBrand] = useState('');
  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };
  const { data } = useQuery(
    brand,
    () => http.get(`/products-salse-counter/${brand}`).then((res) => res.data),
    {
      enabled: !!brand,
    },
  );
  console.log(data, "data")
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
            <p>{item.drug_price} tk</p>
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
        noOfBox: '',
        pcs: '',
        purchase_price_with_vat: parseFloat(item.drug_price),
        totalPrice:0 
      });
    }
    setCart(newCart);
  };

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

      {/* <form className="" onSubmit={submitFormData}> */}

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
                      <span
                        className={`text-${errors.requisition_no ? 'danger' : 'danger'
                          }`}
                      >
                        *
                      </span>
                    </label>
                    <div className='col-sm-7'>
                      <input
                        className={`form-control form-control-sm`}
                        type='text'
                        readOnly
                        id='exampleInputUsername2'
                        onChange={handleInput}
                        value={form_data.requisition_no}
                        name='requisition_no'
                      />
                    </div>
                    <span className='text-danger'>{errors.requisition_no}</span>
                  </div>
                  <div className='row mb-1'>
                    <label
                      htmlFor='exampleInputUsername2'
                      className='col-sm-5 col-form-label'
                    >
                      Category
                    </label>
                    <div className='col-sm-7'>
                      <Select
                        options={requisition_category}
                        onChange={handleCatInput}
                        placeholder={'Select'}
                        getOptionLabel={(requisition_category) =>
                          `${requisition_category.requisition_category_name}`
                        }
                        getOptionValue={(requisition_category) =>
                          `${requisition_category.id}`
                        }
                      />
                    </div>
                    <span className='text-danger'>
                      {errors.requisition_category_id}
                    </span>
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
                        // style={{border:`${errors.requisition_no ? '1px solid errorColor ' : '1px solid successColor'}`}}
                        type='date'
                        name='expected_date_of_delivery'
                        data-date-format='DD MMMM YYYY'
                        onChange={handleInput}
                        value={form_data.expected_date_of_delivery}
                        className='form-control form-control-sm'
                        id='exampleInputUsername2'
                      />

                      {/* <input type="date" id="start" name="trip-start"
                                                onChange={handleInput}
                                                value={form_data.expected_date_of_delivery}></input> */}
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
                      <span
                        className={`text-${errors.date_and_time ? 'danger' : 'danger'
                          }`}
                      >
                        *
                      </span>
                    </label>
                    <div className='col-sm-7'>
                      <input
                        type='date'
                        onChange={handleInput}
                        name='date_and_time'
                        value={form_data.date_and_time}
                        className='form-control form-control-sm'
                        id='exampleInputUsername2'
                      />
                    </div>
                    <span className='text-danger'>{errors.date_and_time}</span>
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
                      />
                    </div>
                    <span className='text-danger'>{errors.test_sample}</span>
                  </div>
                  <div className='row mb-1'>
                    <label
                      htmlFor='exampleInputUsername2'
                      className='col-sm-5 col-form-label'
                    >
                      Supplier/Vendor
                      <span
                        className={`text-${errors.supplier_id ? 'danger' : 'danger'
                          }`}
                      >
                        *
                      </span>
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
                      />
                    </div>
                    <span className='text-danger'>{errors.supplier_id}</span>
                  </div>
                  <div className='row mb-1'>
                    <label
                      htmlFor='exampleInputUsername2'
                      className='col-sm-5 col-form-label'
                    >
                      Delivery Mode
                      <span
                        className={`text-${errors.delivery_mode_id ? 'danger' : 'danger'
                          }`}
                      >
                        *
                      </span>
                    </label>
                    <div className='col-sm-7'>
                      <Select
                        options={delivery_mode}
                        onChange={handleDMInput}
                        placeholder={'Select'}
                        getOptionLabel={(delivery_mode) =>
                          `${delivery_mode.delivery_mode_name}`
                        }
                        getOptionValue={(delivery_mode) =>
                          `${delivery_mode.id}`
                        }
                      />
                    </div>
                    <span className='text-danger'>
                      {errors.delivery_mode_id}
                    </span>
                  </div>
                  <div className='row mb-1'>
                    <label
                      htmlFor='exampleInputUsername2'
                      className='col-sm-5 col-form-label'
                    >
                      Payment Mode
                      <span
                        className={`text-${errors.payment_mode_id ? 'danger' : 'danger'
                          }`}
                      >
                        *
                      </span>
                    </label>
                    <div className='col-sm-7'>
                      <Select
                        options={payment_mode}
                        onChange={handlePMInput}
                        placeholder={'Select'}
                        getOptionLabel={(payment_mode) =>
                          `${payment_mode.payment_mode_name}`
                        }
                        getOptionValue={(payment_mode) => `${payment_mode.id}`}
                      />
                    </div>
                    <span className='text-danger'>
                      {errors.payment_mode_id}
                    </span>
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
          <span className='btn btn-sm add_new_requisition mt-0 mb-1'>New</span>
          <div className='card'>
            <div className='card-body requisition_preview'>
              <h5>Requisition Preview</h5>
              <p className='mt-3'>
                <span className='requisition-preview-details'> Sub Total </span>
                : <span className='ms-3'></span> {total_amount.toFixed(2)}
              </p>
              <p className='mt-2'>
                <span className='requisition-preview-details'> Commission</span>
                : <span className='ms-3'></span> {commission_amount.toFixed(2)}
              </p>
              <p className='mt-2'>
                <span className='requisition-preview-details'> Vat</span>:
                <span className='ms-3'></span> 0.00
              </p>
              <p className='mt-2'>
                <span className='requisition-preview-details'> Tax</span>:
                <span className='ms-3'></span> 0.00
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
                                onChange={handleRFInput}
                                placeholder={'Select'}
                                getOptionLabel={(requisition_frequency) =>
                                  `${requisition_frequency.requisition_frequency_name}`
                                }
                                getOptionValue={(requisition_frequency) =>
                                  `${requisition_frequency.id}`
                                }
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
                <h6 className='ms-2'>Select Manufacturer</h6>
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
              {brand && (
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
              )}

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

      <button
        className='btn btn-sm btn-success float-end text-uppercase mt-3'
        onClick={submitFormData}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
          className='feather feather-save mb-1'
        >
          <path d='M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z'></path>
          <polyline points='17 21 17 13 7 13 7 21'></polyline>
          <polyline points='7 3 7 8 15 8'></polyline>
        </svg>
        Save
      </button>

      {/* </form> */}
      {/*requisition product*/}
    </div>
  );
}

export default AddRequisition;
