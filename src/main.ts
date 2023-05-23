import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
import { registerApp } from "./global";
import "normalize.css";
import "@/assets/css/index.less";
import { setUpStatus } from "./store";
123;
const app = createApp(App);

app.use(store);
app.use(registerApp);
setUpStatus();
app.use(router);
// app.use(ElementPlus);

// 挂载
app.mount("#app");
