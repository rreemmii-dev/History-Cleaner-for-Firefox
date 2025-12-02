function pluralS(label, n) {
    return (n >= 2) ? label + "s" : label;
}

function addLeadingZeros(totalLength, number) {
    return String(number).padStart(totalLength, "0");
}

function formatDate(date) {
    let year = date.getFullYear();
    let month = addLeadingZeros(2, date.getMonth() + 1);
    let day = addLeadingZeros(2, date.getDate());
    return `${year}-${month}-${day}`;
}


async function createNotification(title, message) {
    await browser.notifications.create(
        {
            "type": "basic",
            "title": title,
            "message": message
        }
    );
}

async function getHistoryConfig() {
    let res = await browser.storage.local.get("history");
    return res.history;
}

async function getCacheConfig() {
    let res = await browser.storage.local.get("cache");
    return res.cache;
}

async function getCookiesConfig() {
    let res = await browser.storage.local.get("cookies");
    return res.cookies;
}
