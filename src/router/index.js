import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Flowers from "../views/Flowers.vue";
import Bugs from "../views/Bugs.vue";
import Fish from "../views/Fish.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Flowers",
    name: "Flowers",
    component: Flowers,
  },
  {
    path: "/Bugs",
    name: "Bugs",
    component: Bugs,
  },
  {
    path: "/Fish",
    name: "Fish",
    component: Fish,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
