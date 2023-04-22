<template>
  <div class="nav-breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbList" :key="item.name">
        <el-breadcrumb-item :to="item.path ? { path: item.path } : ''">
          {{ item.name }}</el-breadcrumb-item
        >
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IBreadcrumb } from "../type";

export default defineComponent({
  props: {
    breadcrumbList: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => [],
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
