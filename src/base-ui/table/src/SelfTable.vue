<template>
  <div class="table-content">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <slot name="headerHandler"></slot>
      </slot>
    </div>
    <el-table
      v-bind="childrenProps"
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        width="80"
        align="center"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <!-- 作用域插槽 -->
          <template #default="scope">
            <!-- 动态具名插槽 与 作用域插槽 -->
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div v-if="showFooter" class="footer">
      <slot name="footer">
        <el-pagination
          v-model:current-page="pageInfo.currentPage"
          v-model:page-size="pageInfo.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: "",
    },
    listData: {
      type: Array,
      required: true,
    },
    listCount: {
      type: Number,
      default: 0,
    },
    propList: {
      type: Array as PropType<any[]>,
      default: () => [],
      required: true,
    },
    showIndexColumn: {
      type: Boolean,
      default: false,
    },
    showSelectColumn: {
      type: Boolean,
      default: false,
    },
    pageInfo: {
      type: Object,
      default: () => ({ currentPage: 1, pageSize: 10 }),
    },
    childrenProps: {
      type: Object,
      default: () => ({}),
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["selection-change", "update:pageInfo"],
  setup(props, { emit }) {
    const handleSelectionChange = (val: any) => {
      emit("selection-change", val);
    };

    const handleSizeChange = (pageSize: number) => {
      emit("update:pageInfo", { ...props.pageInfo, pageSize });
    };

    const handleCurrentChange = (currentPage: number) => {
      emit("update:pageInfo", { ...props.pageInfo, currentPage });
    };

    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>

<style scoped lang="less">
.table-content {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;

    .title {
      font-size: 24px;
      font-weight: 700;
    }
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 20px;
  }
}
</style>
