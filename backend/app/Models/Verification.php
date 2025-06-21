<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Verification extends Model
{
    protected $table = 'verifications';
    protected $fillable = [
        'message',
        'proof_image',
        'status',
        'items_id',
        'users_id',
    ];

    public function item()
    {
        return $this->belongsTo(Item::class, 'items_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'users_id');
    }
}
