import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import BaseButton from "./components/UI/BaseButton.vue";
import BaseDialog from "./components/UI/BaseDialog.vue";
import TodoList from "./components/TodoList.vue";
import Login from "./components/Login.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: TodoList },
    { path: "/login", component: Login },
  ],
});

const app = createApp(App);

app.use(router);

app.component("BaseButton", BaseButton);
app.component("BaseDialog", BaseDialog);

app.mount("#app");
