<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    
    public function index()
    {
        $data = Product::orderBy('id', 'DESC')->get();
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
            'requisition_no' => 'required',
            'category'=>'required',
            'edod'=>'required',
            'phone'=>'required'


        ]);

        if ($validator->fails()) 
        {
            return response()->json($validator->messages());
        }
        else
        {
           $var= new Product();
           $var->item_code=$request->item_code;
           $var-> name=$request->name;
           $var->brand =$request->brand;
           $var-> exp_date=$request->exp_date;
           $var-> box_type=$request->box_type;
           $var-> pkt_size=$request->pkt_size;
           $var-> number_box_bottle=$request->number_box_bottle;
           $var->quantity=$request->quantity;
           $var->unit=$request->unit;
           $var->mrp=$request->mrp;
           $var->vat=$request->vat;
           $var->purchase_price=$request->purchase_price;
           $var->total_price=$request->total_price;
           


            return response()->json([
                'status' => 200,
                'message' => ' Requisition create Successfully',
                'requisition' => $req
            ]);

        }
    }

    public function show(Product $product)
    {
        //
    }

    
    public function edit(Product $product)
    {
        //
    }

    
    public function update(Request $request, Product $product)
    {
           $var= Product ::find($request->id); 
           $var->item_code=$request->item_code;
           $var-> name=$request->name;
           $var->brand =$request->brand;
           $var-> exp_date=$request->exp_date;
           $var-> box_type=$request->box_type;
           $var-> pkt_size=$request->pkt_size;
           $var-> number_box_bottle=$request->number_box_bottle;
           $var->quantity=$request->quantity;
           $var->unit=$request->unit;
           $var->mrp=$request->mrp;
           $var->vat=$request->vat;
           $var->purchase_price=$request->purchase_price;
           $var->total_price=$request->total_price; 
        
           $var->update();

            return response()->json([
                'status' => 200,
                'message' => 'Update successfully',
            ]);
        
    }

    public function destroy(Product $product)
    {
        $var = Product::find($request->id);
        
        $var->Delete_status = 1;
        $var->update();

        return response()->json([
            'status' => 200,
            'message' => 'requisition deleted successfully',
        ]);
    }
}
