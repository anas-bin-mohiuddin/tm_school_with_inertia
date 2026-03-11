<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PaymentRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'invoice_id' => 'required|integer',
            'user_id' => 'required|integer',
            'amount' => 'required|numeric',
            'status' => 'required',
        ];
    }
}
