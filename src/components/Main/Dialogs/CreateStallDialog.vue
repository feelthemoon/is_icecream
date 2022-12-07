<template>
  <el-dialog
    destroy-on-close
    class="edit-dialog"
    :model-value="props.isVisible"
    :title="$t('components.create_stall_dialog.title')"
    @close="closeDialog"
  >
    <el-form
      :model="formData"
      class="mt-4"
      label-position="top"
      @submit.prevent="createStall"
    >
      <el-form-item class="mb-6" :error="invalidName || apiError">
        <el-input
          v-model="formData.name"
          :placeholder="$t('placeholders.create_stall_dialog.name')"
        ></el-input>
      </el-form-item>
      <el-form-item class="mb-6" :error="invalidAddress">
        <el-input
          v-model="formData.address"
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
          :employees="props.freeEmployees"
          :total="props.total"
          :show-actions="false"
          @change-page="emit('load-next-page', $event)"
          @change-filters="emit('filter-employees', $event)"
          @reset-search-filter="emit('reset-search')"
          @selection-change="formData.employees = $event"
        />
        <span class="text-error" v-if="invalidEmployees">{{
          invalidEmployees
        }}</span>
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
import { useI18n } from "vue-i18n";

import { User } from "@/config/app/types";
import { useForm } from "@/utils/hooks";

import { EmployeesTable } from "../Tables";

export interface Props {
  isVisible: boolean;
  freeEmployees: User[] | null;
  total: number | null;
  isLoading?: boolean;
  apiError?: string;
}
export interface Emits {
  (_e: "closed"): void;
  (_e: "load-next-page", _value: any): void;
  (_e: "filter-employees", _value: any): void;
  (_e: "reset-search"): void;
  (_e: "create", _value: any): void;
}

const { t } = useI18n();
const emit = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
  isVisible: false,
  isLoading: false,
  freeEmployees: null,
  apiError: "",
});

const formData = reactive({
  name: "",
  address: "",
  employees: [],
});

const { v$, createValidationMessage } = useForm(formData, [
  {
    field: "name",
    validators: ["required", { type: "minLength", validatorValue: 8 }],
    validationMessage: t("validation.min_length", {
      field: t("validation.fields.stall_name"),
      length: 8,
    }),
  },
  {
    field: "address",
    validators: ["required"],
    validationMessage: t("validation.required_field"),
  },
  {
    field: "employees",
    validators: ["required", "checkEmployeeManagerValidator"],
    validationMessage: t("validation.invalid_employees_arr"),
  },
]);

const invalidName = createValidationMessage("name");
const invalidAddress = createValidationMessage("address");
const invalidEmployees = createValidationMessage("employees");

const resetFormData = () => {
  formData.name = "";
  formData.employees = [];
  formData.address = "";
};

const createStall = async () => {
  await v$.value.$validate();
  if (!v$.value.$invalid) {
    emit("create", {
      name: formData.name.trim(),
      address: formData.address.trim(),
      employees: formData.employees,
    });
  }
};

const closeDialog = () => {
  resetFormData();
  v$.value.$reset();
  emit("closed");
};
</script>
