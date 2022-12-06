<template>
  <div class="wrapper flex justify-between w-full h-full">
    <Sidebar :router-links="sidebarLinks" />
    <router-view
      v-if="canLoadCurrentPage"
      class="main-page"
      v-slot="{ Component }"
    >
      <Transition name="slide-fade" mode="out-in">
        <component class="px-30px" :is="Component"></component>
      </Transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from "vue";

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

const canLoadCurrentPage = ref(false);

if (!rootStore.token) {
  refreshAccessToken()
    .then(() => {
      userStore.getMe().then(() => {
        canLoadCurrentPage.value = true;
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
    canLoadCurrentPage.value = true;
    sidebarLinks.value = useLinks({
      userRole: userStore.me?.role,
      translator: t,
    });
  });
}
</script>
