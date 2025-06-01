<?php

namespace Database\Seeders;

use App\Models\Item;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Item::create(
            [
            'name' => 'hp',
            'date' => '2024-05-22',
            'description' => 'merek xiomi',
            'image' => 'xiomi.jpg',
            'status' => 'pending',
            'locations_id' => 1,
            'categories_id' => 1,
            'users_id' => 1,
            'storages_id' => 1,
            ],
        );

        Item::create(
            [
            'name' => 'Laptop',
            'date' => '2024-05-22',
            'description' => 'merek asus',
            'image' => 'asus.jpg',
            'status' => 'pending',
            'locations_id' => 1,
            'categories_id' => 1,
            'users_id' => 1,
            'storages_id' => 1,
            ],
        );

        Item::create(
            [
            'name' => 'Charger Laptop',
            'date' => '2024-05-22',
            'description' => 'merek acer',
            'image' => 'asus.jpg',
            'status' => 'pending',
            'locations_id' => 1,
            'categories_id' => 1,
            'users_id' => 1,
            'storages_id' => 1,
            ],
        );
    }
}
