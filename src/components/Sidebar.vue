<template>
  <div class="min-h-full min-w-270px">
    <el-menu class="h-full pt-35px" router>
      <div class="flex justify-center mb-15px mr-5px">
        <img src="@/assets/static/logo.svg" />
      </div>
      <el-divider></el-divider>
      <el-menu-item
        v-for="link in props.routerLinks"
        class="relative"
        :class="{ 'is-active': route.path === link.path }"
        :key="link.id"
        :index="link.path"
        :route="link.path"
      >
        <component class="mr-20px w-1.5em h-1.5em" :is="link.icon"></component>
        <template #title>{{ link.title }}</template>
      </el-menu-item>
      <el-divider></el-divider>
      <el-menu-item class="relative" index="/settings" route="/settings">
        <component class="mr-20px w-1.5em h-1.5em" :is="Cog"></component>
        <template #title>{{
          $t("components.sidebar.links_titles.settings_title")
        }}</template>
      </el-menu-item>
      <el-button
        class="ml-20px mt-10px !absolute bottom-40px"
        @click="logout"
        :loading="loading"
        :icon="Logout"
      >
        {{ $t("components.sidebar.logout_button_title") }}
      </el-button>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Component } from "vue";

import { ElMenu, ElMenuItem, ElDivider, ElButton } from "element-plus";
import { Cog, Logout } from "mdue";
import { useRoute } from "vue-router";

import { LoadingModules } from "@/config/api/types";
import { useAuth, useRootStore } from "@/stores";

export interface Props {
  routerLinks: Array<{
    id: number;
    title: string;
    path: string;
    icon: Component;
  }>;
}

const props = defineProps<Props>();

const route = useRoute();
const { logout } = useAuth();
const rootStore = useRootStore();

const loading = computed(() => rootStore.loadingByName(LoadingModules.LOGOUT));
</script>
