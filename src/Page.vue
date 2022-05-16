<template>
  <div>
    <h1>Application</h1>
    <pre v-text="getAppConfig()" />
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";
import { getAppConfig } from "~/config";
defineComponent({
  name: "Page",
});
</script>

<style></style>
