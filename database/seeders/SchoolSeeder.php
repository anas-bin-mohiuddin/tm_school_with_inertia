<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\School;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class SchoolSeeder extends Seeder
{
    public function run()
    {
        // Create Head Office (Super Admin)
        $headOffice = School::create([
            'name' => 'Head Office School',
            'email' => 'headoffice@example.com',
            'contact_no' => '1234567890',
            'address' => 'Main City',
            'status' => 'active',
        ]);

        // Create Branch Schools
        $branchA = School::create([
            'parent_school_id' => $headOffice->id,
            'name' => 'Branch School A',
            'email' => 'brancha@example.com',
            'contact_no' => '1111111111',
            'address' => 'Area A',
            'status' => 'active',
        ]);
        $branchB = School::create([
            'parent_school_id' => $headOffice->id,
            'name' => 'Branch School B',
            'email' => 'branchb@example.com',
            'contact_no' => '2222222222',
            'address' => 'Area B',
            'status' => 'active',
        ]);

        // Fetch role ids
        $superAdminRoleId = \App\Models\Role::where('name', 'super_admin')->first()->id;
        $schoolAdminRoleId = \App\Models\Role::where('name', 'school_admin')->first()->id;
        $teacherRoleId = \App\Models\Role::where('name', 'teacher')->first()->id;

        // Create Super Admin User
        User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@example.com',
            'password' => Hash::make('password'),
            'school_id' => $headOffice->id,
            'role_id' => $superAdminRoleId,
        ]);

        // Create School Admin User for Branch A
        User::create([
            'name' => 'Admin A',
            'email' => 'admina@example.com',
            'password' => Hash::make('password'),
            'school_id' => $branchA->id,
            'role_id' => $schoolAdminRoleId,
        ]);

        // Create School Admin User for Branch B
        User::create([
            'name' => 'Admin B',
            'email' => 'adminb@example.com',
            'password' => Hash::make('password'),
            'school_id' => $branchB->id,
            'role_id' => $schoolAdminRoleId,
        ]);

        $testSchool = School::first();
        // Create Test User
        User::create([
            'name' => 'Test User',
            'email' => 'testuser@example.com',
            'password' => Hash::make('password'),
            'school_id' => $testSchool->id,
            'role_id' => $teacherRoleId,
        ]);
    }
}
