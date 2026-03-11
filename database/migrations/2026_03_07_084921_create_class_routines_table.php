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

        Schema::create('class_routines', function (Blueprint $table) {

            $table->id();

            $table->foreignId('class_id')
                ->nullable()
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('section_id')
                ->nullable()
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('subject_id')
                ->nullable()
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('teacher_id')
                ->nullable()
                ->constrained('teachers')
                ->nullOnDelete();

            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();

            $table->tinyInteger('day')->nullable(); 
            // 1 = Monday, 2 = Tuesday ... 7 = Sunday

            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('class_routines');
    }
};
