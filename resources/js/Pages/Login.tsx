import { Head } from "@inertiajs/react";

export default function Login() {
    return (
        <>
            <Head title="Login to abendklang." />
            <h1>Login</h1>
            <a href="/auth/redirect">Login with Spotify</a>
        </>
    );
}
