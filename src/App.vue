<template>
  <component :is="currentLayout"></component>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useRoute } from "vue-router";

import { DefaultLayout, MainLayout } from "@/layouts";

const layouts = {
  default: DefaultLayout,
  main: MainLayout,
};
const route = useRoute();

const currentLayout = computed(
  () => layouts[(route.meta.layout as keyof typeof layouts) || "default"]
);
</script>
