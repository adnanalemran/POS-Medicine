<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;
use App\Models\Category;
use Str;

class CategoryController extends Controller
{

    public function index()
    {
        $data = Category::orderBy('id', 'asc')->get();
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
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

            $data = $request->all();

            $slug = Str::slug($request->title);
            $slug_count = Category::where('slug', $slug)->count();

            if ($slug_count>0) {
                $slug = time().'-'.$slug;
            }

            $data['slug'] = $slug;
            $data['status'] = $request->status == null ? '1' : $request->status;

            if ($request->hasfile('photo')) {
                $file = $request->file('photo');
                $img_ext = $file->getClientOriginalExtension();
                $img_name = time().rand(111,99999).'.'.$img_ext;
                $image_path = 'files/category/'.$img_name;
                Image::make($file)->resize(982,500)->save($image_path);
                $data['photo'] = $img_name;
            }else{
                $data['photo'] = null;
            }

            Category::create($data);

            return response()->json([
                'status' => 200,
                'message' => 'Data Added Successfully',
            ]);

        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function show(Brand $brand)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = Category::find($id);

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
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // return $request->all();

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
            $slug_count = Category::where('slug', $slug)->count();

            if ($slug_count>0) {
                $slug = time().'-'.$slug;
            }

            $brand = Category::find($id);

            $data = $request->all();
            $data['status'] = $request->status == null ? '1' : $request->status;

            if ($request->hasfile('photo')) {
                    if ($brand->photo != null) {
                        $file_path = 'files/category/'.$brand->photo;
                        if(file_exists($file_path)){
                            unlink($file_path);
                        }
                    }

                    $file = $request->file('photo');
                    $img_ext = $file->getClientOriginalExtension();
                    $img_name = time().rand(111,99999).'.'.$img_ext;
                    $image_path = 'files/category/'.$img_name;
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
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = Category::find($id)->delete();
        if ($data)
        {
            $rest = Category::orderBy('id','desc')->get();
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
