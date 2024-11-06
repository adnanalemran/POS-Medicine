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
        Schema::create('adjustment_details', function (Blueprint $table) {
            $table->id();

            $table->string('adjustment_master_id')->nullable();
            
            $table->string('drug_id')->nullable();
            $table->string('noOfBox')->nullable();
            $table->string('pcs')->nullable();
            $table->string('totalPrice')->nullable();

            $table->string('increase')->nullable();
            $table->string('decrease')->nullable();
            $table->string('reason')->nullable();

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
        Schema::dropIfExists('adjustment_details');
    }
};
