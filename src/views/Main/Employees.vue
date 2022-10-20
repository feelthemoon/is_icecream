<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-3xl mb-20px font-700">{{ $t("pages.employees.title") }}</h1>
    <EmployeesTable
      :users="store.users"
      :total="store.totalUsers"
      @change-page="loadNextPage"
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
</script>
