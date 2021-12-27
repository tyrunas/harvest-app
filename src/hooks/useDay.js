import { useHarvest } from "../store/useHarvest";
import { computed } from "vue";

import { getDayOfYear, getYear } from "date-fns";
import {
  countTotalHours,
  setDayProgress,
  sortByProgress,
} from "../helpers/arrayHelpers";

const useDay = () => {
  const harvestStore = useHarvest();

  const thisYear = getYear(new Date());
  const thisDay = getDayOfYear(new Date());

  // filter week entries
  const thisDayEntries = computed(() => {
    const entries = JSON.parse(JSON.stringify(harvestStore.entries));
    return entries.filter(
      entry => entry.day === thisDay && entry.year === thisYear
    );
  });

  const thisDayUsersEntries = computed(() => {
    // clone entries from store
    const users = JSON.parse(JSON.stringify(harvestStore.users));

    // reset all users entries
    users.forEach(user => {
      user.entries = [];
    });

    // iterate through entries
    thisDayEntries.value.forEach(entry => {
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
      setDayProgress(user);
    });

    // sort users array by progress
    sortByProgress(users);
    return users;
  });

  return { thisDayUsersEntries };
};

export default useDay;
