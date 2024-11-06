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
        Schema::create('material_receiving_details', function (Blueprint $table) {
            $table->id();
            $table->integer('material_receiving_master_id')->nullable();
            $table->integer('drug_id')->nullable();
            $table->string('boxType')->nullable();
            $table->string('pktSize')->nullable();
            $table->string('noOfBox')->nullable();
            $table->string('unit')->nullable();
            $table->string('disc')->nullable();
            $table->string('req_unit')->nullable();
            $table->string('totalPrice')->nullable();
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
        Schema::dropIfExists('material_receiving_details');
    }
};
