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
      },
      // {
      //   path: "/webVisionTemplate",
      //   name: "webVisionTemplate",
      //   component: () => import("@/layout/home/index.vue"),
      // },
    ],
  },
  {
    path: "/webVision",
    name: "webVision",
    component: () => import("@/views/WebVision/index.vue"),
    meta: {
      keepAlive: false,
    },
  },
  {
    path: "/webVisionComponent",
    name: "webVisionComponent",
    component: () => import("@/views/WebVision/page/component/index.vue"),
    meta: {
      keepAlive: false,
    },
  },
  {
    path: "/webVisionTemplate",
    name: "webVisionTemplate",
    component: () => import("@/views/WebVision/page/template/index.vue"),
    meta: {
      keepAlive: false,
    },
  },
  {
    path: "/webVisionWebsite",
    name: "webVisionWebsite",
    component: () => import("@/views/WebVision/page/website/index.vue"),
    meta: {
      keepAlive: false,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
