<?php

namespace App\Http\Controllers;

use App\Models\RequisitionPayment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RequisitionPaymentController extends Controller
{
    
    public function index()
    {
        $data = RequisitionPayment::orderBy('id', 'DESC')->get();
        return response()->json([
            'status' => 200,
            'data' => $data
        ]);
    }

    
    public function create()
    {
        //
    }

    
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'payment_name' => 'required'

        ]);

        if ($validator->fails()) 
        {
            return response()->json($validator->messages());
        }
        else
        {
            $var= new RequisitionPayment();
            $var->payment_name=$request->payment_name;
            $var->save();

            return response()->json([
                'status' => 200,
                'message' => 'Payment Type Added Successfully',
                'Payment' => $var
            ]);

        }
    }

    
    public function show(RequisitionPayment $requisitionPayment)
    {
        //
    }

    
    public function edit(RequisitionPayment $requisitionPayment)
    {
        //
    }

    
    public function update(Request $request, RequisitionPayment $requisitionPayment)
    {
        $validator = Validator::make($request->all(),[
            'delivery_name' => 'required|string',
        ]);

        if ($validator->fails()) 
        {
            return response()->json($validator->messages());
        }
        else
        {
            $var = RequisitionPayment::find($request->id);
        
            $var->payment_name = $request->payment_name;
            $var->update();


            return response()->json([
                'status' => 200,
                'message' => 'Payment update successfully',
            ]);

        }
    }

    public function destroy(Request $request,RequisitionPayment $requisitionPayment)
    {
        $var = RequisitionPayment::find($request->id);
        
        //$var->delete_status = 1;
        //$var->update();
        $var->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Payment type deleted successfully',
        ]);
    }
}
