<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClassSubject extends Model
{
    protected $fillable = [
        'class_id', 'subject_id', 'teacher_id', 'school_id', 'status'
    ];

    public function class()
    {
        return $this->belongsTo(ClassModel::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function scopeAccessibleSchools($query, $schoolIds)
    {
        return $query->whereIn('school_id', $schoolIds);
    }
}
