<?php

use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\InventoryController;
use Illuminate\Support\Facades\Route;

Route::get('product-images/{path}', [ProductController::class, 'image'])->where('path', '.*');
Route::post('products/{product}', [ProductController::class, 'update']);
Route::apiResource('products', ProductController::class);

Route::apiResource('inventory', InventoryController::class);
Route::get('inventory/product/{productId}', [InventoryController::class, 'getByProduct']);
