<?php

namespace App\Http\Controllers;

use App\Models\RequisitionTest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RequisitionTestController extends Controller
{
    public function index()
    {
        $data = RequisitionTest::orderBy('id', 'DESC')->get();
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
            'test_name' => 'required'

        ]);

        if ($validator->fails()) 
        {
            return response()->json($validator->messages());
        }
        else
        {
            $var= new RequisitionTest();
            $var->test_name=$request->test_name;
            $var->save();

            return response()->json([
                'status' => 200,
                'message' => 'Test Added Successfully',
                'Test' => $var
            ]);

        }
    }

    
    public function show(RequisitionTest $requisitionTest)
    {
        //
    }

   
    public function edit(RequisitionTest $requisitionTest)
    {
        //
    }

    
    public function update(Request $request, RequisitionTest $requisitionTest)
    {
        $validator = Validator::make($request->all(),[
            'test_name' => 'required|string',
        ]);

        if ($validator->fails()) 
        {
            return response()->json($validator->messages());
        }
        else
        {
            $var = RequisitionTest::find($request->id);
        
            $var->test_name = $request->test_name;
            $var->update();


            return response()->json([
                'status' => 200,
                'message' => 'Test update successfully',
            ]);

        }
    }

    
    public function destroy(Request $request,RequisitionTest $requisitionTest)
    {
        $var = RequisitionFrequency::find($request->id);
        
        $var->delete_status = 1;
        $var->update();

        return response()->json([
            'status' => 200,
            'message' => 'Frequency deleted successfully',
        ]);
    }
}
