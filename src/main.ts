import { createApp } from "vue";

import i18n from "@/plugins/i18n";
import router from "@/router";

import App from "./App.vue";

// eslint-disable-next-line import/no-unresolved
import "virtual:windi.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/assets/index.scss";

const app = createApp(App);

app.use(i18n);
app.use(router);

app.mount("#app").$nextTick(() => {
  postMessage({ payload: "removeLoading" }, "*");
});
