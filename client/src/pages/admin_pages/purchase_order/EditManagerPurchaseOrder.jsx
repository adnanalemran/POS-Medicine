import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import http from '../../../http';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AuthUser from '../../../Components/AuthUser';
import moment from 'moment';
// import {user} from "../../../../public/assets/vendors/feather-icons/feather";
import Select from 'react-select';
import MaterialTable from 'material-table';
import { ImCross } from 'react-icons/im';
function EditManagerPurchaseOrder() {
  const { id } = useParams();

  const navigate = useNavigate();
  const { http, user } = AuthUser();

  const [purchase_order_no_id, setPurchaseOrderId] = useState();

  const [commission, setCommission] = useState([]);

  const [delivery_mode, setDeliveryMode] = useState([]);
  const [delivery_channel, setDeliveryChannel] = useState([]);
  const [payment_mode, setPaymentMode] = useState([]);
  const [payment_channel, setPaymentChannel] = useState([]);

  const handlePoInput = (e) => {
    setPurchaseOrderId(e.id);
  };

  const [selectedDMValue, setDMSelect] = useState();
  const handleDMChange = (e) => {
    setDMSelect(e.id);
  };

  const [selectedPMValue, setPMSelect] = useState();
  const handlePMChange = (e) => {
    setPMSelect(e.id);
  };

  const [selectedPCValue, setPCSelect] = useState();
  const handlePCChange = (e) => {
    setPCSelect(e.id);
    setFormData({ ...form_data, preferred_payment_channel_id: e.id });
  };
  const [form_data, setFormData] = useState({
    requisition_no: '',
    requisition_category_id: '',
    expected_date_of_delivery: '',
    requisitor_contact_email: '',
    requisitor_phone_no: '',
    date_and_time: '',
    test_sample: '',
    supplier_id: '',
    supplier_vat: '',
    supplier_tax: '',
    delivery_mode: '',
    payment_mode: '',
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
    preferred_delivery_mode: '',
    preferred_payment_mode: '',
    preferred_payment_channel: '',
    delivery_channel: '',
  });
  const [selectedDCValue, setDCSelect] = useState();
  const handleDCChange = (e) => {
    setDCSelect(e.id);
    setFormData({ ...form_data, delivery_channel_id: e.id });
  };

  useEffect(() => {
    console.log('purchase_order_no_id', purchase_order_no_id);

    if (purchase_order_no_id !== null) {
      http.get(`view-purchase-order/${purchase_order_no_id}`).then((res) => {
        if (res.data.status === 200) {
          console.log('view Purchase orderaaaa', res.data.data);
          setFormData(res.data.data);
          setCart(res.data.req_details);
          setCommission(res.data.data.commission);
        } else {
          setError(res.data.errors);
        }
      });
    }
  }, [purchase_order_no_id]);

  // product requisition
  const [filteredMedicine, setFilteredMedicine] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchWord, setSearchWord] = useState('');

  // console.log("latest cart",cart)
  const total_amount = cart.reduce(
    (total, item) => total + parseFloat(item.totalPrice),
    0,
  );
  const commission_amount = cart.reduce(
    (previousValue, currentValue) =>
      previousValue + (commission * parseFloat(currentValue.totalPrice)) / 100,
    0,
  );
  const cart_subtotal = total_amount + commission_amount;
  const vat_amount = (cart_subtotal * form_data.supplier_vat) / 100;
  const tax_amount = (cart_subtotal * form_data.supplier_tax) / 100;
  const total_bill_amount =
    total_amount + vat_amount + tax_amount - commission_amount;

  const [activeId, setActiveId] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleKeyPress = (e) => {
    if (e.code === 'ArrowDown') {
      if (activeId < filteredMedicine.length - 1) {
        setActiveId((prev) => prev + 1);
      }
    } else if (e.code === 'ArrowUp') {
      if (activeId !== 0) {
        setActiveId((prev) => prev - 1);
      }
    } else if (e.code === 'Enter') {
      console.log('from editRequisition', cart);
      let alreadyExist = false;
      const newCart = [...cart];
      let item = filteredMedicine[activeId];
      console.log('from editRequisition item = ', item);

      newCart.map((item) => {
        if (
          item.id === filteredMedicine[activeId].id ||
          item.drug_id === filteredMedicine[activeId].id
        ) {
          console.log('from editRequisition selected medicine', item);
          item.qty++;
          alreadyExist = true;
        }
      });

      if (!alreadyExist && filteredMedicine.length > 0) {
        newCart.push({
          ...filteredMedicine[activeId],
          qty: 1,
          boxType: 'leaf',
          unit: 'pcs',
          pktSize: 10,
          noOfBox: 1,
          pcs: 10,
          // price: 20,
          disc: commission,
          totalPrice: item.price * 10,

          // totalPrice: 200,
        });
      }

      setCart(newCart);
    }
  };

  const medicineHandler = (item, i) => {
    let alreadyExist = false;
    const newCart = [...cart];
    newCart.map((pd) => {
      if (pd.id === item.id || pd.drug_id === item.id) {
        pd.qty++;
        alreadyExist = true;
      }
    });
    if (!alreadyExist) {
      newCart.push({
        ...item,
        qty: 1,
        boxType: 'leaf',
        unit: 'pcs',
        pktSize: 10,
        noOfBox: 1,
        pcs: 10,
        // price: 20,
        disc: commission,
        totalPrice: item.price * 10,
      });
    }
    setCart(newCart);
    setActiveId(i);
  };

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

  const confirmPO = (e) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to accept this P.O.!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, accept it!',
    }).then((result) => {
      if (result.isConfirmed) {
        submitFormData(e, false);
        // const existCart = [...cart];
        // const newCart = existCart.filter((pd) => pd.id !== item.id);
        // setCart(newCart);
        http
          .post(`/confirm-po/${id}`, {
            manager_email: user.email,
            supplier_email: form_data.supplier_email,
            data: JSON.stringify(cart),
          })
          .then((res) => {
            // console.log("certificate row Detele");
            navigate(`/manager-purchase-order`);
            Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: 'Send!',
              html: 'Your requisitions approval mail has been sent to sales.',
              timer: 2500,
            });
          })
          .catch((err) => {
            console.log(err);
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

        if (!temp || temp < 1) {
          pd.noOfBox = 1;
          pd.pcs = pd.pktSize;
          pd.totalPrice = (pd.price * pd.pktSize).toFixed(2);
        } else {
          pd.noOfBox = parseFloat(temp);
          pd.pcs = (pd.noOfBox * item.pktSize).toFixed(2);
          pd.totalPrice = (pd.price * pd.pcs).toFixed(2);
          // pd.totalPrice = pd.price * item.pcs*parseFloat(e.target.value);
        }
      }
    });
    setCart(existCart);
  };

  const boxQtyHandler = (item, e) => {
    const existCart = [...cart];
    existCart.map((pd) => {
      if (pd.id === item.id) {
        const temp = parseFloat(e.target.value);

        if (!temp || temp < 1) {
          pd.noOfBox = 1;
          pd.pcs = pd.pktSize;
          pd.totalPrice = (pd.drug_price * pd.pktSize).toFixed(2);
        } else {
          const test = parseFloat(temp / pd.pktSize);
          pd.noOfBox = test.toFixed(2);
          pd.pcs = temp;
          pd.totalPrice = (pd.drug_price * temp).toFixed(2);
        }
      }
    });
    setCart(existCart);
  };

  // product requisition

  const [errors, setError] = useState([]);

  // const handleInput = (e) => {
  //     setFormData({
  //         ...form_data, [e.target.name]: e.target.value
  //     });
  // }

  useEffect(() => {
    http.get(`view-purchase-order/${id}`).then((res) => {
      if (res.data.status === 200) {
        console.log('view Purchase order', res.data);
        setFormData(res.data.data);
        setCart(res.data.req_details);
        setCommission(res.data.data.commission);
        setDMSelect(res.data.data.delivery_mode_id);

        setPMSelect(res.data.data.payment_mode_id);
        setPCSelect(res.data.data.preferred_payment_channel_id);
        setDCSelect(res.data.data.delivery_channel_id);
      } else {
        console.log('res.data.errors', res.data.errors);
        setError(res.data.errors);
      }
    });

    http.get('delivery-mode').then((res) => {
      setDeliveryMode(res.data.data);
    });
    http.get('payment-mode').then((res) => {
      setPaymentMode(res.data.data);
    });
    http.get('payment-channel').then((res) => {
      setPaymentChannel(res.data.data);
    });
    http.get('delivery-channel').then((res) => {
      setDeliveryChannel(res.data.data);
    });
  }, []);

  // const handleChangeCertificate = (e, index) => {
  //     const {name, value} = e.target;
  //     const list = [...cart];
  //     list[index][name] = value;
  //     setCart(list);
  // }

  // console.log("set cart",cart)

  const columnsData = [
    // {
    //   title: 'Item Code',
    //   field: 'drug_code',
    //   cellStyle: {
    //     textAlign: 'center',
    //   },
    // },
    {
      title: 'Name',
      field: 'macrohealth_sg',
      width: '100 !important',
      cellStyle: {
        textAlign: 'center',
      },
    },

    {
      title: 'Box Type',
      field: 'boxType',
      render: (row) => (
        <div className='text-capitalize text-center'>{row.boxType}</div>
      ),
    },
    {
      title: 'Box Size',
      field: 'boxType',
      render: (row) => (
        <div className='text-capitalize text-center'>{row.box_size}</div>
      ),
    },
    {
      title: 'Pkt Size',
      field: 'pktSize',
      render: (row) => (
        <div className='text-capitalize text-center'>{row.pktSize}</div>
      ),
    },
    {
      title: 'No. of Box/Bottle',
      field: 'noOfBox',
      render: (row) => (
        <div className='w-[40%] mx-auto'>
          <input
            onChange={(e) => boxSizeHandler(row, e)}
            // defaultValue="1"
            style={{ width: '80px', margin: 'auto' }}
            value={row.noOfBox}
            className='form-control form-control-sm text-center'
            type='number'
            disabled
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
        <div className='w-[100%]'>
          <input
            className='form-control form-control-sm'
            value={row.pcs}
            style={{ width: '80px', margin: 'auto' }}
            onChange={(e) => boxQtyHandler(row, e)}
            type='number'
            disabled
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

    {
      title: 'Total Price',
      field: 'totalPrice',
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

  const submitFormData = (e, isFire) => {
    e.preventDefault();

    const formData = new FormData();

    // formData.append('src_primary_key', total_amount);
    // formData.append('src_primary_key', form_data.src_primary_key);
    formData.append(
      'requisition_no',
      form_data.requisition_no == null ? '' : form_data.requisition_no,
    );
    formData.append(
      'requisition_category_id',
      form_data.requisition_category_id == null
        ? ''
        : form_data.requisition_category_id,
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
      form_data.test_sample == null ? '' : form_data.test_sample,
    );
    formData.append(
      'supplier_id',
      form_data.supplier_id == null ? '' : form_data.supplier_id,
    );
    formData.append(
      'delivery_mode',
      form_data.delivery_mode == null ? '' : form_data.delivery_mode,
    );
    formData.append(
      'payment_mode',
      form_data.payment_mode == null ? '' : form_data.payment_mode,
    );
    formData.append(
      'recurring_order',
      form_data.recurring_order == null ? '' : form_data.recurring_order,
    );
    formData.append(
      'requisition_frequency_id',
      form_data.requisition_frequency_id == null
        ? ''
        : form_data.requisition_frequency_id,
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
      'requisition_category_id',
      form_data.requisition_category_id == null
        ? ''
        : form_data.requisition_category_id,
    );
    formData.append('total_amount', total_amount.toFixed(2));
    formData.append('commission_amount', commission_amount.toFixed(2));
    formData.append('vat_amount', vat_amount.toFixed(2));
    formData.append('tax_amount', tax_amount.toFixed(2));
    formData.append('total_bill_amount', total_bill_amount.toFixed(2));

    formData.append('preferred_delivery_mode_id', selectedDMValue);
    formData.append('preferred_payment_mode_id', selectedPMValue);
    formData.append('preferred_payment_channel_id', selectedPCValue);
    formData.append('delivery_channel_id', selectedDCValue);
    formData.append('po_creator', user.name);

    // formData.append('purchase_order_no_id', purchase_order_no_id);

    http.post(`update-purchase-order/${id}`, formData).then((res) => {
      console.log(res);
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
          academic.append('price', item.price);
          academic.append('unit', item.unit);
          academic.append('req_unit', item.req_unit);
          academic.append('pcs', item.pcs);
          academic.append('totalPrice', item.totalPrice);

          console.log('FromData Academic', academic);

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

        if (isFire) {
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: res.data.message,
            timer: 2500,
          });
        }

        navigate('/manager-purchase-order');
      } else {
        setError(res.data.errors);
      }
    });
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        console.log('Close');
        setSearchWord('');
        setFilteredMedicine([]);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className='page-content'>
      <div className='custom-card patients-head '>
        <h5 className='fw-normal custom_py-3 px-2  text-start mb-2 card-title'>
          Purchase Order
          <button
            className='btn btn-sm btn-warning float-end'
            onClick={() => navigate(-1)}
          >
            <i class='fal fa-long-arrow-left'></i> Back
          </button>
        </h5>
      </div>

      {/* <form  onSubmit={submitFormData}> */}

      <div className='row'>
        <div className='col-lg-6 col-md-6'>
          <div className='card purchase_order_info'>
            <div className='card-body'>
              <div className='row'>
                <div className='col-md-12'>
                  <h6 className='mb-3'>Purchase Order Info</h6>
                  <div className='row mb-3'>
                    <label htmlFor='exampleInputUsername2' className='col-sm-5'>
                      Purchase Order No
                    </label>
                    <div className='col-sm-7'>
                      : <span>{form_data.purchase_order_no}</span>
                    </div>
                  </div>
                  <div className='row mb-3'>
                    <label htmlFor='exampleInputUsername2' className='col-sm-5'>
                      P.O. Date
                    </label>
                    <div className='col-sm-7'>
                      :{' '}
                      <span>
                        {moment(form_data.po_create_date).format('DD-MM-YYYY')}
                      </span>
                    </div>
                  </div>
                  <div className='row mb-3'>
                    <label htmlFor='exampleInputUsername2' className='col-sm-5'>
                      Requisition No.
                    </label>
                    <div className='col-sm-7'>
                      : <span>{form_data.requisition_no}</span>
                    </div>
                  </div>
                  <div className='row mb-3'>
                    <label htmlFor='exampleInputUsername2' className='col-sm-5'>
                      R.Q. Date
                    </label>
                    <div className='col-sm-7'>
                      :{' '}
                      <span>
                        {form_data.date_and_time === null
                          ? ''
                          : moment(form_data.date_and_time).format(
                              'DD-MM-YYYY',
                            )}
                      </span>
                    </div>
                  </div>
                  <div className='row mb-3'>
                    <label htmlFor='exampleInputUsername2' className='col-sm-5'>
                      Submitted By
                    </label>
                    <div className='col-sm-7'>
                      : <span>{form_data.created_by}</span>
                    </div>
                  </div>
                  <div className='row mb-3'>
                    <label htmlFor='exampleInputUsername2' className='col-sm-5'>
                      Exp. Date of Delivery
                    </label>
                    <div className='col-sm-7'>
                      :{' '}
                      <span>
                        {form_data.expected_date_of_delivery === null
                          ? ''
                          : moment(form_data.expected_date_of_delivery).format(
                              'DD-MM-YYYY',
                            )}
                      </span>
                    </div>
                  </div>
                  <div className='row'>
                    <label htmlFor='exampleInputUsername2' className='col-sm-5'>
                      Date
                    </label>
                    <div className='col-sm-7'>
                      : <span>{moment().format('DD-MM-YYYY')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-6 col-md-6 requisition_status_blog'>
          <div className='card mb-2 supplier_info'>
            <div className='card-body'>
              <div className='row'>
                <div className='col-md-12'>
                  <h6 className='mb-2'>Supplier Info</h6>
                  <div className='row mb-1'>
                    <label htmlFor='exampleInputUsername2' className='col-sm-5'>
                      Category
                    </label>
                    <div className='col-sm-7'>
                      : <span>{form_data.requisition_category_name}</span>
                    </div>
                  </div>
                  <div className='row mb-1'>
                    <label htmlFor='exampleInputUsername2' className='col-sm-5'>
                      Name
                    </label>
                    <div className='col-sm-7'>
                      : <span>{form_data.supplier_name}</span>
                    </div>
                  </div>
                  <div className='row mb-1'>
                    <label htmlFor='exampleInputUsername2' className='col-sm-5'>
                      Contact Email
                    </label>
                    <div className='col-sm-7'>
                      : <span>{form_data.supplier_email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='card'>
            <div className='card-body'>
              <div className='row'>
                <div className='col-md-12'>
                  <h6 className='mb-1'>Delivery Details</h6>
                  <div className='row'>
                    <label
                      htmlFor='exampleInputUsername2'
                      className='col-sm-5 col-form-label'
                    >
                      Preferred Delivery Mode
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
                  <div className='row'>
                    <label
                      htmlFor='exampleInputUsername2'
                      className='col-sm-5 col-form-label'
                    >
                      Preferred Payment Mode
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
                  <div className='row'>
                    {/* <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Preferred Payment Channel</label> */}
                    <label
                      htmlFor='exampleInputUsername2'
                      className='col-sm-5 col-form-label'
                    >
                      Preferred Payment Channel
                      <span
                        className={`ms-1 text-${
                          errors.requisition_category_id ? 'danger' : 'dark'
                        }`}
                      >
                        *
                      </span>
                    </label>
                    <div className='col-sm-7'>
                      <Select
                        options={payment_channel}
                        onChange={handlePCChange}
                        placeholder={'Select'}
                        getOptionLabel={(payment_channel) =>
                          `${payment_channel.payment_channel_name}`
                        }
                        getOptionValue={(payment_channel) =>
                          `${payment_channel.id}`
                        }
                        value={payment_channel.filter(
                          (payment_channel) =>
                            payment_channel.id === Number(selectedPCValue),
                        )}
                      />
                    </div>
                  </div>
                  <div className='row'>
                    {/* <label htmlFor="exampleInputUsername2" className="col-sm-5 col-form-label">Delivery Channel</label> */}
                    <label
                      htmlFor='exampleInputUsername2'
                      className='col-sm-5 col-form-label'
                    >
                      Delivery Channel
                      <span
                        className={`ms-1 text-${
                          errors.requisition_category_id ? 'danger' : 'dark'
                        }`}
                      >
                        *
                      </span>
                    </label>
                    <div className='col-sm-7'>
                      <Select
                        options={delivery_channel}
                        onChange={handleDCChange}
                        placeholder={'Select'}
                        getOptionLabel={(delivery_channel) =>
                          `${delivery_channel.delivery_channel_name}`
                        }
                        getOptionValue={(delivery_channel) =>
                          `${delivery_channel.id}`
                        }
                        value={delivery_channel.filter(
                          (delivery_channel) =>
                            delivery_channel.id === Number(selectedDCValue),
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*requisition list*/}

      {/* <div className="row mt-2">
                <div className="col-lg-12 col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="mb-3">Product Details</h6>
                            {
                                form_data.requisition_status === 'PO_Created'
                                    ?
                                    <input
                                        type="text"
                                        placeholder="Search"

                                        onKeyDown={handleKeyPress}
                                        value={searchWord}
                                        onChange={(e) => {
                                            setSearchWord(e.target.value)
                                            if (e.target.value.length > 1) {
                                                setLoading(true);
                                                http
                                                    .get(
                                                        `search-drug/${e.target.value}`
                                                    )
                                                    .then((res) => {
                                                        setFilteredMedicine(res.data);
                                                        setLoading(false);
                                                    });
                                                setActiveId(0);
                                            } else {
                                                setFilteredMedicine([]);
                                                setLoading(false);
                                                setActiveId(0);
                                            }
                                        }}
                                        className="form-control form-control-sm"
                                    />
                                    :
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        onKeyDown={handleKeyPress}
                                        value={searchWord}
                                        onChange={(e) => {
                                            setSearchWord(e.target.value)
                                            if (e.target.value.length > 1) {
                                                setLoading(true);
                                                http
                                                    .get(
                                                        `search-drug/${e.target.value}`
                                                    )
                                                    .then((res) => {
                                                        setFilteredMedicine(res.data);
                                                        setLoading(false);
                                                    });
                                                setActiveId(0);
                                            } else {
                                                setFilteredMedicine([]);
                                                setLoading(false);
                                                setActiveId(0);
                                            }
                                        }}
                                        className="form-control form-control-sm"
                                    />

                            }


                            {
                                loading
                                &&
                                (<i
                                    style={{ fontSize: "20px", marginLeft: "50%" }}
                                    className=" mt-2 fas fa-spinner fa-spin"
                                ></i>
                                )
                            }

                            {
                                searchWord &&
                                <ImCross className="edit_close_icon" onClick={() => {
                                    setSearchWord("");
                                    setFilteredMedicine([])
                                }}></ImCross>
                            }

                            {filteredMedicine.length > 0 && !loading && (
                                <div className="search-result-container g-doc-scroll pt-2">
                                    {filteredMedicine.map((item, i) => (
                                        <div
                                            onClick={() => medicineHandler(item, i)}
                                            className={`${activeId === i && "active-medicine"
                                                } row filtered-medicine mb-2`}
                                        >
                                            
                                            <div className="col-4">
                                                <p>{item.drug_name}</p>
                                            </div>
                                            <div className="col-3">
                                                <p>Exp.date: June, 2022</p>
                                            </div>
                                            <div className="col-2">
                                                <p>
                                                    <span className="medicine-inStock">
                                                        In Stock{" "}
                                                        <i
                                                            style={{ fontSize: "7px" }}
                                                            className=" ms-2 fa-solid fa-circle"
                                                        ></i>
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            
                        </div>
                    </div>
                </div>
            </div> */}

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
        className='btn btn-sm btn-success float-end text-uppercase mt-3 '
        onClick={(e) => submitFormData(e, true)}
      >
        <i className='fas fa-save'></i> Update
      </button>

      <button
        type='button'
        onClick={(e) => confirmPO(e, false)}
        className='btn btn-sm btn-success float-end text-uppercase mt-3 me-2'
      >
        <i className='fas fa-paper-plane'></i> Accept
      </button>

      {/*{*/}
      {/*    form_data.requisition_status === "approved" ?*/}
      {/*        <button type="button" onClick={() => sendRequestApprovalMail()} className="btn btn-sm btn-success float-end text-uppercase mt-3 me-2">*/}
      {/*            <i className="fas fa-paper-plane"></i> Email*/}
      {/*        </button>*/}
      {/*        : ''*/}
      {/*}*/}

      {/* </form> */}
      {/*requisition product*/}
    </div>
  );
}

export default EditManagerPurchaseOrder;
