import React from 'react'

import qcf_background from '../../../front_assets/footer_img/image 36.png'
import american_express from '../../../front_assets/footer_img/image 55.png'
import master_card from '../../../front_assets/footer_img/image 53.png'
import visa_card from '../../../front_assets/footer_img/image 52.png'
import bkash_logo from '../../../front_assets/footer_img/image 56.png'
import rocket_logo from '../../../front_assets/footer_img/image 57.png'
import nagad_logo from '../../../front_assets/footer_img/image 58.png'
import paypal_logo from '../../../front_assets/footer_img/image 51.png'


export default function Footer() {
  return (
    <>
    <section className="align-self-center">
                <div className="container">
                    <div className="row ">
                        <div className="col-md-8 mx-auto shop_offers_list pt-6">
                            <ul>
                                <li className="great_pharma_blog">
                                    <a href="#" className="great_pharma_blog_anc">
                                        <div className="row shop_all_offer_responsive">
                                            <div className="col-md-6">GreatPharma Blog</div>
                                            <div className="col-md-6 align-self-center shop_offer_angle_right"><i className="fa fa-angle-right"></i>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="online_catalogue_blog">
                                    <a href="#" className="great_pharma_blog_anc">
                                        <div className="row shop_all_offer_responsive">
                                            <div className="col-md-6">Online Catalogue</div>
                                            <div className="col-md-6 align-self-center shop_offer_angle_right"><i className="fa fa-angle-right"></i>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="rewards_program_blog">
                                    <a href="#" className="great_pharma_blog_anc">
                                        <div className="row shop_all_offer_responsive">
                                            <div className="col-md-6">Rewards Program</div>
                                            <div className="col-md-6 align-self-center shop_offer_angle_right"><i className="fa fa-angle-right"></i>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="online_naturopath_blog">
                                    <a href="#" className="great_pharma_blog_anc">
                                        <div className="row shop_all_offer_responsive">
                                            <div className="col-md-6">Online Naturopath</div>
                                            <div className="col-md-6 align-self-center shop_offer_angle_right"><i className="fa fa-angle-right"></i>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
    <section className="super_deals">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 pt-5 pb-5 mx-auto">
                            <div className="row">
                                <div className="col-md-6">
                                    <h2 className="offers_heading pb-3">Never miss a Super Deal !</h2>
                                    <p className="super_deals_para">Join our mailing list today to receive the latest offers, big sale alerts and
                                        relevant health advice straight to your
                                        inbox.</p>
                                </div>
                                <div className="col-md-6">
                                    <input type="text" className="form-control name_input mb-3" placeholder="Your Name"/>
                                    <input type="text" className="form-control name_input" placeholder="Email Address"/>
                                    <button className="all_offers_btn">
                                        Join Today
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
      <section className="footer_payment pt-5 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            {/*<h4 className="propriter">Proprietor: <span className="owner_name">Warren Turner - B.Pharm M.P.S M.R.Pharm.S</span></h4>*/}
                            {/*<p>Pharmacist available - Monday to Friday 8am to 8pm. Saturday 8.30 to 6pm. Sunday 9am to 4pm (AEST)</p>*/}
                            {/*<ul className="pcb_logo_section">*/}
                            {/*    <li>*/}
                            {/*        <div className=" pcb_div">*/}
                            {/*            <h3 className="pcb_text">PCB</h3>*/}
                            {/*            <h4 className="approved_pharmacy px-2">Approved Pharmacy</h4>*/}
                            {/*        </div>*/}
                            {/*    </li>*/}
                            {/*    <li>*/}
                            {/*        <div className="qcf_img">*/}
                            {/*            <img src={qcf_background} className="img-fluid" alt=""/>*/}
                            {/*        </div>*/}
                            {/*    </li>*/}
                            {/*</ul>*/}
                        </div>
                        <div className="col-md-6">
                            <div className="float-end d-flex">
                                <img src={american_express} className="img-fluid px-1" alt=""/>
                                <img src={master_card} className="img-fluid px-1" alt=""/>
                                <img src={visa_card} className="img-fluid" alt=""/>

                            </div>
                            <div className="float-end d-flex pt-5 payment_method_logo">
                                <img src={bkash_logo} className="img-fluid px-1" alt=""/>
                                <img src={rocket_logo} className="img-fluid px-1" alt=""/>
                                <img src={nagad_logo} className="img-fluid px-1" alt=""/>
                                <img src={paypal_logo} className="img-fluid paypal_logo" alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="row footer_link pt-6">
                        <div className="col-md-12">
                            <ul>
                                <li><a href="#">@ 2022 GreatePharma</a></li>
                                <li><a href="#">Delivery</a></li>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Sustainability</a></li>
                                <li><a href="#">Services</a></li>
                                <li><a href="#">Returns</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Terms & Conditions</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <footer>
                <div className="container">
                    <div className="row p-3">
                        <div className="col-md-6 text-center">
                            © 2021 Copyright Great Pharma. All Rights Reserved
                        </div>
                        <div className="col-md-6 text-center">
                            Design and Devloped by Zaimah Technologies Ltd.
                        </div>
                    </div>
                </div>
            </footer>
    </>
  )
}
