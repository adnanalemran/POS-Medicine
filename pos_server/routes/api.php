<?php

use App\Http\Controllers\AdjustmentDetailsController;
use App\Http\Controllers\AdjustmentTypeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CarrierController;
use App\Http\Controllers\DrugGenericNameController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\UsualProviderController;
use App\Http\Controllers\DrugController;
use App\Http\Controllers\TitleController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DeliveryChannelController;
use App\Http\Controllers\DeliveryModeController;
use App\Http\Controllers\DesignationController;
use App\Http\Controllers\SupplierCategoryController;
use App\Http\Controllers\HighestDegreeController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\MaterialReceivingController;
use App\Http\Controllers\MembershipController;
use App\Http\Controllers\MrrController;
use App\Http\Controllers\PaymentChannelController;
use App\Http\Controllers\PaymentModeController;
use App\Http\Controllers\PaymentVoucharController;
use App\Http\Controllers\ProductReturnInvoiceController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\RequisitionController;
use App\Http\Controllers\RequisitionCategoryController;
use App\Http\Controllers\RequisitionFrequencyController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\SyncController;
use App\Http\Controllers\TaxSetupController;
use App\Http\Controllers\VatSetupController;
use App\Models\Adjustment;
use App\Models\Auth;
use Illuminate\Support\Facades\Artisan;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



// Clear cache
Route::get('/clear', function () {
    Artisan::call('cache:forget spatie.permission.cache');
    Artisan::call('cache:clear');
    Artisan::call('config:clear');
    Artisan::call('config:cache');
    Artisan::call('view:clear');
    Artisan::call('route:clear');
    return "Cache Cleared!";
});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::post('user/{id}', [AuthController::class, 'update_user']);



// Route::post('save-banner',[BannerController::class,'store']);
Route::post('sync-online', [SyncController::class, 'index']);


// Route::group(['middleware' => 'auth'], function () {

Route::get('auth-user', function () {
    return Auth::user();
});
Route::get('user-list', [AuthController::class, 'userList']);

Route::post('user-role-assign', [AuthController::class, 'userRole']);

Route::post('logout', [AuthController::class, 'logout']);
Route::post('refresh', [AuthController::class, 'refresh']);
Route::post('me', [AuthController::class, 'me']);

Route::resource('drug-generic-name', DrugGenericNameController::class);
Route::post('drug-generic-name/update/{id}', [DrugGenericNameController::class, 'update']);

Route::resource('category', CategoryController::class);
Route::post('category/update/{id}', [CategoryController::class, 'update']);

Route::resource('banner', BannerController::class);
Route::post('banner/update/{id}', [BannerController::class, 'update']);

Route::resource('brand', BrandController::class);
Route::post('brand/update/{id}', [BrandController::class, 'update']);

// Route::resource('todo', TodoController::class);
// Route::post('todo/update/{id}', [TodoController::class, 'update']);

Route::resource('subcategory', SubCategoryController::class);
Route::post('subcategory/update/{id}', [SubCategoryController::class, 'update']);
// usual provider
Route::resource('usual-provider', UsualProviderController::class);
Route::post('usual-provider/update/{id}', [UsualProviderController::class, 'update']);

Route::resource('supplier', DrugController::class);
Route::post('supplier/update/{id}', [DrugController::class, 'update']);
//suplier brands
Route::get('supplier-brands/{id}', [DrugController::class, 'suplier_brands']);
Route::post('add-supplier-brands', [DrugController::class, 'suplier_brands_add']);
Route::post('update-supplier-brands/{id}', [DrugController::class, 'suplier_brands_update']);
Route::delete('delete-supplier-brands/{id}', [DrugController::class, 'suplier_brands_delete']);

Route::resource('titles', TitleController::class);
Route::post('titles/update/{id}', [TitleController::class, 'update']);

Route::resource('country', CountryController::class);
Route::post('country/update/{id}', [CountryController::class, 'update']);

Route::resource('city', CityController::class);
Route::post('city/update/{id}', [CityController::class, 'update']);

