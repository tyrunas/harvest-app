import { useHarvest } from "../store/useHarvest";

const useActivityTracker = () => {
  const harvestStore = useHarvest();

  const setLastActivity = () => {
    harvestStore.monthUsers.forEach(user => {
      const runningTask = user.entries.filter(entry => entry.is_running);
      if (runningTask.length) {
        user.lastTask = runningTask[0];
      } else {
        user.entries.sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1));
        user.lastTask = user.entries[0];
      }
    });
  };

  return { setLastActivity };
};

export default useActivityTracker;
