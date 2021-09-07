<template>
  <TodoListCreate @createTodo="createTodo" />
  <TodoList
    @toggleDone="toggleItemDone"
    @deleteTodo="deleteTodo"
    @clearAll="clearAll"
    v-if="tasks"
    :tasks="tasks"
  />
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
          results.unshift({
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
    async deleteTodo(id) {
      await MyApi.deleteTodo(id);
      this.getTodos();
    },
    clearAll() {
      MyApi.deleteAllTodo();
      this.getTodos();
    },
  },
  mounted() {
    this.getTodos();
  },
};
</script>

<style lang="scss">
body {
  // height: 100vh;
  background-color: $primary-light;
}
#app {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 80vw;
  margin: 0 auto;
  margin-top: 3rem;
  border-radius: 5px;
  // height: 80vh;
  min-height: 500px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: $secondary;
}
</style>
