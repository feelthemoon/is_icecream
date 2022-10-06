<template>
  <div class="wrapper flex space-between w-full h-full">
    <Sidebar :router-links="routerLinks" />
    <router-view v-slot="{ Component }">
      <Transition name="slide-fade" mode="out-in">
        <component class="px-30px" :is="Component"></component>
      </Transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { Sidebar } from "@/components";
import { useLinks } from "@/utils";

const routerLinks = useLinks("admin");
</script>
