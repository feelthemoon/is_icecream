import type { AxiosResponse } from "axios";

import routes from "@/config/api/routes.api";

import createRequest from "../_base.api";

export const createUserGetInfoRequest = (): Promise<AxiosResponse | void> =>
  createRequest(
    {
      method: "GET",
      route: routes.users("me"),
    },
    { needsAuth: true }
  );
