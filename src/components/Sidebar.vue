<template>
  <div class="min-h-full min-w-270px">
    <el-menu class="h-full pt-35px">
      <div class="flex justify-center mb-15px mr-5px">
        <img src="@/assets/static/logo.svg" />
      </div>
      <el-divider></el-divider>
      <el-menu-item
        class="relative"
        v-for="link in props.routerLinks"
        :key="link.id"
        :index="link.id.toString()"
      >
        <router-link
          class="absolute left-0 right-0 bottom-0 top-0"
          :to="link.path"
        ></router-link>
        <component class="mr-20px w-1.5em h-1.5em" :is="link.icon"></component>
        <template #title>{{ link.title }}</template>
      </el-menu-item>
      <el-divider></el-divider>
      <el-menu-item
        class="relative"
        :index="(props.routerLinks.length + 1).toString()"
      >
        <router-link
          class="absolute left-0 right-0 bottom-0 top-0"
          to="/settings"
        >
        </router-link>
        <component class="mr-20px w-1.5em h-1.5em" :is="Cog"></component>
        <template #title>{{
          $t("components.sidebar.links_titles.settings_title")
        }}</template>
      </el-menu-item>
      <el-button :icon="Logout" class="ml-20px mt-10px absolute bottom-40px">
        {{ $t("components.sidebar.logout_button_title") }}
      </el-button>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue";

import { ElMenu, ElMenuItem, ElDivider, ElButton } from "element-plus";
import { Cog, Logout } from "mdue";

export interface Props {
  routerLinks: Array<{
    id: number;
    title: string;
    path: string;
    icon: Component;
  }>;
}

const props = defineProps<Props>();
</script>
