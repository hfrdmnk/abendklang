import { Head, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { updateUserTimezone } from "@/Helpers/timezone";
import { calculateCountdown } from "@/Helpers/countdown";
import route from "ziggy-js";
import AppLayout from "@/Layouts/AppLayout";

export default function Index({ user }: { user: App.Models.User }) {
    const [countdown, setCountdown] = useState<
        ReturnType<typeof calculateCountdown>
    >(calculateCountdown());

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(calculateCountdown());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        updateUserTimezone();
    }, []);

    return (
        <AppLayout>
            <Head title="abendklang." />

            <div className="container">
                <div className="flex flex-col items-center justify-center min-h-screen gap-4 py-8">
                    <h1 className="h6">{new Date().toLocaleDateString()}</h1>
                    {countdown ? (
                        <p>
                            Countdown: {countdown.hours}:{countdown.minutes}:
                            {countdown.seconds}
                        </p>
                    ) : user.todays_log_entry ? (
                        <div>
                            <div className="relative w-64 aspect-square">
                                <div className="vinyl-cover -translate-x-1/4">
                                    <h2 className="font-mono h4">
                                        {user.todays_log_entry.track.title}
                                    </h2>
                                    <div className="flex gap-2 font-mono text-sm">
                                        {user.todays_log_entry.track.artists.map(
                                            (artist: {
                                                name: string;
                                                spotify_uri: string;
                                                spotify_url: string;
                                            }) => {
                                                return (
                                                    <div key={artist.name}>
                                                        <a
                                                            href={
                                                                artist.spotify_uri
                                                            }
                                                        >
                                                            {artist.name}
                                                        </a>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                                <div className="vinyl translate-x-1/4">
                                    <img
                                        src={
                                            user.todays_log_entry.track
                                                .album_art
                                        }
                                        alt="Album art"
                                        className="block w-1/3 rounded-full aspect-square"
                                    />
                                    <div className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-stone-50"></div>
                                </div>
                            </div>
                            {/* <img
                                src={user.todays_log_entry.track.album_art}
                                alt="Album art"
                                className="block w-48 rounded aspect-square"
                            />
                            <p>{user.todays_log_entry.track.title}</p>
                            <p>
                                <a
                                    href={
                                        user.todays_log_entry.track.spotify_uri
                                    }
                                >
                                    Open in Spotify app
                                </a>
                            </p> */}
                        </div>
                    ) : (
                        <div>
                            <p>It's past 5pm. You can generate a song now.</p>
                            <p>
                                <a
                                    onClick={() =>
                                        router.post(route("log-entry.store"))
                                    }
                                >
                                    Generate song
                                </a>
                            </p>
                        </div>
                    )}
                    <p>
                        <a onClick={() => router.post(route("logout"))}>
                            Logout
                        </a>
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
