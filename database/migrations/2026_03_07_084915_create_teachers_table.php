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

        Schema::create('teachers', function (Blueprint $table) {

            $table->id();

            $table->foreignId('user_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->foreignId('school_id')
                ->constrained()
                ->cascadeOnDelete();
                
            $table->string('name');
            $table->string('designation')->nullable();
            $table->date('joining_date')->nullable();

            $table->string('qualification')->nullable();
            $table->integer('experience')->nullable();

            $table->decimal('salary',10,2)->nullable();

            $table->string('profile_photo')->nullable();

            $table->boolean('status')->default(true);

            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};
