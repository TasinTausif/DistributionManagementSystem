<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InventoryRequest extends FormRequest
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
        if ($this->isMethod('post')) {
            // Store rules
            return [
                'product_id' => 'required|exists:products,id',
                'quantity' => 'required|integer|min:1',
                'purchase_price' => 'required|numeric|min:0',
                'transaction_type' => 'required|in:purchase,sale,adjustment',
                'notes' => 'nullable|string'
            ];
        }

        if ($this->isMethod('put') || $this->isMethod('patch')) {
            // Update rules
            return [
                'quantity' => 'sometimes|required|integer|min:1',
                'purchase_price' => 'sometimes|required|numeric|min:0',
                'notes' => 'nullable|string'
            ];
        }

        return [];
    }
}
