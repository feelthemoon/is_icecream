import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import { useRootStore } from "@/stores";

const SigninPage = () =>
  import(/* webpackChunkName: "auth_group" */ "@/views/Auth/Signin.vue");
const SignupPage = () =>
  import(/* webpackChunkName: "auth_group" */ "@/views/Auth/Signup.vue");
const HomePage = () =>
  import(/* webpackChunkName: "home_page" */ "@/views/Main/Home.vue");

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: { name: "SigninPage" },
  },
  {
    path: "/signin",
    name: "SigninPage",
    component: SigninPage,
  },
  {
    path: "/signup",
    name: "SignupPage",
    component: SignupPage,
  },
  {
    path: "/home",
    name: "HomePage",
    component: HomePage,
    meta: {
      layout: "main",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((_, __, next) => {
  const rootStore = useRootStore();
  rootStore.$patch({ errors: [] });
  next();
});

export default router;
