<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-3xl mb-20px font-700">{{ $t("pages.employees.title") }}</h1>
    <EditEmployeeDialog
      v-if="store.employeeById"
      :is-visible="isEditDialogVisible"
      :user="store.employeeById"
      :api-error="editEmailError?.message"
      :is-loading="loadingByName(LoadingModules.EDIT_DIALOG)"
      @closed="closeEditDialog"
      @edited="editUser"
    ></EditEmployeeDialog>
    <EmployeesTable
      :employees="store.employees"
      :total="store.totalEmployees"
      :loading="loadingByName(LoadingModules.TABLE_USERS)"
      :current-page="currentPage"
      @change-page="loadNextPage"
      @change-filters="filterTable"
      @reset-search-filter="resetSearch"
      @delete-employee="deleteEmployee"
      @update-confirmed-status="updateConfirmedStatus"
      @open-edit-dialog="openEditDialog"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue";

import { useI18n } from "vue-i18n";

import { EditEmployeeDialog, EmployeesTable } from "@/components";
import { ErrorNamespaces, LoadingModules } from "@/config/api/types";
import { useRootStore, useUsersStore } from "@/stores";

let currentPage = localStorage.getItem("currentPageUsersTable") || "1";
const isEditDialogVisible = ref(false);

const store = useUsersStore();
const {
  loadingByName,
  errorByType,
  errorByNamespace,
  createSuccsessNotification,
} = useRootStore();
const { t } = useI18n();

const editEmailError = computed(() =>
  errorByType("invalid_data_email", ErrorNamespaces.EDIT_DIALOG)
);

await store.getAllEmployees(parseInt(currentPage));

const loadNextPage = async (page: number) => {
  localStorage.setItem("currentPageUsersTable", page.toString());
  currentPage = page.toString();
  await store.getAllEmployees(page);
};

const filterTable = async (filter: { [key: string]: any }) => {
  store.$patch((state) => {
    state.filters = { ...state.filters, ...filter };
  });
  await store.getAllEmployees(parseInt(currentPage));
};

const resetSearch = async () => {
  store.$patch((state) => {
    if (state.filters) {
      delete state.filters["s"];
    }
  });
  await store.getAllEmployees(parseInt(currentPage));
};

const deleteEmployee = async (userId: string) => {
  await store.deleteEmployee(userId);
  await store.getAllEmployees(parseInt(currentPage));
};

const updateConfirmedStatus = async (userId: string) => {
  await store.updateConfirmedStatus(userId);
  await store.getAllEmployees(parseInt(currentPage));
};

const openEditDialog = async (userId: string) => {
  await store.getEmployeeById(userId);
  isEditDialogVisible.value = true;
};

const closeEditDialog = () => {
  isEditDialogVisible.value = false;
  store.$patch({
    employeeById: null,
  });
};

const editUser = async (editedUser: { [key: string]: any }) => {
  await store.editEmployeeById(editedUser);
  if (
    !editEmailError.value &&
    !errorByNamespace(ErrorNamespaces.COMMON).length
  ) {
    closeEditDialog();
    await store.getAllEmployees(parseInt(currentPage));
    createSuccsessNotification({
      title: t("notifications.success.common.title.success"),
      message: t("notifications.success.edit_user_success.message"),
    });
  }
};

onUnmounted(() => {
  store.$patch((state) => {
    state.filters = {};
    state.totalEmployees = null;
    state.employees = null;
  });
});
</script>
