// Function to calculate number of days between two dates
function calculateDaysBetweenDates(startDate, endDate) {
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const start = new Date(startDate);
    const end = new Date(endDate);
    // Calculate the difference in days
    const diffDays = Math.round(Math.abs((start.getTime() - end.getTime()) / oneDay));
    return diffDays + 1; // Add 1 to include both start and end dates
}
export { calculateDaysBetweenDates };
