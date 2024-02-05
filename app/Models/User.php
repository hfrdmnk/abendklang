<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Log;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'spotify_id',
        'name',
        'access_token',
        'refresh_token',
        'access_token_expires_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'remember_token',
        'spotify_id',
        'access_token',
        'refresh_token',
        'access_token_expires_at',
    ];

    protected $appends = [
        'todays_log_entry',
    ];

    protected $with = [
        'logEntries',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'access_token_expires_at' => 'datetime',
    ];

    public function logEntries()
    {
        return $this->hasMany(LogEntry::class);
    }

    public function getTodaysLogEntryAttribute()
    {
        $date = now($this->timezone)->startOfDay();

        return LogEntry::where('user_id', $this->id)
            ->whereDate('date', $date)
            ->first();
    }
}
