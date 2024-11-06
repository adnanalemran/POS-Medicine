<?php

namespace App\Http\Controllers;

use App\Models\Drug;
use App\Models\Invoice;
use App\Models\invoice_details;
use App\Models\Stock;
use App\Models\StokOut;
use App\Models\StoreIn;
use App\Models\StoreInDetail;
use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use stdClass;

class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }
    // public function current_stock()
    // {
    //     return Stock::withSum('store_in', 'total_qty')
    //         ->withSum('sales_return', 'pcs')
    //         ->withSum('adjustment', 'increase')
    //         ->withSum('adjustment', 'decrease')
    //         ->withSum('stock_out', 'pcs')
    //         ->get();
    // }
    public function current_stock()
    {
        return Stock::with('store_in:drug_id,total_qty', 'drug', 'sales_return:drug_id,pcs', 'adjustment:drug_id,increase,decrease', 'stock_out:drug_id,pcs')
            ->select('id', 'drug_id', 'unit', 'box_type', 'pkt_size', 'manufacturer', 'stock', 'name', 'bonus_qty')
            ->get();
    }
    public function current_stock_sales()
    {
        return Stock::with('drug')
            ->select('id', 'drug_id', 'expire_date', 'unit', 'manufacturer', 'stock', 'name')
            ->get();
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
    public function multiple_product_save(Request $request)
    {
        $arrData = json_decode($request->arrData);

        if (count($arrData) > 0) {

            foreach ($arrData as $key => $value) {

                $find_drug = Drug::where('id', $value->drug_id)->first();
                if (!is_null($find_drug)) {
                    $find_drug->expiry_date = $value->expiry_date;
                    $find_drug->save();
                }


                $check_drug_id = Stock::where('drug_id', $value->drug_id)->first();

                if (!is_null($check_drug_id)) {
                    $check_drug_id->stock = $value->req_unit + $check_drug_id->stock + $value->bonus_qty;
                    $check_drug_id->expire_date = $value->expiry_date;
                    $check_drug_id->bonus_qty = $value->bonus_qty + $check_drug_id->bonus_qty;
                    $check_drug_id->save();
                } else {
                    $itemCode = Stock::get()->count();

                    $data = new Stock();
                    $data->item_code = $itemCode + 1001;
                    $data->drug_id = $value->drug_id;
                    $data->name = $value->macrohealth_sg;
                    $data->price = floatval($value->price);
                    $data->description =  "none";
                    $data->manufacturer = $value->manufacturer;
                    $data->pkt_size = $value->pktSize;
                    $data->unit = $value->unit;
                    $data->rack = $value->rack;
                    $data->shelf = $value->self;
                    $data->box_type = $value->boxType;
                    $data->stock = $value->req_unit + $value->bonus_qty;
                    $data->opening_stock = $value->req_unit;
                    $data->bonus_qty = $value->bonus_qty ? $value->bonus_qty : 0;
                    $data->expire_date = $value->expiry_date;
                    $data->save();
                }
            }

            return response()->json([
                'message' => 'Data Inserted Successfully'

            ]);
        }
    }
    public function multiple_product_save_using_csv(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:csv',
        ]);
        $file = $request->file('file');
        $path = $file->getRealPath();
        $data = array_map('str_getcsv', file($path));
        array_shift($data);
        // dd($data);
        foreach ($data as $value) {
            if ($value[0] != "") {
                $myObj = new stdClass();
                $myObj->name = $value[1];
                $myObj->description = $value[2];
                $myObj->price = floatval($value[3]);
                $myObj->stock = $value[4];
                $myObj->manufacturer = $value[5];
                $myObj->drug_id = $value[6];
                $myObj->pkt_size = $value[7];
                $myObj->box_type = $value[8];
                $myObj->unit = $value[9];
                $myObj->rack = $value[10];
                $myObj->shelf = $value[11];
                $myObj->expire_date = $value[12];
                // $myObj->expire_date = null;

                $rules = [
                    'name' => 'required',
                    'price' => 'required',
                    'stock' => 'required',
                    'manufacturer' => 'required',
                    'drug_id' => 'required',
                    'pkt_size' => 'required',
                    'box_type' => 'required',
                    'unit' => 'required',
                    'rack' => 'required',
                    'shelf' => 'required',
                    // 'expire_date' => 'required',
                ];
                // return response()->json($myObj);
                $validator = Validator::make((array) $myObj, $rules);

                if ($validator->fails()) {
                    return response()->json($validator->errors(), 422);
                }



                // $find_drug = Drug::where('id', $myObj->drug_id)->first();
                // if (!is_null($find_drug)) {
                //     $find_drug->expiry_date = $myObj->expire_date;
                //     // $find_drug->expiry_date = $new_date;
                //     $find_drug->save();
                // }
                // $drugId = $myObj->drug_id;
                // $expireDate = $myObj->expire_date;

                // Drug::where('id', $drugId)
                //     ->update(['expiry_date' => DB::raw("'$expireDate'")]);


                $check_drug_id = Stock::where('drug_id', $myObj->drug_id)->first();


                if (!is_null($check_drug_id)) {
                    $check_drug_id->stock = $myObj->stock + $check_drug_id->stock;
                    $check_drug_id->save();

                    $storein = new StoreInDetail();
                    $storein->drug_id = $myObj->drug_id;
                    $storein->exp_date = $myObj->expire_date;
                    $storein->total_qty = $myObj->stock;
                    $storein->total_price = $myObj->price * $myObj->stock;
                    $storein->rack = $myObj->rack;
                    $storein->self = $myObj->shelf;
                    $storein->save();
                } else {
                    $itemCode = Stock::get()->count();

                    $data = new Stock();
                    $data->item_code = $itemCode + 1001;
                    $data->drug_id = $myObj->drug_id;
                    $data->name = $myObj->name;
                    $data->price = floatval($myObj->price);
                    $data->description =  $myObj->description;
                    $data->manufacturer = $myObj->manufacturer;
                    $data->pkt_size = $myObj->pkt_size;
                    $data->unit = $myObj->unit;
                    $data->rack = $myObj->rack;
                    $data->shelf = $myObj->shelf;
                    $data->box_type = $myObj->box_type;
                    $data->stock = $myObj->stock;
                    $data->opening_stock = $myObj->stock;
                    $data->expire_date = $myObj->expire_date;
                    $data->save();

                    $storein = new StoreInDetail();
                    $storein->drug_id = $myObj->drug_id;
                    $storein->exp_date = $myObj->expire_date;
                    $storein->total_qty = $myObj->stock;
                    $storein->total_price = $myObj->price * $myObj->stock;
                    $storein->rack = $myObj->rack;
                    $storein->self = $myObj->shelf;
                    $storein->save();
                }
            } else {
                return response()->json(['error' => 'Id field is required'], 422);
            }
        }

        return response()->json(['message' => 'CSV file imported successfully']);
    }


    public function multiple_product_return(Request $request)
    {
        $arrData = json_decode($request->arrData);

        if (count($arrData) > 0) {

            foreach ($arrData as $key => $value) {

                $check_drug_id = Stock::where('drug_id', $value->drug_id)->first();

                if (!is_null($check_drug_id)) {
                    $check_drug_id->stock = $check_drug_id->stock - $value->pcs;
                    $check_drug_id->save();
                }
            }

            return response()->json([
                'message' => 'Data Inserted Successfully'

            ]);
        }
    }
    public function multiple_product_adjustment(Request $request)
    {
        $arrData = json_decode($request->arrData);

        if (count($arrData) > 0) {

            foreach ($arrData as $key => $value) {

                $check_drug_id = Stock::where('drug_id', $value->drug_id)->first();

                if (!is_null($check_drug_id)) {
                    if ($value->increase > 0) {
                        $check_drug_id->stock = $check_drug_id->stock + $value->increase;
                    } else if ($value->decrease > 0) {
                        $check_drug_id->stock = $check_drug_id->stock - $value->decrease;
                    }
                    $check_drug_id->save();
                }
            }

            return response()->json([
                'message' => 'Data Inserted Successfully'

            ]);
        }
    }

    public function invoice_product_return(Request $request)
    {
        $arrData = json_decode($request->arrData);

        if (count($arrData) > 0) {

            foreach ($arrData as $key => $value) {

                $check_drug_id = Stock::where('drug_id', $value->drug_id)->first();

                if (!is_null($check_drug_id)) {
                    $check_drug_id->stock = $check_drug_id->stock + $value->qty;
                    $check_drug_id->save();
                }
            }

            return response()->json([
                'message' => 'Data Inserted Successfully'

            ]);
        }
    }

    // stock out start
    public function stock_out(Request $request)
    {
        $arrData = json_decode($request->arrData);
        $currentTime = Carbon::now();
        if (count($arrData) > 0) {

            foreach ($arrData as $key => $value) {

                $check_drug_id = Stock::where('drug_id', $value->drug_id)->first();
                $existingInvoice = StokOut::where('invoice_id', $request->invoice_id)
                    ->where('drug_id', $value->drug_id)->first();

                if (is_null($existingInvoice)) {
                    if (!is_null($check_drug_id)) {
                        $check_drug_id->stock = $check_drug_id->stock - $value->pcs;
                        $check_drug_id->save();
                    }
                    $data = new StokOut();
                    $data->drug_id = $value->drug_id;
                    $data->pcs = $value->pcs;
                    $data->date = $currentTime->toDateTimeString();
                    $data->invoice_id = $request->invoice_id;
                    $data->invoice_no = $request->invoice_no;
                    $data->total_price = floatval($value->totalPrice);
                    $data->save();
                }
            }

            return response()->json([
                'message' => 'Data Inserted Successfully',
                'data' => $existingInvoice
            ]);
        }
    }
    // stock out end
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Stock  $stock
     * @return \Illuminate\Http\Response
     */
    public function stock_closing_report()
    {
        $data = Stock::with('drug')
            ->select('drug_id', 'stock')
            ->get();
        return response()->json([
            'status' => 200,
            'data' => $data
        ]);
    }
    public function stock_expiry_report()
    {
        $data = Stock::with('drug')
            ->select('drug_id', 'stock')
            ->whereHas('drug', function ($query) {
                $query->where('expiry_date', '<', Carbon::now()->toDateTimeString());
            })
            ->get();
        return response()->json([
            'status' => 200,
            'data' => $data
        ]);
    }
    public function profit_loss(Request $request)
    {
        $startDate = Carbon::createFromFormat('Y-m-d', $request->startDate)->startOfDay();
        $endDate = Carbon::createFromFormat('Y-m-d', $request->endDate)->endOfDay();
         $data = invoice_details::with('drug')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->get();
        $totalPrice = $data->sum(function ($detail) {
            return ($detail->drug->drug_price + $detail->drug->vat) * $detail->qty; // Adjust column names as needed
        });
        $invoice_total = Invoice::whereBetween('created_at', [$startDate, $endDate])
            ->sum(DB::raw('sub_total - special_discount'));
        $expire = Drug::with('current_stock')
            ->whereBetween('expiry_date', [$startDate, $endDate])
            ->get();
        $expire_total = $expire->sum(function ($drug) {
            $drugPrice = $drug->drug_price ?? 0; // Replace with the actual column name
            $vat = $drug->vat ?? 0; // Replace with the actual column name
        
            // Access 'stock' directly from the 'current_stock' relationship
            $stock = $drug->current_stock->stock ?? 0;
        
            // Calculate the total value for each drug
            return ($drugPrice + $vat) * $stock;

        });
        return response()->json([
            "status" => 200,
            "message" => "All Adjustment Details",
            "sales" => $invoice_total,
            "price" => $totalPrice,
            "expire" => $expire_total
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Stock  $stock
     * @return \Illuminate\Http\Response
     */
    public function edit(Stock $stock)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Stock  $stock
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Stock $stock)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Stock  $stock
     * @return \Illuminate\Http\Response
     */
    public function destroy(Stock $stock)
    {
        //
    }
}