Route::resource('designation', DesignationController::class);
Route::post('designation/update/{id}', [DesignationController::class, 'update']);

Route::resource('supplier-category', SupplierCategoryController::class);
Route::post('supplier-category/update/{id}', [SupplierCategoryController::class, 'update']);

Route::resource('drugs', DrugController::class);
Route::post('drugs/update/{id}', [DrugController::class, 'update']);
Route::get('products-salse-counter/{id}', [DrugController::class, 'products_salse_counter']);

Route::post('save-drugs-images', [DrugController::class, 'academic']);
Route::post('/update-drugs-images/{id}', [DrugController::class, 'AcademicUpdate']);
Route::delete('/destroy-drugs-images/{id}', [DrugController::class, 'AcademicDestroy']);

Route::resource('degrees', HighestDegreeController::class);
Route::post('degrees/update/{id}', [HighestDegreeController::class, 'update']);

Route::resource('supplier', SupplierController::class);
Route::post('supplier/update/{id}', [SupplierController::class, 'update']);
Route::post('save-legal-docs-images', [SupplierController::class, 'save_legal_docs_images']);
Route::post('save-supplier-social-media', [SupplierController::class, 'save_supplier_social_media']);
Route::delete('/destroy-supplier-legal-docs/{id}', [SupplierController::class, 'destroy_supplier_legal_docs']);
Route::delete('/destroy-supplier-social-media/{id}', [SupplierController::class, 'destroy_supplier_social_media']);
Route::post('/update-supplier-legal-docs/{id}', [SupplierController::class, 'update_supplier_legal_docs']);
Route::post('/update-supplier-social-media/{id}', [SupplierController::class, 'update_supplier_social_media']);

Route::get('/search-drug/{name}', [RequisitionController::class, 'search_drug']);
Route::get('/search-drug-brand/{name}/{id}', [RequisitionController::class, 'search_drug_brand']);

Route::resource('requisition-category', RequisitionCategoryController::class);
Route::post('requisition-category/update/{id}', [RequisitionCategoryController::class, 'update']);

Route::resource('requisition-frequency', RequisitionFrequencyController::class);
Route::post('requisition-frequency/update/{id}', [RequisitionFrequencyController::class, 'update']);


Route::resource('requisition', RequisitionController::class);
Route::post('requisition/update/{id}', [RequisitionController::class, 'update']);
Route::post('save-requisitions-products', [RequisitionController::class, 'save_requisitions_products']);
Route::post('update-requisitions-products/{id}', [RequisitionController::class, 'update_requisitions_products']);
Route::delete('destroy-requisition-details/{id}', [RequisitionController::class, 'destroy_requisition_details']);
Route::delete('po-destroy-requisition-details/{id}', [RequisitionController::class, 'po_destroy_requisition_details']);
Route::post('proceed-to-requisitions/{id}', [RequisitionController::class, 'proceed_to_requisitions']);
Route::post('proceed-to-requisitions-copy/{id}', [RequisitionController::class, 'proceed_to_requisitions_copy']);

Route::get('manager-requisition', [RequisitionController::class, 'manager_requisition']);
Route::post('proceed-to-approve/{id}', [RequisitionController::class, 'proceed_to_approve']);
Route::get('requisition-vat-tax', [RequisitionController::class, 'requisition_vat_tax']);
Route::post('proceed-to-po/{id}', [RequisitionController::class, 'proceed_to_po']);

Route::get('managers-notifications', [RequisitionController::class, 'managers_notifications']);
Route::get('edit-manager-requisition/{id}', [RequisitionController::class, 'edit_manager_requisition']);
Route::get('cancel-by-manager/{id}', [RequisitionController::class, 'cancel_by_manager']);
Route::post('cancel-by-manager-copy/{id}', [RequisitionController::class, 'cancel_by_manager_copy']);

