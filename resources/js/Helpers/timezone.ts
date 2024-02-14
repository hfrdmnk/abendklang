import { router } from "@inertiajs/react";
import route from "ziggy-js";

export function updateUserTimezone() {
    const timezoneUpdated =
        sessionStorage.getItem("timezoneUpdated") === "true";

    if (!timezoneUpdated) {
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        sessionStorage.setItem("timezoneUpdated", true.toString());

        // TODO: Figure out why i can't put the sessionStorage.setItem in the onSuccess callback
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
