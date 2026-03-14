<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Teacher;

class ClassModel extends Model
{
    protected $table = 'classes';
    protected $fillable = [
        'school_id', 'name', 'numeric_value', 'class_teacher_id', 'admission_fee', 'recurring_type','recurring_fee'
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function sections()
    {
        return $this->hasMany(Section::class);
    }

    public function classSubjects()
    {
        return $this->hasMany(ClassSubject::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'class_teacher_id');
    }

    public function scopeAccessibleSchools($query, $schoolIds)
    {
        return $query->whereIn('school_id', $schoolIds);
    }
}
