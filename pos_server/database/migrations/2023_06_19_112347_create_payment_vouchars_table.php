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
        Schema::create('payment_vouchars', function (Blueprint $table) {
            $table->id();
            $table->string('purchase_order_no');
            $table->string('supplier_id');
            $table->string('mrr_no');
            $table->string('total_amount');
            $table->string('paid_amount');
            $table->string('due_amount');
            $table->string('created_by');
            $table->string('created_by_name');
            $table->string('created_by_email');
            $table->string('invoice_no');
            $table->string('return_amount');
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
        Schema::dropIfExists('payment_vouchars');
    }
};
