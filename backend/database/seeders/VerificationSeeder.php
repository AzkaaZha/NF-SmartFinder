<?php

namespace Database\Seeders;

use App\Models\Verification;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VerificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Verification::create([
            'message' => 'ini adalah hp saya',
            'proof_image' => 'bukti1.jpg',
            'status' => 'pending',
            'items_id' => 1,
            'users_id' => 3,
        ]);
    }
}
