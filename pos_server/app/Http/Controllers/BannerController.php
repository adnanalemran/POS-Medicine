<?php

namespace App\Http\Controllers;

use App\Models\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;
use App\Models\Banner;
use Str;

class BannerController extends Controller
{
    public function test()
    {
        //dd('sadfsdaf');
        return Auth::user();
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Banner::orderBy('id','desc')->get();
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
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

            $data = $request->all();
            
            $slug = Str::slug($request->title);
            $slug_count = Banner::where('slug', $slug)->count();
            
            if ($slug_count>0) {
                $slug = time().'-'.$slug;
            }

            $data['slug'] = $slug;
            $data['status'] = $request->status == null ? '1' : $request->status;
            $data['condition'] = $request->condition == null ? 'banner' : $request->condition;

            if ($request->hasfile('photo')) {
                $file = $request->file('photo');
                $img_ext = $file->getClientOriginalExtension();
                $img_name = time().rand(111,99999).'.'.$img_ext;
                $image_path = 'files/banner/'.$img_name;
                Image::make($file)->resize(982,500)->save($image_path);
                $data['photo'] = $img_name;
            }else{
                $data['photo'] = null;
            }
        
            Banner::create($data);

            return response()->json([
                'status' => 200,
                'message' => 'Data Added Successfully',
            ]);

        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = Banner::find($id);

        if ($data)
        {
            return response()->json([
                'status' => 200,
                'data' => $data,
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Banner Found',
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
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
            $slug_count = Banner::where('slug', $slug)->count();
            
            if ($slug_count>0) {
                $slug = time().'-'.$slug;
            }

            $brand = Banner::find($id);

            $data = $request->all();
            $data['status'] = $request->status == null ? '1' : $request->status;
            $data['condition'] = $request->condition == null ? 'banner' : $request->condition;

            if ($request->hasfile('photo')) {
                    if ($brand->photo != null) {
                        $file_path = 'files/banner/'.$brand->photo;
                        if(file_exists($file_path)){
                            unlink($file_path);
                        }
                    }

                    $file = $request->file('photo');
                    $img_ext = $file->getClientOriginalExtension();
                    $img_name = time().rand(111,99999).'.'.$img_ext;
                    $image_path = 'files/banner/'.$img_name;
                    Image::make($file)->resize(982,500)->save($image_path);
                    $data['photo'] = $img_name;
            }else{
                $data['photo'] = $brand->photo;
            }

            $brand->fill($data)->save();
            
            return response()->json([
                'status' => 200,
                'message' => 'Data Updated Successfully',
            ]);

        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = Banner::find($id)->delete();
        if ($data)
        {
            $rest = Banner::orderBy('id','desc')->get();
            return response()->json([
                'status' => 200,
                'data' => $rest,
                'message' => 'Data deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No data Found',
            ]);
        }
    }
}
