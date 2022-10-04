import { createRouter, createWebHashHistory } from "vue-router";

const SigninPage = () =>
  import(/* webpackChunkName: "auth_group" */ "@/views/Auth/Signin.vue");
const SignupPage = () =>
  import(/* webpackChunkName: "auth_group" */ "@/views/Auth/Signup.vue");

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
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
  ],
});

export default router;
