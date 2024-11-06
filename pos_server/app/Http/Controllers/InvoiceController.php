<?php

namespace App\Http\Controllers;

use App\Models\Drug;
use App\Models\Invoice;
use App\Models\invoice_details;
use App\Models\ProductReturnInvoice;
use App\Models\Stock;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

use function PHPUnit\Framework\isNull;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = DB::table('invoices')
            ->leftJoin('memberships', 'invoices.member_id', 'memberships.id')
            ->select('invoices.*', 'memberships.member_name', 'memberships.member_email', 'memberships.member_phone')
            ->orderBy('id', 'desc')
            ->get();
        return response()->json([
            'status' => 200,
            'data' => $data,
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $maxInvoiceNo = Invoice::max('invoice_no');
        if ($maxInvoiceNo) {
            $maxInvoiceNoNumber = intval(str_replace('INV-', '', $maxInvoiceNo));
            $newInvoiceNoNumber = $maxInvoiceNoNumber + 1;
        } else {
            $newInvoiceNoNumber = 10001;
        }
        $newInvoiceNo = 'INV-' . str_pad($newInvoiceNoNumber, 5, '0', STR_PAD_LEFT);
        $invoiceType = $request->host() == 'localhost' ? 'offline' : 'online';
        if ($files = $request->file('prescription_image')) {
            $names = $files->getClientOriginalName();
            $name = rand(111, 99999) . $names;
            $files->move('images/files/', $name);
        } else {
            $name = $request->prescription_image;
        }
        $invoice = new Invoice();
        $invoice->invoice_no = $newInvoiceNo;
        $invoice->member_id = $request->member_id;

        $invoice->sub_total = $request->sub_total;
        $invoice->vat_tax_amount = $request->vat_tax_amount;
        $invoice->payment_status = $request->payment_status;
        $invoice->delete_status = $request->delete_status;

        $invoice->grand_total = $request->grand_total;
        $invoice->discount_type = $request->discount_type;
        $invoice->discount_amount = $request->discount_amount;
        $invoice->due_amount = $request->due_amount;

        $invoice->special_discount = $request->special_discount;
        $invoice->paid_amount = $request->paid_amount;
        $invoice->return_amount = $request->return_amount;
        $invoice->invoice_from = $request->invoice_from;
        $invoice->created_by = $request->created_by;
        $invoice->invoice_type = $invoiceType;
        $invoice->ref_invoice = null;
        $invoice->prescription_image = $name;
        $invoice->save();

        // invoice details
        $arrData = json_decode($request->cart);

        if (count($arrData) > 0) {

            foreach ($arrData as $key => $value) {

                $invoice_details = new invoice_details();
                $invoice_details->invoice_master_id = $invoice->id;
                $invoice_details->drug_id = $value->drug_id;
                $invoice_details->no_of_box_or_leaf = $value->noOfBox;
                $invoice_details->qty = $value->pcs;
                $invoice_details->total_price = $value->totalPrice;
                $invoice_details->toal_price_witout_discount = $value->totalPrice;
                $invoice_details->payment_status = $invoice->payment_status;
                $invoice_details->delete_status = $request->delete_status;
                $invoice_details->cash_drug_discount = null;
                $invoice_details->card_drug_discount = null;
                $invoice_details->digital_drug_discount = null;
                $invoice_details->save();
            }
        }


        return response()->json([
            'status' => 200,
            'invoice' => $invoice,
            'message' => 'Data Added Successfully.',
        ]);
    }

    public function save_invoice_details(Request $request)
    {
        // return $request->all();
        $arrData = json_decode($request->cart);

        if (count($arrData) > 0) {

            foreach ($arrData as $key => $value) {

                $invoice_details = new invoice_details();
                $invoice_details->invoice_master_id = $value->invoice_master_id;
                $invoice_details->drug_id = $value->drug_id;
                $invoice_details->no_of_box_or_leaf = $value->no_of_box_or_leaf;
                $invoice_details->qty = $value->qty;
                $invoice_details->total_price = $value->total_price;
                $invoice_details->toal_price_witout_discount = $value->toal_price_witout_discount;
                $invoice_details->payment_status = $value->payment_status;

                $invoice_details->cash_drug_discount = null;
                $invoice_details->card_drug_discount = null;
                $invoice_details->digital_drug_discount = null;

                $invoice_details->save();
            }

            return response()->json([
                'message' => 'Data Inserted Successfully'

            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function show(Invoice $invoice)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function edit(Invoice $invoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */


    public function update(Request $request, $id)
    {

        $data = $request->all();

        // $data['payment_mode_id'] == null ? '' : $request->payment_mode_id;
        // $data['requisition_category_id'] == null ? '' : $request->requisition_category_id;
        // $data['requisition_frequency_id'] == null ? '' : $request->requisition_frequency_id;
        // $data['supplier_id'] == null ? '' : $request->supplier_id;
        // $data['test_sample'] == null ? '' : $request->test_sample;

        $invoice = Invoice::find($id);
        $invoice->fill($data)->save();

        // Requisition::update($data);

        $arrData = json_decode($request->cart);

        if (count($arrData) > 0) {

            foreach ($arrData as $key => $value) {

                $invoice_details = invoice_details::find($value->id);
                $invoice_details->invoice_master_id = $invoice->id;
                $invoice_details->drug_id = $value->drug_id;
                $invoice_details->no_of_box_or_leaf = $value->noOfBox;
                $invoice_details->qty = $value->pcs;
                $invoice_details->total_price = $value->totalPrice;
                $invoice_details->toal_price_witout_discount = $value->totalPrice;
                $invoice_details->payment_status = $invoice->payment_status;
                $invoice_details->delete_status = $request->delete_status;
                $invoice_details->cash_drug_discount = null;
                $invoice_details->card_drug_discount = null;
                $invoice_details->digital_drug_discount = null;
                $invoice_details->save();
            }
        }

        return response()->json([
            'status' => 200,
            'invoice_id' => $id,
            'message' => 'Data updated successfully.',
            'invoice' => $data,
        ]);
    }


    public function update_invoice_details(Request $request, $id)
    {

        $invoice_details = invoice_details::find($id);

        $invoice_details->invoice_master_id = $request->invoice_master_id;
        $invoice_details->drug_id = $request->drug_id;
        $invoice_details->no_of_box_or_leaf = $request->no_of_box_or_leaf;
        $invoice_details->qty = $request->qty;
        $invoice_details->total_price = $request->total_price;
        $invoice_details->toal_price_witout_discount = $request->toal_price_witout_discount;
        $invoice_details->payment_status = $request->payment_status;

        $invoice_details->cash_drug_discount = $request->cash_drug_discount;
        $invoice_details->card_drug_discount = $request->card_drug_discount;
        $invoice_details->digital_drug_discount = $request->digital_drug_discount;

        $selectedDrug = Drug::find($request->drug_id);
        Drug::where('id', $selectedDrug->id)
            ->update(['stock_report' => $selectedDrug->stock_report - $request->qty]);

        $invoice_details->save();
    }


    public function new_invoice_details(Request $request)
    {
        $invoice_details = new invoice_details();

        $invoice_details->invoice_master_id = $request->invoice_master_id;
        $invoice_details->drug_id = $request->drug_id;
        $invoice_details->no_of_box_or_leaf = $request->no_of_box_or_leaf;
        $invoice_details->qty = $request->qty;
        $invoice_details->total_price = $request->total_price;
        $invoice_details->toal_price_witout_discount = $request->toal_price_witout_discount;
        $invoice_details->payment_status = $request->payment_status;

        $invoice_details->cash_drug_discount = $request->cash_drug_discount;
        $invoice_details->card_drug_discount = $request->card_drug_discount;
        $invoice_details->digital_drug_discount = $request->digital_drug_discount;

        $selectedDrug = Drug::find($request->drug_id);
        Drug::where('id', $selectedDrug->id)
            ->update(['stock_report' => $selectedDrug->stock_report - $request->qty]);

        $invoice_details->save();
    }

    // salse return invoice
    public function salse_Return(Request $request, $id)
    {

        $invoice_details = invoice_details::find($id);

        $selectedDrug = Drug::find($request->drug_id);
        Drug::where('id', $selectedDrug->id)
            ->update(['stock_report' => $selectedDrug->stock_report + $request->qty]);

        $invoice_details->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Data deleted successfully.',
            'data' => $invoice_details
        ]);
    }
    public function delete_invoice($id)
    {

        $invoice = invoice::find($id);
        $invoice->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Data deleted successfully.',
            'data' => $invoice
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function pay(Request $request, $id)
    {
        $invoice = Invoice::find($id);
        $invoice->payment_status = $request->payment_status;
        $invoice->discount_type = $request->discount_type;
        $invoice->due_amount = $request->due_amount;
        $invoice->paid_amount = $request->paid_amount;
        $invoice->save();
        $invoice_details = invoice_details::where('invoice_master_id', $id)
            ->whereIn('payment_status', ['Unpaid', 'Partially Paid'])
            ->get();
        if (count($invoice_details) > 0) {

            foreach ($invoice_details as $key => $value) {

                $check_drug_id = Stock::where('drug_id', $value->drug_id)->first();

                if (!is_null($check_drug_id)) {
                    $check_drug_id->stock = $check_drug_id->stock - $value->qty;
                    $check_drug_id->save();
                }
            }
            foreach ($invoice_details as $key => $value) {
                $value->payment_status = $request->payment_status;
                $value->save();
            }
            return response()->json([
                'message' => 'Data updated Successfully'

            ]);
        } else {
            return response()->json([
                'message' => 'No data found.'
            ]);
        }
    }


    public function all_invoices()
    {
        $data = Invoice::with('member')->orderBy('id', 'DESC')->get();
        return response()->json([
            'status' => 200,
            'data' => $data,
        ]);
    }
    public function all_invoices_details()
    {
        $data = Invoice::with('details', 'member')->orderBy('id', 'DESC')->get();
        return response()->json([
            'status' => 200,
            'data' => $data,
        ]);
    }


    public function view_selected_invoice($id)
    {
        $data = DB::table('invoices')
            ->leftJoin('memberships', 'invoices.member_id', 'memberships.id')
            ->select('invoices.*', 'memberships.member_name', 'memberships.member_email', 'memberships.member_phone')
            ->where('invoices.id', $id)
            ->first();
        $invoice_details = DB::table('invoice_details')
            ->leftJoin('stocks', 'stocks.drug_id', 'invoice_details.drug_id')
            ->leftJoin('drugs', 'drugs.id', 'invoice_details.drug_id')
            ->where('invoice_details.invoice_master_id', $id)
            ->select('invoice_details.*', 'invoice_details.toal_price_witout_discount as toalPriceWitoutDiscount', 'invoice_details.no_of_box_or_leaf as noOfBox', 'invoice_details.qty as pcs', 'invoice_details.total_price as totalPrice', 'stocks.name',  'stocks.expire_date',  'drugs.price', 'drugs.boxType', 'drugs.pktSize')
            ->get();


        if ($data) {
            return response()->json([
                'status' => 200,
                'data' => $data,
                'invoice_details' => $invoice_details
            ]);
        } else {
            return response()->json([
                'status' => 403,
                'message' => 'No data found.'
            ]);
        }
    }

    public function serch_invoice_by_date(Request $request)
    {
        $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
        $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();

        $data = Invoice::with('member')->whereBetween('created_at', [$startDate, $endDate])->orderBy('id', 'desc')->get();
        return response()->json([
            "status" => 200,
            "message" => "All Invoice",
            "data" => $data
        ]);
    }
    public function search_invoice_by_date(Request $request)
    {
        $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
        $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();
        // $startDate =  $request->startDate;
        // $endDate =  $request->endDate;
        if ($request->member_id) {
            $data = Invoice::with('member', 'details')
                ->whereBetween('updated_at', [$startDate, $endDate])
                ->where('member_id', $request->member_id)
                ->orderBy('id', 'desc')
                ->get();
            $return = ProductReturnInvoice::with('member')->where('member_id', $request->member_id)->get();

            return response()->json([
                "status" => 200,
                "message" => "All Invoice",
                "data" => $data,
                "return" => $return
            ]);
        }
        $data = Invoice::with('details', 'member')
            ->whereBetween('updated_at', [$startDate, $endDate])
            ->orderBy('id', 'desc')
            ->get();
        return response()->json([
            "status" => 200,
            "message" => "All Invoice",
            "data" => $data
        ]);
    }

    public function test_group_by(Request $request)
    {
        $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
        $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();

        $data = invoice_details::selectRaw('drug_id, SUM(qty) as total_sales')
            ->with('drug', 'invoice')
            ->withSum('return_data', 'qty')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('drug_id')
            ->orderBy('id', 'desc')
            ->get();
        return response()->json([
            "status" => 200,
            "message" => "All Invoice",
            "data" => $data
        ]);
    }

    public function searchByMember(Request $request)
    {
        if (empty($request->startDate) && empty($request->endDate) && !empty($request->member_id)) {
            $data = Invoice::with('member', 'details')->where('member_id', $request->member_id)->orderBy('id', 'desc')->get();
            return response()->json([
                "status" => 200,
                "message" => "Member data",
                "data" => $data
            ]);
        } else if (!empty($request->startDate) && !empty($request->endDate) && !empty($request->member_id)) {
            $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
            $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();
            $data = Invoice::with('member', 'details')->whereBetween('created_at', [$startDate, $endDate])
                ->where('member_id', $request->member_id)
                ->orderBy('id', 'desc')->get();
            return response()->json([
                "status" => 200,
                "message" => "All Invoice",
                "data" => $data
            ]);
        } else {
            return response()->json([
                "status" => 500,
                "message" => "No data found.",
                "data" => []
            ]);
        }
    }

    public function searchByMedicineId(Request $request)
    {
        if (empty($request->startDate) && empty($request->endDate) && !empty($request->medicine_id)) {
            $data = invoice_details::with('drug', 'invoice')->where('drug_id', $request->medicine_id)->orderBy('id', 'desc')->get();
            return response()->json([
                "status" => 200,
                "message" => "medicine data",
                "data" => $data
            ]);
        } else if (!empty($request->startDate) && !empty($request->endDate) && !empty($request->medicine_id)) {
            $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
            $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();
            $data = invoice_details::with('drug', 'invoice')->whereBetween('created_at', [$startDate, $endDate])
                ->where('drug_id', $request->medicine_id)
                ->orderBy('id', 'desc')->get();
            return response()->json([
                "status" => 200,
                "message" => "All Invoice",
                "data" => $data
            ]);
        } else {
            return response()->json([
                "status" => 500,
                "message" => "No data found.",
                "data" => []
            ]);
        }
    }
    public function searchByCompanyId(Request $request)
    {
        if (empty($request->startDate) && empty($request->endDate) && !empty($request->brand_id)) {
            $data = DB::table('invoice_details')
                ->leftJoin('drugs', 'drugs.id', 'invoice_details.drug_id')
                ->leftJoin('invoices', 'invoices.id', 'invoice_details.invoice_master_id')
                ->where('drugs.brand_id', $request->brand_id)
                ->select('invoices.invoice_no', 'drugs.macrohealth_sg', 'drugs.price', 'invoice_details.qty', 'invoice_details.toal_price_witout_discount')
                ->get();
            return response()->json([
                "status" => 200,
                "message" => "medicine data",
                "data" => $data
            ]);
        } else if (!empty($request->startDate) && !empty($request->endDate) && !empty($request->brand_id)) {
            $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
            $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();
            $data = invoice_details::with('drug', 'invoice')->whereBetween('created_at', [$startDate, $endDate])
                ->where('brand_id', $request->brand_id)
                ->orderBy('id', 'desc')->get();
            return response()->json([
                "status" => 200,
                "message" => "All Invoice",
                "data" => $data
            ]);
        } else {
            return response()->json([
                "status" => 500,
                "message" => "No data found.",
                "data" => []
            ]);
        }
    }
    // public function paid_all_invoices()
    // {
    //     $data = Invoice::where('payment_status', 'Paid')->get();
    //     return response()->json([
    //         'status' => 200,
    //         'data' => $data,
    //     ]);
    // }
    public function return_invoice(Request $request, $id)
    {
        $total = invoice_details::where('invoice_master_id', $id)
            ->sum('qty');
        $data = Invoice::find($id);
        if ($total == $request->qty) {
            $data->fully_return = 1;
        }
        $data->return_status = 1;
        $data->update();

        return response()->json([
            'status' => 200,
            'data' => $data,
        ]);
    }
}
