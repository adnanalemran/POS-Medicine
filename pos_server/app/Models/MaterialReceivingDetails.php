<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaterialReceivingDetails extends Model
{
    use HasFactory;
    public function drug()
    {
        return $this->belongsTo(Drug::class, 'drug_id', 'id')->select('id', 'macrohealth_sg', 'manufacturer', 'price', 'drug_price','vat', 'drug_code');
    }
}
