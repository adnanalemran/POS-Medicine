<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class invoice_details extends Model
{
    use HasFactory;
    protected $fillable = [
        'invoice_master_id',
        'drug_id', 
        'no_of_box_or_leaf', 
        'qty', 
        'total_price',
        'toal_price_witout_discount',
        'cash_drug_discount',
        'card_drug_discount',
        'digital_drug_discount',
        'payment_status'
    ];
    public function drug() {
        return $this->belongsTo('App\Models\Drug', 'drug_id')->select('id', 'macrohealth_sg','price','drug_price', 'vat');
    }
    
    public function invoice() {
        return $this->belongsTo('App\Models\Invoice', 'invoice_master_id')->select('id', 'invoice_no','special_discount','sub_total');
    }
    public function return_data () {
        return $this->hasMany('App\Models\ProductReturnIvoiceDetails', 'drug_id','drug_id');
    }
}
