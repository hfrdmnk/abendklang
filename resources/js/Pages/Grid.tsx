import TrackElement from "@/Components/TrackElement";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";

type LogEntries = {
    [date: string]: App.Models.LogEntry | null;
};

export default function Grid({ logEntries }: { logEntries: LogEntries }) {
    console.log(logEntries);
    return (
        <AppLayout>
            <Head title="abendklang. logs" />

            <div className="container flex-1 w-full py-8">
                <h1 className="mb-4">Your logs</h1>
                <ul className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))]">
                    {Object.entries(logEntries).length === 0 ? (
                        <p>No log entries yet. Come back later.</p>
                    ) : (
                        Object.entries(logEntries).map(([date, logEntry]) => (
                            <li
                                key={date}
                                className="flex flex-col items-center gap-4 px-2 py-8 border rounded-xl border-stone-200"
                            >
                                <h2 className="h6">
                                    {new Date(date).toLocaleDateString()}
                                </h2>
                                {logEntry ? (
                                    <TrackElement
                                        logEntry={logEntry}
                                        isInGrid={true}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center flex-1">
                                        <p>No log entry</p>
                                    </div>
                                )}
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </AppLayout>
    );
}
