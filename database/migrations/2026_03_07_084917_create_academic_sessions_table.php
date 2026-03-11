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

        Schema::create('academic_sessions', function (Blueprint $table) {
                $table->id();

                $table->foreignId('school_id')
                    ->constrained()
                    ->cascadeOnDelete();

                $table->string('name',20);

                $table->date('start_date')->nullable();
                $table->date('end_date')->nullable();

                $table->boolean('is_current')->default(false);

                $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('academic_sessions');
    }
};
