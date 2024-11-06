import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import http from "../../../http";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';

function AddBanner() {



    
    const navigate = useNavigate();
    const [picture, setPicture] = useState([]);
    const [todo, setTodo] = useState({
        title: "",
        description: "",
        condition: "",
        photo: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setTodo({
            ...todo, [e.target.name]: e.target.value
        });
    }

    const [image_error, setimage_error] = useState();
    const [imageUrl, setimageUrl] = useState();
    const handleImage = (e) => {
        e.persist();
        if (e.target.files[0].size < 2000048) {
            setPicture({ photo: e.target.files[0] })
            setimage_error(null)
        } else {
            setimage_error("File size must be less than 2 mb !")
        }
        if (e.target.files && e.target.files[0] && e.target.files[0].size < 2000048) {
            setimageUrl(URL.createObjectURL(e.target.files[0]))
            // setDoctors({ ...doctorsInput, doctorImageUrl: URL.createObjectURL(event.target.files[0]) });
        } else {
            setimage_error("File size must be less than 2 mb !")
        }

    }

    const closeImage = () => {
        setimageUrl()
        document.getElementById('PatientImageUrl').value = '';
    }

    const formData = new FormData();

    formData.append('title',  todo.title);
    formData.append('description',  todo.description);
    formData.append('condition',  todo.condition);
    formData.append('photo',  picture.photo);

    const submitData = (e) => {
        // alert("hgfdhgf");
        e.preventDefault();
//   console.log(e)
        http.post('banner', formData).then(res => {
console.log(res);


            if (res.data.status == 200) {

                // toast.success(res.data.message, {
                //     position: "top-center",
                //     autoClose: 5000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                // });

                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: res.data.message,
                    timer: 2500
                  })
                // Swal.fire('Success!',res.data.message,'success',5000);
                navigate('/banner');

                // swal("Success", res.data.message, "success");
                setTodo({
                    title: "",
                    description: "",
                    condition: "",
                    photo: "",
                    error_list: [],
                });

            }
            else if (res.data.status == 400) {
                setTodo({ ...todo, error_list: res.data.errors });

            }

        })
    }

  return (
      <div className="page-content">
            <div className="custom-card patients-head ">
                <h5 className="fw-normal custom_py-3 px-2  text-start mb-2 card-title">Banner List
                <button className="btn btn-sm btn-warning float-end" onClick={() => navigate(-1)}>
                <i class="fal fa-long-arrow-left"></i> Back </button>
                </h5>
            </div>



          {/* <nav className="page-breadcrumb">
              <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Banner</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Add Banner</li>
              </ol>
          </nav> */}
          <div className="row">
              <div className="col-lg-12 grid-margin stretch-card">
                  <div className="card">
                      <div className="card-body">
                          
                          <form onSubmit={submitData}>

                              <div className="mb-3">
                                  <label htmlFor="title" className="form-label">Title</label>
                                  <input type="text" name="title" value={todo.title} onChange={handleInput} className="form-control form-control-sm"  />
                                  <span className="text-danger">{todo.error_list.title}</span>
                              </div>
                              <div className="mb-3">
                                  <label htmlFor="description" className="form-label">Description</label>
                                  <textarea name="description"  value={todo.description} onChange={handleInput} class="form-control form-control-sm" maxlength="100" rows="4" placeholder="Description..."></textarea>
                                  <span className="text-danger">{todo.error_list.description}</span>
                              </div>
                              <div class="mb-3">
                                    <label for="condition" class="form-label">Condition</label>
                                    <select class="form-select form-select-sm" name="condition" id="condition" onChange={handleInput} value={todo.condition} >
                                        <option selected="" disabled="">Select</option>
                                        <option value="banner">Banner</option>
                                        <option value="promo">Promo</option>
                                    </select>
                                </div>


                              <div className="mb-3">
                                  <label htmlFor="photo" className="form-label">Photo
                                  </label>
                                  <input type="file" name="photo" id="PatientImageUrl" onChange={handleImage} className="form-control form-control-sm" />
                                    {
                                        image_error == null ? <p className="doc_image_size">Image size must be less than 2 mb</p> : <p className="docimage_error">{image_error}</p>
                                    }

                                    {imageUrl == null ? '' :
                                        <div className="docImage">
                                            <img src={imageUrl} className="doctorImageUrlPreview" width="100" height="100" alt="preview image" />
                                            <i onClick={closeImage} class="far fa-times-circle"></i>
                                        </div>
                                    }
                                  <span className="text-danger">{todo.error_list.photo}</span>
                              </div>
                              <button className="btn btn-primary float-end text-uppercase" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-save mb-1"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg> Save</button>
                          </form>
                      </div>
                  </div>
              </div>
              
          </div>
          
      </div>

  )
}

export default AddBanner
