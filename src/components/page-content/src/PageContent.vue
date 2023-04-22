<template>
  <div class="page-content">
    <self-table
      v-bind="contentTableConfig"
      :list-data="dataList"
      :list-count="dataCount"
      v-model:page-info="pageInfo"
    >
      <template #headerHandler>
        <div class="header-btn">
          <el-button
            v-if="isCreatePermission"
            type="primary"
            @click="handleNewClick"
          >
            <el-icon><Plus /></el-icon>
            {{ contentTableConfig.createTitle }}
          </el-button>
          <el-button>
            <el-icon><Refresh /></el-icon>
          </el-button>
        </div>
      </template>

      <!-- 公共的 具名插槽 与 作用域插槽 -->
      <template #createAt="scope">
        <span>{{ formatUtcString(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ formatUtcString(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handler-btn">
          <el-button
            v-if="isUpdatePermission"
            link
            size="default"
            type="primary"
            @click="handleEditClick(scope.row)"
          >
            <el-icon><Edit /></el-icon>
            编辑
          </el-button>
          <el-button
            v-if="isDeletePermission"
            link
            size="default"
            type="danger"
            @click="handleDeleteClick(scope.row)"
          >
            <el-icon><Delete /></el-icon>
            删除
          </el-button>
        </div>
      </template>

      <!-- 动态的插槽 由页面引入 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </self-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, onMounted } from "vue";
import { useStore } from "@/store";
import { usePermissions } from "@/hooks/usePermissions";
import { formatUtcString } from "@/utils/format";
import SelfTable from "@/base-ui/table";
import { IPropList } from "@/base-ui/table/type";

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true,
    },
    pageName: {
      type: String,
      required: true,
    },
  },
  components: {
    SelfTable,
  },
  emits: ["handle-new-click", "handle-edit-click"],
  setup(props, { emit }) {
    const store = useStore();

    const pageInfo = ref({ currentPage: 1, pageSize: 10 });

    watch(pageInfo, () => getPageList());

    const isQueryPermission = usePermissions(props.pageName, "query");
    const isCreatePermission = usePermissions(props.pageName, "create");
    const isUpdatePermission = usePermissions(props.pageName, "update");
    const isDeletePermission = usePermissions(props.pageName, "delete");

    onMounted(() => {
      getPageList();
    });

    const dataList = computed(() => {
      return store.getters["system/pageDataListGetter"](props.pageName);
    });

    const dataCount = computed(() => {
      return store.getters["system/pageListCountGetter"](props.pageName);
    });

    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: IPropList) => {
        if (item.slotName === "createAt") return false;
        if (item.slotName === "updateAt") return false;
        if (item.slotName === "handler") return false;
        return true;
      }
    );

    const handleDeleteClick = (item: any) => {
      deletePageData(item.id);
    };

    const handleNewClick = () => {
      emit("handle-new-click");
    };

    const handleEditClick = (item: any) => {
      emit("handle-edit-click", item);
    };

    const deletePageData = async (id: number) => {
      try {
        await store.dispatch("system/deletePageDataAction", {
          pageName: props.pageName,
          id,
        });
      } catch (err) {
        console.log(err);
      }
    };

    const getPageList = async (queryInfo: any = {}) => {
      if (!isQueryPermission) return;
      try {
        await store.dispatch("system/getPageListActon", {
          pageName: props.pageName,
          queryInfo: {
            offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
            size: pageInfo.value.pageSize,
            ...queryInfo,
          },
        });
      } catch (err) {
        console.log(err);
      }
    };

    return {
      dataList,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreatePermission,
      isUpdatePermission,
      isDeletePermission,
      handleDeleteClick,
      handleNewClick,
      handleEditClick,
      formatUtcString,
      getPageList,
    };
  },
});
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;

  .header-btn {
    :deep(.el-button) {
      height: 36px;

      & > span {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
  }

  .handler-btn {
    :deep(.el-button) {
      & > span {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
  }
}
</style>
