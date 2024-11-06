import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import http from "../../../http";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import {useNavigate, useParams} from 'react-router-dom';
import '../../../imageUrl';


function EditBanner() {

    const [todo, setTodo] = useState([]);
    const [error, setError] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {

    

        // const carotid_id = props.match.params.id;
        http.get(`/banner/${id}/edit`).then(res => {

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
        formData.append('description', todo.description);
        formData.append('condition', todo.condition);
        // formData.append('photo', todo.photo);

        formData.append('photo', doctorImage == null ? todo.photo : doctorImage);




        http.post(`/banner/update/${id}`, formData).then(res => {
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

                navigate('/banner');

            } else {
                setError(res.data.errors)
            }
        });

    }

  return (
      <div className="page-content">
          {/* <nav className="page-breadcrumb">
              <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Forms</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Advanced Elements</li>
              </ol>
          </nav> */}

            <div className="custom-card patients-head ">
                <h5 className="fw-normal custom_py-3 px-2  text-start mb-2 card-title">Edit Banner
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
                                  <label htmlFor="email" className="form-label">Description</label>
                                  <textarea type="email" name="description"  id="email" value={todo.description} onChange={handleInput} maxlength="100" rows="4" className="form-control form-control-sm"></textarea>
                                  <span className="text-danger">{error.email}</span>
                              </div>

                              {/* <div className="mb-3">
                                  <label htmlFor="description" className="form-label">Description</label>
                                  <textarea name="description"  value={todo.description} onChange={handleInput} class="form-control" maxlength="100" rows="4" placeholder="Description..."></textarea>
                                  <span className="text-danger">{todo.error_list.description}</span>
                              </div> */}

                                <div class="mb-3">
                                    <label for="condition" class="form-label">Condition</label>
                                    <select class="form-select form-select-sm" name="condition" id="condition" onChange={handleInput} value={todo.condition} >
                                        <option selected="" disabled="">Select</option>
                                        <option value="banner">Banner</option>
                                        <option value="promo">Promo</option>
                                    </select>
                                </div>
                              <div className="mb-3">
                                  <label htmlFor="todo" className="form-label">Todo</label>
                                  {/* <input type="text" name="todo"  id="name" value={todo.todo} onChange={handleInput} className="form-control"  /> */}


                                  <input type="file" name="doctorImage" className="form-control form-control-sm" onChange={handleDoctorImageUrl}
                                                    id="doctorImageUrl" accept="image/jpg,image/jpeg,image/gif,image/png" />
                                                {
                                                    docImage_error == null ? <p className="doc_image_size">Image size must be less than 2 mb</p> : <p className="docimage_error">{docImage_error}</p>
                                                }



                                            {doctorImageUrl == null ? <img src={`${global.img_url}/files/banner/${todo.photo}`} width="100" className="doctorImageUrlPreview" alt="preview image" /> :
                                                <div className="docImage">
                                                    <img src={doctorImageUrl} className="doctorImageUrlPreview"  width="100" alt="preview image" />
                                                    <i onClick={closeImage} class="far fa-times-circle"></i>
                                                </div>
                                            }





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

export default EditBanner
