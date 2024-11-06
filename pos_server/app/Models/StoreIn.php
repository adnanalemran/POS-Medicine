<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StoreIn extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['carrier_id','mrr_id','supplier_id','manufacturer_id','requisition_po_id','self','rack','store_in_record_no','store_in_status','contact_no','total_bill_amount','paid_amount','due_amount'];
}
