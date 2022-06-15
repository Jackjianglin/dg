<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { NNotificationProvider } from "naive-ui";
</script>

<template>
  <n-notification-provider>
    <router-view></router-view>
  </n-notification-provider>
</template>

<style>
body {
  margin: 0;
}

#app {
  height: 100vh;
  width: 100vw;
}
</style>
