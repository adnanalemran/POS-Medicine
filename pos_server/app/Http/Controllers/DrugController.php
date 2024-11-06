<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Drug;
use App\Http\Requests\StoreDrugRequest;
use App\Http\Requests\UpdateDrugRequest;
use App\Models\DrugsImage;
use App\Models\Stock;
use App\Models\SuplierBrands;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;
use Str;

class DrugController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $data  = Cache::rememberForever('all_drugs_cache',function () {
        //     return Drug::orderBy('id', 'asc')->with('category', 'generic_name')->select('id', 'macrohealth_sg', 'drug_description', 'strength', 'price', 'drug_price', 'generic_Name', 'image')->get();
        // });

       $data = Drug::orderBy('id', 'asc')->with('category', 'generic_name')->select('id', 'macrohealth_sg', 'drug_description', 'strength', 'price', 'drug_price', 'generic_Name', 'image')->get();

        return response()->json([
            'status' => 200,
            'data' => $data,
            'length' => count($data)
        ]);
    }
    public function products_salse_counter($id)
    {
        $data = Drug::with('current_stock','brand')
            ->where('brand_id', $id)
            ->select('id', 'macrohealth_sg', 'drug_description', 'trade_price_box','strength', 'price', 'drug_price', 'generic_Name', 'manufacturer', 'pktSize', 'box_size', 'boxType', 'unit', 'stock','brand_id')
            ->get();
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
     * @param \App\Http\Requests\StoreDrugRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //    return $request->all();

        $validator = Validator::make(
            $request->all(),
            [
                // 'src_primary_key' => 'required',
                // 'generic_id' => 'required',
                'brand_id' => 'required',
                'category_id' => 'required',
                'sub_category_id' => 'required',
                'macrohealth_sg' => 'required',
                'price' => 'required',
                // 'stock' => 'required',
                // 'stock' => 'integer',
                // 'drug_code' => 'required',
                // 'class' => 'required',
                // 'batch' => 'required',
                'box_size' => 'required',
                'boxType' => 'required',
                'pktSize' => 'required',
                'unit' => 'required',
            ],
            [
                'src_primary_key.required' => 'Source Primary Key field is required.',
                'generic_id.required' => 'Generic Name field is required.',
                'brand_id.required' => 'Brand field is required.',
                'category_id.required' => 'Category field is required.',
                'sub_category_id.required' => 'Sub Category field is required.',
                'drug_name.required' => 'Drug Name field is required.',
                'price.required' => 'Price field is required.',
                'price.integer' => 'Price must be number.',
                'stock.required' => 'Stock field is required.',
                'stock.integer' => 'Stock must be number.',
                'drug_code.required' => 'drug code field is required.',
                'class.required' => 'class field is required.',
                'batch.required' => 'batch field is required.',
                'expiry_date.required' => 'expire date field is required.',
                'boxType.required' => 'box type field is required.',
                'pktSize.required' => 'pkt size field is required.',
                'unit.required' => 'unit field is required.',
                'box_size.required' => 'Box_size field is required.',
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {

            $data = $request->all();


            $data['status'] = $request->status == null ? '1' : $request->status;

            if ($request->hasfile('image')) {
                $file = $request->file('image');
                $img_ext = $file->getClientOriginalExtension();
                $img_name = time() . rand(111, 99999) . '.' . $img_ext;
                $image_path = 'files/drugs/' . $img_name;
                Image::make($file)->resize(982, 500)->save($image_path);
                $data['image'] = $img_name;
            } else {
                $data['image'] = null;
            }

            $datum = Drug::create($data);

           Cache::forget('all_drugs_cache');
            return response()->json([
                'status' => 200,
                'drugs' => $datum,
                'message' => 'Data Added Successfully.',
            ]);
        }
    }

    public function academic(Request $request)
    {

        if ($files = $request->file('scan_copy')) {
            $file = $request->file('scan_copy');
            $img_ext = $file->getClientOriginalExtension();
            $img_name = time() . rand(111, 99999) . '.' . $img_ext;
            $image_path = 'files/drugs/' . $img_name;
            Image::make($file)->resize(982, 500)->save($image_path);
            $name = $img_name;

            //            $names = $files->getClientOriginalName();
            //            $name = rand(11, 99999).$names;
            //            $files->move('files/drugs/', $name);
        } else {
            $name = "";
        }
        $doctorsAcademic = new DrugsImage();
        $doctorsAcademic->drugs_master_id = $request->drugs_master_id;
        //        $doctorsAcademic->scan_copy_title = $request->scan_copy_title;
        $doctorsAcademic->scan_copy = $name;
        $doctorsAcademic->save();
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Drug $drug
     * @return \Illuminate\Http\Response
     */
    public function show(Drug $drug)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Drug $drug
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = Drug::find($id);
        $multiple_images = DrugsImage::where('drugs_master_id', $id)->get();

        if ($data) {
            return response()->json([
                'status' => 200,
                'data' => $data,
                'academic' => $multiple_images,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Brand Found',
            ]);
        }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateDrugRequest $request
     * @param \App\Models\Drug $drug
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //        return $request->all();
        $validator = Validator::make(
            $request->all(),
            [
                'brand_id' => 'required',
                'category_id' => 'required',
                'sub_category_id' => 'required',
                'macrohealth_sg' => 'required',
                'price' => 'required',
            ],
            [
                'src_primary_key.required' => 'Source Primary Key field is required.',
                'generic_id.required' => 'Generic Name field is required.',
                'brand_id.required' => 'Brand field is required.',
                'category_id.required' => 'Category field is required.',
                'sub_category_id.required' => 'Sub Category field is required.',
                'macrohealth_sg.required' => 'Drug Name field is required.',
                'price.required' => 'Price field is required.',
                'price.integer' => 'Price must be number.',
                'stock.required' => 'Stock field is required.',
                'stock.integer' => 'Stock must be number.',
                'macrohealth_sg.unique' => 'The Drug Name has already been taken.'
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {


            $brand = Drug::find($id);

            $data = $request->all();
            $data['status'] = $request->status == null ? '1' : $request->status;

            if ($request->hasfile('main_image')) {
                if ($brand->main_image != null) {
                    $file_path = 'files/drugs/' . $brand->main_image;
                    if (file_exists($file_path)) {
                        unlink($file_path);
                    }
                }

                $file = $request->file('main_image');
                $img_ext = $file->getClientOriginalExtension();
                $img_name = time() . rand(111, 99999) . '.' . $img_ext;
                $image_path = 'files/drugs/' . $img_name;
                Image::make($file)->resize(982, 500)->save($image_path);
                $data['main_image'] = $img_name;
            } else {
                $data['main_image'] = $brand->main_image;
            }
            $stock = Stock::where('drug_id', $id)->first();
            if($stock){
                $stock->manufacturer = $request->manufacturer;
                $stock->name = $request->macrohealth_sg;
                $stock->save();
            }

            $datum = $brand->fill($data)->save();
            Cache::forget('all_drugs_cache');
            return response()->json([
                'status' => 200,
                'drugs' => $datum,
                'drugs_id' => $id,
                'message' => 'Data Updated Successfully.',
            ]);
        }
    }


    public function AcademicUpdate(Request $request, $id)
    {
        $Academic = DrugsImage::find($id);
        if ($files = $request->file('scan_copy')) {

            if ($Academic->scan_copy != null) {
                $file_path = 'files/drugs/' . $Academic->scan_copy;
                if (file_exists($file_path)) {
                    unlink($file_path);
                }
            }

            $file = $request->file('scan_copy');
            $img_ext = $file->getClientOriginalExtension();
            $img_name = time() . rand(111, 99999) . '.' . $img_ext;
            $image_path = 'files/drugs/' . $img_name;
            Image::make($file)->resize(982, 500)->save($image_path);
            $name = $img_name;

            //            $names = $files->getClientOriginalName();
            //            $name = rand(11, 99999).$names;
            //            $files->move('files/drugs', $name);

        } else {
            $name = "";
        }
        $doctorsAcademic = DrugsImage::find($id);
        $doctorsAcademic->drugs_master_id = $request->drugs_master_id;
        //        $doctorsAcademic->scan_copy_title = $request->scan_copy_title;
        if ($name == "") {
            $doctorsAcademic->scan_copy = $doctorsAcademic->scan_copy;
        } else {
            $doctorsAcademic->scan_copy = $name;
        }
        $doctorsAcademic->update();
    }

    public function AcademicDestroy($id)
    {
        $doc = DrugsImage::find($id);
        $doc->delete();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Drug $drug
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = Drug::find($id)->delete();
        if ($data) {
            $rest = Drug::orderBy('id', 'desc')->get();
            return response()->json([
                'status' => 200,
                'data' => $rest,
                'message' => 'Data Deleted Successfully.',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No data Found',
            ]);
        }
    }

    public function suplier_brands($id)
    {
        $data =  SuplierBrands::where('suplier_id', $id)->get();
        return response()->json([
            'status' => 200,
            'data' => $data,
            'message' => 'Data Found Successfully.'
        ]);
    }
    public function suplier_brands_add(Request $request)
    {

        $data =  SuplierBrands::create($request->all());

        return response()->json([
            'status' => 200,
            'data' => $data,
            'message' => 'Data Added Successfully.'
        ]);
    }
    public function suplier_brands_update(Request $request, $id)
    {
        $data = SuplierBrands::find($id);
        $data->suplier_id = $request->suplier_id;
        $data->brand_id = $request->brand_id;
        $data->brand_name = $request->brand_name;
        $data->update();
        return response()->json([
            'status' => 200,
            'data' => $data,
            'message' => 'Data Updated Successfully.'
        ]);
    }
    public function suplier_brands_delete($id)
    {
        $data =  SuplierBrands::find($id);
        $data->delete();
        return response()->json([
            'status' => 200,
            'data' => $data,
            'message' => 'Data deleted Successfully.'
        ]);
    }
}
