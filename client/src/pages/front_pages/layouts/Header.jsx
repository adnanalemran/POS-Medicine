import React from 'react'
// import location from '../front_assets/images/Vector.png'
import location from '../../../front_assets/images/Vector.png'
import vertical_line from '../../../front_assets/images/Line 1.png'
import hotline_headphones from '../../../front_assets/images/image 1 (Traced) (1).png'
import ecom_bag from '../../../front_assets/images/image 2 (Traced).png'
import { Link } from 'react-router-dom'


export default function Header() {

    const responsiveMenu = () => {
        var x = document.getElementById("myTopnav_custom");
        if (x.className === "topnav_custom") {
            x.className += " responsive_custom";
        } else {
            x.className = "topnav_custom";
        }
    }

  return (
    <>
      <section id="topbar" className="d-flex align-items-center">
                <div className="container d-flex justify-content-center justify-content-md-between">
                    <div className="social-links d-none d-md-block">
                        <img className="img-fluid header_image" src={location} alt=""/>
                        <a
                            href="mailto:contact@example.com">Store Location: 1234 Heaven Stress, Beverly Hill, Melbourne, USA.</a> <i
                        className="bi bi-phone-fill phone-icon"></i>
                    </div>
                    <div className="contact-info d-flex align-items-center">
                        <a href="#" className="checkout">Checkout</a>
                        <a href="#" className="checkout"><img src={vertical_line} alt=""/></a>
                        <a href="#" className="register_sign_in">Register or Sign In</a>
                    </div>
                </div>
            </section>
            <div className="sticky-top">
                <section className="topbar_2">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="logo d-none d-lg-block">
                                    <a className="navbar-brand js-scroll-trigger" href="#">
                                        <h2 className="header_logo">Great Pharma</h2>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-2">
                                <div className="logo d-none d-lg-block">
                                    <div className="d-flex hotline_headphones_sections">
                                        <img className="img-fluid" src={hotline_headphones} alt=""/>
                                        <h4>
                                            <span>Hotline:</span>
                                            <p>(+1) 123 456 7890</p>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 align-self-center">
                                <div className="logo d-lg-block">
                                    <form action="">
                                        <div className="input-group">
                                            <input type="text" className="form-control search_input" placeholder="Enter keywords to search"
                                                   aria-label="Recipient's username"
                                                   aria-describedby="basic-addon2"/>
                                            <div className="input-group-append">
                                                <button className="btn btn-outline-secondary search_button" type="button">Search</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-1 align-self-center">
                                <div className="logo d-none d-lg-block">
                                    <a className="navbar-brand js-scroll-trigger" href="#">
                                        <img className="img-fluid your_cart_img" src={ecom_bag} alt=""/>
                                        <span className="your_cart_count"> 0 </span>
                                    </a>
                                    <h5 className="your_cart ml-2">Your Cart</h5>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <section className="header_menu_section text-uppercase">
                    <div className="container">
                        <div className="topnav_custom" id="myTopnav_custom">
                            <div className="dropdown_custom category_custom">
                                <button className="dropbtn_custom text-uppercase">
                                    <i className="fa fa-bars"></i>
                                    Categories
                                    <i className="far fa-angle-down"></i>
                                </button>
                                <div className="dropdown-content-custom catgories_content">
                                    <a href="#">Clearance</a>

                                    <a href="#">Medical Cannabis</a>
                                    <a href="#">Beauty</a>
                                    {/*<div className="main_cat">*/}
                                    {/*    <a href="" className="myDIV">Test Main <i className="far fa-angle-down"></i></a>*/}
                                    {/*    <div className="hide">*/}
                                    {/*        <a href="#">Link 1</a>*/}
                                    {/*        <a href="#">Link 2</a>*/}
                                    {/*        <a href="#">Link 3</a>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                    <div className="dropdown-subcat dddd">
                                        <button className="dropbtn-subcat text-uppercase">Dropdown
                                            <i className="far fa-angle-right"></i>
                                        </button>
                                        <div className="dropdown-content-subcat">
                                            <a href="#">Link 1</a>
                                            <a href="#">Link 2</a>
                                            <a href="#">Link 3</a>
                                        </div>
                                    </div>

                                    <a href="#">Personal Care</a>
                                    <a href="#">Weight Loss</a>
                                    <a href="#">Practitioner Medicine</a>
                                    <a href="#">Practitioner Medicine</a>
                                    <a href="#">Practitioner Medicine</a>
                                    <a href="#">Practitioner Medicine</a>
                                    <a href="#">Practitioner Medicine</a>
                                    <a href="#">Practitioner Medicine</a>
                                    <a href="#">Practitioner Medicine</a>
                                    <a href="#">Practitioner Medicine</a>
                                    <a href="#">Practitioner Medicine</a>
                                    <a href="#">Practitioner Medicine</a>
                                    <a href="#">Prescriptions</a>
                                    <a href="#">Prescriptions</a>
                                    <a href="#">Prescriptions</a>
                                    <a href="#">Prescriptions</a>
                                    <a href="#">Prescriptions</a>
                                    <a href="#">Prescriptions</a>

                                    {/*<div className="myDIV">Hover over me.</div>*/}
                                    {/*<div className="hide">I am shown when someone hovers over the div above.</div>*/}





                                </div>
                            </div>
                            <Link to="/" className="active_custom">Home</Link>
                            <a href="#news">About</a>

                            <div className="dropdown_custom">
                                <button className="dropbtn_custom text-uppercase">Shops
                                    <i className="far fa-angle-down"></i>
                                </button>
                                <div className="dropdown-content-custom shops_content">
                                    <a href="#">Link 1</a>
                                    <a href="#">Link 2</a>
                                    <a href="#">Link 3</a>
                                </div>
                            </div>
                            <div className="dropdown_custom">
                                <button className="dropbtn_custom text-uppercase">Brands
                                    <i className="far fa-angle-down"></i>
                                </button>
                                <div className="dropdown-content-custom brands_content">
                                    <a href="#">Link 1</a>
                                    <a href="#">Link 2</a>
                                    <a href="#">Link 3</a>
                                </div>
                            </div>
                            <a href="#contact">Contact</a>
                            <a href="javascript:void(0);" className="icon" onClick={(e) => responsiveMenu()}>&#9776;</a>
                        </div>
                    </div>
                </section>
            </div>
    </>
  )
}
