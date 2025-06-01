<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $table = 'items';
    protected $fillable = [
        'name',
        'date',
        'description',
        'image',
        'status',
        'locations_id',
        'categories_id',
        'users_id',
        'storages_id',
    ];

    public function location()
    {
        return $this->belongsTo(Location::class, 'locations_id');
    }
}
