<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SectionRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'class_id' => 'required|integer',
            'name' => 'required',
            'status' => 'required',
        ];
    }
}
