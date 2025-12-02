async function saveCacheConfig() {
    let days = parseInt(document.getElementById("days_cache").value) || 0;
    let months = parseInt(document.getElementById("months_cache").value) || 0;
    let enabled = document.getElementById("enable_cache").checked;
    await browser.storage.local.set({
        "cache": {
            "days": days,
            "months": months,
            "enabled": enabled,
            "last": Date.now()
        }
    })
    if (enabled) {
        await createNotification("Cache deletion period updated", `Your cache will be emptied every ${months} ${pluralS("month", months)} and ${days} ${pluralS("day", days)}.`);
    } else {
        await createNotification("Cache deletion disabled", "Your cache will no longer be automatically emptied.");
    }
}


async function prefillCacheConfig() {
    let cacheConfig = await getCacheConfig();
    document.getElementById("days_cache").value = cacheConfig["days"];
    document.getElementById("months_cache").value = cacheConfig["months"];
    document.getElementById("enable_cache").checked = cacheConfig["enabled"];
}
