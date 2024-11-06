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
        Schema::create('drugs', function (Blueprint $table) {
            $table->id();
            $table->string('src_primary_key')->nullable();
            $table->string('strength')->nullable();
            $table->string('macrohealth_sg')->nullable();
            $table->string('mims_sg')->nullable();
            $table->string('mims_type')->nullable();
            $table->string('guid')->nullable();
            $table->string('product_types')->nullable();
            $table->string('drug_name')->nullable();
            $table->longText('drug_description')->nullable();
            $table->string('qty')->nullable();
            $table->string('rpts')->nullable();
            $table->string('restriction')->nullable();
            $table->string('bpp')->nullable();
            $table->string('tgp')->nullable();
            $table->unsignedBigInteger('generic_id')->nullable();
            $table->unsignedBigInteger('usual_provider_id')->nullable();
            $table->string('is_favourite')->nullable();
            $table->string('slug')->nullable();
            $table->unsignedBigInteger('brand_id')->nullable();
            $table->unsignedBigInteger('category_id')->nullable();
            $table->unsignedBigInteger('sub_category_id')->nullable();
            $table->integer('stock')->nullable();
            $table->string('drug_code')->nullable();
            $table->string('drug_price')->nullable();
            $table->string('offer_price')->nullable();
            $table->string('drug_discount')->nullable();
            $table->string('drug_weight')->nullable();
            $table->string('drug_video')->nullable();
            $table->string('main_image')->nullable();
            $table->string('summary')->nullable();
            $table->string('condition')->nullable();
            $table->string('status')->nullable();
            $table->integer('delete_status')->default(0);
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->integer('vat')->nullable();
            $table->string('expiry_date');
            $table->integer('purchase_price_with_vat')->nullable();
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
        Schema::dropIfExists('drugs');
    }
};
