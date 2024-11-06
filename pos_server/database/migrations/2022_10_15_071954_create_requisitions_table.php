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
        Schema::create('requisitions', function (Blueprint $table) {
            $table->id();
            $table->string('requisition_no')->nullable();
            $table->integer('requisition_category_id')->nullable();
            $table->string('expected_date_of_delivery')->nullable();
            $table->string('requisitor_contact_email')->nullable();
            $table->string('requisitor_phone_no')->nullable();
            $table->string('date_and_time')->nullable();
            $table->string('test_sample')->nullable();
            $table->integer('supplier_id')->nullable();
            $table->integer('delivery_mode_id')->nullable();
            $table->integer('payment_mode_id')->nullable();
            $table->string('recurring_order')->nullable();
            $table->integer('requisition_frequency_id')->nullable();
            $table->string('frequency_start_date')->nullable();
            $table->string('frequency_end_date')->nullable();
            $table->string('special_instruction')->nullable();
            $table->string('total_amount')->nullable();
            $table->string('vat_amount')->nullable();
            $table->string('tax_amount')->nullable();
            $table->string('commission_amount')->nullable();
            $table->string('total_bill_amount')->nullable();
            $table->string('requisition_status')->nullable();
            $table->string('is_ask_for_po')->nullable();
            $table->string('purchase_order_no')->nullable();
            $table->string('po_creator')->nullable();
            $table->string('po_create_date')->nullable();
            $table->string('po_is_sent')->nullable();
            $table->string('po_is_confirmed')->nullable();
            $table->string('mrr_is_done')->nullable();
            $table->string('mrr_done_by')->nullable();

            $table->string('store_in_is_done')->nullable();
            $table->integer('store_in_done_by')->nullable();
            $table->integer('reference_invoice_no')->nullable();
            $table->integer('reference_order_no')->nullable();

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
        Schema::dropIfExists('requisitions');
    }
};
