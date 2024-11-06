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
        Schema::create('manager_requisition_notifications', function (Blueprint $table) {
            $table->id();
            $table->integer('requisition_id')->nullable();
            $table->string('admin_read_status')->nullable();
            $table->string('sales_read_status')->nullable();
            $table->string('manager_read_status')->nullable();
            $table->string('supplier_read_status')->nullable();
            $table->string('read_status')->nullable();
            $table->string('action_users_role')->nullable();
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
        Schema::dropIfExists('manager_requisition_notifications');
    }
};
