import { createApp } from "vue";

import { createPinia } from "pinia";

import i18n from "@/plugins/i18n";
import router from "@/router";
import { resetStore } from "@/stores";

import App from "./App.vue";

// eslint-disable-next-line import/no-unresolved
import "virtual:windi.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/assets/index.scss";

const app = createApp(App);

const pinia = createPinia();
pinia.use(resetStore);

app.use(pinia);
app.use(i18n);
app.use(router);

app.mount("#app").$nextTick(() => {
  postMessage({ payload: "removeLoading" }, "*");
});
