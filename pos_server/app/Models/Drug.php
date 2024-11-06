<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\SoftDeletes;

class Drug extends Model
{
    use HasFactory;
    protected $casts = [
        'expiry_date' => 'string',
    ];
    protected $dates = [];
    protected $fillable = ['generic_id', 'expiry_date', 'generic_Name', 'manufacturer', 'unit', 'pktSize', 'boxType', 'drug_price',  'drug_description', 'strength', 'macrohealth_sg', 'mims_sg', 'mims_type', 'guid', 'drug_name', 'qty', 'rpts', 'box_size', 'trade_price_box', 'restriction', 'brand_id', 'category_id', 'sub_category_id', 'stock', 'stock_report', 'drug_code', 'class', 'batch', 'expiry_date', 'price', 'offer_price', "drug_discount", 'cash_drug_discount', 'card_drug_discount', 'digital_drug_discount', 'drug_weight', 'image', 'summary', 'condition', 'status', 'purchase_price_with_vat', 'vat'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function generic_name()
    {
        return $this->belongsTo(DrugGenericName::class, 'generic_id');
    }

    public function brand()
    {
        return $this->belongsTo('App\Models\Brand', 'brand_id', 'id')->select('id', 'title');
    }

    public function store_in()
    {
        return $this->hasMany(StoreInDetail::class, 'drug_id');
        // return $this->hasMany(StoreInDetail::class,'drug_id')->selectRaw('sum(total_qty) as store_qty')->groupBy('drug_id');
    }

    public function sales_return()
    {
        // return $this->hasMany('SalesReturnDetail','project_id')->selectRaw('sales_return_details.*,sum(total) as sum')->groupBy('currency_list');
        return $this->hasMany(SalesReturnDetails::class, 'drug_id');
    }

    public function adjustment()
    {
        return $this->hasMany(AdjustmentDetails::class, 'drug_id');
    }

    public function stockOut()
    {
        return $this->hasMany(invoice_details::class, 'drug_id');
    }

    public function current_stock()
    {
        return $this->belongsTo('App\Models\Stock', 'id', 'drug_id')->select('stock', 'drug_id');
    }
}
