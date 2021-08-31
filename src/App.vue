<template>
  <h1>Todo App</h1>
  <TodoListCreate @createTodo="createTodo" />
  <TodoList @toggleDone="toggleItemDone" v-if="tasks" :tasks="tasks" />
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
      tasks: null,
    };
  },
  methods: {
    getTodos() {
      axios
        .get(
          "https://vue-todo-list-8875a-default-rtdb.europe-west1.firebasedatabase.app/tasks.json"
        )
        .then((data) => {
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
      await axios.post(
        "https://vue-todo-list-8875a-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
        {
          task: value,
          complete: false,
        }
      );
      this.getTodos();
    },
    toggleItemDone(value) {
      //fetch and update the items "complete" value:
      axios
        .patch(
          `https://vue-todo-list-8875a-default-rtdb.europe-west1.firebasedatabase.app/tasks/${value}.json`,
          { complete: true }
        )
        .then((data) => {
          console.log(data);
        });
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
