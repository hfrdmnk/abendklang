<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Track extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'title',
        'artists',
        'album',
        'album_art',
        'preview_url',
        'spotify_url',
        'spotify_uri',
    ];

    protected $casts = [
        'artists' => 'array',
    ];

    public function logEntries()
    {
        return $this->hasMany(LogEntry::class);
    }
}
