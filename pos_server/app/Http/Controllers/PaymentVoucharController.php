<?php

namespace App\Http\Controllers;

use App\Models\PaymentMoneyRecipt;
use App\Models\PaymentVouchar;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PaymentVoucharController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = PaymentVouchar::with('supplier', 'details')->orderBy('id', 'desc')->get();
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function payment_vouchar_by_date(Request $request)
    {
        $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
        $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();

        $data = PaymentVouchar::whereBetween('created_at', [$startDate, $endDate])->orderBy('id', 'desc')->get();
        return response()->json([
            'status' => 200,
            'data' => $data,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $invoiceNo = PaymentVouchar::max('invoice_no') + 1;
        $data = new PaymentVouchar();
        $data->invoice_no = $invoiceNo;
        $data->purchase_order_no = $request->purchase_order_no;
        $data->supplier_id = $request->supplier_id;
        $data->mrr_no = $request->mrr_no;
        $data->total_amount = $request->total_amount;
        $data->paid_amount = $request->paid_amount;
        $data->due_amount = $request->due_amount;
        $data->created_by = $request->created_by;
        $data->created_by_name = $request->created_by_name;
        $data->created_by_email = $request->created_by_email;
        $data->save();

        $money_recipt_no = PaymentMoneyRecipt::max('money_recipt_no') + 1;
        $money_recipt = new PaymentMoneyRecipt();
        $money_recipt->invoice_no = $invoiceNo;
        $money_recipt->money_recipt_no = $money_recipt_no;
        $money_recipt->paid_amount = $request->paid_amount;
        $money_recipt->requested_amount = $request->total_amount;
        $money_recipt->payment_date = date('Y-m-d');
        $money_recipt->payment_method = "Cash";
        $money_recipt->total_amount_paid = $request->total_amount;
        $money_recipt->created_by_email = $request->created_by_email;
        $money_recipt->created_by_name = $request->created_by_name;
        $money_recipt->save();

        return response()->json([
            'message' => 'Data saved Sucessfully',
            'data' => $data,
            'money_recipt' => $money_recipt,
        ]);
    }
    public function money_recipt_create(Request $request)
    {
        $money_recipt_no = PaymentMoneyRecipt::max('money_recipt_no') + 1;
        $money_recipt = new PaymentMoneyRecipt();
        $money_recipt->invoice_no = $request->invoice_no;
        $money_recipt->money_recipt_no = $money_recipt_no;
        $money_recipt->paid_amount = $request->paid_amount;
        $money_recipt->requested_amount = $request->requested_amount;
        $money_recipt->payment_time = $request->payment_time;
        $money_recipt->payment_date = date('Y-m-d');
        $money_recipt->payment_method = "Cash";
        $money_recipt->total_amount_paid = $request->total_amount_paid;
        $money_recipt->created_by_email = $request->created_by_email;
        $money_recipt->created_by_name = $request->created_by_name;
        $money_recipt->save();

        $data = PaymentVouchar::find($request->id);
        $data->paid_amount = $data->paid_amount + $request->paid_amount;
        $data -> due_amount = $data->due_amount - $request->paid_amount;
        $data->save();
        return response()->json([
            'message' => 'Data saved Sucessfully',
        ]);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PaymentVouchar  $paymentVouchar
     * @return \Illuminate\Http\Response
     */
    public function show(PaymentVouchar $paymentVouchar)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\PaymentVouchar  $paymentVouchar
     * @return \Illuminate\Http\Response
     */
    public function edit(PaymentVouchar $paymentVouchar)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PaymentVouchar  $paymentVouchar
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PaymentVouchar $paymentVouchar)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PaymentVouchar  $paymentVouchar
     * @return \Illuminate\Http\Response
     */
    public function destroy(PaymentVouchar $paymentVouchar)
    {
        //
    }
}
