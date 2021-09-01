<template>
  <h1>Todo App</h1>
  <TodoListCreate @createTodo="createTodo" />
  <TodoList @toggleDone="toggleItemDone" v-if="tasks" :tasks="tasks" />
</template>

<script>
import { MyApi } from "./api/MyApi.js";
import TodoList from "./components/TodoList";
import TodoListCreate from "./components/TodoListCreate";
export default {
  components: {
    TodoList,
    TodoListCreate,
  },
  data() {
    return {
      tasks: null,
    };
  },
  methods: {
    getTodos() {
      MyApi.getTodos().then((data) => {
        const results = [];
        for (const id in data.data) {
          results.push({
            id: id,
            task: data.data[id].task,
            complete: data.data[id].complete,
          });
        }
        this.tasks = results;
      });
    },
    async createTodo(value) {
      await MyApi.createTodo(value);
      this.getTodos();
    },
    async toggleItemDone(id, status) {
      await MyApi.toggleTodo(id, status);
      this.getTodos();
    },
  },
  mounted() {
    this.getTodos();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  border: 1px solid grey;
}
</style>
