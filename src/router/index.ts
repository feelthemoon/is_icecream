import {
  createRouter,
  createWebHashHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";

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
    redirect: { name: "HomePage" },
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
      needsAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
    _: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const rootStore = useRootStore();
    rootStore.$patch({ errors: [] });

    if (!to.meta.needsAuth && localStorage.getItem("login")) {
      next({ name: "HomePage" });
    } else if (to.meta.needsAuth && !localStorage.getItem("login")) {
      next({ name: "SigninPage" });
    } else {
      next();
    }
  }
);

export default router;
