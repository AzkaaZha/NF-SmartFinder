<?php

namespace App\Http\Controllers;

use App\Models\Verification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VerificationController extends Controller
{
    public function index(){
        $verifications = Verification::all();
        if ($verifications->isEmpty()){
            return response()->json([
                'success' => false,
                'message' => 'No data found',
                'data' => null
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'daftar verifikasi',
            'data' => $verifications
        ], 200);
    }

    public function store (Request $request){
        // validate the request
        $validator = Validator::make($request->all(), [
            'message' => 'required|string|max:255',
            'proof_image' => 'nullable|image|max:2048',
            'items_id' => 'required|exists:items,id',
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
        $proof_image = $request->file('proof_image');
        $proof_image->store('verifications', 'public');

        // buat data
        $verification = Verification::create([
            'message' => $request->message,
            'proof_image' => $proof_image ? $proof_image->hashName() : null,
            'status' => 'pending',
            'items_id' => $request->items_id,
        ]);

        // response
        return response()->json([
            'success' => true,
            'message' => 'Verification created successfully',
            'data' => $verification
        ], 201);
    }
}
