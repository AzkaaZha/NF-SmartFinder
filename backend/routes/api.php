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

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:api')->post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:api')->group(function () {

    // Route Admin : Full Access    
    Route::middleware('role:admin')->group(function () {
        Route::apiResource('users', UserController::class);
        Route::apiResource('locations', LocationController::class);
        Route::apiResource('storages', StorageController::class);
        Route::apiResource('categories', CategorieController::class);
        Route::apiResource('items', ItemController::class);
        Route::apiResource('verifications', VerificationController::class);
    });

    // Route Satpam 
    Route::middleware('role:satpam')->group(function () {
        Route::apiResource('users', UserController::class)->only('index', 'show', 'store', 'update');
        Route::apiResource('locations', LocationController::class)->only('index');
        Route::apiResource('storages', StorageController::class)->only('index', 'show', 'store', 'update');
        Route::apiResource('categories', CategorieController::class)->only('index', 'show', 'store', 'update');
        Route::apiResource('items', ItemController::class)->only('index', 'show', 'store', 'update');
        Route::apiResource('verifications', VerificationController::class)->only('index', 'show', 'store', 'update');
    });

    // Route User
    Route::middleware('role:user')->group(function () {
        Route::apiResource('users', UserController::class)->only('index', 'show', 'store', 'update');
        Route::apiResource('locations', LocationController::class)->only('index');
        Route::apiResource('storages', StorageController::class)->only('index', 'show', 'store', 'update');
        Route::apiResource('categories', CategorieController::class)->only('index', 'show', 'store', 'update');
        Route::apiResource('items', ItemController::class)->only('index', 'show', 'store', 'update');
        Route::apiResource('verifications', VerificationController::class)->only('index', 'show', 'store', 'update');
    });
});

Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

Route::get('/locations', [LocationController::class, 'index']);
Route::post('/locations', [LocationController::class, 'store']);
Route::put('/locations/{id}', [LocationController::class, 'update']);   
Route::delete('/locations/{id}', [LocationController::class, 'destroy']);

Route::get('/storages', [StorageController::class, 'index']);
Route::post('/storages', [StorageController::class, 'store']);
Route::get('/storages/{id}', [StorageController::class, 'show']);
Route::put('/storages/{id}', [StorageController::class, 'update']);
Route::delete('/storages/{id}', [StorageController::class, 'destroy']);

Route::get('/categories', [CategorieController::class, 'index']);
Route::post('/categories', [CategorieController::class, 'store']);
Route::get('/categories/{id}', [CategorieController::class, 'show']);
Route::put('/categories/{id}', [CategorieController::class, 'update']);
Route::delete('/categories/{id}', [CategorieController::class, 'destroy']);

Route::get('/items', [ItemController::class, 'index']);
Route::post('/items', [ItemController::class, 'store']);
Route::get('/items/{id}', [ItemController::class, 'show']);
Route::put('/items/{id}', [ItemController::class, 'update']);
Route::delete('/items/{id}', [ItemController::class, 'destroy']);

Route::get('/verifications', [VerificationController::class, 'index']);
Route::post('/verifications', [VerificationController::class, 'store']);
Route::get('/verifications/{id}', [VerificationController::class, 'show']);
Route::put('/verifications/{id}', [VerificationController::class, 'update']);
Route::delete('/verifications/{id}', [VerificationController::class, 'destroy']);