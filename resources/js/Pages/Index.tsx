import { Head, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { updateUserTimezone } from "@/Helpers/timezone";
import { calculateCountdown } from "@/Helpers/countdown";
import { cn } from "@/lib/utils";
import route from "ziggy-js";
import AppLayout from "@/Layouts/AppLayout";
import { Button } from "@/Components/ui/button";
import ConfettiExplosion from "react-confetti-explosion";
import { Pause, Play, SpotifyLogo } from "@phosphor-icons/react";
import { Skeleton } from "@/Components/ui/skeleton";

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

            <div className="container flex flex-col items-center justify-center flex-1 w-full gap-6 py-8">
                <div className="text-center">
                    <div className="text-base font-normal font-body text-stone-700">
                        something to look forward to. every day.
                    </div>
                    <h1 className="h5">{new Date().toLocaleDateString()}</h1>
                </div>
                {user.todays_log_entry ? (
                    <Track track={user.todays_log_entry.track} />
                ) : (
                    <Empty countdown={countdown} />
                )}
            </div>
        </AppLayout>
    );
}

type Artist = {
    name: string;
    spotify_uri: string;
    spotify_url: string;
};

function Track({ track }: { track: App.Models.Track }) {
    const [audio] = useState(new Audio(track.preview_url || ""));
    const [isPlaying, setIsPlaying] = useState(false);
    const artists = track.artists as unknown as Artist[];

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
        <div className="flex flex-col items-center gap-8">
            <div className="relative w-64 aspect-square">
                <div className="absolute inset-0 z-10 overflow-hidden text-center border rounded-md border-stone-300 -translate-x-1/4">
                    <img
                        src={track.album_art}
                        alt="Album art"
                        className="inset-0"
                    />
                    <ConfettiExplosion zIndex={999} />
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

            <div className="flex flex-col gap-2 text-center">
                <h2 className="h6">{track.title}</h2>
                <ul className="flex flex-wrap justify-center gap-1">
                    {artists.map((artist: Artist) => {
                        return (
                            <li key={artist.name}>
                                <a
                                    href={artist.spotify_uri}
                                    className="px-3 py-1 border rounded-sm"
                                >
                                    {artist.name}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="flex gap-2">
                <Button
                    onClick={() => (window.location.href = track.spotify_uri)}
                    variant="ghost"
                >
                    <SpotifyLogo size={32} />
                </Button>
                {track.preview_url && (
                    <Button variant="ghost" onClick={togglePlaying}>
                        {isPlaying ? (
                            <Pause size={24} weight="fill" />
                        ) : (
                            <Play size={24} weight="fill" />
                        )}
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
    const handleClick = () => {
        if (!countdown) {
            router.post(route("log-entry.store"));
        }
    };

    return (
        <div className="flex flex-col items-center gap-8">
            <div className="relative w-64 aspect-square">
                <div
                    className={cn(
                        "absolute inset-0 z-10 flex flex-col items-center justify-center p-4 text-center border rounded-md border-stone-300 bg-stone-100/90 backdrop-blur-xl gap-1",
                        !countdown ? "cursor-pointer" : ""
                    )}
                    onClick={handleClick}
                >
                    {!countdown && (
                        <>
                            <h3 className="font-mono h6">
                                Your surprise is ready.
                            </h3>
                            <div className="flex gap-2 font-mono text-sm">
                                Click to reveal.
                            </div>
                        </>
                    )}
                    {countdown && (
                        <>
                            <h3 className="font-mono h4">
                                {countdown.hours}:{countdown.minutes}:
                                {countdown.seconds}
                            </h3>
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
            <div className="flex flex-col gap-2 text-center">
                <Skeleton className="w-32 h-8 rounded" />
                <ul className="flex flex-wrap justify-center gap-1">
                    <li>
                        <Skeleton className="w-12 h-6 border rounded" />
                    </li>
                </ul>
            </div>

            <div className="flex gap-2">
                <Button disabled variant="ghost">
                    <SpotifyLogo size={32} />
                </Button>
            </div>
        </div>
    );
}
