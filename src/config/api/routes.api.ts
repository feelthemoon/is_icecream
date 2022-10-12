export default {
  signin: "/signin",
  signup: "/signup",
  refreshAccessToken: "/refresh",
  logout: "/logout",
  users(route: string) {
    return `/users/${route}`;
  },
};
