function dayChecker(columns, userColumns) {
    if (columns.data.values === undefined || userColumns.data.values === undefined) return 0;
    const array = columns.data.values.flat();
    const userArray = userColumns.data.values.flat();
    const resultAfternoon = [];
    const resultNight = [];
    const resultAllDay = [];
    resultAfternoon[0] = 0;
    resultNight[0] = 0;
    resultAllDay[0] = 0;
    resultAfternoon[1] = "afternoon"
    resultNight[1] = "night"
    resultAllDay[1] = "all day"

    for (let i = 0; i < array.length; i++) {
        if (array[i] === "A" || array[i] === "C") {
            resultAfternoon[0]++;
            resultAfternoon.push(userArray[i]);
        }
        if (array[i] === "B" || array[i] === "C") {
            resultNight[0]++;
            resultNight.push(userArray[i]);
        }
        if (array[i] === "C") {
            resultAllDay[0]++;
            resultAllDay.push(userArray[i]);
        }
    }

    if (resultAllDay[0] >= 2) {
        return resultAllDay;
    } else if (resultAfternoon[0] >= 2) {
        return resultAfternoon;
    } else if (resultNight[0] >= 2) {
        return resultNight;
    } else {
        return 0;
    }
}

module.exports = {
	dayChecker
}