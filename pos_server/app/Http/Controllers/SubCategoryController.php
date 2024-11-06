<?php

namespace App\Http\Controllers;

use App\Models\SubCategory;
use App\Http\Requests\StoreSubCategoryRequest;
use App\Http\Requests\UpdateSubCategoryRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;
use Str;

class SubCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = SubCategory::orderBy('id', 'asc')->get();
        return response()->json([
            'status' => 200,
            'data' => $data
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
     * @param  \App\Http\Requests\StoreSubCategoryRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'title' => 'required|string',
            'category_id' => 'required',
            'description' => 'required',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $data = $request->all();

            $slug = Str::slug($request->title);
            $slug_count = SubCategory::where('slug', $slug)->count();

            if ($slug_count>0) {
                $slug = time().'-'.$slug;
            }

            $data['slug'] = $slug;
            $data['status'] = $request->status == null ? '1' : $request->status;

            if ($request->hasfile('photo')) {
                $file = $request->file('photo');
                $img_ext = $file->getClientOriginalExtension();
                $img_name = time().rand(111,99999).'.'.$img_ext;
                $image_path = 'files/subcategory/'.$img_name;
                Image::make($file)->resize(982,500)->save($image_path);
                $data['photo'] = $img_name;
            }else{
                $data['photo'] = null;
            }

            SubCategory::create($data);

            return response()->json([
                'status' => 200,
                'message' => 'Data Added Successfully',
            ]);

        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SubCategory  $subCategory
     * @return \Illuminate\Http\Response
     */
    public function show(SubCategory $subCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SubCategory  $subCategory
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = SubCategory::find($id);

        if ($data)
        {
            return response()->json([
                'status' => 200,
                'data' => $data,
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Brand Found',
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSubCategoryRequest  $request
     * @param  \App\Models\SubCategory  $subCategory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
            'title' => 'required|string',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $slug = Str::slug($request->title);
            $slug_count = SubCategory::where('slug', $slug)->count();

            if ($slug_count>0) {
                $slug = time().'-'.$slug;
            }

            $brand = SubCategory::find($id);

            $data = $request->all();
            $data['status'] = $request->status == null ? '1' : $request->status;

            if ($request->hasfile('photo')) {
                if ($brand->photo != null) {
                    $file_path = 'files/subcategory/'.$brand->photo;
                    if(file_exists($file_path)){
                        unlink($file_path);
                    }
                }

                $file = $request->file('photo');
                $img_ext = $file->getClientOriginalExtension();
                $img_name = time().rand(111,99999).'.'.$img_ext;
                $image_path = 'files/subcategory/'.$img_name;
                Image::make($file)->resize(982,500)->save($image_path);
                $data['photo'] = $img_name;
            }else{
                $data['photo'] = $brand->photo;
            }

            $brand->fill($data)->save();

            return response()->json([
                'status' => 200,
                'message' => 'Data Updated Successfully.',
            ]);

        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SubCategory  $subCategory
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = SubCategory::find($id)->delete();
        if ($data)
        {
            $rest = SubCategory::orderBy('id','desc')->get();
            return response()->json([
                'status' => 200,
                'data' => $rest,
                'message' => 'Data Deleted Successfully.',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No data Found',
            ]);
        }
    }
}
