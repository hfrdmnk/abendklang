import Logo from "@/Components/Icons/Logo";
import { cn } from "@/lib/utils";

export default function Abendklang({ isVertical = false }) {
    return (
        <div
            className={cn(
                "flex items-center text-stone-950",
                isVertical ? "flex-col gap-1" : "gap-2"
            )}
        >
            <Logo size={32} />
            <div className="font-serif font-bold">abendklang.</div>
        </div>
    );
}
