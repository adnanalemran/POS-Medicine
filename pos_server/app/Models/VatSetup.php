<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VatSetup extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['vat_name'];
}
