import { io } from "socket.io-client";
import { useHarvest } from "../store/useHarvest";
import { computed } from "vue";
import { getWeek } from "date-fns";

export const useSockets = () => {
  const socket = io("ws://localhost:3000/harvest");

  const harvestStore = useHarvest();

  const resetUsers = () => {
    harvestStore.users.forEach(user => {
      user.entries = [];
      user.totalHours = 0;
      user.weekProgress = 0;
    });
  };

  const loadUsers = payload => {
    harvestStore.users = payload;
    resetUsers();
  };

  const setUserProgress = user => {
    user.weekProgress = (100 * user.totalHours.toFixed(2)) / 40 / 100;
  };

  const checkRunningTasks = user => {
    const runningTasks = user.entries.filter(
      entry => entry.is_running === true
    );
    if (runningTasks.length) {
      user.running = {
        client: runningTasks[0].client.name,
        project: runningTasks[0].project.name,
        task: runningTasks[0].task.name,
      };
    } else {
      user.running = null;
    }
  };

  const updateTimeEntries = payload => {
    const index = harvestStore.entries.findIndex(
      entry => entry.id === payload.id
    );
    if (index === -1) {
      harvestStore.entries.push(payload);
      return;
    }
    harvestStore.entries.splice(index, 1, payload);
  };

  const updateUser = payload => {
    // find proper user
    const userId = payload.user.id;
    const userIndex = harvestStore.users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
      return;
    }
    const user = harvestStore.users[userIndex];

    // find entry

    const entryIndex = user.entries.findIndex(entry => entry.id === payload.id);

    //add entry
    if (entryIndex === -1) {
      user.entries.push(payload);
    }

    // replace entry
    if (entryIndex !== -1) {
      user.entries.splice(entryIndex, 1, payload);
    }
    // finally sort users array

    user.totalHours = user.entries.reduce(
      (acc, current) => acc + current.hours,
      0
    );

    setUserProgress(user);
    checkRunningTasks(user);

    harvestStore.users.sort((a, b) => b.totalHours - a.totalHours);
  };

  const loadTimeEntries = payload => {
    payload.forEach(entry => {
      entry.weekNumber = getWeek(new Date(entry.spent_date));
      updateTimeEntries(entry);
      // updateUser(entry);
    });
  };

  const thisWeek = computed(() => {
    harvestStore.users.forEach(user => {});
  });

  socket.on("harvest:users", loadUsers);
  socket.on("harvest:initial-entries", loadTimeEntries);
  socket.on("harvest:update-entry", updateUser);
  socket.on("harvest:update-entry", updateTimeEntries);
  // socket.on("harvest:new-entry", updateUser);

  return {};
};
