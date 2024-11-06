import { Routes, Route, Link } from "react-router-dom";
import Home from "../Components/home";
import Dashboard from "../Components/dashboard";
import AuthUser from "../Components/AuthUser";
import Navbar from "../layouts/Navbar";
import SideBar from "../layouts/SideBar";
import Footer from "../layouts/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Todo from "../pages/setup/Todo";
import AddTodo from "../pages/setup/AddTodo";
import EditTodo from "../pages/setup/EditTodo";
import Banner from "../pages/setup/banner/Banner";
import AddBanner from "../pages/setup/banner/AddBanner";
import EditBanner from "../pages/setup/banner/EditBanner";
import Brand from "../pages/setup/brand/Brand";
import AddBrand from "../pages/setup/brand/AddBrand";
import EditBrand from "../pages/setup/brand/EditBrand";
import DrugGenericName from "../pages/setup/drug_generic_name/DrugGenericName";
import AddDrugGenericName from "../pages/setup/drug_generic_name/AddDrugGenericName";
import EditDrugGenericName from "../pages/setup/drug_generic_name/EditDrugGenericName";
import Category from "../pages/setup/category/Category";
import AddCategory from "../pages/setup/category/AddCategory";
import EditCategory from "../pages/setup/category/EditCategory";
import SubCategory from "../pages/setup/subcategory/SubCategory";
import AddSubCategory from "../pages/setup/subcategory/AddSubCategory";
import EditSubCategory from "../pages/setup/subcategory/EditSubCategory";
import UsualProvider from "../pages/setup/usual_provider/UsualProvider";
import AddUsualProvider from "../pages/setup/usual_provider/AddUsualProvider";
import EditUsualProvider from "../pages/setup/usual_provider/EditUsualProvider";
import Drugs from "../pages/admin_pages/drugs/Drugs";
import AddDrugs from "../pages/admin_pages/drugs/AddDrugs";
import EditDrugs from "../pages/admin_pages/drugs/EditDrugs";
import Supplier from "../pages/admin_pages/supplier/Supplier";
import AddSupplier from "../pages/admin_pages/supplier/AddSupplier";
import EditSupplier from "../pages/admin_pages/supplier/EditSupplier";
import Title from "../pages/setup/title/Title";
import AddTitle from "../pages/setup/title/AddTitle";
import EditTitle from "../pages/setup/title/EditTitle";
import Country from "../pages/setup/country/Country";
import AddCountry from "../pages/setup/country/AddCountry";
import EditCountry from "../pages/setup/country/EditCountry";
import City from "../pages/setup/city/City";
import AddCity from "../pages/setup/city/AddCity";
import EditCity from "../pages/setup/city/EditCity";
import Designation from "../pages/setup/designation/Designation";
import AddDesignation from "../pages/setup/designation/AddDesignation";
import EditDesignation from "../pages/setup/designation/EditDesignation";
import SupplierCategory from "../pages/setup/supplier_category/SupplierCategory";
import AddSupplierCategory from "../pages/setup/supplier_category/AddSupplierCategory";
import EditSupplierCategory from "../pages/setup/supplier_category/EditSupplierCategory";
import DegreeName from "../pages/setup/degree_name/DegreeName";
import AddDegreeName from "../pages/setup/degree_name/AddDegreeName";
import EditDegreeName from "../pages/setup/degree_name/EditDegreeName";
import Requisition from "../pages/admin_pages/requisition/Requisition";
import AddRequisition from "../pages/admin_pages/requisition/AddRequisition";
import RequisitionCategory from "../pages/setup/requisition_category/RequisitionCategory";
import AddRequisitionCategory from "../pages/setup/requisition_category/AddRequisitionCategory";
import EditRequisitionCategory from "../pages/setup/requisition_category/EditRequisitionCategory";
import RequisitionFrequency from "../pages/setup/requisition_frequency/RequisitionFrequency";
import AddRequisitionFrequency from "../pages/setup/requisition_frequency/AddRequisitionFrequency";
import EditRequisitionFrequency from "../pages/setup/requisition_frequency/EditRequisitionFrequency";
import EditRequisition from "../pages/admin_pages/requisition/EditRequisition";
import ManagerRequisition from "../pages/admin_pages/requisition/ManagerRequisition";
import EditManagerRequisition from "../pages/admin_pages/requisition/EditManagerRequisition";
import SupplierRequisition from "../pages/admin_pages/requisition/SupplierRequisition";
import EditSupplierRequisition from "../pages/admin_pages/requisition/EditSupplierRequisition";
import ProceededRequisition from "../pages/admin_pages/requisition/ProceededRequisition";
import ApprovedRequisition from "../pages/admin_pages/requisition/ApprovedRequisition";
import ConfirmedRequisition from "../pages/admin_pages/requisition/ConfirmedRequisition";
import Vat from "../pages/setup/vat/Vat";
import AddVat from "../pages/setup/vat/AddVat";
import EditVat from "../pages/setup/vat/EditVat";
import Tax from "../pages/setup/tax/Tax";
import AddTax from "../pages/setup/tax/AddTax";
import EditTax from "../pages/setup/tax/EditTax";
import { createContext, useState } from "react";
import DeliveryMode from "../pages/setup/delivery_mode/DeliveryMode";
import AddDeliveryMode from "../pages/setup/delivery_mode/AddDeliveryMode";
import EditDeliveryMode from "../pages/setup/delivery_mode/EditDeliveryMode";
import PaymentMode from "../pages/setup/payment_mode/PaymentMode";
import AddPaymentMode from "../pages/setup/payment_mode/AddPaymentMode";
import EditPaymentMode from "../pages/setup/payment_mode/EditPaymentMode";
import PaymentChannel from "../pages/setup/payment_channel/PaymentChannel";
import AddPaymentChannel from "../pages/setup/payment_channel/AddPaymentChannel";
import EditPaymentChannel from "../pages/setup/payment_channel/EditPaymentChannel";
import DeliveryChannel from "../pages/setup/delivery_channel/DeliveryChannel";
import AddDeliveryChannel from "../pages/setup/delivery_channel/AddDeliveryChannel";
import EditDeliveryChannel from "../pages/setup/delivery_channel/EditDeliveryChannel";
import Carrier from "../pages/setup/carrier/Carrier";
import AddCarrier from "../pages/setup/carrier/AddCarrier";
import EditCarrier from "../pages/setup/carrier/EditCarrier";
import PurchaseOrder from "../pages/admin_pages/purchase_order/PurchaseOrder";
import ManagerPurchaseOrder from "../pages/admin_pages/purchase_order/ManagerPurchaseOrder";
import ViewPurchaseOrder from "../pages/admin_pages/purchase_order/ViewPurchaseOrder";
import ViewManagerPurchaseOrder from "../pages/admin_pages/purchase_order/ViewManagerPurchaseOrder";
import EditManagerPurchaseOrder from "../pages/admin_pages/purchase_order/EditManagerPurchaseOrder";
import AddPurchaseOrder from "../pages/admin_pages/purchase_order/AddPurchaseOrder";
import PrintPurchaseOrder from "../pages/admin_pages/purchase_order/PrintPurchaseOrder";
import PrintRequisitions from "../pages/admin_pages/purchase_order/PrintRequisitions";
import ViewSalesPurchaseOrder from "../pages/admin_pages/purchase_order/ViewSalesPurchaseOrder";

