<template>
  <component :is="currentLayout"></component>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useRoute } from "vue-router";

import { DefaultLayout } from "@/layouts";

const layouts = {
  default: DefaultLayout,
};
const route = useRoute();

const currentLayout = computed(
  () => layouts[(route.meta.layout as keyof typeof layouts) || "default"]
);
</script>
