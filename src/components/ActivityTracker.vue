<script setup>
import { useHarvest } from "../store/useHarvest";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { utcToZonedTime, zonedTimeToUtc, format } from "date-fns-tz";

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const harvestStore = useHarvest();
</script>

<template>
  <div>
    <q-card class="q-ma-md" flat>
      <q-card-section>
        <div class="text-h6">Last Activity Tracker</div>
      </q-card-section>
      <q-card-section class="row">
        <q-list bordered separator>
          <transition-group name="flip-list">
            <q-item
              clickable
              v-ripple
              v-for="user in harvestStore.monthUsers"
              :key="user.id"
              class="row items-center activity-item"
            >
              <q-item-section avatar>
                <q-avatar size="30px">
                  <img :src="user.avatar_url" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <div class="q-gutter-md row items-center justify-between">
                  <div class="text-left" v-if="user.lastTask">
                    <div>{{ user.lastTask.client.name }}</div>
                    <div class="text-weight-light">
                      {{ user.lastTask.project.name }}:
                      {{ user.lastTask.task.name }}
                    </div>
                  </div>
                  <q-spinner-clock
                    v-if="user?.lastTask?.is_running"
                    class="my-spinner"
                    color="primary"
                    size="30px"
                  />
                  <div v-else-if="user?.lastTask">
                    {{
                      formatDistanceToNow(
                        utcToZonedTime(
                          new Date(user.lastTask.updated_at),
                          timezone
                        ),
                        {
                          addSuffix: true,
                        }
                      )
                    }}
                  </div>
                  <div v-else>N/A</div>
                </div>
              </q-item-section>
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
