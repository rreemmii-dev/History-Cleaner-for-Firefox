function historyCheckboxUpdated(checkbox) {
    let body = document.getElementById("body_history");
    let days = document.getElementById("days_history");
    let months = document.getElementById("months_history");
    if (checkbox.checked) {
        body.classList.remove("hidden");
        days.disabled = false;
        months.disabled = false;
    } else {
        body.classList.add("hidden");
        days.disabled = true;
        months.disabled = true;
    }
}

function cacheCheckboxUpdated(checkbox) {
    let body = document.getElementById("body_cache");
    let days = document.getElementById("days_cache");
    let months = document.getElementById("months_cache");
    if (checkbox.checked) {
        body.classList.remove("hidden");
        days.disabled = false;
        months.disabled = false;
    } else {
        body.classList.add("hidden");
        days.disabled = true;
        months.disabled = true;
    }
}

function historyCheckboxClicked(event) {
    historyCheckboxUpdated(event.target);
}

function cacheCheckboxClicked(event) {
    cacheCheckboxUpdated(event.target);
}


async function historyRestoreClicked() {
    await prefillHistoryConfig();
    let checkbox = document.getElementById("enable_history");
    historyCheckboxUpdated(checkbox);
}

async function cacheRestoreClicked() {
    await prefillCacheConfig();
    let checkbox = document.getElementById("enable_cache");
    cacheCheckboxUpdated(checkbox);
}

async function cookiesRestoreClicked() {
    await prefillCookiesConfig();
}


async function onLoaded() {
    await prefillHistoryConfig();
    document.getElementById("submit_history").addEventListener("click", saveHistoryConfig);
    document.getElementById("restore_history").addEventListener("click", historyRestoreClicked);

    await prefillCacheConfig();
    document.getElementById("submit_cache").addEventListener("click", saveCacheConfig);
    document.getElementById("restore_cache").addEventListener("click", cacheRestoreClicked);

    await prefillCookiesConfig();
    document.getElementById("submit_cookies").addEventListener("click", saveCookiesConfig);
    document.getElementById("restore_cookies").addEventListener("click", cookiesRestoreClicked);

    document.getElementById("enable_history").addEventListener("click", historyCheckboxClicked);
    document.getElementById("enable_cache").addEventListener("click", cacheCheckboxClicked);
}

document.addEventListener("DOMContentLoaded", onLoaded);
