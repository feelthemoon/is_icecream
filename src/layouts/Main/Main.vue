<template>
  <div class="wrapper flex space-between w-full h-full">
    <Sidebar :router-links="sidebarLinks" />
    <router-view v-slot="{ Component }">
      <Transition name="slide-fade" mode="out-in">
        <component class="px-30px" :is="Component"></component>
      </Transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from "vue";

import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import { Sidebar } from "@/components";
import { useAuth, useRootStore, useUsersStore } from "@/stores";
import { useLinks } from "@/utils/hooks";

const { t } = useI18n();

let sidebarLinks = shallowRef(useLinks({ translator: t }));

const userStore = useUsersStore();
const { refreshAccessToken } = useAuth();
const rootStore = useRootStore();
const router = useRouter();

if (!rootStore.token) {
  refreshAccessToken()
    .then(() => {
      userStore.getMe().then(() => {
        sidebarLinks.value = useLinks({
          userRole: userStore.me?.role,
          translator: t,
        });
      });
    })
    .catch(() => {
      router.push({ name: "SigninPage" });
    });
} else {
  userStore.getMe().then(() => {
    sidebarLinks.value = useLinks({
      userRole: userStore.me?.role,
      translator: t,
    });
  });
}
</script>
