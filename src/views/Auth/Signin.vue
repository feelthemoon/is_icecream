<template>
  <AuthForm
    auth-type="0"
    link-path="/signup"
    :link-title="$t('pages.signin.linkTitle')"
  >
    <template #auth_title>{{ $t("pages.signin.title") }}</template>
  </AuthForm>
</template>

<script setup lang="ts">
import { AuthForm } from "@/components/Auth";
</script>
