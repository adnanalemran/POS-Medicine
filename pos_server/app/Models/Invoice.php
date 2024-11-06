<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends Model
{
    use HasFactory;
    protected $fillable = [
        'invoice_no',
        'member_id',
        'sub_total',
        'vat_tax_amount',
        'payment_status',
        'grand_total',
        'discount_type',
        'discount_amount',
        'prescription_image',
        'special_discount',
        'paid_amount',
        'return_amount',
        'due_amount',
        'invoice_from',
        'delete_status',
        'created_by',
    ];
    public function member()
    {
        return $this->belongsTo(Membership::class, 'member_id')->select('id', 'member_phone', 'member_name', 'member_email');
    }
    public function details()
    {
        return $this->hasMany(invoice_details::class, 'invoice_master_id')->select('id', 'invoice_master_id', 'drug_id', 'no_of_box_or_leaf', 'qty', 'total_price')->with('drug');
    }
    public function invoice_details()
    {
        return $this->hasMany(invoice_details::class, 'invoice_master_id');
    }
}
