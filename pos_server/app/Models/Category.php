<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Category extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['title', 'slug', 'status', 'description', 'photo'];

    public function drugs()
    {
        return $this->hasMany(Drug::class);
    }

}
