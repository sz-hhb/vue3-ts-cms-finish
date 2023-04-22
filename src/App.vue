<template>
  <div class="app">
    <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { ElConfigProvider } from "element-plus/lib/index";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    ElConfigProvider,
  },
  setup() {
    return {
      locale: zhCn,
    };
  },
});
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
