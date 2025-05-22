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
}
