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
        Schema::create('adjustments', function (Blueprint $table) {
            $table->id();

            $table->string('adjustment_no')->nullable();
            $table->string('adjustment_date')->nullable();
            $table->string('requested_by')->nullable();
            $table->string('phone_no')->nullable();
            $table->string('email_address')->nullable();
            $table->string('remark')->nullable();
            $table->string('notes')->nullable();
            $table->string('adjustment_status')->nullable();

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
        Schema::dropIfExists('adjustments');
    }
};