Route::get('send-requisition-mail-to-manager/{id}', [RequisitionController::class, 'send_requisition_mail_to_manager']);
Route::get('send-approval-mail-to-sales/{id}', [RequisitionController::class, 'send_approval_mail_to_sales']);
Route::get('suppliers-requisition', [RequisitionController::class, 'suppliers_requisition']);
Route::get('confirm-requisition/{id}', [RequisitionController::class, 'confirm_requisition']);
Route::get('send-confirmation-mail/{id}', [RequisitionController::class, 'send_confirmation_mail']);
Route::post('ask-for-po/{id}', [RequisitionController::class, 'ask_for_po']);

//    Route::get('proceeded-requisition/{id}', [RequisitionController::class, 'proceeded_requisition']);
Route::delete('update-requisition-notifications/{id}', [RequisitionController::class, 'update_requisition_notifications']);
Route::delete('update-manager-requisition-notifications/{id}', [RequisitionController::class, 'update_manager_requisition_notifications']);
Route::delete('update-supplier-requisition-notifications/{id}', [RequisitionController::class, 'update_supplier_requisition_notifications']);
Route::delete('update-supplier-po-notifications/{id}', [RequisitionController::class, 'update_supplier_po_notifications']);
Route::delete('update-sales-po-notifications/{id}', [RequisitionController::class, 'update_sales_po_notifications']);
Route::get('convert-to-po/{id}', [RequisitionController::class, 'convert_to_po']);
Route::post('convert-to-po-copy/{id}', [RequisitionController::class, 'convert_to_po_copy']);


Route::get('purchase-order', [RequisitionController::class, 'purchase_order']);
Route::get('purchase-order-dropdown', [RequisitionController::class, 'purchase_order_dropdown']);
// Route::get('purchase-order-dropdown-for-mrr',[RequisitionController::class, 'purchase_order_dropdown_for_mrr']);
Route::delete('delete-purchase-order/{id}', [RequisitionController::class, 'delete_purchase_order']);
Route::get('view-purchase-order/{id}', [RequisitionController::class, 'view_purchase_order']);
Route::get('view-purchase-order-for-mrr/{id}', [RequisitionController::class, 'view_purchase_order_for_mrr']);
Route::post('/confirm-po/{id}', [RequisitionController::class, 'confirm_po']);

// Taher work -------------------------------------------------------------

Route::resource('members', MembershipController::class);
Route::post('members-update/{id}', [MembershipController::class, 'update']);
// Route::post('drugs/update/{id}', [MembershipController::class,'update']);

Route::resource('tax', TaxSetupController::class);
Route::post('tax/update/{id}', [TaxSetupController::class, 'update']);

Route::resource('vat', VatSetupController::class);
Route::post('vat/update/{id}', [VatSetupController::class, 'update']);

Route::get('invoice-vat-tax', [RequisitionController::class, 'invoice_vat_tax']);
Route::post('update-purchase-order/{id}', [RequisitionController::class, 'update_purchase_order']);

// Invoice List 
Route::resource('invoice', InvoiceController::class);
// Update Invoice List 
Route::post('invoice/update/{id}', [InvoiceController::class, 'update']);

// Save Invoice detail table 
Route::post('save-invoice-details', [InvoiceController::class, 'save_invoice_details']);
// Update Invoice details
Route::post('update-invoice-details/{id}', [InvoiceController::class, 'update_invoice_details']);
Route::post('new-invoice-details', [InvoiceController::class, 'new_invoice_details']);
// invoice details table end 

