<?php

namespace App\Http\Controllers;

use App\Models\RequisotionDelivery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RequisotionDeliveryController extends Controller
{
    
    public function index()
    {
        $data = RequisitionSupplier::orderBy('id', 'DESC')->get();
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
            'delivery_name' => 'required'

        ]);

        if ($validator->fails()) 
        {
            return response()->json($validator->messages());
        }
        else
        {
            $var= new RequisitionDelivery();
            $var->delivery_name=$request->delivery_name;
            $var->save();

            return response()->json([
                'status' => 200,
                'message' => 'Delivery Added Successfully',
                'Delivery' => $var
            ]);

        }
    }

    public function show(RequisotionDelivery $requisotionDelivery)
    {
        //
    }

   
    public function edit(RequisotionDelivery $requisotionDelivery)
    {
        //
    }

    public function update(Request $request, RequisotionDelivery $requisotionDelivery)
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
            $var = RequisotionDelivery::find($request->id);
        
            $var->delivery_name = $request->delivery_name;
            $var->update();


            return response()->json([
                'status' => 200,
                'message' => 'Delivery update successfully',
            ]);

        }
    }

    
    public function destroy(Request $request,RequisotionDelivery $requisotionDelivery)
    {
        $var = RequisotionDelivery::find($request->id);
        
        $var->delete_status = 1;
        $var->update();

        return response()->json([
            'status' => 200,
            'message' => 'Dilevery deleted successfully',
        ]);
    }
}
