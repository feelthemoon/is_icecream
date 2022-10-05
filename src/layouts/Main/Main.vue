<template>
  <div class="wrapper flex space-between w-full h-full">
    <Sidebar :router-links="routerLinks" />
    <router-view v-slot="{ Component }">
      <Transition name="slide-fade" mode="out-in">
        <component :is="Component"></component>
      </Transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { AccountMultiple } from "mdue";
import { useI18n } from "vue-i18n";

import { Sidebar } from "@/components";
const { t } = useI18n();

const routerLinks = [
  {
    title: t("components.sidebar.links_titles.employees_title"),
    path: "/employees",
    icon: AccountMultiple,
  },
  {
    title: t("components.sidebar.links_titles.employees_title"),
    path: "/employees",
    icon: AccountMultiple,
  },
  {
    title: t("components.sidebar.links_titles.employees_title"),
    path: "/employees",
    icon: AccountMultiple,
  },
].map((link, index) => ({ ...link, id: index + 1 }));
</script>
