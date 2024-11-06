<?php

namespace Database\Factories;

use App\Models\City;
use App\Models\Country;
use App\Models\Designation;
use App\Models\HighestDegree;
use App\Models\SupplierCategory;
use App\Models\Title;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Supplier>
 */
class SupplierFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'supplier_name' => $this->faker->word(),
            'supplier_category_id' => $this->faker->randomElement(SupplierCategory::pluck('id')->toArray()),
            'address_line_one' => $this->faker->word(),
            'address_line_two' => $this->faker->word(),
            'city_id' => $this->faker->randomElement(City::pluck('id')->toArray()),
            'country_id' => $this->faker->randomElement(Country::pluck('id')->toArray()),
            'phone_number_one' => $this->faker->randomDigit(),
            'phone_number_two' => $this->faker->randomDigit(),
            'mobile' => $this->faker->randomDigit(),
            'fax' => $this->faker->randomDigit(),
            'email' => $this->faker->randomDigit(),
            'website' => $this->faker->randomDigit(),
            'mgt_title_id' => $this->faker->randomElement(Title::pluck('id')->toArray()),
            'mgt_picture' => $this->faker->image('public/files/supplier', 640, 480, null, false),
            'mgt_first_name' => $this->faker->word(),
            'mgt_last_name' => $this->faker->word(),
            'mgt_first_designation_id' => $this->faker->randomElement(Designation::pluck('id')->toArray()),
            'mgt_second_designation_id' => $this->faker->randomElement(Designation::pluck('id')->toArray()),
            'mgt_phn_no_one' => $this->faker->randomDigit(),
            'mgt_phn_no_two' => $this->faker->randomDigit(),
            'mgt_email' => $this->faker->randomDigit(),
            'mgt_fax' => $this->faker->randomDigit(),
            'scp_title_id' => $this->faker->randomElement(Title::pluck('id')->toArray()),
            'scp_picture' => $this->faker->imageUrl(500,500),
            'scp_first_name' => $this->faker->word(),
            'scp_last_name' => $this->faker->word(),
            'scp_family_name' => $this->faker->word(),
            'scp_nick_name' => $this->faker->word(),
            'scp_dob' => $this->faker->date(),
            'scp_nid' => $this->faker->randomDigit(),
            'scp_doj' => $this->faker->date(),
            'scp_department' => $this->faker->word(),
            'scp_designation_id' => $this->faker->randomElement(Designation::pluck('id')->toArray()),
            'scp_email' => $this->faker->word(),
            'scp_phn_no_one' => $this->faker->randomDigit(),
            'scp_phn_no_two' => $this->faker->randomDigit(),
            'scp_emergency_number' => $this->faker->randomDigit(),
            'sci_supervisor_name' => $this->faker->word(),
            'sci_designation_id' => $this->faker->randomElement(Designation::pluck('id')->toArray()),
            'sci_supervisor_phn_no' => $this->faker->randomDigit(),
            'sci_email' => $this->faker->randomDigit(),
            'sci_highest_degree_id' => $this->faker->randomElement(HighestDegree::pluck('id')->toArray()),
            'ld_title_id' => $this->faker->randomElement(Title::pluck('id')->toArray()),
            'ld_name' => $this->faker->word(),
            'ld_copy' => $this->faker->word(),
            'ld_issue_date' => $this->faker->date(),
            'ld_renew_date' => $this->faker->date(),
        ];
    }
}
