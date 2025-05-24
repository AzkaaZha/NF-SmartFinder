<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategorieController extends Controller
{
    public function index()
    {
        $categories = Categorie::all();
        if ($categories->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No data found',
                'data' => null
            ], 404);
        }
        return response()->json([
            'success' => true,
            'message' => 'daftar kategori',
            'data' => $categories
        ], 200);
    }

    public function store(Request $request)
    {
        // validate the request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
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
        $categorie = Categorie::create([
            'name' => $request->name,
        ]);

        // response
        return response()->json([
            'success' => true,
            'message' => 'Categorie created successfully',
            'data' => $categorie
        ], 201);
    }

    public function show($id)
    {
        $categorie = Categorie::find($id);
        if (!$categorie) {
            return response()->json([
                'success' => false,
                'message' => 'Categorie not found',
                'data' => null
            ], 404);
        }
        return response()->json([
            'success' => true,
            'message' => 'Categorie found',
            'data' => $categorie
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $categorie = Categorie::find($id);
        if (!$categorie) {
            return response()->json([
                'success' => false,
                'message' => 'Categorie not found',
                'data' => null
            ], 404);
        }

        // validate the request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
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
        $categorie->update([
            'name' => $request->name,
        ]);

        // response
        return response()->json([
            'success' => true,
            'message' => 'Categorie updated successfully',
            'data' => $categorie
        ], 200);
    }
    public function destroy($id)
    {
        $categorie = Categorie::find($id);
        if (!$categorie) {
            return response()->json([
                'success' => false,
                'message' => 'Categorie not found',
                'data' => null
            ], 404);
        }

        // delete data
        $categorie->delete();

        // response
        return response()->json([
            'success' => true,
            'message' => 'Categorie deleted successfully',
            'data' => null
        ], 200);
    }
}
