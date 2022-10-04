<template>
  <el-form
    status-icon
    class="flex flex-col items-center"
    :model="formData"
    @submit.prevent="submitForm"
  >
    <el-form-item
      class="min-w-420px !mb-5"
      prop="name"
      :error="invalidFirstName"
    >
      <el-input
        maxlength="25"
        v-model.trim="formData.first_name"
        :placeholder="t('placeholders.signup.name')"
      />
    </el-form-item>
    <el-form-item
      class="min-w-420px !mb-5"
      prop="email"
      :error="invalidEmail || emailApiError?.message"
    >
      <el-input
        v-model.trim="formData.email"
        type="email"
        :placeholder="t('placeholders.signup.email')"
      />
    </el-form-item>
    <el-form-item
      class="min-w-420px !mb-6"
      prop="password"
      :error="invalidPassword"
    >
      <el-input
        v-model.trim="formData.password"
        maxlength="255"
        type="password"
        :placeholder="t('placeholders.signup.password')"
      />
    </el-form-item>
    <el-form-item class="!mb-0">
      <el-button :loading="loading" type="primary" native-type="submit">{{
        t("pages.signup.form.buttonText")
      }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";

import { ElInput, ElButton, ElForm, ElFormItem } from "element-plus";
import { useI18n } from "vue-i18n";

import { useAuth, useRootStore } from "@/stores";
import { useForm } from "@/utils/hooks";

const { t } = useI18n();
const formData = reactive({
  email: "",
  password: "",
  first_name: "",
});

const { signup } = useAuth();

const rootStore = useRootStore();

const { v$, createValidationMessage } = useForm(formData, [
  {
    field: "email",
    validators: ["required", "emailValidator"],
    validationMessage: t("validation.invalid_email"),
  },
  {
    field: "password",
    validators: [{ type: "minLength", validatorValue: 8 }, "required"],
    validationMessage: t("validation.min_length", {
      field: "пароля",
      length: 8,
    }),
  },
  {
    field: "first_name",
    validators: [{ type: "minLength", validatorValue: 3 }, "required"],
    validationMessage: t("validation.min_length", {
      field: "имени",
      length: 3,
    }),
  },
]);

const loading = computed(() =>
  rootStore.loading.some(
    (loadingModule) => loadingModule.currentLoadingName === "signup"
  )
);

const invalidEmail = createValidationMessage("email");
const invalidPassword = createValidationMessage("password");
const invalidFirstName = createValidationMessage("first_name");

const emailApiError = computed(() =>
  rootStore.errorByType("invalid_data_email", "signup")
);

const submitForm = async () => {
  await v$.value.$validate();
  if (!v$.value.$invalid) {
    await signup(formData);
  }
};
</script>
