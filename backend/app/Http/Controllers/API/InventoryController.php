<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Inventory;
use App\Models\Product;
use App\Http\Requests\InventoryRequest;
use Illuminate\Support\Facades\DB;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $inventory = Inventory::with('product')->orderBy('created_at', 'desc')->get();
        
        return response()->json([
            'success' => true,
            'data' => $inventory
        ]);
    }

    /**
     * Store a newly created resource in storage (Purchase products).
     */
    public function store(InventoryRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->validated();
            
            $inventory = Inventory::create($data);
            
            $product = Product::find($data['product_id']);
            if ($data['transaction_type'] === 'purchase' || $data['transaction_type'] === 'adjustment') {
                $product->stock += $data['quantity'];
            } else if ($data['transaction_type'] === 'sale') {
                if ($product->stock < $data['quantity']) {
                    DB::rollBack();
                    return response()->json([
                        'success' => false,
                        'alert' => [
                            'type' => 'error',
                            'message' => 'Insufficient stock!'
                        ]
                    ], 400);
                }
                $product->stock -= $data['quantity'];
            }
            $product->save();
            
            DB::commit();

            return response()->json([
                'success' => true,
                'data' => $inventory->load('product'),
                'alert' => [
                    'type' => 'success',
                    'message' => 'Inventory transaction recorded successfully!'
                ]
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'alert' => [
                    'type' => 'error',
                    'message' => 'Failed to record transaction: ' . $e->getMessage()
                ]
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $inventory = Inventory::with('product')->find($id);

        if (!$inventory) {
            return response()->json([
                'success' => false,
                'alert' => [
                    'type' => 'error',
                    'message' => 'Inventory record not found!'
                ]
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $inventory
        ]);
    }

    /**
     * Get inventory by product.
     */
    public function getByProduct(string $productId)
    {
        $inventory = Inventory::where('product_id', $productId)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $inventory
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(InventoryRequest $request, string $id)
    {
        $inventory = Inventory::find($id);

        if (!$inventory) {
            return response()->json([
                'success' => false,
                'alert' => [
                    'type' => 'error',
                    'message' => 'Inventory record not found!'
                ]
            ], 404);
        }

        $inventory->update($request->validated());

        return response()->json([
            'success' => true,
            'data' => $inventory->load('product'),
            'alert' => [
                'type' => 'success',
                'message' => 'Inventory updated successfully!'
            ]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $inventory = Inventory::find($id);

        if (!$inventory) {
            return response()->json([
                'success' => false,
                'alert' => [
                    'type' => 'error',
                    'message' => 'Inventory record not found!'
                ]
            ], 404);
        }

        $inventory->delete();

        return response()->json([
            'success' => true,
            'alert' => [
                'type' => 'success',
                'message' => 'Inventory record deleted successfully!'
            ]
        ]);
    }
}