// Get All Invoices 
Route::get('all-invoices', [InvoiceController::class, 'all_invoices']);
// for app
Route::get('all-invoices-details', [InvoiceController::class, 'all_invoices_details']);
Route::post('pay-invoice/{id}', [InvoiceController::class, 'pay']);
// Route::post('pay-invoice/{id}', [StockController::class, 'stock_out']);
// search invoices by id 
Route::get('/view-selected-invoice/{id}', [InvoiceController::class, 'view_selected_invoice']);
// search invoices by date
Route::post('/serch-invoice-by-date', [InvoiceController::class, 'serch_invoice_by_date']);
// search invoice details by date
Route::post('/search-invoice-by-date', [InvoiceController::class, 'search_invoice_by_date']);
Route::post('/test_group_by', [InvoiceController::class, 'test_group_by']);
Route::post('/serch-invoice-by-member', [InvoiceController::class, 'searchByMember']);
Route::post('/serch-invoice-by-medicine', [InvoiceController::class, 'searchByMedicineId']);
Route::post('/serch-invoice-deatails-by-company', [InvoiceController::class, 'searchByCompanyId']);
// Return medicine
// Route::post('/sales-return/{id}', [InvoiceController::class, 'salse_Return']);
// Route::delete('/delete-invoice/{id}', [InvoiceController::class, 'delete_invoice']);
Route::get('/all-return-invoice', [ProductReturnInvoiceController::class, 'index']);
Route::post('/save-return-invoice-details', [ProductReturnInvoiceController::class, 'store_details']);
Route::post('/return-invoice-by-date', [ProductReturnInvoiceController::class, 'return_invoice_by_date']);
Route::post('/return_invoice_details_by_date', [ProductReturnInvoiceController::class, 'return_invoice_details_by_date']);

// ----------------------------------------------------------------//

Route::resource('delivery-mode', DeliveryModeController::class);
Route::post('delivery-mode/update/{id}', [DeliveryModeController::class, 'update']);

Route::resource('payment-mode', PaymentModeController::class);
Route::post('payment-mode/update/{id}', [PaymentModeController::class, 'update']);

Route::resource('payment-channel', PaymentChannelController::class);
Route::post('payment-channel/update/{id}', [PaymentChannelController::class, 'update']);

Route::resource('delivery-channel', DeliveryChannelController::class);
Route::post('delivery-channel/update/{id}', [DeliveryChannelController::class, 'update']);

Route::resource('carrier', CarrierController::class);
Route::post('carrier/update/{id}', [CarrierController::class, 'update']);

// -------------------------------------------- MRR Start -------------------------------------------------

Route::get('material-receiving', [RequisitionController::class, 'material_receiving']);
Route::post('save-material-receiving', [RequisitionController::class, 'save_material_receiving']);
Route::get('edit-mrr/{id}', [RequisitionController::class, 'edit_mrr']);
Route::post('save-material-receiving/update/{id}', [RequisitionController::class, 'update_mrr']);
Route::delete('delete-material-receiving/{id}', [RequisitionController::class, 'delete_material_receiving']);

Route::post('proceed-to-mrr/{id}', [RequisitionController::class, 'proceed_to_mrr']);
Route::post('proceed-to-mrr-copy/{id}', [RequisitionController::class, 'proceed_to_mrr_copy']);
Route::get('purchase-order-dropdown-for-mrr', [RequisitionController::class, 'purchase_order_dropdown_for_mrr']);

Route::get('manager-material-receiving', [RequisitionController::class, 'manager_material_receiving']);
Route::post('save-manager-material-receiving', [RequisitionController::class, 'save_manager_material_receiving']);
Route::post('mrr-proceed-to-approve/{id}', [RequisitionController::class, 'mrr_proceed_to_approve']);
Route::post('mrr-proceed-to-approve-copy/{id}', [RequisitionController::class, 'mrr_proceed_to_approve_copy']);
Route::get('mrr-cancel-by-manager/{id}', [RequisitionController::class, 'mrr_cancel_by_manager']);
Route::post('mrr-cancel-by-manager-copy/{id}', [RequisitionController::class, 'mrr_cancel_by_manager_copy']);

Route::post('save-material-receiving-details', [RequisitionController::class, 'save_material_receiving_details']);

Route::get('mrr-details/{id}', [MrrController::class, 'view_mrr']);
// Report Mrr 
Route::post('mrr-report', [MaterialReceivingController::class, 'mrr_report']);
Route::post('supplier-due', [MaterialReceivingController::class, 'supplier_due']);
// Report Mrr 


// -------------------------------------------- MRR End -------------------------------------------------



// -------------------------------------------- Store In Start -------------------------------------------------

Route::get('mrr-dropdown', [RequisitionController::class, 'mrr_dropdown']);
Route::get('view-purchase-order/{id}', [RequisitionController::class, 'view_purchase_order']);
Route::get('view-selected-mrr/{id}', [RequisitionController::class, 'view_selected_mrr']);

