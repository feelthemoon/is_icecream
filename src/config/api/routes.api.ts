export default {
  signin: "/signin",
  signup: "/signup",
  refreshAccessToken: "/refresh",
  logout: "/logout",
  employees(route: string) {
    return `/employees/${route}`;
  },
  stalls(route: string) {
    return `/stalls/${route}`;
  },
};
