// import { DayCalculator } from './DayCalculator';
// export class howDay {
//     getRandom(startDate: Date, endDate: Date): number {
//       return DayCalculator.calculateDaysDifference(startDate, endDate);
//     }
//   }

  export class DayCalculator {
    static calculateDaysDifference(startDate: Date, endDate: Date): number {
      const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
      const diffDays = Math.round(Math.abs((endDate.getTime() - startDate.getTime()) / oneDay));
      return diffDays;
    }
  }


