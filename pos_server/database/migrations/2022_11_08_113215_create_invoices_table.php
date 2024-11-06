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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_no')->nullable();
            $table->integer('member_id')->nullable();
            $table->string('sub_total')->nullable();
            $table->string('vat_tax_amount')->nullable();
            $table->string('payment_status')->nullable();
            $table->string('grand_total')->nullable();
            $table->string('discount_type')->nullable();
            $table->string('discount_amount')->nullable();
            $table->string('prescription_image')->nullable();

            $table->string('special_discount')->nullable();
            $table->string('paid_amount')->nullable();
            $table->string('return_amount')->nullable();

            $table->string('return_status')->nullable();
            $table->string('invoice_from')->nullable();
            $table->string('ref_invoice')->nullable();
            $table->string('invoice_type')->nullable();
            $table->boolean('is_sync')->default(0);
            $table->string('payment_date')->nullable();

            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->string('delete_status')->nullable();
            $table->softDeletes();
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
        Schema::dropIfExists('invoices');
    }
};
