<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;
    protected $fillable = [
        'item_code',
        'drug_id',
        'name',
        'price',
        'stock',
        'manufacturer',
        'opening_stock',
        'rack',
        'shelf',
        'box_type',
        'description',
        'unit',
        'pkt_size',

    ];

    public function store_in()
    {
        return $this->hasMany('App\Models\StoreInDetail', 'drug_id', 'drug_id');
    }
    public function sales_return() 
    {
        return $this->hasMany('App\Models\SalesReturnDetails', 'drug_id', 'drug_id');
    }
    public function adjustment() 
    {
        return $this->hasMany('App\Models\AdjustmentDetails', 'drug_id', 'drug_id');
    }
    public function stock_out() 
    {
        return $this->hasMany('App\Models\StokOut', 'drug_id', 'drug_id');
    }
    public function drug () 
    {
        return $this->belongsTo('App\Models\Drug', 'drug_id', 'id')->select('id', 'generic_name', 'drug_description','price', 'drug_price', 'vat', 'box_size','boxType', 'pktSize','expiry_date', 'macrohealth_sg', 'manufacturer');
    }
}
