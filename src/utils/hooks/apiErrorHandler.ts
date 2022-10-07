import { AxiosError } from "axios";

import { RequestConfig, ErrorNamespaces } from "@/config/api/types";
import router from "@/router";
import { useRootStore } from "@/stores/root.store";

export const useApiErrorHandler = (
  error: unknown,
  requestConfig: RequestConfig
) => {
  const rootStore = useRootStore();

  if (error instanceof AxiosError && error.response?.data) {
    error.response?.data.message.forEach(
      (err: { type: string; text: string }) => {
        rootStore.patchErrors({
          type: err.type,
          message: err.text,
          namespace: requestConfig.errorsNamespace || ErrorNamespaces.COMMON,
        });
      }
    );

    if (error.response?.status === 401) {
      rootStore.$reset();
      localStorage.clear();

      router.push({ name: "SigninPage" });
    }
  } else {
    rootStore.patchErrors({
      type: "common_error",
      namespace: ErrorNamespaces.COMMON,
    });
  }
};
