<?php

namespace App\Http\Controllers;

use App\Models\DrugGenericName;
use App\Models\UsualProvider;
use App\Http\Requests\StoreUsualProviderRequest;
use App\Http\Requests\UpdateUsualProviderRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UsualProviderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = UsualProvider::orderBy('id', 'DESC')->get();
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
     * @param  \App\Http\Requests\StoreUsualProviderRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'usual_provider' => 'required',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{

            $data = $request->all();

            UsualProvider::create($data);

            return response()->json([
                'status' => 200,
                'message' => 'Data Added Successfully.',
            ]);

        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\UsualProvider  $usualProvider
     * @return \Illuminate\Http\Response
     */
    public function show(UsualProvider $usualProvider)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\UsualProvider  $usualProvider
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = UsualProvider::find($id);
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
     * @param  \App\Http\Requests\UpdateUsualProviderRequest  $request
     * @param  \App\Models\UsualProvider  $usualProvider
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'usual_provider' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        } else {
            $data = $request->all();
            $brand = UsualProvider::find($id);
            $brand->fill($data)->save();

            return response()->json([
                'status' => 200,
                'message' => 'Data updated successfully.'
            ]);

        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\UsualProvider  $usualProvider
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = UsualProvider::find($id)->delete();

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
