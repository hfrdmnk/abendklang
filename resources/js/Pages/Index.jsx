import { Head } from "@inertiajs/react";
import { useEffect } from "react";
import { updateUserTimezone } from "@/Helpers/timezone";

export default function Index({ user }) {
    useEffect(() => {
        updateUserTimezone();
    }, []);

    return (
        <>
            <Head title="abendklang." />
            <h1>Index</h1>
            <p>Welcome back, {user.name}</p>
            <a href={route("logout")}>Logout</a>
        </>
    );
}
