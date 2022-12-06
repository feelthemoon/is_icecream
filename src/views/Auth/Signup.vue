<template>
  <AuthForm
    auth-type="1"
    link-path="/signin"
    :link-title="$t('pages.signup.linkTitle')"
  >
    <template #auth_title>{{ $t("pages.signup.title") }}</template>
  </AuthForm>
</template>

<script setup lang="ts">
import { AuthForm } from "@/components/Auth";
</script>
