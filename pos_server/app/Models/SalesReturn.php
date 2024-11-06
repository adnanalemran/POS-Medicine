<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SalesReturn extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['requisition_po_id','purchase_order_no','return_date','return_by','reasons_of_return','product_details_note','total_amount','sales_return_status'];

    public function details()
    {
        return $this->hasMany(SalesReturnDetails::class, 'sales_return_master_id', 'id')->with('drug');
    }
    public function mrr()
    {
        return $this->belongsTo(MaterialReceiving::class, 'requisition_po_id', 'id')->select('id','manufacturer_id')->with('supplier');
    }
}