// import MaterialReceiving from "../../pages/admin_pages/stock_management/MaterialReceiving";
// import AddMaterialReceiving from "../../pages/admin_pages/stock_management/AddMaterialReceiving";

import StoreIn from "../pages/admin_pages/stock_management/storeIn/StoreIn";
import AddStoreIn from "../pages/admin_pages/stock_management/storeIn/AddStoreIn";
import EditStoreIn from "../pages/admin_pages/stock_management/storeIn/EditStoreIn";
import SalesReturn from "../pages/admin_pages/stock_management/salesReturn/SalesReturn";
import AddSalesReturn from "../pages/admin_pages/stock_management/salesReturn/AddSalesReturn";
import EditSalesReturn from "../pages/admin_pages/stock_management/salesReturn/EditSalesReturn";
import Adjustment from "../pages/admin_pages/stock_management/adjustment/Adjustment";
import AddAdjustment from "../pages/admin_pages/stock_management/adjustment/AddAdjustment";
import EditAdjustment from "../pages/admin_pages/stock_management/adjustment/EditAdjustment";
import Billing from "../pages/admin_pages/transaction/billing/Billing";
import AddProductDetails from "../pages/admin_pages/transaction/billing/AddProductDetails";
import EditProductDetails from "../pages/admin_pages/transaction/billing/EditProductDetails";
import MaterialReceiving from "../pages/admin_pages/stock_management/MRR/MaterialReceiving";
import AddMaterialReceiving from "../pages/admin_pages/stock_management/MRR/AddMaterialReceiving";
import EditMaterialReceiving from "../pages/admin_pages/stock_management/MRR/EditMaterialReceiving";
import ViewMaterialReceiving from "../pages/admin_pages/stock_management/MRR/ViewMaterialReceiving";
import ManagerMaterialReceiving from "../pages/admin_pages/stock_management/MRR/ManagerMaterialReceiving";
import EditManagerMaterialReceiving from "../pages/admin_pages/stock_management/MRR/EditManagerMaterialReceiving";
import AddManagerMaterialReceiving from "../pages/admin_pages/stock_management/MRR/AddManagerMaterialReceiving";
import CurrentStock from "../pages/admin_pages/stock_management/currentStock/CurrentStock";
import AddCurrentStock from "../pages/admin_pages/stock_management/currentStock/AddCurrentStock";
import EditCurrentStock from "../pages/admin_pages/stock_management/currentStock/EditCurrentStock";
import ManagerCurrentStock from "../pages/admin_pages/stock_management/currentStock/ManagerCurrentStock";
import AddManagerCurrentStock from "../pages/admin_pages/stock_management/currentStock/AddManagerCurrentStock";
import EditManagerCurrentStock from "../pages/admin_pages/stock_management/currentStock/EditManagerCurrentStock";
import ViewCurrentStock from "../pages/admin_pages/stock_management/currentStock/ViewCurrentStock";
import ViewStoreIn from "../pages/admin_pages/stock_management/storeIn/ViewStoreIn";
import ManagerStoreIn from "../pages/admin_pages/stock_management/storeIn/ManagerStoreIn";
import AddManagerStoreIn from "../pages/admin_pages/stock_management/storeIn/AddManagerStoreIn";
import EditManagerStoreIn from "../pages/admin_pages/stock_management/storeIn/EditManagerStoreIn";
import ViewManagerStoreIn from "../pages/admin_pages/stock_management/storeIn/ViewManagerStoreIn";
import ViewSalesReturn from "../pages/admin_pages/stock_management/salesReturn/ViewSalesReturn";
import ManagerSalesReturn from "../pages/admin_pages/stock_management/salesReturn/ManagerSalesReturn";
import AddManagerSalesReturn from "../pages/admin_pages/stock_management/salesReturn/AddManagerSalesReturn";
import EditManagerSalesReturn from "../pages/admin_pages/stock_management/salesReturn/EditManagerSalesReturn";
import ViewAdjustment from "../pages/admin_pages/stock_management/adjustment/ViewAdjustment";
import ManagerAdjustment from "../pages/admin_pages/stock_management/adjustment/ManagerAdjustment";
import AddManagerAdjustment from "../pages/admin_pages/stock_management/adjustment/AddManagerAdjustment";
import EditManagerAdjustment from "../pages/admin_pages/stock_management/adjustment/EditManagerAdjustment";
import ReOrderRequisition from "../pages/admin_pages/stock_management/currentStock/ReOrderRequisition";
import PosTransaction from "../pages/admin_pages/posTransaction/PosTransaction";
import AdjustmentType from "../pages/setup/adjustmentType/AdjustmentType";
import UserRole from "../pages/admin_pages/hr/UserRole";
import Customers from "../pages/admin_pages/Customers/Customers";
import PosTransactionReport from "../pages/admin_pages/posTransaction/PosTransactionReport";
import PacketSize from "../pages/admin_pages/packet_size/PacketSize";
import SalesReport from "../pages/admin_pages/Reports/SalesReport";
import SalesSummaryReport from "../pages/admin_pages/Reports/SalesSummaryReport";
import CreditSalesReport from "../pages/admin_pages/Reports/CreditSalesReport";
import SalesReturnReport from "../pages/admin_pages/Reports/SalesReturnReport";
import CreditSalesMemberReport from "../pages/admin_pages/Reports/CreditSalesMemberReport";
import PurchaseReport from "../pages/admin_pages/Reports/PurchaseReport";
import PurchaseSummaryReport from "../pages/admin_pages/Reports/PurchaseSummaryReport";
import PurchaseReturnReport from "../pages/admin_pages/Reports/PurchaseReturnReport";
import SupplierDueReport from "../pages/admin_pages/Reports/SupplierDueReport";
import StockClosingReport from "../pages/admin_pages/Reports/StockClosingReport";
import StockAdjustmentReport from "../pages/admin_pages/Reports/StockAdjustmentReport";
import ProductExpiryReport from "../pages/admin_pages/Reports/ProductExpiryReport";
import ProfitLossReport from "../pages/admin_pages/Reports/ProfitLossReport";
import SalesMemberReport from "../pages/admin_pages/Reports/SalesMemberReport";
import Sync from "../pages/admin_pages/Sync/Sync";

