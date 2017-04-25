import { Options } from "./options"

/**
 * Parses and normalizes a cron expression
 * @export
 * @class CronParser
 */
export class CronParser {
    expression: string;
    dayOfWeekStartIndexZero: boolean;

    constructor(expression: string, dayOfWeekStartIndexZero: boolean = true) {
        this.expression = expression;
        this.dayOfWeekStartIndexZero = dayOfWeekStartIndexZero;
    }

    /**
     * Parses and normalizes a cron expression into an array of strings
     * @returns {string[]}
     */
    parse(): string[] {
        if (!this.expression) {
            throw new Error("Expression is empty");
        }

        let parsed: string[] = this.expression.trim().split(' ');

        if (parsed.length < 5) {
            throw new Error(`Expression only has ${parsed.length} parts.  At least 5 part are required.`);
        } else if (parsed.length == 5) {
            //5 part cron so shift array past seconds element
            parsed.unshift("");
            parsed.push("");
        } else if (parsed.length == 6) {
            //If last element ends with 4 digits, a year element has been supplied and no seconds element
            if (/\d{4}$/.test(parsed[5])) {
                // year provided
                parsed.unshift('');
            } else {
                // seconds provided
                parsed.push('');
            }
        } else if (parsed.length > 7) {
            throw new Error(`Expression has ${parsed.length} parts; too many!`);
        }

        this.normalizeExpression(parsed);
        return parsed;
    }

    protected normalizeExpression(expressionParts: string[]): void {
        // Convert ? to * only for DOM and DOW
        expressionParts[3] = expressionParts[3].replace("?", "*");
        expressionParts[5] = expressionParts[5].replace("?", "*");

        // Convert 0/, 1/ to */
        if (expressionParts[0].indexOf("0/") == 0) {
            // Seconds
            expressionParts[0] = expressionParts[0].replace("0/", "*/");
        }

        if (expressionParts[1].indexOf("0/") == 0) {
            // Minutes
            expressionParts[1] = expressionParts[1].replace("0/", "*/");
        }

        if (expressionParts[2].indexOf("0/") == 0) {
            // Hours
            expressionParts[2] = expressionParts[2].replace("0/", "*/");
        }

        if (expressionParts[3].indexOf("1/") == 0) {
            // DOM
            expressionParts[3] = expressionParts[3].replace("1/", "*/");
        }

        if (expressionParts[4].indexOf("1/") == 0) {
            // Month
            expressionParts[4] = expressionParts[4].replace("1/", "*/");
        }

        // for everRun, do not convert DOW
        // if (expressionParts[5].indexOf("1/") == 0) {
        //     // DOW
        //     expressionParts[5] = expressionParts[5].replace("1/", "*/");
        // }

        if (expressionParts[6].indexOf("1/") == 0) {
            // Years
            expressionParts[6] = expressionParts[6].replace("1/", "*/");
        }

        // Adjust DOW based on dayOfWeekStartIndexZero option
        expressionParts[5] = expressionParts[5].replace(/(^\d)|([^#/\s]\d)/g, (t) => { //skip anything preceeded by # or /
            let dowDigits = t.replace(/\D/, ""); // extract digit part (i.e. if "-2" or ",2", just take 2)
            let dowDigitsAdjusted: string = dowDigits;

            if (this.dayOfWeekStartIndexZero) {
                // "7" also means Sunday so we will convert to "0" to normalize it
                if (dowDigits == "7") {
                    dowDigitsAdjusted = "0";
                }
            } else {
                // If dayOfWeekStartIndexZero==false, Sunday is specified as 1 and Saturday is specified as 7.
                // To normalize, we will shift the  DOW number down so that 1 becomes 0, 2 becomes 1, and so on.
                dowDigitsAdjusted = (parseInt(dowDigits) - 1).toString();
            }

            return t.replace(dowDigits, dowDigitsAdjusted);
        });

        // Convert DOM '?' to '*'
        if (expressionParts[3] == "?") {
            expressionParts[3] = "*";
        }

        if (expressionParts[3].indexOf('W') > -1 && (expressionParts[3].indexOf(',') > -1 || expressionParts[3].indexOf('-') > -1)) {
            throw new Error("The 'W' character can be specified only when the day-of-month is a single day, not a range or list of days.");
        }

        // Convert SUN-SAT format to 0-6 format
        var days: { [key: string]: number } = {
            "SUN": 0, "MON": 1, "TUE": 2, "WED": 3, "THU": 4, "FRI": 5, "SAT": 6
        };
        for (let day in days) {
            expressionParts[5] = expressionParts[5].replace(new RegExp(day, "g"), days[day].toString());
        }

        // Convert JAN-DEC format to 1-12 format
        var months: { [key: string]: number } = {
            "JAN": 1, "FEB": 2, "MAR": 3, "APR": 4, "MAY": 5, "JUN": 6, "JUL": 7, "AUG": 8, "SEP": 9, "OCT": 10, "NOV": 11, "DEC": 12
        };
        for (let month in months) {
            expressionParts[4] = expressionParts[4].replace(new RegExp(month, "g"), months[month].toString());
        }

        // Convert 0 second to (empty)
        if (expressionParts[0] == "0") {
            expressionParts[0] = "";
        }

        // Loop through all parts and apply global normalization
        for (let i = 0; i < expressionParts.length; i++) {
            // convert all '*/1' to '*'
            if (expressionParts[i] == "*/1") {
                expressionParts[i] = "*";
            }

            /* Convert Month,DOW,Year step values with a starting value (i.e. not '*') to between expressions.
                This allows us to reuse the between expression handling for step values.

                For Example:
                - month part '3/2' will be converted to '3-12/2' (every 2 months between March and December)
                - DOW part '3/2' will be converted to '3-6/2' (every 2 days between Tuesday and Saturday)
            */

            if (expressionParts[i].indexOf("/") > -1
                && !(/^\*|\-|\,/.test(expressionParts[i]))) {
                let stepRangeThrough: string = null;
                switch (i) {
                    case 4: stepRangeThrough = "12"; break;
                    // case 5: stepRangeThrough = "6"; break; // for everRun, do not convert DOW
                    case 6: stepRangeThrough = "9999"; break;
                    default: stepRangeThrough = null; break;
                }

                if (stepRangeThrough != null) {
                    let parts: string[] = expressionParts[i].split("/");
                    expressionParts[i] = `${parts[0]}-${stepRangeThrough}/${parts[1]}`;
                }
            }
        }
    }
}
