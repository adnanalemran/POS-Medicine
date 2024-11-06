<?php

namespace App\Http\Controllers;

use App\Mail\ManagerRequisitionMail;
use App\Mail\MrrEmail;
use App\Mail\PurchaseOrderMail;
use App\Mail\SalesRequisitionMail;
use App\Mail\SupplierPurchaseOrderMail;
use App\Models\Adjustment;
use App\Models\AdjustmentDetails;
use App\Models\Auth;
use App\Models\Category;
use App\Models\Drug;
use App\Models\ManagerRequisitionNotification;
use App\Models\MaterialReceiving;
use App\Models\MaterialReceivingDetails;
use App\Models\PurchaseOrderDeliveryDetails;
use App\Models\Requisition;
use App\Models\RequisitionDetails;
use App\Models\SalesReturn;
use App\Models\SalesReturnDetails;
use App\Models\StoreIn;
use App\Models\StoreInDetail;
use App\Models\TaxSetup;
use App\Models\User;
use App\Models\VatSetup;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;

class RequisitionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Requisition::orderBy('id', 'DESC')->get();

        return response()->json([
            'status' => 200,
            'data' => $data,
        ]);
    }


    public function invoice_vat_tax()
    {
        $vat = VatSetup::first();
        $tax = TaxSetup::first();

        return response()->json([
            'status' => 200,
            'vat' => $vat,
            'tax' => $tax,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreRequisitionRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //        return $request->all();
        $validator = Validator::make(
            $request->all(),
            [
                'requisition_no' => 'required',
                // 'requisition_category_id' => 'required',
                // 'expected_date_of_delivery' => 'required',
                'date_and_time' => 'required',
                // 'test_sample' => 'required',
                'supplier_id' => 'required',
                'delivery_mode_id' => 'required',
                'payment_mode_id' => 'required',
                'reference_invoice_no' => 'required',
                'reference_order_no' => 'required',
            ],
            [
                'requisition_no.required' => 'Requisition No field is required',
                'requisition_category_id.required' => 'Requisition Category field is required',
                'expected_date_of_delivery.required' => 'EDOD field is required',
                'date_and_time.required' => 'Date & Time field is required',
                'test_sample.required' => 'Test Sample field is required',
                'supplier_id.required' => 'Supplier field is required',
                'delivery_mode_id.required' => 'Delivery mode field is required',
                'payment_mode_id.required' => 'Payment mode field is required',
                'reference_invoice_no.required' => 'Reference Invoice field is required',
                'reference_order_no.required' => 'Reference Order field is required',
            ]

        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {

            $data = $request->all();

            $data['requisition_status'] = 'new';

            $requisition = Requisition::create($data);

            return response()->json([
                'status' => 200,
                'requisition' => $requisition,
                'message' => 'Requisition Created Successfully.',
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Requisition $drugGenericName
     * @return \Illuminate\Http\Response
     */
    public function show(Requisition $drugGenericName)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Requisition $drugGenericName
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = DB::table('requisitions')
            ->leftJoin('suppliers', 'requisitions.supplier_id', 'suppliers.id')
            ->where('requisitions.id', $id)
            ->select('requisitions.*', 'suppliers.commission')
            ->first();

        //            Requisition::find($id);
        $req_details = DB::table('requisition_details')
            ->leftJoin('drugs', 'drugs.id', 'requisition_details.drug_id')
            ->leftJoin('drug_generic_names', 'drug_generic_names.id', 'drugs.generic_id')
            ->leftJoin('brands', 'brands.id', 'drugs.brand_id')

            //            with('generic_name', 'brand')

            ->where('requisition_details.requisition_master_id', $id)
            ->select('requisition_details.*', 'drugs.macrohealth_sg', 'drugs.drug_code', 'drugs.expiry_date', 'drugs.generic_id', 'drugs.brand_id', 'drugs.drug_price', 'drugs.vat', 'drugs.box_size', 'drugs.class', 'drugs.batch', 'drug_generic_names.generic_name', 'brands.title')
            ->get();
        if ($data) {
            return response()->json([
                'status' => 200,
                'data' => $data,
                'req_details' => $req_details,
            ]);
        } else {
            return response()->json([
                'status' => 403,
                'message' => 'No data found.'
            ]);
        }
    }



    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateRequisitionRequest $request
     * @param \App\Models\Requisition $drugGenericName
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //        return $request->all();
        $validator = Validator::make($request->all(), [
            'requisition_no' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        } else {
            $data = $request->all();

            $data['payment_mode_id'] == null ? '' : $request->payment_mode_id;
            $data['requisition_category_id'] == null ? '' : $request->requisition_category_id;
            $data['requisition_frequency_id'] == null ? '' : $request->requisition_frequency_id;
            $data['supplier_id'] == null ? '' : $request->supplier_id;
            $data['test_sample'] == null ? '' : $request->test_sample;

            $brand = Requisition::find($id);
            $brand->fill($data)->save();

            // Requisition::update($data);

            return response()->json([
                'status' => 200,
                'requisition_id' => $id,
                'message' => 'Data updated successfully.'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Requisition $drugGenericName
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = Requisition::find($id)->delete();

        if ($data) {
            return response()->json([
                'status' => 200,
                'message' => 'Data deleted successfully.'
            ]);
        } else {
            return response()->json([
                'status' => 403,
                'message' => 'Data not found',
            ]);
        }
    }

    public function search_drug($name)
    {
        // $drugs = Drug::with('generic_name', 'brand')
        //     ->where('drug_name', 'LIKE', '%' . $name . '%')
        //     ->orwhere('macrohealth_sg', 'LIKE', '%' . $name . '%')
        //     ->orwhereHas('generic_name', function ($q) use ($name) {
        //         $q->where('generic_name', 'LIKE', '%' . $name . '%');
        //     })
        //     ->where('delete_status', 0)
        //     ->get();
        $drugs = Drug::with('brand')
            ->where('drug_name', 'LIKE', '%' . $name . '%')
            ->orwhere('macrohealth_sg', 'LIKE', '%' . $name . '%')
            ->orwhere('generic_name', 'LIKE', '%' . $name . '%')
            ->orwhere('manufacturer', 'LIKE', '%' . $name . '%')
            ->where('delete_status', 0)
            ->get();

        if (count($drugs)) {
            return Response()->json($drugs);
        } else {
            return response()->json(['drugs' => 'No Data not found'], 404);
        }
    }
    public function search_drug_brand($name, $id)
    {
        // $drugs = Drug::with('generic_name', 'brand')
        //     ->where('drug_name', 'LIKE', '%' . $name . '%')
        //     ->orwhere('macrohealth_sg', 'LIKE', '%' . $name . '%')
        //     ->orwhereHas('generic_name', function ($q) use ($name) {
        //         $q->where('generic_name', 'LIKE', '%' . $name . '%');
        //     })
        //     ->where('delete_status', 0)
        //     ->get();
        $drugs = Drug::with('brand')
            ->where('brand_id', $id)
            ->where('drug_name', 'LIKE', '%' . $name . '%')
            ->orwhere('brand_id', $id)
            ->where('macrohealth_sg', 'LIKE', '%' . $name . '%')
            ->orwhere('brand_id', $id)
            ->where('generic_name', 'LIKE', '%' . $name . '%')
            // ->orwhere('manufacturer', 'LIKE', '%' . $name . '%')
            ->where('delete_status', 0)
            ->get();

        if (count($drugs)) {
            return Response()->json($drugs);
        } else {
            return response()->json(['drugs' => 'No Data not found'], 404);
        }
    }

    public function save_requisitions_products(Request $request)
    {
        //some updates
        $req_details = new RequisitionDetails();
        $drug_table = Drug::find($request->drug_id);

        if ($request->requisition_master_id != null) {
            $drug_table->drug_price = $request->drug_price;
            $drug_table->vat = $request->vat;
            $drug_table->purchase_price_with_vat = $request->purchase_price_with_vat;

            $drug_table->save();
        }

        $req_details->requisition_master_id = $request->requisition_master_id;
        $req_details->drug_id = $request->drug_id;
        $req_details->boxType = $request->boxType;
        $req_details->pktSize = $request->pktSize;
        $req_details->noOfBox = $request->noOfBox;
        $req_details->unit = $request->unit;
        $req_details->disc = $request->disc;
        $req_details->req_unit = $request->req_unit;
        $req_details->price = $request->drug_price;
        $req_details->pcs = $request->pcs;
        $req_details->totalPrice = $request->totalPrice;

        $req_details->save();

        // return response()->json([
        //     'status' => 200,
        //     'message' => 'Requisition sends to manager.'
        // ]);

    }

    public function update_requisitions_products(Request $request, $id)
    {

        $req_details = RequisitionDetails::find($id);
        $drug_table = Drug::find($request->drug_id);
        $drug_table->drug_price = $request->drug_price;
        $drug_table->save();

        $req_details->boxType = $request->boxType;
        $req_details->pktSize = $request->pktSize;
        $req_details->noOfBox = $request->noOfBox;
        $req_details->unit = $request->unit;
        $req_details->disc = $request->disc;
        $req_details->req_unit = $request->req_unit;
        $req_details->price = $request->drug_price;
        $req_details->pcs = $request->pcs;
        $req_details->totalPrice = $request->totalPrice;
        $req_details->save();
    }

    public function destroy_requisition_details($id)
    {
        $doc = RequisitionDetails::find($id);
        $doc->delete();
    }
    public function po_destroy_requisition_details($id)
    {
        $doc = RequisitionDetails::find($id);
        if ($doc) {
            $doc->delete_status = 1;
            $doc->save();
        }
    }

    public function proceed_to_requisitions(Request $request, $id)
    {

        $data = Requisition::find($id);

        $data->requisition_status = 'pending';
        $data->updated_by = Auth::id();
        $data->save();

        $pro_to_req = new ManagerRequisitionNotification();
        $pro_to_req->requisition_id = $id;
        $pro_to_req->read_status = "No";
        $pro_to_req->action_users_role = "sales";
        $pro_to_req->save();

        // $user = User::where('user_type', 'manager')->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Requisition request(Requisition No: '.$data->requisition_no.') has been send to you for approval from sales.',
        // ];

        // Mail::to('developerashiksarker89@gmail.com')->send(new SalesRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Requisition sends to manager.'
        ]);
    }

    public function proceed_to_requisitions_copy(Request $request, $id)
    {
        // return $newId;

        $newId = $request->user_id;

        $data = Requisition::find($id);
        $data->requisition_status = 'pending';
        $data->updated_by = $newId;
        $data->save();

        $pro_to_req = new ManagerRequisitionNotification();
        $pro_to_req->requisition_id = $id;
        $pro_to_req->read_status = "No";
        $pro_to_req->action_users_role = "sales";
        $pro_to_req->save();

        // $user = User::where('user_type', 'manager')->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => '(Requisition No: '.$data->requisition_no.') has been send to you for approval from sales.',
        // ];

        // Mail::to('developerashiksarker89@gmail.com')->send(new SalesRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Requisition sends to manager.'
        ]);
    }

    public function proceed_to_approve(Request $request, $id)
    {
        $data = Requisition::find($id);
        $data->requisition_status = 'approved';
        $data->save();

        $pro_to_req = new ManagerRequisitionNotification();
        $pro_to_req->requisition_id = $id;
        $pro_to_req->read_status = "No";
        $pro_to_req->action_users_role = "manager-approved";
        $pro_to_req->save();

        // $user = User::where('email',$data->requisitor_contact_email)->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Your requisition(Requisition No: '.$data->requisition_no.') has been approved by Requisition Manager. You can generate P.O. now.',
        // ];

        // Mail::to($data->requisitor_contact_email)->send(new ManagerRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Requisition approved by manager.'
        ]);
    }

    public function manager_requisition()
    {
        $data = DB::table('requisitions')
            ->leftJoin('users', 'users.id', 'requisitions.updated_by')
            ->where('requisitions.requisition_status', 'pending')
            ->orWhere('requisitions.requisition_status', 'approved')
            ->orWhere('requisitions.requisition_status', 'confirmed')
            ->orWhere(['users.user_type' => 'manager', 'requisitions.requisition_status' => 'cancelled'])
            ->whereNull('requisitions.deleted_at')
            ->select('requisitions.*', 'users.user_type')
            ->orderBy('requisitions.requisition_status', 'DESC')
            ->orderBy('requisitions.id', 'DESC')
            ->get();

        return response()->json([
            'status' => 200,
            'data' => $data,
        ]);
    }

    public function managers_notifications()
    {
        $data = DB::table('manager_requisition_notifications')
            ->leftJoin('requisitions', 'manager_requisition_notifications.requisition_id', 'requisitions.id')
            ->where('manager_requisition_notifications.action_users_role', 'sales')
            ->orWhere('manager_requisition_notifications.action_users_role', 'supplier-confirmed')
            ->orWhere('manager_requisition_notifications.action_users_role', 'supplier-askforpo')
            ->orderBy('manager_requisition_notifications.id', 'DESC')
            ->select('manager_requisition_notifications.*', 'requisitions.requisition_no')
            ->get();

        $sales = DB::table('manager_requisition_notifications')
            ->leftJoin('requisitions', 'manager_requisition_notifications.requisition_id', 'requisitions.id')
            ->where('manager_requisition_notifications.action_users_role', 'supplier-confirmed')
            ->orWhere('manager_requisition_notifications.action_users_role', 'supplier-askforpo')
            ->orWhere('manager_requisition_notifications.action_users_role', 'manager-approved')
            ->orWhere('manager_requisition_notifications.action_users_role', 'supplier-confirm-po')
            ->orderBy('manager_requisition_notifications.id', 'DESC')
            ->select('manager_requisition_notifications.*', 'requisitions.requisition_no', 'requisitions.purchase_order_no')
            ->get();

        $supplier = DB::table('manager_requisition_notifications')
            ->leftJoin('requisitions', 'manager_requisition_notifications.requisition_id', 'requisitions.id')
            ->where('manager_requisition_notifications.action_users_role', 'manager-approved')
            ->orWhere('manager_requisition_notifications.action_users_role', 'sales-po')
            ->orderBy('manager_requisition_notifications.id', 'DESC')
            ->select('manager_requisition_notifications.*', 'requisitions.requisition_no', 'requisitions.purchase_order_no')
            ->get();

        return response()->json([
            'status' => 200,
            'data' => $data,
            'sales' => $sales,
            'supplier' => $supplier,
        ]);
    }

    public function edit_manager_requisition($id)
    {

        $data = Requisition::find($id);
        $req_details = DB::table('requisition_details')
            ->leftJoin('drugs', 'drugs.id', 'requisition_details.drug_id')
            ->leftJoin('drug_generic_names', 'drug_generic_names.id', 'drugs.generic_id')
            ->leftJoin('brands', 'brands.id', 'drugs.brand_id')

            //            with('generic_name', 'brand')

            ->where('requisition_details.requisition_master_id', $id)
            ->select('requisition_details.*', 'drugs.drug_name', 'drugs.drug_code', 'drugs.expiry_date', 'drugs.generic_id', 'drugs.brand_id', 'drugs.drug_price', 'drug_generic_names.generic_name', 'brands.title')
            ->get();

        $pro_to_req = ManagerRequisitionNotification::where('requisition_id', $id)->first();
        $pro_to_req->requisition_id = $id;
        $pro_to_req->read_status = "Yes";
        $pro_to_req->save();

        if ($data) {
            return response()->json([
                'status' => 200,
                'data' => $data,
                'req_details' => $req_details,
            ]);
        } else {
            return response()->json([
                'status' => 403,
                'message' => 'No data found.'
            ]);
        }
    }

    public function cancel_by_manager($id)
    {
        // return $id;

        $data = Requisition::find($id);
        $data->requisition_status = 'cancelled';
        $data->updated_by = Auth::id();
        $data->save();

        $pro_to_req = new ManagerRequisitionNotification();
        $pro_to_req->requisition_id = $id;
        $pro_to_req->read_status = "No";
        $pro_to_req->action_users_role = "manager-cancelled";
        $pro_to_req->save();

        // $user = User::where('email',$data->requisitor_contact_email)->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Your requisition(Requisition No: '.$data->requisition_no.') has been cancelled by Requisition Manager.',
        // ];

        // Mail::to($data->requisitor_contact_email)->send(new ManagerRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Requisition cancelled by manager.'
        ]);
    }

    public function cancel_by_manager_copy(Request $request, $id)
    {
        // return $id;
        $newId = $request->user_id;

        $data = Requisition::find($id);
        $data->requisition_status = 'cancelled';
        $data->updated_by = $newId;
        $data->save();

        $pro_to_req = new ManagerRequisitionNotification();
        $pro_to_req->requisition_id = $id;
        $pro_to_req->read_status = "No";
        $pro_to_req->action_users_role = "manager-cancelled";
        $pro_to_req->save();

        // $user = User::where('email',$data->requisitor_contact_email)->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Your requisition(Requisition No: '.$data->requisition_no.') has been cancelled by Requisition Manager.',
        // ];

        // Mail::to($data->requisitor_contact_email)->send(new ManagerRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Requisition cancelled by manager.'
        ]);
    }

    public function send_requisition_mail_to_manager($id)
    {
        $data = Requisition::find($id);

        $user = User::where('user_type', 'manager')->first();

        $details = [
            'name' => $user->name,
            'messages' => 'Requisition request(Requisition No: ' . $data->requisition_no . ') has been send to you for approval from sales.',
        ];

        Mail::to('dev.arafat.zaimahtech@gmail.com')->send(new SalesRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Requisition sends to manager.'
        ]);
    }

    public function send_approval_mail_to_sales($id)
    {
        $data = Requisition::find($id);

        // $user = User::where('email',$data->requisitor_contact_email)->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Your requisition(Requisition No: '.$data->requisition_no.') has been approved by Requisition Manager.',
        // ];

        // Mail::to($data->requisitor_contact_email)->send(new ManagerRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Requisition approved by manager.'
        ]);
    }

    public function suppliers_requisition()
    {
        $data = DB::table('requisitions')
            ->leftJoin('users', 'users.id', 'requisitions.updated_by')
            ->where('requisitions.requisition_status', 'confirmed')
            ->orWhere('requisitions.requisition_status', 'approved')
            //            ->orWhere(['users.user_type' => 'manager', 'requisitions.requisition_status' => 'cancelled'])
            ->whereNull('requisitions.deleted_at')
            ->select('requisitions.*', 'users.user_type')
            ->orderBy('requisitions.requisition_status', 'ASC')
            ->get();

        return response()->json([
            'status' => 200,
            'data' => $data,
        ]);
    }

    public function confirm_requisition($id)
    {
        $data = Requisition::find($id);
        $data->requisition_status = 'confirmed';
        $data->save();

        $pro_to_req = new ManagerRequisitionNotification();
        $pro_to_req->requisition_id = $id;
        $pro_to_req->read_status = "No";
        $pro_to_req->action_users_role = "supplier-confirmed";
        $pro_to_req->save();


        // $user = User::where('email',$data->requisitor_contact_email)->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Your requisition(Requisition No: '.$data->requisition_no.') has been confirmed by Supplier.',
        // ];

        // Mail::to($data->requisitor_contact_email)->send(new ManagerRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Requisition confirmed by manager.'
        ]);
    }
    public function send_confirmation_mail($id)
    {
        $data = Requisition::find($id);

        // $user = User::where('email',$data->requisitor_contact_email)->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Your requisition(Requisition No: '.$data->requisition_no.') has been confirmed by Supplier.',
        // ];

        // Mail::to($data->requisitor_contact_email)->send(new ManagerRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Requisition confirmed by manager.'
        ]);
    }

    public function ask_for_po(Request $request, $id)
    {
        $data = Requisition::find($id);
        $data->is_ask_for_po = "Yes";
        $data->save();

        $pro_to_req = new ManagerRequisitionNotification();
        $pro_to_req->requisition_id = $id;
        $pro_to_req->read_status = "No";
        $pro_to_req->action_users_role = "supplier-askforpo";
        $pro_to_req->save();

        // $user = User::where('email',$data->requisitor_contact_email)->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Your requisition(Requisition No: '.$data->requisition_no.') has been confirmed by Supplier. You have to make a P.O. against this requisition.',
        // ];

        // Mail::to($data->requisitor_contact_email)->send(new ManagerRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'P.O. Generations message sent successfully.'
        ]);
    }

    public function update_requisition_notifications($id)
    {
        ManagerRequisitionNotification::where('id', $id)
            ->update(['sales_read_status' => 'yes']);
    }

    public function update_manager_requisition_notifications($id)
    {
        ManagerRequisitionNotification::where('id', $id)
            ->update(['manager_read_status' => 'yes']);
    }
    public function update_supplier_requisition_notifications($id)
    {
        ManagerRequisitionNotification::where('id', $id)
            ->update(['supplier_read_status' => 'yes']);
    }
    public function update_supplier_po_notifications($id)
    {
        ManagerRequisitionNotification::where('id', $id)
            ->update(['supplier_read_status' => 'yes']);
    }
    public function update_sales_po_notifications($id)
    {
        ManagerRequisitionNotification::where('id', $id)
            ->update(['sales_read_status' => 'yes']);
    }

    public function convert_to_po(Request $request, $id)
    {

        $data = Requisition::find($id);
        $data->requisition_status = 'PO_Created';
        $data->purchase_order_no = 'PO-' . date('Ymd') . $data->id;
        $data->po_creator = $request->po_creator;
        $data->po_create_date = date('Y-m-d');
        $data->save();

        $pro_to_req = new ManagerRequisitionNotification();
        $pro_to_req->requisition_id = $id;
        $pro_to_req->action_users_role = "sales-po";
        $pro_to_req->save();
    }


    public function convert_to_po_copy(Request $request, $id)
    {


        $data = Requisition::find($id);
        $data->requisition_status = 'PO_Created';
        $data->purchase_order_no = 'PO-' . date('Ymd') . $data->id;
        $data->po_creator = $request->po_creator;
        // $data->po_creator = auth()->user()->id;
        $data->po_create_date = date('Y-m-d');
        $data->save();

        $is_podd_exist = PurchaseOrderDeliveryDetails::where('requisition_po_id', $id)->first();
        $is_podd_count = PurchaseOrderDeliveryDetails::where('requisition_po_id', $id)->count();

        if ($is_podd_count > 0) {
            $del_details = PurchaseOrderDeliveryDetails::find($is_podd_exist->id);
        } else {
            $del_details = new PurchaseOrderDeliveryDetails();
        }
        $del_details->requisition_po_id = $id;
        $del_details->preferred_payment_channel_id = $request->preferred_payment_channel_id;
        $del_details->delivery_channel_id = $request->delivery_channel_id;
        $del_details->save();

        return response()->json([
            'status' => 200,
            'message' => 'Purchase order created successfully.',
            'data' => $del_details
        ]);
    }

    public function purchase_order()
    {
        $data = Requisition::with('user')->whereNotNull('purchase_order_no')->orderBy('id', 'DESC')->get();
        return response()->json([
            'status' => 200,
            'data' => $data,
        ]);
    }

    public function delete_purchase_order($id)
    {
        $data = Requisition::where('id', $id)
            ->update(['purchase_order_no' => null, 'po_creator' => null, 'po_create_date' => null,]);

        if ($data) {
            return response()->json([
                'status' => 200,
                'message' => 'Data deleted successfully.'
            ]);
        } else {
            return response()->json([
                'status' => 403,
                'message' => 'Data not found',
            ]);
        }
    }

    public function view_purchase_order($id)
    {
        $data = DB::table('requisitions')
            ->leftJoin('users', 'requisitions.po_creator', 'users.id')
            ->leftJoin('requisition_categories', 'requisitions.requisition_category_id', 'requisition_categories.id')
            ->leftJoin('suppliers', 'requisitions.supplier_id', 'suppliers.id')
            ->leftJoin('purchase_order_delivery_details', 'requisitions.id', 'purchase_order_delivery_details.requisition_po_id')
            ->select('requisitions.*', 'users.name', 'requisition_categories.requisition_category_name', 'suppliers.supplier_name', 'suppliers.commission', 'suppliers.vat as supplier_vat', 'suppliers.tax as supplier_tax', 'suppliers.email as supplier_email', 'purchase_order_delivery_details.preferred_delivery_mode_id', 'purchase_order_delivery_details.preferred_payment_mode_id', 'purchase_order_delivery_details.preferred_payment_channel_id', 'purchase_order_delivery_details.delivery_channel_id')
            ->where('requisitions.id', $id)
            ->first();
        $req_details = DB::table('requisition_details')
            ->leftJoin('drugs', 'drugs.id', 'requisition_details.drug_id')
            ->leftJoin('drug_generic_names', 'drug_generic_names.id', 'drugs.generic_id')
            ->leftJoin('brands', 'brands.id', 'drugs.brand_id')
            ->where('requisition_details.delete_status', 0)
            ->where('requisition_details.requisition_master_id', $id)
            ->select('requisition_details.*', 'drugs.macrohealth_sg', 'drugs.drug_code', 'drugs.expiry_date', 'drugs.vat', 'drugs.box_size', 'drugs.generic_id', 'drugs.brand_id', 'drugs.drug_price', 'drugs.batch', 'drugs.class', 'drug_generic_names.generic_name', 'brands.title')
            ->get();


        $pro_to_req = ManagerRequisitionNotification::where('requisition_id', $id)->first();
        $pro_to_req->requisition_id = $id;
        $pro_to_req->read_status = "Yes";
        $pro_to_req->save();

        if ($data) {
            return response()->json([
                'status' => 200,
                'data' => $data,
                'req_details' => $req_details
            ]);
        } else {
            return response()->json([
                'status' => 403,
                'message' => 'No data found.'
            ]);
        }
    }

    public function view_purchase_order_for_mrr($id)
    {
        $data = DB::table('requisitions')
            ->leftJoin('users', 'requisitions.po_creator', 'users.id')
            ->leftJoin('requisition_categories', 'requisitions.requisition_category_id', 'requisition_categories.id')
            ->leftJoin('suppliers', 'requisitions.supplier_id', 'suppliers.id')
            ->leftJoin('purchase_order_delivery_details', 'requisitions.id', 'purchase_order_delivery_details.requisition_po_id')
            ->select('requisitions.*', 'users.name', 'requisition_categories.requisition_category_name', 'suppliers.supplier_name', 'suppliers.commission', 'suppliers.email as supplier_email', 'suppliers.tax as supplier_tax', 'suppliers.vat as supplier_vat', 'purchase_order_delivery_details.preferred_delivery_mode_id', 'purchase_order_delivery_details.preferred_payment_mode_id', 'purchase_order_delivery_details.preferred_payment_channel_id', 'purchase_order_delivery_details.delivery_channel_id')
            ->where('requisitions.id', $id)
            ->first();
        $req_details = DB::table('requisition_details')
            ->leftJoin('drugs', 'drugs.id', 'requisition_details.drug_id')
            ->leftJoin('drug_generic_names', 'drug_generic_names.id', 'drugs.generic_id')
            ->leftJoin('brands', 'brands.id', 'drugs.brand_id')
            ->where('requisition_details.delete_status', 0)
            ->where('requisition_details.requisition_master_id', $id)
            ->select('requisition_details.*', 'drugs.macrohealth_sg', 'drugs.drug_code', 'drugs.expiry_date', 'drugs.generic_id', 'drugs.brand_id', 'drugs.drug_price',  'drugs.class', 'drugs.batch', 'drug_generic_names.generic_name', 'drugs.box_size', 'brands.title')
            ->get();
        $mrr = MaterialReceiving::where('requisition_po_id', $id)->first();

        $pro_to_req = ManagerRequisitionNotification::where('requisition_id', $id)->first();
        $pro_to_req->requisition_id = $id;
        $pro_to_req->read_status = "Yes";
        $pro_to_req->save();

        if ($data) {
            return response()->json([
                'status' => 200,
                'data' => $data,
                'req_details' => $req_details,
                'mrr' => $mrr
            ]);
        } else {
            return response()->json([
                'status' => 403,
                'message' => 'No data found.'
            ]);
        }
    }

    public function confirm_po(Request $request, $id)
    {
        $data = Requisition::where('id', $id)
            ->update(['po_is_confirmed' => 'yes', 'requisition_status' => 'PO_Confirmed']);

        // $data = Requisition::where('id',$id)
        //     ->update(['requisition_status' => 'confirm po']);

        // $pro_to_req = new ManagerRequisitionNotification();
        // $pro_to_req->requisition_id = $id;
        // $pro_to_req->action_users_role = "supplier-confirm-po";
        // $pro_to_req->save();
        $details = [
            'data' => $request->data,
            'message' => 'Your have a purchase order ( Purchase No: ' . $request->purchase_order_no . ' ) has been confirmed by manager.',
        ];

        if ($data && $request->manager_email && $request->supplier_email) {
            Mail::to($request->manager_email)->send(new PurchaseOrderMail($details));
            Mail::to($request->supplier_email)->send(new SupplierPurchaseOrderMail($details));
            return response()->json([
                'status' => 200,
                'message' => 'Purchase order confirmed successfully.'
            ]);
        } else {
            return response()->json([
                'status' => 403,
                'message' => 'Data not found',
            ]);
        }
        return response()->json([
            'status' => 200,
            'message' => 'Purchase order confirmed successfully.'
        ]);
    }

    public function requisition_vat_tax()
    {
        $vat = VatSetup::first();
        $tax = TaxSetup::first();

        return response()->json([
            'status' => 200,
            'vat' => $vat,
            'tax' => $tax,
        ]);
    }

    public function update_purchase_order(Request $request, $id)
    {
        //        return $request->all();delivery_mode
        $data = $request->all();
        //            $data['po_is_sent'] = 'yes';
        $data['purchase_order_no'] = 'PO-' . date('Ymd') . $id;
        // $data['po_creator'] =  Auth::id();
        $data['po_creator'] = $request->po_creator;
        $data['po_create_date'] = date('Y-m-d');
        $brand = Requisition::find($id);
        $brand->fill($data)->save();



        //        $data = Requisition::find($id);
        //        $data->purchase_order_no = 'PO-'.date('Ymd').$data->id;
        //        $data->po_creator = Auth::id();
        //        $data->po_create_date = date('Y-m-d');
        //        $data->save();

        $pro_to_req = new ManagerRequisitionNotification();
        $pro_to_req->requisition_id = $id;
        $pro_to_req->action_users_role = "sales-po";
        $pro_to_req->save();




        $is_podd_exist = PurchaseOrderDeliveryDetails::where('requisition_po_id', $id)->first();
        $is_podd_count = PurchaseOrderDeliveryDetails::where('requisition_po_id', $id)->count();

        if ($is_podd_count > 0) {
            $del_details = PurchaseOrderDeliveryDetails::find($is_podd_exist->id);
        } else {
            $del_details = new PurchaseOrderDeliveryDetails();
        }

        $del_details->requisition_po_id = $id;
        $del_details->preferred_delivery_mode_id = $request->preferred_delivery_mode_id;
        $del_details->preferred_payment_mode_id = $request->preferred_payment_mode_id;
        $del_details->preferred_payment_channel_id = $request->preferred_payment_channel_id;
        $del_details->delivery_channel_id = $request->delivery_channel_id;
        $del_details->save();


        return response()->json([
            'status' => 200,
            'requisition_id' => $id,
            'message' => 'Data updated successfully.'
        ]);
    }

    public function purchase_order_dropdown()
    {
        $data =
            Requisition::whereNull('purchase_order_no')
            ->where(
                function ($query) {
                    return $query
                        ->where('requisition_status',  'approved')
                        ->orWhere('requisition_status',  'confirmed');
                }
            )
            ->orderBy('id', 'DESC')
            ->get();

        return response()->json([
            'status' => 200,
            'data' => $data,
        ]);
    }

    public function purchase_order_dropdown_for_mrr()
    {
        $data = Requisition::where('po_is_confirmed', 'yes')
            ->where(
                function ($query) {
                    return $query
                        ->whereNull('mrr_is_done');
                    //                                    ->orWhere('requisition_status',  'confirmed');
                }
            )
            ->orderBy('id', 'DESC')
            ->get();

        return response()->json([
            'status' => 200,
            'data' => $data,
        ]);
    }

    public function proceed_to_po($id)
    {
        Requisition::where('id', $id)
            ->update(['po_is_sent' => 'yes']);
    }



    public function material_receiving()
    {
        $data = MaterialReceiving::orderBy('id', 'DESC')->get();
        return response()->json([
            'status' => 200,
            'data' => $data,
        ]);
    }

    public function save_material_receiving_details(Request $request)
    {
        //        return $request->all();
        $drug_table = Drug::find($request->drug_id);
        if ($drug_table) {
            $drug_table->drug_price = $request->price;
            $drug_table->vat = $request->vat;
            $drug_table->trade_price_box = $request->trade_price_box;
            $drug_table->pktSize = $request->pktSize;
            $drug_table->purchase_price_with_vat = $drug_table->drug_price + $request->vat;
            $drug_table->save();
        }

        $req_details = new MaterialReceivingDetails();
        $req_details->material_receiving_master_id = $request->material_receiving_master_id;
        $req_details->drug_id = $request->drug_id;
        $req_details->boxType = $request->boxType;
        $req_details->box_size = $request->box_size;
        $req_details->bonus_qty = $request->bonus_qty ? $request->bonus_qty : 0;
        $req_details->pktSize = $request->pktSize;
        $req_details->noOfBox = $request->noOfBox;
        $req_details->vat = $request->vat;
        $req_details->unit = $request->unit;
        $req_details->price = $request->price;
        $req_details->disc = $request->disc;
        $req_details->req_unit = $request->req_unit;
        $req_details->totalPrice = $request->totalPrice;
        $req_details->save();
    }




    public function save_material_receiving(Request $request)
    {
        // return $request->all();
        // return $request->all();

        $validator = Validator::make(
            $request->all(),
            [
                'purchase_order_no_id' => 'required',
                'contact_no' => 'required',
                'vehicle_no' => 'required',
                'carried_by' => 'required',
                'carrier_id' => 'required',
                'manufacturer_id' => 'required',
                'mrr_expiry_date' => 'required',
            ],
            [
                'purchase_order_no_id.required' => 'required',
                'contact_no.required' => 'required',
                'vehicle_no.required' => 'required',
                'carried_by.required' => 'required',
                'carrier_id.required' => 'required',
                'manufacturer_id.required' => 'required',
                'mrr_expiry_date.required' => 'required',
            ]

        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {

            $data = $request->all();



            Requisition::where('id', $request->purchase_order_no_id)
                ->update(['mrr_is_done' => 'yes', 'mrr_done_by' => Auth::id()]);

            $data['created_by'] = Auth::id();
            $data['requisition_po_id'] = $request->purchase_order_no_id;
            $data['mrr_status'] = 'New';

            if ($request->hasfile('delivery_no_docs')) {
                $file = $request->file('delivery_no_docs');
                $img_ext = $file->getClientOriginalExtension();
                $img_name = time() . rand(111, 99999) . '.' . $img_ext;
                $image_path = 'files/delivery_no_docs/' . $img_name;
                Image::make($file)->resize(982, 500)->save($image_path);
                $data['delivery_no_docs'] = $img_name;
            } else {
                $data['delivery_no_docs'] = null;
            }
            if ($request->hasfile('delivery_chalan_docs')) {
                $file = $request->file('delivery_chalan_docs');
                $img_ext = $file->getClientOriginalExtension();
                $img_name = time() . rand(111, 99999) . '.' . $img_ext;
                $image_path = 'files/delivery_no_docs/' . $img_name;
                Image::make($file)->resize(982, 500)->save($image_path);
                $data['delivery_chalan_docs'] = $img_name;
            } else {
                $data['delivery_chalan_docs'] = null;
            }
            if ($request->hasfile('invoice_no_docs')) {
                $file = $request->file('invoice_no_docs');
                $img_ext = $file->getClientOriginalExtension();
                $img_name = time() . rand(111, 99999) . '.' . $img_ext;
                $image_path = 'files/delivery_no_docs/' . $img_name;
                Image::make($file)->resize(982, 500)->save($image_path);
                $data['invoice_no_docs'] = $img_name;
            } else {
                $data['invoice_no_docs'] = null;
            }

            MaterialReceiving::create($data);

            return response()->json([
                'status' => 200,
                'message' => 'Data Added Successfully',
            ]);
        }
    }



    public function save_manager_material_receiving(Request $request)
    {
        // return $request->all();
        // return $request->all();

        $validator = Validator::make(
            $request->all(),
            [
                'purchase_order_no_id' => 'required',
                // 'contact_no' => 'required',
                // 'vehicle_no' => 'required',
                // 'carried_by' => 'required',
                // 'carrier_id' => 'required',
                'manufacturer_id' => 'required',
                // 'mrr_expiry_date' => 'required',
            ],
            [
                'purchase_order_no_id.required' => 'required',
                'contact_no.required' => 'required',
                'vehicle_no.required' => 'required',
                'carried_by.required' => 'required',
                'carrier_id.required' => 'required',
                'manufacturer_id.required' => 'required',
                'mrr_expiry_date.required' => 'required',
            ]

        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {

            $data = $request->all();


            Requisition::where('id', $request->purchase_order_no_id)
                ->update(['mrr_is_done' => 'yes', 'mrr_done_by' => Auth::id()]);

            $data['created_by'] = Auth::id();
            $data['requisition_po_id'] = $request->purchase_order_no_id;
            $data['mrr_status'] = 'approved';

            if ($request->hasfile('delivery_no_docs')) {
                $file = $request->file('delivery_no_docs');
                $img_ext = $file->getClientOriginalExtension();
                $img_name = time() . rand(111, 99999) . '.' . $img_ext;
                $image_path = 'files/delivery_no_docs/' . $img_name;
                Image::make($file)->resize(982, 500)->save($image_path);
                $data['delivery_no_docs'] = $img_name;
            } else {
                $data['delivery_no_docs'] = $request->delivery_no_docs;
            }
            if ($request->hasfile('delivery_chalan_docs')) {
                $file = $request->file('delivery_chalan_docs');
                $img_ext = $file->getClientOriginalExtension();
                $img_name = time() . rand(111, 99999) . '.' . $img_ext;
                $image_path = 'files/delivery_no_docs/' . $img_name;
                Image::make($file)->resize(982, 500)->save($image_path);
                $data['delivery_chalan_docs'] = $img_name;
            } else {
                $data['delivery_chalan_docs'] = $request->delivery_chalan_docs;
            }
            if ($request->hasfile('invoice_no_docs')) {
                $file = $request->file('invoice_no_docs');
                $img_ext = $file->getClientOriginalExtension();
                $img_name = time() . rand(111, 99999) . '.' . $img_ext;
                $image_path = 'files/delivery_no_docs/' . $img_name;
                Image::make($file)->resize(982, 500)->save($image_path);
                $data['invoice_no_docs'] = $img_name;
            } else {
                $data['invoice_no_docs'] = $request->invoice_no_docs;
            }

            $new_mrr =   MaterialReceiving::create($data);
            $mail_data = [
                'data' => $request->cart,
                'po_no' => $request->po_no,
                'message' => "Metal receiving report has been created successfully.",
                'mrr_no' => $new_mrr->mrr_no,
            ];
            // try {
            //     Mail::to($request->user_email)->send(new MrrEmail($mail_data));
            //     Mail::to($request->supplier_email)->send(new SupplierPurchaseOrderMail($mail_data));
            // } catch (\Throwable $th) {
            //     return response()->json([
            //         'status' => 200,
            //         'message' => 'Data Added Successfully , Mail not sent',
            //         'data' => $new_mrr
            //     ]);
            // }
            return response()->json([
                'status' => 200,
                'message' => 'Data Added Successfully',
                'data' => $new_mrr
            ]);
        }
    }
    public function edit_mrr($id)
    {
        $mrr_data = DB::table('material_receivings')
            ->where('material_receivings.id', $id)
            ->select('material_receivings.*')
            ->first();

        $data = DB::table('requisitions')
            ->leftJoin('users', 'requisitions.po_creator', 'users.id')
            ->leftJoin('requisition_categories', 'requisitions.requisition_category_id', 'requisition_categories.id')
            ->leftJoin('suppliers', 'requisitions.supplier_id', 'suppliers.id')
            ->leftJoin('purchase_order_delivery_details', 'requisitions.id', 'purchase_order_delivery_details.requisition_po_id')
            ->select('requisitions.*', 'users.name', 'requisition_categories.requisition_category_name', 'suppliers.supplier_name', 'suppliers.commission', 'suppliers.email as supplier_email', 'purchase_order_delivery_details.preferred_delivery_mode_id', 'purchase_order_delivery_details.preferred_payment_mode_id', 'purchase_order_delivery_details.preferred_payment_channel_id', 'purchase_order_delivery_details.delivery_channel_id')
            ->where('requisitions.id', $id)
            ->first();

        $req_details = DB::table('requisition_details')
            ->leftJoin('drugs', 'drugs.id', 'requisition_details.drug_id')
            ->leftJoin('drug_generic_names', 'drug_generic_names.id', 'drugs.generic_id')
            ->leftJoin('brands', 'brands.id', 'drugs.brand_id')
            ->where('requisition_details.requisition_master_id', $id)
            ->select('requisition_details.*', 'drugs.drug_name', 'drugs.drug_code', 'drugs.expiry_date', 'drugs.generic_id', 'drugs.brand_id', 'drugs.drug_price', 'drug_generic_names.generic_name', 'brands.title')
            ->get();



        if ($mrr_data) {

            return response()->json([
                'status' => 200,
                'mrr_data' => $mrr_data,
                'data' => $data,
                'req_details' => $req_details,

            ]);
        } else {

            return response()->json([
                'status' => 403,
                'message' => 'No Data Found.'
            ]);
        }
    }

    public function update_mrr(Request $request, $id)
    {

        // return $request->all();

        $validator = Validator::make(
            $request->all(),
            [
                'purchase_order_no_id' => 'required',
                'contact_no' => 'required',
                'vehicle_no' => 'required',
                'carried_by' => 'required',
                'carrier_id' => 'required',
                'manufacturer_id' => 'required',
                'mrr_expiry_date' => 'required',
            ],
            [
                'purchase_order_no_id.required' => 'required',
                'contact_no.required' => 'required',
                'vehicle_no.required' => 'required',
                'carried_by.required' => 'required',
                'carrier_id.required' => 'required',
                'manufacturer_id.required' => 'required',
                'mrr_expiry_date.required' => 'required',
            ]

        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        } else {
            $data = $request->all();

            $brand = MaterialReceiving::find($id);

            $brand->fill($data)->save();

            return response()->json([
                'status' => 200,
                'mrr_id' => $id,
                'message' => 'MRR updated successfully.'
            ]);
        }
    }

    // public function delete_material_receiving($id)
    // {
    //     $data = MaterialReceiving::where('id',$id)
    //         ->update(['mrr_no' => null, 'po_creator' => null, 'po_create_date' => null,]);

    //     if ($data) {
    //         return response()->json([
    //             'status' => 200,
    //             'message' => 'Data deleted successfully.'
    //         ]);
    //     } else {
    //         return response()->json([
    //             'status' => 403,
    //             'message' => 'Data not found',
    //         ]);
    //     }

    // }


    public function delete_material_receiving($id)
    {

        $data = MaterialReceiving::find($id)->delete();

        if ($data) {
            return response()->json([
                'status' => 200,
                'message' => 'Data deleted successfully.'
            ]);
        } else {
            return response()->json([
                'status' => 403,
                'message' => 'Data not found',
            ]);
        }
    }


    public function proceed_to_mrr($id)
    {

        $data = MaterialReceiving::find($id);

        $data->mrr_status = 'pending';
        $data->updated_by = Auth::id();
        $data->save();

        // $pro_to_req = new ManagerRequisitionNotification();
        // $pro_to_req->requisition_id = $id;
        // $pro_to_req->read_status = "No";
        // $pro_to_req->action_users_role = "sales";
        // $pro_to_req->save();

        $user = User::where('user_type', 'manager')->first();

        $details = [
            'name' => $user->name,
            'messages' => 'Requisition request(Requisition No: ' . $data->requisition_no . ') has been send to you for approval from sales.',
        ];

        // Mail::to($user->email)->send(new SalesRequisitionMail($details));
        Mail::to('developerashiksarker89@gmail.com')->send(new SalesRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Requisition sends to manager.'
        ]);
    }

    public function proceed_to_mrr_copy(Request $request, $id)
    {

        $data = MaterialReceiving::find($id);

        $data->mrr_status = 'pending';
        $data->updated_by = $request->user_id;
        $data->save();

        // $pro_to_req = new ManagerRequisitionNotification();
        // $pro_to_req->requisition_id = $id;
        // $pro_to_req->read_status = "No";
        // $pro_to_req->action_users_role = "sales";
        // $pro_to_req->save();


        // $user = User::where('user_type', 'manager')->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Requisition request(Requisition No: '.$data->requisition_no.') has been send to you for approval from sales.',
        // ];

        // Mail::to('developerashiksarker89@gmail.com')->send(new SalesRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Requisition sends to manager.'
        ]);
    }

    public function manager_material_receiving()
    {

        // return 'hit';

        $data = DB::table('material_receivings')
            ->leftJoin('users', 'users.id', 'material_receivings.updated_by')
            ->where('material_receivings.mrr_status', 'pending')
            ->orWhere('material_receivings.mrr_status', 'approved')
            ->orWhere('material_receivings.mrr_status', 'confirmed')
            ->orWhere(['users.user_type' => 'manager', 'material_receivings.mrr_status' => 'cancelled'])
            ->whereNull('material_receivings.deleted_at')
            ->select('material_receivings.*', 'users.user_type')
            ->orderBy('material_receivings.mrr_status', 'DESC')
            ->orderBy('material_receivings.id', 'DESC')
            ->get();

        return response()->json([
            'status' => 200,
            'data' => $data,
        ]);
    }


    public function mrr_proceed_to_approve($id)
    {
        $data = MaterialReceiving::find($id);
        $data->mrr_status = 'approved';
        $data->save();

        // $pro_to_req = new ManagerRequisitionNotification();
        // $pro_to_req->requisition_id = $id;
        // $pro_to_req->read_status = "No";
        // $pro_to_req->action_users_role = "manager-approved";
        // $pro_to_req->save();

        // $user = User::where('email',$data->requisitor_contact_email)->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Your requisition(Requisition No: '.$data->requisition_no.') has been approved by Requisition Manager. You can generate P.O. now.',
        // ];

        // Mail::to($data->requisitor_contact_email)->send(new ManagerRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'MRR approved by manager.'
        ]);
    }

    public function mrr_proceed_to_approve_copy(Request $request, $id)
    {
        $data = MaterialReceiving::find($id);
        $data->mrr_status = 'approved';
        $data->save();

        // $pro_to_req = new ManagerRequisitionNotification();
        // $pro_to_req->requisition_id = $id;
        // $pro_to_req->read_status = "No";
        // $pro_to_req->action_users_role = "manager-approved";
        // $pro_to_req->save();

        // $user = User::where('email',$data->requisitor_contact_email)->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Your requisition(Requisition No: '.$data->requisition_no.') has been approved by Requisition Manager. You can generate P.O. now.',
        // ];

        // Mail::to($data->requisitor_contact_email)->send(new ManagerRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'MRR approved by manager.'
        ]);
    }


    public function mrr_cancel_by_manager($id)
    {
        // return $id;

        $data = MaterialReceiving::find($id);
        $data->mrr_status = 'cancelled';
        $data->updated_by = Auth::id();
        $data->save();

        // $pro_to_req = new ManagerRequisitionNotification();
        // $pro_to_req->requisition_id = $id;
        // $pro_to_req->read_status = "No";
        // $pro_to_req->action_users_role = "manager-cancelled";
        // $pro_to_req->save();

        // $user = User::where('email',$data->requisitor_contact_email)->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Your requisition(Requisition No: '.$data->requisition_no.') has been cancelled by Requisition Manager.',
        // ];

        // Mail::to($data->requisitor_contact_email)->send(new ManagerRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Requisition cancelled by manager.'
        ]);
    }

    public function mrr_cancel_by_manager_copy(Request $request, $id)
    {
        // return $id;
        $newId = $request->user_id;

        $data = MaterialReceiving::find($id);
        $data->mrr_status = 'cancelled';
        $data->updated_by = $newId;
        $data->save();

        // $pro_to_req = new ManagerRequisitionNotification();
        // $pro_to_req->requisition_id = $id;
        // $pro_to_req->read_status = "No";
        // $pro_to_req->action_users_role = "manager-cancelled";
        // $pro_to_req->save();

        // $user = User::where('email',$data->requisitor_contact_email)->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Your requisition(Requisition No: '.$data->requisition_no.') has been cancelled by Requisition Manager.',
        // ];

        // Mail::to($data->requisitor_contact_email)->send(new ManagerRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Requisition cancelled by manager.'
        ]);
    }




    //------------------------------------------------  Stock In start  -----------------------------------------------------

    public function mrr_dropdown()
    {
        $data = MaterialReceiving::where('mrr_status', 'approved')
            ->where(
                function ($query) {
                    return $query
                        ->whereNull('store_in_is_done');
                    //                                    ->orWhere('requisition_status',  'confirmed');
                }
            )
            ->orderBy('id', 'DESC')
            ->get();

        return response()->json([
            'status' => 200,
            'data' => $data,
        ]);
    }


    public function view_selected_mrr($id)
    {

        // $data = DB::table('material_receivings')
        // ->find( $id);
        // ->first();
        $data = MaterialReceiving::find($id);
        $mrr_details = MaterialReceivingDetails::where('material_receiving_master_id', $id)
            ->leftJoin('drugs', 'drugs.id', 'material_receiving_details.drug_id')
            ->select('material_receiving_details.*', 'drugs.macrohealth_sg', 'drugs.drug_price', 'drugs.manufacturer', 'drugs.drug_code')
            ->get();

        if ($data) {
            return response()->json([
                'status' => 200,
                'data' => $data,
                'mrr_details' => $mrr_details
            ]);
        } else {
            return response()->json([
                'status' => 403,
                'message' => 'No data found.'
            ]);
        }
    }

    public function view_details_mrr($id)
    {

        $data = DB::table('requisitions')
            ->leftJoin('users', 'requisitions.po_creator', 'users.id')
            ->leftJoin('requisition_categories', 'requisitions.requisition_category_id', 'requisition_categories.id')
            ->leftJoin('suppliers', 'requisitions.supplier_id', 'suppliers.id')
            ->leftJoin('purchase_order_delivery_details', 'requisitions.id', 'purchase_order_delivery_details.requisition_po_id')
            ->select('requisitions.*', 'users.name', 'requisition_categories.requisition_category_name', 'suppliers.supplier_name', 'suppliers.commission', 'suppliers.email as supplier_email', 'purchase_order_delivery_details.preferred_delivery_mode_id', 'purchase_order_delivery_details.preferred_payment_mode_id', 'purchase_order_delivery_details.preferred_payment_channel_id', 'purchase_order_delivery_details.delivery_channel_id')
            ->where('requisitions.id', $id)
            ->first();
        $req_details = DB::table('requisition_details')
            ->leftJoin('drugs', 'drugs.id', 'requisition_details.drug_id')
            ->leftJoin('drug_generic_names', 'drug_generic_names.id', 'drugs.generic_id')
            ->leftJoin('brands', 'brands.id', 'drugs.brand_id')
            ->where('requisition_details.requisition_master_id', $id)
            ->select('requisition_details.*', 'drugs.macrohealth_sg', 'drugs.drug_code', 'drugs.expiry_date', 'drugs.generic_id', 'drugs.brand_id', 'drugs.price', 'drugs.class', 'drugs.batch', 'drug_generic_names.generic_name', 'brands.title')
            ->get();


        // $pro_to_req = ManagerRequisitionNotification::where('requisition_id',$id)->first();
        // $pro_to_req->requisition_id = $id;
        // $pro_to_req->read_status = "Yes";
        // $pro_to_req->save();

        if ($data) {
            return response()->json([
                'status' => 200,
                'data' => $data,
                'req_details' => $req_details
            ]);
        } else {
            return response()->json([
                'status' => 403,
                'message' => 'No data found.'
            ]);
        }
    }




    // Get all Store In Info from Store in main table 
    public function store_in_data()
    {
        $data = StoreIn::orderBy('id', 'DESC')->get();
        return response()->json([
            'status' => 200,
            'data' => $data,
        ]);
    }


    // Save Store In Data 
    public function save_store_in(Request $request)
    {
        // return $request->all();

        $validator = Validator::make(
            $request->all(),
            [
                'store_in_record_no' => 'required',
            ],
            [
                'store_in_record_no.required' => 'required',
            ]

        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {

            $data = $request->all();
            // Requisition::where('id',$request->requisition_po_id)
            //     ->update(['store_in_is_done' => 'yes', 'store_in_done_by' => Auth::id()]);

            MaterialReceiving::where('id', $request->mrr_id)
                ->update(['store_in_is_done' => 'yes', 'store_in_done_by' => $request->created_by]);

            // $data['created_by'] = Auth::id();
            $details = StoreIn::create($data);
            return response()->json([
                'status' => 200,
                'message' => 'Data Added Successfully',
                'data' => $details,
            ]);
        }
    }

    // Save Store In Details Data 
    public function save_store_in_details(Request $request)
    {
        // return $request->all();
        $validator = Validator::make(
            $request->all(),
            [
                'self' => 'required',
                'rack' => 'required',
            ],
            [
                'self.required' => 'required',
                'rack.required' => 'required',
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {

            $data = $request->all();
            $selectedDrug = Drug::find($request->drug_id);
            // return [$request->total_qty + $selectedDrug->stock_report];

            Drug::where('id', $request->drug_id)
                ->update(['stock_report' => $request->total_qty + $selectedDrug->stock_report, 'status' => 'Stock']);


            StoreInDetail::create($data);
            return response()->json([
                'status' => 200,
                'message' => 'Data Added Successfully',
            ]);
        }
    }


    public function edit_store_in($id)
    {

        $data = DB::table('store_ins')
            ->where('store_ins.id', $id)
            //    ->get();
            ->first();

        if ($data) {
            return response()->json([
                'status' => 200,
                'data' => $data
            ]);
        } else {
            return response()->json([
                'status' => 403,
                'message' => 'No data found.'
            ]);
        }
    }


    public function edit_store_in_details($id)
    {

        $data = DB::table('store_in_details')
            ->where('store_in_details.store_in_master_id', $id)
            ->get();
        // ->first();

        if ($data) {
            return response()->json([
                'status' => 200,
                'data' => $data
            ]);
        } else {
            return response()->json([
                'status' => 403,
                'message' => 'No data found.'
            ]);
        }
    }


    public function delete_store_in($id)
    {

        $data = StoreIn::find($id)->delete();

        if ($data) {
            return response()->json([
                'status' => 200,
                'message' => 'Data deleted successfully.'
            ]);
        } else {
            return response()->json([
                'status' => 403,
                'message' => 'Data not found',
            ]);
        }
    }



    public function update_store_in_details(Request $request, $id)
    {
        // return $id;

        $data = $request->all();

        $brand = StoreInDetail::find($id);

        $brand->fill($data)->save();

        return response()->json([
            'status' => 200,
            'message' => 'MRR updated successfully.'
        ]);

        // $store_in_details = StoreInDetail::find($id);
        // $store_in_details->rack = $request->rack;
        // $store_in_details->self = $request->self;
        // $store_in_details->save();



        // $data = StoreInDetail::find($id);

        // $data->fill($data)->save();

        // return response()->json([
        //     'status' => 200,
        //     'mrr_id' => $id,
        //     'message' => 'MRR updated successfully.'
        // ]);

    }


    public function proceed_to_store_in($id)
    {

        $data = StoreIn::find($id);

        $data->store_in_status = 'pending';
        $data->updated_by = Auth::id();
        $data->save();

        // $pro_to_req = new ManagerRequisitionNotification();
        // $pro_to_req->requisition_id = $id;
        // $pro_to_req->read_status = "No";
        // $pro_to_req->action_users_role = "sales";
        // $pro_to_req->save();

        // $user = User::where('user_type', 'manager')->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Store In Record No request(Requisition No: '.$data->requisition_no.') has been send to you for approval from sales.',
        // ];

        // Mail::to('developerashiksarker89@gmail.com')->send(new SalesRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Store In Record No sends to manager.'
        ]);
    }


    public function proceed_to_store_in_copy(Request $request, $id)
    {
        // return $newId;

        $data = StoreIn::find($id);
        $data->store_in_status = 'pending';
        $data->updated_by = $request->user_id;
        $data->save();

        // $pro_to_req = new ManagerRequisitionNotification();
        // $pro_to_req->requisition_id = $id;
        // $pro_to_req->read_status = "No";
        // $pro_to_req->action_users_role = "sales";
        // $pro_to_req->save();

        // $user = User::where('user_type', 'manager')->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => '(Store In Record No: '.$data->requisition_no.') has been send to you for approval from sales.',
        // ];

        // Mail::to('developerashiksarker89@gmail.com')->send(new SalesRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Store in record sends to manager.'
        ]);
    }


    public function manager_proceed_to_store_in($id)
    {

        $data = StoreIn::find($id);

        $data->store_in_status = 'approved';
        $data->updated_by = Auth::id();
        $data->save();

        // $pro_to_req = new ManagerRequisitionNotification();
        // $pro_to_req->requisition_id = $id;
        // $pro_to_req->read_status = "No";
        // $pro_to_req->action_users_role = "sales";
        // $pro_to_req->save();

        // $user = User::where('user_type', 'manager')->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Store In Record No request(Requisition No: '.$data->requisition_no.') has been send to you for approval from sales.',
        // ];

        // Mail::to('developerashiksarker89@gmail.com')->send(new SalesRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Store In Record No sends to manager.'
        ]);
    }


    public function manager_proceed_to_store_in_copy(Request $request, $id)
    {
        // return $newId;

        $data = StoreIn::find($id);
        $data->store_in_status = 'approved';
        $data->updated_by = $request->user_id;
        $data->save();

        // $pro_to_req = new ManagerRequisitionNotification();
        // $pro_to_req->requisition_id = $id;
        // $pro_to_req->read_status = "No";
        // $pro_to_req->action_users_role = "sales";
        // $pro_to_req->save();

        // $user = User::where('user_type', 'manager')->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => '(Store In Record No: '.$data->requisition_no.') has been send to you for approval from sales.',
        // ];

        // Mail::to('developerashiksarker89@gmail.com')->send(new SalesRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Store in record sends to manager.'
        ]);
    }



    public function store_in_cancel_by_manager($id)
    {
        // return $id;

        $data = StoreIn::find($id);
        $data->store_in_status = 'cancelled';
        $data->updated_by = Auth::id();
        $data->save();

        // $pro_to_req = new ManagerRequisitionNotification();
        // $pro_to_req->requisition_id = $id;
        // $pro_to_req->read_status = "No";
        // $pro_to_req->action_users_role = "manager-cancelled";
        // $pro_to_req->save();

        // $user = User::where('email',$data->requisitor_contact_email)->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Your requisition(Requisition No: '.$data->requisition_no.') has been cancelled by Requisition Manager.',
        // ];

        // Mail::to($data->requisitor_contact_email)->send(new ManagerRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Requisition cancelled by manager.'
        ]);
    }

    public function store_in_cancel_by_manager_copy(Request $request, $id)
    {
        // return $id;

        $data = StoreIn::find($id);
        $data->store_in_status = 'cancelled';
        $data->updated_by = $request->user_id;
        $data->save();

        // $pro_to_req = new ManagerRequisitionNotification();
        // $pro_to_req->requisition_id = $id;
        // $pro_to_req->read_status = "No";
        // $pro_to_req->action_users_role = "manager-cancelled";
        // $pro_to_req->save();

        // $user = User::where('email',$data->requisitor_contact_email)->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Your requisition(Requisition No: '.$data->requisition_no.') has been cancelled by Requisition Manager.',
        // ];

        // Mail::to($data->requisitor_contact_email)->send(new ManagerRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Requisition cancelled by manager.'
        ]);
    }


    public function save_manager_store_in(Request $request)
    {
        // return $request->all();

        $validator = Validator::make(
            $request->all(),
            [
                'store_in_record_no' => 'required',
            ],
            [
                'store_in_record_no.required' => 'required',
            ]

        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {

            $data = $request->all();

            MaterialReceiving::where('id', $request->mrr_id)
                ->update(['store_in_is_done' => 'yes', 'store_in_done_by' => $request->created_by]);

            $details = StoreIn::create($data);
            return response()->json([
                'status' => 200,
                'message' => 'Data Added Successfully',
                'data' => $details,
            ]);
        }
    }

    // Save Store In Details Data 
    public function save_manager_store_in_details(Request $request)
    {
        // return $request->all();
        $validator = Validator::make(
            $request->all(),
            [
                'self' => 'required',
                'rack' => 'required',
            ],
            [
                'self.required' => 'required',
                'rack.required' => 'required',
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {

            $data = $request->all();
            StoreInDetail::create($data);

            $selectedDrug = Drug::find($request->drug_id);
            Drug::where('id', $request->drug_id)
                ->update(['stock_report' => $selectedDrug->stock_report + $request->total_qty, 'status' => $request->quantity_status, 'expiry_date' => $request->exp_date]);

            return response()->json([
                'status' => 200,
                'message' => 'Data Added Successfully',
            ]);
        }
    }




    //------------------------------------------------  Store In end  ----------------------------------------------------- 




    //------------------------------------------------  Sales Return Start  ---------------------------------------------------


    public function sales_return_dropdown_requisition_po_data()
    {
        $data = Requisition::where('delete_status', '=', null)
            ->where('requisition_no', '!=', null)
            ->where('purchase_order_no', '!=', null)
            ->where(
                function ($query) {
                    return $query
                        // ->orWhere('requisition_status',  'confirmed');
                        ->where('mrr_is_done',  'yes');
                }
            )
            ->orderBy('id', 'DESC')
            ->get();

        return response()->json([
            'status' => 200,
            'data' => $data,
        ]);
    }


    public function view_purchase_order_for_sales_return($id)
    {
        $data = DB::table('requisitions')
            ->leftJoin('users', 'requisitions.po_creator', 'users.id')
            ->leftJoin('requisition_categories', 'requisitions.requisition_category_id', 'requisition_categories.id')
            ->leftJoin('suppliers', 'requisitions.supplier_id', 'suppliers.id')
            ->leftJoin('purchase_order_delivery_details', 'requisitions.id', 'purchase_order_delivery_details.requisition_po_id')
            ->select('requisitions.*', 'users.name', 'requisition_categories.requisition_category_name', 'suppliers.supplier_name', 'suppliers.commission', 'suppliers.email as supplier_email', 'purchase_order_delivery_details.preferred_delivery_mode_id', 'purchase_order_delivery_details.preferred_payment_mode_id', 'purchase_order_delivery_details.preferred_payment_channel_id', 'purchase_order_delivery_details.delivery_channel_id')
            ->where('requisitions.id', $id)
            ->first();

        $req_details = DB::table('requisition_details')
            ->leftJoin('drugs', 'drugs.id', 'requisition_details.drug_id')
            ->leftJoin('drug_generic_names', 'drug_generic_names.id', 'drugs.generic_id')
            ->leftJoin('brands', 'brands.id', 'drugs.brand_id')
            ->where('requisition_details.requisition_master_id', $id)
            ->select('requisition_details.*', 'drugs.macrohealth_sg', 'drugs.drug_code', 'drugs.expiry_date', 'drugs.generic_id', 'drugs.brand_id', 'drugs.price', 'drugs.class', 'drugs.batch', 'drug_generic_names.generic_name', 'brands.title')
            ->get();

        $mrr = DB::table('material_receivings')
            ->where('material_receivings.requisition_po_id', $id)
            ->select('material_receivings.*')
            ->first();


        $pro_to_req = ManagerRequisitionNotification::where('requisition_id', $id)->first();
        $pro_to_req->requisition_id = $id;
        $pro_to_req->read_status = "Yes";
        $pro_to_req->save();

        if ($data) {
            return response()->json([
                'status' => 200,
                'data' => $data,
                'req_details' => $req_details,
                'mrr' => $mrr
            ]);
        } else {
            return response()->json([
                'status' => 403,
                'message' => 'No data found.'
            ]);
        }
    }


    // Save sales return In Data 
    public function save_sales_return(Request $request)
    {
        // return $request->all();

        $validator = Validator::make(
            $request->all(),
            [
                'requisition_po_id' => 'required',
                'return_date' => 'required',
                'return_by' => 'required',
                'reasons_of_return' => 'required',
                'product_details_note' => 'required',
                'total_amount' => 'required',
            ],
            [
                'requisition_po_id.required' => 'required',
                'return_date.required' => 'required',
                'return_by.required' => 'required',
                'reasons_of_return.required' => 'required',
                'product_details_note.required' => 'required',
                'total_amount.required' => 'required',
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {

            $data = $request->all();

            $details = SalesReturn::create($data);
            return response()->json([
                'status' => 200,
                'message' => 'Data Added Successfully',
                'data' => $details,
            ]);
        }
    }

    // Save Store In Details Data 
    public function save_sales_return_details(Request $request)
    {

        $data = $request->all();

        SalesReturnDetails::create($data);
        return response()->json([
            'status' => 200,
            'message' => 'Data Added Successfully',
        ]);
    }

    public function save_manager_sales_return_details(Request $request)
    {

        $data = $request->all();

        $selectedDrug = Drug::find($request->drug_id);
        Drug::where('id', $request->drug_id)
            ->update(['stock_report' => $selectedDrug->stock_report - $request->pcs, 'status' => $request->quantity_status]);

        SalesReturnDetails::create($data);
        return response()->json([
            'status' => 200,
            'message' => 'Data Added Successfully',
        ]);
    }


    // Get all Sales return data list 
    public function sales_return_data()
    {
        $data = SalesReturn::orderBy('id', 'DESC')->get();
        return response()->json([
            'status' => 200,
            'data' => $data,
        ]);
    }
    public function sales_return_reports(Request $request)
    {
        $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
        $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();

        $data = SalesReturnDetails::with('sales_return_master','drug')
        ->whereBetween('created_at', [$startDate, $endDate])
        ->get();
        return response()->json([
            'status' => 200,
            'data' => $data,
        ]);
    }


    public function edit_sales_return($id)
    {

        $data = DB::table('sales_returns')
            ->where('sales_returns.id', $id)
            ->first();

        $sales_return_details = DB::table('sales_return_details')
            ->leftJoin('drugs', 'drugs.id', 'sales_return_details.drug_id')
            ->leftJoin('drug_generic_names', 'drug_generic_names.id', 'drugs.generic_id')
            ->leftJoin('brands', 'brands.id', 'drugs.brand_id')
            ->where('sales_return_details.sales_return_master_id', $id)
            ->select('sales_return_details.*', 'drugs.drug_name', 'drugs.drug_code', 'drugs.expiry_date', 'drugs.generic_id', 'drugs.brand_id', 'drugs.drug_price', 'drugs.class', 'drugs.batch', 'drugs.boxType', 'drugs.pktSize', 'drugs.unit', 'drug_generic_names.generic_name', 'brands.title')
            ->get();

        if ($data) {
            return response()->json([
                'status' => 200,
                'data' => $data,
                'sales_return_details' => $sales_return_details
            ]);
        } else {
            return response()->json([
                'status' => 403,
                'message' => 'No data found.'
            ]);
        }
    }



    public function update_sales_return(Request $request, $id)
    {

        $sales_return = SalesReturn::find($id);

        $sales_return->return_date = $request->return_date;
        $sales_return->return_by = $request->return_by;
        $sales_return->reasons_of_return = $request->reasons_of_return;
        $sales_return->product_details_note = $request->product_details_note;
        $sales_return->total_amount = $request->total_amount;
        $sales_return->save();

        return response()->json([
            'status' => 200,
            'message' => 'Sales return updated successfully.'
        ]);
    }


    public function update_sales_return_details(Request $request, $id)
    {
        $sales_return_details = SalesReturnDetails::find($id);

        $sales_return_details->noOfBox = $request->noOfBox;
        $sales_return_details->pcs = $request->pcs;
        $sales_return_details->totalPrice = $request->totalPrice;
        $sales_return_details->save();

        return response()->json([
            'status' => 200,
            'message' => 'Sales return details updated successfully.'
        ]);
    }


    public function proceed_to_approval_sales_return($id)
    {

        $data = SalesReturn::find($id);

        $data->sales_return_status = 'pending';
        $data->updated_by = Auth::id();
        $data->save();

        // $pro_to_req = new ManagerRequisitionNotification();
        // $pro_to_req->requisition_id = $id;
        // $pro_to_req->read_status = "No";
        // $pro_to_req->action_users_role = "sales";
        // $pro_to_req->save();

        // $user = User::where('user_type', 'manager')->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Requisition request(Requisition No: '.$data->requisition_no.') has been send to you for approval from sales.',
        // ];

        // Mail::to('developerashiksarker89@gmail.com')->send(new SalesRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Requisition sends to manager.'
        ]);
    }

    public function proceed_to_approval_sales_return_copy(Request $request, $id)
    {

        $data = SalesReturn::find($id);

        $data->sales_return_status = 'pending';
        $data->updated_by = $request->user_id;
        $data->save();

        // $pro_to_req = new ManagerRequisitionNotification();
        // $pro_to_req->requisition_id = $id;
        // $pro_to_req->read_status = "No";
        // $pro_to_req->action_users_role = "sales";
        // $pro_to_req->save();

        // $user = User::where('user_type', 'manager')->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Requisition request(Requisition No: '.$data->requisition_no.') has been send to you for approval from sales.',
        // ];

        // Mail::to('developerashiksarker89@gmail.com')->send(new SalesRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Requisition sends to manager.'
        ]);
    }


    public function delete_sales_return($id)
    {

        $data = SalesReturn::find($id)->delete();

        if ($data) {
            return response()->json([
                'status' => 200,
                'message' => 'Data deleted successfully.'
            ]);
        } else {
            return response()->json([
                'status' => 403,
                'message' => 'Data not found',
            ]);
        }
    }


    public function manager_sales_return_approve($id)
    {
        $data = SalesReturn::find($id);
        $data->sales_return_status = 'approved';
        $data->updated_by = Auth::id();

        $sales_return_details = DB::table('sales_return_details')
            ->where('sales_return_details.sales_return_master_id', $id)
            ->select('sales_return_details.*')
            ->get();

        foreach ($sales_return_details as $i) {

            $select = $i->drug_id;
            $selectedDrug = Drug::find($select);
            Drug::where('id', $select)
                ->update(['stock_report' => $selectedDrug->stock_report - $i->pcs]);
        };

        $data->save();



        // $pro_to_req = new ManagerRequisitionNotification();
        // $pro_to_req->requisition_id = $id;
        // $pro_to_req->read_status = "No";
        // $pro_to_req->action_users_role = "manager-approved";
        // $pro_to_req->save();

        // $user = User::where('email',$data->requisitor_contact_email)->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Your requisition(Requisition No: '.$data->requisition_no.') has been approved by Requisition Manager. You can generate P.O. now.',
        // ];

        // Mail::to($data->requisitor_contact_email)->send(new ManagerRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'MRR approved by manager.'
        ]);
    }

    public function manager_sales_return_approve_copy(Request $request, $id)
    {
        $data = SalesReturn::find($id);
        $data->sales_return_status = 'approved';
        $data->updated_by = $request->user_id;

        $sales_return_details = DB::table('sales_return_details')
            ->where('sales_return_details.sales_return_master_id', $id)
            ->select('sales_return_details.*')
            ->get();

        foreach ($sales_return_details as $i) {

            $select = $i->drug_id;
            $selectedDrug = Drug::find($select);
            Drug::where('id', $select)
                ->update(['stock_report' => $selectedDrug->stock_report - $i->pcs]);
        };

        $data->save();

        // $pro_to_req = new ManagerRequisitionNotification();
        // $pro_to_req->requisition_id = $id;
        // $pro_to_req->read_status = "No";
        // $pro_to_req->action_users_role = "manager-approved";
        // $pro_to_req->save();

        // $user = User::where('email',$data->requisitor_contact_email)->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Your requisition(Requisition No: '.$data->requisition_no.') has been approved by Requisition Manager. You can generate P.O. now.',
        // ];

        // Mail::to($data->requisitor_contact_email)->send(new ManagerRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'MRR approved by manager.'
        ]);
    }



    public function sales_return_cancel_by_manager($id)
    {
        // return $id;

        $data = SalesReturn::find($id);
        $data->sales_return_status = 'cancelled';
        $data->updated_by = Auth::id();
        $data->save();

        // $pro_to_req = new ManagerRequisitionNotification();
        // $pro_to_req->requisition_id = $id;
        // $pro_to_req->read_status = "No";
        // $pro_to_req->action_users_role = "manager-cancelled";
        // $pro_to_req->save();

        // $user = User::where('email',$data->requisitor_contact_email)->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Your requisition(Requisition No: '.$data->requisition_no.') has been cancelled by Requisition Manager.',
        // ];

        // Mail::to($data->requisitor_contact_email)->send(new ManagerRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Requisition cancelled by manager.'
        ]);
    }

    public function sales_return_cancel_by_manager_copy(request $request, $id)
    {
        // return $id;

        $data = SalesReturn::find($id);
        $data->sales_return_status = 'cancelled';
        $data->updated_by = $request->user_id;
        $data->save();

        // $pro_to_req = new ManagerRequisitionNotification();
        // $pro_to_req->requisition_id = $id;
        // $pro_to_req->read_status = "No";
        // $pro_to_req->action_users_role = "manager-cancelled";
        // $pro_to_req->save();

        // $user = User::where('email',$data->requisitor_contact_email)->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Your requisition(Requisition No: '.$data->requisition_no.') has been cancelled by Requisition Manager.',
        // ];

        // Mail::to($data->requisitor_contact_email)->send(new ManagerRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Requisition cancelled by manager.'
        ]);
    }


    //------------------------------------------------  Sales Return End  ----------------------------------------------------- 

    //------------------------------------------------  Adjustment End  ----------------------------------------------------- 

    // Getting all adjustment list 
    public function adjustment()
    {
        $data = Adjustment::orderBy('id', 'DESC')->get();

        return response()->json([
            'status' => 200,
            'data' => $data,
        ]);
    }


    // Save adjustment Data 
    public function save_adjustment(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'remark' => 'required',
                'notes' => 'required',
            ],
            [
                'remark.required' => 'required',
                'notes.required' => 'required',
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {

            $data = $request->all();
            $details = Adjustment::create($data);
            return response()->json([
                'status' => 200,
                'message' => 'Data Added Successfully',
                'data' => $details,
            ]);
        }
    }


    // Save Adjustment Details Details Data 
    public function save_adjustment_details(Request $request)
    {
        // return $request->all();

        $data = $request->all();
        AdjustmentDetails::create($data);

        return response()->json([
            'status' => 200,
            'message' => 'Data Added Successfully',
        ]);
    }


    public function edit_adjustment($id)
    {
        $data = DB::table('adjustments')
            ->where('adjustments.id', $id)
            ->first();
        $adjustment_details = AdjustmentDetails::with('drug')
            ->where('adjustment_details.adjustment_master_id', $id)
            // ->select('adjustment_details.*', 'drugs.macrohealth_sg', 'drugs.drug_code', 'drugs.expiry_date', 'drugs.generic_id', 'drugs.brand_id', 'drugs.price', 'drugs.class', 'drugs.batch', 'drugs.boxType', 'drugs.pktSize', 'drug_generic_names.generic_name', 'brands.title')
            ->get();

        if ($data) {
            return response()->json([
                'status' => 200,
                'data' => $data,
                'adjustment_details' => $adjustment_details
            ]);
        } else {
            return response()->json([
                'status' => 403,
                'message' => 'No data found.'
            ]);
        }
    }


    // Update adjustment 
    public function update_adjustment(Request $request, $id)
    {
        //        return $request->all();
        $validator = Validator::make($request->all(), [
            'adjustment_no' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        } else {
            $data = $request->all();

            $brand = Adjustment::find($id);
            $brand->fill($data)->save();

            return response()->json([
                'status' => 200,
                'requisition_id' => $id,
                'message' => 'Data updated successfully.'
            ]);
        }
    }


    public function update_adjustment_details(Request $request, $id)
    {

        $adjustment_details = AdjustmentDetails::find($id);

        $adjustment_details->noOfBox = $request->noOfBox;
        $adjustment_details->pcs = $request->pcs;
        $adjustment_details->totalPrice = $request->totalPrice;

        $adjustment_details->increase = $request->increase;
        $adjustment_details->decrease = $request->decrease;
        $adjustment_details->reason = $request->reason;

        $adjustment_details->updated_by = $request->updated_by;

        $adjustment_details->save();
    }


    public function proceed_to_adjustment($id)
    {

        $data = Adjustment::find($id);

        $data->adjustment_status = 'pending';
        $data->updated_by = Auth::id();
        $data->save();

        // $pro_to_req = new ManagerRequisitionNotification();
        // $pro_to_req->requisition_id = $id;
        // $pro_to_req->read_status = "No";
        // $pro_to_req->action_users_role = "sales";
        // $pro_to_req->save();

        // $user = User::where('user_type', 'manager')->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Requisition request(Requisition No: '.$data->requisition_no.') has been send to you for approval from sales.',
        // ];

        // Mail::to('developerashiksarker89@gmail.com')->send(new SalesRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Requisition sends to manager.'
        ]);
    }

    public function proceed_to_adjustment_copy(Request $request, $id)
    {

        $data = Adjustment::find($id);

        $data->adjustment_status = 'pending';
        $data->updated_by = $request->user_id;
        $data->save();

        // $pro_to_req = new ManagerRequisitionNotification();
        // $pro_to_req->requisition_id = $id;
        // $pro_to_req->read_status = "No";
        // $pro_to_req->action_users_role = "sales";
        // $pro_to_req->save();

        // $user = User::where('user_type', 'manager')->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Requisition request(Requisition No: '.$data->requisition_no.') has been send to you for approval from sales.',
        // ];

        // Mail::to('developerashiksarker89@gmail.com')->send(new SalesRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Requisition sends to manager.'
        ]);
    }

    public function delete_adjustment($id)
    {
        $data = Adjustment::find($id)->delete();

        if ($data) {
            return response()->json([
                'status' => 200,
                'message' => 'Data deleted successfully.'
            ]);
        } else {
            return response()->json([
                'status' => 403,
                'message' => 'Data not found',
            ]);
        }
    }


    public function manager_approved_adjustment($id)
    {

        $data = Adjustment::find($id);

        $data->adjustment_status = 'approved';
        $data->updated_by = Auth::id();

        $adjustment_det = DB::table('adjustment_details')
            ->where('adjustment_details.adjustment_master_id', $id)
            ->select('adjustment_details.*')
            ->get();

        foreach ($adjustment_det as $i) {

            $select = $i->drug_id;
            $selectedDrug = Drug::find($select);
            Drug::where('id', $select)
                ->update(['stock_report' => $selectedDrug->stock_report + $i->increase - $i->decrease]);
        };

        $data->save();

        // $pro_to_req = new ManagerRequisitionNotification();
        // $pro_to_req->requisition_id = $id;
        // $pro_to_req->read_status = "No";
        // $pro_to_req->action_users_role = "sales";
        // $pro_to_req->save();

        // $user = User::where('user_type', 'manager')->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Requisition request(Requisition No: '.$data->requisition_no.') has been send to you for approval from sales.',
        // ];

        // Mail::to('developerashiksarker89@gmail.com')->send(new SalesRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Requisition sends to manager.'
        ]);
    }

    public function manager_approved_adjustment_copy(Request $request, $id)
    {

        $data = Adjustment::find($id);

        $data->adjustment_status = 'approved';
        $data->updated_by = $request->user_id;

        $adjustment_det = DB::table('adjustment_details')
            ->where('adjustment_details.adjustment_master_id', $id)
            ->select('adjustment_details.*')
            ->get();

        foreach ($adjustment_det as $i) {

            $select = $i->drug_id;
            $selectedDrug = Drug::find($select);
            Drug::where('id', $select)
                ->update(['stock_report' => $selectedDrug->stock_report + $i->increase - $i->decrease]);
        };

        $data->save();

        // $pro_to_req = new ManagerRequisitionNotification();
        // $pro_to_req->requisition_id = $id;
        // $pro_to_req->read_status = "No";
        // $pro_to_req->action_users_role = "sales";
        // $pro_to_req->save();

        // $user = User::where('user_type', 'manager')->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Requisition request(Requisition No: '.$data->requisition_no.') has been send to you for approval from sales.',
        // ];

        // Mail::to('developerashiksarker89@gmail.com')->send(new SalesRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Requisition sends to manager.'
        ]);
    }



    public function cancel_adjustment($id)
    {
        // return $id;

        $data = Adjustment::find($id);
        $data->adjustment_status = 'cancelled';
        $data->updated_by = Auth::id();
        $data->save();

        // $pro_to_req = new ManagerRequisitionNotification();
        // $pro_to_req->requisition_id = $id;
        // $pro_to_req->read_status = "No";
        // $pro_to_req->action_users_role = "manager-cancelled";
        // $pro_to_req->save();

        // $user = User::where('email',$data->requisitor_contact_email)->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Your requisition(Requisition No: '.$data->requisition_no.') has been cancelled by Requisition Manager.',
        // ];

        // Mail::to($data->requisitor_contact_email)->send(new ManagerRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Requisition cancelled by manager.'
        ]);
    }

    public function cancel_adjustment_copy(Request $request, $id)
    {
        // return $id;

        $data = Adjustment::find($id);
        $data->adjustment_status = 'cancelled';
        $data->updated_by = $request->user_id;
        $data->save();

        // $pro_to_req = new ManagerRequisitionNotification();
        // $pro_to_req->requisition_id = $id;
        // $pro_to_req->read_status = "No";
        // $pro_to_req->action_users_role = "manager-cancelled";
        // $pro_to_req->save();

        // $user = User::where('email',$data->requisitor_contact_email)->first();

        // $details = [
        //     'name' => $user->name,
        //     'messages' => 'Your requisition(Requisition No: '.$data->requisition_no.') has been cancelled by Requisition Manager.',
        // ];

        // Mail::to($data->requisitor_contact_email)->send(new ManagerRequisitionMail($details));

        return response()->json([
            'status' => 200,
            'message' => 'Requisition cancelled by manager.'
        ]);
    }


    //------------------------------------------------  Adjustment End  ----------------------------------------------------- 




    //------------------------------------------------  Adjustment End  ----------------------------------------------------- 



    public function current_stock()
    {

        $current_stock = Drug::with('store_in', 'sales_return', 'adjustment', 'stockOut')

            ->get();

        return response()->json([
            'status' => 200,
            'current_stock' => $current_stock
        ]);
    }
    public function current_stock_sales()
    {

        $current_stock = Drug::get();

        return response()->json([
            'status' => 200,
            'current_stock' => $current_stock
        ]);
    }




    //------------------------------------------------  Adjustment End  ----------------------------------------------------- 




}
