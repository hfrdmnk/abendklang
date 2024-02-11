import Abendklang from "@/Components/Abendklang";
import { Link, usePage } from "@inertiajs/react";
import React, { ReactNode } from "react";
import route from "ziggy-js";

const AppLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { url } = usePage();

    return (
        <div className="flex flex-col min-h-screen">
            <header className="container flex items-center justify-between py-8">
                <Abendklang />
                <nav>
                    <ul className="flex justify-center gap-4">
                        <li>
                            <Link
                                href="/"
                                className={url === "/" ? "font-bold" : ""}
                            >
                                Today
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/logs"
                                className={
                                    url === "/logs"
                                        ? "font-medium text-stone-950"
                                        : ""
                                }
                            >
                                Logs
                            </Link>
                        </li>
                        <li>
                            <Link href={route("logout")} method="post">
                                Logout
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="flex flex-col flex-1">{children}</main>
            <footer className="container flex items-center justify-center py-8 text-sm">
                <div>
                    a{" "}
                    <a
                        href="https://linea.studio"
                        target="_blank"
                        className="underline"
                    >
                        linea
                    </a>{" "}
                    projektli.
                </div>
            </footer>
        </div>
    );
};

export default AppLayout;
