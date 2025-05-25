<?php

namespace Database\Seeders;

use App\Models\Categorie;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Categorie::create(
            ['name' => 'Elektronik'], 
        );
        
        Categorie::create(
            [ 'name' => 'Kendaraan'],
        );

        Categorie::create(
            [ 'name' => 'Pakaian'], 
        );

        Categorie::create(
            [ 'name' => 'Makanan'], 
        );
        
        Categorie::create(
            [ 'name' => 'Perabotan']
        );
    }
}
