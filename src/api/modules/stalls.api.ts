import type { AxiosResponse } from "axios";

import routes from "@/config/api/routes.api";
import { LoadingModules } from "@/config/api/types";

import createRequest from "../_base.api";

export const createGetAllStallsRequest = (
  page: number
): Promise<AxiosResponse | void> =>
  createRequest(
    { method: "GET", route: routes.stalls(`all/${page}`) },
    {
      needsAuth: true,
      loadingModule: LoadingModules.TABLE_STALLS,
    }
  );
