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

        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('enrollment_id')->nullable();
            $table->foreign('enrollment_id')->references('id')->on('enrollments');
            $table->decimal('total_amount', 10, 2)->nullable();
            $table->enum('status', ["paid","unpaid","partial"]);
            $table->string('type', 50)->nullable()->comment('school_admission, program_admission, program_monthly_fee');
            $table->string('billing_term')->nullable();
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
