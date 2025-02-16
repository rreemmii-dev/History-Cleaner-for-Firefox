async function saveCacheDelay() {
    let days = parseInt(document.getElementById("days_cache").value);
    if (isNaN(days)) {
        days = 0;
    }
    let months = parseInt(document.getElementById("months_cache").value);
    if (isNaN(months)) {
        months = 0;
    }
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
        await createNotification("Cache deletion delay updated", `The cache will be emptied every ${months} ${pluralS("month", months)} and ${days} ${pluralS("day", days)}.`);
    } else {
        await createNotification("Cache deletion disabled", "Your cache will not be cleared anymore.");
    }
}

async function prefillCache() {
    let cacheData = await getCacheData();
    document.getElementById("days_cache").value = cacheData["days"];
    document.getElementById("months_cache").value = cacheData["months"];
    document.getElementById("enable_cache").checked = cacheData["enabled"];
}
