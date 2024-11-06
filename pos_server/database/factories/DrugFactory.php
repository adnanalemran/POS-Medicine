<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\Category;
use App\Models\DrugGenericName;
use App\Models\SubCategory;
use App\Models\UsualProvider;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Drug>
 */
class DrugFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'src_primary_key' => $this->faker->title(),
            'strength' => $this->faker->word(),
            'macrohealth_sg' => $this->faker->word(),
            'mims_sg' => $this->faker->word(),
            'mims_type' => $this->faker->word(),
            'guid' => $this->faker->words(5, true),
            'product_types' => $this->faker->randomDigit(),
            'drug_name' => $this->faker->title(),
            'drug_description' => $this->faker->sentence(),
            'qty' => $this->faker->randomDigit(),
            'rpts' => $this->faker->randomDigit(),
            'restriction' => $this->faker->randomDigit(),
            'bpp' => $this->faker->randomDigit(),
            'tgp' => $this->faker->randomDigit(),
            'generic_id' => $this->faker->randomElement(DrugGenericName::pluck('id')->toArray()),
            'usual_provider_id' => $this->faker->randomElement(UsualProvider::pluck('id')->toArray()),
            'is_favourite' => '1',
            'slug' => $this->faker->unique()->slug,
            'brand_id' => $this->faker->randomElement(Brand::pluck('id')->toArray()),
            'category_id' => $this->faker->randomElement(Category::pluck('id')->toArray()),
            'sub_category_id' => $this->faker->randomElement(SubCategory::pluck('id')->toArray()),
            'stock' => $this->faker->randomDigit(),
            'drug_code' => Str::random(10),
            'class' => $this->faker->word,
            'batch' => $this->faker->word,
            'expiry_date' => date('Y-m-d'),
            'drug_price' => $this->faker->randomDigit(),
            'offer_price' => $this->faker->randomDigit(),
            'drug_discount' => $this->faker->randomDigit(),
            'drug_weight' => $this->faker->randomDigit(),
            'drug_video' => $this->faker->imageUrl(500,500),
            'main_image' => $this->faker->image('public/files/drugs', 640, 480, null, false),
            'summary' => $this->faker->paragraph(),
            'condition' => $this->faker->randomElement(['new','popular','winter']),
        ];
    }
}
