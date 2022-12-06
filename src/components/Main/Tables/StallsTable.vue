<template>
  <div class="table-wrapper pb-30px rounded-lg w-full shadow-custom">
    <el-table
      v-loading="props.loading"
      style="width: 100%; border-radius: 0.5rem 0.5rem 0 0"
      :data="props.stalls"
      :height="props.stalls && props.stalls.length >= 10 ? '500px' : 'auto'"
    >
      <template #empty>
        <el-empty :description="$t('components.common.empty.description')">
        </el-empty>
      </template>
      <el-table-column
        show-overflow-tooltip
        width="150px"
        fixed="left"
        :label="$t('components.stalls_table.labels.manager')"
      >
        <template #default="scope">
          <router-link :to="`/employees/${scope.row.id}`">{{
            findStallManager(scope.row.id)
          }}</router-link>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="name"
        width="250px"
        :label="$t('components.stalls_table.labels.name')"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="address"
        width="250px"
        :label="$t('components.stalls_table.labels.address')"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="created_at"
        width="250px"
        :formatter="dateFormatter"
        :label="$t('components.stalls_table.labels.created_at')"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="updated_at"
        width="250px"
        :formatter="dateFormatter"
        :label="$t('components.stalls_table.labels.updated_at')"
      ></el-table-column>
      <el-table-column
        width="220px"
        :label="$t('components.stalls_table.labels.employees_count')"
      >
        <template #default="scope">
          <span>{{ scope.row.employees.length }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        width="220px"
        fixed="right"
        align="center"
        :label="$t('components.stalls_table.labels.actions')"
      >
        <template #header>
          <el-input
            :model-value="searchString"
            :suffix-icon="Magnify"
            :placeholder="$t('placeholders.stalls.search')"
            @input="searchStall"
          />
        </template>
        <template #default="scope">
          <ElButton class="relative" type="primary">
            <router-link
              class="absolute left-0 right-0 top-0 bottom-0"
              :to="`/stalls/${scope.row.id}`"
            />
            {{ $t("components.stalls_table.show_more_button_text") }}
          </ElButton>
        </template>
      </el-table-column>
    </el-table>
    <div class="mt-10px px-20px flex justify-end">
      <el-pagination
        small
        background
        class="!mb-0 !p-0"
        layout="total, prev, pager, next"
        :total="total"
        :page-size="15"
        :default-current-page="parseInt(currentPage)"
        @current-change="handleCurrentPageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import {
  ElTable,
  ElTableColumn,
  ElButton,
  ElInput,
  ElPagination,
  ElEmpty,
  vLoading,
} from "element-plus";
import { Magnify } from "mdue";
import { RouterLink } from "vue-router";

import { Stall, User, UserRoles } from "@/config/app/types";
import { useDebounce } from "@/utils/hooks";

export interface Props {
  stalls: Stall[] | null;
  total: number | null;
  currentPage: string;
  loading: boolean;
}

export interface Emits {
  (_e: "change-page", _value: any): void;
  (_e: "change-filters", _value: any): void;
  (_e: "reset-search-filter"): void;
}

const props = withDefaults(defineProps<Props>(), {
  stalls: null,
  total: null,
  currentPage: "1",
  loading: false,
});
const searchString = ref("");
const emit = defineEmits<Emits>();

const dateFormatter = (row: Stall) => {
  const date = new Date(row.created_at);
  return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
};

const searchStall = (value: string) => {
  const debouncedEmit = useDebounce(emit, 500);
  searchString.value = value;
  if (searchString.value) {
    debouncedEmit("change-filters", { s: searchString.value });
  } else {
    debouncedEmit("reset-search-filter");
  }
};

const handleCurrentPageChange = (page: number) => {
  localStorage.setItem("currentPageStallsTable", page.toString());
  emit("change-page", page);
};

const findStallManager = (id: string) => {
  const stall = props.stalls?.find((st) => st.id === id);
  if (!stall) return;

  return (
    stall.employees.find(
      (employee: User) => employee.role === UserRoles.MANAGER
    )?.email ?? "-"
  );
};
</script>
