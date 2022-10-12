import type { AxiosResponse } from "axios";

import routes from "@/config/api/routes.api";
import {
  LoadingModules,
  SigninData,
  SignupData,
  ErrorNamespaces,
} from "@/config/api/types";

import createRequest from "../_base.api";

export const createSigninRequest = (
  data: SigninData
): Promise<AxiosResponse | void> =>
  createRequest(
    {
      method: "POST",
      route: routes.signin,
      data,
    },
    {
      loadingModule: LoadingModules.SIGNIN,
      errorsNamespace: ErrorNamespaces.SIGNIN,
    }
  );

export const createSignupRequest = (
  data: SignupData
): Promise<AxiosResponse | void> =>
  createRequest(
    {
      method: "POST",
      route: routes.signup,
      data,
    },
    {
      loadingModule: LoadingModules.SIGNUP,
      errorsNamespace: ErrorNamespaces.SIGNUP,
    }
  );

export const createRefreshAccessTokenRequest =
  (): Promise<AxiosResponse | void> =>
    createRequest(
      {
        method: "POST",
        route: routes.refreshAccessToken,
      },
      { bubbleErrors: true }
    );

export const createLogoutRequest = (): Promise<AxiosResponse | void> =>
  createRequest(
    {
      method: "POST",
      route: routes.logout,
    },
    {
      loadingModule: LoadingModules.LOGOUT,
      needsAuth: true,
      bubbleErrors: true,
    }
  );
