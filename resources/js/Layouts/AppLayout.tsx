import Abendklang from "@/Components/Abendklang";
import { Link, usePage } from "@inertiajs/react";
import React, { ReactNode } from "react";
import route from "ziggy-js";

const AppLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { url } = usePage();

    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex items-center justify-center px-8 py-3">
                <Abendklang />
            </header>
            <main className="flex flex-col flex-1">{children}</main>
            <footer className="py-4 font-mono">
                <div className="container space-y-4">
                    <nav>
                        <ul className="flex justify-center gap-4">
                            <li>
                                <Link
                                    href="/logs"
                                    className={
                                        url === "/logs"
                                            ? "font-medium text-stone-950"
                                            : ""
                                    }
                                >
                                    Past
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/"
                                    className={
                                        url === "/"
                                            ? "font-medium text-stone-950"
                                            : ""
                                    }
                                >
                                    Today
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="flex justify-center text-sm">
                        <Link href={route("logout")} method="post">
                            Logout
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AppLayout;
