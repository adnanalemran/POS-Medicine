<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MaterialReceiving extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'requisition_po_id',
        'manufacturer_id',
        'mrr_status',
        'mrr_expiry_date',
        'mrr_no',
        'carrier_id',
        'delivery_date',
        'carried_by',
        'contact_no',
        'vehicle_no',
        'remarks',
        'payment_type',
        'total_bill_amount',
        'paid_amount',
        'due_amount',
        'delivery_no_docs',
        'invoice_no_docs',
        'delivery_chalan_docs',
        'special_discount',
        'reference_order_no',
        'reference_invoice_no',
        'vat',
        'created_by',
        'updated_by',
    ];
    public function mrr_details()
    {
        return $this->hasMany(MaterialReceivingDetails::class, 'material_receiving_master_id', 'id')->with('drug');
    }
    public function carrier ()
    {
        return $this->belongsTo(Carrier::class, 'carrier_id', 'id')->select('id', 'carrier_name');
    }
    public function supplier ()
    {
        return $this->belongsTo(Supplier::class, 'manufacturer_id', 'id')->select('id', 'supplier_name');
    }
    public function po ()
    {
        return $this->belongsTo(Requisition::class, 'requisition_po_id', 'id')->select('id', 'purchase_order_no');
    }
    
    
}
