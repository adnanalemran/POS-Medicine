import React, { useState } from 'react'
import './Help_support_leagal.css'

export default function Help_support_leagal(props) {

  const [collaps, setcollaps] = useState('one')

  switch (props.supportModelProps) {
    case 'Help':
      return <>
        <h5 className='ps-2 mb-1'>{props.supportModelProps}</h5>
        <div id="accordion help-support">
          <div className="p-2">
            <div class="card">
              <div class="card-header d-flex" onClick={() => setcollaps('one')} id="headingOne">
                <h5 class="mb-0">
                  Pharmacy POS App: FAQ and Manual
                  <span className='ms-2' style={{ fontWeight: "600", fontSize: "14px" }}>(Pharmacy Uses Only)</span>
                </h5>
              </div>
              <p className='p-2'>Welcome to the FAQ and Manual page for our Pharmacy POS App, a mobile application designed to enable pharmacies to send invoices to customers electronically, eliminating the need for printed invoices. This page provides information and instructions on how to use the app effectively. If you have further questions, please refer to the FAQs below or contact our support team.</p>
              <h6>Frequently Asked Questions (FAQs)</h6>
              <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      Q1: How does the Pharmacy POS App work?
                    </button>
                  </h2>
                  <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      A1: The Pharmacy POS App allows pharmacies to generate electronic invoices and send them to customers' mobile devices. Customers can then present the virtual invoice to the cashier for payment.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      Q2: How do I install the Pharmacy POS App?
                    </button>
                  </h2>
                  <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      A2: To install the Pharmacy POS App, visit your device's respective app store (e.g., Google Play Store for Android or App Store for iOS) and search for "Pharmacy POS App." Tap the "Install" button and follow the on-screen instructions to complete the installation.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingThree">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      Q3: Is the Pharmacy POS App free to use?
                    </button>
                  </h2>
                  <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      A3: Yes, the Pharmacy POS App is free to download and use. However, please note that standard data charges from your mobile network provider may apply when using the app.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="heading4">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapseThree">
                      Q4: How do I set up my account?
                    </button>
                  </h2>
                  <div id="collapse4" class="accordion-collapse collapse" aria-labelledby="heading4" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      A4: Upon launching the app for the first time, you will be prompted to create an account. Enter your details and follow the registration process to set up your account. You will need to provide your pharmacy's information, such as name, address, and contact details.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="heading5">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                      Q5: How do I generate and send invoices to customers?
                    </button>
                  </h2>
                  <div id="collapse5" class="accordion-collapse collapse" aria-labelledby="heading5" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      A5: To generate and send invoices, follow these steps:
                      <ul>
                        <li>Log in to your Pharmacy POS App account.</li>
                        <li>Select the customer you want to create an invoice with by adding their phone or email.</li>
                        <li>Add the items purchased by the customer to the invoice.</li>
                        <li>Review the invoice details and ensure accuracy.</li>
                        <li>Tap the "Send Invoice" button.</li>
                        <li>The app will send the invoice electronically to the customer.</li>
                        <li>The customer can then present the virtual invoice to the cashier for payment.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="heading6">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse6" aria-expanded="false" aria-controls="collapse6">
                      Q6: Can I customize the format and design of the invoices? (this is optional)
                    </button>
                  </h2>
                  <div id="collapse6" class="accordion-collapse collapse" aria-labelledby="heading6" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      A6: Yes, the Pharmacy POS App allows you to customize the format and design of the invoices. You can add your pharmacy's logo, change colors, and include additional information such as terms and conditions or promotional messages.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="heading7">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse7" aria-expanded="false" aria-controls="collapse7">
                      Q7: How can customers pay the invoices?
                    </button>
                  </h2>
                  <div id="collapse7" class="accordion-collapse collapse" aria-labelledby="heading7" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      A7: Customers can pay the invoices by showing the virtual or printed invoice on their mobile device to the cashier. The cashier can then process the payment using the available payment options, such as cash, credit/debit cards, or mobile wallets.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="heading8">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse8" aria-expanded="false" aria-controls="collapse8">
                      Q8: Can I track the status of the sent invoices?
                    </button>
                  </h2>
                  <div id="collapse8" class="accordion-collapse collapse" aria-labelledby="heading8" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      A8: Yes, the Pharmacy POS App provides a feature to track the status of sent invoices. You can view whether the invoice has been delivered, opened, or paid. This allows you to monitor the payment status and follow up if needed.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="heading9">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse9" aria-expanded="false" aria-controls="collapse9">
                      Q9: What if a customer doesn't have a smartphone?
                    </button>
                  </h2>
                  <div id="collapse9" class="accordion-collapse collapse" aria-labelledby="heading9" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      A9: If a customer doesn't have a smartphone or cannot present the virtual invoice, you can provide alternative payment options, such as a printed copy or manually entering the invoice details into your point-of-sale system.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="heading10">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse10" aria-expanded="false" aria-controls="collapse10">
                      Q10: What if I encounter technical issues or need further assistance?
                    </button>
                  </h2>
                  <div id="collapse10" class="accordion-collapse collapse" aria-labelledby="heading10" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      A10: If you encounter any technical issues or require assistance, please contact our support team through the app or refer to the app's help section for troubleshooting steps and FAQs. Our support team will gladly assist you with any queries or concerns.
                    </div>
                  </div>
                </div>
                <p className='mt-2'>
                  We hope this FAQ and Manual guide has provided you with the necessary information to use the Pharmacy POS App effectively. Enjoy the convenience of electronic invoices and streamline your pharmacy's billing process!
                </p>
              </div>

            </div>


          </div>
        </div>
      </>
      break;
    case 'Support':
      return <>
        <h5 className='ps-2 mb-1'>{props.supportModelProps}</h5>
        <div className="p-2">
          <h6 className='mb-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h6>
          <blockquote cite="http://www.worldwildlife.org/who/index.html">
            For 60 years, WWF has worked to help people and nature thrive. As the world's leading conservation organization, WWF works in nearly 100 countries. At every level, we collaborate with people around the world to develop and deliver innovative solutions that protect communities, wildlife, and the places in which they live.
          </blockquote>
          <h6 className='mb-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h6>
          <blockquote cite="http://www.worldwildlife.org/who/index.html">
            For 60 years, WWF has worked to help people and nature thrive. As the world's leading conservation organization, WWF works in nearly 100 countries. At every level, we collaborate with people around the world to develop and deliver innovative solutions that protect communities, wildlife, and the places in which they live.
          </blockquote>
          <h6 className='mb-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h6>
          <blockquote cite="http://www.worldwildlife.org/who/index.html">
            For 60 years, WWF has worked to help people and nature thrive. As the world's leading conservation organization, WWF works in nearly 100 countries. At every level, we collaborate with people around the world to develop and deliver innovative solutions that protect communities, wildlife, and the places in which they live.
          </blockquote>
        </div>

      </>
      break;
    default:
      return (
        <>
          <h5 className='ps-2 mb-1'>{props.supportModelProps}</h5>
          <div className="p-2">
            <h6 className='mb-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h6>
            <blockquote cite="http://www.worldwildlife.org/who/index.html">
              For 60 years, WWF has worked to help people and nature thrive. As the world's leading conservation organization, WWF works in nearly 100 countries. At every level, we collaborate with people around the world to develop and deliver innovative solutions that protect communities, wildlife, and the places in which they live.
            </blockquote>
            <h6 className='mb-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h6>
            <blockquote cite="http://www.worldwildlife.org/who/index.html">
              For 60 years, WWF has worked to help people and nature thrive. As the world's leading conservation organization, WWF works in nearly 100 countries. At every level, we collaborate with people around the world to develop and deliver innovative solutions that protect communities, wildlife, and the places in which they live.
            </blockquote>
            <h6 className='mb-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h6>
            <blockquote cite="http://www.worldwildlife.org/who/index.html">
              For 60 years, WWF has worked to help people and nature thrive. As the world's leading conservation organization, WWF works in nearly 100 countries. At every level, we collaborate with people around the world to develop and deliver innovative solutions that protect communities, wildlife, and the places in which they live.
            </blockquote>
            <h6 className='mb-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h6>
            <blockquote cite="http://www.worldwildlife.org/who/index.html">
              For 60 years, WWF has worked to help people and nature thrive. As the world's leading conservation organization, WWF works in nearly 100 countries. At every level, we collaborate with people around the world to develop and deliver innovative solutions that protect communities, wildlife, and the places in which they live.
            </blockquote>

          </div>

        </>
      )
  }


}
