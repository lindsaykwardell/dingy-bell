<template>
  <router-view v-slot="{ Component, route }">
    <component :is="Component" :key="route.path" />
  </router-view>
</template>

<script setup lang="ts">
// Supports weights 100-900
import "@fontsource-variable/epilogue";
</script>
