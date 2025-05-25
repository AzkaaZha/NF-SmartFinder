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
    ];
}
