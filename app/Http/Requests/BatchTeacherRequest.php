<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BatchTeacherRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'course_batch_id' => 'required|integer',
            'teacher_id' => 'required|integer',
            'status' => 'required',
        ];
    }
}
