import LoginLayout from "@/Layouts/LoginLayout";
import { Button } from "@/Components/ui/button";
import { Head } from "@inertiajs/react";
import { SpotifyLogo } from "@phosphor-icons/react";
import Abendklang from "@/Components/Abendklang";

export default function Login() {
    return (
        <LoginLayout>
            <Head title="Login to abendklang." />
            <div className="container py-8 mt-[10vh] max-w-lg flex flex-col items-start gap-4">
                <Abendklang isTitle={true} />
                <h2 className="h6">something to look forward to. every day.</h2>
                <p>
                    abendklang is a simple tool that combines mindfulness with
                    your favorite music.
                </p>
                <p>
                    The idea is pretty straightforward: Every day after 5pm,
                    you…
                </p>
                <ol className="space-y-1 list-decimal">
                    <li>
                        …can pick up your daily surprise: A new song that fits
                        your music taste.
                    </li>
                    <li>…enjoy that song while you reflect on your day.</li>
                    <li>…log your mood.</li>
                </ol>

                <p>That's it, as simple as that!</p>
                <p>
                    Hope you enjoy it. If you want to give it a try, just log in
                    below.
                </p>
                <Button
                    onClick={() => (window.location.href = "/auth/redirect")}
                    variant="secondary"
                    className="flex items-center"
                >
                    <SpotifyLogo size={24} className="mr-2" />
                    Login with Spotify
                </Button>
            </div>
        </LoginLayout>
    );
}
