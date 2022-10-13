<template>
  <el-form
    status-icon
    class="flex flex-col items-center"
    :model="formData"
    @submit.prevent="submitForm"
    novalidate
  >
    <el-form-item
      class="min-w-420px !mb-5"
      :error="invalidEmail || apiErrors[0]?.message"
    >
      <el-input
        v-model.trim="formData.email"
        type="email"
        :suffix-icon="Email"
        :placeholder="t('placeholders.signin.email')"
      />
    </el-form-item>
    <el-form-item
      class="min-w-420px !mb-2"
      :error="invalidPassword || apiErrors[0]?.message"
    >
      <el-input
        v-model.trim="formData.password"
        type="password"
        :suffix-icon="Lock"
        :placeholder="t('placeholders.signin.password')"
      />
    </el-form-item>
    <el-form-item class="text-left w-full">
      <router-link
        to="/recover-password"
        class="text-xs text-blue-500 mt-2 inline-block"
        >{{ $t("pages.signin.form.linkRecoverText") }}</router-link
      >
    </el-form-item>
    <el-form-item class="!mb-0">
      <el-button :loading="loading" type="primary" native-type="submit">{{
        t("pages.signin.form.buttonText")
      }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";

import { ElInput, ElButton, ElForm, ElFormItem } from "element-plus";
import { Email, Lock } from "mdue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import { ErrorNamespaces, LoadingModules } from "@/config/api/types";
import { useAuth, useRootStore } from "@/stores";
import { useForm } from "@/utils/hooks";

const { t } = useI18n();
const { signin } = useAuth();
const rootStore = useRootStore();
const router = useRouter();

const formData = reactive({
  email: "",
  password: "",
});

const { v$, createValidationMessage } = useForm(formData, [
  {
    field: "email",
    validators: ["required", "emailValidator"],
    validationMessage: t("validation.invalid_email"),
  },
  {
    field: "password",
    validators: ["required"],
    validationMessage: t("validation.required_field"),
  },
]);

const invalidEmail = createValidationMessage("email");
const invalidPassword = createValidationMessage("password");

const loading = computed(() => rootStore.loadingByName(LoadingModules.SIGNIN));
const apiErrors = computed(() =>
  rootStore.errorByNamespace(ErrorNamespaces.SIGNIN)
);

const submitForm = async () => {
  await v$.value.$validate();
  if (!v$.value.$invalid) {
    await signin(formData);
    if (rootStore.token) {
      await router.push({ name: "HomePage" });
    }
  }
};
</script>
