<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EnrollmentRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'student_id' => 'required|integer',
            'type' => 'required',
            'class_id' => 'nullable|integer',
            'section_id' => 'nullable|integer',
            'course_batch_id' => 'nullable|integer',
            'roll_number' => 'nullable',
            'academic_session_id' => 'nullable|integer',
        ];
    }
}
