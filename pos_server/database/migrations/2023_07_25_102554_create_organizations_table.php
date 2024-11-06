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
        Schema::create('organizations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name')->nullable();
            $table->text('address')->nullable();
            $table->string('mobile')->nullable();
            $table->string('email')->unique();
            $table->string('contact_person_name')->nullable();
            $table->string('contact_person_mobile')->nullable();
            $table->string('contact_person_email')->nullable();
            $table->string('contact_person_designation')->nullable();
            $table->string('description')->nullable();
            $table->string('logo')->nullable();
            $table->string('db_name')->nullable();
            $table->string('meta_tags')->nullable();
            $table->tinyInteger('status')->comment('0: inactive 1:active')->default(1);
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
        Schema::dropIfExists('organizations');
    }
};
