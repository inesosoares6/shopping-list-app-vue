import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/Layout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("src/pages/PageList.vue"),
      },
      {
        path: "/catalog",
        name: "catalog",
        component: () => import("pages/PageCatalog.vue"),
      },
      { path: "/settings", component: () => import("pages/PageSettings.vue") },
      { path: "/settings/help", component: () => import("pages/PageHelp.vue") },
      {
        path: "/auth",
        name: "auth",
        component: () => import("pages/PageAuth.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
