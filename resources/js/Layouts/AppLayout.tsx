import Abendklang from "@/Components/Abendklang";
import React, { ReactNode } from "react";

const AppLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <>
            <header className="fixed top-0 left-0 flex items-center justify-center w-full p-3 bg-stone-50">
                <Abendklang />
            </header>
            <main>{children}</main>
        </>
    );
};

export default AppLayout;
