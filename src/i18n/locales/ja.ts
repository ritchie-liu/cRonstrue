import { Locale } from "../locale"

export class ja implements Locale {
    atX0SecondsPastTheMinuteGt20(): string { return null; }
    atX0MinutesPastTheHourGt20(): string { return null; }
    commaMonthX0ThroughMonthX1(): string { return null; }
    commaYearX0ThroughYearX1(): string { return null; }

    use24HourTimeFormatByDefault() { return false; }

    anErrorOccuredWhenGeneratingTheExpressionD() {
        return "An error occured when generating the expression description.  Check the cron expression syntax.";
    };
    everyMinute() {
        return "every minute";
    };
    everyHour() {
        return "every hour";
    };
    atSpace() {
        return "At ";
    };
    everyMinutebetweenX0AndX1() {
        return "Every minute between %s and %s";
    };
    at() {
        return "At";
    };
    spaceAnd() {
        return " and";
    };
    everysecond() {
        return "every second";
    };
    everyX0Seconds() {
        return "every %s seconds";
    };
    secondsX0ThroughX1PastTheMinute() {
        return "seconds %s through %s past the minute";
    };
    atX0SecondsPastTheMinute() {
        return "at %s seconds past the minute";
    };
    everyX0Minutes() {
        return "every %s minutes";
    };
    minutesX0ThroughX1PastTheHour() {
        return "minutes %s through %s past the hour";
    };
    atX0MinutesPastTheHour() {
        return "at %s minutes past the hour";
    };
    everyX0Hours() {
        return "every %s hours";
    };
    betweenX0AndX1() {
        return "between %s and %s";
    };
    atX0() {
        return "at %s";
    };
    commaEveryDay() {
        return ", every day";
    };
    commaEveryX0daysOfTheWeek() {
        return ", every %s days of the week";
    };
    commaX0ThroughX1() {
        return ", %s through %s";
    };
    first() {
        return "first";
    };
    second() {
        return "second";
    };
    third() {
        return "third";
    };
    forth() {
        return "forth";
    };
    fifth() {
        return "fifth";
    };
    commaOnThe() {
        return ", on the ";
    };
    spaceX0OfTheMonth() {
        return " %s of the month";
    };
    commaOnTheLastX0OfTheMonth() {
        return ", on the last %s of the month";
    };
    commaOnlyOnX0() {
        return ", only on %s";
    };
    commaEveryX0Months() {
        return ", every %s months";
    };
    commaOnlyInX0() {
        return ", only in %s";
    };
    commaOnTheLastDayOfTheMonth() {
        return ", on the last day of the month";
    };
    commaOnTheLastWeekdayOfTheMonth() {
        return ", on the last weekday of the month";
    };
    firstWeekday() {
        return "first weekday";
    };
    weekdayNearestDayX0() {
        return "weekday nearest day %s";
    };
    commaOnTheX0OfTheMonth() {
        return ", on the %s of the month";
    };
    commaEveryX0Days() {
        return ", every %s days";
    };
    commaBetweenDayX0AndX1OfTheMonth() {
        return ", between day %s and %s of the month";
    };
    commaOnDayX0OfTheMonth() {
        return ", on day %s of the month";
    };
    spaceAndSpace() {
        return " and ";
    };
    commaEveryMinute() {
        return ", every minute";
    };
    commaEveryHour() {
        return ", every hour";
    };
    commaEveryX0Years() {
        return ", every %s years";
    };
    commaStartingX0() {
        return ", starting %s";
    };
    daysOfTheWeek() {
        return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    }
    monthsOfTheYear() {
        return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    }
}
