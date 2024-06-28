/**
 * This function checks the sheet if there is a timeslot in a certain day where enough people are available to play.
 * @param {array} columns the column corresponding to a day of the week
 * @param {array} userColumns the column corresponding to the users
 * @returns the timeslot array where there are enough people available to play, includes number of people available, timeslot, and the users available, or 0 if there is no timeslot available
 */

function dayChecker(columns, userColumns) {
    // Check if the columns are empty, return 0 immediately if they are
    if (columns.data.values === undefined || userColumns.data.values === undefined) return 0;

    // converts the columns and userColumns into 1D arrays
    const array = columns.data.values.flat();
    const userArray = userColumns.data.values.flat();

    // initialize the result arrays, each array contains the number of people available, the timeslot, and the users available
    // three arrays for the three timeslots: afternoon, night, and all day
    const resultAfternoon = [];
    const resultNight = [];
    const resultAllDay = [];

    // initialize the number of people available to 0
    resultAfternoon[0] = 0;
    resultNight[0] = 0;
    resultAllDay[0] = 0;

    // initialize the timeslot as a string for each array
    resultAfternoon[1] = "afternoon"
    resultNight[1] = "night"
    resultAllDay[1] = "all day"

    // loop through the array and userArray to check the timeslot and the users available
    for (let i = 0; i < array.length; i++) {
        if (array[i] === "A" || array[i] === "C" || array[i] === "a" || array[i] === "c") {
            resultAfternoon[0]++;
            resultAfternoon.push(userArray[i]);
        }
        if (array[i] === "B" || array[i] === "C" || array[i] === "b" || array[i] === "c") {
            resultNight[0]++;
            resultNight.push(userArray[i]);
        }
        if (array[i] === "C" || array[i] === "c") {
            resultAllDay[0]++;
            resultAllDay.push(userArray[i]);
        }
    }

    // return the result array if it has enough people
    if (resultAllDay[0] >= 6) {
        return resultAllDay;
    } else if (resultAfternoon[0] >= 6) {
        return resultAfternoon;
    } else if (resultNight[0] >= 6) {
        return resultNight;
    } else {
        return 0;
    }
}

module.exports = {
	dayChecker
}