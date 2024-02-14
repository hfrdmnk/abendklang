<?php

use Illuminate\Support\Facades\Auth;

if (!function_exists('isEvening')) {
    function isEvening(): bool
    {
        $user = Auth::user();
        $currentTime = now($user->timezone);
        return $currentTime->hour >= 17 && $currentTime->hour < 24;
    }
}
