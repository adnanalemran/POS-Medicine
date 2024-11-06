<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StoreInDetail extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['store_in_master_id', 'drug_id', 'exp_date', 'no_of_box', 'bonus_box','total_qty', 'total_price', 'rack', 'self'];
}
