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
        Schema::create('store_in_details', function (Blueprint $table) {
            $table->id();
            $table->string('store_in_master_id')->nullable();
            $table->string('drug_id')->nullable();
            $table->string('exp_date')->nullable();
            $table->string('no_of_box')->nullable();
            $table->string('total_qty')->nullable();
            $table->string('total_price')->nullable();
            $table->string('rack')->nullable();
            $table->string('self')->nullable();

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
        Schema::dropIfExists('store_in_details');
    }
};
