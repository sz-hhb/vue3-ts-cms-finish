<template>
  <div class="search-form">
    <hy-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1>高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-button">
          <el-button @click="handleResetClick"
            ><el-icon><Refresh /></el-icon>重置</el-button
          >
          <el-button type="primary" @click="handleQueryClick"
            ><el-icon><Search /></el-icon>搜索</el-button
          >
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script lang="ts">
import HyForm from "@/base-ui/form";
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true,
    },
  },
  emits: ["handle-reset-click", "handle-query-click"],
  components: { HyForm },
  setup(props, { emit }) {
    // formData属性应该是动态的
    let formOriginData: any = {};

    props.searchFormConfig.formItem.map((item: any) => {
      formOriginData[item.field] = "";
    });

    const formData = ref(formOriginData);

    const handleResetClick = () => {
      for (const key in formOriginData) {
        formData.value[key] = formOriginData[key];
      }

      emit("handle-reset-click");

      // el-input等不使用 v-model 语法糖
      // formData.value = formOriginData;
    };

    const handleQueryClick = () => {
      emit("handle-query-click", formData.value);
    };

    return { formData, handleResetClick, handleQueryClick };
  },
});
</script>

<style scoped lang="less">
.handle-button {
  text-align: right;
  padding: 0 50px 20px 0;

  .el-button {
    height: 36px;
    font-weight: 600;

    span {
      i {
        margin-right: 10px;
      }
    }
  }
}
</style>
