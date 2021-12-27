import {
  differenceInBusinessDays,
  startOfMonth,
  endOfMonth,
  getISOWeek,
  getYear,
  getMonth,
  getDayOfYear,
} from "date-fns";

export const setWeekProgress = user => {
  user.weekProgress = (100 * user.totalHours.toFixed(2)) / 40 / 100;
};

export const setMonthProgress = user => {
  const numberOfWorkingDays = differenceInBusinessDays(
    endOfMonth(new Date()),
    startOfMonth(new Date())
  );
  const numberOfWorkingHours = numberOfWorkingDays * 8;
  user.monthProgress = (user.totalHours * 100) / numberOfWorkingHours / 100;
};

export const setDayProgress = user => {
  user.dayProgress = (user.totalHours * 100) / 8 / 100;
};

export const setCalendarProperties = entry => {
  entry.weekNumber = getISOWeek(new Date(entry.spent_date));
  entry.year = getYear(new Date(entry.spent_date));
  entry.day = getDayOfYear(new Date(entry.spent_date));
  entry.month = getMonth(new Date(entry.spent_date)) + 1;
};

export const countTotalHours = user => {
  user.totalHours = user.entries.reduce(
    (acc, current) => acc + current.hours,
    0
  );
};

export const sortByProgress = users => {
  users.sort((a, b) => b.totalHours - a.totalHours);
};
