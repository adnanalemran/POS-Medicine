<?php

namespace App\Http\Controllers;

use App\Models\DrugGenericName;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;

class DrugGenericNameController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = DrugGenericName::orderBy('id', 'DESC')->get();
        return response()->json([
            'status' => 200,
            'data' => $data,
            'db'=>Config::get('database.connections.mysql.database')
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
     * @param  \App\Http\Requests\StoreDrugGenericNameRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'generic_name' => 'required',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $data = $request->all();

            DrugGenericName::create($data);

            return response()->json([
                'status' => 200,
                'message' => 'Data Added Successfully.',
            ]);

        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DrugGenericName  $drugGenericName
     * @return \Illuminate\Http\Response
     */
    public function show(DrugGenericName $drugGenericName)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\DrugGenericName  $drugGenericName
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = DrugGenericName::find($id);
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
     * @param  \App\Http\Requests\UpdateDrugGenericNameRequest  $request
     * @param  \App\Models\DrugGenericName  $drugGenericName
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'generic_name' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        } else {
            $data = $request->all();
            $brand = DrugGenericName::find($id);
            $brand->fill($data)->save();

            // DrugGenericName::update($data);

            return response()->json([
                'status' => 200,
                'message' => 'Data updated successfully.'
            ]);

        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DrugGenericName  $drugGenericName
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = DrugGenericName::find($id)->delete();

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
