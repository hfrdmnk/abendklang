<?php

namespace App\Http\Clients;

use App\Models\User;
use Illuminate\Support\Facades\Http;

class SpotifyClient
{
    public function __construct(public User $user)
    {
    }

    public function getSong(): array
    {
        $this->checkAccessToken();

        switch ($this->user->mode) {
            case 'discovery':
                return $this->getDiscoverySong();
            case 'nostalgia':
                return $this->getNostalgiaSong();
        }
    }

    protected function getDiscoverySong(): array
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->user->access_token,
        ])->get('https://api.spotify.com/v1/recommendations', [
            'limit' => 10,
            'seed_artists' => $this->getTopArtists(),
        ]);

        $responseJson = $response->json();

        dd($responseJson);

        $song = $responseJson['tracks'][array_rand($responseJson['tracks'])];

        dd($song);
    }

    protected function getTopArtists(): string
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->user->access_token,
        ])->get('https://api.spotify.com/v1/me/top/artists', []);

        $responseJson = $response->json();

        $artists = collect($responseJson['items'])->random(5)->pluck('id')->toArray();

        return implode(',', $artists);
    }

    protected function getNostalgiaSong(): array
    {
        return [];
    }

    protected function checkAccessToken(): void
    {
        if ($this->user->access_token_expires_at->isPast()) {
            $this->refreshAccessToken();
        }
    }

    protected function refreshAccessToken(): void
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
