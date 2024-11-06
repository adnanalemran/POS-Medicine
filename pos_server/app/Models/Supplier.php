<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Supplier extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'supplier_name',
        'supplier_category_id',
        'address_line_one',
        'address_line_two',
        'city_id',
        'country_id',
        'phone_number_one',
        'phone_number_two',
        'mobile',
        'fax',
        'commission',
        'vat',
        'tax',
        'email',
        'website',
        'mgt_title_id',
        'mgt_picture',
        'mgt_first_name',
        'mgt_last_name',
        'mgt_first_designation_id',
        'mgt_second_designation_id',
        'mgt_phn_no_one',
        'mgt_phn_no_two',
        'mgt_email',
        'mgt_fax',
        'scp_title_id',
        'scp_picture',
        'scp_first_name',
        'scp_last_name',
        'scp_family_name',
        'scp_nick_name',
        'scp_dob',
        'scp_nid',
        'scp_doj',
        'scp_department',
        'scp_designation_id',
        'scp_email',
        'scp_phn_no_one',
        'scp_phn_no_two',
        'scp_emergency_number',
        'sci_supervisor_name',
        'sci_designation_id',
        'sci_supervisor_phn_no',
        'sci_email',
        'sci_highest_degree_id',
        'ld_title_id',
        'ld_name',
        'ld_copy',
        'ld_issue_date',
        'ld_renew_date',
    ];

    public function supplier_brand() {
        return $this->hasMany(SuplierBrands::class, 'suplier_id', 'id');
    }
}
