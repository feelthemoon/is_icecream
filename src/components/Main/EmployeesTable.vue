<template>
  <div class="table-wrapper pb-30px rounded-lg w-full shadow-custom">
    <el-table
      style="width: 100%; border-radius: 0.5rem 0.5rem 0 0"
      :data="props.users"
      :height="
        props.users?.length && props.users.length >= 10 ? '500px' : 'auto'
      "
    >
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
            v-model.trim="search"
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
                <el-button round plain type="danger" :icon="Delete"></el-button>
              </el-tooltip>
              <el-tooltip
                effect="dark"
                placement="top"
                :content="$t('components.employees_table.tooltips.edit')"
              >
                <el-button round plain :icon="Pencil"></el-button>
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
  ElTag,
  ElTooltip,
  ElInput,
  ElPagination,
} from "element-plus";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { Pencil, Delete, AccountCheck } from "mdue";

import { User } from "@/config/app/types";

export interface Props {
  users: User[] | null;
  total: number | null;
}

export interface Emits {
  (_e: "change-page", _value: any): void;
}

const props = withDefaults(defineProps<Props>(), { users: null, total: null });
const emit = defineEmits<Emits>();

const search = ref("");

const statusTagTypes = {
  working: "success",
  leave: "danger",
  medical: "warning",
};
const roleTagTypes = {
  admin: "danger",
  saller: "info",
};

const dateFormatter = (row: User) => {
  const date = new Date(row.created_at);
  return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
};
const emptyCellFormatter = (row: User, column: TableColumnCtx<User>) => {
  if (
    (column.property === "second_name" && !row.second_name) ||
    (column.property === "middle_name" && !row.middle_name)
  ) {
    return "-";
  }
};

const handleCurrentPageChange = (page: number) => emit("change-page", page);
</script>
