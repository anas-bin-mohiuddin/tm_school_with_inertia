<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run()
    {
        Role::insert([
            ['name' => 'super_admin'],
            ['name' => 'school_admin'],
            ['name' => 'teacher'],
            ['name' => 'student'],
        ]);
    }
}
