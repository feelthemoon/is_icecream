import { ElNotification } from "element-plus";
import { defineStore } from "pinia";

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

      if (error.type === "common_error") {
        ElNotification({
          // title: "Ошибка",
          type: "error",
          message: error.message ?? "Попробуйте ещё раз",
          duration: 2500,
        });
      }

      if (foundError) return;

      this.errors.push(error);
    },
  },
  getters: {
    errorByType: (state: RootState) => (type: string, namespace: string) => {
      return state.errors.find(
        (error) => error.type === type && error.namespace === namespace
      );
    },
  },
});
