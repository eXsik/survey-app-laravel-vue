import { createRouter, createWebHashHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import { useAuthStore } from "../stores/auth";
import AuthLayout from "../components/AuthLayout.vue";
import SurveyEdit from "../views/surveys/SurveyEdit.vue";
import SurveyCreate from "../views/surveys/SurveyCreate.vue";
import SurveysIndex from "../views/surveys/SurveysIndex.vue";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    name: "Dashboard",
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "/dashboard", name: "Dashboard", component: Dashboard },
      { path: "/surveys", name: "SurveysIndex", component: SurveysIndex },
      {
        path: "/surveys/create",
        name: "SurveyCreate",
        component: SurveyCreate,
      },
      {
        path: "/surveys/:id",
        name: "SurveyEdit",
        component: SurveyEdit,
      },
    ],
  },
  {
    path: "/auth",
    redirect: "/login",
    name: "Auth",
    component: AuthLayout,
    meta: { isGuest: true },
    children: [
      {
        path: "/login",
        name: "Login",
        component: Login,
      },
      {
        path: "/register",
        name: "Register",
        component: Register,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.user.token) {
    next({ name: "Login" });
  } else if (authStore.user.token && to.meta.isGuest) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
