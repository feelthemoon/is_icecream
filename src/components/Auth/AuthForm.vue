<template>
  <div class="py-15px px-35px shadow-custom rounded-lg min-w-420px text-center">
    <h2 class="text-center mb-3 text-xl font-bold">
      <slot name="auth_title"></slot>
    </h2>
    <component :is="currentFormComponent"></component>
    <router-link
      class="text-xs text-primary mt-2 inline-block"
      :to="props.linkPath"
      >{{ props.linkTitle }}</router-link
    >
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { SigninForm, SignupForm } from "./Forms";

export interface Props {
  authType: number | string;
  linkTitle?: string;
  linkPath?: string;
}

const props = withDefaults(defineProps<Props>(), {
  authType: 0,
  linkPath: "",
  linkTitle: "",
});

const authFormComponents = {
  0: SigninForm,
  1: SignupForm,
};

const currentFormComponent = computed(
  () => authFormComponents[props.authType as keyof typeof authFormComponents]
);
</script>
