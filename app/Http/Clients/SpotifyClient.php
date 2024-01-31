<?php

namespace App\Http\Clients;

use App\Models\User;
use Illuminate\Support\Facades\Http;

class SpotifyClient
{
    public function __construct(public User $user)
    {
    }

    public function checkAccessToken(): void
    {
        if ($this->user->access_token_expires_at->isPast()) {
            $this->refreshAccessToken();
        }
    }

    public function refreshAccessToken(): void
    {
        $response = Http::asForm()->withHeaders([
            'Authorization' => 'Basic ' . base64_encode(config('services.spotify.client_id') . ':' . config('services.spotify.client_secret'))
        ])->post('https://accounts.spotify.com/api/token', [
            'grant_type' => 'refresh_token',
            'refresh_token' => $this->user->refresh_token,
        ]);

        $responseJson = $response->json();

        $this->user->update([
            'access_token' => $responseJson['access_token'],
            'access_token_expires_at' => now()->addSeconds($responseJson['expires_in']),
        ]);
    }
}
