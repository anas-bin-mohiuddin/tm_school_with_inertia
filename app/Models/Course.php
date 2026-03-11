<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'school_id', 'name', 'status'
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function courseBatches()
    {
        return $this->hasMany(CourseBatch::class);
    }

    public function scopeAccessibleSchools($query, $schoolIds)
    {
        return $query->whereIn('school_id', $schoolIds);
    }
}
