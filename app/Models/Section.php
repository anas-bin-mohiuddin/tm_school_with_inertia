<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    protected $fillable = [
        'class_id', 'school_id', 'name', 'status'
    ];

    public function class()
    {
        return $this->belongsTo(ClassModel::class);
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
