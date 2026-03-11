<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClassSubjectRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'class_id' => 'required|integer',
            'subject_id' => 'required|integer',
            'teacher_id' => 'required|integer',
            'status' => 'required',
        ];
    }
}
