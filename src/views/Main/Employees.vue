<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-3xl mb-20px font-700">{{ $t("pages.employees.title") }}</h1>
    <EmployeesTable
      :users="store.users"
      :total="store.totalUsers"
      :loading="loadingByName(LoadingModules.TABLE_USERS)"
      @change-page="loadNextPage"
      @change-filters="filterTable"
      @reset-search-filter="resetSearch"
      @delete-employee="deleteEmployee"
      @update-confirmed-status="updateConfirmedStatus"
    />
  </div>
</template>

<script setup lang="ts">
import EmployeesTable from "@/components/Main/EmployeesTable.vue";
import { LoadingModules } from "@/config/api/types";
import { useRootStore, useUsersStore } from "@/stores";

let currentPage = localStorage.getItem("currentPageUsersTable") || "1";

const store = useUsersStore();
const { loadingByName } = useRootStore();

await store.getAllUsers(parseInt(currentPage));

const loadNextPage = async (page: number) => {
  currentPage = page.toString();
  await store.getAllUsers(page);
};

const filterTable = async (filter: { [key: string]: any }) => {
  store.$patch((state) => {
    state.filters = { ...state.filters, ...filter };
  });
  await store.getAllUsers(parseInt(currentPage));
};

const resetSearch = async () => {
  store.$patch((state) => {
    if (state.filters) {
      delete state.filters["s"];
    }
  });
  await store.getAllUsers(parseInt(currentPage));
};

const deleteEmployee = async (userId: string) => {
  await store.deleteUser(userId);
  await store.getAllUsers(parseInt(currentPage));
};

const updateConfirmedStatus = async (userId: string) => {
  await store.updateConfirmedStatus(userId);
  await store.getAllUsers(parseInt(currentPage));
};
</script>
