<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    use HasFactory;
    protected $guarded = [
        'id'
    ];

    protected $hidden = [
        'db_name',
    ];

    // public function users()
    // {
    //     return $this->hasMany(User::class);
    // }
}
