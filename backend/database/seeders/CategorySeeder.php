<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'T-Shirts', 'label' => 'Áo thun'],
            ['name' => 'Hoodies', 'label' => 'Áo hoodie'],
            ['name' => 'Jackets', 'label' => 'Áo khoác'],
            ['name' => 'Blazers', 'label' => 'Áo vest'],
            ['name' => 'Pants', 'label' => 'Quần dài'],
            ['name' => 'Shorts', 'label' => 'Quần short'],
            ['name' => 'Shoes', 'label' => 'Giày dép'],
            ['name' => 'Hats', 'label' => 'Mũ nón'],
            ['name' => 'Bags', 'label' => 'Túi xách'],
            ['name' => 'Plushies', 'label' => 'Gấu bông'],
            ['name' => 'Accessories', 'label' => 'Phụ kiện'],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['name' => $category['name']], // Use name as the unique identifier to match frontend
                [
                    'slug' => Str::slug($category['name']),
                    'content' => $category['label'], // Store Vietnamese label in content for reference
                    'status' => 1,
                    'type' => 'product',
                ]
            );
        }
    }
}
