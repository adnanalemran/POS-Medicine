import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MaterialTable from 'material-table';
import AuthUser from '../../../../Components/AuthUser';
import { toast } from 'react-toastify';
import ReactDatePicker from 'react-datepicker';
function VieMaterialReceiving() {
  const { id } = useParams();

  const alertToast = (text) => toast.error(text);

  const navigate = useNavigate();
  const { http, user } = AuthUser();

  const [mrrDetails, setMrrDetails] = useState({
    purchase_order_no_id: '',
    manufacturer_id: '',
    supplier_id: '',
    // expiry_date: "",
    mrr_no: '',
    carrier_id: '',
    delivery_date: '',
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
    vat: 0
  });
  const [cart, setCart] = useState([]);
  useEffect(() => {
    http.get(`mrr-details/${id}`).then((res) => {
      console.log(res, 'mrr_res');
      setMrrDetails(res.data.mrr);
      setCart(res.data.mrr.mrr_details);
    });
  }, []);

  // product requisition

  const columnsData = [
    {
      title: 'Name',
      render: (row) => (
        <div className='text-capitalize text-center'>
          {row?.drug?.macrohealth_sg}
        </div>
      ),
      width: '100 !important',
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
      title: 'Unit',
      field: 'unit',
      render: (row) => (
        <div className='text-capitalize text-center'>{row.unit}</div>
      ),
    },
    {
      title: 'Quantity',
      field: 'req_unit',
      render: (row) => (
        <div className='w-[100%]'>
          <input
            className='form-control form-control-sm'
            value={row.req_unit}
            style={{ width: '80px', margin: 'auto' }}
            readOnly
            type='number'
          />
        </div>
      ),
    },
    {
      title: 'Bonus Qty',
      render: (row) => (
        <div className='text-capitalize text-center'>
          {(parseFloat(row?.bonus_qty)).toFixed(2)}
        </div>
      ),
    },
    {
      title: 'PP',
      render: (row) => (
        <div className='text-capitalize text-center'>
          {parseFloat(row?.price).toFixed(2)}
        </div>
      ),
    },
    {
      title: 'VAT',
      render: (row) => (
        <div className='text-capitalize text-center'>
          {parseFloat(row?.vat).toFixed(2)}
        </div>
      ),
    },
    {
      title: 'Discount',
      render: (row) => (
        <div className='text-capitalize text-center'>
          {parseFloat(row?.disc).toFixed(2)}
        </div>
      ),
    },

    { title: 'Total Price', render: (row) => <div className='text-capitalize text-center'>{(parseFloat(row?.totalPrice)).toFixed(2)}</div> },
  ];
  console.log(mrrDetails, 'mrrDetails');
  return (
    <div className='page-content mrr-data'>
      <div className='custom-card patients-head '>
        <h5 className='fw-normal custom_py-3 px-2  text-start mb-2 card-title'>
          Purchase In
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
                  <div className='row mb-2'>
                    <label
                      htmlFor='exampleInputUsername2'
                      className='col-sm-5'
                    >
                      Reference Invoice No

                    </label>
                    <div className='col-sm-7'>
                      <input type="text" readOnly value={mrrDetails.reference_invoice_no} className='form-control form-control-sm' />
                    </div>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='row '>
                    <label
                      htmlFor='exampleInputUsername2'
                      className='col-sm-5'
                    >
                      Reference Order No
                    </label>
                    <div className='col-sm-7'>
                      <input type="text" readOnly value={mrrDetails.reference_order_no} className='form-control form-control-sm' />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className='row mb-2'>
                    <label htmlFor='exampleInputUsername2' className='col-sm-5'>
                      Purchase In No.
                    </label>
                    <div className='col-sm-7'>
                      <input
                        type='text'
                        className='form-control form-control-sm'
                        id='exampleInputUsername2'
                        value={mrrDetails.mrr_no}
                        name='mrr_no'
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
                      Order By
                    </label>
                    <div className='col-sm-7'>
                      <input
                        type='text'
                        className='form-control form-control-sm'
                        id='exampleInputUsername2'
                        value={user.name}
                        name='requisition_no'
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='row mb-2'>
                    <label htmlFor='exampleInputUsername2' className='col-sm-5'>
                      Delivery Date
                    </label>
                    <div className='col-sm-7'>
                      {/* {moment().format('DD-MM-YYYY')} */}
                      <ReactDatePicker
                        placeholderText='DD/MM/YYYY'
                        className='form-control form-control-sm custom-datepicker-input-width'
                        selected={
                          mrrDetails.delivery_date &&
                          new Date(mrrDetails.delivery_date)
                        }
                        disabled

                        dateFormat='dd/MM/yyyy'
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
                      <input
                        type='text'
                        className='form-control form-control-sm'
                        id='exampleInputUsername2'
                        value={mrrDetails?.supplier?.supplier_name}
                        name='requisition_no'
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
                        value={mrrDetails.remarks}
                        className='form-control '
                        placeholder='Remarks...'
                        rows='2'
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
                        value={(parseFloat(mrrDetails?.total_bill_amount ? mrrDetails?.total_bill_amount : 0) + parseFloat(mrrDetails?.special_discount ? mrrDetails?.special_discount : 0) - parseFloat(mrrDetails?.vat ? mrrDetails?.vat : 0)).toFixed(2)}
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
                        value={parseFloat(mrrDetails?.vat ? mrrDetails?.vat : 0).toFixed(2)}
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
                        value={parseFloat(mrrDetails?.special_discount).toFixed(2)}
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
                        value={parseFloat(mrrDetails?.total_bill_amount).toFixed(2)}
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
                        value={parseFloat(mrrDetails?.paid_amount ? mrrDetails?.paid_amount : 0).toFixed(2)}
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
                        value={parseFloat(mrrDetails.due_amount).toFixed(2)}
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

      {/*requisition list*/}

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
    </div>
  );
}

export default VieMaterialReceiving;
