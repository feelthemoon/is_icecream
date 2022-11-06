<template>
  <div class="table-wrapper pb-30px rounded-lg w-full shadow-custom">
    <el-table
      v-loading="loading"
      style="width: 100%; border-radius: 0.5rem 0.5rem 0 0"
      :data="props.users"
      :height="
        props.users?.length && props.users.length >= 10 ? '500px' : 'auto'
      "
      @filter-change="filterTable"
    >
      <template #empty>
        <el-empty
          :description="$t('components.employees_table.empty.description')"
        >
        </el-empty>
      </template>
      <el-table-column
        show-overflow-tooltip
        prop="first_name"
        width="200px"
        :label="$t('components.employees_table.labels.first_name')"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="second_name"
        width="200px"
        :formatter="emptyCellFormatter"
        :label="$t('components.employees_table.labels.second_name')"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="middle_name"
        width="200px"
        :formatter="emptyCellFormatter"
        :label="$t('components.employees_table.labels.middle_name')"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="email"
        width="200px"
        :label="$t('components.employees_table.labels.email')"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="salary"
        width="200px"
        :label="$t('components.employees_table.labels.salary')"
      ></el-table-column>
      <el-table-column
        prop="role"
        width="200px"
        column-key="role"
        :filter-multiple="false"
        :filters="[
          {
            text: $t('components.employees_table.roles.admin'),
            value: 'admin',
          },
          {
            text: $t('components.employees_table.roles.manager'),
            value: 'manager',
          },
          {
            text: $t('components.employees_table.roles.saller'),
            value: 'saller',
          },
        ]"
        :label="$t('components.employees_table.labels.role')"
      >
        <template #default="scope">
          <el-tag
            effect="plain"
            :type="roleTagTypes[scope.row.role as keyof typeof roleTagTypes]"
            >{{
              $t(`components.employees_table.roles.${scope.row.role}`)
            }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="stall.name"
        width="250px"
        :label="$t('components.employees_table.labels.stall_name')"
      ></el-table-column>
      <el-table-column
        prop="created_at"
        width="250px"
        :formatter="dateFormatter"
        :label="$t('components.employees_table.labels.created_at')"
      ></el-table-column>

      <el-table-column
        prop="status"
        width="150"
        column-key="status"
        :filter-multiple="false"
        :filters="[
          {
            text: $t('components.employees_table.statuses.working'),
            value: 'working',
          },
          {
            text: $t('components.employees_table.statuses.leave'),
            value: 'leave',
          },
          {
            text: $t('components.employees_table.statuses.vacation'),
            value: 'vacation',
          },
          {
            text: $t('components.employees_table.statuses.medical'),
            value: 'medical',
          },
        ]"
        :label="$t('components.employees_table.labels.status')"
      >
        <template #default="scope">
          <el-tag
            :type="statusTagTypes[scope.row.status as keyof typeof statusTagTypes]"
            >{{
              $t(`components.employees_table.statuses.${scope.row.status}`)
            }}</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="Действия" width="200">
        <template #header>
          <el-input
            :model-value="searchString"
            @input="searchUser"
            :placeholder="$t('placeholders.employees.search')"
          />
        </template>
        <template #default="scope">
          <div class="flex justify-center">
            <div class="mr-10px" v-if="scope.row.confirmed">
              <el-tooltip
                effect="dark"
                placement="top"
                :content="$t('components.employees_table.tooltips.delete')"
              >
                <el-button
                  round
                  plain
                  type="danger"
                  @click="$emit('delete-employee', scope.row.id)"
                  :icon="Delete"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                effect="dark"
                placement="top"
                :content="$t('components.employees_table.tooltips.edit')"
              >
                <el-button
                  round
                  plain
                  :icon="Pencil"
                  @click="emit('open-edit-dialog', scope.row.id)"
                ></el-button>
              </el-tooltip>
            </div>
            <el-tooltip
              v-else
              effect="dark"
              placement="top"
              :content="
                $t('components.employees_table.tooltips.confirm_registration')
              "
            >
              <el-button
                round
                plain
                type="success"
                @click="$emit('update-confirmed-status', scope.row.id)"
                :icon="AccountCheck"
              ></el-button>
            </el-tooltip>
          </div>
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
import { ref, toRaw } from "vue";

import {
  ElTable,
  ElTableColumn,
  ElButton,
  ElTag,
  ElTooltip,
  ElInput,
  ElPagination,
  ElEmpty,
  vLoading,
} from "element-plus";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { Pencil, Delete, AccountCheck } from "mdue";

import { User } from "@/config/app/types";
import { useDebounce } from "@/utils/hooks";

import "element-plus/es/components/loading/style/css";

export interface Props {
  users: User[] | null;
  total: number | null;
  loading: boolean;
}

export interface Emits {
  (_e: "change-page", _value: any): void;
  (_e: "change-filters", _value: any): void;
  (_e: "reset-search-filter"): void;
  (_e: "delete-employee", _value: any): void;
  (_e: "update-confirmed-status", _value: any): void;
  (_e: "open-edit-dialog", _value: any): void;
}

const props = withDefaults(defineProps<Props>(), { users: null, total: null });
const emit = defineEmits<Emits>();

const searchString = ref("");

const statusTagTypes = {
  working: "success",
  leave: "danger",
  medical: "warning",
};
const roleTagTypes = {
  admin: "danger",
  saller: "info",
};

const currentPage = localStorage.getItem("currentPageUsersTable") || "1";
const dateFormatter = (row: User) => {
  const date = new Date(row.created_at);
  return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
};
const emptyCellFormatter = (row: User, column: TableColumnCtx<User>) => {
  if (!row[column.property as keyof typeof row]) {
    return "-";
  } else {
    return row[column.property as keyof typeof row];
  }
};

const handleCurrentPageChange = (page: number) => {
  localStorage.setItem("currentPageUsersTable", page.toString());
  emit("change-page", page);
};

const searchUser = (value: string) => {
  const debouncedEmit = useDebounce(emit, 500);
  searchString.value = value;
  if (searchString.value) {
    debouncedEmit("change-filters", { s: searchString.value });
  } else {
    debouncedEmit("reset-search-filter");
  }
};

const filterTable = (column: any) => {
  const [col, value] = Object.entries(column).flat();
  const rowedValue = toRaw(value);

  if (typeof col === "string" && Array.isArray(rowedValue)) {
    emit("change-filters", { [col]: rowedValue[0] });
  }
};
</script>
