import { ref } from "vue";

import { defineStore } from "pinia";

import { createUserGetInfoRequest } from "@/api";

import { useRootStore } from "./root.store";

export const useUsersStore = defineStore("users", () => {
  const rootStore = useRootStore();
  const me = ref({});

  const getMe = async () => {
    const response = await createUserGetInfoRequest(rootStore.token);
    if (response?.data) {
      me.value = response.data;
    }
  };

  return { me, getMe };
});
