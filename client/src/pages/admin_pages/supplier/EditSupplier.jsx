import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import http from '../../../http';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Select from 'react-select';
import ReactDatePicker from 'react-datepicker';

function EditSupplier() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [errors, setError] = useState([]);
  const [picture, setPicture] = useState([]);
  const [scp_pic, setScpPicture] = useState([]);
  const [city, setCity] = useState([]);
  const [titles, setTitle] = useState([]);
  const [supplier_category, setSupplierCategory] = useState([]);
  const [country, setCountry] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [degrees, setDegree] = useState([]);
  const [form_data, setFormData] = useState({
    supplier_name: '',
    supplier_category_id: '',
    address_line_one: '',
    address_line_two: '',
    city_id: '',
    country_id: '',
    phone_number_one: '',
    phone_number_two: '',
    mobile: '',
    fax: '',
    email: '',
    website: '',

    mgt_title_id: '',
    mgt_picture: '',
    mgt_first_name: '',
    mgt_last_name: '',
    mgt_first_designation_id: '',
    mgt_second_designation_id: '',
    mgt_phn_no_one: '',
    mgt_phn_no_two: '',
    mgt_email: '',
    mgt_fax: '',

    scp_title_id: '',
    scp_picture: '',
    scp_first_name: '',
    scp_last_name: '',
    scp_family_name: '',
    scp_nick_name: '',
    scp_dob: '',
    scp_nid: '',
    scp_doj: '',
    scp_department: '',
    scp_designation_id: '',
    scp_email: '',
    scp_phn_no_one: '',
    scp_phn_no_two: '',
    scp_emergency_number: '',

    sci_supervisor_name: '',
    sci_designation_id: '',
    sci_supervisor_phn_no: '',
    sci_email: '',
    sci_highest_degree_id: '',

    ld_title_id: '',
    ld_name: '',
    ld_copy: '',
    ld_issue_date: '',
    ld_renew_date: '',
  });

  // multiple inputs for academic
  const [AcademicArray, setAcademicArray] = useState([
    {
      id: '',
      supplier_master_id: '',
      // scan_copy_title: ''
    },
  ]);

  const [scan_copy_Academic, setscan_copy_Academic] = useState([
    { scan_copy: '' },
  ]);

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
        id: '',
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

  // const handleRemoveInput = index => {
  //     const list = [...AcademicArray];
  //     list.splice(index, 1);
  //     setAcademicArray(list);
  //
  //     const listFile = [...scan_copy_Academic];
  //     listFile.splice(index, 1);
  //     setscan_copy_Academic(list)
  // }

  const handleRemoveInput = (index) => {
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
        const list = [...AcademicArray];
        list.splice(index, 1);
        setAcademicArray(list);

        const listFile = [...scan_copy_Academic];
        listFile.splice(index, 1);
        setscan_copy_Academic(list);

        if (AcademicArray[index].id !== '') {
          http
            .delete(`/destroy-supplier-legal-docs/${AcademicArray[index].id}`)
            .then((res) => {
              console.log('Academic row Detele');
            });
        }

        Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
      }
    });
  };

  const [docImage_error, setdocImage_error] = useState();

  const [CertificateArray, setCertificate] = useState([
    {
      id: '',
      supplier_master_id: '',
      facebook: '',
      linkedin: '',
      twitter: '',
    },
  ]);
  const [scan_copy_certificate, setscan_copy_certificate] = useState([
    { scan_copy: '' },
  ]);

  const handleChangeCertificate = (e, index) => {
    const { name, value } = e.target;
    const list = [...CertificateArray];
    list[index][name] = value;
    setCertificate(list);
  };

  const handleAddCertificate = () => {
    setCertificate([
      ...CertificateArray,
      {
        id: '',
        facebook: '',
        linkedin: '',
        twitter: '',
      },
    ]);

    setscan_copy_certificate([
      ...scan_copy_certificate,
      {
        scan_copy: '',
      },
    ]);
  };

  const handleRemoveCertificate = (i) => {
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
        const list = [...CertificateArray];
        list.splice(i, 1);
        setCertificate(list);

        const listCer = [...scan_copy_certificate];
        listCer.splice(i, 1);
        setscan_copy_certificate(listCer);

        if (CertificateArray[i].id !== '') {
          http
            .delete(`/destroy-supplier-social-media/${CertificateArray[i].id}`)
            .then((res) => {
              console.log('certificate row Detele');
            });
        }

        Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
      }
    });
  };
  const [brands, setBrands] = useState([]);
  // brads add
  const [brandsData, setBrandsData] = useState([
    {
      brand_id: '',
      brand_name: '',
    },
  ]);
  const handleBrandData = (e) => {
    setBrandsData([
      ...brandsData,
      {
        brand_id: '',
        brand_name: '',
      },
    ]);
  };
  const handleChangeBrandData = (e, i) => {
    const list = [...brandsData];
    list[i].brand_id = e.id;
    list[i].brand_name = e.title;
    setBrandsData(list);
  };
  const handleRemoveBrandData = (i) => {
    const list = [...brandsData];
    list.splice(i, 1);
    setBrandsData(list);
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
        const list = [...brandsData];
        list.splice(i, 1);
        setBrandsData(list);

        if (brandsData[i].id) {
          http
            .delete(`/delete-supplier-brands/${brandsData[i].id}`)
            .then((res) => {
              console.log('bradns row Detele');
            });
        }

        Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
      }
    });
  };
  console.log(brandsData, 'brands data');
  // brads add
  // social media

  useEffect(() => {
    http.get(`supplier/${id}/edit`).then((res) => {
      console.log(res.data.data);
      if (res.data.status === 200) {
        setFormData(res.data.data);

        if (res.data.academic.length > 0) {
          setAcademicArray(res.data.academic);
          setscan_copy_Academic(res.data.academic);
        }

        if (res.data.certificate.length > 0) {
          setCertificate(res.data.certificate);
          setscan_copy_certificate(res.data.certificate);
        }
      } else {
        setError(res.data.errors);
      }
    });
    http.get('city').then((res) => {
      setCity(res.data.data);
    });
    http.get('supplier-category').then((res) => {
      setSupplierCategory(res.data.data);
    });
    http.get('country').then((res) => {
      setCountry(res.data.data);
    });
    http.get('titles').then((res) => {
      setTitle(res.data.data);
    });
    http.get('designation').then((res) => {
      setDesignation(res.data.data);
    });
    http.get('degrees').then((res) => {
      setDegree(res.data.data);
    });
    http.get(`/brand`).then((res) => {
      if (res.status === 200) {
        setBrands(res.data.data);
      }
    });
    http.get(`/supplier-brands/${id}`).then((res) => {
      if (res.status === 200) {
        if (res.data.data.length > 0) {
          setBrandsData(res.data.data);
        }
      }
    });
  }, []);

  const handleInput = (e) => {
    setFormData({
      ...form_data,
      [e.target.name]: e.target.value,
    });
  };
  console.log(form_data, 'form_data');
  const [image_error, setimage_error] = useState();
  const [image_scp_error, setScpimage_error] = useState();
  const [imageUrl, setimageUrl] = useState();
  const [imageScpUrl, setScpimageUrl] = useState();
  const handleImage = (e) => {
    e.persist();
    if (e.target.files[0].size < 2000048) {
      setPicture({ mgt_picture: e.target.files[0] });
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
    document.getElementById('mgt_picture').value = '';
  };

  const handleScpImage = (e) => {
    e.persist();
    if (e.target.files[0].size < 2000048) {
      setScpPicture({ scp_picture: e.target.files[0] });
      setScpimage_error(null);
    } else {
      setScpimage_error('File size must be less than 2 mb !');
    }
    if (
      e.target.files &&
      e.target.files[0] &&
      e.target.files[0].size < 2000048
    ) {
      setScpimageUrl(URL.createObjectURL(e.target.files[0]));
    } else {
      setScpimage_error('File size must be less than 2 mb !');
    }
  };

  const closeScpImage = () => {
    setimageUrl();
    document.getElementById('scp_picture').value = '';
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
    document.getElementById('v-pills-messages-tab').className =
      'nav-link text-start';
    document.getElementById('v-pills-messages-tab').click();
  };

  const saveLegalInfo = (e) => {
    e.preventDefault();
    document.getElementById('v-pills-messages-tab2').className =
      'nav-link text-start';
    document.getElementById('v-pills-messages-tab2').click();
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

    formData.append(
      'supplier_name',
      form_data.supplier_name == null ? '' : form_data.supplier_name,
    );
    formData.append(
      'supplier_category_id',
      form_data.supplier_category_id == null
        ? ''
        : form_data.supplier_category_id,
    );
    formData.append(
      'address_line_one',
      form_data.address_line_one == null ? '' : form_data.address_line_one,
    );
    formData.append(
      'address_line_two',
      form_data.address_line_two == null ? '' : form_data.address_line_two,
    );
    formData.append(
      'city_id',
      form_data.city_id == null ? '' : form_data.city_id,
    );
    formData.append(
      'country_id',
      form_data.country_id == null ? '' : form_data.country_id,
    );
    formData.append(
      'phone_number_one',
      form_data.phone_number_one == null ? '' : form_data.phone_number_one,
    );
    formData.append(
      'phone_number_two',
      form_data.phone_number_two == null ? '' : form_data.phone_number_two,
    );
    formData.append('mobile', form_data.mobile == null ? '' : form_data.mobile);
    formData.append('fax', form_data.fax == null ? '' : form_data.fax);
    formData.append('email', form_data.email == null ? '' : form_data.email);
    formData.append(
      'website',
      form_data.website == null ? '' : form_data.website,
    );
    formData.append('vat', form_data.vat == null ? '' : form_data.vat);
    formData.append('tax', form_data.tax == null ? '' : form_data.tax);

    formData.append(
      'mgt_title_id',
      form_data.mgt_title_id == null ? '' : form_data.mgt_title_id,
    );

    formData.append('mgt_picture', picture.mgt_picture);

    formData.append(
      'mgt_first_name',
      form_data.mgt_first_name == null ? '' : form_data.mgt_first_name,
    );
    formData.append(
      'mgt_last_name',
      form_data.mgt_last_name == null ? '' : form_data.mgt_last_name,
    );
    formData.append(
      'mgt_first_designation_id',
      form_data.mgt_first_designation_id == null
        ? ''
        : form_data.mgt_first_designation_id,
    );
    formData.append(
      'mgt_second_designation_id',
      form_data.mgt_second_designation_id == null
        ? ''
        : form_data.mgt_second_designation_id,
    );
    formData.append(
      'mgt_phn_no_one',
      form_data.mgt_phn_no_one == null ? '' : form_data.mgt_phn_no_one,
    );
    formData.append(
      'mgt_phn_no_two',
      form_data.mgt_phn_no_two == null ? '' : form_data.mgt_phn_no_two,
    );
    formData.append(
      'mgt_email',
      form_data.mgt_email == null ? '' : form_data.mgt_email,
    );
    formData.append(
      'mgt_fax',
      form_data.mgt_fax == null ? '' : form_data.mgt_fax,
    );

    formData.append(
      'scp_title_id',
      form_data.scp_title_id == null ? '' : form_data.scp_title_id,
    );

    formData.append('scp_picture', scp_pic.scp_picture);

    formData.append(
      'scp_first_name',
      form_data.scp_first_name == null ? '' : form_data.scp_first_name,
    );
    formData.append(
      'scp_last_name',
      form_data.scp_last_name == null ? '' : form_data.scp_last_name,
    );
    formData.append(
      'scp_family_name',
      form_data.scp_family_name == null ? '' : form_data.scp_family_name,
    );
    formData.append(
      'scp_nick_name',
      form_data.scp_nick_name == null ? '' : form_data.scp_nick_name,
    );
    formData.append(
      'scp_dob',
      form_data.scp_dob == null ? '' : form_data.scp_dob,
    );
    formData.append(
      'scp_nid',
      form_data.scp_nid == null ? '' : form_data.scp_nid,
    );
    formData.append(
      'scp_doj',
      form_data.scp_doj == null ? '' : form_data.scp_doj,
    );
    formData.append(
      'scp_department',
      form_data.scp_department == null ? '' : form_data.scp_department,
    );
    formData.append(
      'scp_designation_id',
      form_data.scp_designation_id == null ? '' : form_data.scp_designation_id,
    );
    formData.append(
      'scp_email',
      form_data.scp_email == null ? '' : form_data.scp_email,
    );
    formData.append(
      'scp_phn_no_one',
      form_data.scp_phn_no_one == null ? '' : form_data.scp_phn_no_one,
    );
    formData.append(
      'scp_phn_no_two',
      form_data.scp_phn_no_two == null ? '' : form_data.scp_phn_no_two,
    );
    formData.append(
      'scp_emergency_number',
      form_data.scp_emergency_number == null
        ? ''
        : form_data.scp_emergency_number,
    );

    formData.append(
      'sci_supervisor_name',
      form_data.sci_supervisor_name == null
        ? ''
        : form_data.sci_supervisor_name,
    );
    formData.append(
      'sci_designation_id',
      form_data.sci_designation_id == null ? '' : form_data.sci_designation_id,
    );
    formData.append(
      'sci_supervisor_phn_no',
      form_data.sci_supervisor_phn_no == null
        ? ''
        : form_data.sci_supervisor_phn_no,
    );
    formData.append(
      'sci_email',
      form_data.sci_email == null ? '' : form_data.sci_email,
    );
    formData.append(
      'sci_highest_degree_id',
      form_data.sci_highest_degree_id == null
        ? ''
        : form_data.sci_highest_degree_id,
    );

    formData.append(
      'ld_title_id',
      form_data.ld_title_id == null ? '' : form_data.ld_title_id,
    );
    formData.append(
      'ld_name',
      form_data.ld_name == null ? '' : form_data.ld_name,
    );
    formData.append(
      'ld_copy',
      form_data.ld_copy == null ? '' : form_data.ld_copy,
    );
    formData.append(
      'ld_issue_date',
      form_data.ld_issue_date == null ? '' : form_data.ld_issue_date,
    );
    formData.append(
      'ld_renew_date',
      form_data.ld_renew_date == null ? '' : form_data.ld_renew_date,
    );

    http.post(`supplier/update/${id}`, formData).then((res) => {
      console.log(res, 'dde');
      if (res.data.status === 200) {
        brandsData.map((item, i) => {
          if (item.id) {
            const brands = new FormData();
            brands.append('suplier_id', id);
            brands.append('brand_id', item.brand_id);
            brands.append('brand_name', item.brand_name);
            http
              .post(`update-supplier-brands/${item.id}`, brands)
              .then((res) => {
                console.log(res, 'update-supplier-brands');
              });
          }

          if (!item.id) {
            const brands = new FormData();
            brands.append('suplier_id', id);
            brands.append('brand_id', item.brand_id);
            brands.append('brand_name', item.brand_name);
            http.post('add-supplier-brands', brands).then((res) => {
              console.log(res, 'add-supplier-brands');
            });
          }
        });

        AcademicArray.map((item, i) => {
          if (scan_copy_Academic[i].scan_copy !== '') {
            const academic = new FormData();
            academic.append(
              'supplier_master_id',
              res.data.requisition_master_id,
            );
            // academic.append('scan_copy_title', item.scan_copy_title);
            academic.append('scan_copy', scan_copy_Academic[i].scan_copy);

            if (item.id !== '') {
              http
                .post(`/update-supplier-legal-docs/${item.id}`, academic)
                .then((res) => {
                  console.log('save-doctors-academic');
                });
            } else {
              http.post('save-legal-docs-images', academic).then((res) => {
                console.log('save-doctors-academic');
              });
            }
          }
        });

        CertificateArray.map((item, i) => {
          if (item.certificate_title !== '') {
            const academic = new FormData();
            academic.append('supplier_master_id', res.data.drugs_id);
            academic.append('facebook', item.facebook);
            academic.append('linkedin', item.linkedin);
            academic.append('twitter', item.twitter);

            if (item.id !== '') {
              http
                .post(`/update-supplier-social-media/${item.id}`, academic)
                .then((res) => {
                  console.log('update-supplier-social-media');
                });
            } else {
              http.post('save-supplier-social-media', academic).then((res) => {
                console.log('save-supplier-social-media');
              });
            }
          }
        });

        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: res.data.message,
          timer: 2500,
        });
        navigate('/supplier');
      } else {
        setError(res.data.errors);
      }
    });
  };

  return (
    <div className='page-content'>
      <div className='custom-card patients-head '>
        <h5 className='fw-normal custom_py-3 px-2  text-start mb-2 card-title'>
          Edit Supplier
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
                <i className='fas menu-icon fa-info-circle'></i> Supplier Info
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
                <i className='fas menu-icon fa-cog'></i> Management
              </button>
              <button
                className='nav-link text-start disabled btnNEw'
                id='v-pills-messages-tab'
                data-bs-toggle='pill'
                data-bs-target='#v-pills-messages'
                type='button'
                role='tab'
                aria-controls='v-pills-messages'
                aria-selected='false'
              >
                <i className='fas menu-icon fa-user-circle'></i> Sales Contact
              </button>
              <button
                className='nav-link text-start disabled btnNEw'
                id='v-pills-messages-tab2'
                data-bs-toggle='pill'
                data-bs-target='#v-pills-messages2'
                type='button'
                role='tab'
                aria-controls='v-pills-messages2'
                aria-selected='false'
              >
                <i className='fas menu-icon fa-plus-circle'></i> Legal Docs
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
                      Supplier Info
                      <button
                        onClick={submitFormData}
                        className='btn btn-success btn-sm text-uppercase float-end'
                      >
                        <i className='fas fa-save'></i> Update
                      </button>
                    </h6>
                  </div>
                  <div className='card-body'>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='supplier_name' className='form-label'>
                            Name
                          </label>
                          <input
                            type='text'
                            name='supplier_name'
                            className='form-control form-control-sm'
                            value={form_data.supplier_name}
                            onChange={handleInput}
                          />
                          <span className='text-danger'>
                            {errors.supplier_name}
                          </span>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label
                            htmlFor='supplier_category_id'
                            className='form-label'
                          >
                            Category
                          </label>
                          <select
                            className='form-select form-select-sm'
                            name='supplier_category_id'
                            id='supplier_category_id'
                            value={form_data.supplier_category_id}
                            onChange={handleInput}
                          >
                            <option selected='' disabled=''>
                              Select
                            </option>
                            {supplier_category.map((item) => {
                              return (
                                <option value={item.id} key={item.id}>
                                  {item.supplier_category_name}
                                </option>
                              );
                            })}
                          </select>
                          <span className='text-danger'>
                            {errors.supplier_category_id}
                          </span>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label
                            htmlFor='address_line_one'
                            className='form-label'
                          >
                            Address Line 1
                          </label>
                          <textarea
                            name='address_line_one'
                            value={form_data.address_line_one}
                            onChange={handleInput}
                            className='form-control form-control-sm'
                            maxLength='100'
                            rows='4'
                          ></textarea>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label
                            htmlFor='address_line_two'
                            className='form-label'
                          >
                            Address Line 2
                          </label>
                          <textarea
                            name='address_line_two'
                            value={form_data.address_line_two}
                            onChange={handleInput}
                            className='form-control form-control-sm'
                            maxLength='100'
                            rows='4'
                          ></textarea>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='city_id' className='form-label'>
                            City
                          </label>
                          <select
                            className='form-select form-select-sm'
                            name='city_id'
                            id='city_id'
                            value={form_data.city_id}
                            onChange={handleInput}
                          >
                            <option selected='' disabled=''>
                              Select
                            </option>
                            {city.map((item) => {
                              return (
                                <option value={item.id} key={item.id}>
                                  {item.city_name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='country_id' className='form-label'>
                            Country
                          </label>
                          <select
                            className='form-select form-select-sm'
                            name='country_id'
                            id='country_id'
                            value={form_data.country_id}
                            onChange={handleInput}
                          >
                            <option selected='' disabled=''>
                              Select
                            </option>
                            {country.map((item) => {
                              return (
                                <option value={item.id} key={item.id}>
                                  {item.country_name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label
                            htmlFor='phone_number_one'
                            className='form-label'
                          >
                            Phone Number 1
                          </label>
                          <input
                            type='text'
                            name='phone_number_one'
                            className='form-control form-control-sm'
                            value={form_data.phone_number_one}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label
                            htmlFor='phone_number_two'
                            className='form-label'
                          >
                            Phone Number 2
                          </label>
                          <input
                            type='text'
                            name='phone_number_two'
                            className='form-control form-control-sm'
                            value={form_data.phone_number_two}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='mobile' className='form-label'>
                            Mobile
                          </label>
                          <input
                            type='text'
                            name='mobile'
                            className='form-control form-control-sm'
                            value={form_data.mobile}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='website' className='form-label'>
                            Website
                          </label>
                          <input
                            type='text'
                            name='website'
                            className='form-control form-control-sm'
                            value={form_data.website}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='email' className='form-label'>
                            Email
                          </label>
                          <input
                            type='text'
                            name='email'
                            className='form-control form-control-sm'
                            value={form_data.email}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='fax' className='form-label'>
                            Commisstion %
                          </label>
                          <input
                            type='number'
                            name='fax'
                            className='form-control form-control-sm'
                            value={form_data.fax}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='vat' className='form-label'>
                            Vat %
                          </label>
                          <input
                            type='number'
                            name='vat'
                            className='form-control form-control-sm'
                            value={form_data.vat}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='tax' className='form-label'>
                            Tax %
                          </label>
                          <input
                            type='number'
                            name='tax'
                            className='form-control form-control-sm'
                            value={form_data.tax}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      {brandsData.map((item, i) => {
                        return (
                          <div key={i} className='col-md-6'>
                            <div className=''>
                              <div className='mb'>
                                <label htmlFor='website' className='form-label'>
                                  Brands
                                </label>
                                <Select
                                  options={brands}
                                  placeholder={'Select'}
                                  onChange={(e) => {
                                    handleChangeBrandData(e, i);
                                  }}
                                  getOptionLabel={(brand) => `${brand.title}`}
                                  getOptionValue={(brand) => `${brand.id}`}
                                  value={brands.filter(
                                    (p) => p.id == item.brand_id,
                                  )}
                                />
                              </div>
                              {brandsData.length - 1 === i && (
                                <button
                                  type='button'
                                  onClick={handleBrandData}
                                  className='btn-success btn float-end mt-2 btn-sm'
                                >
                                  + Add More
                                </button>
                              )}
                              {brandsData.length !== 1 && (
                                <input
                                  type='button'
                                  onClick={() => handleRemoveBrandData(i)}
                                  className='btn btn-warning float-end mt-2 btn-sm me-2'
                                  value='- Remove'
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                      <div className='col-md-12 mt-2'>
                        <button
                          onClick={submitFormData}
                          className='btn btn-success btn-sm text-uppercase float-end'
                        >
                          <i className='fas fa-save'></i> Update
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
                    <h6 className=''>Management Information</h6>
                  </div>
                  <div className='card-body'>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='mgt_title_id' className='form-label'>
                            Title
                          </label>
                          <select
                            className='form-select form-select-sm'
                            name='mgt_title_id'
                            id='mgt_title_id'
                            value={form_data.mgt_title_id}
                            onChange={handleInput}
                          >
                            <option selected='' disabled=''>
                              Select
                            </option>
                            {titles.map((item) => {
                              return (
                                <option value={item.id} key={item.id}>
                                  {item.title_name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='mgt_picture' className='form-label'>
                            Picture
                          </label>
                          {/*<input type="file" name="mgt_picture" id="mgt_picture" onChange={handleImage}*/}
                          {/*       className="form-control form-control-sm"*/}
                          {/*       accept="image/jpg,image/jpeg,image/gif,image/png"/>*/}
                          {/*{*/}
                          {/*    image_error == null ?*/}
                          {/*        <p className="doc_image_size">Image size must be less than 2 mb!</p> :*/}
                          {/*        <p className="photo_size_error">{image_error}</p>*/}
                          {/*}*/}

                          {/*{imageUrl == null ? '' :*/}
                          {/*    <div className="photo_close">*/}
                          {/*        <img src={imageUrl} className="photo_preview_url" width="100" height="100"*/}
                          {/*             alt="preview image"/>*/}
                          {/*        <i onClick={closeImage} className="far fa-times-circle"></i>*/}
                          {/*    </div>*/}
                          {/*}*/}

                          <input
                            type='file'
                            name='mgt_picture'
                            className='form-control form-control-sm'
                            onChange={handleImage}
                            id='imageUrl'
                            accept='image/jpg,image/jpeg,image/gif,image/png'
                          />
                          {image_error == null ? (
                            <p className='doc_image_size'>
                              Image size must be less than 2 mb
                            </p>
                          ) : (
                            <p className='photo_size_error'>{image_error}</p>
                          )}

                          {imageUrl == null ? (
                            <img
                              src={`${global.img_url}/files/mgt_picture/${form_data.mgt_picture}`}
                              width='100'
                              className='imageUrlPreview'
                              alt='preview image'
                            />
                          ) : (
                            <div className='photo_close'>
                              <img
                                src={imageUrl}
                                className='photo_preview_url'
                                width='100'
                                alt='preview image'
                              />
                              <i
                                onClick={closeImage}
                                class='far fa-times-circle'
                              ></i>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label
                            htmlFor='mgt_first_name'
                            className='form-label'
                          >
                            First Name
                          </label>
                          <input
                            type='text'
                            name='mgt_first_name'
                            className='form-control form-control-sm'
                            value={form_data.mgt_first_name}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='mgt_last_name' className='form-label'>
                            Last Name
                          </label>
                          <input
                            type='text'
                            name='mgt_last_name'
                            className='form-control form-control-sm'
                            value={form_data.mgt_last_name}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label
                            htmlFor='mgt_first_designation_id'
                            className='form-label'
                          >
                            1st Designation
                          </label>
                          <select
                            className='form-select form-select-sm'
                            name='mgt_first_designation_id'
                            id='mgt_first_designation_id'
                            value={form_data.mgt_first_designation_id}
                            onChange={handleInput}
                          >
                            <option selected='' disabled=''>
                              Select
                            </option>
                            {designation.map((item) => {
                              return (
                                <option value={item.id} key={item.id}>
                                  {item.designation_name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label
                            htmlFor='mgt_second_designation_id'
                            className='form-label'
                          >
                            2nd Designation
                          </label>
                          <select
                            className='form-select form-select-sm'
                            name='mgt_second_designation_id'
                            id='mgt_second_designation_id'
                            value={form_data.mgt_second_designation_id}
                            onChange={handleInput}
                          >
                            <option selected='' disabled=''>
                              Select
                            </option>
                            {designation.map((item) => {
                              return (
                                <option value={item.id} key={item.id}>
                                  {item.designation_name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label
                            htmlFor='mgt_phn_no_one'
                            className='form-label'
                          >
                            Phone Number 1
                          </label>
                          <input
                            type='text'
                            name='mgt_phn_no_one'
                            className='form-control form-control-sm'
                            value={form_data.mgt_phn_no_one}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label
                            htmlFor='mgt_phn_no_two'
                            className='form-label'
                          >
                            Phone Number 2
                          </label>
                          <input
                            type='text'
                            name='mgt_phn_no_two'
                            className='form-control form-control-sm'
                            value={form_data.mgt_phn_no_two}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='mgt_email' className='form-label'>
                            Email
                          </label>
                          <input
                            type='text'
                            name='mgt_email'
                            className='form-control form-control-sm'
                            value={form_data.mgt_email}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='mgt_fax' className='form-label'>
                            Fax
                          </label>
                          <input
                            type='text'
                            name='mgt_fax'
                            className='form-control form-control-sm'
                            value={form_data.mgt_fax}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                    </div>

                    {CertificateArray.map((item, i) => {
                      return (
                        <div className='row' key={i}>
                          <h6 className='pt-3 pb-2'>Social Media</h6>

                          <div className='col-md-6'>
                            <div className='mb-3'>
                              <label htmlFor='facebook' className='form-label'>
                                Facebook
                              </label>
                              <input
                                type='text'
                                name='facebook'
                                className='form-control form-control-sm'
                                value={item.facebook}
                                onChange={(e) => handleChangeCertificate(e, i)}
                              />
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className='mb-3'>
                              <label htmlFor='linkedin' className='form-label'>
                                Linkedin
                              </label>
                              <input
                                type='text'
                                name='linkedin'
                                className='form-control form-control-sm'
                                value={item.linkedin}
                                onChange={(e) => handleChangeCertificate(e, i)}
                              />
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className='mb-3'>
                              <label htmlFor='twitter' className='form-label'>
                                Twitter
                              </label>
                              <input
                                type='text'
                                name='twitter'
                                className='form-control form-control-sm'
                                value={item.twitter}
                                onChange={(e) => handleChangeCertificate(e, i)}
                              />
                            </div>
                          </div>
                          <div className='col-md-12'>
                            {CertificateArray.length - 1 === i && (
                              <input
                                type='button'
                                onClick={handleAddCertificate}
                                className='btn btn-success float-end mt-2 btn-sm'
                                value='+ Add More'
                              />
                            )}
                            {CertificateArray.length !== 1 && (
                              <input
                                type='button'
                                onClick={() => handleRemoveCertificate(i)}
                                className='btn btn-warning float-end mt-2 btn-sm mr-2'
                                value='- Remove'
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}

                    <div className='row'>
                      <div className='col-md-12'>
                        <button
                          onClick={submitFormData}
                          className='btn btn-success btn-sm  float-end mt-2 text-uppercase'
                        >
                          <i className='fas fa-save'></i> Update
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
                id='v-pills-messages'
                role='tabpanel'
                aria-labelledby='v-pills-messages-tab'
              >
                <div className='custom-card mb-2'>
                  <div className='pt-1 px-4'>
                    <h6 className=''>Sales Contact Person</h6>
                  </div>
                  <div className='card-body'>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='scp_title_id' className='form-label'>
                            Title
                          </label>
                          <select
                            className='form-select form-select-sm'
                            name='scp_title_id'
                            id='scp_title_id'
                            value={form_data.scp_title_id}
                            onChange={handleInput}
                          >
                            <option selected='' disabled=''>
                              Select
                            </option>
                            {titles.map((item) => {
                              return (
                                <option value={item.id} key={item.id}>
                                  {item.title_name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='scp_picture' className='form-label'>
                            Picture
                          </label>
                          {/*<input type="file" name="scp_picture" id="scp_picture" onChange={handleScpImage}*/}
                          {/*       className="form-control form-control-sm"*/}
                          {/*       accept="image/jpg,image/jpeg,image/gif,image/png"/>*/}
                          {/*{*/}
                          {/*    image_scp_error == null ?*/}
                          {/*        <p className="doc_image_size">Image size must be less than 2 mb!</p> :*/}
                          {/*        <p className="photo_size_error">{image_scp_error}</p>*/}
                          {/*}*/}

                          {/*{imageScpUrl == null ? '' :*/}
                          {/*    <div className="photo_close">*/}
                          {/*        <img src={imageScpUrl} className="photo_preview_url" width="100" height="100"*/}
                          {/*             alt="preview image"/>*/}
                          {/*        <i onClick={closeScpImage} className="far fa-times-circle"></i>*/}
                          {/*    </div>*/}
                          {/*}*/}

                          <input
                            type='file'
                            name='scp_picture'
                            className='form-control form-control-sm'
                            onChange={handleScpImage}
                            id='imageUrl'
                            accept='image/jpg,image/jpeg,image/gif,image/png'
                          />
                          {image_scp_error == null ? (
                            <p className='doc_image_size'>
                              Image size must be less than 2 mb
                            </p>
                          ) : (
                            <p className='photo_size_error'>
                              {image_scp_error}
                            </p>
                          )}

                          {imageScpUrl == null ? (
                            <img
                              src={`${global.img_url}/files/scp_picture/${form_data.scp_picture}`}
                              width='100'
                              className='imageUrlPreview'
                              alt='preview image'
                            />
                          ) : (
                            <div className='photo_close'>
                              <img
                                src={imageScpUrl}
                                className='photo_preview_url'
                                width='100'
                                alt='preview image'
                              />
                              <i
                                onClick={closeScpImage}
                                class='far fa-times-circle'
                              ></i>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label
                            htmlFor='scp_first_name'
                            className='form-label'
                          >
                            First Name
                          </label>
                          <input
                            type='text'
                            name='scp_first_name'
                            className='form-control form-control-sm'
                            value={form_data.scp_first_name}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='scp_last_name' className='form-label'>
                            Last Name
                          </label>
                          <input
                            type='text'
                            name='scp_last_name'
                            className='form-control form-control-sm'
                            value={form_data.scp_last_name}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label
                            htmlFor='scp_family_name'
                            className='form-label'
                          >
                            Family Name
                          </label>
                          <input
                            type='text'
                            name='scp_family_name'
                            className='form-control form-control-sm'
                            value={form_data.scp_family_name}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='scp_nick_name' className='form-label'>
                            Nick Name
                          </label>
                          <input
                            type='text'
                            name='scp_nick_name'
                            className='form-control form-control-sm'
                            value={form_data.scp_nick_name}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='scp_dob' className='form-label'>
                            DOB
                          </label>
                          <br />
                          <ReactDatePicker
                            selected={
                              form_data.scp_dob
                                ? new Date(form_data.scp_dob)
                                : null
                            }
                            placeholderText='DD/MM/YYYY'
                            className='form-control form-control-sm custom-datepicker-input-width'
                            dateFormat={'dd/MM/yyyy'}
                            onChange={(date) => {
                              handleInput({
                                target: { name: 'scp_dob', value: date },
                              });
                            }}
                          />
                          {/* <input type="text" name="scp_dob" className="form-control form-control-sm"
                                                        value={form_data.scp_dob}
                                                        onChange={handleInput} /> */}
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='scp_nid' className='form-label'>
                            NID
                          </label>
                          <input
                            type='text'
                            name='scp_nid'
                            className='form-control form-control-sm'
                            value={form_data.scp_nid}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='scp_doj' className='form-label'>
                            DOJ
                          </label>
                          <br />
                          <ReactDatePicker
                            selected={
                              form_data.scp_doj
                                ? new Date(form_data.scp_doj)
                                : null
                            }
                            placeholderText='DD/MM/YYYY'
                            className='form-control form-control-sm custom-datepicker-input-width'
                            dateFormat={'dd/MM/yyyy'}
                            onChange={(date) => {
                              handleInput({
                                target: { name: 'scp_doj', value: date },
                              });
                            }}
                          />
                          {/* <input
                            type='text'
                            name='scp_doj'
                            className='form-control form-control-sm'
                            value={form_data.scp_doj}
                            onChange={handleInput}
                          /> */}
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label
                            htmlFor='scp_department'
                            className='form-label'
                          >
                            Department
                          </label>
                          <input
                            type='text'
                            name='scp_department'
                            className='form-control form-control-sm'
                            value={form_data.scp_department}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label
                            htmlFor='scp_designation_id'
                            className='form-label'
                          >
                            Designation
                          </label>
                          <select
                            className='form-select form-select-sm'
                            name='scp_designation_id'
                            id='scp_designation_id'
                            value={form_data.scp_designation_id}
                            onChange={handleInput}
                          >
                            <option selected='' disabled=''>
                              Select
                            </option>
                            {designation.map((item) => {
                              return (
                                <option value={item.id} key={item.id}>
                                  {item.designation_name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='scp_email' className='form-label'>
                            Email
                          </label>
                          <input
                            type='text'
                            name='scp_email'
                            className='form-control form-control-sm'
                            value={form_data.scp_email}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label
                            htmlFor='scp_phn_no_one'
                            className='form-label'
                          >
                            Phone Number 1
                          </label>
                          <input
                            type='text'
                            name='scp_phn_no_one'
                            className='form-control form-control-sm'
                            value={form_data.scp_phn_no_one}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label
                            htmlFor='scp_phn_no_two'
                            className='form-label'
                          >
                            Phone Number 2
                          </label>
                          <input
                            type='text'
                            name='scp_phn_no_two'
                            className='form-control form-control-sm'
                            value={form_data.scp_phn_no_two}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label
                            htmlFor='scp_emergency_number'
                            className='form-label'
                          >
                            Emergency Number
                          </label>
                          <input
                            type='text'
                            name='scp_emergency_number'
                            className='form-control form-control-sm'
                            value={form_data.scp_emergency_number}
                            onChange={handleInput}
                          />
                        </div>
                      </div>

                      <h6 className='pt-3 pb-2'>
                        Supervisor Contact Information
                      </h6>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label
                            htmlFor='sci_supervisor_name'
                            className='form-label'
                          >
                            Supervisor Name
                          </label>
                          <input
                            type='text'
                            name='sci_supervisor_name'
                            className='form-control form-control-sm'
                            value={form_data.sci_supervisor_name}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label
                            htmlFor='sci_designation_id'
                            className='form-label'
                          >
                            Designation
                          </label>
                          <select
                            className='form-select form-select-sm'
                            name='sci_designation_id'
                            id='sci_designation_id'
                            value={form_data.sci_designation_id}
                            onChange={handleInput}
                          >
                            <option selected='' disabled=''>
                              Select
                            </option>
                            {designation.map((item) => {
                              return (
                                <option value={item.id} key={item.id}>
                                  {item.designation_name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label
                            htmlFor='sci_supervisor_phn_no'
                            className='form-label'
                          >
                            Supervisor Phone
                          </label>
                          <input
                            type='text'
                            name='sci_supervisor_phn_no'
                            className='form-control form-control-sm'
                            value={form_data.sci_supervisor_phn_no}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='sci_email' className='form-label'>
                            Email
                          </label>
                          <input
                            type='text'
                            name='sci_email'
                            className='form-control form-control-sm'
                            value={form_data.sci_email}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label
                            htmlFor='sci_highest_degree_id'
                            className='form-label'
                          >
                            Highest Degree
                          </label>
                          <select
                            className='form-select form-select-sm'
                            name='sci_highest_degree_id'
                            id='sci_highest_degree_id'
                            value={form_data.sci_highest_degree_id}
                            onChange={handleInput}
                          >
                            <option selected='' disabled=''>
                              Select
                            </option>
                            {degrees.map((item) => {
                              return (
                                <option value={item.id} key={item.id}>
                                  {item.degree_name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className='col-md-12'>
                        <button
                          onClick={submitFormData}
                          className='btn btn-success btn-sm  float-end mt-2 text-uppercase'
                        >
                          <i className='fas fa-save'></i> Update
                        </button>
                        <button
                          onClick={saveLegalInfo}
                          className='btn btn-primary btn-sm float-end mt-2 text-uppercase me-2'
                        >
                          <i className='far fa-hand-point-right'></i> Next
                        </button>
                        <button
                          onClick={savePersonalInfo}
                          className='btn btn-primary btn-sm float-end mt-2 text-uppercase me-2'
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
                id='v-pills-messages2'
                role='tabpanel'
                aria-labelledby='v-pills-messages-tab'
              >
                <div className='custom-card mb-2'>
                  <div className='pt-1 px-4'>
                    <h6 className=''>Legal Docs</h6>
                  </div>
                  <div className='card-body'>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='ld_title_id' className='form-label'>
                            Title
                          </label>
                          <select
                            className='form-select form-select-sm'
                            name='ld_title_id'
                            id='ld_title_id'
                            value={form_data.ld_title_id}
                            onChange={handleInput}
                          >
                            <option selected='' disabled=''>
                              Select
                            </option>
                            {titles.map((item) => {
                              return (
                                <option value={item.id} key={item.id}>
                                  {item.title_name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='ld_name' className='form-label'>
                            Name
                          </label>
                          <input
                            type='text'
                            name='ld_name'
                            className='form-control form-control-sm'
                            value={form_data.ld_name}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='ld_copy' className='form-label'>
                            Copy
                          </label>
                          <input
                            type='text'
                            name='ld_copy'
                            className='form-control form-control-sm'
                            value={form_data.ld_copy}
                            onChange={handleInput}
                          />
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='ld_issue_date' className='form-label'>
                            Issue Date
                          </label>
                          <br />
                          <ReactDatePicker
                            selected={
                              form_data.ld_issue_date
                                ? new Date(form_data.ld_issue_date)
                                : null
                            }
                            placeholderText='DD/MM/YYYY'
                            className='form-control form-control-sm custom-datepicker-input-width'
                            dateFormat={'dd/MM/yyyy'}
                            onChange={(date) => {
                              handleInput({
                                target: { name: 'ld_issue_date', value: date },
                              });
                            }}
                          />
                          {/* <input
                            type='date'
                            name='ld_issue_date'
                            className='form-control form-control-sm'
                            value={form_data.ld_issue_date}
                            onChange={handleInput}
                          /> */}
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor='ld_renew_date' className='form-label'>
                            Renew Date
                          </label>
                          <br />
                          <ReactDatePicker
                            selected={
                              form_data.ld_renew_date
                                ? new Date(form_data.ld_renew_date)
                                : null
                            }
                            placeholderText='DD/MM/YYYY'
                            className='form-control form-control-sm custom-datepicker-input-width'
                            dateFormat={'dd/MM/yyyy'}
                            onChange={(date) => {
                              handleInput({
                                target: { name: 'ld_renew_date', value: date },
                              });
                            }}
                          />
                          {/* <input
                            type='date'
                            name='ld_renew_date'
                            className='form-control form-control-sm'
                            value={form_data.ld_renew_date}
                            onChange={handleInput}
                          /> */}
                        </div>
                      </div>
                      <div className='col-md-6'>
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
                                  accept='image/jpg,image/jpeg,image/gif,image/png,application/pdf'
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
                      <div className='col-md-12'>
                        <button
                          onClick={submitFormData}
                          className='btn btn-success btn-sm  float-end mt-2 text-uppercase'
                        >
                          <i className='fas fa-save'></i> Update
                        </button>
                        <button
                          onClick={saveNotesInfo}
                          className='btn btn-primary btn-sm float-end mt-2 text-uppercase me-2'
                        >
                          <i className='far fa-hand-point-right'></i> Next
                        </button>
                        <button
                          onClick={saveContactInfo}
                          className='btn btn-primary btn-sm float-end mt-2 text-uppercase me-2'
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
                      <h6 className=''>Supplier Info</h6>
                    </div>
                    <div className='card-body'>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='supplier_name'
                              className='form-label'
                            >
                              Name
                            </label>
                            <input
                              type='text'
                              name='supplier_name'
                              className='form-control form-control-sm'
                              value={form_data.supplier_name}
                              onChange={handleInput}
                            />
                            <span className='text-danger'>
                              {errors.supplier_name}
                            </span>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='supplier_category_id'
                              className='form-label'
                            >
                              Category
                            </label>
                            <select
                              className='form-select form-select-sm'
                              name='supplier_category_id'
                              id='supplier_category_id'
                              value={form_data.supplier_category_id}
                              onChange={handleInput}
                            >
                              <option selected='' disabled=''>
                                Select
                              </option>
                              {supplier_category.map((item) => {
                                return (
                                  <option value={item.id} key={item.id}>
                                    {item.supplier_category_name}
                                  </option>
                                );
                              })}
                            </select>
                            <span className='text-danger'>
                              {errors.supplier_category_id}
                            </span>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='address_line_one'
                              className='form-label'
                            >
                              Address Line 1
                            </label>
                            <textarea
                              name='address_line_one'
                              value={form_data.address_line_one}
                              onChange={handleInput}
                              className='form-control form-control-sm'
                              maxLength='100'
                              rows='4'
                            ></textarea>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='address_line_two'
                              className='form-label'
                            >
                              Address Line 2
                            </label>
                            <textarea
                              name='address_line_two'
                              value={form_data.address_line_two}
                              onChange={handleInput}
                              className='form-control form-control-sm'
                              maxLength='100'
                              rows='4'
                            ></textarea>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label htmlFor='city_id' className='form-label'>
                              City
                            </label>
                            <select
                              className='form-select form-select-sm'
                              name='city_id'
                              id='city_id'
                              value={form_data.city_id}
                              onChange={handleInput}
                            >
                              <option selected='' disabled=''>
                                Select
                              </option>
                              {city.map((item) => {
                                return (
                                  <option value={item.id} key={item.id}>
                                    {item.city_name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label htmlFor='country_id' className='form-label'>
                              Country
                            </label>
                            <select
                              className='form-select form-select-sm'
                              name='country_id'
                              id='country_id'
                              value={form_data.country_id}
                              onChange={handleInput}
                            >
                              <option selected='' disabled=''>
                                Select
                              </option>
                              {country.map((item) => {
                                return (
                                  <option value={item.id} key={item.id}>
                                    {item.country_name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='phone_number_one'
                              className='form-label'
                            >
                              Phone Number 1
                            </label>
                            <input
                              type='text'
                              name='phone_number_one'
                              className='form-control form-control-sm'
                              value={form_data.phone_number_one}
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='phone_number_two'
                              className='form-label'
                            >
                              Phone Number 2
                            </label>
                            <input
                              type='text'
                              name='phone_number_two'
                              className='form-control form-control-sm'
                              value={form_data.phone_number_two}
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label htmlFor='mobile' className='form-label'>
                              Mobile
                            </label>
                            <input
                              type='text'
                              name='mobile'
                              className='form-control form-control-sm'
                              value={form_data.mobile}
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label htmlFor='fax' className='form-label'>
                              Fax
                            </label>
                            <input
                              type='text'
                              name='fax'
                              className='form-control form-control-sm'
                              value={form_data.fax}
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label htmlFor='email' className='form-label'>
                              Email
                            </label>
                            <input
                              type='text'
                              name='email'
                              className='form-control form-control-sm'
                              value={form_data.email}
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label htmlFor='website' className='form-label'>
                              Website
                            </label>
                            <input
                              type='text'
                              name='website'
                              className='form-control form-control-sm'
                              value={form_data.website}
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='custom-card mb-2'>
                    <div className='pt-1 px-4'>
                      <h6 className=''>Management Information</h6>
                    </div>
                    <div className='card-body'>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='mgt_title_id'
                              className='form-label'
                            >
                              Title
                            </label>
                            <select
                              className='form-select form-select-sm'
                              name='mgt_title_id'
                              id='mgt_title_id'
                              value={form_data.mgt_title_id}
                              onChange={handleInput}
                            >
                              <option selected='' disabled=''>
                                Select
                              </option>
                              {titles.map((item) => {
                                return (
                                  <option value={item.id} key={item.id}>
                                    {item.title_name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label htmlFor='mgt_picture' className='form-label'>
                              Picture
                            </label>
                            <input
                              type='file'
                              name='mgt_picture'
                              className='form-control form-control-sm'
                              onChange={handleImage}
                              id='imageUrl'
                              accept='image/jpg,image/jpeg,image/gif,image/png'
                            />
                            {image_error == null ? (
                              <p className='doc_image_size'>
                                Image size must be less than 2 mb
                              </p>
                            ) : (
                              <p className='photo_size_error'>{image_error}</p>
                            )}

                            {imageUrl == null ? (
                              <img
                                src={`${global.img_url}/files/mgt_picture/${form_data.mgt_picture}`}
                                width='100'
                                className='imageUrlPreview'
                                alt='preview image'
                              />
                            ) : (
                              <div className='photo_close'>
                                <img
                                  src={imageUrl}
                                  className='photo_preview_url'
                                  width='100'
                                  alt='preview image'
                                />
                                <i
                                  onClick={closeImage}
                                  class='far fa-times-circle'
                                ></i>
                              </div>
                            )}
                            {/*<span className="text-danger">{errors.mgt_picture}</span>*/}
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='mgt_first_name'
                              className='form-label'
                            >
                              First Name
                            </label>
                            <input
                              type='text'
                              name='mgt_first_name'
                              className='form-control form-control-sm'
                              value={form_data.mgt_first_name}
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='mgt_last_name'
                              className='form-label'
                            >
                              Last Name
                            </label>
                            <input
                              type='text'
                              name='mgt_last_name'
                              className='form-control form-control-sm'
                              value={form_data.mgt_last_name}
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='mgt_first_designation_id'
                              className='form-label'
                            >
                              1st Designation
                            </label>
                            <select
                              className='form-select form-select-sm'
                              name='mgt_first_designation_id'
                              id='mgt_first_designation_id'
                              value={form_data.mgt_first_designation_id}
                              onChange={handleInput}
                            >
                              <option selected='' disabled=''>
                                Select
                              </option>
                              {designation.map((item) => {
                                return (
                                  <option value={item.id} key={item.id}>
                                    {item.designation_name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='mgt_second_designation_id'
                              className='form-label'
                            >
                              2nd Designation
                            </label>
                            <select
                              className='form-select form-select-sm'
                              name='mgt_second_designation_id'
                              id='mgt_second_designation_id'
                              value={form_data.mgt_second_designation_id}
                              onChange={handleInput}
                            >
                              <option selected='' disabled=''>
                                Select
                              </option>
                              {designation.map((item) => {
                                return (
                                  <option value={item.id} key={item.id}>
                                    {item.designation_name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='mgt_phn_no_one'
                              className='form-label'
                            >
                              Phone Number 1
                            </label>
                            <input
                              type='text'
                              name='mgt_phn_no_one'
                              className='form-control form-control-sm'
                              value={form_data.mgt_phn_no_one}
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='mgt_phn_no_two'
                              className='form-label'
                            >
                              Phone Number 2
                            </label>
                            <input
                              type='text'
                              name='mgt_phn_no_two'
                              className='form-control form-control-sm'
                              value={form_data.mgt_phn_no_two}
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label htmlFor='mgt_email' className='form-label'>
                              Email
                            </label>
                            <input
                              type='text'
                              name='mgt_email'
                              className='form-control form-control-sm'
                              value={form_data.mgt_email}
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label htmlFor='mgt_fax' className='form-label'>
                              Fax
                            </label>
                            <input
                              type='text'
                              name='mgt_fax'
                              className='form-control form-control-sm'
                              value={form_data.mgt_fax}
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                      </div>

                      {CertificateArray.map((item, i) => {
                        return (
                          <div className='row' key={i}>
                            <h6 className='pt-3 pb-2'>Social Media</h6>

                            <div className='col-md-6'>
                              <div className='mb-3'>
                                <label
                                  htmlFor='facebook'
                                  className='form-label'
                                >
                                  Facebook
                                </label>
                                <input
                                  type='text'
                                  name='facebook'
                                  className='form-control form-control-sm'
                                  value={item.facebook}
                                  onChange={(e) =>
                                    handleChangeCertificate(e, i)
                                  }
                                />
                              </div>
                            </div>
                            <div className='col-md-6'>
                              <div className='mb-3'>
                                <label
                                  htmlFor='linkedin'
                                  className='form-label'
                                >
                                  Linkedin
                                </label>
                                <input
                                  type='text'
                                  name='linkedin'
                                  className='form-control form-control-sm'
                                  value={item.linkedin}
                                  onChange={(e) =>
                                    handleChangeCertificate(e, i)
                                  }
                                />
                              </div>
                            </div>
                            <div className='col-md-6'>
                              <div className='mb-3'>
                                <label htmlFor='twitter' className='form-label'>
                                  Twitter
                                </label>
                                <input
                                  type='text'
                                  name='twitter'
                                  className='form-control form-control-sm'
                                  value={item.twitter}
                                  onChange={(e) =>
                                    handleChangeCertificate(e, i)
                                  }
                                />
                              </div>
                            </div>
                            <div className='col-md-12'>
                              {CertificateArray.length - 1 === i && (
                                <input
                                  type='button'
                                  onClick={handleAddCertificate}
                                  className='btn btn-success float-end mt-2 btn-sm'
                                  value='+ Add More'
                                />
                              )}
                              {CertificateArray.length !== 1 && (
                                <input
                                  type='button'
                                  onClick={() => handleRemoveCertificate(i)}
                                  className='btn btn-warning float-end mt-2 btn-sm mr-2'
                                  value='- Remove'
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className='custom-card mb-2'>
                    <div className='pt-1 px-4'>
                      <h6 className=''>Sales Contact Person</h6>
                    </div>

                    <div className='card-body'>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='scp_title_id'
                              className='form-label'
                            >
                              Title
                            </label>
                            <select
                              className='form-select form-select-sm'
                              name='scp_title_id'
                              id='scp_title_id'
                              value={form_data.scp_title_id}
                              onChange={handleInput}
                            >
                              <option selected='' disabled=''>
                                Select
                              </option>
                              {titles.map((item) => {
                                return (
                                  <option value={item.id} key={item.id}>
                                    {item.title_name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label htmlFor='scp_picture' className='form-label'>
                              Picture
                            </label>
                            <input
                              type='file'
                              name='scp_picture'
                              className='form-control form-control-sm'
                              onChange={handleScpImage}
                              id='imageUrl'
                              accept='image/jpg,image/jpeg,image/gif,image/png'
                            />
                            {image_scp_error == null ? (
                              <p className='doc_image_size'>
                                Image size must be less than 2 mb
                              </p>
                            ) : (
                              <p className='photo_size_error'>
                                {image_scp_error}
                              </p>
                            )}

                            {imageScpUrl == null ? (
                              <img
                                src={`${global.img_url}/files/scp_picture/${form_data.scp_picture}`}
                                width='100'
                                className='imageUrlPreview'
                                alt='preview image'
                              />
                            ) : (
                              <div className='photo_close'>
                                <img
                                  src={imageScpUrl}
                                  className='photo_preview_url'
                                  width='100'
                                  alt='preview image'
                                />
                                <i
                                  onClick={closeScpImage}
                                  class='far fa-times-circle'
                                ></i>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='scp_first_name'
                              className='form-label'
                            >
                              First Name
                            </label>
                            <input
                              type='text'
                              name='scp_first_name'
                              className='form-control form-control-sm'
                              value={form_data.scp_first_name}
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='scp_last_name'
                              className='form-label'
                            >
                              Last Name
                            </label>
                            <input
                              type='text'
                              name='scp_last_name'
                              className='form-control form-control-sm'
                              value={form_data.scp_last_name}
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='scp_family_name'
                              className='form-label'
                            >
                              Family Name
                            </label>
                            <input
                              type='text'
                              name='scp_family_name'
                              className='form-control form-control-sm'
                              value={form_data.scp_family_name}
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='scp_nick_name'
                              className='form-label'
                            >
                              Nick Name
                            </label>
                            <input
                              type='text'
                              name='scp_nick_name'
                              className='form-control form-control-sm'
                              value={form_data.scp_nick_name}
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label htmlFor='scp_dob' className='form-label'>
                              DOB
                            </label>
                            <br />
                            <ReactDatePicker
                              selected={
                                form_data.scp_dob
                                  ? new Date(form_data.scp_dob)
                                  : null
                              }
                              placeholderText='DD/MM/YYYY'
                              className='form-control form-control-sm custom-datepicker-input-width'
                              dateFormat={'dd/MM/yyyy'}
                              onChange={(date) => {
                                handleInput({
                                  target: { name: 'scp_dob', value: date },
                                });
                              }}
                            />
                            {/* <input
                              type='text'
                              name='scp_dob'
                              className='form-control form-control-sm'
                              value={form_data.scp_dob}
                              onChange={handleInput}
                            /> */}
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label htmlFor='scp_nid' className='form-label'>
                              NID
                            </label>
                            <input
                              type='text'
                              name='scp_nid'
                              className='form-control form-control-sm'
                              value={form_data.scp_nid}
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label htmlFor='scp_doj' className='form-label'>
                              DOJ
                            </label>
                            <br />
                            <ReactDatePicker
                              selected={
                                form_data.scp_doj
                                  ? new Date(form_data.scp_doj)
                                  : null
                              }
                              placeholderText='DD/MM/YYYY'
                              className='form-control form-control-sm custom-datepicker-input-width'
                              dateFormat={'dd/MM/yyyy'}
                              onChange={(date) => {
                                handleInput({
                                  target: { name: 'scp_doj', value: date },
                                });
                              }}
                            />
                            {/* <input
                              type='text'
                              name='scp_doj'
                              className='form-control form-control-sm'
                              value={form_data.scp_doj}
                              onChange={handleInput}
                            /> */}
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='scp_department'
                              className='form-label'
                            >
                              Department
                            </label>
                            <input
                              type='text'
                              name='scp_department'
                              className='form-control form-control-sm'
                              value={form_data.scp_department}
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='scp_designation_id'
                              className='form-label'
                            >
                              Designation
                            </label>
                            <select
                              className='form-select form-select-sm'
                              name='scp_designation_id'
                              id='scp_designation_id'
                              value={form_data.scp_designation_id}
                              onChange={handleInput}
                            >
                              <option selected='' disabled=''>
                                Select
                              </option>
                              {designation.map((item) => {
                                return (
                                  <option value={item.id} key={item.id}>
                                    {item.designation_name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label htmlFor='scp_email' className='form-label'>
                              Email
                            </label>
                            <input
                              type='text'
                              name='scp_email'
                              className='form-control form-control-sm'
                              value={form_data.scp_email}
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='scp_phn_no_one'
                              className='form-label'
                            >
                              Phone Number 1
                            </label>
                            <input
                              type='text'
                              name='scp_phn_no_one'
                              className='form-control form-control-sm'
                              value={form_data.scp_phn_no_one}
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='scp_phn_no_two'
                              className='form-label'
                            >
                              Phone Number 2
                            </label>
                            <input
                              type='text'
                              name='scp_phn_no_two'
                              className='form-control form-control-sm'
                              value={form_data.scp_phn_no_two}
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='scp_emergency_number'
                              className='form-label'
                            >
                              Emergency Number
                            </label>
                            <input
                              type='text'
                              name='scp_emergency_number'
                              className='form-control form-control-sm'
                              value={form_data.scp_emergency_number}
                              onChange={handleInput}
                            />
                          </div>
                        </div>

                        <h6 className='pt-3 pb-2'>
                          Supervisor Contact Information
                        </h6>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='sci_supervisor_name'
                              className='form-label'
                            >
                              Supervisor Name
                            </label>
                            <input
                              type='text'
                              name='sci_supervisor_name'
                              className='form-control form-control-sm'
                              value={form_data.sci_supervisor_name}
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='sci_designation_id'
                              className='form-label'
                            >
                              Designation
                            </label>
                            <select
                              className='form-select form-select-sm'
                              name='sci_designation_id'
                              id='sci_designation_id'
                              value={form_data.sci_designation_id}
                              onChange={handleInput}
                            >
                              <option selected='' disabled=''>
                                Select
                              </option>
                              {designation.map((item) => {
                                return (
                                  <option value={item.id} key={item.id}>
                                    {item.designation_name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='sci_supervisor_phn_no'
                              className='form-label'
                            >
                              Supervisor Phone
                            </label>
                            <input
                              type='text'
                              name='sci_supervisor_phn_no'
                              className='form-control form-control-sm'
                              value={form_data.sci_supervisor_phn_no}
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label htmlFor='sci_email' className='form-label'>
                              Email
                            </label>
                            <input
                              type='text'
                              name='sci_email'
                              className='form-control form-control-sm'
                              value={form_data.sci_email}
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='sci_highest_degree_id'
                              className='form-label'
                            >
                              Highest Degree
                            </label>
                            <select
                              className='form-select form-select-sm'
                              name='sci_highest_degree_id'
                              id='sci_highest_degree_id'
                              value={form_data.sci_highest_degree_id}
                              onChange={handleInput}
                            >
                              <option selected='' disabled=''>
                                Select
                              </option>
                              {degrees.map((item) => {
                                return (
                                  <option value={item.id} key={item.id}>
                                    {item.degree_name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='custom-card mb-2'>
                    <div className='pt-1 px-4'>
                      <h6 className=''>Legal Docs</h6>
                    </div>
                    <div className='card-body'>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label htmlFor='ld_title_id' className='form-label'>
                              Title
                            </label>
                            <select
                              className='form-select form-select-sm'
                              name='ld_title_id'
                              id='ld_title_id'
                              value={form_data.ld_title_id}
                              onChange={handleInput}
                            >
                              <option selected='' disabled=''>
                                Select
                              </option>
                              {titles.map((item) => {
                                return (
                                  <option value={item.id} key={item.id}>
                                    {item.title_name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label htmlFor='ld_name' className='form-label'>
                              Name
                            </label>
                            <input
                              type='text'
                              name='ld_name'
                              className='form-control form-control-sm'
                              value={form_data.ld_name}
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label htmlFor='ld_copy' className='form-label'>
                              Copy
                            </label>
                            <input
                              type='text'
                              name='ld_copy'
                              className='form-control form-control-sm'
                              value={form_data.ld_copy}
                              onChange={handleInput}
                            />
                          </div>
                        </div>

                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='ld_issue_date'
                              className='form-label'
                            >
                              Issue Date
                            </label>
                            <br />
                            <ReactDatePicker
                              selected={
                                form_data.ld_issue_date
                                  ? new Date(form_data.ld_issue_date)
                                  : null
                              }
                              placeholderText='DD/MM/YYYY'
                              className='form-control form-control-sm custom-datepicker-input-width'
                              dateFormat={'dd/MM/yyyy'}
                              onChange={(date) => {
                                handleInput({
                                  target: {
                                    name: 'ld_issue_date',
                                    value: date,
                                  },
                                });
                              }}
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='mb-3'>
                            <label
                              htmlFor='ld_renew_date'
                              className='form-label'
                            >
                              Renew Date
                            </label>
                            <br />
                            <ReactDatePicker
                              selected={
                                form_data.ld_renew_date
                                  ? new Date(form_data.ld_renew_date)
                                  : null
                              }
                              placeholderText='DD/MM/YYYY'
                              className='form-control form-control-sm custom-datepicker-input-width'
                              dateFormat={'dd/MM/yyyy'}
                              onChange={(date) => {
                                handleInput({
                                  target: {
                                    name: 'ld_renew_date',
                                    value: date,
                                  },
                                });
                              }}
                            />
                            {/* <input
                              type='date'
                              name='ld_renew_date'
                              className='form-control form-control-sm'
                              value={form_data.ld_renew_date}
                              onChange={handleInput}
                            /> */}
                          </div>
                        </div>
                        <div className='col-md-6'>
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
                                    accept='image/jpg,image/jpeg,image/gif,image/png,application/pdf'
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

                        <div className='col-md-12'>
                          <button
                            onClick={submitFormData}
                            className='btn btn-success btn-sm  float-end mt-2 text-uppercase'
                          >
                            <i className='fas fa-save'></i> Update
                          </button>
                          <button
                            onClick={saveLegalInfo}
                            className='btn btn-primary btn-sm float-end mt-2 text-uppercase me-2'
                          >
                            <i className='far fa-hand-point-left'></i> Previous
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

export default EditSupplier;
