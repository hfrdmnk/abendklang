import { usePage } from "@inertiajs/react";
import React, { ReactNode } from "react";

const LoginLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { url } = usePage();

    return (
        <div className="flex flex-col min-h-screen">
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

export default LoginLayout;
