<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin123@gmail.com',
            'password' => bcrypt('admin123'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Satpam',
            'email' => 'satpam123@gmail.com',
            'password' => bcrypt('satpam123'),
            'role' => 'satpam',
        ]);

        User::create([
            'name' => 'User',
            'email' => 'user123@gmail.com',
            'password' => bcrypt('user123'),
            'role' => 'user',
        ]);

        User::create([
            'name' => 'User1',
            'email' => 'user1123@gmail.com',
            'password' => bcrypt('user1123'),
            'role' => 'user',
        ]);

        User::create([
            'name' => 'User2',
            'email' => 'user2123@gmail.com',
            'password' => bcrypt('user2123'),
            'role' => 'user',
        ]);

        User::create([
            'name' => 'User3',
            'email' => 'user3123@gmail.com',
            'password' => bcrypt('user3123'),
            'role' => 'user',
        ]);
    }
}
