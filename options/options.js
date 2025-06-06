function history_checkbox_updated(checkbox) {
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

function cache_checkbox_updated(checkbox) {
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

function history_checkbox_clicked(event) {
    history_checkbox_updated(event.target);
}

function cache_checkbox_clicked(event) {
    cache_checkbox_updated(event.target);
}


async function history_restore_clicked() {
    await prefillHistory();
    let checkbox = document.getElementById("enable_history");
    history_checkbox_updated(checkbox);
}

async function cache_restore_clicked() {
    await prefillCache();
    let checkbox = document.getElementById("enable_cache");
    cache_checkbox_updated(checkbox);
}


async function onLoaded() {
    await prefillHistory();
    document.getElementById("submit_history").addEventListener("click", saveHistoryDelay);
    document.getElementById("restore_history").addEventListener("click", history_restore_clicked);

    await prefillCache();
    document.getElementById("submit_cache").addEventListener("click", saveCacheDelay);
    document.getElementById("restore_cache").addEventListener("click", cache_restore_clicked);

    document.getElementById("enable_history").addEventListener("click", history_checkbox_clicked);
    document.getElementById("enable_cache").addEventListener("click", cache_checkbox_clicked);
}

document.addEventListener("DOMContentLoaded", onLoaded);
