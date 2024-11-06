<?php

namespace App\Http\Controllers;

use App\Models\MaterialReceiving;
use Illuminate\Http\Request;

class MrrController extends Controller
{
    public function view_mrr ($id) 
    {
        $data = MaterialReceiving::with('mrr_details','supplier','carrier','po')->find($id);
        return response()->json([
            'status' => 200,
            'mrr' => $data,
        ]);
    }
}
