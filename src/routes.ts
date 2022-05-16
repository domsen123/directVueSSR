import { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    /* Dont use any route which is used by directus.
     * check out constants.ts
     */
    path: "/",
    component: () => import("./Page.vue"),
  },
];

export default routes;
