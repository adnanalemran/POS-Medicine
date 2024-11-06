import React from 'react';
import { HiLocationMarker } from "react-icons/hi";
import { BsFillTelephoneFill } from "react-icons/bs";
import MaterialTable from 'material-table';
import './PurchaseOrder.css'
import logo from '../../../front_assets/pharma_logo/logo.png'


const PreviewModal = ({setIsOpen, handlePrint, componentRef}) => {

    const columnsData = [
        { title: 'Item Code', field: 'itemCode' },
        { title: 'Name & Generic', field: 'nameAndGeneric' },
        { title: 'Brand Name', field: 'brandName' },
        { title: 'Dosage Form', field: 'dosageForm' },
        { title: 'Strength', field: 'strength' },
        { title: 'Packet Size', field: 'packetSize' },
        { title: 'Qty', field: 'qty' },
        { title: 'Rate', field: 'rate' },
        { title: 'Total', field: 'total' },
    ]

    const rowData = [
        {
            itemCode:'#5954',
            nameAndGeneric:'Napa650mgetamol',
            brandName:'Incepta',
            dosageForm:'tablet',
            strength:'250mg',
            packetSize:'1*61 pack',
            qty:'10',
            rate:'100',
            total:'1000'
        },
        {
            itemCode:'#5954',
            nameAndGeneric:'Napa650mgetamol',
            brandName:'Incepta',
            dosageForm:'Injectic',
            strength:'100mg',
            packetSize:'1*61 pack',
            qty:'20',
            rate:'200',
            total:'2000'
        },
        {
            itemCode:'#5954',
            nameAndGeneric:'Napa650mgetamol',
            brandName:'Incepta',
            dosageForm:'Injectic',
            strength:'100mg',
            packetSize:'1*61 pack',
            qty:'20',
            rate:'200',
            total:'2000'
        },
        {
            itemCode:'#5954',
            nameAndGeneric:'Napa650mgetamol',
            brandName:'Incepta',
            dosageForm:'Injectic',
            strength:'100mg',
            packetSize:'1*61 pack',
            qty:'20',
            rate:'200',
            total:'2000'
        },
    ]

    return (
        <div>
            <div ref={componentRef} className=''>


            <div className="row">
  <div className="col-md-12">
    <div className="card">
      <div className="card-body">
        <div className="container-fluid d-flex justify-content-between">
          <div className="col-lg-3 ps-0">
            <a href="#" className="noble-ui-logo d-block mt-3">Noble<span>UI</span></a>                 
            <p className="mt-1 mb-1"><b>NobleUI Themes</b></p>
            <p>108,<br /> Great Russell St,<br />London, WC1B 3NA.</p>
            <h5 className="mt-5 mb-2 text-muted">Invoice to :</h5>
            <p>Joseph&nbsp;E&nbsp;Carr,<br /> 102, 102  Crown Street,<br /> London, W3 3PR.</p>
          </div>
          <div className="col-lg-3 pe-0">
            <h4 className="fw-bolder text-uppercase text-end mt-4 mb-2">invoice</h4>
            <h6 className="text-end mb-5 pb-4"># INV-002308</h6>
            <p className="text-end mb-1">Balance Due</p>
            <h4 className="text-end fw-normal">$ 72,420.00</h4>
            <h6 className="mb-0 mt-3 text-end fw-normal mb-2"><span className="text-muted">Invoice Date :</span> 25rd Jan 2022</h6>
            <h6 className="text-end fw-normal"><span className="text-muted">Due Date :</span> 12th Jul 2022</h6>
          </div>
        </div>
        <div className="container-fluid mt-5 d-flex justify-content-center w-100">
          <div className="table-responsive w-100">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Description</th>
                  <th className="text-end">Quantity</th>
                  <th className="text-end">Unit cost</th>
                  <th className="text-end">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-end">
                  <td className="text-start">1</td>
                  <td className="text-start">PSD to html conversion</td>
                  <td>02</td>
                  <td>$55</td>
                  <td>$110</td>
                </tr>
                <tr className="text-end">
                  <td className="text-start">2</td>
                  <td className="text-start">Package design</td>
                  <td>08</td>
                  <td>$34</td>
                  <td>$272</td>
                </tr>
                <tr className="text-end">
                  <td className="text-start">3</td>
                  <td className="text-start">Html template development</td>
                  <td>03</td>
                  <td>$500</td>
                  <td>$1500</td>
                </tr>
                <tr className="text-end">
                  <td className="text-start">4</td>
                  <td className="text-start">Redesign</td>
                  <td>01</td>
                  <td>$30</td>
                  <td>$30</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="container-fluid mt-5 w-100">
          <div className="row">
            <div className="col-md-6 ms-auto">
              <div className="table-responsive">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Sub Total</td>
                      <td className="text-end">$ 14,900.00</td>
                    </tr>
                    <tr>
                      <td>TAX (12%)</td>
                      <td className="text-end">$ 1,788.00</td>
                    </tr>
                    <tr>
                      <td className="text-bold-800">Total</td>
                      <td className="text-bold-800 text-end"> $ 16,688.00</td>
                    </tr>
                    <tr>
                      <td>Payment Made</td>
                      <td className="text-danger text-end">(-) $ 4,688.00</td>
                    </tr>
                    <tr className="bg-light">
                      <td className="text-bold-800">Balance Due</td>
                      <td className="text-bold-800 text-end">$ 12,000.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid w-100">
          <a href="javascript:;" className="btn btn-primary float-end mt-4 ms-2"><i data-feather="send" className="me-3 icon-md" />Send Invoice</a>
          <a href="javascript:;" className="btn btn-outline-primary float-end mt-4"><i data-feather="printer" className="me-2 icon-md" />Print</a>
        </div>
      </div>
    </div>
  </div>
</div>




            </div>
            <button onClick={handlePrint} className='px-6 text-xs py-1 rounded-sm mt-1'>Prints</button>
        </div>
    );
};

export default PreviewModal;