<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'school_id', 'first_name', 'last_name', 'address', 'registration_no',
        'birth_date', 'gender', 'blood_group', 'religion', 'profile_photo',
        'father_name', 'mother_name', 'father_occupation', 'status',
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function scopeAccessibleSchools($query, $schoolIds)
    {
        return $query->whereIn('school_id', $schoolIds);
    }
}
