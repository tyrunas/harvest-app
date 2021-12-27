import { createApp } from "vue";
import { createPinia } from "pinia";
import { Quasar } from "quasar";

import "@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";

import App from "./App.vue";

createApp(App).use(createPinia()).use(Quasar).mount("#app");
