import type { AxiosResponse } from "axios";

import routes from "@/config/api/routes.api";
import { ErrorNamespaces, LoadingModules } from "@/config/api/types";

import createRequest from "../_base.api";

export const createGetAllStallsRequest = (
  page: number,
  filters?: { [key: string]: any }
): Promise<AxiosResponse | void> =>
  createRequest(
    {
      method: "GET",
      route: routes.stalls(`all/${page}`),
      params: filters,
    },
    {
      needsAuth: true,
      loadingModule: LoadingModules.TABLE_STALLS,
    }
  );

export const createStallRequest = (stall: any): Promise<AxiosResponse | void> =>
  createRequest(
    {
      method: "POST",
      route: routes.stalls("create"),
      data: stall,
    },
    {
      needsAuth: true,
      errorsNamespace: ErrorNamespaces.CREATE_STALL,
      loadingModule: LoadingModules.CREATE_STALL,
    }
  );
