import { Head, router } from "@inertiajs/react";
import { useEffect } from "react";
import { updateUserTimezone } from "@/Helpers/timezone";
import route from "ziggy-js";
import Logo from "@/Components/Icons/Logo";

export default function Index({ user }: { user: App.Models.User }) {
    useEffect(() => {
        updateUserTimezone();
    }, []);

    return (
        <>
            <Head title="abendklang." />
            <Logo size={24} />
            <h1>Index</h1>
            <p>Welcome back, {user.name}</p>
            <p>
                <a onClick={() => router.post(route("log-entry.store"))}>
                    Generate song
                </a>
            </p>
            <p>
                <a onClick={() => router.post(route("logout"))}>Logout</a>
            </p>
        </>
    );
}
