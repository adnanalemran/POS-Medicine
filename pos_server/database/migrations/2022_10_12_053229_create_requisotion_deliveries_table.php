<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up()
    {
        Schema::create('requisotion_deliveries', function (Blueprint $table) {
            $table->id();
            $table->string('delivery_name')->nullable();
            $table->string('delete_status')->nullable();
            $table->timestamps();
        });
    }

    
    public function down()
    {
        Schema::dropIfExists('requisotion_deliveries');
    }
};
