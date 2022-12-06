<template>
  <div class="shadow-custom rounded-lg min-w-420px text-center">
    <el-result
      icon="success"
      :title="$t('pages.signup_info.title')"
      :sub-title="$t('pages.signup_info.subtitle')"
    >
      <template #extra>
        <el-button class="relative" type="primary">
          <router-link
            class="absolute left-0 top-0 right-0 bottom-0"
            to="/signin"
          >
          </router-link>
          {{ $t("pages.signup_info.button_text") }}
        </el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts">
import { ElResult, ElButton } from "element-plus";
</script>
