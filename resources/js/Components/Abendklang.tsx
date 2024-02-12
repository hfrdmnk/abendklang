import Logo from "@/Components/Icons/Logo";
import { cn } from "@/lib/utils";

export default function Abendklang({ isTitle = false }) {
    return (
        <div
            className={cn(
                "flex items-center text-stone-950",
                isTitle ? "flex-col gap-1 items-start" : "gap-2"
            )}
        >
            <Logo size={isTitle ? 64 : 32} />
            {isTitle && <h1 className="h3">abendklang.</h1>}
            {!isTitle && (
                <div className="font-serif font-bold">abendklang.</div>
            )}
        </div>
    );
}
