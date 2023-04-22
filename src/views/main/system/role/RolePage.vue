<template>
  <div class="role">
    <page-search-form
      :search-form-config="searchFormConfig"
      @handle-reset-click="handleResetClick"
      @handle-query-click="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :content-table-config="contentTableConfig"
      :page-name="pageName"
    />
  </div>
</template>

<script lang="ts">
import PageSearchForm from "@/components/page-search-form";
import PageContent from "@/components/page-content";
import { contentTableConfig } from "./config/content.config";
import { searchFormConfig } from "./config/search.config";
import { defineComponent } from "vue";
import { usePageSearch } from "@/hooks/usePageSearch";

export default defineComponent({
  // name: "role",
  components: {
    PageSearchForm,
    PageContent,
  },
  setup() {
    const pageName = "role";

    const [pageContentRef, handleResetClick, handleQueryClick] =
      usePageSearch();

    return {
      pageName,
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
    };
  },
});
</script>

<style scoped></style>
