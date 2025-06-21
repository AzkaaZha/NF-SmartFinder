<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\StorageController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\UserDashboardController;
use App\Http\Controllers\VerificationController;

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES (No Login Required)
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/items', [ItemController::class, 'index']);
Route::get('/items/{id}', [ItemController::class, 'show']);

Route::get('/locations', [LocationController::class, 'index']);
Route::get('/locations/{id}', [LocationController::class, 'show']);

Route::get('/storages', [StorageController::class, 'index']);
Route::get('/storages/{id}', [StorageController::class, 'show']);

Route::get('/categories', [CategorieController::class, 'index']);
Route::get('/categories/{id}', [CategorieController::class, 'show']);

/*
|--------------------------------------------------------------------------
| AUTHENTICATED ROUTES (All Roles)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/items', [ItemController::class, 'store']);
    Route::post('/verifications', [VerificationController::class, 'store']);
    Route::get('/user/reports', [UserDashboardController::class, 'reports']);
    Route::get('/user/claims', [UserDashboardController::class, 'claims']);

    // Dashboard Summary
    Route::get('/dashboard-summary', function () {
        $userCount = \App\Models\User::count();
        $categoryCount = \App\Models\Categorie::count();
        $locationCount = \App\Models\Location::count();
        $lostItemsCount = \App\Models\Item::where('status', 'pending')->count();
        $verificationCount = \App\Models\Verification::where('status', 'pending')->count();

        $statistics = [
            'totalReports' => \App\Models\Item::count(),
            'verified' => \App\Models\Verification::where('status', 'approved')->count(),
            'unverified' => \App\Models\Verification::where('status', 'rejected')->count(),
        ];

        return response()->json([
            'success' => true,
            'data' => [
                'users' => $userCount,
                'categories' => $categoryCount,
                'locations' => $locationCount,
                'lostItems' => $lostItemsCount,
                'verifications' => $verificationCount,
                'statistics' => $statistics,
            ]
        ]);
    });
});

/*
|--------------------------------------------------------------------------
| ADMIN ROUTES
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:api', 'role:admin'])->group(function () {
    // Users
    Route::apiResource('users', UserController::class)->except(['show']);

    // Locations
    Route::apiResource('locations', LocationController::class)->only(['store', 'update', 'destroy']);

    // Storages
    Route::apiResource('storages', StorageController::class)->only(['store', 'update', 'destroy']);

    // Categories
    Route::apiResource('categories', CategorieController::class)->only(['store', 'update', 'destroy']);

    // Items (update & delete)
    Route::put('/items/{id}', [ItemController::class, 'update']);
    Route::delete('/items/{id}', [ItemController::class, 'destroy']);
});

/*
|--------------------------------------------------------------------------
| SATPAM ROUTES
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:api', 'role:satpam'])->group(function () {
    // Verifications
    Route::get('/verifications', [VerificationController::class, 'index']);
    Route::get('/verifications/{id}', [VerificationController::class, 'show']);
    Route::put('/verifications/{id}', [VerificationController::class, 'update']);
    Route::delete('/verifications/{id}', [VerificationController::class, 'destroy']);

    // Items
    Route::get('/items/{id}', [ItemController::class, 'show']);
    Route::put('/items/{id}', [ItemController::class, 'update']);
    Route::delete('/items/{id}', [ItemController::class, 'destroy']);

    // Storages
    Route::get('/storages/{id}', [StorageController::class, 'show']);
    Route::put('/storages/{id}', [StorageController::class, 'update']);
    Route::delete('/storages/{id}', [StorageController::class, 'destroy']);
});
