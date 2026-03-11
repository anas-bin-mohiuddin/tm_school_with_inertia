<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::disableForeignKeyConstraints();

        Schema::create('students', function (Blueprint $table) {
        $table->id();

        $table->foreignId('school_id')
            ->constrained()
            ->cascadeOnDelete();

        $table->string('first_name');
        $table->string('last_name')->nullable();
        $table->string('registration_no')->nullable();

        $table->date('birth_date')->nullable();

        $table->string('gender',20)->nullable();
        $table->string('blood_group',10)->nullable();
        $table->string('religion',50)->nullable();

        $table->string('profile_photo')->nullable();

        $table->text('address')->nullable();

        $table->string('father_name')->nullable();
        $table->string('mother_name')->nullable();

        $table->string('father_occupation')->nullable();
        $table->string('father_phone_primary',20)->nullable();
        $table->string('father_phone_secondary',20)->nullable();
        $table->string('father_email')->nullable();

        $table->string('mother_occupation')->nullable();
        $table->string('mother_phone_primary',20)->nullable();
        $table->string('mother_phone_secondary',20)->nullable();
        $table->string('mother_email')->nullable();

        $table->timestamps();

        $table->unique(['registration_no','school_id']);
    });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
