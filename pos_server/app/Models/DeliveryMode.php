<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DeliveryMode extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['delivery_mode_name'];
}
