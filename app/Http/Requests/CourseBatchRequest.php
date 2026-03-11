<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourseBatchRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'course_id' => 'required|integer',
            'name' => 'required',
            'status' => 'required',
        ];
    }
}
