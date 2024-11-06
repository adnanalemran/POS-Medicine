import React, { useEffect } from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import {  useNavigate } from 'react-router-dom';
import moment from 'moment';
import Select from 'react-select';
import MaterialTable from 'material-table';
import AuthUser from '../../../../Components/AuthUser';
import { toast } from 'react-toastify';
import ReactDatePicker from 'react-datepicker';
function AddManagerStoreIn() {
  // const {id} = useParams();

  const alertToast = (text) => toast.error(text);
  const navigate = useNavigate();
  const { http, user } = AuthUser();
  const [supplier, setSupplier] = useState([]);
  const [selected_mrr_id, setSelected_mrr_id] = useState('');
  const [manufacturer_id, setMNId] = useState('');
  const [carrier_id, setCId] = useState('');


  // ------------Taher-------
  const [mrrData, setMrrData] = useState({});
  const someDate = new Date();
  const date = someDate.setDate(someDate.getDate());
  const defaultDate = new Date(date).toISOString().split('T')[0];

  const [mrr, setMrr] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedSelfAndRack, setSelectedSelfAndRack] = useState(0);
  const [storeInRecordNo, setStoreInRecordNo] = useState('');

  // let rackCount = 0;
  const handleRack = (e, item) => {
    // setSelectedRack(e.target.value);
    const newCart = [...cart];
    newCart.map((md) => {
      if (md.id === item.id) {
        md.rack = e.target.value;
      }
    });
    setCart(newCart);
  };

  // let selfCount = 0;
  const handleSelf = (e, item) => {
    // setSelectedSelf(e.target.value);
    const newCart = [...cart];
    newCart.map((md) => {
      if (md.id === item.id) {
        md.self = e.target.value;
      }
    });
    setCart(newCart);
  };

  useEffect(() => {
    // setSelectedSelfAndRack(0)
    cart.map((item) => {
      if (item.rack && item.self) {
        setSelectedSelfAndRack(selectedSelfAndRack + 1);
      }
    });

    console.log(cart.length);
  }, [cart]);

  const handleMRRInput = (e) => {
    setSelected_mrr_id(e.id);
  };
  const handleMNInput = (e) => {
    setMNId(e.id);
  };
  useEffect(() => {
    if (selected_mrr_id !== null) {
      http.get(`view-selected-mrr/${selected_mrr_id}`).then((res) => {
        // console.log("mrrrrrrrrrrr", res);
        if (res.data.status === 200) {
          setMrrData(res.data.data);
          setCId(res.data.data.carrier_id);
          setMNId(res.data.data.manufacturer_id);
          setCart(res.data.mrr_details);
        } else {
          // setError(res.data.errors);
        }
      });
    }
  }, [selected_mrr_id]);


  // product requisition

  const [errors, setError] = useState([]);

  const [form_data, setFormData] = useState({
    purchase_order_no_id: '',
    selected_mrr_id: '',
    manufacturer_id: '',
    supplier_id: '',
    mrr_no: '',
    carrier_id: '',
    delivery_date: defaultDate,
    carried_by: '',
    contact_no: '',
    vehicle_no: '',
    remarks: '',
    total_bill_amount: '',
    paid_amount: '',
    due_amount: '',
    delivery_no_docs: '',
    payment_type: '',
    mrr_expiry_date: '',
  });

  const handleInput = (e) => {
    setFormData({
      ...form_data,
      [e.target.name]: e.target.value,
    });
  };

  // --------------------------------------------

  useEffect(() => {
    http.get('mrr-dropdown').then((res) => {
      console.log('Get Mrr', res);
      setMrr(res.data.data);
    });
    http.get('supplier').then((res) => {
      setSupplier(res.data.data);
    });

    http.get(`/store-in-data`).then(async (res) => {
      if (res.data.data.length !== 0) {
        const randomNumber = `IN-${res.data.data[0].id + 10001}`;
        setStoreInRecordNo(randomNumber);
      } else {
        setStoreInRecordNo('IN-10001');
      }
    });
  }, []);
  const formatDate = (date) => {
    if (!date) return ''; // If date is null or undefined, return an empty string
    const [year, month, day] = date.split('-'); // Split the input date into year, month, and day
    return `${day}/${month}/${year}`; // Return the formatted date in dd/mm/yyyy format
  };

  const columnsData = [
    {
      title: 'Name',
      render: (row) => <div className='text-center'>{row.macrohealth_sg}</div>,
    },
    {
      title: 'Brand',
      render: (row) => <div className='text-center'>{row.manufacturer}</div>,
    },
    {
      title: 'Exp Date',
      field: 'expiry_date',
      render: (row) => (
        <div>
          <input type="date" onChange={(e) => handleExpDateChange(row, e.target.value)} className="form-control form-control-sm" />
        </div>
      ),
    },
    {
      title: 'Box Type',
      field: 'boxType',
      render: (row) => (
        <div className='text-capitalize text-center'>{row.boxType}</div>
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
            // onChange={(e) => boxSizeHandler(row, e)}
            value={row.noOfBox}
            style={{ width: '80px', margin: 'auto' }}
            readOnly
            className='form-control form-control-sm text-center'
            type='number'
          />
        </div>
      ),
    },

    {
      title: 'Total Qty.',
      field: 'req_unit',
      render: (row) => (
        <div className='w-[100%]'>
          <input
            className='form-control form-control-sm'
            value={row.req_unit}
            style={{ width: '80px', margin: 'auto' }}
            readOnly
            //    onChange={(e) => boxQtyHandler(row, e)}
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
      title: 'Bonus Qty',
      field: 'unit',
      render: (row) => (
        <div className='text-capitalize text-center'>{parseFloat(row.bonus_qty)}</div>
      ),
    },

    {
      title: 'PP',
      render: (row) => <div className='text-center'>{parseFloat(row?.price).toFixed(2)}</div>,
    },
    {
      title: 'VAT',
      render: (row) => <div className='text-center'>{parseFloat(row?.vat ? row?.vat : 0).toFixed(2)}</div>,
    },
    {
      title: 'Discount',
      render: (row) => <div className='text-center'>{parseFloat(row?.disc ? row?.disc : 0).toFixed(2)}</div>,
    },

    // { title: 'Purchase price', field: ''},

    {
      title: 'Total Price',
      field: 'totalPrice',
      render: (row) => (
        <div className='text-center'>{(parseFloat(row.totalPrice)).toFixed(2)}</div>
      )
    },

    {
      title: 'Add to Rack & Self',
      field: '',
      render: (row) => (
        <div style={{ width: '200px' }} className='d-flex gap-1'>
          <div style={{ width: '100%' }} class='form-group'>
            <select
              onChange={(e) => handleRack(e, row)}
              className={`form-select form-select-sm border-${errors.rack ? 'danger' : 'secondary'
                }`}
              aria-label='select example'
            >
              <option default>select</option>
              <option value='Rack-1'>Rack-1</option>
              <option value='Rack-2'>Rack-2</option>
              <option value='Rack-3'>Rack-3</option>
              <option value='Rack-4'>Rack-4</option>
            </select>
          </div>

          <div style={{ width: '100%' }} class='form-group'>
            <select
              onChange={(e) => handleSelf(e, row)}
              className={`form-select form-select-sm border-${errors.self ? 'danger' : 'secondary'
                }`}
              aria-label='select example'
            >
              <option default>select</option>
              <option value='Self-1'>Self-1</option>
              <option value='Self-2'>Self-2</option>
              <option value='Self-3'>Self-3</option>
              <option value='Self-4'>Self-4</option>
            </select>
          </div>
        </div>
      ),
    },
  ];
  const expireDate = cart.reduce((a, b) => a + (b.expiry_date ? 1 : 0), 0);
  const submitFormData = (e) => {
    e.preventDefault();
    if (expireDate === cart.length) {
      const formData = new FormData();

      formData.append('store_in_status', 'approved');
      formData.append('store_in_record_no', storeInRecordNo);
      formData.append('requisition_po_id', mrrData.requisition_po_id);
      formData.append('manufacturer_id', manufacturer_id);
      formData.append('supplier_id', manufacturer_id);
      formData.append('mrr_id', selected_mrr_id);
      formData.append('carrier_id', carrier_id ? carrier_id : 0);
      formData.append('total_bill_amount', mrrData.total_bill_amount);
      formData.append('paid_amount', mrrData.paid_amount);
      formData.append('due_amount', mrrData.due_amount);
      formData.append('contact_no', mrrData.contact_no);
      formData.append('created_by', user.id);

      http.post(`save-manager-store-in`, formData).then((res) => {
        console.log('all response', res);

        if (res.data.status === 200) {
          cart.map((item) => {
            const formDataDetails = new FormData();

            formDataDetails.append('store_in_master_id', res.data.data.id);
            formDataDetails.append('drug_id', item.drug_id);
            formDataDetails.append('exp_date', item.expiry_date);
            formDataDetails.append('no_of_box', item.noOfBox);
            formDataDetails.append('bonus_box', item.bonus_qty);
            formDataDetails.append('total_qty', parseFloat(item.req_unit)+parseFloat(item.bonus_qty));
            formDataDetails.append('total_price', item.totalPrice);
            formDataDetails.append('rack', item.rack);
            formDataDetails.append('self', item.self);
            formData.append('created_by', user.name);

            http
              .post(`save-manager-store-in-details`, formDataDetails)
              .then((res) => {
                console.log('store data details', res);
              });
          });
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: res.data.message,
            timer: 2500,
          });
          http.post(`stock-in`, { arrData: JSON.stringify(cart) }).then((res) => {
            console.log(res, 'stock-in');
          });
          navigate('/manager-store-in');
        } else {
          console.log('res.data.errors', res.data.errors);
          setError(res.data.errors);
          alertToast('Some field is required');
        }
      });
    }else {
      toast.error('Please select expire date');
    }

  };

  const handleExpDateChange = (row, date) => {
    const newCart = [...cart];
    newCart.map((md) => {
      if (md.id === row.id) {
        md.expiry_date = date;
      }
    });
    setCart(newCart);
  };
  const subTotal = parseFloat(mrrData?.total_bill_amount ? mrrData?.total_bill_amount : 0) + parseFloat(mrrData?.special_discount ? mrrData?.special_discount : 0) - parseFloat(mrrData?.vat ? mrrData?.vat : 0)
  return (
    <div className='page-content mrr-data'>
      <div className='custom-card patients-head '>
        <h5 className='fw-normal custom_py-3 px-2  text-start mb-2 card-title'>
          Store In
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
        <div className='col-lg-8 col-md-8'>
          <div className='card'>
            <div className='card-body'>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='row '>
                    <label
                      htmlFor='exampleInputUsername2'
                      className='col-sm-5 col-form-label'
                    >
                      Purchase In No
                    </label>
                    <div className='col-sm-7'>
                      <Select
                        options={mrr}
                        placeholder={'Select'}
                        onChange={handleMRRInput}
                        getOptionLabel={(mrr) => `${mrr.mrr_no}`}
                        getOptionValue={(mrr) => `${mrr.id}`}
                      />
                    </div>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='row mb-2'>
                    <label htmlFor='exampleInputUsername2' className='col-sm-5'>
                      Supplier
                    </label>
                    <div className='col-sm-7'>
                      <Select
                        options={supplier}
                        onChange={handleMNInput}
                        isDisabled={true}
                        placeholder={'Select'}
                        getOptionLabel={(supplier) =>
                          `${supplier.supplier_name}`
                        }
                        getOptionValue={(supplier) => `${supplier.id}`}
                        value={supplier.filter(
                          (s) => s.id === Number(manufacturer_id),
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='row mb-2'>
                    <label
                      htmlFor='exampleInputUsername2'
                      className='col-sm-5 col-form-label'
                    >
                      Reference Invoice No
                    </label>
                    <div className='col-sm-7'>
                      <input
                        type='text'
                        className='form-control form-control-sm'
                        id='exampleInputUsername2'
                        value={mrrData.reference_invoice_no ? mrrData.reference_invoice_no : ''}
                        name='requisition_no'
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='row mb-2'>
                    <label
                      htmlFor='exampleInputUsername2'
                      className='col-sm-5 col-form-label'
                    >
                      Reference Order No
                    </label>
                    <div className='col-sm-7'>
                      <input
                        type='text'
                        className='form-control form-control-sm'
                        id='exampleInputUsername2'
                        value={mrrData.reference_order_no ? mrrData.reference_order_no : ''}
                        name='requisition_no'
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='card mt-2'>
            <div className='card-body'>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='row '>
                    <label
                      htmlFor='exampleInputUsername2'
                      className='col-sm-5 col-form-label'
                    >
                      Delivery Date
                    </label>
                    <div className='col-sm-7'>
                      <ReactDatePicker
                        className='form-control form-control-sm custom-datepicker-input-width'
                        placeholderText='DD/MM/YYYY'
                        value={
                          mrrData.delivery_date &&
                          moment(new Date(mrrData.delivery_date)).format(
                            'DD/MM/YYYY',
                          )
                        }
                        readOnly
                        dateFormat={'dd/MM/yyyy'}
                        onChange={(date) =>
                          handleInput({
                            target: { name: 'delivery_date', value: date },
                          })
                        }
                      />
                     
                    </div>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='row mb-2'>
                    <label htmlFor='exampleInputUsername2' className='col-sm-5'>
                      Store In Record No.
                    </label>
                    <div className='col-sm-7'>
                      <input
                        type='text'
                        className='form-control form-control-sm'
                        id='exampleInputUsername2'
                        value={storeInRecordNo}
                        name='mrr_no'
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className='col-md-12'>
                  <div className='mt-1'>
                    <div className=''>
                      <textarea
                        name='remarks'
                        readOnly
                        onChange={handleInput}
                        value={mrrData.remarks}
                        className='form-control '
                        placeholder='Remarks...'
                        rows='4'
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-4 col-md-4 requisition_status_blog'>
          
          <div className='card payment_block'>
            <div className='card-body'>
              <div className='row'>
                <div className='col-md-12'>
                  <h6>Payment</h6>
                  <hr className='mrr_heading' />
                  <div className='row mb-1'>
                    <div className='col-sm-4'>
                      <label
                        htmlFor='exampleInputUsername2'
                        className='col-form-label'
                      >
                        Sub Total
                        <span>*</span>
                      </label>
                    </div>
                    <div className='col-sm-8'>
                      <input
                        type='text'
                        className='form-control form-control-sm'
                        id='exampleInputUsername2'
                        name='paid_amount'
                        value={subTotal > 0 ? subTotal : 0.00}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className='row mb-1'>
                    <div className='col-sm-4'>
                      <label
                        htmlFor='exampleInputUsername2'
                        className='col-form-label'
                      >
                        Vat
                        <span>*</span>
                      </label>
                    </div>
                    <div className='col-sm-8'>
                      <input
                        type='text'
                        className='form-control form-control-sm'
                        id='exampleInputUsername2'
                        name='paid_amount'
                        value={parseFloat(mrrData?.vat ? mrrData?.vat : 0).toFixed(2)}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className='row mb-1'>
                    <div className='col-sm-4'>
                      <label
                        htmlFor='exampleInputUsername2'
                        className='col-form-label'
                      >
                        Discount
                        <span>*</span>
                      </label>
                    </div>
                    <div className='col-sm-8'>
                      <input
                        type='text'
                        className='form-control form-control-sm'
                        id='exampleInputUsername2'
                        name='paid_amount'
                        value={parseFloat(mrrData?.special_discount ? mrrData?.special_discount : 0).toFixed(2)}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className='row mb-1'>
                    <div className='col-sm-4'>
                      <label
                        htmlFor='exampleInputUsername2'
                        className=' col-form-label'
                      >
                        Grand Total
                        <span>*</span>
                      </label>
                    </div>
                    <div className='col-sm-8'>
                      <input
                        type='text'
                        className='form-control form-control-sm'
                        id='exampleInputUsername2'
                        name='paid_amount'
                        value={parseFloat(mrrData?.total_bill_amount ? mrrData?.total_bill_amount : 0).toFixed(2)}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-sm-4'>
                      <label
                        htmlFor='exampleInputUsername2'
                        className='col-form-label'
                      >
                        Paid
                        <span>*</span>
                      </label>
                    </div>
                    <div className='col-sm-8'>
                      <input
                        type='text'
                        className='form-control form-control-sm'
                        id='exampleInputUsername2'
                        name='paid_amount'
                        value={parseFloat(mrrData?.paid_amount ? mrrData?.paid_amount : 0).toFixed(2)}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className='row'>
                  <div className='col-sm-4'>
                      <label
                        htmlFor='exampleInputUsername2'
                        className='col-form-label'
                      >
                        Due
                        <span>*</span>
                      </label>
                    </div>
                    <div className='col-sm-8'>
                      <input
                        type='text'
                        className='form-control form-control-sm'
                        id='exampleInputUsername2'
                        readOnly
                        value={parseFloat(mrrData.due_amount ? mrrData.due_amount : 0).toFixed(2)}
                        name='due_amount'
                      />
                    </div>
                  </div>
                </div>
              </div>
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

      {
        // (selectDone === true)
        selectedSelfAndRack >= cart.length && selected_mrr_id ? (
          <button
            className='btn btn-sm btn-success float-end text-uppercase mt-3 me-2'
            onClick={submitFormData}
          >
            <i className='fas fa-save'></i> Create Store In
          </button>
        ) : (
          <button
            disabled
            className='btn btn-sm btn-success float-end text-uppercase mt-3 me-2'
          >
            Select Mrr No, Self & Rack First
          </button>
        )
      }
    </div>
  );
}

export default AddManagerStoreIn;
