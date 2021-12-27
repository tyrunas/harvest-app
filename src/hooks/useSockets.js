// libraries
import { io } from "socket.io-client";
import { ref } from "vue";

// hooks and helpers
import { useHarvest } from "../store/useHarvest";
import { setCalendarProperties } from "../helpers/arrayHelpers";

// get params
const urlSearchParams = new URLSearchParams(window.location.search);
const token = urlSearchParams.get("a");

// make array of users to remove
const remove = urlSearchParams.get("remove");
let usersToRemove = [];
if (remove) {
  usersToRemove = remove.split(",");
  console.log(usersToRemove);
}

let authorized = ref(true);

// make connection to harvest namespace
export const useSockets = () => {
  const socket = io("https://harvest-api.azurewebsites.net/harvest", {
    auth: {
      token,
    },
  });

  const harvestStore = useHarvest();

  const loadUsers = payload => {
    harvestStore.users = [];

    // push users excluding usersToRemove
    payload.forEach(user => {
      if (!usersToRemove.includes(user.first_name.toLowerCase())) {
        console.log(user.first_name);
        harvestStore.users.push(user);
      }
    });
  };

  const loadTimeEntries = payload => {
    harvestStore.entries = [];
    payload.forEach(entry => setCalendarProperties(entry));
    harvestStore.entries = payload;
  };

  const updateTimeEntries = entry => {
    setCalendarProperties(entry);
    const index = harvestStore.entries.findIndex(item => item.id === entry.id);

    if (index === -1) {
      harvestStore.entries.push(entry);
      return;
    }
    harvestStore.entries.splice(index, 1, entry);
  };

  const setUnauthorized = () => {
    authorized.value = false;
  };

  // listeners
  socket.on("not-authorized", setUnauthorized);
  socket.on("harvest:users", loadUsers);
  socket.on("harvest:initial-entries", loadTimeEntries);
  socket.on("harvest:update-entry", updateTimeEntries);
  socket.on("harvest:new-entry", updateTimeEntries);

  return { authorized };
};
