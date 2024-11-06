<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AdjustmentDetails extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['adjustment_master_id','drug_id','noOfBox','pcs','totalPrice','increase','decrease','reason','created_by'];

    public function stock () {
        return $this->belongsTo('App\Models\Stock','drug_id','drug_id')-> select('drug_id','stock');
    }
    public function drug () {
        return $this->belongsTo('App\Models\Drug','drug_id','id')-> select('id','unit', 'boxType as box_type', 'pktSize as pkt_size', 'manufacturer', 'drug_price','price', 'macrohealth_sg as name');
    }
    
}
