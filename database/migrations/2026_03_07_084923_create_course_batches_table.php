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

        Schema::create('course_batches', function (Blueprint $table) {

                $table->id();

                $table->foreignId('course_id')
                    ->constrained()
                    ->cascadeOnDelete();

                $table->string('name')->nullable();

                $table->date('start_date')->nullable();

                $table->date('end_date')->nullable();

                $table->time('start_time')->nullable();
                $table->time('end_time')->nullable();

                $table->timestamps();
            });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_batches');
    }
};
