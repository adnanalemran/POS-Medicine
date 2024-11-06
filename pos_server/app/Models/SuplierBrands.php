<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SuplierBrands extends Model
{
    use HasFactory;
    protected $fillable = [
        'suplier_id',
        'brand_id',
        'brand_name',
    ];
}
