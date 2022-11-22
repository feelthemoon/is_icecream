import { AxiosError } from "axios";

import { ErrorNamespaces } from "@/config/api/types";
import router from "@/router";
import { useRootStore } from "@/stores/root.store";

export const useApiErrorHandler = (
  error: unknown,
  errorsNamespace: ErrorNamespaces | undefined
) => {
  const rootStore = useRootStore();

  if (error instanceof AxiosError && error.response?.data.message) {
    error.response?.data.message.forEach(
      (err: { type: string; text: string }) => {
        rootStore.patchErrors({
          type: err.type,
          message: err.text,
          namespace: errorsNamespace || ErrorNamespaces.COMMON,
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
