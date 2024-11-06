<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DeliveryChannel extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['delivery_channel_name'];
}
