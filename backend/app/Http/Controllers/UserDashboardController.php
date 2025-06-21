<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Item;
use App\Models\Verification;

class UserDashboardController extends Controller
{
    public function reports()
    {
        $userId = Auth::id();
        $items = Item::where('users_id', $userId)->with(['category', 'location'])->get();
        return response()->json($items);
    }

    public function claims()
    {
        $userId = Auth::id();
        $claims = Verification::where('users_id', $userId)
            ->with(['item'])
            ->get();
        return response()->json($claims);
    }
}

