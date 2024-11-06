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
        Schema::create('users', function (Blueprint $table) {
            $table->string('id')->unique();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('mobile')->nullable();
            $table->enum('user_type', ['admin', 'supplier', 'manager', 'sales', 'client','empty'])->default('admin');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('db_name')->nullable();
            $table->integer('organization_id')->nullable();
            $table->integer('saas_user_id')->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
};
