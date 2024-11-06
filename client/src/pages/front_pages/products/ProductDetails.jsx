import React, {useState} from 'react'
import Footer from '../layouts/Footer'

import Header from '../layouts/Header'
import products_left_img from '../../../front_assets/products/logo/image 33.png'
import products_right_img from '../../../front_assets/products/logo/image 30.png'
import product_large_img from '../../../front_assets/products/products_details/82874.jpg'
import zap from '../../../front_assets/products/products_details/image 34.png'
import latitude from '../../../front_assets/products/products_details/image 35.png'
import {Link} from "react-router-dom";

export default function Products() {


    const [isActive, setIsActive] = useState(false);

    const grid_view = (event) => {
        // ️ toggle isActive state on click
        setIsActive((current) => !current);
    };

    // const grid_view = () => {
    //
    //   var x = document.getElementById("myTopnav_custom");
    //   if (x.className === "topnav_custom") {
    //     x.className += " responsive_custom";
    //   } else {
    //     x.className = "topnav_custom";
    //   }
    //
    // }


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
                                    <li className="breadcrumb-item active" aria-current="page">Nexma Harbal Uterina Syrup 100 ml</li>
                                </ol>
                                <hr/>
                            </nav>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <img src={product_large_img} className="img-fluid product_images" alt=""/>
                                    <span className="pr_code">Code: 10049493</span>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 product_details_titles_section">
                                    <h3 className="product_details_title">Nexma Harbal Uterina Syrup 100 ml</h3>
                                    <h3 className="product_details_subtitle">(Sterlie Proygen free)</h3>
                                    <h4 className="product_price">Product Price <span className="float-end">$59.50</span></h4>

                                    <div className="d-flex qty_block_checkout">
                                        <button type="button" id="button-minus" className="btn"><i
                                            className="fas fa-minus"></i></button>
                                        <input type="text" className="count_input_checkout"/>
                                        <button type="button" id="button-plus" className="btn"><i className="fas fa-plus"></i>
                                        </button>
                                    </div>

                                    <Link to="/products" className="details_add_to_cart">
                                        Add to Cart
                                    </Link>
                                    <h4 className="repay_para"> or repay weekly, fortnightly or monthly with
                                        <img src={zap} className="img-fluid zap_img" alt=""/>
                                        <img src={latitude} className="img-fluid latitude_img" alt=""/>
                                    </h4>
                                </div>


                            </div>


                            <div>
                                <h3 className="limited_stock">Limited Stock*</h3>
                                <p>Our stock is running a little low. We will process your order, however we cannot confirm that we will be able to
                                    supply this product.</p>
                                <p>In the event we are unable to supply, we will contact you to organise an immediate refund.</p>
                                <p>Call 1300 463 342 if you would like to confirm available quantities.</p>
                            </div>
                            <div className="tab_sections">
                                <div className="card tab_card">
                                    {/*<div className="card-body tab_card_body">*/}
                                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home"
                                                    type="button" role="tab" aria-controls="pills-home" aria-selected="true">Product Info
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile"
                                                    type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Delivery Info
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact"
                                                    type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Returns & Exchanges
                                            </button>
                                        </li>
                                    </ul>
                                    {/*</div>*/}
                                </div>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                        <h3 className="product_details_det_title">Nexma Harbal Uterina Syrup 100 ml</h3>
                                        <div>
                                            <h3 className="product_description_sections">Description:</h3>

                                            <p className="line_height_para">Super PEA 400 mg Capsules</p>

                                            <p className="line_height_para">Palmitoylethanolamide (P.E.A)400mg Capsules</p>

                                            <p className="line_height_para">This product has been compounded by the pharmacist.</p>

                                            <p className="line_height_para">Free from gluten, lactose, dairy, soy, caffeine, yeast, eggs, corn, sugar, peanuts, sesame oils,
                                                sulfites and artificial colours. </p>
                                            <h3 className="product_description_sections">Overview:</h3>

                                            <p>For relief of pain and discomfort
                                                Palmitoylethanolamide is a chemical found naturally in our body that can bind to cells and reduce pain
                                                and swelling</p>
                                            <h3 className="product_description_sections">How to use:</h3>
                                            <p>Adults: Take 1 capsule by mouth THREE times per day or as directed by your healthcare practitioner.</p>


                                            <h3 className="product_description_sections">Side effects:</h3>
                                            <p>Palmitoylethanolamide is generally well tolerated.</p>
                                            <p>Some rare side effects reported in clinical research include gastrointestinal symptoms such as
                                                nausea.</p>
                                            <p>Very rarely, some patients have experienced palpitations and drowsiness.</p>
                                            <h3 className="product_description_sections">Drug Interactions:</h3>
                                            <p>No drug interactions have been reported with Palmitoylethanolamide.</p>
                                            <h3 className="product_description_sections">Ingredients:</h3>
                                            <p>
                                                Active ingredients: Palmitoylethanolamide 400mg <br/>
                                                Inactive Ingredients: Cellulose (Microcrystalline)
                                            </p>
                                            <h3 className="product_description_sections">Storage:</h3>
                                            <p>
                                                Store at room temperature below 30 degress Celsius. <br/>
                                                Protect from direct sunlight.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                        <p>
                                            Please note that Public Holidays will add on extra delivery time for orders
                                            SuperPharmacy orders will be packaged in plain, impervious packaging that is unmarked for security and privacy reasons. Orders will be dispatched as soon as possible once payment is received.

                                            We will dispatch most orders within 1 business day from Monday to Friday, assuming all items are in stock. All other orders will be dispatched as quickly as possible thereafter.

                                            For Orders containing prescription items please see the prescription processing procedure.
                                        </p>


                                        <h3 className="product_description_sections">Australia Wide shipment details</h3>
                                        <p>
                                            We offer Standard Shipping for $4.95** with approximately 4-8 business days of transit time based upon your location within Australia.*

                                            We also offer an Express Delivery Service for $10.95** with approximately 1-3 business days of transit time based upon your location within Australia.*

                                            All Australian orders $99 or more in value will qualify for FREE Standard Shipping or Express Delivery at $7.95

                                            Any orders that contain an item that requires Cold-Chain Shipping will incur a $10.95 Express Delivery Fee. This will overwrite any other thresholds.

                                            Any orders over 5kgs will have our Online Team be in contact with further information regarding shipping.

                                            All orders of Prescription items will receive FREE Delivery regardless of order value.

                                            *These estimations are based upon transit time once dispatched from our locations. Please note our couriers do not operate on weekends and public holidays.

                                            **These delivery costs do not represent orders that we consider 'Bulk Orders'.  Bulk Orders will have our Online Team be in touch in order to discuss appropriate shipping costs. For clarification on what we classify as a 'Bulk Order', refer to our terms and conditions or give us a call.
                                        </p>
                                        <h3 className="product_description_sections">Sending a Prescription to GreatPharma.</h3>
                                        <p>
                                            When you purchase prescription medication online with GreatPharma, we need a valid script in our possession before we can dispatch your medications to you.

                                            For Electronic Prescriptions, it is now as easy as sending your Token to epharmacist@greatpharma.com.

                                            For Paper Prescriptions, we still require the physical paperwork in our possession, so they can only be processed once we physically receive your prescription paperwork. Prescription product orders will be dispensed and dispatched on the business day the prescription or valid repeat authorisation is received at the GREATPHARMA registered premises. Please send your prescription paperwork to the appropriate store

                                            NSW, ACT and TAS:  SUPERPHARMACY PO Box 1877 Hornsby Westfield 1635

                                            QLD or NT: SuperPharmacy 5/17 Billabong St, Stafford QLD, 4053

                                            SA: GreatPharma 41 Hindley street Adelaide, SA 5000

                                            VIC: GreatPharma 92 Lygon Street East Brunswick VIC 3057

                                            WA: GreatPharma 259 Walcott St, North Perth WA 6006
                                        </p>
                                        <h3 className="product_description_sections">Postage and handling for international orders</h3>
                                        <p>We do not currently deliver outside of Australia</p>
                                    </div>
                                    <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                        <h3 className="product_description_sections">How Do Returns & Refunds Work?</h3>
                                        <p>
                                            We are happy to offer refunds or exchanges on any item (excluding restricted items*) that you have purchased from us.

                                            Important: You are not entitled to, or guaranteed, a refund for Change of Mind returns. They will be processed at our discretion. We reserve the right to charge a restocking fee for Change of Mind returns.
                                            You will be responsible for the cost of shipping to return goods to us unless we specify that we will cover the cost.

                                            Note: Legislation prohibits us from accepting Prescription Items for refund or exchange.



                                            All we ask is that you follow the below to qualify:

                                            Check your products as soon as you receive delivery. Ensure the correct items have been sent, and nothing is damaged or in an unusable condition.

                                            Contact us within 30 days from your order date (7 days for damaged/incorrect items).
                                        </p>
                                        <h3 className="product_description_sections">How We Handle Them:</h3>
                                        <p>
                                            Change of Mind

                                            If you've had a change of mind about an item you have ordered, we'll need to receive it back to us unopened and unused, in the original packaging.

                                            Faulty Item

                                            If the item you have received is faulty, please contact us with a detailed description of the product fault, alongside a photo if possible.


                                            Allergic Reaction

                                            In the rare instance you've had an allergic reaction to a product, please discontinue use of the product immediately. We may reach out for further information on the reaction.
                                            Allergy returns must be less than 20% used upon arrival back to us.


                                            Incorrect / Damaged Items

                                            If you have received an item that isn't what you ordered, or it arrived damaged, please take a photo and contact us within 7 days of delivery.

                                            Please don't dispose of the item without informing us.
                                        </p>
                                        <h3 className="product_description_sections">The Process:</h3>
                                        <p>
                                            Contact Us

                                            To start a return, please send your request to customerservice@greatpharma.com. Make sure we have received & acknowledged your request before you send the item back to us.

                                            Instructions

                                            A Customer Service Team Member will then review your request, and be in touch with some further information. Should your request be approved, they will supply a return address for you to post the item back to us, and instructions on how to do so.

                                            Drop Off At Your Post Office

                                            Once you have received the returns address and packaged and labelled your box as instructed, all you need to do is drop off the parcel at your local Post Office. From there, they will take care of getting the parcel back to us.

                                            We Receive Your Return

                                            It can take anywhere from an estimated 1-10 business days for us to receive your return parcel back to us (depending on location). We check for any returns daily and will process the refund/exchange within 2 business days after receiving the item back to us. We will make sure the entire process is communicated to you once we receive the item back.

                                        </p>

                                        <h3 className="product_description_sections">Am I Eligible For Free Return Shipping ?</h3>
                                        <p>
                                            If you qualify for free return shipping, our Customer Service Team will make this clear to you in your request. Unfortunately, we are not able to cover return postage fees on all return types.



                                            What Items Are Restricted For Returns*?

                                            We will not accept Change of Mind Returns for the following items:

                                            Baby Formula
                                            Prescription Medicine
                                            Perfumes & Colognes
                                            Bulk / Special Orders
                                        </p>
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
