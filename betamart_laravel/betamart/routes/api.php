<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;

// api end point for user authorization
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// For product api end points
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

// For cart api end points
Route::get('/carts', [CartController::class, 'index']);
Route::get('/carts/{id}', [CartController::class, 'show']);
Route::post('/addToCart', [CartController::class, 'store']);
Route::put('/carts/{id}', [CartController::class, 'update']);
Route::delete('/removeCart/{id}', [CartController::class, 'destroy']);
Route::delete('/carts', [CartController::class, 'removeAll']);
