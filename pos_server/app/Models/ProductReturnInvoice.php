<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductReturnInvoice extends Model
{
    use HasFactory;
    protected $fillable = [
        'return_invoice_no',
        'member_id',
        'total_amount',
        'sales_invoice_id',
        'sales_person_id',
        'reference_invoice_no'
    ];

    public function details()
    {
        return $this->hasMany(ProductReturnIvoiceDetails::class, 'retrurn_invoice_id', 'id')->with('drug');
    }
    public function member()
    {
        return $this->belongsTo(Membership::class, 'member_id', 'id')->select('id', 'member_name','member_phone','member_email');
    }
}
