import axios from "axios";

export function updateUserTimezone() {
    const timezoneUpdated = sessionStorage.getItem("timezoneUpdated");

    if (!timezoneUpdated) {
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        axios
            .post(route("timezone.update"), {
                timezone: userTimezone,
            })
            .then(() => {
                sessionStorage.setItem("timezoneUpdated", true);
                console.log("Timezone updated");
            });
    }
}
