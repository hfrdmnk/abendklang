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
        Schema::create('log_entries', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained()->onDelete('cascade');
            $table->string('song_id');
            $table->string('song_name');
            $table->string('artist_id');
            $table->string('artist_name');
            $table->string('album_id');
            $table->string('album_name');
            $table->string('cover_url');
            $table->enum('mode', ['nostalgia', 'discovery']);
            $table->integer('mood');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('log_entries');
    }
};
