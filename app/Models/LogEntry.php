<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LogEntry extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id',
        'track_id',
        'mode',
        'mood',
    ];

    protected $appends = [
        'created_at_user_tz',
    ];

    protected $with = [
        'track',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function track()
    {
        return $this->belongsTo(Track::class);
    }

    public function getCreatedAtUserTzAttribute()
    {
        $timezone = Auth::user()->timezone ?? config('app.timezone');
        return $this->created_at->timezone($timezone);
    }
}
