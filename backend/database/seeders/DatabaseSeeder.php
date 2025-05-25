<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            StorageSeeder::class,
            CategorieSeeder::class,
            LocationSeeder::class,
            ItemSeeder::class,
            verificationSeeder::class,
        ]);
    }
}
