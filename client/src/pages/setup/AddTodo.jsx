import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import http from "../../http";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';

function AddTodo() {

    const navigate = useNavigate();
    const [picture, setPicture] = useState([]);
    const [todo, setTodo] = useState({
        name: "",
        email: "",
        todo: "",
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
            setPicture({ todo: e.target.files[0] })
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

    formData.append('name',  todo.name);
    formData.append('email',  todo.email);
    formData.append('todo',  picture.todo);

    const submitData = (e) => {
        // alert("hgfdhgf");
        e.preventDefault();
//   console.log(e)
        http.post('todo', formData).then(res => {
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
                    timer: 5000
                  })
                // Swal.fire('Success!',res.data.message,'success',5000);
                // navigate('/todo');

                // swal("Success", res.data.message, "success");
                setTodo({
                    name: "",
                    email: "",
                    todo: "",
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
          <nav className="page-breadcrumb">
              <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Forms</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Advanced Elements</li>
              </ol>
          </nav>
          <div className="row">
              <div className="col-lg-12 grid-margin stretch-card">
                  <div className="card">
                      <div className="card-body">
                          <h4 className="card-title">Add Todo</h4>
                          <form onSubmit={submitData}>

                              <div className="mb-3">
                                  <label htmlFor="name" className="form-label">Name</label>
                                  <input type="text" name="name"  id="name" value={todo.name} onChange={handleInput} className="form-control"  />
                                  <span className="text-danger">{todo.error_list.name}</span>
                              </div>
                              <div className="mb-3">
                                  <label htmlFor="email" className="form-label">Email</label>
                                  <input type="email" name="email"  id="email" value={todo.email} onChange={handleInput} className="form-control"  />
                                  <span className="text-danger">{todo.error_list.email}</span>
                              </div>
                              <div className="mb-3">
                                  <label htmlFor="todo" className="form-label">Todo</label>
                                  <input type="file" name="todo" id="PatientImageUrl" onChange={handleImage} className="form-control" />
                                  {
                                        image_error == null ? <p className="doc_image_size">Image size must be less than 2 mb</p> : <p className="docimage_error">{image_error}</p>
                                    }

                                    {imageUrl == null ? '' :
                                        <div className="docImage">
                                            <img src={imageUrl} className="doctorImageUrlPreview" alt="preview image" />
                                            <i className="link-icon" onClick={closeImage} data-feather="mail" />
                                        </div>
                                    }
                                  <span className="text-danger">{todo.error_list.todo}</span>
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

export default AddTodo
