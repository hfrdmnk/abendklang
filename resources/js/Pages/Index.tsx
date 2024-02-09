import { Head, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { updateUserTimezone } from "@/Helpers/timezone";
import { calculateCountdown } from "@/Helpers/countdown";
import { cn } from "@/lib/utils";
import route from "ziggy-js";
import AppLayout from "@/Layouts/AppLayout";
import Mood1 from "@/Components/Icons/Mood1";
import Mood2 from "@/Components/Icons/Mood2";
import Mood3 from "@/Components/Icons/Mood3";
import Mood4 from "@/Components/Icons/Mood4";
import Mood5 from "@/Components/Icons/Mood5";
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
                    <div>
                        {!countdown && user.todays_log_entry
                            ? "Your song of the day:"
                            : "something to look forward to. every day."}
                    </div>
                    <h1 className="h5">{new Date().toLocaleDateString()}</h1>
                </div>
                {user.todays_log_entry ? (
                    <Track logEntry={user.todays_log_entry} />
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

function Track({ logEntry }: { logEntry: App.Models.LogEntry }) {
    const track = logEntry.track as App.Models.Track;
    const [audio] = useState(new Audio(track.preview_url || ""));
    const [isPlaying, setIsPlaying] = useState(false);
    const artists = track.artists as unknown as Artist[];
    const moodSize = 24;
    const moods = [
        <Mood1 size={moodSize} />,
        <Mood2 size={moodSize} />,
        <Mood3 size={moodSize} />,
        <Mood4 size={moodSize} />,
        <Mood5 size={moodSize} />,
    ];

    const togglePlaying = () => setIsPlaying(!isPlaying);

    const rateDay = (mood: number | null) => {
        if (mood === logEntry.mood) {
            mood = null;
        }
        router.post(route("log-entry.update", { logEntry: logEntry.id }), {
            mood,
        });
    };

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
                    <div className="absolute flex gap-2 left-2 bottom-2">
                        <a
                            onClick={() =>
                                (window.location.href = track.spotify_uri)
                            }
                            className="flex items-center justify-center w-10 h-10 p-2 rounded-sm cursor-pointer bg-stone-50/40 backdrop-blur text-stone-950"
                        >
                            <SpotifyLogo size={32} />
                        </a>
                        {track.preview_url && (
                            <a
                                onClick={togglePlaying}
                                className="flex items-center justify-center w-10 h-10 p-2 rounded-sm cursor-pointer bg-stone-50/40 backdrop-blur text-stone-950"
                            >
                                {isPlaying ? (
                                    <Pause size={16} weight="fill" />
                                ) : (
                                    <Play size={16} weight="fill" />
                                )}
                            </a>
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

            <div className="flex flex-col gap-2 text-center">
                <h2 className="font-mono h6">{track.title}</h2>
                <ul className="flex flex-wrap justify-center gap-1">
                    {artists.map((artist: Artist) => {
                        return (
                            <li key={artist.name}>
                                <a
                                    href={artist.spotify_uri}
                                    className="px-3 py-1 font-mono border rounded-sm"
                                >
                                    {artist.name}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="flex flex-col items-center gap-2">
                <div>Reflect on your day:</div>
                <ul className="flex gap-2">
                    {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
                        <li
                            key={num}
                            className={cn(
                                "p-4 rounded-full cursor-pointer bg-stone-100 border transition-all duration-300",
                                logEntry.mood === num
                                    ? "bg-stone-950 text-white border-stone-950"
                                    : "hover:bg-stone-200"
                            )}
                            onClick={() => rateDay(num)}
                        >
                            {moods[num - 1]}
                        </li>
                    ))}
                </ul>
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
        </div>
    );
}
