// ----- HISTORY -----

async function saveHistoryDelay(e) {
    e.preventDefault();
    let days = parseInt(document.getElementById("days_history").value);
    if (isNaN(days)) {
        days = 0;
    }
    let months = parseInt(document.getElementById("months_history").value);
    if (isNaN(months)) {
        months = 0;
    }
    let enabled = document.getElementById("enable_history").checked;
    await browser.storage.local.set({
        "history": {
            "days": days,
            "months": months,
            "enabled": enabled
        }
    });
    if (enabled) {
        await createNotification("History retention period updated", "The retention period for your history is now " + String(months) + " month" + isPlural(months) + " and " + String(days) + " day" + isPlural(days) + ".");
    } else {
        await createNotification("History deletion disabled", "Your history won't be cleared anymore.");
    }
    await showHistoryOptions();
}

async function prefillHistory() {
    let historyData = await getHistoryData();
    document.getElementById("days_history").value = historyData["days"];
    document.getElementById("months_history").value = historyData["months"];
    document.getElementById("enable_history").checked = historyData["enabled"];
}

async function showHistoryOptions() {
    let historyData = await getHistoryData();
    document.getElementById("days_history_span").innerText = String(historyData["days"]);
    document.getElementById("months_history_span").innerText = String(historyData["months"]);
    document.getElementById("enabled_history_span").innerText = String(historyData["enabled"]);
}


// ----- CACHE -----

async function saveCacheDelay(e) {
    e.preventDefault();
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
        await createNotification("Cache deletion delay updated", "The cache will be emptied every " + String(months) + " month" + isPlural(months) + " and " + String(days) + " day" + isPlural(days) + ".");
    } else {
        await createNotification("Cache deletion disabled", "Your cache won't be cleared anymore.");
    }
    await showCacheOptions();
}

async function prefillCache() {
    let cacheData = await getCacheData();
    document.getElementById("days_cache").value = cacheData["days"];
    document.getElementById("months_cache").value = cacheData["months"];
    document.getElementById("enable_cache").checked = cacheData["enabled"];
}

async function showCacheOptions() {
    let cacheData = await getCacheData();
    document.getElementById("days_cache_span").innerText = String(cacheData["days"]);
    document.getElementById("months_cache_span").innerText = String(cacheData["months"]);
    document.getElementById("enabled_cache_span").innerText = String(cacheData["enabled"]);
}


// ----- ON LOADED -----

async function onLoaded() {
    await showHistoryOptions();
    await prefillHistory();
    document.getElementById("submit_history").addEventListener("click", saveHistoryDelay);

    await showCacheOptions();
    await prefillCache();
    document.getElementById("submit_cache").addEventListener("click", saveCacheDelay);

}

document.addEventListener("DOMContentLoaded", onLoaded);
