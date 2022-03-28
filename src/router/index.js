import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/wms",
    },
    {
      path: "/home",
      component: require("@/pages/index.vue").default,
    },
    {
      path: "/property",
      component: require("@/pages/property.vue").default,
    },
    {
      path: "/rent",
      component: require("@/pages/rent.vue").default,
    },
    {
      path: "/pay",
      component: require("@/pages/pay.vue").default,
    },
    {
      path: "/wms",
      component: require("@/pages/wms.vue").default,
    },
    {
      path: "/myPark",
      component: require("@/pages/myPark.vue").default,
    },
    {
      path: "/game",
      component: require("@/pages/game.vue").default,
    },
  ],
});

export default router;
