<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductReturnIvoiceDetails extends Model
{
    use HasFactory;
    protected $fillable = [
            'retrurn_invoice_id',
            'drug_id',
            'qty',
            'total_price',
    ];
    public function drug() 
    {
        return $this->belongsTo(Drug::class, 'drug_id', 'id')->select('id', 'macrohealth_sg', 'price');
    }
    public function invoice() {
        return $this->belongsTo(ProductReturnInvoice::class, 'retrurn_invoice_id', 'id');
    }
}
