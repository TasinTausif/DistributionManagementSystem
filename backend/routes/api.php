<?php

use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\InventoryController;
use Illuminate\Support\Facades\Route;

// Product routes
Route::apiResource('products', ProductController::class);

// Inventory routes
Route::apiResource('inventory', InventoryController::class);
Route::get('inventory/product/{productId}', [InventoryController::class, 'getByProduct']);
