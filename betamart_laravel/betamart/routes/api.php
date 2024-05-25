<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;

// api end point for user authorization
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// For user api end points
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::post('/addUser', [UserController::class, 'store']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/removeUser/{id}', [UserController::class, 'destroy']);
Route::post('/login', [UserController::class, 'login']);

// For product api end points
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::post('/addProduct', [ProductController::class, 'store']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/removeProduct/{id}', [ProductController::class, 'destroy']);

// For cart api end points
Route::get('/carts', [CartController::class, 'index']);
Route::get('/carts/{id}', [CartController::class, 'show']);
Route::post('/addToCart', [CartController::class, 'store']);
Route::put('/carts/{id}', [CartController::class, 'update']);
Route::delete('/removeCart/{id}', [CartController::class, 'destroy']);
Route::delete('/carts', [CartController::class, 'removeAll']);
