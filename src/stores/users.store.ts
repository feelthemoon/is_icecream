import { Ref, ref } from "vue";

import { defineStore } from "pinia";

import { createGetAllUsersRequest, createUserGetInfoRequest } from "@/api";
import { User } from "@/config/app/types";

export const useUsersStore = defineStore("users", () => {
  const me: Ref<User | null> = ref(null);
  const users: Ref<User[] | null> = ref(null);
  const totalUsers: Ref<number | null> = ref(null);
  const filters: Ref<{ [key: string]: any } | undefined> = ref();

  const getMe = async () => {
    const response = await createUserGetInfoRequest();
    if (response?.data) {
      me.value = response.data;
    }
  };

  const getAllUsers = async (page = 1) => {
    const response = await createGetAllUsersRequest(page, filters.value);
    if (response?.data) {
      users.value = response.data.data;
      totalUsers.value = response.data.total;
    }
  };

  return { me, users, totalUsers, filters, getMe, getAllUsers };
});
