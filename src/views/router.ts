import { createRouter, createWebHistory } from "vue-router";

import Home from "./Home.vue";
import Settings from "./Settings.vue";
import Appearance from "./Appearance.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/settings",
    component: Settings,
  },
  {
    path: "/appearance",
    component: Appearance,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
