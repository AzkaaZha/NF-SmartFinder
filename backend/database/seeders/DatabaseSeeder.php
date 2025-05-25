<?php

namespace Database\Seeders;

<<<<<<< HEAD
=======
use App\Models\Item;
>>>>>>> 144cc3c (Upload Login and Register)
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
<<<<<<< HEAD
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
=======
        $this->call([
            UserSeeder::class,
            StorageSeeder::class,
            CategorieSeeder::class,
            LocationSeeder::class,
            ItemSeeder::class,
            verificationSeeder::class,
>>>>>>> 144cc3c (Upload Login and Register)
        ]);
    }
}
