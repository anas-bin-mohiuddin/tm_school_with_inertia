<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InvoiceRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'enrollment_id' => 'required|integer',
            'type' => 'required',
            'amount' => 'required|numeric',
            'status' => 'required',
        ];
    }
}
