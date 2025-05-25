<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LocationController extends Controller
{
    public function index (){
        $location = Location::all();
        if ($location ->isEmpty()){
            return response()->json([
                'success' => false,
                'message' => 'No data found',
                'data' => null
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'daftar lokasi',
            'data' => $location
        ], 200);
    }

    public function store (Request $request){
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
        $location = Location::create([
            'name' => $request->name,
        ]);

        // response
        return response()->json([
            'success' => true,
            'message' => 'Location created successfully',
            'data' => $location
        ], 201);
    }

    public function update (Request $request, $id){
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
        $location = Location::find($id);
        if (!$location) {
            return response()->json([
                'success' => false,
                'message' => 'Location not found',
                'data' => null
            ], 404);
        }

        $location->update([
            'name' => $request->name,
        ]);

        // response
        return response()->json([
            'success' => true,
            'message' => 'Location updated successfully',
            'data' => $location
        ], 200);
    }

    public function destroy ($id){
        $location = Location::find($id);
        if (!$location) {
            return response()->json([
                'success' => false,
                'message' => 'Location not found',
                'data' => null
            ], 404);
        }

        $location->delete();

        return response()->json([
            'success' => true,
            'message' => 'Location deleted successfully',
            'data' => null
        ], 200);
    }
}
