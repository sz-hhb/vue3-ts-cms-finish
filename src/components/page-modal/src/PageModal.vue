<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      title="新建用户"
      width="30%"
      center
      destroy-on-close
    >
      <self-form v-bind="modalConfig" v-model="formData"></self-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import SelfForm from "@/base-ui/form";
import { useStore } from "@/store";

export default defineComponent({
  components: {
    SelfForm,
  },
  props: {
    modalConfig: {
      type: Object,
      default: () => ({}),
    },
    defaultInfo: {
      type: Object,
      default: () => ({}),
    },
    pageName: {
      type: String,
      require: true,
    },
  },
  setup(props) {
    const store = useStore();

    const dialogVisible = ref(false);

    const formData = ref<any>({});

    watch(
      () => props.defaultInfo,
      (newVal) => {
        for (const item of props.modalConfig?.formItem) {
          formData.value[`${item.field}`] = newVal[`${item.field}`];
        }
      }
    );

    const handleConfirmClick = () => {
      dialogVisible.value = false;
      if (Object.keys(props.defaultInfo).length) {
        store.dispatch("system/editPageDataAction", {
          pageName: props.pageName,
          editData: { ...formData.value },
          id: props.defaultInfo.id,
        });
      } else {
        store.dispatch("system/createPageDataAction", {
          pageName: props.pageName,
          newData: { ...formData.value },
        });
      }
    };

    return { dialogVisible, formData, handleConfirmClick };
  },
});
</script>

<style scoped></style>
