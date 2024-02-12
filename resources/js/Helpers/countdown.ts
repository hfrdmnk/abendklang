export function calculateCountdown() {
    const now = new Date();
    const target = new Date();

    target.setHours(20);
    target.setMinutes(0);
    target.setSeconds(0);

    if (now >= target) {
        return false;
    }

    const diff = target.getTime() - now.getTime();

    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    return {
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
    };
}
