<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex justify-between items w-full mb-20px items-center">
      <h1 class="text-3xl font-700">{{ $t("pages.stalls.title") }}</h1>
      <ElButton
        v-if="usersStore.isUserAdmin"
        circle
        type="primary"
        size="large"
        class="text-xl font-700"
        @click="openCreateDialog"
        :icon="Plus"
      ></ElButton>
    </div>
    <CreateStallDialog
      :is-visible="isCreateDialogVisible"
      :free-employees="usersStore.users"
      :total="usersStore.totalUsers"
      @closed="closeStallDialog"
      @load-next-page="loadNextUsersPage"
      @filter-employees="filterUsers"
      @reset-search="resetUsersSearch"
      @create="createStall"
    />
    <StallsTable
      :loading="loadingByName(LoadingModules.TABLE_STALLS)"
      :stalls="store.stalls"
      :total="store.totalStalls"
      :current-page="currentPage"
      @change-page="loadNextPage"
      @change-filters="filterTable"
      @reset-search-filter="resetSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { ElButton } from "element-plus";
import { Plus } from "mdue";

import { CreateStallDialog, StallsTable } from "@/components";
import { LoadingModules } from "@/config/api/types";
import { User } from "@/config/app/types";
import { useRootStore, useStallsStore, useUsersStore } from "@/stores";

let currentPage = localStorage.getItem("currentPageStallsTable") || "1";

const currentUsersTablePage = ref(1);

const { loadingByName } = useRootStore();
const usersStore = useUsersStore();
const store = useStallsStore();

const isCreateDialogVisible = ref(false);

await store.getAllStalls(parseInt(currentPage));

const loadNextPage = async (page: number) => {
  currentPage = page.toString();
  await store.getAllStalls(page);
};

const loadNextUsersPage = async (page: any) => {
  if (isCreateDialogVisible.value) {
    currentUsersTablePage.value = page;
    await usersStore.getAllUsers(page);
  }
};

const filterUsers = async (filters: { [key: string]: any }) => {
  usersStore.$patch((state) => {
    state.filters = { ...state.filters, ...filters };
  });
  await usersStore.getAllUsers(currentUsersTablePage.value);
};

const filterTable = async (filter: { [key: string]: any }) => {
  store.$patch((state) => {
    state.filters = { ...state.filters, ...filter };
  });
  await store.getAllStalls(parseInt(currentPage));
};

const resetSearch = async () => {
  store.$patch((state) => {
    if (state.filters) {
      delete state.filters["s"];
    }
  });
  await store.getAllStalls(parseInt(currentPage));
};

const resetUsersSearch = async () => {
  usersStore.$patch((state) => {
    if (state.filters) {
      delete state.filters["s"];
    }
  });
  await usersStore.getAllUsers(currentUsersTablePage.value);
};

const openCreateDialog = async () => {
  usersStore.$patch((state) => {
    state.filters = { stall: "null" };
  });
  await usersStore.getAllUsers();
  isCreateDialogVisible.value = true;
};

const closeStallDialog = () => {
  isCreateDialogVisible.value = false;
  usersStore.$patch((state) => {
    state.filters = {};
    state.totalUsers = null;
    state.users = null;
  });
};

const createStall = async (stallData: {
  name: string;
  address: string;
  employees: User[];
}) => {
  const employees = stallData.employees.map(({ id }: User) => ({
    id,
  }));
  await store.createStall({ ...stallData, employees });
  closeStallDialog();
  await store.getAllStalls(parseInt(currentPage));
};
</script>
