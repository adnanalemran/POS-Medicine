<?php

namespace App\Http\Controllers;

use App\Models\AdjustmentType;
use Illuminate\Http\Request;

class AdjustmentTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = AdjustmentType::orderBy('id', 'desc')->get();
        return response()->json($data);
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
        $data = AdjustmentType::create($request->all());

        return response()->json([
        'message'=> 'Data get Sucessfully',
        'AdjustmentType' => $data
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AdjustmentType  $adjustmentType
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = AdjustmentType::find($id);
        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\AdjustmentType  $adjustmentType
     * @return \Illuminate\Http\Response
     */
    public function edit(AdjustmentType $adjustmentType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AdjustmentType  $adjustmentType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = AdjustmentType::find($id);
        $data->update($request->all());
        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AdjustmentType  $adjustmentType
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = AdjustmentType::find($id);
        $data->delete();
        return response()->json(['message'=>'Data Deleted Sucessfully']);
    }
}
