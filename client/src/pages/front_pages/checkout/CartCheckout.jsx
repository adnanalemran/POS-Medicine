import React, {useState} from 'react'
import Footer from '../layouts/Footer'

import Header from '../layouts/Header'
import products_left_img from '../../../front_assets/products/logo/image 33.png'
import products_right_img from '../../../front_assets/products/logo/image 30.png'
import dash from '../../../front_assets/checkout/Vector 1.png'
import cart_pr_img from '../../../front_assets/checkout/rsz_82874.jpg'
import {Link} from 'react-router-dom'
import every_day_rewards from '../../../front_assets/checkout/Rectangle 86.png'
import rewards_awards from '../../../front_assets/checkout/image 59 (Traced).png'

export default function Products() {

    const submitFormData = (e) => {
        e.preventDefault();

    }


    const savePersonalInfo = (e) => {
        e.preventDefault();
        document.getElementById("v-pills-profile-tab").className = "nav-link text-start"
        document.getElementById("v-pills-profile-tab").click()
    }


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
                                    <li className="breadcrumb-item active" aria-current="page">Cart</li>
                                </ol>
                                <hr/>
                            </nav>


                            <div className="row">
                                <div className="col-md-8 mx-auto pb-5 pt-2">
                                    <div className="nav nav-pills top_tab_sections" id="v-pills-tab" role="tablist"
                                         aria-orientation="vertical">
                                        <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill"
                                                data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home"
                                                aria-selected="true">
                                            <span>1</span> Cart Summery <img src={dash} className="img-fluid" alt=""/>
                                        </button>
                                        <button className="nav-link disabled btnNEw" id="v-pills-profile-tab" data-bs-toggle="pill"
                                                data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile"
                                                aria-selected="false"><span>2</span> Checkout
                                        </button>
                                    </div>
                                </div>
                                <div className="tab-content" id="v-pills-tabContent">
                                    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                        <div className="custom-card">
                                            <p className="prescription_para p-2">You are required to have a greatpharma account in order to purchase
                                                prescription medicines, practitioner products, or link your Everday Rewards account to greatpharma
                                                ewards. </p>
                                            <div className="flex-container-custom">
                                                <Link className="flex-item-left-custom" to="/">Sign Up</Link>
                                                <Link className="flex-item-right-custom" to="/">Log In</Link>
                                            </div>
                                        </div>
                                        <div className="checkout-card">
                                            <h3 className="cart_summary_heading">Cart Summery</h3>
                                            <h3 className="non_prescriptions_heading">Non-Prescription Products</h3>
                                            <div className="cart_table">
                                                <table className="table table-responsive table-hover">
                                                    <tbody>
                                                    <tr>
                                                        <td width="50%">
                                                            <div className="pr_img">
                                                                <img src={cart_pr_img} className="img-fluid"/>
                                                                <i className="far fa-times-circle"></i>
                                                            </div>
                                                        </td>
                                                        <td width="30%">

                                                            <div className="d-flex qty_block_checkout">
                                                                <button type="button" id="button-minus" className="btn"><i
                                                                    className="fas fa-minus"></i></button>
                                                                <input type="text" className="count_input_checkout"/>
                                                                <button type="button" id="button-plus" className="btn"><i className="fas fa-plus"></i>
                                                                </button>
                                                            </div>

                                                        </td>
                                                        <td width="20%" className="pr_cart_price">
                                                            <span className="">$59.50</span>
                                                        </td>
                                                    </tr>


                                                    </tbody>
                                                </table>
                                            </div>
                                            <h3 className="non_prescriptions_heading">Activate a Promotional Offer ?</h3>
                                            <div className="voucher_offer">
                                                <div className="form-check">
                                                    <input type="radio" className="form-check-input" name="radioDefault" id="radioDefault"/>
                                                    <label className="form-check-label" htmlFor="radioDefault">
                                                        Enter voucher code
                                                    </label>
                                                </div>
                                                <div>
                                                    <input type="email" className="voucher_input"/>
                                                </div>
                                                <Link to="/products" className="active_offer">
                                                    Active Offer
                                                </Link>
                                            </div>
                                            <h3 className="non_prescriptions_heading">Delivery Method</h3>
                                            <div className="voucher_offer">
                                                <Link to="/products" className="delivery">
                                                    Delivery
                                                </Link>
                                                <Link to="/products" className="click_collect">
                                                    Click & Collect
                                                </Link>
                                            </div>
                                            <div className="shipping_delivery">
                                                <div className="form-check radio_row">
                                                    <input type="radio" className="form-check-input" name="radioDefault" id="radioDefault"/>
                                                    <label className="form-check-label shipping_radio" htmlFor="radioDefault">
                                                        Standerd Shipping <span>(approx. 4-8 Business days from dispatch) - Free</span>
                                                    </label>
                                                </div>
                                                <div className="form-check radio_row">
                                                    <input type="radio" className="form-check-input" name="radioDefault" id="radioDefault"/>
                                                    <label className="form-check-label shipping_radio" htmlFor="radioDefault">
                                                        Express Delivery was $10.95 <span>(approx. 1-3 Business days from dispatch) -</span> $7.95
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="delivery_method_heading">
                                                <h3 className="">
                                                    Delivery Method
                                                </h3>
                                                <p className="delivery_para">Prescription items are not able to be delivered to an unattended
                                                    address</p>
                                            </div>
                                            <div className="shipping_delivery">
                                                <div className="form-check radio_row">
                                                    <input type="checkbox" className="form-check-input" name="radioDefault" id="radioDefault"/>
                                                    <label className="form-check-label delivery_para" htmlFor="radioDefault">
                                                        By checking this box you are providing the courier Authority to Leave your parcel should no
                                                        one be able to sign for it, and assume all liability once the parcel is left unattended at
                                                        your delivery address.
                                                    </label>
                                                    <p className="delivery_para_2">We do not recommend providing this for units or gated
                                                        communities.</p>
                                                </div>
                                            </div>
                                            <div className="additional_comments">
                                                <h3 className="additional_comments_h3">
                                                    Additional comments / Special instructions
                                                </h3>
                                                <input type="email" className="form-control" placeholder="i.e. Please Leave at side of house"/>
                                                <p className="max_length">0/50 max length</p>
                                            </div>

                                            <div className="shipping_sections">
                                                <div className="row">
                                                    <div className="col-md-6"></div>
                                                    <div className="col-md-6 shipping">
                                                        <div className="float-start">
                                                            <h3>SHIPPING :</h3>
                                                        </div>
                                                        <div className="float-end">
                                                            <h3 className="">$ 0.00</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="shipping_sections">
                                                <div className="row">
                                                    <div className="col-md-6"></div>
                                                    <div className="col-md-6 shipping_cart">
                                                        <div className="float-start">
                                                            <h3>CART TOTAL :</h3>
                                                        </div>
                                                        <div className="float-end">
                                                            <h3 className="">$ 0.00</h3>
                                                            <p className="gst_para float-end">Includes GST of $ 0.49</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <button to="/products" onClick={savePersonalInfo} className="continue_to_checkout float-end">
                                                        Continue to checkout
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="limited_supply_para">* Limited Supply - Our stock is running a little low. We will process
                                                your order, however we cannot confirm that we will be able to supply this product. If we are unable to
                                                supply, we will contact you to organise an immediate refund.</p>
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-10 mx-auto">
                                                        <h3 className="rewards_heading">Everyday Rewards and SuperPharmacy are making health more
                                                            rewarding.</h3>
                                                        <p className="rewards_para">Link your Everyday Rewards card and join SuperPharmacy Rewards to
                                                            start collecting Everyday Rewards points*</p>
                                                        <div className="row">
                                                            <div className="col-md-12 col-sm-12 col-lg-6 mx-auto">
                                                                <div className="rewards_sections">
                                                                    <img src={every_day_rewards} className="img-fluid img_eve" alt=""/>
                                                                    <div className="img_awrd">
                                                                        <img src={rewards_awards} className="img-fluid " alt=""/>
                                                                    </div>
                                                                    <h4 className="eve_rewards">everyday rewards</h4>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12 col-sm-12 col-lg-6 mx-auto">
                                                                <div className="link_card_sections">
                                                                    <div className="start_earning">
                                                                        <h4 className="start_ear_heading">Start earning today</h4>
                                                                        <Link to="/products" className="link_card_btn">
                                                                            Link your card
                                                                        </Link>
                                                                        <h4 className="start_ear_heading not_a_member">Not a member ?</h4>
                                                                        <Link to="/products" className="not_a_member_btn">
                                                                            Not a member ? Join Today
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="link_rewards_conditions_para">*By linking your account you agree to and understand the SuperPharmacy Terms and Conditions & Everyday Rewards Terms and Conditions.</p>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                        <div className="checkout-input-card mb-2">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <h3 className="personal_det_heading">Personal details</h3>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text input-group-text-label" id="basic-addon1"><i className="fas fa-user"></i></span>
                                                            </div>
                                                            <input type="text" className="form-control personal_input" placeholder="Name *" aria-label="Username"
                                                                   aria-describedby="basic-addon1" />
                                                        </div>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text input-group-text-label2" id="basic-addon1"><i
                                                                    className="fas fa-envelope"></i></span>
                                                            </div>
                                                            <input type="text" className="form-control personal_input" placeholder="Email *" aria-label="Username"
                                                                   aria-describedby="basic-addon1" />
                                                        </div>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text input-group-text-label2" id="basic-addon1"><i
                                                                    className="fas fa-phone"></i></span>
                                                            </div>
                                                            <input type="text" className="form-control personal_input" placeholder="Phone No. *" aria-label="Username"
                                                                   aria-describedby="basic-addon1" />
                                                        </div>
                                                        <p className="phone_ex">Phone number (between 8-10 digits) e.g. 0412345678</p>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text input-group-text-label2" id="basic-addon1"><i
                                                                    className="fas fa-image"></i></span>
                                                            </div>
                                                            <input type="file" className="form-control personal_input" placeholder="Phone No. *" aria-label="Username"
                                                                   aria-describedby="basic-addon1" />
                                                        </div>
                                                        <p className="upload_prescription">Please, Upload prescription.</p>
                                                    </div>
                                                    <div className="col-md-6">
                                                    </div>
                                                    <hr className="mt-4"/>
                                                    <div className="col-md-6">
                                                        <h3 className="shipping_det_heading">Shipping details</h3>
                                                        <p className="shipping_details_para">Complete your profile to pre-fill these details</p>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text input-group-text-label" id="basic-addon1"><i className="fas fa-user"></i></span>
                                                            </div>
                                                            <input type="text" className="form-control personal_input" placeholder="Name *" aria-label="Username"
                                                                   aria-describedby="basic-addon1" />
                                                        </div>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text input-group-text-label" id="basic-addon1"><i className="fas fa-user"></i></span>
                                                            </div>
                                                            <input type="text" className="form-control personal_input" placeholder="Name *" aria-label="Username"
                                                                   aria-describedby="basic-addon1" />
                                                        </div>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text input-group-text-label2" id="basic-addon1"><i
                                                                    className="fas fa-envelope"></i></span>
                                                            </div>
                                                            <input type="text" className="form-control personal_input" placeholder="Email *" aria-label="Username"
                                                                   aria-describedby="basic-addon1" />
                                                        </div>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text input-group-text-label3" id="basic-addon1"><i
                                                                    className="fas fa-map-marker-alt"></i></span>
                                                            </div>
                                                            <input type="text" className="form-control personal_input" placeholder="Phone No. *" aria-label="Username"
                                                                   aria-describedby="basic-addon1" />
                                                        </div>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text input-group-text-label" id=""><i
                                                                    className="fas fa-globe-asia"></i></span>
                                                            </div>
                                                            <input type="text" className="form-control state_input" placeholder="State *" />
                                                                <input type="text" className="form-control postcode" placeholder="Postcode" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                    </div>
                                                    <hr className="mt-4"/>
                                                    <h3 className="personal_det_heading">Payment</h3>
                                                    <div className="col-md-6">
                                                        <div className="input-group">
                                                            <select className="form-select payment_method_select" id="exampleFormControlSelect1">
                                                                <option selected="" disabled="">Choose a payment method</option>
                                                                <option>12-18</option>
                                                                <option>18-22</option>
                                                                <option>22-30</option>
                                                                <option>30-60</option>
                                                                <option>Above 60</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 align-self-center">
                                                        <button to="/products" onClick={savePersonalInfo} className="pay_now float-end">
                                                            Pay Now
                                                        </button>
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

            <Footer/>
        </>
    )
}
