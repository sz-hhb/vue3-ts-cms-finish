<template>
  <div class="user-input">
    <div class="header"><slot name="header"></slot></div>
    <el-form :model="formData" :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItem" :key="item.field">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :style="itemStyle"
            >
              <template v-if="item.type === 'input' || item.type === 'password'"
                ><el-input
                  v-model="formData[`${item.field}`]"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
              /></template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-model="formData[`${item.field}`]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :label="option.title"
                    :value="option.value"
                  />
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-model="formData[`${item.field}`]"
                  v-bind="item.otherOptions"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer"><slot name="footer"></slot></div>
  </div>
</template>

<script lang="ts">
import { IFormItem } from "../type";
import { defineComponent, PropType, ref, watch } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    formItem: {
      type: Array as PropType<IFormItem[]>,
      default: () => [],
    },
    labelWidth: {
      type: String,
      default: "100px",
    },
    itemStyle: {
      type: Object,
      default: () => ({
        padding: "10px 40px",
      }),
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24,
      }),
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    // 浅拷贝
    const formData = ref({ ...props.modelValue });

    // 监听数据 当数据改变时通知父组件
    watch(
      formData,
      (newVal) => {
        emit("update:modelValue", newVal);
      },
      {
        deep: true,
      }
    );

    return { formData };
  },
});
</script>

<style scoped lang="less">
.user-input {
  .header {
    padding-top: 10px;
    text-align: center;
  }

  :deep(.el-form) {
    .el-form-item__label {
      height: 36px;
      line-height: 36px;
    }

    .el-input {
      height: 36px;
    }
  }

  :deep(.el-select) {
    .el-input {
      height: 36px;
    }
  }
}
</style>
