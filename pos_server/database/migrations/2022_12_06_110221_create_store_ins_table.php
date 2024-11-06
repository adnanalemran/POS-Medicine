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
        Schema::create('store_ins', function (Blueprint $table) {
            
            $table->id();
            $table->string('store_in_status')->nullable();
            $table->string('store_in_record_no')->nullable();
            $table->string('contact_no')->nullable();
            $table->string('total_bill_amount')->nullable();
            $table->string('paid_amount')->nullable();
            $table->string('due_amount')->nullable();

            $table->integer('requisition_po_id')->nullable();
            $table->integer('manufacturer_id')->nullable();
            $table->integer('supplier_id')->nullable();
            $table->integer('mrr_id')->nullable();
            $table->integer('carrier_id')->nullable();

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
        Schema::dropIfExists('store_ins');
    }
};
