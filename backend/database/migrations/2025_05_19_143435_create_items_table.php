<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->date('date');
            $table->text('description');
            $table->string('image')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected']);
            $table->foreignId('locations_id')->constrained('locations')->onDelete('cascade');
            $table->foreignId('categories_id')->constrained('categories')->onDelete('cascade');
            $table->foreignId('users_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('storages_id')->constrained('storages')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};