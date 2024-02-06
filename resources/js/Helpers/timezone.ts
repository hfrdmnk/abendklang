import { router } from "@inertiajs/react";
import route from "ziggy-js";

export function updateUserTimezone() {
    const timezoneUpdated =
        sessionStorage.getItem("timezoneUpdated") === "true";

    if (!timezoneUpdated) {
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        router.post(
            route("timezone.update"),
            {
                timezone: userTimezone,
            },
            {
                onSuccess: () => {
                    sessionStorage.setItem("timezoneUpdated", true.toString());
                    console.log("Timezone updated");
                },
            }
        );
    }
}
