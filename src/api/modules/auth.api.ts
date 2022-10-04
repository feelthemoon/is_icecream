import type { AxiosResponse } from "axios";

import createRequest from "../_base.api";
import routes from "../config/routes.api";

export const createSigninRequest = (data: any): Promise<AxiosResponse | void> =>
  createRequest({
    method: "POST",
    route: routes.signin,
    data,
    loadingModule: "signin",
    errorsNamespace: "signin",
  });

export const createSignupRequest = (data: any): Promise<AxiosResponse | void> =>
  createRequest({
    method: "POST",
    route: routes.signup,
    data,
    loadingModule: "signup",
    errorsNamespace: "signup",
  });
