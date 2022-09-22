<template>
  <div class="logo-box">
    <img class="logo vite" src="@/assets/vite.svg" />
    <img class="logo electron" src="@/assets/electron.svg" />
    <img class="logo vue" src="@/assets/vue.svg" />
    <el-button type="primary">Default</el-button>
  </div>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <div class="static-public">
    Place static files into the <code>/public</code> folder
    <img style="width: 77px" :src="'./node.png'" />
  </div>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from "@/components/HelloWorld.vue";
</script>
