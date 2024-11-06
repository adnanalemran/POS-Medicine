<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentVouchar extends Model
{
    use HasFactory;
    protected $fillable = ['purchase_order_no','supplier_id','mrr_no','total_amount','paid_amount','due_amount','created_by','created_by_name','created_by_email','invoice_no'];
    public function supplier(){
        return $this->belongsTo(Supplier::class, 'supplier_id') -> select('id', 'supplier_name');
    }
   
    public function details(){
        return $this->hasMany(MaterialReceivingDetails::class, 'material_receiving_master_id', 'purchase_order_no')-> with('drug');
    }
}
