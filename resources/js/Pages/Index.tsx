import { Head, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { updateUserTimezone } from "@/Helpers/timezone";
import { calculateCountdown } from "@/Helpers/countdown";
import route from "ziggy-js";
import Logo from "@/Components/Icons/Logo";

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
        <>
            <Head title="abendklang." />
            <Logo size={24} />
            <h1>Index</h1>
            <p>Welcome back, {user.name}</p>
            {countdown ? (
                <p>
                    Countdown: {countdown.hours}:{countdown.minutes}:
                    {countdown.seconds}
                </p>
            ) : user.todays_log_entry ? (
                <div>
                    <p>{user.todays_log_entry.track.title}</p>
                    <p>
                        <a href={user.todays_log_entry.track.spotify_uri}>
                            Open in Spotify app
                        </a>
                    </p>
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
                <a onClick={() => router.post(route("logout"))}>Logout</a>
            </p>
        </>
    );
}
