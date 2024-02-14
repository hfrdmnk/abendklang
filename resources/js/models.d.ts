/**
 * This file is auto generated using 'php artisan typescript:generate'
 *
 * Changes to this file will be lost when the command is run again
 */

declare namespace App.Models {
    export interface LogEntry {
        id: string;
        user_id: string;
        date: string;
        track_id: string;
        mode: string;
        mood: number | null;
        created_at: string | null;
        updated_at: string | null;
        user?: App.Models.User | null;
        track?: App.Models.Track | null;
    }

    export interface User {
        id: string;
        name: string;
        mode: string;
        spotify_id: string;
        timezone: string;
        access_token: string;
        refresh_token: string;
        access_token_expires_at: string;
        remember_token: string | null;
        created_at: string | null;
        updated_at: string | null;
        log_entries?: Array<App.Models.LogEntry> | null;
        log_entries_count?: number | null;
        readonly todays_log_entry?: any;
    }

    export interface Track {
        id: string;
        title: string;
        artists: string;
        album: string;
        album_art: string;
        preview_url: string | null;
        spotify_url: string;
        spotify_uri: string;
        created_at: string | null;
        updated_at: string | null;
        log_entries?: Array<App.Models.LogEntry> | null;
        log_entries_count?: number | null;
    }

}
