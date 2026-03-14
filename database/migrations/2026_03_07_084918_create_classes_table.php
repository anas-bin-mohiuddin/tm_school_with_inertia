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

        Schema::create('classes', function (Blueprint $table) {

            $table->id();

            $table->string('name')->nullable();

            $table->integer('numeric_value')->nullable();

            $table->foreignId('class_teacher_id')
                ->nullable()
                ->constrained('teachers')
                ->nullOnDelete();

            $table->decimal('admission_fee',8,2)->nullable();
            $table->decimal('recurring_fee',8,2)->nullable();

            $table->string('recurring_type')->nullable();
            $table->foreignId('school_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classes');
    }
};
