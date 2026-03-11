<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Seed roles first
        $this->call(RoleSeeder::class);

        // Create test school first
        $testSchool = \App\Models\School::create([
            'name' => 'Test School',
            'email' => 'testschool@example.com',
            'contact_no' => '3333333333',
            'address' => 'Test Area',
            'status' => 'active',
        ]);

        // Assign test school id to test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'school_id' => $testSchool->id,
        ]);

        $this->call(SchoolSeeder::class);
    }
}
