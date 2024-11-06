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
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->string('supplier_name')->nullable();
            $table->integer('supplier_category_id')->nullable();
            $table->string('address_line_one')->nullable();
            $table->string('address_line_two')->nullable();
            $table->integer('city_id')->nullable();
            $table->integer('country_id')->nullable();
            $table->string('phone_number_one')->nullable();
            $table->string('phone_number_two')->nullable();
            $table->string('mobile')->nullable();
            $table->string('fax')->nullable();
            $table->string('email')->nullable();
            $table->string('website')->nullable();
            $table->string('commission')->nullable();
            $table->integer('vat')->nullable();
            $table->integer('tax')->nullable();

            $table->integer('mgt_title_id')->nullable();
            $table->string('mgt_picture')->nullable();
            $table->string('mgt_first_name')->nullable();
            $table->string('mgt_last_name')->nullable();
            $table->integer('mgt_first_designation_id')->nullable();
            $table->integer('mgt_second_designation_id')->nullable();
            $table->string('mgt_phn_no_one')->nullable();
            $table->string('mgt_phn_no_two')->nullable();
            $table->string('mgt_email')->nullable();
            $table->string('mgt_fax')->nullable();

            $table->integer('scp_title_id')->nullable();
            $table->string('scp_picture')->nullable();
            $table->string('scp_first_name')->nullable();
            $table->string('scp_last_name')->nullable();
            $table->string('scp_family_name')->nullable();
            $table->string('scp_nick_name')->nullable();
            $table->string('scp_dob')->nullable();
            $table->string('scp_nid')->nullable();
            $table->string('scp_doj')->nullable();
            $table->string('scp_department')->nullable();
            $table->integer('scp_designation_id')->nullable();
            $table->string('scp_email')->nullable();
            $table->string('scp_phn_no_one')->nullable();
            $table->string('scp_phn_no_two')->nullable();
            $table->string('scp_emergency_number')->nullable();

            $table->string('sci_supervisor_name')->nullable();
            $table->integer('sci_designation_id')->nullable();
            $table->string('sci_supervisor_phn_no')->nullable();
            $table->string('sci_email')->nullable();
            $table->integer('sci_highest_degree_id')->nullable();

            $table->integer('ld_title_id')->nullable();
            $table->string('ld_name')->nullable();
            $table->string('ld_copy')->nullable();
            $table->string('ld_issue_date')->nullable();
            $table->string('ld_renew_date')->nullable();

            $table->integer('delete_status')->default(0);
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
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
        Schema::dropIfExists('suppliers');
    }
};
