<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $fillable = [
        'school_id', 'user_id', 'name', 'designation', 'joining_date', 'qualification', 'experience', 'salary', 'profile_photo', 'status'
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function classSubjects()
    {
        return $this->hasMany(ClassSubject::class);
    }

    public function batchTeachers()
    {
        return $this->hasMany(BatchTeacher::class);
    }

    public function scopeAccessibleSchools($query, $schoolIds)
    {
        return $query->whereIn('school_id', $schoolIds);
    }
}
