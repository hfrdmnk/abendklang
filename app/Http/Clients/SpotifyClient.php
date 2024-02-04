<?php

namespace App\Http\Clients;

use App\Models\User;
use Illuminate\Support\Facades\Http;

class SpotifyClient
{
    public function __construct(public User $user)
    {
    }

    public function getTrack(): array
    {
        $this->checkAccessToken();

        switch ($this->user->mode) {
            case 'discovery':
                return $this->getDiscoveryTrack();
            case 'nostalgia':
                return $this->getNostalgiaTrack();
        }
    }

    protected function getDiscoveryTrack(): array
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->user->access_token,
        ])->get('https://api.spotify.com/v1/recommendations', [
            'limit' => 10,
            'seed_artists' => $this->getTopArtists(),
        ]);

        $responseJson = $response->json();

        $track = $responseJson['tracks'][array_rand($responseJson['tracks'])];

        return $track;
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

    protected function getNostalgiaTrack(): array
    {
        $random = rand(0, 1);

        return $random > 0.5 ? $this->getTrackFromTop() : $this->getTrackFromLibrary();
    }

    protected function getTrackFromTop(): array
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->user->access_token,
        ])->get('https://api.spotify.com/v1/me/top/tracks', [
            'limit' => 50,
            'time_range' => 'long_term',
        ]);

        $responseJson = $response->json();

        $track = $responseJson['items'][array_rand($responseJson['items'])];

        return $track;
    }

    protected function getTrackFromLibrary(): array
    {
        $totalResponse = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->user->access_token,
        ])->get('https://api.spotify.com/v1/me/top/tracks', [
            'limit' => 1,
        ]);

        $totalResponseJson = $totalResponse->json();
        $totalTracks = $totalResponseJson['total'];

        $randomOffset = rand(0, $totalTracks - 1);

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->user->access_token,
        ])->get('https://api.spotify.com/v1/me/tracks', [
            'limit' => 1,
            'offset' => $randomOffset,
        ]);

        $responseJson = $response->json();

        $track = $responseJson['items'][0]['track'];

        return $track;
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
