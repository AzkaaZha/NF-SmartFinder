<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Categories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ItemController extends Controller
{
    public function index(){
        $items = Item::all();
        $items = Item::with(['location', 'category', 'storage', 'user'])->get();
        if ($items->isEmpty()){ 
            return response()->json([
                'success' => false,
                'message' => 'No data found',
                'data' => null
            ], 404);
        }

        // Tambahkan img_url manual
        $items = $items->map(function ($item) {
            $item->img_url = asset('storage/images/' . $item->image);
            return $item;
        });

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
        $image->store('images', 'public');

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

    public function show($id){
        $item = Item::find($id);
        if (!$item) {
            return response()->json([
                'success' => false,
                'message' => 'Item not found',
                'data' => null
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Item found',
            'data' => $item
        ], 200);
    }

    public function update(Request $request, $id){
        $item = Item::find($id);
        if (!$item) {
            return response()->json([
                'success' => false,
                'message' => 'Item not found',
                'data' => null
            ], 404);
        }

        // validate the request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'date' => 'required|date',
            'description' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048',
            'status' => 'required|in:pending,approved,rejected',
            'locations_id' => 'required|exists:locations,id',
            'categories_id' => 'required|exists:categories,id',
            'users_id' => 'required|exists:users,id',
            'storages_id' => 'required|exists:storages,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'data' => $validator->errors()
            ], 422);
        }

        // handle image update
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image->store('items', 'public');

            // hapus gambar lama jika ada
            if ($item->image) {
                Storage::disk('public')->delete('items/' . $item->image);
            }

            // simpan nama file baru
            $item['image'] = $image->hashName();
        }

        // update data lain
        $item->name = $request->name;
        $item->date = $request->date;
        $item->description = $request->description;
        $item->status = $request->status;
        $item->locations_id = $request->locations_id;
        $item->categories_id = $request->categories_id;
        $item->users_id = $request->users_id;
        $item->storages_id = $request->storages_id;
        $item->save();

        return response()->json([
            'success' => true,
            'message' => 'Item updated successfully',
            'data' => $item
        ], 200);
    }
    public function destroy($id){
        $item = Item::find($id);
        if (!$item) {
            return response()->json([
                'success' => false,
                'message' => 'Item not found',
                'data' => null
            ], 404);
        }

        $item->delete();

        return response()->json([
            'success' => true,
            'message' => 'Item deleted successfully',
            'data' => null
        ], 200);
    }
}
