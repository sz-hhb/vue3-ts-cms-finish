<template>
  <div class="goods">
    <page-content :contentTableConfig="contentTableConfig" page-name="goods">
      <template #oldPrice="scope">
        <span>{{ "￥" + scope.row.oldPrice }}</span>
      </template>
      <template #newPrice="scope">
        <span>{{ "￥" + scope.row.newPrice }}</span>
      </template>
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.status ? 'success' : 'danger'"
        >
          {{ scope.row.status ? "上架" : "下架" }}
        </el-button>
      </template>
      <template #img="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          :preview-teleported="true"
        />
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import PageContent from "@/components/page-content";
import { contentTableConfig } from "./config/content.config";
import { defineComponent } from "vue";

export default defineComponent({
  // name: "goods",
  components: {
    PageContent,
  },
  setup() {
    return { contentTableConfig };
  },
});
</script>

<style scoped></style>
