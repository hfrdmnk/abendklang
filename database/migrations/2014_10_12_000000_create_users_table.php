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
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->enum('mode', ['nostalgia', 'discovery'])->default('discovery');
            $table->string('spotify_id')->unique();
            $table->string('timezone')->default('UTC');
            $table->string('access_token');
            $table->string('refresh_token');
            $table->dateTime('access_token_expires_at');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
