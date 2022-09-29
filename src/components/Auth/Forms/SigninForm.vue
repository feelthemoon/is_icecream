<template>
  <el-form
    ref="ruleFormRef"
    status-icon
    class="flex flex-col items-center"
    :model="ruleForm"
    :rules="rules"
    @submit.prevent="submitForm(ruleFormRef)"
  >
    <el-form-item class="min-w-420px !mb-5" prop="email">
      <el-input
        v-model.trim="ruleForm.email"
        type="email"
        :placeholder="t('placeholders.signin.email')"
      />
    </el-form-item>
    <el-form-item class="min-w-420px !mb-2" prop="password">
      <el-input
        v-model.trim="ruleForm.password"
        type="password"
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
      <el-button type="primary" native-type="submit">{{
        t("pages.signin.form.buttonText")
      }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

import { ElInput, ElButton, ElForm, ElFormItem } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { useI18n } from "vue-i18n";

import { log } from "@/utils";

const { t } = useI18n();

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  email: "",
  password: "",
});

const rules = reactive<FormRules>({
  email: [
    {
      required: true,
      message: t("validation.invalid_email"),
    },
  ],
  password: [
    {
      required: true,
      message: t("validation.required_field"),
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      log("submit!");
    } else {
      log("error submit!", fields);
    }
  });
};
</script>
