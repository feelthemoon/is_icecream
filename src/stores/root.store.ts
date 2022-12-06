import { ElNotification } from "element-plus";
import { defineStore } from "pinia";

import { ErrorNamespaces, LoadingModules } from "@/config/api/types";

export interface RootState {
  token: string;
  loading: Array<{ currentLoadingName: string }>;
  errors: Array<{ type: string; message?: string; namespace: string }>;
}
export const useRootStore = defineStore("root", {
  state: (): RootState => ({
    token: "",
    loading: [],
    errors: [],
  }),
  actions: {
    patchErrors(error: { type: string; message?: string; namespace: string }) {
      const foundError = this.errors.find((err) => err.type === error.type);

      if (error.type === ErrorNamespaces.COMMON) {
        ElNotification({
          title: "Ошибка",
          type: "error",
          message: error.message ?? "Попробуйте ещё раз",
          duration: 2500,
        });
      }

      if (foundError) return;

      this.errors.push(error);
    },
    createSuccsessNotification({
      title,
      message,
      duration = 2500,
    }: {
      title: string;
      message: string;
      duration?: number;
    }) {
      ElNotification({
        title,
        message,
        duration,
        type: "success",
      });
    },
  },
  getters: {
    errorByType: (state: RootState) => (type: string, namespace: string) => {
      return state.errors.find(
        (error) => error.type === type && error.namespace === namespace
      );
    },
    errorByNamespace: (state: RootState) => (namespace: ErrorNamespaces) => {
      return state.errors.filter((error) => error.namespace === namespace);
    },
    loadingByName:
      (state: RootState) =>
      (loadingModuleName: LoadingModules): boolean => {
        return state.loading.some(
          (loadingModule) =>
            loadingModule.currentLoadingName === loadingModuleName
        );
      },
  },
});
