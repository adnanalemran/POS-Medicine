import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import http from "../../../http";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import {useNavigate, useParams} from 'react-router-dom';
import '../../../imageUrl';


function EditBrand() {

    const [todo, setTodo] = useState([]);
    const [error, setError] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {

    

        // const carotid_id = props.match.params.id;
        http.get(`/brand/${id}/edit`).then(res => {
            // console.log(id);

            if (res.data.status === 200) {
                console.log(res.data);
                setTodo(res.data.data);
                // setPicture(res.data.todo.image);
            } else if (res.data.status === 404) {
                setError(res.data.errors);
            }

        });

    }, []);

    

    const handleInput = (e) => {
        e.persist();
        setTodo({ ...todo, [e.target.name]: e.target.value });
    }

    const [docImage_error, setdocImage_error] = useState();
    const [doctorImageUrl, setdoctorImageUrl] = useState();
    const [doctorImage, setdoctorImage] = useState();


    const handleDoctorImageUrl = (event) => {

        if (event.target.files[0].size < 2000048) {
            setdoctorImage(event.target.files[0])
            setdocImage_error(null)
        } else {
            setdocImage_error("File size must be less than 2 mb !")
        }
        if (event.target.files && event.target.files[0] && event.target.files[0].size < 2000048) {
            setdoctorImageUrl(URL.createObjectURL(event.target.files[0]));
        } else {
            setdocImage_error("File size must be less than 2 mb !")
        }
    }
    const closeImage = () => {
        setdoctorImageUrl()
        document.getElementById('doctorImageUrl').value = '';
    }


    const updateTodo = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', todo.title);
        formData.append('status', todo.status);
        // formData.append('photo', todo.photo);

        formData.append('photo', doctorImage == null ? todo.photo : doctorImage);




        http.post(`/brand/update/${id}`, formData).then(res => {
            // console.log(res.data);

            if (res.data.status === 200) {

                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res.data.message,
                    timer: 2500
                  })

                // setTodo({
                //     ...todo,

                // });

                navigate('/brand');

            } else {
                setError(res.data.errors)
            }
        });

    }

  return (
      <div className="page-content">
          {/* <nav className="page-breadcrumb">
              <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Brand</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Edit Brand</li>
              </ol>
          </nav> */}

            <div className="custom-card patients-head ">
                <h5 className="fw-normal custom_py-3 px-2  text-start mb-2 card-title">Edit Brand
                <button className="btn btn-sm btn-warning float-end" onClick={() => navigate(-1)}>
                <i class="fal fa-long-arrow-left"></i> Back</button>
                </h5>
            </div>




          <div className="row">
              <div className="col-lg-12 grid-margin stretch-card">
                  <div className="card">
                      <div className="card-body">
                          
                          <form onSubmit={updateTodo}>

                              <div className="mb-3">
                                  <label htmlFor="name" className="form-label">Title</label>
                                  <input type="text" name="title"  id="title" value={todo.title} onChange={handleInput} className="form-control form-control-sm"  />
                                  <span className="text-danger">{error.title}</span>
                              </div>
                                
                              <div className="mb-3">
                                  <label htmlFor="todo" className="form-label">Photo</label>
                                  {/* <input type="text" name="todo"  id="name" value={todo.todo} onChange={handleInput} className="form-control"  /> */}


                                  <input type="file" name="doctorImage" className="form-control form-control-sm" onChange={handleDoctorImageUrl}
                                                    id="doctorImageUrl" accept="image/jpg,image/jpeg,image/gif,image/png" />    
                                                {
                                                    docImage_error == null ? <p className="doc_image_size">Image size must be less than 2 mb</p> : <p className="docimage_error">{docImage_error}</p>
                                                }



                                            {doctorImageUrl == null ? <img src={`${global.img_url}/files/brand/${todo.photo}`} width="100" className="doctorImageUrlPreview" alt="preview image" /> :
                                                <div className="docImage">
                                                    <img src={doctorImageUrl} className="doctorImageUrlPreview"  width="100" alt="preview image" />
                                                    <i onClick={closeImage} class="far fa-times-circle"></i>
                                                </div>
                                            }

                              </div>
                              <div class="mb-3">
                                    <label for="status" class="form-label">Status</label>
                                    <select class="form-select form-select-sm" name="status" id="status" onChange={handleInput} value={todo.status} >
                                        <option selected="" disabled="">Select</option>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>
                              <button className="btn btn-primary float-end text-uppercase" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-save mb-1"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg> Update</button>
                          </form>
                      </div>
                  </div>
              </div>
              
          </div>
          
      </div>

  )
}

export default EditBrand
