<?php

namespace App\Http\Controllers;

use App\Models\AdjustmentDetails;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AdjustmentDetailsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function report(Request $request)
    {
        $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
        $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();
        $data = AdjustmentDetails::with('drug', 'stock')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->get();
        return response()->json([
            "status" => 200,
            "message" => "All Adjustment Details",
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
     * @param  \App\Models\AdjustmentDetails  $adjustmentDetails
     * @return \Illuminate\Http\Response
     */
    public function show(AdjustmentDetails $adjustmentDetails)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\AdjustmentDetails  $adjustmentDetails
     * @return \Illuminate\Http\Response
     */
    public function edit(AdjustmentDetails $adjustmentDetails)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AdjustmentDetails  $adjustmentDetails
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AdjustmentDetails $adjustmentDetails)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AdjustmentDetails  $adjustmentDetails
     * @return \Illuminate\Http\Response
     */
    public function destroy(AdjustmentDetails $adjustmentDetails)
    {
        //
    }
}
