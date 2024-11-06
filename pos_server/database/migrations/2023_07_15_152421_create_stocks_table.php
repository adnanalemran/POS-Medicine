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
        Schema::create('stocks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
            $table->float('price')->nullable();
            $table->integer('stock');
            $table->string('manufacturer')->nullable();
            $table->integer('opening_stock')->nullable();
            $table->string('drug_id')->nullable();
            $table->string('item_code')->nullable();
            $table->string('pkt_size')->nullable();
            $table->string('box_type')->nullable();
            $table->string('unit')->nullable();
            $table->string('rack')->nullable();
            $table->string('shelf')->nullable();
            $table->string('expire_date')->nullable();
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
        Schema::dropIfExists('stocks');
    }
};
