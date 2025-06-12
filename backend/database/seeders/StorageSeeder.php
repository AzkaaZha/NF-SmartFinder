<?php

namespace Database\Seeders;

use App\Models\Storage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StorageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Storage::create([
            'name' => 'Pos Satpam B-2',
            'contact' => '123456789',
            'users_id' => 1,
        ]);

        Storage::create([
            'name' => 'Pos Satpam B-1',
            'contact' => '123456789',
            'users_id' => 1,
        ]);

        Storage::create([
            'name' => 'Pos Satpam A-1',
            'contact' => '123456789',
            'users_id' => 1,
        ]);
    }
}
