import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import http from '../../../http';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AuthUser from '../../../Components/AuthUser';
import Select from 'react-select';
import MomentInput from 'react-moment-input';
import MaterialTable from 'material-table';
import moment from 'moment';
// import {user} from "../../../../public/assets/vendors/feather-icons/feather";

function ProceededRequisition() {
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

  // console.log('asdf asdf asdf a', new Date());
  const grid_view = (event) => {
    setIsActive((current) => !current);
  };
  // const handlePoInput = (e) => {
  //     setPurchaseOrderId(e.target.value);
  // }

  const [selectedPoValue, setPoSelect] = useState();
  const handlePoInput = (e) => {
    setPoSelect(e.id);
    setPurchaseOrderId(e.id);
  };

  const [selectedReqCatValue, setReqCatSelect] = useState();
  const handleReqCatChange = (e) => {
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
    setTSSelect(e.value);
  };

  const test_sample = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];
  const [supplierData, setSupplierData] = useState({
    vat: 0,
    tax: 0,
  });
  useEffect(() => {
    if (purchase_order_no_id !== null) {
      http.get(`supplier/${purchase_order_no_id}/edit`).then((res) => {
        if (res.data.status === 200) {
          console.log('view Purchase orderaaaa', res.data);
          setCommission(res.data.data.commission);
          setSupplierData(res.data.data);
          // setFormData(res.data.data.id);
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
  // const [total_amount, setTotal_amount] = useState(0);
  // useEffect(() => {
  //     let total = cart.reduce((total,item) => total+parseFloat(item.totalPrice),0)
  //     setTotal_amount(total)
  // },[cart])

  // cart total
  // console.log(item)
  console.log('latest cart', cart);
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
  const total_bill_amount =
    total_amount + vat_amount + tax_amount + commission_amount;

  // console.log(vat_amount)
  // cart total
  // console.log(discount)

  const [activeId, setActiveId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

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
      let alreadyExist = false;
      const newCart = [...cart];
      let item = filteredMedicine[activeId];
      newCart.map((item) => {
        if (item.id === filteredMedicine[activeId].id) {
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
      if (pd.id === item.id) {
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

  const proceedToApproval = () => {
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
        // const existCart = [...cart];
        // const newCart = existCart.filter((pd) => pd.id !== item.id);
        // setCart(newCart);
        http.post(`/proceed-to-requisitions/${id}`).then((res) => {
          // console.log("certificate row Detele");
          navigate(`/proceeded-requisition/${id}`);
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
          console.log(res, 'certificate row Detele');
          // navigate(`/requisitions`);
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

  const convertToPo = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to convert these requisition to P.O.!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, convert it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // const existCart = [...cart];
        // const newCart = existCart.filter((pd) => pd.id !== item.id);
        // setCart(newCart);
        http.get(`/convert-to-po/${id}`).then((res) => {
          navigate(`/requisitions`);
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
        // const existCart = [...cart];
        // const newCart = existCart.filter((pd) => pd.id !== item.id);
        // setCart(newCart);
        http.post(`/proceed-to-approve/${id}`).then((res) => {
          navigate(`/requisitions`);

          console.log('certificate row Detele');
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

  const boxTypeHandler = (item, e) => {
    const existCart = [...cart];
    existCart.map((pd) => {
      if (pd.id === item.id) {
        pd.boxType = e.target.value;
      }
    });
    setCart(existCart);
  };

  const unitHandler = (item, e) => {
    const existCart = [...cart];
    existCart.map((pd) => {
      if (pd.id === item.id) {
        pd.unit = e.target.value;
      }
    });
    setCart(existCart);
  };

  const pktSizeHandler = (item, e) => {
    const existCart = [...cart];
    existCart.map((pd) => {
      if (pd.id === item.id) {
        pd.pktSize = parseFloat(e.target.value);
        pd.req_unit = item.noOfBox * pd.pktSize;
        pd.totalPrice = pd.price * pd.req_unit;
      }
      setCart(existCart);
    });
  };
  const boxSizeHandler = (item, e) => {
    const existCart = [...cart];
    existCart.map((pd) => {
      if (pd.id === item.id) {
        pd.noOfBox = parseFloat(e.target.value);
        pd.req_unit = (pd.noOfBox * item.pktSize).toFixed(2);
        pd.totalPrice = (pd.price * pd.req_unit).toFixed(2);
        // pd.totalPrice = pd.price * item.pcs*parseFloat(e.target.value);
      }
    });
    setCart(existCart);
  };
  const boxQtyHandler = (item, e) => {
    const existCart = [...cart];
    existCart.map((pd) => {
      if (pd.id === item.id) {
        // pd.req_unit = parseFloat(e.target.value);
        // pd.totalPrice = pd.price * pd.req_unit;

        const temp = e.target.value;
        const test = parseFloat(temp / pd.pktSize);
        console.log('Calculated data', test);
        pd.noOfBox = test.toFixed(2);

        pd.req_unit = parseFloat(temp);
        pd.totalPrice = (pd.price * pd.req_unit).toFixed(2);
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
        console.log('requisiton details', res.data.req_details);
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
    // http.get(`/requisition`).then(async (res) => {
    //     console.log("requisition", res.data.data[0].id)
    //
    //     const rendomNumber = `GFRN-${res.data.data[0].id + 10001}`
    //     const requisitor_email = user.email
    //     const requisitor_mobile = user.mobile
    //     // console.log(requisitor_email)
    //     setFormData({
    //         ...form_data,
    //         requisition_no: rendomNumber,
    //         requisitor_contact_email: requisitor_email,
    //         requisitor_phone_no: requisitor_mobile,
    //     });
    //
    // })
  }, []);

  // const handleChangeCertificate = (e, index) => {
  //     const {name, value} = e.target;
  //     const list = [...cart];
  //     list[index][name] = value;
  //     setCart(list);
  // }

  // console.log("set cart",cart)

  const columnsData = [
    // { title: 'Item Code', field: 'drug_code' },
    { title: 'Name', field: 'macrohealth_sg', width: '100 !important' },
    { title: 'MF', field: 'title', width: '100 !important' },
    // { title: 'Class', field: 'class' },
    // { title: 'Batch', field: 'batch' },
    // { title: 'Exp Date', field: 'expiry_date', render: (row) => <div>{moment(row.expiry_date).format('DD-MM-YYYY')}</div> },
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
      field: 'box_size',
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
        <div className='mx-auto'>
          <input
            onChange={(e) => boxSizeHandler(row, e)}
            // defaultValue="1"
            style={{ width: '80px', margin: 'auto' }}
            readOnly
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
      render: (row) => <div className='text-capitalize'>{row.unit}</div>,
      cellStyle: {
        textAlign: 'center',
      },
    },
    {
      title: 'Quantity',
      field: 'pcs',
      render: (row) => (
        <div className='w-[100%]'>
          <input
            className='form-control form-control-sm'
            style={{ width: '80px', margin: 'auto' }}
            value={row.pcs}
            readOnly
            onChange={(e) => boxQtyHandler(row, e)}
            type='number'
          />
        </div>
      ),
    },
    {
      title: 'PP', field: 'drug_price',
      cellStyle: {
        textAlign: 'center',
      },
    },

    {
      title: 'Total Price', field: 'totalPrice'
      , cellStyle: {
        textAlign: 'center',
      }
    },
  ];

  const submitFormData = (e) => {
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
      form_data.test_sample == null ? '' : form_data.test_sample,
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
          academic.append('price', item.price);
          academic.append('unit', item.unit);
          academic.append('req_unit', item.req_unit);
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

        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: res.data.message,
          timer: 2500,
        });
        navigate('/requisitions');
      } else {
        setError(res.data.errors);
      }
    });
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
      <div className='custom-card patients-head '>
        <h5 className='fw-normal custom_py-3 px-2  text-start mb-2 card-title'>
          {user?.organization?.name}
        </h5>
      </div>
      <form onSubmit={submitFormData}>
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
                        <Select
                          options={requisition_category}
                          onChange={handleReqCatChange}
                          placeholder={'Select'}
                          isDisabled={true}
                          getOptionLabel={(requisition_category) =>
                            `${requisition_category.requisition_category_name}`
                          }
                          getOptionValue={(requisition_category) =>
                            `${requisition_category.id}`
                          }
                          value={requisition_category.filter(
                            (requisition_category) =>
                              requisition_category.id ===
                              Number(form_data.requisition_category_id),
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
                          readOnly
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
                          // onChange={handleInput}
                          disabled
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
                          readOnly
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
                          isDisabled={true}
                          getOptionLabel={(test_sample) =>
                            `${test_sample.label}`
                          }
                          getOptionValue={(test_sample) =>
                            `${test_sample.value}`
                          }
                          value={test_sample.filter(
                            (test_sample) =>
                              test_sample.value === form_data.test_sample,
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
                          isDisabled={true}
                          getOptionLabel={(supplier) =>
                            `${supplier.supplier_name}`
                          }
                          getOptionValue={(supplier) => `${supplier.id}`}
                          value={supplier.filter(
                            (supplier) =>
                              supplier.id === Number(form_data.supplier_id),
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
                          isDisabled={true}
                          getOptionLabel={(delivery_mode) =>
                            `${delivery_mode.delivery_mode_name}`
                          }
                          getOptionValue={(delivery_mode) =>
                            `${delivery_mode.id}`
                          }
                          value={delivery_mode.filter(
                            (delivery_mode) =>
                              delivery_mode.id ===
                              Number(form_data.delivery_mode_id),
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
                          isDisabled={true}
                          getOptionLabel={(payment_mode) =>
                            `${payment_mode.payment_mode_name}`
                          }
                          getOptionValue={(payment_mode) =>
                            `${payment_mode.id}`
                          }
                          value={payment_mode.filter(
                            (payment_mode) =>
                              payment_mode.id ===
                              Number(form_data.payment_mode_id),
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
                        // onChange={handleInput}
                        disabled
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
                  <span className='requisition-preview-details'>
                    {' '}
                    Sub Total{' '}
                  </span>
                  : <span className='ms-3'></span> {total_amount.toFixed(2)}
                </p>
                <p className='mt-2'>
                  <span className='requisition-preview-details'>
                    Commission
                  </span>
                  : <span className='ms-3'></span>{' '}
                  {commission_amount.toFixed(2)}
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
                                  isDisabled={true}
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
                                  readOnly
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
                                  readOnly
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
                                readOnly
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
              <div className='card-body'>
                <h6 className='mb-3'>Product Details</h6>
                <input
                  type='text'
                  placeholder='Search'
                  onKeyDown={handleKeyPress}
                  readOnly
                  value={searchWord}
                  onChange={(e) => {
                    setSearchWord(e.target.value);
                    if (e.target.value.length > 1) {
                      setLoading(true);
                      http.get(`search-drug/${e.target.value}`).then((res) => {
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
                  className='form-control form-control-sm'
                />
                {filteredMedicine.length > 0 && !loading && (
                  <div className='search-result-container g-doc-scroll pt-2'>
                    {filteredMedicine.map((item, i) => (
                      <div
                        onClick={() => medicineHandler(item, i)}
                        className={`${activeId === i && 'active-medicine'
                          } row filtered-medicine mb-2`}
                      >
                        {/*<div className="col-3">*/}
                        {/*    <p>{item.macrohealth_sg}</p>*/}
                        {/*</div>*/}
                        <div className='col-4'>
                          <p>{item.drug_name}</p>
                        </div>
                        <div className='col-3'>
                          <p>Exp.date: June, 2022</p>
                        </div>
                        <div className='col-2'>
                          <p>
                            <span className='medicine-inStock'>
                              In Stock
                              <i
                                style={{ fontSize: '7px' }}
                                className=' ms-2 fa-solid fa-circle'
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

        {(form_data.purchase_order_no === null &&
          form_data.requisition_status === 'confirmed') ||
          (form_data.purchase_order_no === null &&
            form_data.requisition_status === 'approved') ? (
          <button
            type='button'
            onClick={() => convertToPo()}
            className='btn btn-sm btn-success float-end text-uppercase mt-3 me-2'
          >
            <i className='fas fa-arrows-h'></i> Convert To P.O.
          </button>
        ) : (
          ''
        )}

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
        {user.user_type === 'admin' &&
          form_data.requisition_status === 'new' ? (
          <>
            <button
              className='btn btn-sm btn-success float-end text-uppercase mt-3 '
              type='submit'
            >
              <i className='fas fa-save'></i> Update
            </button>
            <button
              type='button'
              onClick={() => proceedToApproval()}
              className='btn btn-sm btn-success float-end text-uppercase mt-3 me-2'
            >
              <i className='fas fa-paper-plane'></i> Proceed To Approval
            </button>
          </>
        ) : (
          ''
        )}
        {(user.user_type === 'manager' || user.user_type === 'admin') &&
          form_data.requisition_status === 'pending' ? (
          <>
            {/* <button className="btn btn-sm btn-success float-end text-uppercase mt-3 " type="submit">
                                <i className="fas fa-save"></i> Update
                            </button> */}
            <button
              type='button'
              onClick={() => proceedToApprove()}
              className='btn btn-sm btn-success float-end text-uppercase mt-3 me-2'
            >
              <i className='fas fa-paper-plane'></i> Approve
            </button>
          </>
        ) : (
          ''
        )}
      </form>
      {/*requisition product*/}
    </div>
  );
}

export default ProceededRequisition;
