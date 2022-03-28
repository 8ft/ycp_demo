import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BaiduMap from "vue-baidu-map";
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者㎡台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: "3ISLYWgAIZ4hnh3jPinl8EQRv6tYwGa4",
});

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.use(Antd);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
