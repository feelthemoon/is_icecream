<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex justify-between items w-full mb-20px items-center">
      <h1 class="text-3xl font-700">{{ $t("pages.stalls.title") }}</h1>
      <ElButton
        v-if="usersStore.isEmployeeAdmin"
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
      :free-employees="usersStore.employees"
      :total="usersStore.totalEmployees"
      :api-error="apiError?.message"
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
import { computed, ref } from "vue";

import { ElButton } from "element-plus";
import { Plus } from "mdue";
import { useI18n } from "vue-i18n";

import { CreateStallDialog, StallsTable } from "@/components";
import { ErrorNamespaces, LoadingModules } from "@/config/api/types";
import { User } from "@/config/app/types";
import { useRootStore, useStallsStore, useUsersStore } from "@/stores";

let currentPage = localStorage.getItem("currentPageStallsTable") || "1";

const currentUsersTablePage = ref(1);

const {
  loadingByName,
  errorByType,
  errorByNamespace,
  createSuccsessNotification,
} = useRootStore();
const usersStore = useUsersStore();
const store = useStallsStore();
const { t } = useI18n();

const isCreateDialogVisible = ref(false);

await store.getAllStalls(parseInt(currentPage));

const loadNextPage = async (page: number) => {
  currentPage = page.toString();
  await store.getAllStalls(page);
};

const loadNextUsersPage = async (page: any) => {
  if (isCreateDialogVisible.value) {
    currentUsersTablePage.value = page;
    await usersStore.getAllEmployees(page);
  }
};

const filterUsers = async (filters: { [key: string]: any }) => {
  usersStore.$patch((state) => {
    state.filters = { ...state.filters, ...filters };
  });
  await usersStore.getAllEmployees(currentUsersTablePage.value);
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
  await usersStore.getAllEmployees(currentUsersTablePage.value);
};

const openCreateDialog = async () => {
  usersStore.$patch((state) => {
    state.filters = { stall: "null" };
  });
  await usersStore.getAllEmployees();
  isCreateDialogVisible.value = true;
};

const apiError = computed(() =>
  errorByType("invalid_data_name", ErrorNamespaces.CREATE_STALL)
);

const closeStallDialog = () => {
  isCreateDialogVisible.value = false;
  usersStore.$patch((state) => {
    state.filters = {};
    state.totalEmployees = null;
    state.employees = null;
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
  if (!apiError.value && !errorByNamespace(ErrorNamespaces.COMMON).length) {
    closeStallDialog();
    await store.getAllStalls(parseInt(currentPage));
    createSuccsessNotification({
      title: t("notifications.success.common.title.success"),
      message: t("notifications.success.create_stall_success.message"),
    });
  }
};
</script>
