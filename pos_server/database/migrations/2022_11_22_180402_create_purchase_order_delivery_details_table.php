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
        Schema::create('purchase_order_delivery_details', function (Blueprint $table) {
            $table->id();
            $table->integer('requisition_po_id')->nullable();

            $table->integer('preferred_delivery_mode_id')->nullable();
            $table->integer('preferred_payment_mode_id')->nullable();
            $table->integer('preferred_payment_channel_id')->nullable();
            $table->integer('delivery_channel_id')->nullable();
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
        Schema::dropIfExists('purchase_order_delivery_details');
    }
};
