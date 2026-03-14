<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    protected $fillable = [
        'class_id', 'name'
    ];

    public function class()
    {
        return $this->belongsTo(ClassModel::class);
    }

    public function scopeAccessibleSchools($query, $schoolIds)
    {
        return $query->whereHas('class', fn($q) => $q->whereIn('school_id', $schoolIds));
    }
}
