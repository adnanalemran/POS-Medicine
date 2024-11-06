<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SalesReturnDetails extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['sales_return_master_id','drug_id','noOfBox','pcs','totalPrice'];

    public function drug()
    {
        return $this->belongsTo(Drug::class, 'drug_id', 'id')->select('id','manufacturer','macrohealth_sg');
    }
    public function sales_return_master()
    {
        return $this->belongsTo(SalesReturn::class, 'sales_return_master_id', 'id')->select('id','requisition_po_id')->with('mrr');
    }
}
