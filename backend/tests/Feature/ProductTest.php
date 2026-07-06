<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Product;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function test_can_list_products(): void
    {
        Product::create([
            'name' => 'Test Product',
            'sku' => 'TEST-001',
            'category' => 'Testing',
            'type' => 'fresh_groceries',
            'price' => 10.00,
            'stock' => 5
        ]);

        $response = $this->get('/api/products');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => ['id', 'name', 'sku', 'price', 'stock']
                ]
            ]);
    }

    public function test_can_create_product(): void
    {
        $payload = [
            'name' => 'New Product',
            'sku' => 'NEW-001',
            'category' => 'New',
            'type' => 'household_essential',
            'price' => 20.00,
            'stock' => 10
        ];

        $response = $this->post('/api/products', $payload);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'data' => [
                    'name' => 'New Product',
                    'sku' => 'NEW-001'
                ]
            ]);
            
        $this->assertDatabaseHas('products', ['sku' => 'NEW-001']);
    }
}
