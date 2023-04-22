<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <div class="title">
          <el-avatar
            :size="30"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          />
          <span>{{ userName }}</span>
        </div>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出登录</el-dropdown-item>
          <el-dropdown-item divided>系统管理</el-dropdown-item>
          <el-dropdown-item>关于我们</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  setup() {
    const store = useStore();
    const userName = computed(() => {
      return store.state.login.userInfo.name;
    });

    return { userName };
  },
});
</script>

<style scoped lang="less">
.el-dropdown {
  .el-tooltip__trigger {
    &:focus-visible {
      outline: unset;
    }
    .title {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
}
</style>
