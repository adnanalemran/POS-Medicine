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
        Schema::create('product_return_invoices', function (Blueprint $table) {
            $table->id();
            $table->string('return_invoice_no')->nullable();
            $table->string('reference_invoice_no')->nullable();
            $table->string('member_id')->nullable();
            $table->string('total_amount')->nullable();
            $table->string('sales_invoice_id')->nullable();
            $table->string('sales_person_id')->nullable();
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
        Schema::dropIfExists('product_return_invoices');
    }
};
