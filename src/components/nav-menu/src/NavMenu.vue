<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="image" src="@/assets/img/logo.svg" alt="" />
      <span class="title">Vue3+Ts</span>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      :default-active="defaultValue"
      :collapse="collapse"
      :collapse-transition="true"
    >
      <template v-for="item in userMenu" :key="item.id">
        <template v-if="item.type === 1">
          <!-- 二级菜单 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon v-if="item.icon" :class="item.icon"
                ><ElementPlus
              /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 二级菜单展开 -->
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item
                :index="subItem.id + ''"
                @click="subItemClick(subItem)"
              >
                <el-icon v-if="subItem.icon" :class="subItem.icon"></el-icon>
                <span>{{ subItem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <el-icon v-if="item.icon" :class="item.icon"
              ><ElementPlus
            /></el-icon>
            <el-menu-item>{{ item.name }}</el-menu-item>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { useRouter, useRoute } from "vue-router";
import { pathMapToMenu } from "@/utils/mapMenuToRoute";

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const userMenu = computed(() => store.state.login.menuList);
    const currentPath = route.path;
    const menu = pathMapToMenu(userMenu.value, currentPath);
    const defaultValue = ref(menu.id + "");

    const subItemClick = (subItem: any) => {
      router.push({
        path: subItem.url ?? "/not-found",
      });
    };

    return { userMenu, subItemClick, defaultValue };
  },
});
</script>

<style scoped lang="less">
.nav-menu {
  .logo {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px 15px;

    .image {
      width: 30px;
      height: 30px;
    }

    .title {
      color: #fff;
    }
  }

  :deep(.el-menu) {
    border: none;

    .el-sub-menu__title {
      color: #fff;
      background-color: #001529;
    }

    .el-menu-item {
      color: #fff;
      background-color: #051d34;

      &.is-active {
        background-color: #0a6ac4;
      }
    }
  }
}
</style>
