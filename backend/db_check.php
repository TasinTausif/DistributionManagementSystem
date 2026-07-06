<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    echo "Testing Database Connection...\n";
    
    // Create Product
    $product = App\Models\Product::create([
        'name' => 'MySQL Verified Product',
        'sku' => 'TEST-MYSQL-' . time(),
        'description' => 'Automatically created to verify MySQL connection',
        'category' => 'Test',
        'type' => 'fresh_groceries',
        'price' => 19.99,
        'stock' => 100,
        'is_active' => true
    ]);
    
    echo "✅ Product Created: {$product->name} (ID: {$product->id})\n";
    
    // Create Inventory Transaction
    $inventory = App\Models\Inventory::create([
        'product_id' => $product->id,
        'quantity' => 100,
        'purchase_price' => 10.50,
        'transaction_type' => 'purchase',
        'notes' => 'Initial stock verification'
    ]);
    
    echo "✅ Inventory Transaction Logged for Product ID: {$inventory->product_id}\n";
    echo "✅ Database connection and models are working perfectly!\n";
    
} catch (\Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}
