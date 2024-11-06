<?php

namespace App\Http\Controllers;

use App\Models\MaterialReceiving;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MaterialReceivingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function mrr_report(Request $request)
    {
        $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
        $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();
        $data = MaterialReceiving::with('mrr_details','supplier')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->orderBy('id', 'desc')
            ->get();
        return response()->json([
            "status" => 200,
            "message" => "All Material Receiving",
            "data" => $data
        ]);
    }
    public function supplier_due(Request $request)
    {
        $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
        $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();
        $data = MaterialReceiving::with('supplier')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->where('due_amount','>',0)
            ->get();
            
        return response()->json([
            "status" => 200,
            "message" => "All Material Receiving",
            "data" => $data
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MaterialReceiving  $materialReceiving
     * @return \Illuminate\Http\Response
     */
    public function show(MaterialReceiving $materialReceiving)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MaterialReceiving  $materialReceiving
     * @return \Illuminate\Http\Response
     */
    public function edit(MaterialReceiving $materialReceiving)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MaterialReceiving  $materialReceiving
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MaterialReceiving $materialReceiving)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MaterialReceiving  $materialReceiving
     * @return \Illuminate\Http\Response
     */
    public function destroy(MaterialReceiving $materialReceiving)
    {
        //
    }
}
