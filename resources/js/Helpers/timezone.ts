import { router } from "@inertiajs/react";
import route from "ziggy-js";

export function updateUserTimezone() {
    const lastUpdate = localStorage.getItem("lastUpdate");
    const today = new Date().toISOString().split("T")[0];

    if (lastUpdate !== today) {
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        localStorage.setItem("timezoneUpdated", today);

        router.post(
            route("timezone.update"),
            {
                timezone: userTimezone,
            },
            {
                onSuccess: () => {
                    console.log("Timezone updated");
                },
            }
        );
    }
}
