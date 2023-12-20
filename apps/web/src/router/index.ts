import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import PostBack from "@/pages/PostBack.vue";
export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: '/postback',
    component: PostBack,
  },
  {
    path: "/:catchAll(.*)",
    component: () =>
      import(/* webpackChunkName: "NotFoundPage" */ "@/pages/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
