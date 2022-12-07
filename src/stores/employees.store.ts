import { computed, Ref, ref } from "vue";

import { defineStore } from "pinia";

import {
  createDeleteEmployeeRequest,
  createEditEmployeeRequest,
  createGetAllEmployeesRequest,
  createGetEmployeeByIdRequest,
  createUpdateConfirmedStatusRequest,
  createEmployeeGetInfoRequest,
} from "@/api";
import { User, UserRoles } from "@/config/app/types";

export const useUsersStore = defineStore("users", () => {
  const me: Ref<User | null> = ref(null);
  const employees: Ref<User[] | null> = ref(null);
  const totalEmployees: Ref<number | null> = ref(null);
  const filters: Ref<{ [key: string]: any }> = ref({});
  const employeeById: Ref<User | null> = ref(null);

  const getMe = async () => {
    const response = await createEmployeeGetInfoRequest();
    if (response?.data) {
      me.value = response.data;
    }
  };

  const getAllEmployees = async (page = 1) => {
    const response = await createGetAllEmployeesRequest(page, filters.value);
    if (response?.data) {
      employees.value = response.data.data;
      totalEmployees.value = response.data.total;
    }
  };

  const deleteEmployee = async (userId: string) => {
    await createDeleteEmployeeRequest(userId);
  };

  const updateConfirmedStatus = async (userId: string) => {
    await createUpdateConfirmedStatusRequest(userId);
  };

  const getEmployeeById = async (userId: string) => {
    const response = await createGetEmployeeByIdRequest(userId);
    if (response?.data) {
      employeeById.value = response.data;
    }
  };

  const editEmployeeById = async (editedData: { [key: string]: any }) => {
    if (employeeById.value) {
      await createEditEmployeeRequest(employeeById.value.id, editedData);
    }
  };

  const isEmployeeAdmin = computed(() => me.value?.role === UserRoles.ADMIN);

  return {
    me,
    employees,
    totalEmployees,
    filters,
    employeeById,
    isEmployeeAdmin,
    getMe,
    getAllEmployees,
    deleteEmployee,
    updateConfirmedStatus,
    getEmployeeById,
    editEmployeeById,
  };
});
