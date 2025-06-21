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

    public function category()
    {
        return $this->belongsTo(Categorie::class, 'categories_id');
    }

    public function storage()
    {
        return $this->belongsTo(Storage::class, 'storages_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'users_id');
    }

}
