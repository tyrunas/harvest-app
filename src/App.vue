<script setup>
import WeekList from "./components/WeekList.vue";
import MonthList from "./components/MonthList.vue";
import { useSockets } from "./hooks/useSockets";
import DayList from "./components/DayList.vue";
import ActivityTracker from "./components/ActivityTracker.vue";
const { authorized } = useSockets();
</script>

<template>
  <div>
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
