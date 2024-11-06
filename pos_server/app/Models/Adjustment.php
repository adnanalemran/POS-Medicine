<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Adjustment extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['adjustment_no','adjustment_date','requested_by','phone_no','email_address','remark','notes','created_by','adjustment_status'];
}
