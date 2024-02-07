import { Head, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { updateUserTimezone } from "@/Helpers/timezone";
import { calculateCountdown } from "@/Helpers/countdown";
import route from "ziggy-js";
import AppLayout from "@/Layouts/AppLayout";
import { Button } from "@/Components/ui/button";
import { Pause, Play } from "lucide-react";
import ConfettiExplosion from "react-confetti-explosion";

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
                <div className="flex flex-col items-center justify-center min-h-screen gap-6 py-8">
                    <h1 className="h6">{new Date().toLocaleDateString()}</h1>
                    {user.todays_log_entry ? (
                        <Track track={user.todays_log_entry.track} />
                    ) : (
                        <Empty countdown={countdown} />
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

function Track({ track }: { track: App.Models.Track }) {
    const [audio] = useState(new Audio(track.preview_url || ""));
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlaying = () => setIsPlaying(!isPlaying);

    useEffect(() => {
        const onAudioEnd = () => setIsPlaying(false);
        audio.addEventListener("ended", onAudioEnd);

        return () => {
            audio.removeEventListener("ended", onAudioEnd);
        };
    }, [audio]);

    useEffect(() => {
        isPlaying ? audio.play() : audio.pause();
    }, [audio, isPlaying]);

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative w-64 aspect-square">
                <div className="vinyl-cover -translate-x-1/4">
                    <ConfettiExplosion zIndex={999} />
                    <h2 className="font-mono h4 line-clamp-2">{track.title}</h2>
                    <div className="flex flex-wrap items-center justify-center font-mono text-sm gap-x-2 gap-y-1">
                        {track.artists.map(
                            (artist: {
                                name: string;
                                spotify_uri: string;
                                spotify_url: string;
                            }) => {
                                return (
                                    <div key={artist.name}>
                                        <a href={artist.spotify_uri}>
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
                        src={track.album_art}
                        alt="Album art"
                        className="block w-1/3 rounded-full aspect-square"
                    />
                    <div className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-stone-50"></div>
                </div>
            </div>

            <div className="flex gap-2">
                <Button
                    onClick={() => (window.location.href = track.spotify_uri)}
                >
                    Open in Spotify app
                </Button>
                {track.preview_url && (
                    <Button variant="ghost" onClick={togglePlaying}>
                        {isPlaying ? <Pause /> : <Play />}
                    </Button>
                )}
            </div>
        </div>
    );
}

function Empty({
    countdown,
}: {
    countdown: ReturnType<typeof calculateCountdown>;
}) {
    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative w-64 aspect-square">
                <div className="vinyl-cover">
                    {!countdown && (
                        <>
                            <h2 className="font-mono h4">???</h2>
                            <div className="flex gap-2 font-mono text-sm">
                                It's past 5pm. Time for your daily surprise.
                            </div>
                        </>
                    )}
                    {countdown && (
                        <>
                            <h2 className="font-mono h4">
                                {countdown.hours}:{countdown.minutes}:
                                {countdown.seconds}
                            </h2>
                            <div className="flex gap-2 font-mono text-sm">
                                until your daily surprise.
                            </div>
                        </>
                    )}
                </div>
                <div className="vinyl">
                    <div className="block w-1/3 rounded-full aspect-square bg-slate-100"></div>
                    <div className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-stone-50"></div>
                </div>
            </div>

            {!countdown && (
                <div className="flex gap-2">
                    <Button
                        onClick={() => router.post(route("log-entry.store"))}
                    >
                        Get your surprise
                    </Button>
                </div>
            )}
        </div>
    );
}