Route::get('view-details-mrr/{id}', [RequisitionController::class, 'view_details_mrr']);

Route::get('store-in-data', [RequisitionController::class, 'store_in_data']);

Route::post('save-store-in', [RequisitionController::class, 'save_store_in']);
Route::post('save-store-in-details', [RequisitionController::class, 'save_store_in_details']);
Route::get('edit-store-in/{id}', [RequisitionController::class, 'edit_store_in']);
Route::get('edit-store-in-details/{id}', [RequisitionController::class, 'edit_store_in_details']);

Route::delete('delete-material-receiving/{id}', [RequisitionController::class, 'delete_material_receiving']);
Route::delete('delete-store-in/{id}', [RequisitionController::class, 'delete_store_in']);

Route::post('update-store-in-details/{id}', [RequisitionController::class, 'update_store_in_details']);

Route::post('proceed-to-store-in/{id}', [RequisitionController::class, 'proceed_to_store_in']);
Route::post('proceed-to-store-in-copy/{id}', [RequisitionController::class, 'proceed_to_store_in_copy']);

Route::post('manager-proceed-to-store-in/{id}', [RequisitionController::class, 'manager_proceed_to_store_in']);
Route::post('manager-proceed-to-store-in-copy/{id}', [RequisitionController::class, 'manager_proceed_to_store_in_copy']);

Route::get('store-in-cancel-by-manager/{id}', [RequisitionController::class, 'store_in_cancel_by_manager']);
Route::post('store-in-cancel-by-manager-copy/{id}', [RequisitionController::class, 'store_in_cancel_by_manager_copy']);

Route::post('save-manager-store-in', [RequisitionController::class, 'save_manager_store_in']);
Route::post('save-manager-store-in-details', [RequisitionController::class, 'save_manager_store_in_details']);


// ------------------------------------------------------ Store In End ------------------------------------------------------------


// -------------------------------------------- Sales return Start -----------------------------------------------------------------
Route::get('sales-return-dropdown-requisition-po-data', [RequisitionController::class, 'sales_return_dropdown_requisition_po_data']);
Route::get('view-purchase-order-for-sales-return/{id}', [RequisitionController::class, 'view_purchase_order_for_sales_return']);

Route::post('save-sales-return', [RequisitionController::class, 'save_sales_return']);
Route::post('save-sales-return-details', [RequisitionController::class, 'save_sales_return_details']);
Route::post('save-manager-sales-return-details', [RequisitionController::class, 'save_manager_sales_return_details']);

Route::get('sales-return-data', [RequisitionController::class, 'sales_return_data']);
Route::post('sales-return-reports', [RequisitionController::class, 'sales_return_reports']);
Route::get('edit-sales-return/{id}', [RequisitionController::class, 'edit_sales_return']);

Route::post('update-sales-return/{id}', [RequisitionController::class, 'update_sales_return']);
Route::post('update-sales-return-details/{id}', [RequisitionController::class, 'update_sales_return_details']);

Route::post('proceed-to-approval-sales-return/{id}', [RequisitionController::class, 'proceed_to_approval_sales_return']);
Route::post('proceed-to-approval-sales-return-copy/{id}', [RequisitionController::class, 'proceed_to_approval_sales_return_copy']);

Route::delete('delete-sales-return/{id}', [RequisitionController::class, 'delete_sales_return']);

Route::post('manager-sales-return-approve/{id}', [RequisitionController::class, 'manager_sales_return_approve']);
Route::post('manager-sales-return-approve-copy/{id}', [RequisitionController::class, 'manager_sales_return_approve_copy']);

Route::get('sales-return-cancel-by-manager/{id}', [RequisitionController::class, 'sales_return_cancel_by_manager']);
Route::get('sales-return-cancel-by-manager-copy/{id}', [RequisitionController::class, 'sales_return_cancel_by_manager_copy']);

// -------------------------------------------- Sales return End --------------------------------------------------------------------



