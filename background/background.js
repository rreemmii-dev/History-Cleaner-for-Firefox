async function manageHistory() {
    let historyConfig = await getHistoryConfig();

    if (historyConfig["enabled"]) {
        let now = new Date();
        let months = historyConfig["months"];
        let days = historyConfig["days"];
        let endDate = new Date(now.getFullYear(), now.getMonth() - months, now.getDate() - days);

        await browser.history.deleteRange({
            startTime: 0,
            endTime: endDate
        });
        await createNotification(
            "History Deleted",
            `History before ${formatDate(endDate)} has been deleted`
        );
    }
}

async function manageCache() {
    let cacheConfig = await getCacheConfig();

    if (cacheConfig["enabled"]) {
        let last = cacheConfig["last"];
        let months = cacheConfig["months"];
        let days = cacheConfig["days"];
        let lastDate = new Date(last);
        let nextDate = new Date(lastDate.getFullYear(), lastDate.getMonth() + months, lastDate.getDate() + days);

        let now = new Date();
        if (nextDate.getTime() < now.getTime()) {
            await browser.browsingData.removeCache({});
            await createNotification(
                "Cache Deleted",
                "Cache has been deleted"
            );
            cacheConfig["last"] = now.getTime();
            await browser.storage.local.set(cacheConfig);
        }
    }
}

async function manageCookies() {
    let cookiesConfig = await getCookiesConfig();

    if (cookiesConfig["enabled"]) {
        let nbDeletedCookies = 0;
        let cookies = await browser.cookies.getAll({});
        for (let cookie of cookies) {
            let cookieDomain = cookie.domain.startsWith(".") ? cookie.domain.slice(1) : cookie.domain;
            let domaineHasBeenVisited = (await browser.history.search({
                "text": cookieDomain,
                "startTime": 0,
                "maxResults": 1
            })).length > 0;
            if (!domaineHasBeenVisited) {
                let cookieUrl = (cookie.secure ? "https://" : "http://") + cookie.domain + cookie.path;
                let removedCookie = await browser.cookies.remove({
                    "name": cookie.name,
                    "url": cookieUrl
                });
                if (removedCookie != null) {
                    nbDeletedCookies += 1;
                }
            }
        }
        await createNotification(
            "Cookies deleted",
            `${nbDeletedCookies} cookies have been deleted`
        );
    }
}

async function setupStorage() {
    await browser.storage.local.clear();
    await browser.storage.local.set({
        "history": {
            "days": 0,
            "months": 0,
            "enabled": false
        },
        "cache": {
            "days": 0,
            "months": 0,
            "enabled": false,
            "last": Date.now()
        },
        "cookies": {
            "enabled": false
        }
    });
}


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
    await manageCookies();
}

main();
