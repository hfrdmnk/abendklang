import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";

export default function Grid({
    logEntries,
}: {
    logEntries: App.Models.LogEntry[];
}) {
    return (
        <AppLayout>
            <Head title="abendklang." />

            <div className="container flex-1 w-full py-8">
                <div>Hi</div>
                <ul>
                    {logEntries.map((logEntry) => (
                        <li key={logEntry.id}>{logEntry.date}</li>
                    ))}
                </ul>
            </div>
        </AppLayout>
    );
}
