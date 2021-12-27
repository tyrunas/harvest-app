import { useHarvest } from "../store/useHarvest";
import { computed } from "vue";
import {
  countTotalHours,
  setMonthProgress,
  sortByProgress,
} from "../helpers/arrayHelpers";
import { getYear, getMonth } from "date-fns";
import useActivityTracker from "./useActivityTracker";

const useMonth = () => {
  const harvestStore = useHarvest();
  const activityTracer = useActivityTracker();

  const thisYear = getYear(new Date());
  const thisMonth = getMonth(new Date()) + 1;

  const thisMonthEntries = computed(() => {
    const entries = JSON.parse(JSON.stringify(harvestStore.entries));
    return entries.filter(
      entry => entry.month === thisMonth && entry.year === thisYear
    );
  });

  const thisMonthUsersEntries = computed(() => {
    const users = JSON.parse(JSON.stringify(harvestStore.users));

    users.forEach(user => {
      user.entries = [];
    });

    thisMonthEntries.value.forEach(entry => {
      // define user
      users.forEach(user => {
        if (user.id === entry.user.id) {
          user.entries.push(entry);
        }
      });
    });

    users.forEach(user => {
      countTotalHours(user);
      setMonthProgress(user);
    });

    sortByProgress(users);
    harvestStore.monthUsers = users;
    activityTracer.setLastActivity();

    return users;
  });
  return { thisMonthUsersEntries };
};

export default useMonth;
