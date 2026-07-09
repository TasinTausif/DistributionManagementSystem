<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Http\Requests\ProductRequest;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::orderBy('created_at', 'desc')->get();
        
        return response()->json([
            'success' => true,
            'data' => $products
        ]);
    }

    public function store(ProductRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->storeAs('products', $imageName, 'public');
            $data['image'] = 'products/' . $imageName;
        }

        $product = Product::create($data);

        return response()->json([
            'success' => true,
            'data' => $product,
            'alert' => [
                'type' => 'success',
                'message' => 'Product created successfully!'
            ]
        ], 201);
    }

    public function show(string $id)
    {
        $product = Product::with('inventoryTransactions')->find($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'alert' => [
                    'type' => 'error',
                    'message' => 'Product not found!'
                ]
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $product
        ]);
    }

    public function update(ProductRequest $request, string $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'alert' => [
                    'type' => 'error',
                    'message' => 'Product not found!'
                ]
            ], 404);
        }

        $data = $request->validated();

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }

            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->storeAs('products', $imageName, 'public');
            $data['image'] = 'products/' . $imageName;
        }

        $product->update($data);

        return response()->json([
            'success' => true,
            'data' => $product,
            'alert' => [
                'type' => 'success',
                'message' => 'Product updated successfully!'
            ]
        ]);
    }

    public function destroy(string $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'alert' => [
                    'type' => 'error',
                    'message' => 'Product not found!'
                ]
            ], 404);
        }

        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return response()->json([
            'success' => true,
            'alert' => [
                'type' => 'success',
                'message' => 'Product deleted successfully!'
            ]
        ]);
    }

    public function image(string $path)
    {
        abort_unless(Storage::disk('public')->exists($path), 404);

        return Storage::disk('public')->response($path);
    }
}
