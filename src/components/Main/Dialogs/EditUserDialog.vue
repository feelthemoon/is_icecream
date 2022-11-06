<template>
  <el-dialog
    class="edit-dialog"
    :model-value="props.isVisible"
    @close="emit('closed')"
  >
    <div class="flex justify-center">
      <el-avatar
        v-if="props.user?.avatar.startsWith('gradient')"
        :class="props.user.avatar"
        :size="100"
      />
      <el-avatar v-else :src="props.user?.avatar" :size="100" />
    </div>
    <el-form
      :model="formData"
      novalidate
      @submit.prevent="submittedForm"
      label-position="top"
    >
      <el-form-item
        class="mb-4"
        :error="invalidProperties['email'] || apiError"
        :label="$t('components.employees_table.labels.first_name')"
      >
        <el-input
          v-model.trim="formData.email"
          type="email"
          :suffix-icon="Mail"
        ></el-input>
      </el-form-item>
      <el-form-item
        :error="invalidProperties['first_name']"
        :label="$t('components.employees_table.labels.first_name')"
      >
        <el-input
          v-model.trim="formData.first_name"
          :suffix-icon="AlphabeticalVariant"
        ></el-input>
      </el-form-item>
      <el-form-item
        class="mb-4"
        :error="invalidProperties['second_name']"
        :label="$t('components.employees_table.labels.second_name')"
      >
        <el-input
          v-model.trim="formData.second_name"
          :suffix-icon="AlphabeticalVariant"
        ></el-input>
      </el-form-item>
      <el-form-item
        class="mb-4"
        :error="invalidProperties['middle_name']"
        :label="$t('components.employees_table.labels.middle_name')"
      >
        <el-input
          v-model.trim="formData.middle_name"
          :suffix-icon="AlphabeticalVariant"
        ></el-input>
      </el-form-item>
      <el-form-item
        class="mb-4"
        :error="invalidProperties['salary']"
        :label="$t('components.employees_table.labels.salary')"
      >
        <el-input v-model.trim="formData.salary" :suffix-icon="Cash"></el-input>
      </el-form-item>
      <el-form-item
        class="mb-4"
        :label="$t('components.employees_table.labels.role')"
      >
        <el-select class="w-full" v-model="formData.role">
          <el-option
            v-for="role in userRoles"
            :key="role.value"
            :value="role.value"
            :label="role.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        class="mb-4"
        :label="$t('components.employees_table.labels.status')"
      >
        <el-select class="w-full" v-model="formData.status">
          <el-option
            v-for="status in workingStatus"
            :key="status.value"
            :value="status.value"
            :label="status.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="props.isLoading"
          type="success"
          native-type="submit"
          >{{ $t("components.edit_dialog.button_text") }}</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive } from "vue";

import {
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElButton,
  ElAvatar,
} from "element-plus";
import { Mail, Cash, AlphabeticalVariant } from "mdue";
import { useI18n } from "vue-i18n";

import { User, UserRoles } from "@/config/app/types";
import { WorkingStatus } from "@/config/app/types/WorkingStatus.type";
import { useDiff, useForm, ValidationOptions } from "@/utils/hooks";

export interface Props {
  isVisible: boolean;
  user: User | null;
  apiError?: string;
  isLoading?: boolean;
}
export interface Emits {
  (_e: "closed"): void;
  (_e: "edited", _value: any): void;
}

const emit = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
  isVisible: false,
  user: null,
});
const { t } = useI18n();

const userRoles = [
  {
    value: UserRoles.ADMIN,
    label: "Администратор",
  },
  {
    value: UserRoles.MANAGER,
    label: "Менеджер",
  },
  {
    value: UserRoles.SALLER,
    label: "Продавец",
  },
];

const workingStatus = [
  {
    value: WorkingStatus.LEAVE,
    label: "Отсутствует",
  },
  {
    value: WorkingStatus.MEDICAL,
    label: "На больничном",
  },
  {
    value: WorkingStatus.VACATION,
    label: "В отпуске",
  },
  {
    value: WorkingStatus.WORKING,
    label: "Работает",
  },
];

const validationRules: ValidationOptions[] = [
  {
    field: "email",
    validators: ["required", "emailValidator"],
    validationMessage: t("validation.invalid_email"),
  },
  {
    field: "first_name",
    validators: ["required", { type: "minLength", validatorValue: 3 }],
    validationMessage: t("validation.min_length", {
      field: t("validation.fields.first_name"),
      length: 3,
    }),
  },
  {
    field: "second_name",
    validators: ["required", { type: "minLength", validatorValue: 3 }],
    validationMessage: t("validation.min_length", {
      field: t("validation.fields.second_name"),
      length: 3,
    }),
  },
  {
    field: "middle_name",
    validators: ["required", { type: "minLength", validatorValue: 3 }],
    validationMessage: t("validation.min_length", {
      field: t("validation.fields.middle_name"),
      length: 3,
    }),
  },
  {
    field: "salary",
    validators: ["required", "integer"],
    validationMessage: t("validation.invalid_int"),
  },
];

const invalidProperties: { [key: string]: string } = reactive({});
const formData = reactive({
  ...props.user,
  salary: props.user?.salary.toString(),
});

const submittedForm = async () => {
  for (const prop of Object.getOwnPropertyNames(invalidProperties)) {
    delete invalidProperties[prop];
  }

  const editedProperties: { [key: string]: any } = useDiff(
    { ...props.user, salary: props.user?.salary.toString() },
    {
      ...formData,
      second_name: formData.second_name || null,
      middle_name: formData.middle_name || null,
    }
  );

  if (!Object.keys(editedProperties).length) return;

  const necessaryValidators: ValidationOptions[] = validationRules.filter(
    (option) => editedProperties.hasOwnProperty(option.field)
  );

  const { v$, createValidationMessage } = useForm(
    editedProperties,
    necessaryValidators
  );

  await v$.value.$validate();

  if (v$.value.$invalid) {
    return Object.keys(editedProperties).forEach((key: string) => {
      invalidProperties[key] = createValidationMessage(key).value;
    });
  }

  if (editedProperties["salary"])
    editedProperties["salary"] = parseInt(editedProperties["salary"]);

  emit("edited", editedProperties);
};
</script>
