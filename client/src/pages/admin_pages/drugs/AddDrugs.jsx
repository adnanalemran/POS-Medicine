import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import http from '../../../http';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';

function AddDrugs() {
  const navigate = useNavigate();
  const [errors, setError] = useState([]);
  const [picture, setPicture] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [generic_name, setGenericName] = useState([]);
  const [usual_provider, setUsualProvider] = useState([]);
  const [brand, setBrand] = useState([]);
  const [form_data, setFormData] = useState({
    src_primary_key: '',
    generic_id: '',
    usual_provider_id: '',
    boxType: '',
    pktSize: '',
    unit: '',
    drug_description: '',
    strength: '',
    macrohealth_sg: '',
    mims_sg: '',
    mims_type: '',
    guid: '',
    drug_name: '',
    qty: '',
    rpts: '',
    box_size: 1,
    tgp: '',
    restriction: '',
    brand_id: '',
    category_id: '',
    sub_category_id: '',
    stock: '',
    drug_code: '',
    class: '',
    batch: '',
    expiry_date: '',
    price: '',
    drug_price: '',
    offer_price: '',
    generic_Name: '',
    drug_discount: '',
    cash_drug_discount: '',
    card_drug_discount: '',
    digital_drug_discount: '',

    drug_weight: '',
    main_image: '',
    summary: '',
    condition: '',
    status: '',
  });

  console.log('form_data', form_data);
  // multiple inputs for academic
  const [AcademicArray, setAcademicArray] = useState([
    {
      drugs_master_id: '',
      // scan_copy_title: ''
    },
  ]);

  const [scan_copy_Academic, setscan_copy_Academic] = useState([
    { scan_copy: '' },
  ]);

  const handleChangeAcademic = (e, index) => {
    const { name, value } = e.target;
    const list = [...AcademicArray];
    list[index][name] = value;
    setAcademicArray(list);
  };
  const handle_Academic_File = (e, index) => {
    if (e.target.files[0].size < 2000048) {
      console.log('Index handle_Academic_File', index);

      const { name } = e.target;

      const fileList = [...scan_copy_Academic];

      fileList[index][name] = e.target.files[0];

      setscan_copy_Academic(fileList);

      setdocImage_error(null);
    } else {
      setdocImage_error(
        'File size must be less than 2 mb and file type pdf/jpg/jpeg/png !',
      );
    }
  };

  const handleAddInput = () => {
    setAcademicArray([
      ...AcademicArray,
      {
        // scan_copy_title: '',
        scan_copy: [],
      },
    ]);

    setscan_copy_Academic([
      ...scan_copy_Academic,
      {
        scan_copy: '',
      },
    ]);
  };

  const handleRemoveInput = (index) => {
    const list = [...AcademicArray];
    list.splice(index, 1);
    setAcademicArray(list);

    const listFile = [...scan_copy_Academic];
    listFile.splice(index, 1);
    setscan_copy_Academic(list);
  };

  const [docImage_error, setdocImage_error] = useState();

  useEffect(() => {
    http.get('brand').then((res) => {
      setBrand(res.data.data);
    });
    http.get('drug-generic-name').then((res) => {
      setGenericName(res.data.data);
    });
    http.get('category').then((res) => {
      setCategory(res.data.data);
    });
    http.get('subcategory').then((res) => {
      setSubCategory(res.data.data);
    });
    http.get('usual-provider').then((res) => {
      setUsualProvider(res.data.data);
    });
  }, []);

  const handleInput = (e) => {
    if (e.target.name === 'brand_id') {
      setFormData({
        ...form_data,
        brand_id: e.target.value,
        manufacturer: brand.find(
          (x) => parseInt(x.id) === parseInt(e.target.value),
        )?.title,
      });
    } else {
      setFormData({
        ...form_data,
        [e.target.name]: e.target.value,
      });
    }
  };

  const [image_error, setimage_error] = useState();
  const [imageUrl, setimageUrl] = useState();
  const handleImage = (e) => {
    e.persist();
    if (e.target.files[0].size < 2000048) {
      setPicture({ main_image: e.target.files[0] });
      setimage_error(null);
    } else {
      setimage_error('File size must be less than 2 mb !');
    }
    if (
      e.target.files &&
      e.target.files[0] &&
      e.target.files[0].size < 2000048
    ) {
      setimageUrl(URL.createObjectURL(e.target.files[0]));
    } else {
      setimage_error('File size must be less than 2 mb !');
    }
  };

  const closeImage = () => {
    setimageUrl();
    document.getElementById('main_image').value = '';
  };

  const saveFirstInfo = (e) => {
    e.preventDefault();
    document.getElementById('v-pills-home-tab').className =
      'nav-link text-start';
    document.getElementById('v-pills-home-tab').click();
  };

  const savePersonalInfo = (e) => {
    e.preventDefault();
    document.getElementById('v-pills-profile-tab').className =
      'nav-link text-start';
    document.getElementById('v-pills-profile-tab').click();
  };

  const saveContactInfo = (e) => {
    e.preventDefault();
    document.getElementById('v-pills-settings-tab2').className =
      'nav-link text-start';
    document.getElementById('v-pills-settings-tab2').click();
  };

  const saveAddressInfo = (e) => {
    e.preventDefault();
    document.getElementById('v-pills-settings-tab2').className =
      'nav-link text-start';
    document.getElementById('v-pills-settings-tab2').click();
  };

  const saveNotesInfo = (e) => {
    e.preventDefault();
    document.getElementById('v-pills-settings-tab2').className =
      'nav-link text-start';
    document.getElementById('v-pills-settings-tab2').click();
  };

  const submitFormData = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('src_primary_key', form_data.src_primary_key);
    formData.append('generic_id', form_data.generic_id);
    formData.append('usual_provider_id', form_data.usual_provider_id);
    formData.append('boxType', form_data.boxType);
    formData.append('pktSize', form_data.pktSize);
    formData.append('unit', form_data.unit);
    formData.append('drug_description', form_data.drug_description);
    formData.append('strength', form_data.strength);
    formData.append('macrohealth_sg', form_data.macrohealth_sg);
    formData.append('mims_sg', form_data.mims_sg);
    formData.append('mims_type', form_data.mims_type);
    formData.append('guid', form_data.guid);
    formData.append('drug_name', form_data.drug_name);
    formData.append('qty', form_data.qty);
    formData.append('rpts', form_data.rpts);
    formData.append('box_size', 1);
    formData.append('tgp', form_data.tgp);
    formData.append('restriction', form_data.restriction);
    formData.append('brand_id', form_data.brand_id);
    formData.append('category_id', form_data.category_id);
    formData.append('sub_category_id', form_data.sub_category_id);
    formData.append('stock', form_data.stock);
    formData.append('drug_code', form_data.drug_code);
    formData.append('class', form_data.class);
    formData.append('batch', form_data.batch);
    formData.append('expiry_date', form_data.expiry_date);
    formData.append('price', form_data.price);
    formData.append('drug_price', form_data.drug_price);
    formData.append('manufacturer', formData.manufacturer);
    formData.append('generic_Name', form_data.generic_Name);

    formData.append('drug_discount', form_data.drug_discount);
    formData.append('cash_drug_discount', form_data.cash_drug_discount);
    formData.append('card_drug_discount', form_data.card_drug_discount);
    formData.append('digital_drug_discount', form_data.digital_drug_discount);

    formData.append('drug_weight', form_data.drug_weight);
    formData.append('summary', form_data.summary);
    formData.append('condition', form_data.condition);
    formData.append('status', form_data.status);
    formData.append('image', picture.main_image);

    http.post('drugs', formData).then((res) => {
      console.log('drugs post response', res);
      if (res.data.status === 200) {
        AcademicArray.map((item, i) => {
          if (item.scan_copy !== '') {
            const academic = new FormData();
            academic.append('drugs_master_id', res.data.drugs.id);

            // academic.append('scan_copy_title', item.scan_copy_title);
            academic.append('scan_copy', scan_copy_Academic[i].scan_copy);

            console.log('FromData Academic', academic);
            http.post('save-drugs-images', academic).then((res) => {
              console.log('save-doctors-academic');
            });
          }
        });

        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: res.data.message,
          timer: 2500,
        });
        navigate('/drugs');
      } else {
        setError(res.data.errors);
        Swal.fire({
          position: 'top-center',
          icon: 'error',
          title: 'Something went wrong',
          timer: 2500,
        });
      }
    });
  };

  return (
    <div className='page-content'>
      <div className='custom-card patients-head '>
        <h5 className='fw-normal custom_py-3 px-2  text-start mb-2 card-title'>
          Add Drugs
          <button
            className='btn btn-sm btn-warning float-end'
            onClick={() => navigate(-1)}
          >
            <i className='fal fa-long-arrow-left'></i> Back
          </button>
        </h5>
      </div>

      <div className='row new-patient-entry me-1'>
        <form className='' onSubmit={submitFormData}>
          <div className='d-flex align-items-start'>
            <div
              className='nav custom-card col-md-3 flex-column nav-pills me-2'
              id='v-pills-tab'
              role='tablist'
              aria-orientation='vertical'
            >
              <button
                className='nav-link text-start  active'
                id='v-pills-home-tab'
                data-bs-toggle='pill'
                data-bs-target='#v-pills-home'
                type='button'
                role='tab'
                aria-controls='v-pills-home'
                aria-selected='true'
              >
                <i className='fas menu-icon fa-plus-circle'></i> Product Details
              </button>
              <button
                className='nav-link text-start disabled btnNEw'
                id='v-pills-profile-tab'
                data-bs-toggle='pill'
                data-bs-target='#v-pills-profile'
                type='button'
                role='tab'
                aria-controls='v-pills-profile'
                aria-selected='false'
              >
                <i className='fas menu-icon fa-plus-circle'></i> Pricing Details
              </button>
              <button
                className='nav-link text-start disabled btnNEw'
                id='v-pills-settings-tab2'
                data-bs-toggle='pill'
                data-bs-target='#v-pills-settings2'
                type='button'
                role='tab'
                aria-controls='v-pills-settings2'
                aria-selected='false'
              >
                <i className='fas menu-icon fa-plus-circle'></i> All
              </button>
            </div>

            <div className='tab-content col-md-9' id='v-pills-tabContent'>
              <div
                className='tab-pane fade show active'
                id='v-pills-home'
                role='tabpanel'
                aria-labelledby='v-pills-home-tab'
              >
                <div className='custom-card mb-2'>
                  <div className='pt-2 px-4'>
                    <h6 className=''>
                      Product Details
                      <button
                        onClick={submitFormData}
                        className='btn btn-success btn-sm text-uppercase float-end'
                      >
                        <i className='fas fa-save'></i> Save
                      </button>
                    </h6>
                  </div>
                  <div className='card-body'>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label
                            htmlFor='macrohealth_sg'
                            className='form-label'
                          >
                            Drug Name <span className='text-danger'>*</span>
                          </label>
                          <input
                            type='text'
                            name='macrohealth_sg'
                            className='form-control form-control-sm'
                            value={form_data.macrohealth_sg}
                            onChange={handleInput}
                          />
                          <span className='text-danger'>
                            {errors?.macrohealth_sg}
                          </span>
                        </div>
                        <div className='mb-3'>
                          <label htmlFor='strength' className='form-label'>
                            Strength
                          </label>
                          <input
                            type='text'
                            name='strength'
                            className='form-control form-control-sm'
                            value={form_data.strength}
                            onChange={handleInput}
                          />
                          <span className='text-danger'>{errors.strength}</span>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label
                            htmlFor='drug_description'
                            className='form-label'
                          >
                            Product Description
                          </label>
                          <textarea
                            name='drug_description'
                            value={form_data.drug_description}
                            onChange={handleInput}
                            className='form-control form-control-sm'
                            maxLength='100'
                            rows='4'
                            placeholder='Description...'
                          ></textarea>
                          <span className='text-danger'>
                            {errors.drug_description}
                          </span>
                        </div>
                        <div className='mb-3'>
                          <label htmlFor='generic_Name' className='form-label'>
                            Generic Name
                          </label>
                          <input
                            type='text'
                            name='generic_Name'
                            className='form-control form-control-sm'
                            value={form_data.generic_Name}
                            onChange={handleInput}
                          />
                          <span className='text-danger'>
                            {errors.generic_Name}
                          </span>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        {/* <div className='mb-3'>
                          <label htmlFor='drug_weight' className='form-label'>
                            Weight
                          </label>
                          <input
                            type='text'
                            name='drug_weight'
                            className='form-control form-control-sm'
                            value={form_data.drug_weight}
                            onChange={handleInput}
                          />
                          <span className='text-danger'>
                            {errors.drug_weight}
                          </span>
                        </div> */}
                        <div className='mb-3'>
                          <label htmlFor='expiry_date' className='form-label'>
                            Expire Date
                          </label>
                          <br />
                          <ReactDatePicker
                            className='form-control form-control-sm'
                            selected={
                              form_data.expiry_date
                                ? form_data.expiry_date
                                : new Date()
                            }
                            dateFormat='dd/MM/yyyy'
                            onChange={(date) => {
                              setFormData({
                                ...form_data,
                                expiry_date: date,
                              });
                            }}
                          />
                          <span className='text-danger'>
                            {errors.expiry_date}
                          </span>
                        </div>
                        <div className='mb-3'>
                          <label htmlFor='main_image' className='form-label'>
                            Main Image
                          </label>
                          <input
                            type='file'
                            name='main_image'
                            id='main_image'
                            onChange={handleImage}
                            className='form-control form-control-sm'
                            accept='image/jpg,image/jpeg,image/gif,image/png'
                          />
                          {image_error == null ? (
                            <p className='doc_image_size'>
                              Image size must be less than 2 mb!
                            </p>
                          ) : (
                            <p className='photo_size_error'>{image_error}</p>
                          )}

                          {imageUrl == null ? (
                            ''
                          ) : (
                            <div className='photo_close'>
                              <img
                                src={imageUrl}
                                className='photo_preview_url'
                                width='100'
                                height='100'
                                alt='preview image'
                              />
                              <i
                                onClick={closeImage}
                                className='far fa-times-circle'
                              ></i>
                            </div>
                          )}
                          <span className='text-danger'>
                            {errors.main_image}
                          </span>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='status' className='form-label'>
                            Status
                          </label>
                          <select
                            className='form-select form-select-sm'
                            name='status'
                            id='status'
                            onChange={handleInput}
                            value={form_data.status}
                          >
                            <option selected='' disabled=''>
                              Select
                            </option>
                            <option value='1'>Active</option>
                            <option value='0'>Inactive</option>
                          </select>
                          <span className='text-danger'>{errors.status}</span>
                        </div>
                        <div className='mb-3'>
                          <label htmlFor='status' className='form-label'>
                            Multiple Image
                          </label>

                          {AcademicArray.map((item, i) => {
                            return (
                              <div key={i}>
                                <input
                                  type='file'
                                  name='scan_copy'
                                  onChange={(e) => handle_Academic_File(e, i)}
                                  className='form-control form-control-sm'
                                  accept='image/jpg,image/jpeg,image/gif,image/png'
                                />

                                {docImage_error == null ? (
                                  <p className='doc_image_size'>
                                    Image size must be less than 2 mb!
                                  </p>
                                ) : (
                                  <p className='docimage_error'>
                                    {docImage_error}
                                  </p>
                                )}

                                {AcademicArray.length - 1 === i && (
                                  <input
                                    type='button'
                                    onClick={handleAddInput}
                                    className='btn btn-success float-end mt-2 btn-sm'
                                    value='+ Add More'
                                  />
                                )}
                                {AcademicArray.length !== 1 && (
                                  <input
                                    type='button'
                                    onClick={() => handleRemoveInput(i)}
                                    className='btn btn-warning float-end mt-2 btn-sm mr-2 me-2'
                                    value='- Remove'
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className='col-md-12 mt-2'>
                        <button
                          onClick={submitFormData}
                          className='btn btn-success btn-sm text-uppercase float-end'
                        >
                          <i className='fas fa-save'></i> Save
                        </button>
                        <button
                          onClick={savePersonalInfo}
                          className='btn btn-primary btn-sm text-uppercase float-end me-2'
                        >
                          <i className='far fa-hand-point-right'></i> Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className='tab-pane fade'
                id='v-pills-profile'
                role='tabpanel'
                aria-labelledby='v-pills-profile-tab'
              >
                <div className='custom-card mb-2'>
                  <div className='pt-1 px-4'>
                    <h6 className=''>Pricing Details</h6>
                  </div>
                  <div className='card-body'>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='brand_id' className='form-label'>
                            Brand <span className='text-danger'>*</span>
                          </label>
                          <select
                            className='form-select form-select-sm'
                            name='brand_id'
                            id='brand_id'
                            value={form_data.brand_id}
                            onChange={handleInput}
                          >
                            <option selected='' disabled=''>
                              Select
                            </option>
                            {brand.map((item) => {
                              return (
                                <option value={item.id} key={item.id}>
                                  {item.title}
                                </option>
                              );
                            })}
                          </select>
                          <span className='text-danger'>{errors.brand_id}</span>
                        </div>
                        <div className='mb-3'>
                          <label htmlFor='category_id' className='form-label'>
                            Category <span className='text-danger'>*</span>
                          </label>
                          <select
                            className='form-select form-select-sm'
                            name='category_id'
                            id='category_id'
                            value={form_data.category_id}
                            onChange={handleInput}
                          >
                            <option selected='' disabled=''>
                              Select
                            </option>
                            {category.map((item) => {
                              return (
                                <option value={item.id} key={item.id}>
                                  {item.title}
                                </option>
                              );
                            })}
                          </select>
                          <span className='text-danger'>
                            {errors.category_id}
                          </span>
                        </div>
                        <div className='mb-3'>
                          <label
                            htmlFor='sub_category_id'
                            className='form-label'
                          >
                            Sub Category <span className='text-danger'>*</span>
                          </label>
                          <select
                            className='form-select form-select-sm'
                            name='sub_category_id'
                            id='sub_category_id'
                            value={form_data.sub_category_id}
                            onChange={handleInput}
                          >
                            <option selected='' disabled=''>
                              Select
                            </option>
                            {subcategory.map((item) => {
                              return (
                                <option value={item.id} key={item.id}>
                                  {item.title}
                                </option>
                              );
                            })}
                          </select>
                          <span className='text-danger'>
                            {errors.sub_category_id}
                          </span>
                        </div>

                        <div className='mb-3'>
                          <label htmlFor='drug_code' className='form-label'>
                            Drug Code
                          </label>
                          <input
                            type='text'
                            name='drug_code'
                            className='form-control form-control-sm'
                            value={form_data.drug_code}
                            onChange={handleInput}
                          />
                          <span className='text-danger'>
                            {errors.drug_code}
                          </span>
                        </div>
                        <div className='mb-3'>
                          <label htmlFor='class' className='form-label'>
                            Class
                          </label>
                          <input
                            type='text'
                            name='class'
                            className='form-control form-control-sm'
                            value={form_data.class}
                            onChange={handleInput}
                          />
                          <span className='text-danger'>{errors.class}</span>
                        </div>
                        <div className='mb-3'>
                          <label htmlFor='batch' className='form-label'>
                            Batch
                          </label>
                          <input
                            type='text'
                            name='batch'
                            className='form-control form-control-sm'
                            value={form_data.batch}
                            onChange={handleInput}
                          />
                          <span className='text-danger'>{errors.batch}</span>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='price' className='form-label'>
                            MRP Price <span className='text-danger'>*</span>
                          </label>
                          <input
                            type='number'
                            name='price'
                            className='form-control form-control-sm'
                            value={form_data.price}
                            onChange={handleInput}
                          />
                          <span className='text-danger'>{errors.price}</span>
                        </div>
                        <div className='mb-3'>
                          <label htmlFor='drug_price' className='form-label'>
                            Purchase Price <span className='text-danger'>*</span>
                          </label>
                          <input
                            type='number'
                            name='drug_price'
                            className='form-control form-control-sm'
                            max={
                              form_data.drug_price
                                ? form_data.price
                                : form_data.price
                            }
                            min={0}
                            onKeyUp={(e) => {
                              if (
                                parseFloat(e.target.value) >
                                parseFloat(form_data.price)
                              ) {
                                setError({
                                  ...errors,
                                  drug_price:
                                    "Purchase Price can't be greater than MRP Price",
                                });
                              } else {
                                setError({
                                  ...errors,
                                  drug_price: '',
                                });
                              }
                            }}
                            value={form_data.drug_price}
                            onChange={handleInput}
                          />
                          <span className='text-danger'>
                            {errors.drug_price ? errors.drug_price : null}
                          </span>
                        </div>
                        {/* <div className='mb-3'>
                          <label htmlFor='drug_discount' className='form-label'>
                            Discount
                          </label>
                          <input
                            type='text'
                            name='drug_discount'
                            className='form-control form-control-sm'
                            value={form_data.drug_discount}
                            onChange={handleInput}
                          />
                          <span className='text-danger'>
                            {errors.drug_discount}
                          </span>
                        </div> */}

                        <div className='mb-3'>
                          <label htmlFor='boxType' className='form-label'>
                            Box Type <span className='text-danger'>*</span>
                          </label>
                          <input
                            type='text'
                            name='boxType'
                            className='form-control form-control-sm'
                            value={form_data.boxType}
                            onChange={handleInput}
                          />
                          <span className='text-danger'>{errors.boxType}</span>
                        </div>
                        {/* <div className='mb-3'>
                          <label htmlFor='box_size' className='form-label'>
                            Box Size (Number of packet/leaf) <span className='text-danger'>*</span>
                          </label>
                          <input
                            type='text'
                            name='box_size'
                            className='form-control form-control-sm'
                            value={form_data.box_size}
                            onChange={handleInput}
                          />
                          <span className='text-danger'>{errors.box_size}</span>
                        </div> */}
                        <div className='mb-3'>
                          <label htmlFor='pktSize' className='form-label'>
                            Packet Size  <span className='text-danger'>*</span>
                          </label>
                          <input
                            type='text'
                            name='pktSize'
                            className='form-control form-control-sm'
                            value={form_data.pktSize}
                            onChange={handleInput}
                          />
                          <span className='text-danger'>{errors.pktSize}</span>
                        </div>
                        <div className='mb-3'>
                          <label htmlFor='unit' className='form-label'>
                            Unit <span className='text-danger'>*</span>
                          </label>
                          <input
                            type='text'
                            name='unit'
                            className='form-control form-control-sm'
                            value={form_data.unit}
                            onChange={handleInput}
                          />
                          <span className='text-danger'>{errors.unit}</span>
                        </div>
                      </div>
                      <div className='col-md-12'>
                        <button
                          onClick={submitFormData}
                          className='btn btn-success btn-sm  float-end mt-2 text-uppercase'
                        >
                          <i className='fas fa-save'></i> Save
                        </button>
                        <button
                          onClick={saveContactInfo}
                          className='btn btn-primary btn-sm  float-end mt-2 me-2 text-uppercase'
                        >
                          <i className='far fa-hand-point-right'></i> Next
                        </button>
                        <button
                          onClick={saveFirstInfo}
                          className='btn btn-primary btn-sm  float-end mt-2 me-2 text-uppercase'
                        >
                          <i className='far fa-hand-point-left'></i> Previous
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className='tab-pane fade'
                id='v-pills-settings2'
                role='tabpanel'
                aria-labelledby='v-pills-settings-tab2'
              >
                <form onSubmit={submitFormData}>
                  <div className='custom-card mb-2'>
                    <div className='pt-1 px-4'>
                      <h6 className=''>Product Details</h6>
                    </div>
                    <div className='card-body'>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='drug_description'
                              className='form-label'
                            >
                              Drug Description
                            </label>
                            <textarea
                              name='drug_description'
                              value={form_data.drug_description}
                              onChange={handleInput}
                              className='form-control form-control-sm'
                              maxLength='100'
                              rows='4'
                              placeholder='Description...'
                            ></textarea>
                            <span className='text-danger'>
                              {errors.drug_description}
                            </span>
                          </div>
                          <div className='mb-3'>
                            <label htmlFor='strength' className='form-label'>
                              Strength
                            </label>
                            <input
                              type='text'
                              name='strength'
                              className='form-control form-control-sm'
                              value={form_data.strength}
                              onChange={handleInput}
                            />
                            <span className='text-danger'>
                              {errors.strength}
                            </span>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='macrohealth_sg'
                              className='form-label'
                            >
                              Drug Name <span className='text-danger'>*</span>
                            </label>
                            <input
                              type='text'
                              name='macrohealth_sg'
                              className='form-control form-control-sm'
                              value={form_data.macrohealth_sg}
                              onChange={handleInput}
                            />
                            <span className='text-danger'>
                              {errors.macrohealth_sg}
                            </span>
                          </div>
                          <div className='mb-3'>
                            <label
                              htmlFor='generic_Name'
                              className='form-label'
                            >
                              Generic Name
                            </label>
                            <input
                              type='text'
                              name='generic_Name'
                              className='form-control form-control-sm'
                              value={form_data.generic_Name}
                              onChange={handleInput}
                            />
                            <span className='text-danger'>
                              {errors.generic_Name}
                            </span>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label htmlFor='expiry_date' className='form-label'>
                              Expire Date
                            </label>
                            <br />
                            <ReactDatePicker
                              selected={
                                form_data.expiry_date
                                  ? form_data.expiry_date
                                  : new Date()
                              }
                              dateFormat={'dd/MM/yyyy'}
                              className='form-control form-control-sm'
                              onChange={(date) => {
                                setFormData({
                                  ...form_data,
                                  expiry_date: date,
                                });
                              }}
                            />
                            <span className='text-danger'>
                              {errors.expiry_date}
                            </span>
                          </div>
                          <div className='mb-3'>
                            <label htmlFor='main_image' className='form-label'>
                              Main Image
                            </label>
                            <input
                              type='file'
                              name='main_image'
                              id='main_image'
                              onChange={handleImage}
                              className='form-control form-control-sm'
                              accept='image/jpg,image/jpeg,image/gif,image/png'
                            />
                            {image_error == null ? (
                              <p className='doc_image_size'>
                                Image size must be less than 2 mb!
                              </p>
                            ) : (
                              <p className='photo_size_error'>{image_error}</p>
                            )}

                            {imageUrl == null ? (
                              ''
                            ) : (
                              <div className='photo_close'>
                                <img
                                  src={imageUrl}
                                  className='photo_preview_url'
                                  width='100'
                                  height='100'
                                  alt='preview image'
                                />
                                <i
                                  onClick={closeImage}
                                  className='far fa-times-circle'
                                ></i>
                              </div>
                            )}
                            <span className='text-danger'>
                              {errors.main_image}
                            </span>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label htmlFor='status' className='form-label'>
                              Status
                            </label>
                            <select
                              className='form-select form-select-sm'
                              name='status'
                              id='status'
                              onChange={handleInput}
                              value={form_data.status}
                            >
                              <option selected='' disabled=''>
                                Select
                              </option>
                              <option value='1'>Active</option>
                              <option value='0'>Inactive</option>
                            </select>
                            <span className='text-danger'>{errors.status}</span>
                          </div>
                          <div className='mb-3'>
                            <label htmlFor='status' className='form-label'>
                              Multiple Image
                            </label>

                            {AcademicArray.map((item, i) => {
                              return (
                                <div key={i}>
                                  {/*<input type="text" name="scan_copy_title" onChange={e => handleChangeAcademic(e, i)} value={item.scan_copy_title} className="form-control form-control-sm" />*/}

                                  <input
                                    type='file'
                                    name='scan_copy'
                                    onChange={(e) => handle_Academic_File(e, i)}
                                    className='form-control form-control-sm'
                                    accept='image/jpg,image/jpeg,image/gif,image/png'
                                  />

                                  {docImage_error == null ? (
                                    <p className='doc_image_size'>
                                      Image size must be less than 2 mb!
                                    </p>
                                  ) : (
                                    <p className='docimage_error'>
                                      {docImage_error}
                                    </p>
                                  )}

                                  {AcademicArray.length - 1 === i && (
                                    <input
                                      type='button'
                                      onClick={handleAddInput}
                                      className='btn btn-success float-end mt-2 btn-sm'
                                      value='+ Add More'
                                    />
                                  )}
                                  {AcademicArray.length !== 1 && (
                                    <input
                                      type='button'
                                      onClick={() => handleRemoveInput(i)}
                                      className='btn btn-warning float-end mt-2 btn-sm mr-2 me-2'
                                      value='- Remove'
                                    />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='custom-card mb-2'>
                    <div className='pt-1 px-4'>
                      <h6 className=''>Pricing Details</h6>
                    </div>
                    <div className='card-body'>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label htmlFor='brand_id' className='form-label'>
                              Brand <span className='text-danger'>*</span>
                            </label>
                            <select
                              className='form-select form-select-sm'
                              name='brand_id'
                              id='brand_id'
                              value={form_data.brand_id}
                              onChange={handleInput}
                            >
                              <option selected='' disabled=''>
                                Select
                              </option>
                              {brand.map((item) => {
                                return (
                                  <option value={item.id} key={item.id}>
                                    {item.title}
                                  </option>
                                );
                              })}
                            </select>
                            <span className='text-danger'>
                              {errors.brand_id}
                            </span>
                          </div>
                          <div className='mb-3'>
                            <label htmlFor='category_id' className='form-label'>
                              Category <span className='text-danger'>*</span>
                            </label>
                            <select
                              className='form-select form-select-sm'
                              name='category_id'
                              id='category_id'
                              value={form_data.category_id}
                              onChange={handleInput}
                            >
                              <option selected='' disabled=''>
                                Select
                              </option>
                              {category.map((item) => {
                                return (
                                  <option value={item.id} key={item.id}>
                                    {item.title}
                                  </option>
                                );
                              })}
                            </select>
                            <span className='text-danger'>
                              {errors.category_id}
                            </span>
                          </div>
                          <div className='mb-3'>
                            <label
                              htmlFor='sub_category_id'
                              className='form-label'
                            >
                              Sub Category{' '}
                              <span className='text-danger'>*</span>
                            </label>
                            <select
                              className='form-select form-select-sm'
                              name='sub_category_id'
                              id='sub_category_id'
                              value={form_data.sub_category_id}
                              onChange={handleInput}
                            >
                              <option selected='' disabled=''>
                                Select
                              </option>
                              {subcategory.map((item) => {
                                return (
                                  <option value={item.id} key={item.id}>
                                    {item.title}
                                  </option>
                                );
                              })}
                            </select>
                            <span className='text-danger'>
                              {errors.sub_category_id}
                            </span>
                          </div>

                          <div className='mb-3'>
                            <label htmlFor='drug_code' className='form-label'>
                              Drug Code
                            </label>
                            <input
                              type='text'
                              name='drug_code'
                              className='form-control form-control-sm'
                              value={form_data.drug_code}
                              onChange={handleInput}
                            />
                            <span className='text-danger'>
                              {errors.drug_code}
                            </span>
                          </div>
                          <div className='mb-3'>
                            <label htmlFor='class' className='form-label'>
                              Class
                            </label>
                            <input
                              type='text'
                              name='class'
                              className='form-control form-control-sm'
                              value={form_data.class}
                              onChange={handleInput}
                            />
                            <span className='text-danger'>{errors.class}</span>
                          </div>
                          <div className='mb-3'>
                            <label htmlFor='batch' className='form-label'>
                              Batch
                            </label>
                            <input
                              type='text'
                              name='batch'
                              className='form-control form-control-sm'
                              value={form_data.batch}
                              onChange={handleInput}
                            />
                            <span className='text-danger'>{errors.batch}</span>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label htmlFor='price' className='form-label'>
                              MRP Price <span className='text-danger'>*</span>
                            </label>
                            <input
                              type='number'
                              name='price'
                              className='form-control form-control-sm'
                              value={form_data.price}
                              onChange={handleInput}
                            />
                            <span className='text-danger'>{errors.price}</span>
                          </div>
                          <div className='mb-3'>
                            <label htmlFor='drug_price' className='form-label'>
                              Purchase Price <span className='text-danger'>*</span>
                            </label>
                            <input
                              type='text'
                              name='drug_price'
                              className='form-control form-control-sm'
                              value={form_data.drug_price}
                              onChange={handleInput}
                              max={
                                form_data.drug_price
                                  ? form_data.price
                                  : form_data.price
                              }
                              min={0}
                              onKeyUp={(e) => {
                                if (
                                  parseFloat(e.target.value) >
                                  parseFloat(form_data.price)
                                ) {
                                  setError({
                                    ...errors,
                                    drug_price:
                                      "Purchase Price can't be greater than MRP Price",
                                  });
                                } else {
                                  setError({
                                    ...errors,
                                    drug_price: '',
                                  });
                                }
                              }}
                            />
                            <span className='text-danger'>
                              {errors.drug_price}
                            </span>
                          </div>
                          {/* <div className='mb-3'>
                            <label
                              htmlFor='drug_discount'
                              className='form-label'
                            >
                              Discount
                            </label>
                            <input
                              type='text'
                              name='drug_discount'
                              className='form-control form-control-sm'
                              value={form_data.drug_discount}
                              onChange={handleInput}
                            />
                            <span className='text-danger'>
                              {errors.drug_discount}
                            </span>
                          </div> */}

                          <div className='mb-3'>
                            <label htmlFor='boxType' className='form-label'>
                              Box Type <span className='text-danger'>*</span>
                            </label>
                            <input
                              type='text'
                              name='boxType'
                              className='form-control form-control-sm'
                              value={form_data.boxType}
                              onChange={handleInput}
                            />
                            <span className='text-danger'>
                              {errors.boxType}
                            </span>
                          </div>
                          {/* <div className='mb-3'>
                            <label htmlFor='box_size' className='form-label'>
                              Box Size (Number of packet/leaf) <span className='text-danger'>*</span>
                            </label>
                            <input
                              type='text'
                              name='box_size'
                              className='form-control form-control-sm'
                              value={form_data.box_size}
                              onChange={handleInput}
                            />
                            <span className='text-danger'>{errors.box_size}</span>
                          </div> */}
                          <div className='mb-3'>
                            <label htmlFor='pktSize' className='form-label'>
                              Packet Size <span className='text-danger'>*</span>
                            </label>
                            <input
                              type='text'
                              name='pktSize'
                              className='form-control form-control-sm'
                              value={form_data.pktSize}
                              onChange={handleInput}
                            />
                            <span className='text-danger'>
                              {errors.pktSize}
                            </span>
                          </div>
                          <div className='mb-3'>
                            <label htmlFor='unit' className='form-label'>
                              Unit <span className='text-danger'>*</span>
                            </label>
                            <input
                              type='text'
                              name='unit'
                              className='form-control form-control-sm'
                              value={form_data.unit}
                              onChange={handleInput}
                            />
                            <span className='text-danger'>{errors.unit}</span>
                          </div>
                        </div>
                        <div className='col-md-12'>
                          <button
                            onClick={submitFormData}
                            className='btn btn-success btn-sm  float-end mt-2 text-uppercase'
                          >
                            <i className='fas fa-save'></i> Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDrugs;

// import React from 'react'
// import {useState} from 'react';
// import http from "../../../http";
// import {toast} from 'react-toastify';
// import Swal from 'sweetalert2';
// import {Link, useNavigate} from 'react-router-dom';
// import {useEffect} from 'react';

// function AddDrugs() {

//     const navigate = useNavigate();
//     const [errors, setError] = useState([]);
//     const [picture, setPicture] = useState([]);
//     const [category, setCategory] = useState([]);
//     const [subcategory, setSubCategory] = useState([]);
//     const [generic_name, setGenericName] = useState([]);
//     const [usual_provider, setUsualProvider] = useState([]);
//     const [brand, setBrand] = useState([]);
//     const [form_data, setFormData] = useState({
//         src_primary_key: "",
//         generic_id: "",
//         usual_provider_id: "",
//         drug_description: "",
//         strength: "",
//         macrohealth_sg: "",
//         mims_sg: "",
//         mims_type: "",
//         guid: "",
//         drug_name: "",
//         qty: "",
//         rpts: "",
//         bpp: "",
//         tgp: "",
//         restriction: "",
//         brand_id: "",
//         category_id: "",
//         sub_category_id: "",
//         stock: "",
//         drug_code: "",
//         class: "",
//         batch: "",
//         expiry_date: "",
//         price: "",
//         offer_price: "",
//         drug_discount: "",
//         cash_drug_discount: "",
//         card_drug_discount: "",
//         digital_drug_discount: "",
//         drug_weight: "",
//         main_image: "",
//         summary: "",
//         condition: "",
//         status: "",
//     });

//     // multiple inputs for academic
//     const [AcademicArray, setAcademicArray] = useState([
//         {
//             drugs_master_id: '',
//             // scan_copy_title: ''
//         }
//     ]);

//     const [scan_copy_Academic, setscan_copy_Academic] = useState([
//         {scan_copy: ''}]);

//     const handleChangeAcademic = (e, index) => {
//         const {name, value} = e.target;
//         const list = [...AcademicArray];
//         list[index][name] = value;
//         setAcademicArray(list);
//     }
//     const handle_Academic_File = (e, index) => {
//         if (e.target.files[0].size < 2000048) {
//             console.log("Index handle_Academic_File", index)

//             const {name} = e.target;

//             const fileList = [...scan_copy_Academic]

//             fileList[index][name] = e.target.files[0]

//             setscan_copy_Academic(fileList)

//             setdocImage_error(null)

//         } else {
//             setdocImage_error("File size must be less than 2 mb and file type pdf/jpg/jpeg/png !")
//         }

//     }

//     const handleAddInput = () => {

//         setAcademicArray([...AcademicArray, {
//             // scan_copy_title: '',
//             scan_copy: []
//         }]);

//         setscan_copy_Academic([...scan_copy_Academic, {
//             scan_copy: ''
//         }])

//     }

//     const handleRemoveInput = index => {
//         const list = [...AcademicArray];
//         list.splice(index, 1);
//         setAcademicArray(list);

//         const listFile = [...scan_copy_Academic];
//         listFile.splice(index, 1);
//         setscan_copy_Academic(list)
//     }

//     const [doctorImage, setdoctorImage] = useState();
//     const [docImage_error, setdocImage_error] = useState();

//     useEffect(() => {
//         http.get('brand').then(res => {
//             setBrand(res.data.data);
//         });
//         http.get('drug-generic-name').then(res => {
//             setGenericName(res.data.data);
//         });
//         http.get('category').then(res => {
//             setCategory(res.data.data);
//         });
//         http.get('subcategory').then(res => {
//             setSubCategory(res.data.data);
//         });
//         http.get('usual-provider').then(res => {
//             setUsualProvider(res.data.data);
//         });
//     }, []);

//     const handleInput = (e) => {
//         setFormData({
//             ...form_data, [e.target.name]: e.target.value
//         });
//     }

//     const [image_error, setimage_error] = useState();
//     const [imageUrl, setimageUrl] = useState();
//     const handleImage = (e) => {
//         e.persist();
//         if (e.target.files[0].size < 2000048) {
//             setPicture({main_image: e.target.files[0]})
//             setimage_error(null)
//         } else {
//             setimage_error("File size must be less than 2 mb !")
//         }
//         if (e.target.files && e.target.files[0] && e.target.files[0].size < 2000048) {
//             setimageUrl(URL.createObjectURL(e.target.files[0]))
//         } else {
//             setimage_error("File size must be less than 2 mb !")
//         }

//     }

//     const closeImage = () => {
//         setimageUrl()
//         document.getElementById('main_image').value = '';
//     }

//     const saveFirstInfo = (e) => {
//         e.preventDefault();
//         document.getElementById("v-pills-home-tab").className = "nav-link text-start"
//         document.getElementById("v-pills-home-tab").click()
//     }

//     const savePersonalInfo = (e) => {
//         e.preventDefault();
//         document.getElementById("v-pills-profile-tab").className = "nav-link text-start"
//         document.getElementById("v-pills-profile-tab").click()
//     }

//     const saveContactInfo = (e) => {
//         e.preventDefault();
//         document.getElementById("v-pills-messages-tab").className = "nav-link text-start"
//         document.getElementById("v-pills-messages-tab").click()
//     }

//     const saveAddressInfo = (e) => {
//         e.preventDefault();
//         document.getElementById("v-pills-settings-tab2").className = "nav-link text-start"
//         document.getElementById("v-pills-settings-tab2").click()
//     }

//     const saveNotesInfo = (e) => {
//         e.preventDefault();
//         document.getElementById("v-pills-settings-tab2").className = "nav-link text-start"
//         document.getElementById("v-pills-settings-tab2").click()
//     }

//     const submitFormData = (e) => {
//         e.preventDefault();

//         const formData = new FormData();

//         formData.append('src_primary_key', form_data.src_primary_key);
//         formData.append('generic_id', form_data.generic_id);
//         formData.append('usual_provider_id', form_data.usual_provider_id);
//         formData.append('drug_description', form_data.drug_description);
//         formData.append('strength', form_data.strength);
//         formData.append('macrohealth_sg', form_data.macrohealth_sg);
//         formData.append('mims_sg', form_data.mims_sg);
//         formData.append('mims_type', form_data.mims_type);
//         formData.append('guid', form_data.guid);
//         formData.append('drug_name', form_data.drug_name);
//         formData.append('qty', form_data.qty);
//         formData.append('rpts', form_data.rpts);
//         formData.append('bpp', form_data.bpp);
//         formData.append('tgp', form_data.tgp);
//         formData.append('restriction', form_data.restriction);
//         formData.append('brand_id', form_data.brand_id);
//         formData.append('category_id', form_data.category_id);
//         formData.append('sub_category_id', form_data.sub_category_id);
//         formData.append('stock', form_data.stock);
//         formData.append('drug_code', form_data.drug_code);
//         formData.append('class', form_data.class);
//         formData.append('batch', form_data.batch);
//         formData.append('expiry_date', form_data.expiry_date);
//         formData.append('price', form_data.price);
//         formData.append('offer_price', form_data.offer_price);

//         formData.append('drug_discount', form_data.drug_discount);
//         formData.append('cash_drug_discount', form_data.cash_drug_discount);
//         formData.append('card_drug_discount', form_data.card_drug_discount);
//         formData.append('digital_drug_discount', form_data.digital_drug_discount);

//         formData.append('drug_weight', form_data.drug_weight);
//         formData.append('summary', form_data.summary);
//         formData.append('condition', form_data.condition);
//         formData.append('status', form_data.status);
//         formData.append('main_image', picture.main_image);

//         http.post('drugs', formData).then(res => {
//         console.log(res);
//             if (res.data.status === 200) {

//                 AcademicArray.map((item, i) => {
//                     if (item.scan_copy !== '') {
//                         const academic = new FormData();
//                         academic.append('drugs_master_id', res.data.drugs.id);

//                         // academic.append('scan_copy_title', item.scan_copy_title);
//                         academic.append('scan_copy', scan_copy_Academic[i].scan_copy);

//                         console.log("FromData Academic", academic);
//                         http.post('save-drugs-images', academic).then(res => {
//                             console.log("save-doctors-academic")
//                         })
//                     }

//                 })

//                 Swal.fire({
//                     position: 'top-center',
//                     icon: 'success',
//                     title: res.data.message,
//                     timer: 2500
//                 })
//                 navigate('/drugs');
//             } else {
//                 setError(res.data.errors)
//             }

//         });

//     }

//     return (

//         <div className="page-content">

//             <div className="custom-card patients-head ">
//                 <h5 className="fw-normal custom_py-3 px-2  text-start mb-2 card-title">Add Drugs
//                     <button className="btn btn-sm btn-warning float-end" onClick={() => navigate(-1)}>
//                         <i className="fal fa-long-arrow-left"></i> Back</button>
//                 </h5>
//             </div>

//             <div className="row new-patient-entry me-1">
//                 <form className="" onSubmit={submitFormData}>
//                     <div className="d-flex align-items-start">
//                         <div className="nav custom-card col-md-3 flex-column nav-pills me-2" id="v-pills-tab" role="tablist"
//                              aria-orientation="vertical">
//                             <button className="nav-link text-start  active" id="v-pills-home-tab" data-bs-toggle="pill"
//                                     data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true"><i
//                                 className="fas menu-icon fa-plus-circle"></i> Drug Details
//                             </button>
//                             <button className="nav-link text-start disabled btnNEw" id="v-pills-profile-tab" data-bs-toggle="pill"
//                                     data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile"
//                                     aria-selected="false"><i className="fas menu-icon fa-plus-circle"></i> Pricing Details
//                             </button>
//                             <button className="nav-link text-start disabled btnNEw" id="v-pills-messages-tab" data-bs-toggle="pill"
//                                     data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages"
//                                     aria-selected="false"><i className="fas menu-icon fa-plus-circle"></i> Images
//                             </button>
//                             <button className="nav-link text-start disabled btnNEw" id="v-pills-settings-tab2" data-bs-toggle="pill"
//                                     data-bs-target="#v-pills-settings2" type="button" role="tab" aria-controls="v-pills-settings2"
//                                     aria-selected="false"><i className="fas menu-icon fa-plus-circle"></i> All
//                             </button>
//                         </div>

//                         <div className="tab-content col-md-9" id="v-pills-tabContent">
//                             <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">

//                                 <div className="custom-card mb-2">
//                                     <div className="pt-2 px-4">
//                                         <h6 className="">Drug Details
//                                             <button onClick={submitFormData} className="btn btn-success btn-sm text-uppercase float-end"><i
//                                                 className="fas fa-save"></i> Save
//                                             </button>
//                                         </h6>
//                                     </div>
//                                     <div className="card-body">
//                                         <div className="row">
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="src_primary_key" className="form-label">Source Primary Key</label>
//                                                     <input type="text" name="src_primary_key" className="form-control form-control-sm"
//                                                            value={form_data.src_primary_key}
//                                                            onChange={handleInput}/>
//                                                     <span className="text-danger">{errors.src_primary_key}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="generic_id" className="form-label">Generic Name</label>
//                                                     <select className="form-select form-select-sm" name="generic_id" id="generic_id"
//                                                             value={form_data.generic_id}
//                                                             onChange={handleInput}>
//                                                         <option selected="" disabled="">Select</option>
//                                                         {
//                                                             generic_name.map((item) => {
//                                                                 return (
//                                                                     <option value={item.id} key={item.id}>{item.generic_name}</option>
//                                                                 )
//                                                             })
//                                                         }
//                                                     </select>
//                                                     <span className="text-danger">{errors.generic_id}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="drug_description" className="form-label">Drug Description</label>
//                                                     <textarea name="drug_description" value={form_data.drug_description} onChange={handleInput}
//                                                               className="form-control form-control-sm" maxLength="100" rows="4"
//                                                               placeholder="Description..."></textarea>
//                                                     <span className="text-danger">{errors.drug_description}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="strength" className="form-label">Strength</label>
//                                                     <input type="text" name="strength" className="form-control form-control-sm"
//                                                            value={form_data.strength}
//                                                            onChange={handleInput}/>
//                                                     <span className="text-danger">{errors.strength}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="macrohealth_sg" className="form-label">Macro Health Sg Formulary</label>
//                                                     <input type="text" name="macrohealth_sg" className="form-control form-control-sm"
//                                                            value={form_data.macrohealth_sg}
//                                                            onChange={handleInput}/>
//                                                     <span className="text-danger">{errors.macrohealth_sg}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="mims_sg" className="form-label">Mims Sg</label>
//                                                     <input type="text" name="mims_sg" className="form-control form-control-sm"
//                                                            value={form_data.mims_sg}
//                                                            onChange={handleInput}/>
//                                                     <span className="text-danger">{errors.mims_sg}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="mims_type" className="form-label">Mims Type</label>
//                                                     <input type="text" name="mims_type" className="form-control form-control-sm"
//                                                            value={form_data.mims_type}
//                                                            onChange={handleInput}/>
//                                                     <span className="text-danger">{errors.mims_type}</span>
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="guid" className="form-label">GU ID</label>
//                                                     <input type="text" name="guid" className="form-control form-control-sm"
//                                                            value={form_data.guid}
//                                                            onChange={handleInput}/>
//                                                     <span className="text-danger">{errors.guid}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="drug_name" className="form-label">Drug Name</label>
//                                                     <input type="text" name="drug_name" className="form-control form-control-sm"
//                                                            value={form_data.drug_name}
//                                                            onChange={handleInput}/>
//                                                     <span className="text-danger">{errors.drug_name}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="qty" className="form-label">Qty</label>
//                                                     <input type="text" name="qty" className="form-control form-control-sm"
//                                                            value={form_data.qty}
//                                                            onChange={handleInput}/>
//                                                     <span className="text-danger">{errors.qty}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="rpts" className="form-label">Rpts</label>
//                                                     <input type="text" name="rpts" className="form-control form-control-sm"
//                                                            value={form_data.rpts}
//                                                            onChange={handleInput}/>
//                                                     <span className="text-danger">{errors.rpts}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="bpp" className="form-label">Bpp</label>
//                                                     <input type="text" name="bpp" className="form-control form-control-sm"
//                                                            value={form_data.bpp}
//                                                            onChange={handleInput}/>
//                                                     <span className="text-danger">{errors.bpp}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="tgp" className="form-label">Tgp/Spc</label>
//                                                     <input type="text" name="tgp" className="form-control form-control-sm"
//                                                            value={form_data.tgp}
//                                                            onChange={handleInput}/>
//                                                     <span className="text-danger">{errors.tgp}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="restriction" className="form-label">Restrictions</label>
//                                                     <input type="text" name="restriction" className="form-control form-control-sm"
//                                                            value={form_data.restriction}
//                                                            onChange={handleInput}/>
//                                                     <span className="text-danger">{errors.restriction}</span>
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-12 mt-2">
//                                                 <button onClick={submitFormData} className="btn btn-success btn-sm text-uppercase float-end"><i
//                                                     className="fas fa-save"></i> Save
//                                                 </button>
//                                                 <button onClick={savePersonalInfo} className="btn btn-primary btn-sm text-uppercase float-end me-2"><i
//                                                     className="far fa-hand-point-right"></i> Next
//                                                 </button>
//                                             </div>
//                                         </div>

//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
//                                 <div className="custom-card mb-2">
//                                     <div className="pt-1 px-4">
//                                         <h6 className="">Pricing Details</h6>
//                                     </div>
//                                     <div className="card-body">
//                                         <div className="row">
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="brand_id" className="form-label">Brand</label>
//                                                     <select className="form-select form-select-sm" name="brand_id" id="brand_id"
//                                                             value={form_data.brand_id}
//                                                             onChange={handleInput}>
//                                                         <option selected="" disabled="">Select</option>
//                                                         {
//                                                             brand.map((item) => {
//                                                                 return (
//                                                                     <option value={item.id} key={item.id}>{item.title}</option>
//                                                                 )
//                                                             })
//                                                         }
//                                                     </select>
//                                                     <span className="text-danger">{errors.brand_id}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="category_id" className="form-label">Category</label>
//                                                     <select className="form-select form-select-sm" name="category_id" id="category_id"
//                                                             value={form_data.category_id}
//                                                             onChange={handleInput}>
//                                                         <option selected="" disabled="">Select</option>
//                                                         {
//                                                             category.map((item) => {
//                                                                 return (
//                                                                     <option value={item.id} key={item.id}>{item.title}</option>
//                                                                 )
//                                                             })
//                                                         }
//                                                     </select>
//                                                     <span className="text-danger">{errors.category_id}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="sub_category_id" className="form-label">Sub Category</label>
//                                                     <select className="form-select form-select-sm" name="sub_category_id" id="sub_category_id"
//                                                             value={form_data.sub_category_id}
//                                                             onChange={handleInput}>
//                                                         <option selected="" disabled="">Select</option>
//                                                         {
//                                                             subcategory.map((item) => {
//                                                                 return (
//                                                                     <option value={item.id} key={item.id}>{item.title}</option>
//                                                                 )
//                                                             })
//                                                         }
//                                                     </select>
//                                                     <span className="text-danger">{errors.sub_category_id}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="stock" className="form-label">Stock</label>
//                                                     <input type="text" name="stock" className="form-control form-control-sm"
//                                                            value={form_data.stock}
//                                                            onChange={handleInput}/>
//                                                     <span className="text-danger">{errors.stock}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="drug_code" className="form-label">Drug Code</label>
//                                                     <input type="text" name="drug_code" className="form-control form-control-sm"
//                                                            value={form_data.drug_code}
//                                                            onChange={handleInput}/>
//                                                     <span className="text-danger">{errors.drug_code}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="class" className="form-label">Class</label>
//                                                     <input type="text" name="class" className="form-control form-control-sm"
//                                                            value={form_data.class}
//                                                            onChange={handleInput}/>
//                                                     <span className="text-danger">{errors.class}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="usual_provider_id" className="form-label">Usual Provider</label>
//                                                     <select className="form-select form-select-sm" name="usual_provider_id" id="usual_provider_id"
//                                                             value={form_data.usual_provider_id}
//                                                             onChange={handleInput}>
//                                                         <option selected="" disabled="">Select</option>
//                                                         {
//                                                             usual_provider.map((item) => {
//                                                                 return (
//                                                                     <option value={item.id} key={item.id}>{item.usual_provider}</option>
//                                                                 )
//                                                             })
//                                                         }
//                                                     </select>
//                                                     <span className="text-danger">{errors.usual_provider_id}</span>
//                                                 </div>
//                                             </div>

//                                             <div className="col-md-6">

//                                                 <div className="mb-3">
//                                                     <label htmlFor="batch" className="form-label">Batch</label>
//                                                     <input type="text" name="batch" className="form-control form-control-sm"
//                                                            value={form_data.batch}
//                                                            onChange={handleInput}/>
//                                                     <span className="text-danger">{errors.batch}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="expiry_date" className="form-label">Expiry Date</label>
//                                                     <input type="date" name="expiry_date" className="form-control form-control-sm"
//                                                            value={form_data.expiry_date}
//                                                            onChange={handleInput}/>
//                                                     <span className="text-danger">{errors.expiry_date}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="price" className="form-label">Price</label>
//                                                     <input type="text" name="price" className="form-control form-control-sm"
//                                                            value={form_data.price}
//                                                            onChange={handleInput}/>
//                                                     <span className="text-danger">{errors.price}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="offer_price" className="form-label">Offer Price</label>
//                                                     <input type="text" name="offer_price" className="form-control form-control-sm"
//                                                            value={form_data.offer_price}
//                                                            onChange={handleInput}/>
//                                                     <span className="text-danger">{errors.offer_price}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="drug_discount" className="form-label">Discount</label>
//                                                     <input type="text" name="drug_discount" className="form-control form-control-sm"
//                                                            value={form_data.drug_discount}
//                                                            onChange={handleInput}/>
//                                                     <span className="text-danger">{errors.drug_discount}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="cash_drug_discount" className="form-label">Cash Discount</label>
//                                                     <input type="text" name="cash_drug_discount" className="form-control form-control-sm"
//                                                            value={form_data.cash_drug_discount}
//                                                            onChange={handleInput}/>
//                                                     <span className="text-danger">{errors.cash_drug_discount}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="card_drug_discount" className="form-label">Card Discount</label>
//                                                     <input type="text" name="card_drug_discount" className="form-control form-control-sm"
//                                                            value={form_data.card_drug_discount}
//                                                            onChange={handleInput}/>
//                                                     <span className="text-danger">{errors.card_drug_discount}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="digital_drug_discount" className="form-label">Digital Payment Discount</label>
//                                                     <input type="text" name="digital_drug_discount" className="form-control form-control-sm"
//                                                            value={form_data.digital_drug_discount}
//                                                            onChange={handleInput}/>
//                                                     <span className="text-danger">{errors.digital_drug_discount}</span>
//                                                 </div>
//                                                 {/* <div className="mb-3">
//                                                     <label htmlFor="usual_provider_id" className="form-label">Usual Provider</label>
//                                                     <select className="form-select form-select-sm" name="usual_provider_id" id="usual_provider_id"
//                                                             value={form_data.usual_provider_id}
//                                                             onChange={handleInput}>
//                                                         <option selected="" disabled="">Select</option>
//                                                         {
//                                                             usual_provider.map((item) => {
//                                                                 return (
//                                                                     <option value={item.id} key={item.id}>{item.usual_provider}</option>
//                                                                 )
//                                                             })
//                                                         }
//                                                     </select>
//                                                     <span className="text-danger">{errors.usual_provider_id}</span>
//                                                 </div> */}
//                                             </div>
//                                             <div className="col-md-12">
//                                                 <button onClick={submitFormData} className="btn btn-success btn-sm  float-end mt-2 text-uppercase"><i
//                                                     className="fas fa-save"></i> Save
//                                                 </button>
//                                                 <button onClick={saveContactInfo}
//                                                         className="btn btn-primary btn-sm  float-end mt-2 me-2 text-uppercase"><i
//                                                     className="far fa-hand-point-right"></i> Next
//                                                 </button>
//                                                 <button onClick={saveFirstInfo}
//                                                         className="btn btn-primary btn-sm  float-end mt-2 me-2 text-uppercase"><i
//                                                     className="far fa-hand-point-left"></i> Previous
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">

//                                 <div className="custom-card mb-2">
//                                     <div className="pt-1 px-4">
//                                         <h6 className="">Images</h6>
//                                     </div>
//                                     <div className="card-body">
//                                         <div className="row">
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="drug_weight" className="form-label">Weight</label>
//                                                     <input type="text" name="drug_weight" className="form-control form-control-sm"
//                                                            value={form_data.drug_weight}
//                                                            onChange={handleInput}/>
//                                                     <span className="text-danger">{errors.drug_weight}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="main_image" className="form-label">Main Image
//                                                     </label>
//                                                     <input type="file" name="main_image" id="main_image" onChange={handleImage}
//                                                            className="form-control form-control-sm"
//                                                            accept="image/jpg,image/jpeg,image/gif,image/png"/>
//                                                     {
//                                                         image_error == null ?
//                                                             <p className="doc_image_size">Image size must be less than 2 mb!</p> :
//                                                             <p className="photo_size_error">{image_error}</p>
//                                                     }

//                                                     {imageUrl == null ? '' :
//                                                         <div className="photo_close">
//                                                             <img src={imageUrl} className="photo_preview_url" width="100" height="100"
//                                                                  alt="preview image"/>
//                                                             <i onClick={closeImage} className="far fa-times-circle"></i>
//                                                         </div>
//                                                     }
//                                                     <span className="text-danger">{errors.main_image}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="summary" className="form-label">Summary</label>
//                                                     <input type="text" name="summary" className="form-control form-control-sm"
//                                                            value={form_data.summary}
//                                                            onChange={handleInput}/>
//                                                     <span className="text-danger">{errors.summary}</span>
//                                                 </div>

//                                             </div>
//                                             <div className="col-md-6">

//                                                 <div className="mb-3">
//                                                     <label htmlFor="condition" className="form-label">Condition</label>
//                                                     <select className="form-select form-select-sm" name="condition" id="condition"
//                                                             value={form_data.condition} onChange={handleInput}>
//                                                         <option selected="" disabled="">Select</option>
//                                                         <option value="new">New</option>
//                                                         <option value="popular">Popular</option>
//                                                         <option value="old">Old</option>
//                                                     </select>
//                                                     <span className="text-danger">{errors.condition}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="status" className="form-label">Status</label>
//                                                     <select className="form-select form-select-sm" name="status" id="status"
//                                                             onChange={handleInput}
//                                                             value={form_data.status}>
//                                                         <option selected="" disabled="">Select</option>
//                                                         <option value="1">Active</option>
//                                                         <option value="0">Inactive</option>
//                                                     </select>
//                                                     <span className="text-danger">{errors.status}</span>
//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <label htmlFor="status" className="form-label">Multiple Image</label>

//                                                     {AcademicArray.map((item, i) => {
//                                                         return (
//                                                             <div key={i}>

//                                                                 {/*<input type="text" name="scan_copy_title" onChange={e => handleChangeAcademic(e, i)} value={item.scan_copy_title} className="form-control form-control-sm" />*/}

//                                                                 <input type="file" name="scan_copy" onChange={e => handle_Academic_File(e, i)}
//                                                                        className="form-control form-control-sm"
//                                                                        accept="image/jpg,image/jpeg,image/gif,image/png"/>

//                                                                 {
//                                                                     docImage_error == null ?
//                                                                         <p className="doc_image_size">Image size must be less than 2 mb!</p> :
//                                                                         <p className="docimage_error">{docImage_error}</p>
//                                                                 }

//                                                                 {AcademicArray.length - 1 === i &&
//                                                                 <input type="button" onClick={handleAddInput}
//                                                                        className="btn btn-success float-end mt-2 btn-sm" value="+ Add More"/>
//                                                                 }
//                                                                 {AcademicArray.length !== 1 &&
//                                                                 <input type="button" onClick={() => handleRemoveInput(i)}
//                                                                        className="btn btn-warning float-end mt-2 btn-sm mr-2 me-2" value="- Remove"/>
//                                                                 }

//                                                             </div>

//                                                         )
//                                                     })}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-12">
//                                                 <button onClick={submitFormData} className="btn btn-success btn-sm  float-end mt-2 text-uppercase"><i
//                                                     className="fas fa-save"></i> Save
//                                                 </button>
//                                                 <button onClick={saveNotesInfo} className="btn btn-primary btn-sm float-end mt-2 text-uppercase me-2">
//                                                     <i
//                                                         className="far fa-hand-point-right"></i> Next
//                                                 </button>
//                                                 <button onClick={savePersonalInfo}
//                                                         className="btn btn-primary btn-sm float-end mt-2 text-uppercase me-2"><i
//                                                     className="far fa-hand-point-left"></i> Previous
//                                                 </button>
//                                             </div>
//                                         </div>

//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="tab-pane fade" id="v-pills-settings2" role="tabpanel" aria-labelledby="v-pills-settings-tab2">
//                                 <form onSubmit={submitFormData}>

//                                     <div className="custom-card mb-2">
//                                         <div className="pt-1 px-4">
//                                             <h6 className="">Drug Details</h6>
//                                         </div>
//                                         <div className="card-body">
//                                             <div className="row">
//                                                 <div className="col-md-6">
//                                                     <div className="mb-3">
//                                                         <label htmlFor="src_primary_key" className="form-label">Source Primary Key</label>
//                                                         <input type="text" name="src_primary_key" className="form-control form-control-sm"
//                                                                value={form_data.src_primary_key}
//                                                                onChange={handleInput}/>
//                                                         <span className="text-danger">{errors.src_primary_key}</span>
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <label htmlFor="generic_id" className="form-label">Generic Name</label>
//                                                         <select className="form-select form-select-sm" name="generic_id" id="generic_id"
//                                                                 value={form_data.generic_id}
//                                                                 onChange={handleInput}>
//                                                             <option selected="" disabled="">Select</option>
//                                                             {
//                                                                 generic_name.map((item) => {
//                                                                     return (
//                                                                         <option value={item.id} key={item.id}>{item.generic_name}</option>
//                                                                     )
//                                                                 })
//                                                             }
//                                                         </select>
//                                                         <span className="text-danger">{errors.generic_id}</span>
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <label htmlFor="drug_description" className="form-label">Drug Description</label>
//                                                         <textarea name="drug_description" value={form_data.drug_description} onChange={handleInput}
//                                                                   className="form-control form-control-sm" maxLength="100" rows="4"
//                                                                   placeholder="Description..."></textarea>
//                                                         <span className="text-danger">{errors.drug_description}</span>
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <label htmlFor="strength" className="form-label">Strength</label>
//                                                         <input type="text" name="strength" className="form-control form-control-sm"
//                                                                value={form_data.strength}
//                                                                onChange={handleInput}/>
//                                                         <span className="text-danger">{errors.strength}</span>
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <label htmlFor="macrohealth_sg" className="form-label">Macro Health Sg Formulary</label>
//                                                         <input type="text" name="macrohealth_sg" className="form-control form-control-sm"
//                                                                value={form_data.macrohealth_sg}
//                                                                onChange={handleInput}/>
//                                                         <span className="text-danger">{errors.macrohealth_sg}</span>
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <label htmlFor="mims_sg" className="form-label">Mims Sg</label>
//                                                         <input type="text" name="mims_sg" className="form-control form-control-sm"
//                                                                value={form_data.mims_sg}
//                                                                onChange={handleInput}/>
//                                                         <span className="text-danger">{errors.mims_sg}</span>
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <label htmlFor="mims_type" className="form-label">Mims Type</label>
//                                                         <input type="text" name="mims_type" className="form-control form-control-sm"
//                                                                value={form_data.mims_type}
//                                                                onChange={handleInput}/>
//                                                         <span className="text-danger">{errors.mims_type}</span>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-6">
//                                                     <div className="mb-3">
//                                                         <label htmlFor="guid" className="form-label">GU ID</label>
//                                                         <input type="text" name="guid" className="form-control form-control-sm"
//                                                                value={form_data.guid}
//                                                                onChange={handleInput}/>
//                                                         <span className="text-danger">{errors.guid}</span>
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <label htmlFor="drug_name" className="form-label">Drug Name</label>
//                                                         <input type="text" name="drug_name" className="form-control form-control-sm"
//                                                                value={form_data.drug_name}
//                                                                onChange={handleInput}/>
//                                                         <span className="text-danger">{errors.drug_name}</span>
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <label htmlFor="qty" className="form-label">Qty</label>
//                                                         <input type="text" name="qty" className="form-control form-control-sm"
//                                                                value={form_data.qty}
//                                                                onChange={handleInput}/>
//                                                         <span className="text-danger">{errors.qty}</span>
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <label htmlFor="rpts" className="form-label">Rpts</label>
//                                                         <input type="text" name="rpts" className="form-control form-control-sm"
//                                                                value={form_data.rpts}
//                                                                onChange={handleInput}/>
//                                                         <span className="text-danger">{errors.rpts}</span>
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <label htmlFor="bpp" className="form-label">Bpp</label>
//                                                         <input type="text" name="bpp" className="form-control form-control-sm"
//                                                                value={form_data.bpp}
//                                                                onChange={handleInput}/>
//                                                         <span className="text-danger">{errors.bpp}</span>
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <label htmlFor="tgp" className="form-label">Tgp/Spc</label>
//                                                         <input type="text" name="tgp" className="form-control form-control-sm"
//                                                                value={form_data.tgp}
//                                                                onChange={handleInput}/>
//                                                         <span className="text-danger">{errors.tgp}</span>
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <label htmlFor="restriction" className="form-label">Restrictions</label>
//                                                         <input type="text" name="restriction" className="form-control form-control-sm"
//                                                                value={form_data.restriction}
//                                                                onChange={handleInput}/>
//                                                         <span className="text-danger">{errors.restriction}</span>
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                         </div>
//                                     </div>
//                                     <div className="custom-card mb-2">
//                                         <div className="pt-1 px-4">
//                                             <h6 className="">Pricing Details</h6>
//                                         </div>
//                                         <div className="card-body">
//                                             <div className="row">
//                                                 <div className="col-md-6">
//                                                     <div className="mb-3">
//                                                         <label htmlFor="brand_id" className="form-label">Brand</label>
//                                                         <select className="form-select form-select-sm" name="brand_id" id="brand_id"
//                                                                 value={form_data.brand_id}
//                                                                 onChange={handleInput}>
//                                                             <option selected="" disabled="">Select</option>
//                                                             {
//                                                                 brand.map((item) => {
//                                                                     return (
//                                                                         <option value={item.id} key={item.id}>{item.title}</option>
//                                                                     )
//                                                                 })
//                                                             }
//                                                         </select>
//                                                         <span className="text-danger">{errors.brand_id}</span>
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <label htmlFor="category_id" className="form-label">Category</label>
//                                                         <select className="form-select form-select-sm" name="category_id" id="category_id"
//                                                                 value={form_data.category_id}
//                                                                 onChange={handleInput}>
//                                                             <option selected="" disabled="">Select</option>
//                                                             {
//                                                                 category.map((item) => {
//                                                                     return (
//                                                                         <option value={item.id} key={item.id}>{item.title}</option>
//                                                                     )
//                                                                 })
//                                                             }
//                                                         </select>
//                                                         <span className="text-danger">{errors.category_id}</span>
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <label htmlFor="sub_category_id" className="form-label">Sub Category</label>
//                                                         <select className="form-select form-select-sm" name="sub_category_id" id="sub_category_id"
//                                                                 value={form_data.sub_category_id}
//                                                                 onChange={handleInput}>
//                                                             <option selected="" disabled="">Select</option>
//                                                             {
//                                                                 subcategory.map((item) => {
//                                                                     return (
//                                                                         <option value={item.id} key={item.id}>{item.title}</option>
//                                                                     )
//                                                                 })
//                                                             }
//                                                         </select>
//                                                         <span className="text-danger">{errors.sub_category_id}</span>
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <label htmlFor="stock" className="form-label">Stock</label>
//                                                         <input type="text" name="stock" className="form-control form-control-sm"
//                                                                value={form_data.stock}
//                                                                onChange={handleInput}/>
//                                                         <span className="text-danger">{errors.stock}</span>
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <label htmlFor="drug_code" className="form-label">Drug Code</label>
//                                                         <input type="text" name="drug_code" className="form-control form-control-sm"
//                                                                value={form_data.drug_code}
//                                                                onChange={handleInput}/>
//                                                         <span className="text-danger">{errors.drug_code}</span>
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <label htmlFor="class" className="form-label">Class</label>
//                                                         <input type="text" name="class" className="form-control form-control-sm"
//                                                                value={form_data.class}
//                                                                onChange={handleInput}/>
//                                                         <span className="text-danger">{errors.class}</span>
//                                                     </div>

//                                                 </div>
//                                                 <div className="col-md-6">

//                                                     <div className="mb-3">
//                                                         <label htmlFor="batch" className="form-label">Batch</label>
//                                                         <input type="text" name="batch" className="form-control form-control-sm"
//                                                                value={form_data.batch}
//                                                                onChange={handleInput}/>
//                                                         <span className="text-danger">{errors.batch}</span>
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <label htmlFor="expiry_date" className="form-label">Expiry Date</label>
//                                                         <input type="date" name="expiry_date" className="form-control form-control-sm"
//                                                                value={form_data.expiry_date}
//                                                                onChange={handleInput}/>
//                                                         <span className="text-danger">{errors.expiry_date}</span>
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <label htmlFor="price" className="form-label">Price</label>
//                                                         <input type="text" name="price" className="form-control form-control-sm"
//                                                                value={form_data.price}
//                                                                onChange={handleInput}/>
//                                                         <span className="text-danger">{errors.price}</span>
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <label htmlFor="offer_price" className="form-label">Offer Price</label>
//                                                         <input type="text" name="offer_price" className="form-control form-control-sm"
//                                                                value={form_data.offer_price}
//                                                                onChange={handleInput}/>
//                                                         <span className="text-danger">{errors.offer_price}</span>
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <label htmlFor="drug_discount" className="form-label">Discount</label>
//                                                         <input type="text" name="drug_discount" className="form-control form-control-sm"
//                                                                value={form_data.drug_discount}
//                                                                onChange={handleInput}/>
//                                                         <span className="text-danger">{errors.drug_discount}</span>
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <label htmlFor="usual_provider_id" className="form-label">Usual Provider</label>
//                                                         <select className="form-select form-select-sm" name="usual_provider_id" id="usual_provider_id"
//                                                                 value={form_data.usual_provider_id}
//                                                                 onChange={handleInput}>
//                                                             <option selected="" disabled="">Select</option>
//                                                             {
//                                                                 usual_provider.map((item) => {
//                                                                     return (
//                                                                         <option value={item.id} key={item.id}>{item.usual_provider}</option>
//                                                                     )
//                                                                 })
//                                                             }
//                                                         </select>
//                                                         <span className="text-danger">{errors.usual_provider_id}</span>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="custom-card mb-2">
//                                         <div className="pt-1 px-4">
//                                             <h6 className="">Images</h6>
//                                         </div>
//                                         <div className="card-body">
//                                             <div className="row">
//                                                 <div className="col-md-6">
//                                                     <div className="mb-3">
//                                                         <label htmlFor="drug_weight" className="form-label">Weight</label>
//                                                         <input type="text" name="drug_weight" className="form-control form-control-sm"
//                                                                value={form_data.drug_weight}
//                                                                onChange={handleInput}/>
//                                                         <span className="text-danger">{errors.drug_weight}</span>
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <label htmlFor="main_image" className="form-label">Main Image
//                                                         </label>
//                                                         <input type="file" name="main_image" id="main_image" onChange={handleImage}
//                                                                className="form-control form-control-sm"
//                                                                accept="image/jpg,image/jpeg,image/gif,image/png"/>
//                                                         {
//                                                             image_error == null ?
//                                                                 <p className="doc_image_size">Image size must be less than 2 mb!</p> :
//                                                                 <p className="photo_size_error">{image_error}</p>
//                                                         }

//                                                         {imageUrl == null ? '' :
//                                                             <div className="photo_close">
//                                                                 <img src={imageUrl} className="photo_preview_url" width="100" height="100"
//                                                                      alt="preview image"/>
//                                                                 <i onClick={closeImage} className="far fa-times-circle"></i>
//                                                             </div>
//                                                         }
//                                                         <span className="text-danger">{errors.main_image}</span>
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <label htmlFor="summary" className="form-label">Summary</label>
//                                                         <input type="text" name="summary" className="form-control form-control-sm"
//                                                                value={form_data.summary}
//                                                                onChange={handleInput}/>
//                                                         <span className="text-danger">{errors.summary}</span>
//                                                     </div>

//                                                 </div>
//                                                 <div className="col-md-6">

//                                                     <div className="mb-3">
//                                                         <label htmlFor="condition" className="form-label">Condition</label>
//                                                         <select className="form-select form-select-sm" name="condition" id="condition"
//                                                                 value={form_data.condition}
//                                                                 onChange={handleInput}>
//                                                             <option selected="" disabled="">Select</option>
//                                                             <option value="new">New</option>
//                                                             <option value="popular">Popular</option>
//                                                             <option value="old">Old</option>
//                                                         </select>
//                                                         <span className="text-danger">{errors.condition}</span>
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <label htmlFor="status" className="form-label">Status</label>
//                                                         <select className="form-select form-select-sm" name="status" id="status"
//                                                                 onChange={handleInput}
//                                                                 value={form_data.status}>
//                                                             <option selected="" disabled="">Select</option>
//                                                             <option value="1">Active</option>
//                                                             <option value="0">Inactive</option>
//                                                         </select>
//                                                         <span className="text-danger">{errors.status}</span>
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <label htmlFor="status" className="form-label">Multiple Image</label>

//                                                         {AcademicArray.map((item, i) => {
//                                                             return (
//                                                                 <div key={i}>

//                                                                     <input type="file" name="scan_copy" onChange={e => handle_Academic_File(e, i)}
//                                                                            className="form-control form-control-sm"
//                                                                            accept="image/jpg,image/jpeg,image/gif,image/png"/>

//                                                                     {
//                                                                         docImage_error == null ?
//                                                                             <p className="doc_image_size">Image size must be less than 2 mb!</p> :
//                                                                             <p className="docimage_error">{docImage_error}</p>
//                                                                     }

//                                                                     {AcademicArray.length - 1 === i &&
//                                                                     <input type="button" onClick={handleAddInput}
//                                                                            className="btn btn-success float-end mt-2 btn-sm" value="+ Add More"/>
//                                                                     }
//                                                                     {AcademicArray.length !== 1 &&
//                                                                     <input type="button" onClick={() => handleRemoveInput(i)}
//                                                                            className="btn btn-warning float-end mt-2 btn-sm mr-2 me-2" value="- Remove"/>
//                                                                     }

//                                                                 </div>

//                                                             )
//                                                         })}
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-12">
//                                                     <button onClick={submitFormData} className="btn btn-success btn-sm float-end mt-2 text-uppercase">
//                                                         <i
//                                                             className="fas fa-save"></i> Save
//                                                     </button>
//                                                     <button onClick={saveContactInfo}
//                                                             className="btn btn-primary btn-sm text-uppercase float-end mt-2 me-2"><i
//                                                         className="far fa-hand-point-right"></i> Previous
//                                                     </button>
//                                                 </div>
//                                             </div>

//                                         </div>
//                                     </div>

//                                 </form>

//                             </div>

//                         </div>

//                     </div>
//                 </form>
//             </div>
//         </div>

//     )
// }

// export default AddDrugs
