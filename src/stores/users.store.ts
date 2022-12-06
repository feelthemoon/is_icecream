import { computed, Ref, ref } from "vue";

import { defineStore } from "pinia";

import {
  createDeleteUserRequest,
  createEditUserRequest,
  createGetAllUsersRequest,
  createGetUserByIdRequest,
  createUpdateConfirmedStatusRequest,
  createUserGetInfoRequest,
} from "@/api";
import { User, UserRoles } from "@/config/app/types";

export const useUsersStore = defineStore("users", () => {
  const me: Ref<User | null> = ref(null);
  const users: Ref<User[] | null> = ref(null);
  const totalUsers: Ref<number | null> = ref(null);
  const filters: Ref<{ [key: string]: any }> = ref({});
  const userById: Ref<User | null> = ref(null);

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

  const deleteUser = async (userId: string) => {
    await createDeleteUserRequest(userId);
  };

  const updateConfirmedStatus = async (userId: string) => {
    await createUpdateConfirmedStatusRequest(userId);
  };

  const getUserById = async (userId: string) => {
    const response = await createGetUserByIdRequest(userId);
    if (response?.data) {
      userById.value = response.data;
    }
  };

  const editUserById = async (editedData: { [key: string]: any }) => {
    if (userById.value) {
      await createEditUserRequest(userById.value.id, editedData);
    }
  };

  const isUserAdmin = computed(() => me.value?.role === UserRoles.ADMIN);

  return {
    me,
    users,
    totalUsers,
    filters,
    userById,
    isUserAdmin,
    getMe,
    getAllUsers,
    deleteUser,
    updateConfirmedStatus,
    getUserById,
    editUserById,
  };
});
