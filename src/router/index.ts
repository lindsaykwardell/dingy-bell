import { createRouter, createWebHistory } from "vue-router";
import TimerPage from "../TimerPage.vue";
import SettingsPage from "../SettingsPage.vue";

const routes = [
  {
    path: "/",
    name: "timer",
    component: TimerPage,
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
