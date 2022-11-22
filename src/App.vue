<template>
  <el-config-provider :locale="ru">
    <div class="h-full">
      <Suspense>
        <Transition name="slide-fade" mode="out-in">
          <component :is="currentLayout"></component>
        </Transition>
      </Suspense>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { ElConfigProvider } from "element-plus";
import ru from "element-plus/dist/locale/ru.mjs";
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
