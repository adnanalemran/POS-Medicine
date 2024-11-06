<?php

namespace App\Http\Controllers;

use App\Models\Drug;
use App\Models\ProductReturnInvoice;
use App\Models\ProductReturnIvoiceDetails;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ProductReturnInvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = ProductReturnInvoice::with('details')->orderBy('id', 'DESC')->get();
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


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function return_invoice_by_date(Request $request)
    {
        $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
        $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();
        if ($request->member_id) {
            $data = ProductReturnInvoice::with('member', 'details')
                ->where('member_id', $request->member_id)
                ->whereBetween('created_at', [$startDate, $endDate])
                ->orderBy('id', 'desc')
                ->get();
        } else {
            $data = ProductReturnInvoice::with('member', 'details')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->orderBy('id', 'desc')
                ->get();
        }

        return response()->json([
            'status' => 200,
            'data' => $data,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProductReturnInvoice  $productReturnInvoice
     * @return \Illuminate\Http\Response
     */
    public function store_details(Request $request)
    {

        $invoice_no = ProductReturnInvoice::get()->count();

        $invoice_data = ProductReturnInvoice::create([
            'reference_invoice_no' => $request->reference_invoice_no,
            'return_invoice_no' => 101001 + (int)$invoice_no,
            'member_id' => $request->member_id,
            'total_amount' => $request->total_amount,
            'sales_invoice_id' => $request->sales_invoice_id,
            'sales_person_id' => $request->sales_person_id,

        ]);
        $arrData = json_decode($request->arrData);
        if (count($arrData) > 0) {
            foreach ($arrData as $key => $value) {
                $data = new ProductReturnIvoiceDetails();
                $data->retrurn_invoice_id = $invoice_data->id;
                $data->drug_id = $value->drug_id;
                $data->qty = $value->qty;
                $data->price = $value->price;
                $data->total_price = floatval($value->qty) * $value->price;
                $data->save();
            }
        }
        return response()->json([
            'status' => 200,
            'message' => 'Product Returned Successfully',
            'data' => $invoice_data,
        ]);
    }


    public function return_invoice_details_by_date(Request $request)
    {
        $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
        $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();

        $data = ProductReturnIvoiceDetails::with('drug', 'invoice')
            ->whereBetween('created_at', [$startDate, $endDate])->orderBy('id', 'desc')->get();
        return response()->json([
            "status" => 200,
            "message" => "All Invoice",
            "data" => $data
        ]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ProductReturnInvoice  $productReturnInvoice
     * @return \Illuminate\Http\Response
     */
    public function edit(ProductReturnInvoice $productReturnInvoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ProductReturnInvoice  $productReturnInvoice
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProductReturnInvoice $productReturnInvoice)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProductReturnInvoice  $productReturnInvoice
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProductReturnInvoice $productReturnInvoice)
    {
        //
    }
}
