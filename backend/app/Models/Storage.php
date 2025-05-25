<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Storage extends Model
{
    protected $table = 'storages';
    protected $fillable = [
        'name',
        'contact',
        'users_id',
    ];
}
