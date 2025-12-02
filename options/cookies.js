async function saveCookiesConfig() {
    let enabled = document.getElementById("enable_cookies").checked;
    await browser.storage.local.set({
        "cookies": {
            "enabled": enabled,
        }
    })
    if (enabled) {
        await createNotification("Cookies deletion enabled", "Your cookies will be deleted when the associated URL is no longer in your history");
    } else {
        await createNotification("Cookies deletion disabled", "Your cookies will no longer be automatically deleted.");
    }
}


async function prefillCookiesConfig() {
    let cookiesConfig = await getCookiesConfig();
    document.getElementById("enable_cookies").checked = cookiesConfig["enabled"];
}
