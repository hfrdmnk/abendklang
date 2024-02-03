import { router } from "@inertiajs/react";

export function updateUserTimezone() {
    const timezoneUpdated = sessionStorage.getItem("timezoneUpdated");

    if (!timezoneUpdated) {
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        router.post(
            route("timezone.update"),
            {
                timezone: userTimezone,
            },
            {
                onSuccess: () => {
                    sessionStorage.setItem("timezoneUpdated", true);
                    console.log("Timezone updated");
                },
            }
        );
    }
}
