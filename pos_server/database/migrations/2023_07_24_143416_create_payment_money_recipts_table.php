<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payment_money_recipts', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_no')->nullable();
            $table->string('money_recipt_no')->nullable();
            $table->string('paid_amount')->nullable();
            $table->string('requested_amount')->nullable();
            $table->string('payment_time')->nullable();
            $table->string('payment_date')->nullable();
            $table->string('payment_method')->nullable();
            $table->string('total_amount_paid')->nullable();
            $table->string('created_by_name')->nullable();
            $table->string('created_by_email')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payment_money_recipts');
    }
};
