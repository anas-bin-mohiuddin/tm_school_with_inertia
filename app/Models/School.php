<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    protected $fillable = [
        'parent_school_id', 'name', 'email', 'contact_no', 'address', 'logo', 'status'
    ];

    public function parent()
    {
        return $this->belongsTo(School::class, 'parent_school_id');
    }

    public function children()
    {
        return $this->hasMany(School::class, 'parent_school_id');
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function getAccessibleSchoolIds()
    {
        $ids = [$this->id];
        foreach ($this->children as $child) {
            $ids = array_merge($ids, $child->getAccessibleSchoolIds());
        }
        return $ids;
    }
}
