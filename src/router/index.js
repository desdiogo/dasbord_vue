import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("../views/Home");
const Feedbacks = () => import("../views/Feedbacks");
const Credentials = () => import("../views/Credentials");

export const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/feedbacks",
    name: "Feedbacks",
    component: Feedbacks,
    meta: {
      hasAuth: true,
    },
  },
  {
    path: "/credenciais",
    name: "Credentials",
    component: Credentials,
    meta: {
      hasAuth: true,
    },
  },
  {
    path: "/:pathMatch(.*)",
    redirect: { name: "Home" },
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
