<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Inventory;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Clear existing data
        Inventory::truncate();
        Product::truncate();

        $products = [
            [
                'name' => 'Organic Avocados',
                'sku' => 'FRT-AVO-001',
                'category' => 'Fruits',
                'type' => 'fresh_groceries',
                'price' => 2.49,
                'stock' => 50,
                'description' => 'Premium organic avocados, perfect for guacamole.',
                'image' => null,
                'is_active' => true,
            ],
            [
                'name' => 'Whole Milk',
                'sku' => 'DAIRY-MILK-001',
                'category' => 'Dairy',
                'type' => 'fresh_groceries',
                'price' => 3.99,
                'stock' => 30,
                'description' => 'Farm fresh whole milk, 1 gallon.',
                'image' => null,
                'is_active' => true,
            ],
            [
                'name' => 'Dish Soap',
                'sku' => 'HH-SOAP-001',
                'category' => 'Cleaning',
                'type' => 'household_essential',
                'price' => 4.50,
                'stock' => 100,
                'description' => 'Lemon scented grease fighting dish soap.',
                'image' => null,
                'is_active' => true,
            ],
            [
                'name' => 'Artisanal Honey',
                'sku' => 'SPC-HONEY-001',
                'category' => 'Pantry',
                'type' => 'specialty',
                'price' => 12.99,
                'stock' => 15,
                'description' => 'Locally sourced raw wildflower honey.',
                'image' => null,
                'is_active' => true,
            ],
            [
                'name' => 'Paper Towels',
                'sku' => 'HH-PAPER-001',
                'category' => 'Paper Goods',
                'type' => 'household_essential',
                'price' => 15.99,
                'stock' => 0, // Out of stock example
                'description' => 'Super absorbent paper towels, 12 pack.',
                'image' => null,
                'is_active' => true,
            ],
        ];

        foreach ($products as $data) {
            $product = Product::create($data);

            // Add initial inventory transaction
            if ($product->stock > 0) {
                Inventory::create([
                    'product_id' => $product->id,
                    'quantity' => $product->stock,
                    'purchase_price' => $product->price * 0.6, // Cost is 60% of price
                    'transaction_type' => 'purchase',
                    'notes' => 'Initial stock seeding',
                ]);
            }
        }

        // Add some random transactions
        $avocado = Product::where('sku', 'FRT-AVO-001')->first();
        if ($avocado) {
            // A sale
            Inventory::create([
                'product_id' => $avocado->id,
                'quantity' => 5,
                'purchase_price' => $avocado->price,
                'transaction_type' => 'sale',
                'notes' => 'Customer order #1001',
            ]);
            $avocado->decrement('stock', 5);
        }
    }
}
