import { Ref, ref } from "vue";

import { defineStore } from "pinia";

import { createUserGetInfoRequest } from "@/api";
import { User } from "@/config/app/types";

export const useUsersStore = defineStore("users", () => {
  const me: Ref<User | null> = ref(null);

  const getMe = async () => {
    const response = await createUserGetInfoRequest();
    if (response?.data) {
      me.value = response.data;
    }
  };

  return { me, getMe };
});
