<?php

use App\Http\Controllers\CategorieController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\StorageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VerificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

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