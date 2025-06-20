<?php

namespace App\Http\Controllers;

use App\Models\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator as FacadesValidator;

class StorageController extends Controller
{
    public function index(){
        $storage = Storage::all();
        if ($storage->isEmpty()){
            return response()->json([
                'success' => false,
                'message' => 'No data found',
                'data' => null
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'daftar tempat barang',
            'data' => $storage
        ], 200);
    }

    public function store (Request $request){
        // validate the request
        $validator = FacadesValidator::make($request->all(), [
            'name' => 'required|string|max:255',
            'contact' => 'required|string|max:255',
            'users_id' => 'required|exists:users,id',
        ]);

        // cek validasi
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'data' => $validator->errors()
            ], 422);
        }

        // buat data
        $storage = Storage::create([
            'name' => $request->name,
            'contact' => $request->contact,
            'users_id' => $request->users_id,
        ]);

        // response
        return response()->json([
            'success' => true,
            'message' => 'Storage created successfully',
            'data' => $storage
        ], 201);
    }

    public function show($id){
        $storage = Storage::find($id);
        if (!$storage) {
            return response()->json([
                'success' => false,
                'message' => 'Storage not found',
                'data' => null
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Storage found',
            'data' => $storage
        ], 200);
    }

    public function update(Request $request, $id){
        $storage = Storage::find($id);
        if (!$storage) {
            return response()->json([
                'success' => false,
                'message' => 'Storage not found',
                'data' => null
            ], 404);
        }

        // validate the request
        $validator = FacadesValidator::make($request->all(), [
            'name' => 'required|string|max:255',
            'contact' => 'required|string|max:255',
            'users_id' => 'required|exists:users,id',
        ]);

        // cek validasi
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'data' => $validator->errors()
            ], 422);
        }

        // update data
        $storage->update([
            'name' => $request->name,
            'contact' => $request->contact,
            'users_id' => $request->users_id,
        ]);

        // response
        return response()->json([
            'success' => true,
            'message' => 'Storage updated successfully',
            'data' => $storage
        ], 200);
    }
    public function destroy($id){
        $storage = Storage::find($id);
        if (!$storage) {
            return response()->json([
                'success' => false,
                'message' => 'Storage not found',
                'data' => null
            ], 404);
        }

        // delete data
        $storage->delete();

        // response
        return response()->json([
            'success' => true,
            'message' => 'Storage deleted successfully',
            'data' => null
        ], 200);
    }
}
