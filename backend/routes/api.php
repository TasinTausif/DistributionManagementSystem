<?php

use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\InventoryController;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Route;

// Product routes
Route::get('product-images/{path}', function (string $path) {
    abort_unless(Storage::disk('public')->exists($path), 404);

    return Storage::disk('public')->response($path);
})->where('path', '.*');

Route::post('products/{product}', [ProductController::class, 'update']);
Route::apiResource('products', ProductController::class);

// Inventory routes
Route::apiResource('inventory', InventoryController::class);
Route::get('inventory/product/{productId}', [InventoryController::class, 'getByProduct']);
