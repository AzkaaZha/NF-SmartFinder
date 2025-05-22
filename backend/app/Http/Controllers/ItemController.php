<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ItemController extends Controller
{
    public function index(){
        $items = Item::all();
        if ($items->isEmpty()){
            return response()->json([
                'success' => false,
                'message' => 'No data found',
                'data' => null
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'daftar barang',
            'data' => $items
        ], 200);
    }

    public function store (Request $request){
        // validate the request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'date' => 'required|date',
            'description' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048',
            'locations_id' => 'required|exists:locations,id',
            'categories_id' => 'required|exists:categories,id',
            'users_id' => 'required|exists:users,id',
            'storages_id' => 'required|exists:storages,id',
        ]);

        // cek validasi
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'data' => $validator->errors()
            ], 422);
        }

        // upload image
        $image = $request->file('image');
        $image->store('items', 'public');

        // buat data
        $item = Item::create([
            'name' => $request->name,
            'date' => $request->date,
            'description' => $request->description,
            'image' => $image->hashName(),
            'status' => 'pending',
            'locations_id' => $request->locations_id,
            'categories_id' => $request->categories_id,
            'users_id' => $request->users_id,
            'storages_id' => $request->storages_id,
        ]);

        // response
        return response()->json([
            'success' => true,
            'message' => 'Item created successfully',
            'data' => $item
        ], 201);
    }
}
