<?php

namespace App\Http\Controllers;

use DatePeriod;
use DateInterval;
use Inertia\Inertia;
use App\Models\Track;
use App\Models\LogEntry;
use Illuminate\Http\Request;
use App\Http\Clients\SpotifyClient;

class LogEntryController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $logEntries = LogEntry::where('user_id', $user->id)
            ->orderBy('date', 'asc')
            ->get()
            ->keyBy(function ($logEntry) {
                return $logEntry->date->format('Y-m-d');
            });

        $firstEntryDate = $logEntries->first()?->date;
        $today = now($user->timezone)->startOfDay();

        $period = new DatePeriod(
            $firstEntryDate ?? $today,
            new DateInterval('P1D'),
            $today->addDay()
        );

        $days = collect($period)->mapWithKeys(function ($date) use ($logEntries) {
            $dateString = $date->format('Y-m-d');
            return [$dateString => $logEntries->get($dateString)];
        });

        $days = $days->reverse();

        return Inertia::render('Grid', [
            'logEntries' => $days
        ]);
    }

    public function show(Request $request, LogEntry $logEntry = null)
    {
        if ($logEntry === null) {
            $logEntry = $request->user()->todays_log_entry;
        } else if ($logEntry->user_id !== $request->user()->id) {
            abort(403);
        }

        return Inertia::render('LogEntry', [
            'logEntry' => $logEntry,
            'isEvening' => isEvening(),
        ]);
    }

    public function store(Request $request)
    {
        if (!isEvening() || $request->user()->todays_log_entry !== null) {
            abort(403);
        }

        $user = $request->user();
        $spotifyClient = new SpotifyClient($user);
        $track = $spotifyClient->getTrack();

        $trackArtists = collect($track['artists'])->map(function ($artist) {
            return [
                'name' => $artist['name'],
                'spotify_uri' => $artist['uri'],
                'spotify_url' => $artist['external_urls']['spotify'],
            ];
        });

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

        $date = now($user->timezone)->startOfDay();

        LogEntry::create([
            'user_id' => $user->id,
            'date' => $date,
            'track_id' => $storedTrack->id,
            'mode' => $user->mode,
        ]);
    }

    public function update(Request $request, LogEntry $logEntry)
    {
        if ($logEntry->user_id !== $request->user()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'mood' => 'nullable|in:1,2,3,4,5',
        ]);

        $logEntry->update([
            'mood' => $validated['mood'],
        ]);
    }
}
