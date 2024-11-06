<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Requisition extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'requisition_no',
        'requisition_category_id',
        'expected_date_of_delivery',
        'requisitor_contact_email',
        'requisitor_phone_no',
        'date_and_time',
        'test_sample',
        'supplier_id',
        'delivery_mode_id',
        'payment_mode_id',
        'recurring_order',
        'requisition_frequency_id',
        'frequency_start_date',
        'frequency_end_date',
        'special_instruction',
        'total_amount',
        'vat_amount',
        'tax_amount',
        'commission_amount',
        'total_bill_amount',
        'requisition_status',
        'created_by',
        'reference_invoice_no',
        'reference_order_no',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'po_creator', 'id');
    }

}
