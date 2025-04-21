import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "layout",
    redirect: "/home",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        //  首页
        path: "/home",
        name: "home",
        component: () => import("@/layout/home/index.vue"),
      }
      // {
      //   path: "/webVisionTemplate",
      //   name: "webVisionTemplate",
      //   component: () => import("@/layout/home/index.vue"),
      // },
    ],
  },
  {
    path: "/webVisionTemplate",
    name: "webVisionTemplate",
    component: () => import("@/views/WebVision/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
