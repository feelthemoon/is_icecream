<template>
  <el-form
    ref="ruleFormRef"
    status-icon
    class="flex flex-col items-center"
    :model="ruleForm"
    :rules="rules"
    @submit.prevent="submitForm(ruleFormRef)"
  >
    <el-form-item class="min-w-420px !mb-5" prop="name">
      <el-input
        maxlength="25"
        v-model.trim="ruleForm.name"
        :placeholder="t('placeholders.signup.name')"
      />
    </el-form-item>
    <el-form-item class="min-w-420px !mb-5" prop="email">
      <el-input
        v-model.trim="ruleForm.email"
        type="email"
        :placeholder="t('placeholders.signup.email')"
      />
    </el-form-item>
    <el-form-item class="min-w-420px !mb-6" prop="password">
      <el-input
        v-model.trim="ruleForm.password"
        maxlength="255"
        type="password"
        :placeholder="t('placeholders.signup.password')"
      />
    </el-form-item>
    <el-form-item class="!mb-0">
      <el-button type="primary" native-type="submit">{{
        t("pages.signup.form.buttonText")
      }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

import { ElInput, ElButton, ElForm, ElFormItem } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { useI18n } from "vue-i18n";

import { useCustomValidators, log } from "@/utils";

const { t } = useI18n();
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  email: "",
  password: "",
  name: "",
});

const { emailValidator } = useCustomValidators();

const rules = reactive<FormRules>({
  email: [
    {
      validator: emailValidator,
      message: t("validation.invalid_email"),
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: t("validation.min_length", { field: "пароля", length: 8 }),
      min: 8,
      trigger: "blur",
    },
  ],
  name: [
    {
      required: true,
      message: t("validation.min_length", { field: "имени", length: 3 }),
      min: 3,
      trigger: "blur",
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
