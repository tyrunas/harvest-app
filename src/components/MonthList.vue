<script setup>
import useMonth from "../hooks/useMonth";

const barColor = progress => {
  if (progress < 0.25) return "negative";
  if (progress < 0.5) return "warning";
  return "positive";
};

const { thisMonthUsersEntries } = useMonth();
</script>

<template>
  <div>
    <q-card class="q-ma-md" flat>
      <q-card-section>
        <div class="text-h6">This Month Results</div>
      </q-card-section>
      <q-card-section class="row">
        <q-list bordered>
          <transition-group name="flip-list">
            <q-item
              clickable
              v-ripple
              v-for="user in thisMonthUsersEntries"
              :key="user.id"
              class="row items-center"
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
                  :value="user.monthProgress"
                  :color="barColor(user.monthProgress)"
                >
                  <div class="absolute-full flex flex-center">
                    <q-badge color="white" text-color="primary">
                      {{ user.totalHours.toFixed(2) }}
                    </q-badge>
                  </div>
                </q-linear-progress>
              </q-item-section>

              <span class="q-ml-md text-weight-light">
                {{ (user.monthProgress * 100).toFixed(0) }}%
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
