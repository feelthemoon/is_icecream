<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex justify-between items w-full mb-20px items-center">
      <h1 class="text-3xl font-700">{{ $t("pages.stalls.title") }}</h1>
      <ElButton
        v-if="isUserAdmin"
        circle
        type="primary"
        size="large"
        class="text-xl font-700"
        :icon="Plus"
      ></ElButton>
    </div>
    <StallsTable
      :loading="loadingByName(LoadingModules.TABLE_STALLS)"
      :stalls="store.stalls"
      :total="store.totalStalls"
      :current-page="currentPage"
      @change-page="loadNextPage"
    />
  </div>
</template>

<script setup lang="ts">
import { ElButton } from "element-plus";
import { Plus } from "mdue";

import { StallsTable } from "@/components";
import { LoadingModules } from "@/config/api/types";
import { useRootStore, useStallsStore, useUsersStore } from "@/stores";

let currentPage = localStorage.getItem("currentPageStallsTable") || "1";

const { loadingByName } = useRootStore();
const { isUserAdmin } = useUsersStore();
const store = useStallsStore();

await store.getAllStalls(parseInt(currentPage));

const loadNextPage = async (page: number) => {
  currentPage = page.toString();
  await store.getAllStalls(page);
};
</script>
