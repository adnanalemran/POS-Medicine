<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RequisitionFrequency extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['requisition_frequency_name'];

}
