<template>
  <MainHeader />
  <main class="main-content">
    <div class="container">
      <client-only>
        <IconGrid />
      </client-only>
    </div>
  </main>
  <MainFooter />
</template>

<script setup lang="ts">
import MainHeader from "@components/MainHeader.vue"
import MainFooter from "@components/MainFooter.vue"
import IconGrid from "@components/IconGrid/IconGrid.vue"
</script>

<style lang="scss">
@use "assets/styles/base";
</style>
