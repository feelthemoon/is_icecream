export default {
  signin: "/signin",
  signup: "/signup",
  users(route: string) {
    return `/users/${route}`;
  },
};
