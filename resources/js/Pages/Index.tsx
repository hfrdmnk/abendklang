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
import { Skeleton } from "@/Components/ui/skeleton";
import TrackElement from "@/Components/TrackElement";

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
            <Head title="abendklang. today" />

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

function Track({ logEntry }: { logEntry: App.Models.LogEntry }) {
    const moodSize = 24;
    const moods = [
        <Mood1 size={moodSize} />,
        <Mood2 size={moodSize} />,
        <Mood3 size={moodSize} />,
        <Mood4 size={moodSize} />,
        <Mood5 size={moodSize} />,
    ];

    const rateDay = (mood: number | null) => {
        if (mood === logEntry.mood) {
            mood = null;
        }
        router.post(route("log-entry.update", { logEntry: logEntry.id }), {
            mood,
        });
    };

    return (
        <div className="flex flex-col items-center gap-8">
            <TrackElement logEntry={logEntry} />

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
