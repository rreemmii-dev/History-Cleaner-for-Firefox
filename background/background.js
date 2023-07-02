// ----- FUNCTIONS -----

async function manageHistory() {
    let historyData = await getHistoryData();

    if (historyData["enabled"]) {
        let now = new Date();
        let months = historyData["months"];
        let days = historyData["days"];
        let endTime = new Date(now.getFullYear(), now.getMonth() - months, now.getDate() - days);

        await browser.history.deleteRange({
            startTime: 0,
            endTime: endTime
        });
        await createNotification(
            "History Deleted",
            "History before " + formatDate(endTime) + " has been deleted"
        );
    }
}

async function manageCache() {
    let cacheData = await getCacheData();

    if (cacheData["enabled"]) {
        let last = cacheData["last"];
        let months = cacheData["months"];
        let days = cacheData["days"];
        let lastDate = new Date(last);
        let nextDate = new Date(lastDate.getFullYear(), lastDate.getMonth() + months, lastDate.getDate() + days);

        let now = new Date();
        if (nextDate.getTime() < now.getTime()) {
            await browser.browsingData.removeCache({});
            await createNotification(
                "Cache Deleted",
                "Cache has been deleted"
            );
            cacheData["last"] = now.getTime();
            await browser.storage.local.set(cacheData);
        }
    }
}

async function setupStorage() {
    await browser.storage.local.clear();
    await browser.storage.local.set({
        "cache": {
            "days": 0,
            "months": 0,
            "enabled": false,
            "last": Date.now()
        },
        "history": {
            "days": 0,
            "months": 0,
            "enabled": false
        }
    });
}


// ----- MAIN -----

async function main() {
    browser.runtime.onInstalled.addListener((details) => {
        if (details.reason === "install") {
            setupStorage().then(() => {
                browser.runtime.openOptionsPage();
                createNotification("Extension successfully installed", "");
            });
        }
    });

    browser.browserAction.onClicked.addListener(() => {
        browser.runtime.openOptionsPage();
    });

    await manageHistory();
    await manageCache();
}

main();
