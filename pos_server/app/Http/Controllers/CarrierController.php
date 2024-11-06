<?php

namespace App\Http\Controllers;

use App\Models\Carrier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CarrierController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Carrier::orderBy('id', 'DESC')->get();
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
     * @param  \App\Http\Requests\StoreCarrierRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'carrier_name' => 'required',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $data = $request->all();

            Carrier::create($data);

            return response()->json([
                'status' => 200,
                'message' => 'Data Added Successfully.',
            ]);

        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Carrier  $drugGenericName
     * @return \Illuminate\Http\Response
     */
    public function show(Carrier $drugGenericName)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Carrier  $drugGenericName
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = Carrier::find($id);
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

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCarrierRequest  $request
     * @param  \App\Models\Carrier  $drugGenericName
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'carrier_name' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        } else {
            $data = $request->all();
            $brand = Carrier::find($id);
            $brand->fill($data)->save();

            // Carrier::update($data);

            return response()->json([
                'status' => 200,
                'message' => 'Data updated successfully.'
            ]);

        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Carrier  $drugGenericName
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = Carrier::find($id)->delete();

        if ($data) {
            return response()->json([
                'status' => 200,
                'message' => 'Data deleted successfully.'
            ]);
        }else{
            return response()->json([
                'status' => 403,
                'message' => 'Data not found',
            ]);
        }

    }
}

