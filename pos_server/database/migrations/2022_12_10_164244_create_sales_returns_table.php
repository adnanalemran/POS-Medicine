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
        Schema::create('sales_returns', function (Blueprint $table) {
            $table->id();
            $table->string('requisition_po_id')->nullable();
            $table->string('purchase_order_no')->nullable();

            $table->string('return_date')->nullable();
            $table->string('return_by')->nullable();
            $table->string('reasons_of_return')->nullable();
            $table->string('product_details_note')->nullable();
            $table->string('total_amount')->nullable();
            $table->string('sales_return_status')->nullable();

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
        Schema::dropIfExists('sales_returns');
    }
};
