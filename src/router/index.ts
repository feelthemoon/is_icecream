import {
  createRouter,
  createWebHashHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";

import { LoadingModules } from "@/config/api/types";
import { useRootStore } from "@/stores";

const SigninPage = () =>
  import(/* webpackChunkName: "auth_group" */ "@/views/Auth/Signin.vue");
const SignupPage = () =>
  import(/* webpackChunkName: "auth_group" */ "@/views/Auth/Signup.vue");
const HomePage = () =>
  import(/* webpackChunkName: "home_page" */ "@/views/Main/Home.vue");
const EmployeesPage = () =>
  import(/* webpackChunkName: "employees_page" */ "@/views/Main/Employees.vue");

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
  {
    path: "/employees",
    name: "EmployeesPage",
    component: EmployeesPage,
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

    rootStore.$patch((state) => {
      state.errors = [];
      const commonLoading = state.loading.findIndex(
        (loadingModule) =>
          loadingModule.currentLoadingName === LoadingModules.COMMON
      );

      state.loading.splice(commonLoading, 1);
    });

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
