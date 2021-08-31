<template>
  <h1>Todo App</h1>
  <TodoListCreate @createTodo="createTodo" />
  <TodoList :todos="todosStorage" />
</template>

<script>
import TodoList from "./components/TodoList";
import TodoListCreate from "./components/TodoListCreate";
export default {
  components: {
    TodoList,
    TodoListCreate,
  },
  data() {
    return {
      todosStorage: [
        { id: "eat", task: "eat", complete: false },
        { id: "sleep", task: "sleep", comsplete: false },
      ],
    };
  },
  methods: {
    createTodo(value) {
      console.log(value);
      console.log("create a new todo!");
      this.todosStorage.unshift({ id: value, task: value, complete: false });
    },
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
