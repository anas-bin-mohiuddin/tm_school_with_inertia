<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BatchTeacher extends Model
{
    protected $fillable = [
        'course_batch_id', 'teacher_id', 'days'
    ];

    public function courseBatch()
    {
        return $this->belongsTo(CourseBatch::class);
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
        return $query->whereHas('courseBatch.course', fn($q) => $q->whereIn('school_id', $schoolIds));
    }
}