export const memberContext = createContext();

function Auth() {
  const { token, logout } = AuthUser();
  const logoutUser = () => {
    logout();
  };

  const [currentMember, setCurrentMember] = useState({
    member_name: "",
    member_email: "",
    member_phone: "",
  });
  const [cart, setCart] = useState([]);

  return (
    <memberContext.Provider
      value={{ currentMember, setCurrentMember, setCart, cart }}
    >
      <div>
        <ToastContainer />

        <div className="main-wrapper">
          <SideBar></SideBar>
          <div className="page-wrapper">
            <Navbar></Navbar>

            <Routes>
              {/* <Route path="/" element={<Home/>} />*/}
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/todo" element={<Todo />} />
              <Route path="/add-todo" element={<AddTodo />} />
              <Route path="/edit-todo/:id" element={<EditTodo />} />
              <Route path="/banner" element={<Banner />} />
              <Route path="/add-banner" element={<AddBanner />} />
              <Route path="/edit-banner/:id" element={<EditBanner />} />
              <Route path="/brand" element={<Brand />} />
              <Route path="/add-brand" element={<AddBrand />} />
              <Route path="/edit-brand/:id" element={<EditBrand />} />
              <Route path="/drug-generic-name" element={<DrugGenericName />} />
              <Route
                path="/add-drug-generic-name"
                element={<AddDrugGenericName />}
              />
              <Route
                path="/edit-drug-generic-name/:id"
                element={<EditDrugGenericName />}
              />
              <Route path="/category" element={<Category />} />
              <Route path="/add-category" element={<AddCategory />} />
              <Route path="/edit-category/:id" element={<EditCategory />} />
              <Route path="/subcategory" element={<SubCategory />} />
              <Route path="/add-subcategory" element={<AddSubCategory />} />
              <Route
                path="/edit-subcategory/:id"
                element={<EditSubCategory />}
              />
              <Route path="/usual-provider" element={<UsualProvider />} />
              <Route
                path="/add-usual-provider"
                element={<AddUsualProvider />}
              />
              <Route
                path="/edit-usual-provider/:id"
                element={<EditUsualProvider />}
              />

              <Route path="/drugs" element={<Drugs />} />
              <Route path="/add-drugs" element={<AddDrugs />} />
              <Route path="/edit-drugs/:id" element={<EditDrugs />} />

              {/* <Route path="/current-stock" element={<CurrentStock/>} /> */}
              {/* Packet Size start   */}
              {/* <Route path='/packet-size' element={<PacketSize />} /> */}
              {/* Packet Size end   */}

              <Route path="/titles" element={<Title />} />
              <Route path="/add-titles" element={<AddTitle />} />
              <Route path="/edit-titles/:id" element={<EditTitle />} />

              <Route path="/country" element={<Country />} />
              <Route path="/add-country" element={<AddCountry />} />
              <Route path="/edit-country/:id" element={<EditCountry />} />

              <Route path="/city" element={<City />} />
              <Route path="/add-city" element={<AddCity />} />
              <Route path="/edit-city/:id" element={<EditCity />} />

              <Route path="/designation" element={<Designation />} />
              <Route path="/add-designation" element={<AddDesignation />} />
              <Route
                path="/edit-designation/:id"
                element={<EditDesignation />}
              />

              <Route
                path="/suppliers-category"
                element={<SupplierCategory />}
              />
              <Route
                path="/add-supplier-category"
                element={<AddSupplierCategory />}
              />
              <Route
                path="/edit-supplier-category/:id"
                element={<EditSupplierCategory />}
              />

              <Route path="/supplier" element={<Supplier />} />
              <Route path="/add-supplier" element={<AddSupplier />} />
              <Route path="/edit-supplier/:id" element={<EditSupplier />} />

              <Route path="/degree" element={<DegreeName />} />
              <Route path="/add-degrees" element={<AddDegreeName />} />
              <Route path="/edit-degrees/:id" element={<EditDegreeName />} />

              <Route path="/vat-setup" element={<Vat />} />
              <Route path="/add-vat" element={<AddVat />} />
              <Route path="/edit-vat/:id" element={<EditVat />} />

              <Route path="/tax-setup" element={<Tax />} />
              <Route path="/add-tax" element={<AddTax />} />
              <Route path="/edit-tax/:id" element={<EditTax />} />

              <Route path="/adjustment-type" element={<AdjustmentType />} />

              {/* --------------------------------------------------------------------------------------------------------------- */}
              <Route path="/delivery-mode" element={<DeliveryMode />} />
              <Route path="/add-delivery-mode" element={<AddDeliveryMode />} />
              <Route
                path="/edit-delivery-mode/:id"
                element={<EditDeliveryMode />}
              />

              <Route path="/payment-mode" element={<PaymentMode />} />
              <Route path="/add-payment-mode" element={<AddPaymentMode />} />
              <Route
                path="/edit-payment-mode/:id"
                element={<EditPaymentMode />}
              />

              <Route path="/payment-channel" element={<PaymentChannel />} />
              <Route
                path="/add-payment-channel"
                element={<AddPaymentChannel />}
              />
              <Route
                path="/edit-payment-channel/:id"
                element={<EditPaymentChannel />}
              />

              <Route path="/delivery-channel" element={<DeliveryChannel />} />
              <Route
                path="/add-delivery-channel"
                element={<AddDeliveryChannel />}
              />
              <Route
                path="/edit-delivery-channel/:id"
                element={<EditDeliveryChannel />}
              />

              <Route path="/carrier" element={<Carrier />} />
              <Route path="/add-carrier" element={<AddCarrier />} />
              <Route path="/edit-carrier/:id" element={<EditCarrier />} />
              {/* -------------------------------------------------------------------------------------------------------------- */}

              <Route path="/requisitions" element={<Requisition />} />
              <Route path="/add-requisition" element={<AddRequisition />} />
              <Route
                path="/edit-requisition/:id"
                element={<EditRequisition />}
              />
              <Route
                path="/proceeded-requisition/:id"
                element={<ProceededRequisition />}
              />

              <Route
                path="/requisition-category"
                element={<RequisitionCategory />}
              />
              <Route
                path="/add-requisition-category"
                element={<AddRequisitionCategory />}
              />
              <Route
                path="/edit-requisition-category/:id"
                element={<EditRequisitionCategory />}
              />

              <Route
                path="/requisition-frequency"
                element={<RequisitionFrequency />}
              />
              <Route
                path="/add-requisition-frequency"
                element={<AddRequisitionFrequency />}
              />
              <Route
                path="/edit-requisition-frequency/:id"
                element={<EditRequisitionFrequency />}
              />

              <Route
                path="/manager-requisition"
                element={<ManagerRequisition />}
              />
              <Route
                path="/edit-manager-requisition/:id"
                element={<EditManagerRequisition />}
              />
              <Route
                path="/approved-requisition/:id"
                element={<ApprovedRequisition />}
              />

              <Route
                path="/suppliers-requisition"
                element={<SupplierRequisition />}
              />
              <Route
                path="/edit-supplier-requisition/:id"
                element={<EditSupplierRequisition />}
              />
              <Route
                path="/confirmed-requisition/:id"
                element={<ConfirmedRequisition />}
              />

              <Route path="/purchase-order" element={<PurchaseOrder />} />
              <Route
                path="/manager-purchase-order"
                element={<ManagerPurchaseOrder />}
              />
              <Route
                path="/view-purchase-order/:id"
                element={<ViewPurchaseOrder />}
              />
              <Route
                path="/view-manager-purchase-order/:id"
                element={<ViewManagerPurchaseOrder />}
              />
              <Route
                path="/edit-manager-purchase-order/:id"
                element={<EditManagerPurchaseOrder />}
              />

              <Route
                path="/add-purchase-order"
                element={<AddPurchaseOrder />}
              />
              <Route
                path="/print-purchase-order/:id"
                element={<PrintPurchaseOrder />}
              />
              <Route
                path="/print-requisitions/:id"
                element={<PrintRequisitions />}
              />
              <Route
                path="/view-sales-purchase-order/:id"
                element={<ViewSalesPurchaseOrder />}
              />

              {/*-------------------------------- Store In MRR Start ----------------------------------*/}
              <Route
                path="/material-receiving"
                element={<MaterialReceiving />}
              />
              <Route
                path="/add-material-receiving"
                element={<AddMaterialReceiving />}
              />
              <Route
                path="edit-material-receiving/:id"
                element={<EditMaterialReceiving />}
              />
              <Route
                path="/view-material-receiving/:id"
                element={<ViewMaterialReceiving />}
              />

              <Route
                path="/add-manager-material-receiving"
                element={<AddManagerMaterialReceiving />}
              />
              <Route
                path="/manager-material-receiving"
                element={<ManagerMaterialReceiving />}
              />
              <Route
                path="/edit-manager-material-receiving/:id"
                element={<EditManagerMaterialReceiving />}
              />
              {/* <Route path="/view-manager-material-receiving/:id" element={<ViewManagerMaterialReceiving/>} /> */}
              {/*-------------------------------- Store In MRR End ----------------------------------*/}

              {/* ................................. Current Stock Start.................................  */}
              <Route path="/current-stock" element={<CurrentStock />} />
              <Route path="/add-current-stock" element={<AddCurrentStock />} />
              <Route
                path="/edit-current-stock/:id"
                element={<EditCurrentStock />}
              />
              <Route
                path="/view-current-stock/:id"
                element={<ViewCurrentStock />}
              />

              <Route
                path="/manager-current-stock"
                element={<ManagerCurrentStock />}
              />
              <Route
                path="/add-manager-current-stock"
                element={<AddManagerCurrentStock />}
              />
              <Route
                path="/edit-manager-current-stock/:id"
                element={<EditManagerCurrentStock />}
              />
              {/* ................................. Current Stock End .................................. */}

              {/* ................................. Start Store In ..................................... */}
              <Route path="/store-in" element={<StoreIn />} />
              <Route path="/add-store-in" element={<AddStoreIn />} />
              <Route path="/edit-store-in/:id" element={<EditStoreIn />} />
              <Route path="/view-store-in/:id" element={<ViewStoreIn />} />

              <Route path="/manager-store-in" element={<ManagerStoreIn />} />
              <Route
                path="/add-manager-store-in"
                element={<AddManagerStoreIn />}
              />
              <Route
                path="/edit-manager-store-in/:id"
                element={<EditManagerStoreIn />}
              />
              <Route
                path="/view-manager-store-in/:id"
                element={<ViewManagerStoreIn />}
              />
              {/* ................................. End Store In ........................................*/}

              {/* ................................. End Store In ........................................*/}
              <Route path="/sales-return" element={<SalesReturn />} />
              <Route path="/add-sales-return" element={<AddSalesReturn />} />
              <Route
                path="/edit-sales-return/:id"
                element={<EditSalesReturn />}
              />
              <Route
                path="/view-sales-return/:id"
                element={<ViewSalesReturn />}
              />

              <Route
                path="/manager-sales-return"
                element={<ManagerSalesReturn />}
              />
              <Route
                path="/add-manager-sales-return"
                element={<AddManagerSalesReturn />}
              />
              <Route
                path="/edit-manager-sales-return/:id"
                element={<EditManagerSalesReturn />}
              />
              {/* ................................. End Store In ........................................*/}

              {/* ................................. Adjustment Start ........................................*/}
              <Route path="/adjustment" element={<Adjustment />} />
              <Route path="/add-adjustment" element={<AddAdjustment />} />
              <Route path="/edit-adjustment/:id" element={<EditAdjustment />} />
              <Route path="/view-adjustment/:id" element={<ViewAdjustment />} />

              <Route
                path="/manager-adjustment"
                element={<ManagerAdjustment />}
              />
              <Route
                path="/add-manager-adjustment"
                element={<AddManagerAdjustment />}
              />
              <Route
                path="/edit-manager-adjustment/:id"
                element={<EditManagerAdjustment />}
              />

              {/* ................................. Adjustment End ........................................*/}

              <Route path="/billing" element={<Billing />} />
              <Route
                path="/add-product-details"
                element={<AddProductDetails />}
              />
              <Route
                path="/edit-billing/:id"
                element={<EditProductDetails />}
              />

              {/* ................................. Pos Transaction start ........................................*/}

              <Route path="/transaction" element={<PosTransaction />} />
              {/* <Route
                path='/transaction-report'
                element={<PosTransactionReport />}
              /> */}

              {/* ................................. Pos Transaction end ........................................*/}

              {/* Re order rewuisition  */}
              <Route
                path="/re-order-requisition"
                element={<ReOrderRequisition />}
              />

              <Route path="/user-role-managment" element={<UserRole />} />

              <Route path="/customers" element={<Customers />} />
              <Route path="/sync" element={<Sync />} />
              {/* Report routes */}
              <Route path="/sales-report" element={<SalesReport />} />
              <Route
                path="/sales-summary-report"
                element={<SalesSummaryReport />}
              />
              <Route
                path="/sales-return-report"
                element={<SalesReturnReport />}
              />
              <Route
                path="/sales-report-by-member"
                element={<SalesMemberReport />}
              />
              <Route
                path="/credit-sales-report"
                element={<CreditSalesReport />}
              />
              <Route
                path="/credit-sales-report-by-member"
                element={<CreditSalesMemberReport />}
              />
              <Route path="/purchase-report" element={<PurchaseReport />} />
              <Route
                path="/purchase-summary-report"
                element={<PurchaseSummaryReport />}
              />
              <Route
                path="/purchase-return-report"
                element={<PurchaseReturnReport />}
              />
              <Route
                path="/supplier-due-report"
                element={<SupplierDueReport />}
              />
              <Route
                path="/stock-closing-report"
                element={<StockClosingReport />}
              />
              <Route
                path="/stock-adjustment-report"
                element={<StockAdjustmentReport />}
              />
              <Route
                path="/product-expiry-report"
                element={<ProductExpiryReport />}
              />
              <Route
                path="/profit-loss-report"
                element={<ProfitLossReport />}
              />
              {/* Report routes */}
            </Routes>
            <Footer></Footer>
          </div>
        </div>
      </div>
    </memberContext.Provider>
  );
}

export default Auth;
