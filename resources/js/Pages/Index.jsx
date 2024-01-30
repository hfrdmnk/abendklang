import { Head } from "@inertiajs/react";

export default function Index({ user }) {
    return (
        <>
            <Head title="abendklang." />
            <h1>Index</h1>
            <p>Welcome back, {user.name}</p>
            <a href={route("logout")}>Logout</a>
        </>
    );
}
