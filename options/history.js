async function saveHistoryDelay() {
    let days = parseInt(document.getElementById("days_history").value) || 0;
    let months = parseInt(document.getElementById("months_history").value) || 0;
    let enabled = document.getElementById("enable_history").checked;
    await browser.storage.local.set({
        "history": {
            "days": days,
            "months": months,
            "enabled": enabled
        }
    });
    if (enabled) {
        await createNotification("History retention period updated", `Your browsing history will be deleted after ${months} ${pluralS("month", months)} and ${days} ${pluralS("day", days)}.`);
    } else {
        await createNotification("History deletion disabled", "Your browsing history will no longer be automatically deleted.");
    }
}


async function prefillHistory() {
    let historyData = await getHistoryData();
    document.getElementById("days_history").value = historyData["days"];
    document.getElementById("months_history").value = historyData["months"];
    document.getElementById("enable_history").checked = historyData["enabled"];
}
