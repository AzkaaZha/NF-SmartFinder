<?php

namespace App\Http\Controllers;

use App\Models\Verification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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

    public function store(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'message' => 'required|string|max:255',
            'proof_image' => 'nullable|image|max:2048',
            'items_id' => 'required|exists:items,id',
            'users_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'data' => $validator->errors()
            ], 422);
        }

        // Tangani upload gambar jika ada
        $proof_image = null;
        if ($request->hasFile('proof_image')) {
            $proof_image = $request->file('proof_image');
            $proof_image->store('verifications', 'public');
            $proof_image = $proof_image->hashName();
        }

        // Buat verifikasi baru
        $verification = Verification::create([
            'message' => $request->input('message'),
            'proof_image' => $proof_image,
            'status' => 'pending',
            'items_id' => $request->input('items_id'),
            'users_id' => $request->input('users_id'), // <- PENTING
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Verification created successfully',
            'data' => $verification
        ], 201);
    }


    public function show($id){
        $verification = Verification::find($id);
        if (!$verification) {
            return response()->json([
                'success' => false,
                'message' => 'Verification not found',
                'data' => null
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Verification found',
            'data' => $verification
        ], 200);
    }

    public function update(Request $request, $id){
        $verification = Verification::find($id);
        if (!$verification) {
            return response()->json([
                'success' => false,
                'message' => 'Verification not found',
                'data' => null
            ], 404);
        }

        // validate the request
        $validator = Validator::make($request->all(), [
            'message' => 'required|string|max:255',
            'proof_image' => 'nullable|image|max:2048',
            'status' => 'required|in:pending,approved,rejected',
            'items_id' => 'required|exists:items,id',
            'users_id' => 'nullable|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'data' => $validator->errors()
            ], 422);
        }

        // handle proof_image update
        if ($request->hasFile('proof_image')) {
            // hapus foto lama jika ada
            if ($verification->proof_image) {
                Storage::disk('public')->delete('verifications/' . $verification->proof_image);
            }
            $proof_image = $request->file('proof_image');
            $proof_image->store('verifications', 'public');
            $verification->proof_image = $proof_image->hashName();
        }

        // update data lain
        $verification->message = $request->message;
        $verification->status = $request->status;
        $verification->save();

        return response()->json([
            'success' => true,
            'message' => 'Verification updated successfully',
            'data' => $verification
        ], 200);
    }

    public function destroy($id){
        $verification = Verification::find($id);
        if (!$verification) {
            return response()->json([
                'success' => false,
                'message' => 'Verification not found',
                'data' => null
            ], 404);
        }

        // hapus foto dari storage jika ada
        if ($verification->proof_image) {
            Storage::disk('public')->delete('verifications/' . $verification->proof_image);
        }

        $verification->delete();

        return response()->json([
            'success' => true,
            'message' => 'Verification deleted successfully',
            'data' => null
        ], 200);
    }
}
