<template>
  <div class="nav-header">
    <div class="collapse-icon" @click="collapseBtnClick">
      <el-icon v-if="isCollapse"><Expand /></el-icon>
      <el-icon v-else><Fold /></el-icon>
    </div>
    <div class="content">
      <nav-breadcrumb :breadcrumb-list="breadcrumbList" />
      <user-info-dropdown />
    </div>
  </div>
</template>

<script lang="ts">
import NavBreadcrumb, { IBreadcrumb } from "@/base-ui/breadcrumb";
import UserInfoDropdown from "./UserInfoDropDown.vue";
import { defineComponent, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import { pathMapToBreadcrumb } from "@/utils/mapMenuToRoute";

export default defineComponent({
  components: {
    NavBreadcrumb,
    UserInfoDropdown,
  },
  emits: ["collapse-btn-click"],
  setup(props, { emit }) {
    const isCollapse = ref(false);

    const collapseBtnClick = () => {
      isCollapse.value = !isCollapse.value;
      emit("collapse-btn-click", isCollapse.value);
    };

    const store = useStore();
    const breadcrumbList = computed(() => {
      const route = useRoute();
      const currentPath = route.path;
      const userMenu = store.state.login.menuList;
      return pathMapToBreadcrumb(userMenu, currentPath);
    });

    return { isCollapse, collapseBtnClick, breadcrumbList };
  },
});
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  gap: 10px;
  height: 100%;

  .collapse-icon {
    height: 100%;
    cursor: pointer;

    .el-icon {
      height: 48px;
      font-size: 28px;
    }
  }

  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
