// ----- UTILS -----

function addLeadingZeros(totalLength, number) {
    return String(number).padStart(totalLength, "0");
}

function formatDate(date) {
    let year = date.getFullYear();
    let month = addLeadingZeros(2, date.getMonth() + 1);
    let day = addLeadingZeros(2, date.getDate());
    return year + "-" + month + "-" + day;
}



// ----- SHORTCUTS -----

function createNotification(title, message) {
    browser.notifications.create(
        {
            "type": "basic",
            "title": title,
            "message": message
        }
    );
}



// ----- DATES -----

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MONTH = 30 * DAY;

function endDate() {
    let now = new Date();
    let aMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    return aMonthAgo;
}



// ----- MAIN -----

function main() {
    let endTime = endDate()

    browser.history.deleteRange({
        startTime: 0,
        endTime: endTime
    });
    createNotification(
        "History Deleted",
        "History before " + formatDate(endTime) + " has been deleted"
    );
}

if (!browser.browserAction.onClicked.hasListener(main)) {
    browser.browserAction.onClicked.addListener(main);
}

main();
