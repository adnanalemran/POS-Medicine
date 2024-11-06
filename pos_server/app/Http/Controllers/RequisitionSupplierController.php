<?php

namespace App\Http\Controllers;

use App\Models\RequisitionSupplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RequisitionSupplierController extends Controller
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
            'supplier_name' => 'required'

        ]);

        if ($validator->fails()) 
        {
            return response()->json($validator->messages());
        }
        else
        {
            $var= new RequisitionSupplier();
            $var->supplier_name=$request->supplier_name;
            $var->save();

            return response()->json([
                'status' => 200,
                'message' => 'Supplier Added Successfully',
                'Supplier' => $var
            ]);

        }
    }

   
    public function show(RequisitionSupplier $requisitionSupplier)
    {
        //
    }

    
    public function edit(RequisitionSupplier $requisitionSupplier)
    {
        //
    }

    
    public function update(Request $request, RequisitionSupplier $requisitionSupplier)
    {
        $validator = Validator::make($request->all(),[
            'supplier_name' => 'required|string',
        ]);

        if ($validator->fails()) 
        {
            return response()->json($validator->messages());
        }
        else
        {
            $var = RequisitionSupplier::find($request->id);
        
            $var->supplier_name = $request->supplier_name;
            $var->update();


            return response()->json([
                'status' => 200,
                'message' => 'Supplier update successfully',
            ]);

        }
    }

    
    public function destroy(Request $request,RequisitionSupplier $requisitionSupplier)
    {
        
        $var = RequisitionSupplier::find($request->id);
        
        $var->delete_status = 1;
        $var->update();

        return response()->json([
            'status' => 200,
            'message' => 'Supplier deleted successfully',
        ]);
    }
}
