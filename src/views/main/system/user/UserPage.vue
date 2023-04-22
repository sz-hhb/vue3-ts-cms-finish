<template>
  <div class="user">
    <page-search-form
      :search-form-config="searchFormConfig"
      @handle-reset-click="handleResetClick"
      @handle-query-click="handleQueryClick"
    />

    <page-content
      ref="pageContentRef"
      :content-table-config="contentTableConfig"
      :page-name="pageName"
      @handle-new-click="handleNewData"
      @handle-edit-click="handleEditData"
    >
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? "启用" : "禁用" }}
        </el-button>
      </template>
    </page-content>

    <page-modal
      ref="pageModalRef"
      :modal-config="modalConfigRef"
      :default-info="defaultInfo"
      :page-name="pageName"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import PageSearchForm from "@/components/page-search-form";
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";

import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { modalConfig } from "./config/modal.config";

import { usePageSearch } from "@/hooks/usePageSearch";
import { usePageModal } from "@/hooks/usePageModal";

import { defineComponent, computed } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  // name: "user",
  components: {
    PageSearchForm,
    PageContent,
    PageModal,
  },
  setup() {
    const pageName = "users";

    const store = useStore();

    const newCallback = () => {
      const passwordItem = modalConfig.formItem.find(
        (item: any) => item.field === "password"
      );
      passwordItem!.isHidden = false;
    };

    const editCallback = () => {
      const passwordItem = modalConfig.formItem.find(
        (item: any) => item.field === "password"
      );
      passwordItem!.isHidden = true;
    };

    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItem.find((item) => {
        return item.field === "departmentId";
      });

      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id };
      });

      const roleItem = modalConfig.formItem.find((item) => {
        return item.field === "roleId";
      });

      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id };
      });

      return modalConfig;
    });

    const [pageContentRef, handleResetClick, handleQueryClick] =
      usePageSearch();

    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newCallback, editCallback);

    return {
      pageName,
      pageContentRef,
      searchFormConfig,
      contentTableConfig,
      modalConfigRef,
      handleResetClick,
      handleQueryClick,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
    };
  },
});
</script>

<style scoped lang="less"></style>
