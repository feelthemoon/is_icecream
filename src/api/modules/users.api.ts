import type { AxiosResponse } from "axios";

import routes from "@/config/api/routes.api";
import { LoadingModules, ErrorNamespaces } from "@/config/api/types";

import createRequest from "../_base.api";

export const createUserGetInfoRequest = (
  token: string
): Promise<AxiosResponse | void> =>
  createRequest({
    method: "GET",
    route: routes.users("me"),
    headers: {
      authorization: token,
    },
    loadingModule: LoadingModules.SIGNIN,
    errorsNamespace: ErrorNamespaces.SIGNIN,
  });
