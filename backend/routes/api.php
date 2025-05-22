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

Route::get('/locations', [LocationController::class, 'index']);
Route::post('/locations', [LocationController::class, 'store']);

Route::get('/storages', [StorageController::class, 'index']);
Route::post('/storages', [StorageController::class, 'store']);

Route::get('/categories', [CategorieController::class, 'index']);
Route::post('/categories', [CategorieController::class, 'store']);

Route::get('/items', [ItemController::class, 'index']);
Route::post('/items', [ItemController::class, 'store']);

Route::get('/verifications', [VerificationController::class, 'index']);
Route::post('/verifications', [VerificationController::class, 'store']);