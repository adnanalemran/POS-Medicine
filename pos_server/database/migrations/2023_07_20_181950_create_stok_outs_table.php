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
        Schema::create('stok_outs', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_id')->nullable();
            $table->string('invoice_no')->nullable();
            $table->string('date')->nullable();
            $table->string('drug_id')->nullable();
            $table->string('pcs')->nullable();
            $table->string('total_price')->nullable();
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
        Schema::dropIfExists('stok_outs');
    }
};
