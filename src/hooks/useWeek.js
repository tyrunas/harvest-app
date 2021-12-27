import { useHarvest } from "../store/useHarvest";
import { computed } from "vue";

import { getISOWeek, getYear } from "date-fns";
import {
  countTotalHours,
  setWeekProgress,
  sortByProgress,
} from "../helpers/arrayHelpers";

const useWeek = () => {
  const harvestStore = useHarvest();

  const thisYear = getYear(new Date());
  const thisWeekNumber = getISOWeek(new Date());

  // filter week entries
  const thisWeekEntries = computed(() => {
    const entries = JSON.parse(JSON.stringify(harvestStore.entries));
    return entries.filter(
      entry => entry.weekNumber === thisWeekNumber && entry.year === thisYear
    );
  });

  const thisWeekUsersEntries = computed(() => {
    // clone entries from store
    const users = JSON.parse(JSON.stringify(harvestStore.users));

    // reset all users entries
    users.forEach(user => {
      user.entries = [];
    });

    // iterate through entries
    thisWeekEntries.value.forEach(entry => {
      // push entires to users
      users.forEach(user => {
        if (user.id === entry.user.id) {
          user.entries.push(entry);
        }
      });
    });

    // calc totals
    users.forEach(user => {
      countTotalHours(user);
      setWeekProgress(user);
    });

    // sort users array by progress
    sortByProgress(users);
    return users;
  });

  return { thisWeekUsersEntries };
};

export default useWeek;
