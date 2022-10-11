export default {
  signin: "/signin",
  signup: "/signup",
  refreshAccessToken: "/refresh",
  users(route: string) {
    return `/users/${route}`;
  },
};
