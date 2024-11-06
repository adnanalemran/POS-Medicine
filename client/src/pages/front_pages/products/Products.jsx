import React, {useState} from 'react'
import Footer from '../layouts/Footer'

import Header from '../layouts/Header'
import products_left_img from '../../../front_assets/products/logo/image 33.png'
import products_right_img from '../../../front_assets/products/logo/image 30.png'
import product1 from "../../../front_assets/products/products/37634.jpg";
import product2 from "../../../front_assets/products/products/23862.webp"
import product3 from "../../../front_assets/products/products/86670.jpg"
import {Link} from "react-router-dom";
import Modal from 'react-modal'

Modal.setAppElement('#root')
export default function Products() {


  const [isActive, setIsActive] = useState(false);

  const grid_view = (event) => {
    // ️ toggle isActive state on click
    setIsActive((current) => !current);
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: '60%',
      left: '50%',
      height: '40vh',
      width: '400px',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white'
    },
  };
  return (

      <>
        <Header/>


        <section className="pt-3">
          <div className="container">
            <div className="row">
              <div className="col-md-1">
                <img src={products_left_img} className="img-fluid product_left_img" alt=""/>
              </div>
              <div className="col-md-10">
                <nav className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Categories</li>
                    <li className="breadcrumb-item active" aria-current="page">Prescription</li>
                  </ol>
                  <hr/>
                </nav>
                <div className="row">
                  <div className="col-lg-2 col-md-3">
                    <h4 className="product_page_categories categories_top">Categories</h4>
                    <ul className="category_ul">
                      <li><a href="">Compounding</a></li>
                      <li><a href="" className="category_active_custom">Prescription</a></li>
                      <li><a href="">Specials</a></li>
                    </ul>
                    <h4 className="product_page_brands">Brands</h4>
                    <div className="form-check mb-2">
                      <input type="checkbox" className="form-check-input" id="checkDefault" />
                      <label className="form-check-label" htmlFor="checkDefault">
                        Apo Health
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input type="checkbox" className="form-check-input" id="checkDefault" />
                      <label className="form-check-label" htmlFor="checkDefault">
                        Hylo Eye Care
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input type="checkbox" className="form-check-input" id="checkDefault" />
                      <label className="form-check-label" htmlFor="checkDefault">
                        Melatonin
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input type="checkbox" className="form-check-input" id="checkDefault" />
                      <label className="form-check-label" htmlFor="checkDefault">
                        Sudafed
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input type="checkbox" className="form-check-input" id="checkDefault" />
                      <label className="form-check-label" htmlFor="checkDefault">
                        Superderma
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input type="checkbox" className="form-check-input" id="checkDefault" />
                      <label className="form-check-label" htmlFor="checkDefault">
                        SuperNAD+
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input type="checkbox" className="form-check-input" id="checkDefault" />
                      <label className="form-check-label" htmlFor="checkDefault">
                        Super Nutraceuticals
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-10 col-md-9">
                    <h2 className="product_page_categories mb-3">Prescription</h2>

                    {/*<button onClick={()=> setModalIsOpen(true)}>Open Modal</button>*/}

                    {/*<Modal isOpen={modalIsOpen}*/}
                    {/*       style={customStyles}*/}
                    {/*>*/}
                    {/*  <h2>Modal Title</h2>*/}
                    {/*  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dicta, est excepturi fugit laborum maiores molestiae necessitatibus nulla odit, quam quasi quibusdam quidem repudiandae, saepe sunt velit veniam vitae voluptatum?</p>*/}
                    {/*  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dicta, est excepturi fugit laborum maiores molestiae necessitatibus nulla odit, quam quasi quibusdam quidem repudiandae, saepe sunt velit veniam vitae voluptatum?</p>*/}
                    {/*  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dicta, est excepturi fugit laborum maiores molestiae necessitatibus nulla odit, quam quasi quibusdam quidem repudiandae, saepe sunt velit veniam vitae voluptatum?</p>*/}
                    {/*  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dicta, est excepturi fugit laborum maiores molestiae necessitatibus nulla odit, quam quasi quibusdam quidem repudiandae, saepe sunt velit veniam vitae voluptatum?</p>*/}
                    {/*  <div>*/}
                    {/*    <button onClick={()=> setModalIsOpen(false)}>Close</button>*/}
                    {/*  </div>*/}
                    {/*</Modal>*/}

                    <div className="row">
                      <label htmlFor="exampleInputUsername2" className="col-sm-1 col-form-label">Sort:</label>
                      <div className="col-sm-3">
                        <select className="form-select form-select-sm mb-3">
                          <option selected="">Most Popular</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                      <div className="col-sm-8">
                        <div className="float-end implementation_grid">
                          {isActive ? <i className="fas fa-border-all" onClick={()=> grid_view()}></i> : <i className="fas fa-list" onClick={()=> grid_view()}></i>}
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-body ">

                        <div className={isActive ? "d-none row" : "row"}>
                          <div className="col-md-12 col-lg-4 col-sm-12 pb-4">
                            <Link to="/product-details">
                              <div className="product_images">
                                <img src={product1} className="img-fluid" alt=""/>
                                <div className="p-2 product_details">
                                  <h4 className="drugs_name">Nexma Syrup 100 ml Nexma Syrup 100 ml Nexma Syrup 100 ml</h4>
                                  <h5 className="drugs_price mt-2">$ 59.50</h5>
                                  <div className="text-center p-2 pt-4">
                                    <Link to="/products" className="add_to_cart" onClick={()=> setModalIsOpen(true)}>
                                      Add to Cart
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                          <div className="col-md-12 col-lg-4 col-sm-12 pb-4">
                            <div className="product_images">
                              <img src={product2} className="img-fluid" alt=""/>
                              <div className="p-2 product_details">
                                <h4 className="drugs_name">Nexma Syrup 100 ml</h4>
                                <h5 className="drugs_price mt-2">$ 59.50</h5>
                                <div className="text-center p-2 pt-4">
                                  <Link to="/products" className="add_to_cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal">
                                    Add to Cart
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 col-lg-4 col-sm-12 pb-4">
                            <div className="product_images">
                              <img src={product3} className="img-fluid" alt=""/>
                              <div className="p-2 product_details">
                                <h4 className="drugs_name">Nexma Syrup 100 ml dfg sdfg ert df</h4>
                                <h5 className="drugs_price mt-2">$ 59.50</h5>
                                <div className="text-center p-2 pt-4">
                                  <Link to="/products" className="add_to_cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal">
                                    Add to Cart
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 col-lg-4 col-sm-12 pb-4">
                            <div className="product_images">
                              <img src={product2} className="img-fluid" alt=""/>
                              <div className="p-2 product_details">
                                <h4 className="drugs_name">Nexma Syrup 100 ml adsf a sdf asdf</h4>
                                <h5 className="drugs_price mt-2">$ 59.50</h5>
                                <div className="text-center p-2 pt-4">
                                  <Link to="/products" className="add_to_cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal">
                                    Add to Cart
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 col-lg-4 col-sm-12 pb-4">
                            <div className="product_images">
                              <img src={product1} className="img-fluid" alt=""/>
                              <div className="p-2 product_details">
                                <h4 className="drugs_name">Nexma Syrup 100 ml</h4>
                                <h5 className="drugs_price mt-2">$ 59.50</h5>
                                <div className="text-center p-2 pt-4">
                                  <Link to="/products" className="add_to_cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal">
                                    Add to Cart
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 col-lg-4 col-sm-12 pb-4">
                            <div className="product_images">
                              <img src={product1} className="img-fluid" alt=""/>
                              <div className="p-2 product_details">
                                <h4 className="drugs_name">Nexma Syrup 100 ml asdf asdf asdf</h4>
                                <h5 className="drugs_price mt-2">$ 59.50</h5>
                                <div className="text-center p-2 pt-4">
                                  <Link to="/products" className="add_to_cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal">
                                    Add to Cart
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 col-lg-4 col-sm-12 pb-4">
                            <div className="product_images">
                              <img src={product1} className="img-fluid" alt=""/>
                              <div className="p-2 product_details">
                                <h4 className="drugs_name">Nexma Syrup 100 ml</h4>
                                <h5 className="drugs_price mt-2">$ 59.50</h5>
                                <div className="text-center p-2 pt-4">
                                  <Link to="/products" className="add_to_cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal">
                                    Add to Cart
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>




                        <div className={isActive ? "row" : "d-none row"}>
                          <div className="col-md-12 col-lg-12 col-sm-12 pb-4">

                            <div className="row list_product_images mb-2">
                              <img src={product1} className="img-fluid col-md-3" alt=""/>
                              <div className="col-md-9">
                                <h4 className="drugs_name_list_view">Nexma Syrup 100 ml
                                  <Link to="/products" className="float-end add_to_cart_list_view" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal">Add to Cart</Link>
                                </h4>
                                <h5 className="drugs_price">$ 59.50</h5>
                                <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto dolorum fugiat incidunt inventore ipsum itaque odit voluptate. Commodi deleniti dolor expedita fugiat ipsam odit sequi voluptas voluptates. Quas, sint, veniam.</p>
                              </div>
                            </div>
                            <div className="row list_product_images mb-2">
                              <img src={product1} className="img-fluid col-md-3" alt=""/>
                              <div className="col-md-9">
                                <h4 className="drugs_name_list_view">Nexma Syrup 100 ml
                                  <Link to="/products" className="float-end add_to_cart_list_view" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal">Add to Cart</Link>
                                </h4>
                                <h5 className="drugs_price">$ 59.50</h5>
                                <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto dolorum fugiat incidunt inventore ipsum itaque odit voluptate. Commodi deleniti dolor expedita fugiat ipsam odit sequi voluptas voluptates. Quas, sint, veniam.</p>
                              </div>
                            </div>
                            <div className="row list_product_images mb-2">
                              <img src={product1} className="img-fluid col-md-3" alt=""/>
                              <div className="col-md-9">
                                <h4 className="drugs_name_list_view">Nexma Syrup 100 ml
                                  <Link to="/products" className="float-end add_to_cart_list_view" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal">Add to Cart</Link>
                                </h4>
                                <h5 className="drugs_price">$ 59.50</h5>
                                <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto dolorum fugiat incidunt inventore ipsum itaque odit voluptate. Commodi deleniti dolor expedita fugiat ipsam odit sequi voluptas voluptates. Quas, sint, veniam.</p>
                              </div>
                            </div>
                            <div className="row list_product_images mb-2">
                              <img src={product1} className="img-fluid col-md-3" alt=""/>
                              <div className="col-md-9">
                                <h4 className="drugs_name_list_view">Nexma Syrup 100 ml
                                  <Link to="/products" className="float-end add_to_cart_list_view" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal">Add to Cart</Link>
                                </h4>
                                <h5 className="drugs_price">$ 59.50</h5>
                                <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto dolorum fugiat incidunt inventore ipsum itaque odit voluptate. Commodi deleniti dolor expedita fugiat ipsam odit sequi voluptas voluptates. Quas, sint, veniam.</p>
                              </div>
                            </div>
                            <div className="row list_product_images mb-2">
                              <img src={product1} className="img-fluid col-md-3" alt=""/>
                              <div className="col-md-9">
                                <h4 className="drugs_name_list_view">Nexma Syrup 100 ml
                                  <Link to="/products" className="float-end add_to_cart_list_view" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal">Add to Cart</Link>
                                </h4>
                                <h5 className="drugs_price">$ 59.50</h5>
                                <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto dolorum fugiat incidunt inventore ipsum itaque odit voluptate. Commodi deleniti dolor expedita fugiat ipsam odit sequi voluptas voluptates. Quas, sint, veniam.</p>
                              </div>
                            </div>
                            <div className="row list_product_images mb-2">
                              <img src={product1} className="img-fluid col-md-3" alt=""/>
                              <div className="col-md-9">
                                <h4 className="drugs_name_list_view">Nexma Syrup 100 ml
                                  <Link to="/products" className="float-end add_to_cart_list_view" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal">Add to Cart</Link>
                                </h4>
                                <h5 className="drugs_price">$ 59.50</h5>
                                <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto dolorum fugiat incidunt inventore ipsum itaque odit voluptate. Commodi deleniti dolor expedita fugiat ipsam odit sequi voluptas voluptates. Quas, sint, veniam.</p>
                              </div>
                            </div>
                            <div className="row list_product_images mb-2">
                              <img src={product1} className="img-fluid col-md-3" alt=""/>
                              <div className="col-md-9">
                                <h4 className="drugs_name_list_view">Nexma Syrup 100 ml
                                  <Link to="/products" className="float-end add_to_cart_list_view" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal">Add to Cart</Link>
                                </h4>
                                <h5 className="drugs_price">$ 59.50</h5>
                                <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto dolorum fugiat incidunt inventore ipsum itaque odit voluptate. Commodi deleniti dolor expedita fugiat ipsam odit sequi voluptas voluptates. Quas, sint, veniam.</p>
                              </div>
                            </div>


                          </div>
                        </div>








                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="col-md-1">
                <img src={products_right_img} className="img-fluid product_right_img" alt=""/>
              </div>
            </div>
          </div>
        </section>




        {/*<div class="modal fade" id="add_to_cart_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">*/}
        {/*  <div class="modal-dialog modal-dialog-centered modal-sm">*/}
        {/*    <div class="modal-content p-1">*/}
        {/*      <div className="row p-3">*/}
        {/*        <div className="col-md-12 col-lg-12 col-sm-12">*/}
        {/*          <h5 className="product_add_heading">The product has been added to your cart.</h5>*/}
        {/*          <div className="text-center pt-5">*/}
        {/*            <Link to="/products" className="continue_shopping_button" data-bs-dismiss="modal" aria-label="Close">*/}
        {/*              Continue Shopping*/}
        {/*            </Link>*/}
        {/*          </div>*/}
        {/*          <div className="text-center pt-4 pb-3">*/}
        {/*            <Link to="/cart-summary-checkout" className="checkout_button">*/}
        {/*              Checkout*/}
        {/*            </Link>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}

        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}


        <Modal isOpen={modalIsOpen}
               style={customStyles}
               onRequestClose={() => setModalIsOpen(false)}
               shouldCloseOnOverLayClick={false}
        >
          <p className='float-end' style={{fontSize: "15px", cursor: "pointer"}} onClick={() => setModalIsOpen(false)}><i
              className="fal fa-times"></i></p>

          <div class="">
                <div className="row">
                  <div className="col-md-12 col-lg-12 col-sm-12">
                    <h5 className="product_add_heading">The product has been added to your cart.</h5>
                    <div className="text-center pt-5">
                      <Link to="/products" className="continue_shopping_button" onClick={()=> setModalIsOpen(false)}>
                        Continue Shopping
                      </Link>
                    </div>
                    <div className="text-center pt-4 pb-3">
                      <Link to="/cart-summary-checkout" className="checkout_button">
                        Checkout
                      </Link>
                    </div>
                  </div>
                </div>

              </div>

          {/* <div>*/}
          {/*  <button onClick={()=> setModalIsOpen(false)}>Close</button>*/}
          {/*</div>*/}
        </Modal>



        <Footer/>
      </>
  )
}
