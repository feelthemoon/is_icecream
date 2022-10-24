<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-3xl mb-20px font-700">{{ $t("pages.employees.title") }}</h1>
    <EmployeesTable
      :users="store.users"
      :total="store.totalUsers"
      @change-page="loadNextPage"
      @change-filters="filterTable"
    />
  </div>
</template>

<script setup lang="ts">
import EmployeesTable from "@/components/Main/EmployeesTable.vue";
import { useUsersStore } from "@/stores";

const store = useUsersStore();

await store.getAllUsers();

const loadNextPage = async (page: number) => {
  await store.getAllUsers(page);
};

const filterTable = async (filter: { [key: string]: any }) => {
  store.$patch((state) => {
    state.filters = { ...state.filters, ...filter };
  });
  await store.getAllUsers();
};
</script>
