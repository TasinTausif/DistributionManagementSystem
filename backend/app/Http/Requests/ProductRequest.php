<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        $productId = $this->route('product');
        
        if ($this->isMethod('post')) {
            // Store rules
            return [
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'category' => 'required|string|max:255',
                'price' => 'required|numeric|min:0',
                'stock' => 'required|integer|min:0',
                'sku' => 'required|string|unique:products,sku',
                'type' => 'required|in:fresh_groceries,household_essential,specialty',
                'is_active' => 'sometimes|boolean',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
            ];
        }

        if ($this->isMethod('put') || $this->isMethod('patch')) {
            // Update rules
            return [
                'name' => 'sometimes|required|string|max:255',
                'description' => 'nullable|string',
                'category' => 'sometimes|required|string|max:255',
                'price' => 'sometimes|required|numeric|min:0',
                'stock' => 'sometimes|required|integer|min:0',
                'sku' => 'sometimes|required|string|unique:products,sku,' . $productId,
                'type' => 'sometimes|required|in:fresh_groceries,household_essential,specialty',
                'is_active' => 'sometimes|boolean',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
            ];
        }

        return [];
    }
}
