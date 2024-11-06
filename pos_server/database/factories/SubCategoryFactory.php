<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SubCategory>
 */
class SubCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'category_id' => '1',
            'title' => $this->faker->word,
            'slug' => $this->faker->unique()->slug,
            'photo' => $this->faker->imageUrl(60,60),
            'description' => $this->faker->text,
            'status' => 1
        ];
    }
}
