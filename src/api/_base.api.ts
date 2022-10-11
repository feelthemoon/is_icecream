import axios from "axios";
import type { AxiosResponse } from "axios";

import {
  LoadingModules,
  RequestConfig,
  RequestOptions,
} from "@/config/api/types";
import { useRootStore } from "@/stores";
import { useApiErrorHandler } from "@/utils/hooks";

const REQUEST_BASE_URL = import.meta.env.VITE_APP_API_URL;
const REQUEST_API_PREFIX = "/api/v1";

const createRequest = async (
  requestConfig: RequestConfig,
  requestOptions?: RequestOptions
): Promise<AxiosResponse | void> => {
  const rootStore = useRootStore();

  const requestURL =
    REQUEST_BASE_URL + REQUEST_API_PREFIX + requestConfig.route;

  rootStore.$patch((state) => {
    state.loading.push({
      currentLoadingName:
        requestOptions?.loadingModule || LoadingModules.COMMON,
    });
    state.errors = [];
  });

  let response: AxiosResponse;

  try {
    response = await axios.request({
      ...requestConfig,
      url: requestURL,
      withCredentials: true,
    });

    if (response.headers.authorization) {
      rootStore.$patch((state) => {
        localStorage.setItem("login", "true");
        state.token = response.headers.authorization;
      });
    }

    return response;
  } catch (error) {
    useApiErrorHandler(error, requestOptions?.errorsNamespace);

    if (requestOptions?.bubbleErrors) {
      throw error;
    }
  } finally {
    rootStore.$patch((state) => {
      const currentLoadingIndex = state.loading.findIndex(
        (loadingModule) =>
          loadingModule.currentLoadingName === requestOptions?.loadingModule
      );

      state.loading.splice(currentLoadingIndex, 1);
    });
  }
};

export default createRequest;
