<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminAuthController;

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

// Admin Routes - Checked
Route::prefix('admin')->group(function () {
    Route::post('/login', [AdminAuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AdminAuthController::class, 'logout']);
        Route::get('/me', [AdminAuthController::class, 'me']);
        
        // Fix for admin customers route
        Route::get('/customers', [CustomerController::class, 'index']);
        Route::get('/customers/{id}', [CustomerController::class, 'show']);
        
        // Reuse existing controllers for read-only admin access for now
        Route::apiResource('/products', ProductController::class);
        Route::apiResource('/categories', CategoryController::class)->only(['index', 'show']);
        Route::apiResource('/posts', PostController::class)->only(['index', 'show']);
        Route::apiResource('/orders', \App\Http\Controllers\Api\OrderController::class)->only(['index', 'show']);
        Route::put('/orders/{id}/status', [\App\Http\Controllers\Api\OrderController::class, 'updateStatus']);
    });
});

Route::apiResource('/categories', CategoryController::class)
     ->only(['index', 'show']);
Route::apiResource('/products', ProductController::class)
     ->only(['index', 'show']);
Route::apiResource('/posts', PostController::class)
     ->only(['index', 'show']);
Route::apiResource('/customers', CustomerController::class)
    ->only(['index', 'show']);

Route::post('/orders', [\App\Http\Controllers\Api\OrderController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/orders', [\App\Http\Controllers\Api\OrderController::class, 'index']);
    Route::get('/orders/{id}', [\App\Http\Controllers\Api\OrderController::class, 'show']);
});

Route::get('/products/{id}/reviews', [\App\Http\Controllers\Api\ReviewController::class, 'index']);
Route::post('/reviews', [\App\Http\Controllers\Api\ReviewController::class, 'store']);


