import { useEffect, useState } from "react";
import Mood1 from "@/Components/Icons/Mood1";
import Mood2 from "@/Components/Icons/Mood2";
import Mood3 from "@/Components/Icons/Mood3";
import Mood4 from "@/Components/Icons/Mood4";
import Mood5 from "@/Components/Icons/Mood5";
import { Pause, Play, SpotifyLogo } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const TrackElement = ({
    logEntry,
    isInGrid,
}: {
    logEntry: App.Models.LogEntry;
    isInGrid?: boolean;
}) => {
    const track = logEntry.track as App.Models.Track;
    const artists = track.artists as unknown as Artist[];

    const [audio] = useState(new Audio(track.preview_url || ""));
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlaying = () => setIsPlaying(!isPlaying);

    useEffect(() => {
        const onAudioEnd = () => setIsPlaying(false);
        audio.addEventListener("ended", onAudioEnd);

        return () => {
            audio.removeEventListener("ended", onAudioEnd);
        };
    }, [audio]);

    useEffect(() => {
        isPlaying ? audio.play() : audio.pause();
    }, [audio, isPlaying]);

    const moodSize = 24;
    const moods = [
        <Mood1 size={moodSize} />,
        <Mood2 size={moodSize} />,
        <Mood3 size={moodSize} />,
        <Mood4 size={moodSize} />,
        <Mood5 size={moodSize} />,
    ];

    return (
        <div className="flex flex-col items-center gap-8">
            <div
                className={cn(
                    "relative aspect-square",
                    isInGrid ? "h-48" : "h-64"
                )}
            >
                <div className="absolute inset-0 z-10 overflow-hidden text-center border rounded-md border-stone-300 -translate-x-1/4">
                    <img
                        src={track.album_art}
                        alt="Album art"
                        className="inset-0"
                    />
                    <div className="absolute flex gap-2 left-2 bottom-2">
                        <a
                            onClick={() =>
                                (window.location.href = track.spotify_uri)
                            }
                            className="flex items-center justify-center w-10 h-10 p-2 rounded-sm cursor-pointer bg-stone-50/40 backdrop-blur text-stone-950"
                        >
                            <SpotifyLogo size={32} />
                        </a>
                        {track.preview_url && (
                            <a
                                onClick={togglePlaying}
                                className="flex items-center justify-center w-10 h-10 p-2 rounded-sm cursor-pointer bg-stone-50/40 backdrop-blur text-stone-950"
                            >
                                {isPlaying ? (
                                    <Pause size={16} weight="fill" />
                                ) : (
                                    <Play size={16} weight="fill" />
                                )}
                            </a>
                        )}
                    </div>
                    {logEntry.mood && isInGrid && (
                        <div className="absolute top-2 right-2">
                            <div className="flex items-center justify-center w-10 h-10 p-2 rounded-full cursor-pointer bg-stone-50/40 backdrop-blur text-stone-950">
                                {moods[logEntry.mood - 1]}
                            </div>
                        </div>
                    )}
                </div>
                <div className="vinyl translate-x-1/4">
                    <img
                        src={track.album_art}
                        alt="Album art"
                        className="block w-1/3 rounded-full aspect-square"
                    />
                    <div className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-stone-50"></div>
                </div>
            </div>

            <div className="flex flex-col gap-2 text-center">
                <h2 className={cn("font-mono", isInGrid ? "text-lg" : "h6")}>
                    {track.title}
                </h2>
                <ul className="flex flex-wrap justify-center gap-1">
                    {artists.map((artist: Artist) => {
                        return (
                            <li key={artist.name}>
                                <a
                                    href={artist.spotify_uri}
                                    className={cn(
                                        "px-3 py-1 font-mono border rounded-sm",
                                        isInGrid ? "text-sm" : "text-xs"
                                    )}
                                >
                                    {artist.name}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

type Artist = {
    name: string;
    spotify_uri: string;
    spotify_url: string;
};

export default TrackElement;
