<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseBatch extends Model
{
    protected $fillable = [
        'course_id', 'school_id', 'name', 'status'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function school()
    {
        return $this->belongsTo(School::class);
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