// -------------------------------------------- Adjustment Start --------------------------------------------------------------------
Route::get('adjustment', [RequisitionController::class, 'adjustment']);
Route::post('save-adjustment', [RequisitionController::class, 'save_adjustment']);
Route::post('save-adjustment-details', [RequisitionController::class, 'save_adjustment_details']);

// get selected adjustment 
Route::get('edit-adjustment/{id}', [RequisitionController::class, 'edit_adjustment']);
Route::post('update-adjustment/{id}', [RequisitionController::class, 'update_adjustment']);
Route::post('update-adjustment-details/{id}', [RequisitionController::class, 'update_adjustment_details']);

Route::post('proceed-to-adjustment/{id}', [RequisitionController::class, 'proceed_to_adjustment']);
Route::post('proceed-to-adjustment-copy/{id}', [RequisitionController::class, 'proceed_to_adjustment_copy']);
Route::delete('delete-adjustment/{id}', [RequisitionController::class, 'delete_adjustment']);

Route::post('manager-approved-adjustment/{id}', [RequisitionController::class, 'manager_approved_adjustment']);
Route::post('manager-approved-adjustment-copy/{id}', [RequisitionController::class, 'manager_approved_adjustment_copy']);

Route::post('cancel-adjustment/{id}', [RequisitionController::class, 'cancel_adjustment']);
Route::post('cancel-adjustment-copy/{id}', [RequisitionController::class, 'cancel_adjustment_copy']);
// adjustment report

Route::post('adjustment-report', [AdjustmentDetailsController::class, 'report']);



// -------------------------------------------- Adjustment Start --------------------------------------------------------------------

// -------------------------------------------- Adjustment Type --------------------------------------------------------------------
Route::resource('adjustment-type', AdjustmentTypeController::class);

// -------------------------------------------- Adjustment Type --------------------------------------------------------------------
// -------------------------------------------- Payment Vouchar --------------------------------------------------------------------
Route::resource('payment-vouchar', PaymentVoucharController::class);
Route::post('save-money-recipt', [PaymentVoucharController::class, 'money_recipt_create']);
Route::post('payment-vouchar-by-date', [PaymentVoucharController::class, 'payment_vouchar_by_date']);

// -------------------------------------------- Payment Vouchar --------------------------------------------------------------------



// -------------------------------------------- Current Stock Start --------------------------------------------------------------------

Route::get('current-stock', [StockController::class, 'current_stock']);
Route::post('stock-in', [StockController::class, 'multiple_product_save']);
Route::post('stock-in-by-csv', [StockController::class, 'multiple_product_save_using_csv']);
Route::post('salse-return-multiple', [StockController::class, 'multiple_product_return']);
Route::post('adjustment-multiple', [StockController::class, 'multiple_product_adjustment']);
Route::get('current-stock-sales-counter', [StockController::class, 'current_stock_sales']);
Route::post('invoice-product-return-multiple', [StockController::class, 'invoice_product_return']);
Route::post('stock-out-multiple', [StockController::class, 'stock_out']);

Route::post('/return-invoice-update/{id}', [InvoiceController::class, 'return_invoice']);

// stock report 
Route::get('stock-closing-report', [StockController::class, 'stock_closing_report']);
Route::get('stock-expiry-report', [StockController::class, 'stock_expiry_report']);
Route::post('profit-loss', [StockController::class, 'profit_loss']);

// -------------------------------------------- Current Stock Start --------------------------------------------------------------------


// -------------------------------------------- Transaction Start --------------------------------------------------------------------

// Route::get('paid-all-invoices', [InvoiceController::class, 'paid_all_invoices']);

// -------------------------------------------- Transaction Start --------------------------------------------------------------------
// -------------------------------------------- Dashboard Start --------------------------------------------------------------------
Route::get('yearly-revenue', [DashboardController::class, 'revenue']);
Route::get('yearly-members', [DashboardController::class, 'members']);
Route::get('yearly-invoices', [DashboardController::class, 'invoice']);
// -------------------------------------------- Dashboard End --------------------------------------------------------------------


Route::post('sync-invoice', [SyncController::class, 'sync']);
Route::get('available-sync', [SyncController::class, 'availableForSync']);




    // });
