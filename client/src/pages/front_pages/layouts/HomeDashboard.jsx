import React from 'react'

import car from '../../../front_assets/images/home_banner.png'

import prescription_img1 from '../../../front_assets/images/image 14.png'
import prescription_img2 from '../../../front_assets/images/image 15.png'
import shop_offers_1 from '../../../front_assets/offers_images/Rectangle 1.png'
import shop_offers_3 from '../../../front_assets/offers_images/image 18 (1).png'
import shop_offers_4 from '../../../front_assets/offers_images/Rectangle 4 (1).png'
import shop_offers_5 from '../../../front_assets/offers_images/Rectangle 6 (1).png'
import shop_offers_6 from '../../../front_assets/offers_images/Rectangle 10 (2).png'
import shop_offers_img_17 from '../../../front_assets/offers_images/image 17 (1).png'
import shop_offers_9 from '../../../front_assets/offers_images/Rectangle 9 (2).png'
import shop_offers_18 from '../../../front_assets/offers_images/Rectangle 18.png'
import shop_categories_1 from '../../../front_assets/categories_images/Rectangle 9 (2).png'
import shop_categories_2 from '../../../front_assets/categories_images/image 19 (Traced).png'
import shop_categories_3 from '../../../front_assets/categories_images/Rectangle 17.png'
import shop_categories_4 from '../../../front_assets/categories_images/Rectangle 11 (1).png'
import shop_categories_5 from '../../../front_assets/categories_images/image 20 (Traced).png'
import shop_categories_6 from '../../../front_assets/categories_images/Rectangle 18.png'
import medicinals from '../../../front_assets/categories_images/image 21 (Traced).png'
import shop_categories_7 from '../../../front_assets/categories_images/image 22 (Traced).png'
import shop_categories_8 from '../../../front_assets/categories_images/image 23 (Traced).png'
import shop_categories_9 from '../../../front_assets/categories_images/image 24 (Traced).png'
import shop_categories_10 from '../../../front_assets/categories_images/image 25 (Traced).png'
import shop_categories_11 from '../../../front_assets/categories_images/image 26 (Traced).png'
import pcb_background from '../../../front_assets/footer_img/Rectangle 75.png'
import { Link } from 'react-router-dom'

export default function HomeDashboard() {
  return (
    <>
      <section className="page-header-section">
                <div className="page-header-box">
                    <div className="page-header-img">
                        <img src={car} alt="image" className="img-fluid"/>
                    </div>
                    <div className="page-header-txt">
                        <h2 className="first_heading_h2">WE OFFER THE BEST</h2>
                        <h2>QUALITY PRODUCTS</h2>
                        <Link to="/products" className="shop_now_button">
                            Shop Now
                        </Link>
                    </div>
                </div>
            </section>
            <section className="pt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="prescription_page">
                                <div className="page-header-img">
                                    <img src={prescription_img1} alt="image" className="img-fluid"/>
                                </div>
                                <div className="prescription_page_txt">
                                    <h2 className="prescription_heading">Order your Prescriptions Online</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="prescription_page">
                                <div className="page-header-img">
                                    <img src={prescription_img2} alt="image" className="img-fluid"/>
                                </div>
                                <div className="prescription_page_txt2">
                                    <h2 className="prescription_heading2">Talk to a Pharmacist</h2>
                                    <h5 className="prescription_paragraph">Have a question you want to ask a health professional ? Schedule a call
                                        with one of our friendly pharmacists. </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto">
                <div className="container">
                    <h3 className="p-5 text-center offers_heading">Shop Offers <hr/></h3>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-6">
                                    <img src={shop_offers_img_17} className="percent_img" alt="image"/>
                                </div>
                                <div className="col-md-6">
                                   <img src={shop_offers_9} alt="image" className="percent_50 img-fluid"/>
                                </div>
                                <div className="col-md-12">
                                   <img src={shop_offers_5} className="img-fluid flat_percent" alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-6">
                                    <img src={shop_offers_3} className="img-fluid shop_offer_big_img" alt=""/>
                                </div>
                                <div className="col-md-6">
                                    <img src={shop_offers_4} className="cetaphil_img img-fluid" alt=""/>
                                    <img src={shop_offers_6} className="flat_medicines_percent" alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="align-self-center">
                <div className="container">
                    <div className="text-center">
                        <button className="all_offers_btn">
                            All Offers
                        </button>
                    </div>
                    <h3 className="pt-5 text-center offers_heading pb-5">Shop By Categories <hr/></h3>
                    <div className="flex-container">
                        <div className="flex-item-left shop_by_cat_item">
                            <img src={shop_categories_2} className="img-fluid" alt=""/>
                            <h3 className="mt-3">Prescription</h3>
                        </div>
                        <div className="flex-item-left shop_by_cat_item2">
                            <img src={shop_categories_5} className="img-fluid" alt=""/>
                            <h3 className="mt-3">Vitamins</h3>
                        </div>
                        <div className="flex-item-left shop_by_cat_item3">
                            <img src={medicinals} className="img-fluid" alt=""/>
                            <h3 className="mt-3">Medicinals</h3>
                        </div>
                        <div className="flex-item-left shop_by_cat_item4">
                            <img src={shop_categories_7} className="img-fluid" alt=""/>
                            <h3 className="mt-3">Skin Care</h3>
                        </div>
                    </div>
                    <div className="flex-container mt-5">
                        <div className="flex-item-left shop_by_cat_item5">
                            <img src={shop_categories_8} className="img-fluid" alt=""/>
                            <h3 className="mt-3">Pharmacist Medicines</h3>
                        </div>
                        <div className="flex-item-left shop_by_cat_item6">
                            <img src={shop_categories_9} className="img-fluid" alt=""/>
                            <h3 className="mt-3">Weight Management</h3>
                        </div>
                        <div className="flex-item-left shop_by_cat_item7">
                            <img src={shop_categories_10} className="img-fluid" alt=""/>
                            <h3 className="mt-3">Pet Care</h3>
                        </div>
                        <div className="flex-item-left shop_by_cat_item8">
                            <img src={shop_categories_11} className="img-fluid" alt=""/>
                            <h3 className="mt-3">Cosmetics</h3>
                        </div>
                    </div>
                </div>

            </section>
            <section className="align-self-center">
                <div className="container">
                    <div className="text-center">
                        <button className="all_offers_btn">
                            Shop All Offer
                        </button>
                    </div>
                </div>
            </section>
    </>
  )
}
