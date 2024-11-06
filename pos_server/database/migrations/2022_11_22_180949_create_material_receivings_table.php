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
        Schema::create('material_receivings', function (Blueprint $table) {
            $table->id();
            $table->integer('requisition_po_id')->nullable();
            $table->string('mrr_status')->nullable();
            $table->integer('manufacturer_id')->nullable();
            $table->string('mrr_expiry_date')->nullable();
            $table->string('mrr_no')->nullable();
            $table->integer('carrier_id')->nullable();
            $table->string('delivery_date')->nullable();
            $table->string('carried_by')->nullable();
            $table->string('contact_no')->nullable();
            $table->string('vehicle_no')->nullable();
            $table->string('remarks')->nullable();
            $table->string('payment_type')->nullable();
            $table->string('total_bill_amount')->nullable();
            $table->string('paid_amount')->nullable();
            $table->string('due_amount')->nullable();
            $table->string('delivery_no_docs')->nullable();
            $table->string('invoice_no_docs')->nullable();
            $table->string('delivery_chalan_docs')->nullable();

            $table->string('store_in_is_done')->nullable();
            $table->integer('store_in_done_by')->nullable();
            
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
        Schema::dropIfExists('material_receivings');
    }
};
