<template>
  <div class="menu">
    <page-content
      :content-table-config="contentTableConfig"
      page-name="menu"
    ></page-content>
  </div>
</template>

<script lang="ts">
import PageContent from "@/components/page-content";
import { defineComponent } from "vue";
import { contentTableConfig } from "./config/content.config";

export default defineComponent({
  // name: "menu",
  components: {
    PageContent,
  },
  setup() {
    return { contentTableConfig };
  },
});
</script>

<style scoped></style>
