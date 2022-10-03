import axios, { AxiosError } from "axios";
import type { AxiosRequestHeaders, Method, AxiosResponse } from "axios";

import { useRootStore } from "@/stores";

const REQUEST_BASE_URL = import.meta.env.VITE_APP_API_URL;
const REQUEST_API_PREFIX = "/api/v1";

export interface RequestConfig {
  route: string;
  method: Method;
  headers?: AxiosRequestHeaders;
  params?: unknown;
  data?: unknown;
  loadingModule?: string;
  errorsNamespace?: string;
}

const createRequest = async (
  requestConfig: RequestConfig
): Promise<AxiosResponse | void> => {
  const rootStore = useRootStore();

  const requestURL =
    REQUEST_BASE_URL + REQUEST_API_PREFIX + requestConfig.route;

  rootStore.$patch((state) => {
    state.loading.push({
      currentLoadingName: requestConfig.loadingModule || "common",
    });
  });

  let response;

  try {
    response = await axios.request({
      ...requestConfig,
      url: requestURL,
      withCredentials: true,
    });

    if (response.headers.authorization) {
      rootStore.$patch({
        token: response.headers.authorization,
      });
    }
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      error.response?.data.message.forEach(
        (err: { type: string; text: string }) => {
          rootStore.patchErrors({
            type: err.type,
            message: err.text,
            namespace: requestConfig.errorsNamespace || "common_error",
          });
        }
      );
    }
    return response;
  } finally {
    rootStore.$patch((state) => {
      state.loading.splice(
        state.loading.findIndex(
          (loadingModule) =>
            loadingModule.currentLoadingName ===
            (requestConfig.loadingModule || "common")
        ),
        1
      );
    });
  }
};

export default createRequest;
