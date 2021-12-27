<script setup>
import useWeek from "../hooks/useWeek";

const { thisWeekUsersEntries } = useWeek();
</script>

<template>
  <div>
    <q-card class="q-ma-md" flat>
      <q-card-section>
        <div class="text-h6">This Week Results</div>
      </q-card-section>
      <q-card-section class="row">
        <q-list bordered>
          <transition-group name="flip-list">
            <q-item
              clickable
              v-ripple
              v-for="user in thisWeekUsersEntries"
              :key="user.id"
            >
              <q-item-section avatar>
                <q-avatar size="30px">
                  <img :src="user.avatar_url" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-linear-progress
                  style="width: 200px"
                  size="25px"
                  :value="user.weekProgress"
                  color="primary"
                >
                  <div class="absolute-full flex flex-center">
                    <q-badge color="white" text-color="primary">
                      {{ user.totalHours.toFixed(2) }}
                    </q-badge>
                  </div>
                </q-linear-progress>
              </q-item-section>
              <span class="q-ml-md text-weight-light">
                {{ (user.weekProgress * 100).toFixed(0) }}%
              </span>
            </q-item>
          </transition-group>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped>
.flip-list-move {
  transition: transform 0.8s ease;
}
</style>
