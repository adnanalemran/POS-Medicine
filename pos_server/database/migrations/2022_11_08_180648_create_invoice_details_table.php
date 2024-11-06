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
        Schema::create('invoice_details', function (Blueprint $table) {
           
            $table->id();
            $table->integer('invoice_master_id')->nullable();
            $table->integer('drug_id')->nullable();
            $table->string('no_of_box_or_leaf')->nullable();
            $table->string('qty')->nullable();
            $table->string('total_price')->nullable();
            $table->string('toal_price_witout_discount')->nullable();
            
            $table->string('cash_drug_discount')->nullable();
            $table->string('card_drug_discount')->nullable();
            $table->string('digital_drug_discount')->nullable();
            $table->string('payment_status')->nullable();

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
        Schema::dropIfExists('invoice_details');
    }
};
