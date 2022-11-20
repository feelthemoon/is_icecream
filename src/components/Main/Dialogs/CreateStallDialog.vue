<template>
  <el-dialog
    destroy-on-close
    class="edit-dialog"
    :model-value="props.isVisible"
    :title="$t('components.create_stall_dialog.title')"
    @close="emit('closed')"
  >
    <el-form
      :model="formData"
      class="mt-4"
      label-position="top"
      @submit.prevent="createStall"
    >
      <el-form-item class="mb-4">
        <el-input
          v-model.trim="formData.name"
          :placeholder="$t('placeholders.create_stall_dialog.name')"
        ></el-input>
      </el-form-item>
      <el-form-item class="mb-6">
        <el-input
          v-model.trim="formData.address"
          :placeholder="$t('placeholders.create_stall_dialog.address')"
        ></el-input>
      </el-form-item>
      <el-form-item
        class="mb-4"
        :label="$t('placeholders.create_stall_dialog.employees')"
      >
        <EmployeesTable
          show-selection-col
          table-height="200px"
          :users="props.freeEmployees"
          :total="props.total"
          :show-actions="false"
          @change-page="emit('load-next-page', $event)"
          @change-filters="emit('filter-employees', $event)"
          @reset-search-filter="emit('reset-search')"
          @selection-change="formData.employees = $event"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="success" native-type="submit">{{
          $t("components.create_stall_dialog.button_text")
        }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive } from "vue";

import { ElDialog, ElForm, ElFormItem, ElInput, ElButton } from "element-plus";

import { User } from "@/config/app/types";

import { EmployeesTable } from "../Tables";

export interface Props {
  isVisible: boolean;
  freeEmployees: User[] | null;
  total: number | null;
  isLoading?: boolean;
}
export interface Emits {
  (_e: "closed"): void;
  (_e: "load-next-page", _value: any): void;
  (_e: "filter-employees", _value: any): void;
  (_e: "reset-search"): void;
  (_e: "create", _value: any): void;
}

const emit = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
  isVisible: false,
  isLoading: false,
  freeEmployees: null,
});

const formData = reactive({
  name: "",
  address: "",
  employees: [],
});

const createStall = () => {
  emit("create", formData);
  formData.name = "";
  formData.employees = [];
  formData.address = "";
};
</script>
