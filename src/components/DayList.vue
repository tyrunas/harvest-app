<script setup>
import useDay from "../hooks/useDay";

const { thisDayUsersEntries } = useDay();
</script>

<template>
  <div>
    <q-card class="q-ma-md" flat>
      <q-card-section>
        <div class="text-h6">Today Progress</div>
      </q-card-section>
      <q-card-section class="row">
        <q-list bordered>
          <transition-group name="flip-list">
            <q-item v-for="user in thisDayUsersEntries" :key="user.id">
              <q-item-section avatar>
                <q-avatar size="30px">
                  <img :src="user.avatar_url" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-linear-progress
                  style="width: 200px"
                  size="25px"
                  :value="user.dayProgress"
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
                {{ (user.dayProgress * 100).toFixed(0) }}%
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
