<?php

namespace App\Http\Controllers;

use App\Models\Track;
use App\Models\LogEntry;
use Illuminate\Http\Request;
use App\Http\Clients\SpotifyClient;

class LogEntryController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user();
        $spotifyClient = new SpotifyClient($user);
        $track = $spotifyClient->getTrack();

        $trackArtists = collect($track['artists'])->map(function ($artist) {
            return [
                'name' => $artist['name'],
                'uri' => $artist['uri'],
                'url' => $artist['external_urls']['spotify'],
            ];
        });

        // $storedTrack = [
        //     'id' => $track['id'],
        //     'title' => $track['name'],
        //     'artists' => $trackArtists,
        //     'album' => $track['album']['name'],
        //     'album_art' => $track['album']['images'][0]['url'],
        //     'preview_url' => $track['preview_url'],
        //     'spotify_url' => $track['external_urls']['spotify'],
        //     'spotify_uri' => $track['uri'],
        // ];

        // ddd($storedTrack);

        $storedTrack = Track::firstOrCreate([
            'id' => $track['id'],
        ], [
            'title' => $track['name'],
            'artists' => $trackArtists,
            'album' => $track['album']['name'],
            'album_art' => $track['album']['images'][0]['url'],
            'preview_url' => $track['preview_url'],
            'spotify_url' => $track['external_urls']['spotify'],
            'spotify_uri' => $track['uri'],
        ]);

        LogEntry::create([
            'user_id' => $user->id,
            'track_id' => $storedTrack->id,
            'mode' => $user->mode,
        ]);
    }
}
