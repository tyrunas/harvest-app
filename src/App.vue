<script setup>
// libraries
import { useQuasar } from "quasar";
import { ref, watch } from "vue";
// components
import WeekList from "./components/WeekList.vue";
import MonthList from "./components/MonthList.vue";
import { useSockets } from "./hooks/useSockets";
import DayList from "./components/DayList.vue";
import ActivityTracker from "./components/ActivityTracker.vue";
const { authorized } = useSockets();
const q = useQuasar();
const isDark = ref(false);

watch(isDark, val => {
  q.dark.set(val);
});
</script>

<template>
  <div>
    <div class="row justify-between">
      <q-toggle v-model="isDark" label="Dark Mode" />
      <div class="text-weight-thin">v0.0.1</div>
    </div>
    <div class="row justify-center" v-if="authorized">
      <DayList />
      <WeekList />
      <MonthList />
      <ActivityTracker />
    </div>
  </div>
</template>

<style>
#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
