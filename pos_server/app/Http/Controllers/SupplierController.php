<?php

namespace App\Http\Controllers;

use App\Models\DrugsImage;
use App\Models\LegalDocImage;
use App\Models\Supplier;
use App\Models\SuppliersImage;
use App\Models\SupplierSocialMedia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Supplier::with('supplier_brand')->orderBy('id', 'DESC')->get();
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
     * @param \App\Http\Requests\StoreSupplierRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
//        return $request->all();

        $validator = Validator::make($request->all(), [

            'supplier_name' => 'required',
            'supplier_category_id' => 'required',
        ],
            [
                'supplier_name.required' => 'Supplier Name field is required.',
                'supplier_category_id.required' => 'Supplier Category field is required.',
            ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        } else {

            $data = $request->all();

            if ($request->hasfile('mgt_picture')) {
                $file = $request->file('mgt_picture');
                $img_ext = $file->getClientOriginalExtension();
                $img_name = time() . rand(111, 99999) . '.' . $img_ext;
                $image_path = 'files/mgt_picture/' . $img_name;
                Image::make($file)->resize(982, 500)->save($image_path);
                $data['mgt_picture'] = $img_name;
            } else {
                $data['mgt_picture'] = null;
            }

            if ($request->hasfile('scp_picture')) {
                $file = $request->file('scp_picture');
                $img_ext = $file->getClientOriginalExtension();
                $img_name = time() . rand(111, 99999) . '.' . $img_ext;
                $image_path = 'files/scp_picture/' . $img_name;
                Image::make($file)->resize(982, 500)->save($image_path);
                $data['scp_picture'] = $img_name;
            } else {
                $data['scp_picture'] = null;
            }

            $datum = Supplier::create($data);

            return response()->json([
                'status' => 200,
                'drugs' => $datum,
                'message' => 'Data Added Successfully.',
            ]);

        }


    }



    /**
     * Display the specified resource.
     *
     * @param \App\Models\Supplier $drug
     * @return \Illuminate\Http\Response
     */
    public function show(Supplier $drug)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Supplier $drug
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = Supplier::find($id);
        $multiple_images = LegalDocImage::where('supplier_master_id', $id)->get();
        $social_media = SupplierSocialMedia::where('supplier_master_id', $id)->get();
        if ($data) {
            return response()->json([
                'status' => 200,
                'data' => $data,
                'academic' => $multiple_images,
                'certificate' => $social_media,
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
     * @param \App\Http\Requests\UpdateSupplierRequest $request
     * @param \App\Models\Supplier $drug
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [

            'supplier_name' => 'required',
            'supplier_category_id' => 'required',
        ],
            [
                'supplier_name.required' => 'Supplier Name field is required.',
                'supplier_category_id.required' => 'Supplier Category field is required.',
            ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        } else {


            $brand = Supplier::find($id);

            $data = $request->all();

            if ($request->hasfile('mgt_picture')) {
                if ($brand->mgt_picture != null) {
                    $file_path = 'files/mgt_picture/' . $brand->mgt_picture;
                    if (file_exists($file_path)) {
                        unlink($file_path);
                    }
                }
                $file = $request->file('mgt_picture');
                $img_ext = $file->getClientOriginalExtension();
                $img_name = time() . rand(111, 99999) . '.' . $img_ext;
                $image_path = 'files/mgt_picture/' . $img_name;
                Image::make($file)->resize(982, 500)->save($image_path);
                $data['mgt_picture'] = $img_name;

            } else {
                $data['mgt_picture'] = $brand->mgt_picture;
            }

            if ($request->hasfile('scp_picture')) {
                if ($brand->scp_picture != null) {
                    $file_path = 'files/scp_picture/' . $brand->scp_picture;
                    if (file_exists($file_path)) {
                        unlink($file_path);
                    }
                }
                $file = $request->file('scp_picture');
                $img_ext = $file->getClientOriginalExtension();
                $img_name = time() . rand(111, 99999) . '.' . $img_ext;
                $image_path = 'files/scp_picture/' . $img_name;
                Image::make($file)->resize(982, 500)->save($image_path);
                $data['scp_picture'] = $img_name;

            } else {
                $data['scp_picture'] = $brand->scp_picture;
            }


//            if ($request->hasfile('mgt_picture')) {
//                $file = $request->file('mgt_picture');
//                $img_ext = $file->getClientOriginalExtension();
//                $img_name = time() . rand(111, 99999) . '.' . $img_ext;
//                $image_path = 'files/mgt_picture/' . $img_name;
//                Image::make($file)->resize(982, 500)->save($image_path);
//                $data['mgt_picture'] = $img_name;
//            } else {
//                $data['mgt_picture'] = null;
//            }

//            if ($request->hasfile('scp_picture')) {
//                $file = $request->file('scp_picture');
//                $img_ext = $file->getClientOriginalExtension();
//                $img_name = time() . rand(111, 99999) . '.' . $img_ext;
//                $image_path = 'files/scp_picture/' . $img_name;
//                Image::make($file)->resize(982, 500)->save($image_path);
//                $data['scp_picture'] = $img_name;
//            } else {
//                $data['scp_picture'] = null;
//            }

            $datum = $brand->fill($data)->save();

            return response()->json([
                'status' => 200,
                'drugs' => $datum,
                'drugs_id' => $id,
                'message' => 'Data Updated Successfully.',
            ]);

        }
    }

    public function destroy_supplier_legal_docs($id)
    {
        $doc = LegalDocImage::find($id);
        if ($doc->scan_copy != null) {
            $file_path = 'files/legal_docs/' . $doc->scan_copy;
            if (file_exists($file_path)) {
                unlink($file_path);
            }
        }
        $doc->delete();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Supplier $drug
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = Supplier::find($id)->delete();
        if ($data) {
            $rest = Supplier::orderBy('id', 'desc')->get();
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


    public function save_legal_docs_images(Request $request)
    {

        if ($files = $request->file('scan_copy')) {
            $file = $request->file('scan_copy');
            $img_ext = $file->getClientOriginalExtension();
            $img_name = time() . rand(111, 99999) . '.' . $img_ext;
            $image_path = 'files/legal_docs/' . $img_name;
            Image::make($file)->resize(982, 500)->save($image_path);
            $name = $img_name;
        } else {
            $name = "";
        }
        $doctorsAcademic = new LegalDocImage();
        $doctorsAcademic->supplier_master_id = $request->supplier_master_id;
//        $doctorsAcademic->scan_copy_title = $request->scan_copy_title;
        $doctorsAcademic->scan_copy = $name;
        $doctorsAcademic->save();
    }

    public function save_supplier_social_media(Request $request)
    {
        $social_media = new SupplierSocialMedia();
        $social_media->supplier_master_id = $request->supplier_master_id;
        $social_media->facebook = $request->facebook;
        $social_media->linkedin = $request->linkedin;
        $social_media->twitter = $request->twitter;
        $social_media->save();
    }

    public function destroy_supplier_social_media($id)
    {
        $doc = SupplierSocialMedia::find($id);
        $doc->delete();
    }

    public function update_supplier_legal_docs(Request $request, $id)
    {
        $Academic = LegalDocImage::find($id);
        if ($files = $request->file('scan_copy')) {

            if ($Academic->scan_copy != null) {
                $file_path = 'files/legal_docs/' . $Academic->scan_copy;
                if (file_exists($file_path)) {
                    unlink($file_path);
                }
            }

            $file = $request->file('scan_copy');
            $img_ext = $file->getClientOriginalExtension();
            $img_name = time() . rand(111, 99999) . '.' . $img_ext;
            $image_path = 'files/legal_docs/' . $img_name;
            Image::make($file)->resize(982, 500)->save($image_path);
            $name = $img_name;

//            $names = $files->getClientOriginalName();
//            $name = rand(11, 99999).$names;
//            $files->move('files/drugs', $name);

        } else {
            $name = "";
        }
        $doctorsAcademic = LegalDocImage::find($id);
        $doctorsAcademic->supplier_master_id = $request->supplier_master_id;
//        $doctorsAcademic->scan_copy_title = $request->scan_copy_title;
        if ($name == "") {
            $doctorsAcademic->scan_copy = $doctorsAcademic->scan_copy;
        } else {
            $doctorsAcademic->scan_copy = $name;
        }
        $doctorsAcademic->update();

    }

    public function update_supplier_social_media(Request $request, $id)
    {
        $doctorsAcademic = SupplierSocialMedia::find($id);
        $doctorsAcademic->supplier_master_id = $request->supplier_master_id;
        $doctorsAcademic->facebook = $request->facebook;
        $doctorsAcademic->linkedin = $request->linkedin;
        $doctorsAcademic->twitter = $request->twitter;
        $doctorsAcademic->update();
    }

}
