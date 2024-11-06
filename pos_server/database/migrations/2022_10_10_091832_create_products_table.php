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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('item_code')->nullable();
            $table->string('name')->nullable();
            $table->string('brand')->nullable();
            $table->string('class')->nullable();
            $table->string('batch')->nullable();
            $table->string('exp_date')->nullable();
            $table->string('box_type')->nullable();
            $table->string('pkt_size')->nullable();
            $table->string('number_box_bottle')->nullable();
            $table->string('quantity')->nullable();
            $table->integer('unit')->default(0);
            $table->double('mrp')->default(0);
            $table->double('vat')->default(0);
            $table->double('purchase_price')->default(0);
            $table->double('total_price')->default(0);
            $table->string('Delete_status')->nullable();
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
        Schema::dropIfExists('products');
    }
};
