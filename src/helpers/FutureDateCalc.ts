
export function FutureDateCalc(dateString: Date, days: number): Date {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date;
}