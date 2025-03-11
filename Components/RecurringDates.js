import { format, addDays, addWeeks, addMonths, isBefore, isEqual } from 'date-fns';

const generateRecurringDates = (startDate) => {
    const dates = [];
    let currentDate = startDate;
    const maxIterations = 1000;
    console.log('interval: ' + interval);
    console.log('recurrence: ' + recurrence);

    const formatDate = (date) => format(date, 'yyyy-MM-dd');

    while (dates.length < maxIterations && (isBefore(currentDate, endDate) || formatDate(currentDate) === formatDate(endDate))) {
        dates.push(format(currentDate, 'yyyy-MM-dd'));
        console.log('added date: ' + currentDate);

        switch (recurrence) {
            case 'daily':
                currentDate = addDays(currentDate, interval);
                break;
            case 'weekly':
                currentDate = addWeeks(currentDate, interval);
                break;
            case 'monthly':
                currentDate = addMonths(currentDate, interval);
                break;
            default:
                break;
        }
    }

    return dates;
}

export default generateRecurringDates;