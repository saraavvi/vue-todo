<template>
  <h1>Todo App</h1>
  <TodoListCreate @createTodo="createTodo" />
  <TodoList :todos="tasks" />
</template>

<script>
import axios from "axios";
import TodoList from "./components/TodoList";
import TodoListCreate from "./components/TodoListCreate";
export default {
  components: {
    TodoList,
    TodoListCreate,
  },
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    getTodos() {
      axios
        .get(
          "https://vue-todo-list-8875a-default-rtdb.europe-west1.firebasedatabase.app/tasks.json"
        )
        .then((data) => {
          console.log(data);
          this.tasks = data.data;
        });
    },
    async createTodo(value) {
      await axios.post(
        "https://vue-todo-list-8875a-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
        {
          task: value,
          complete: false,
        }
      );
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
