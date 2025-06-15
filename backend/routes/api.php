<?php

use App\Http\Controllers\CategorieController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\StorageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();    
})->middleware('auth:sanctum');

// Login & Register
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public Access ( No Login )
Route::apiResource('items', ItemController::class)->only(['index', 'show']);
Route::get('/locations', [LocationController::class, 'index']);
Route::get('/locations/{id}', [LocationController::class, 'show']);
Route::get('/storages', [StorageController::class, 'index']);
Route::get('/storages/{id}', [StorageController::class, 'show']);
Route::get('/categories', [CategorieController::class, 'index']);
Route::get('/categories/{id}', [CategorieController::class, 'show']); 

// User Authenticated ( User )
Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/items', [ItemController::class, 'store']);
    Route::post('/verifications', [VerificationController::class, 'store']);
});

// Admin Authenticated ( Admin )
Route::middleware('auth:api', 'role:admin')->group(function () {
    
    // CRUD Users
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

    // CRUD Locations
    Route::post('/locations', [LocationController::class, 'store']);
    Route::put('/locations/{id}', [LocationController::class, 'update']);
    Route::delete('/locations/{id}', [LocationController::class, 'destroy']);

    // CRUD Storages
    Route::post('/storages', [StorageController::class, 'store']);
    Route::put('/storages/{id}', [StorageController::class, 'update']);
    Route::delete('/storages/{id}', [StorageController::class, 'destroy']);

    // CRUD Categories
    Route::post('/categories', [CategorieController::class, 'store']);
    Route::put('/categories/{id}', [CategorieController::class, 'update']);
    Route::delete('/categories/{id}', [CategorieController::class, 'destroy']);

    // CRUD Items
    Route::put('/items/{id}', [ItemController::class, 'update']);
    Route::delete('/items/{id}', [ItemController::class, 'destroy']);    
});

// Satpam Authenticated ( Satpam )
Route::middleware('auth:api', 'role:satpam')->group(function () {

    // CRUD Verifications
    Route::put('/verifications/{id}', [VerificationController::class, 'update']);
    Route::delete('/verifications/{id}', [VerificationController::class, 'destroy']);
});




