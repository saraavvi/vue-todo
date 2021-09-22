<template>
  <TodoListCreateForm @taskCreate="taskCreate" />
  <div class="list-container">
    <TodoListActionBar
      @taskClearAll="taskClearAll"
      @searchInput="setSearchTerm"
    />
    <ul>
      <TodoListItem
        v-for="item in tasksToDisplay"
        :key="item.id"
        :item="item"
        @taskToggleDone="taskToggleDone"
        @taskDelete="taskDelete"
        @taskUpdate="taskUpdate"
      />
    </ul>
  </div>
</template>

<script>
import { MyApi } from "../api/MyApi";
import TodoListItem from "../components/TodoListItem";
import TodoListCreateForm from "../components/TodoListCreateForm";
import TodoListActionBar from "../components/TodoListActionbar";
export default {
  components: {
    TodoListItem,
    TodoListCreateForm,
    TodoListActionBar,
  },
  data() {
    return {
      tasks: [],
      searchTerm: "",
    };
  },
  computed: {
    tasksToDisplay() {
      if (this.searchTerm) {
        return this.tasks.filter((item) => {
          return item.task.includes(this.searchTerm);
        });
      } else {
        return this.tasks;
      }
    },
  },
  methods: {
    setSearchTerm(value) {
      this.searchTerm = value;
    },
    getTasks() {
      MyApi.getTasks().then((data) => {
        const results = [];
        for (const id in data.data) {
          results.unshift({
            id: id,
            task: data.data[id].task,
            created: data.data[id].created,
            description: data.data[id].description,
            complete: data.data[id].complete,
          });
        }
        this.tasks = results;
      });
    },
    async taskCreate(value) {
      await MyApi.createTask(value);
      this.getTasks();
    },
    async taskToggleDone(id, status) {
      await MyApi.toggleTask(id, status);
      this.getTasks();
    },
    async taskDelete(id) {
      await MyApi.deleteTask(id);
      this.getTasks();
    },
    async taskUpdate(id, task, description) {
      await MyApi.updateTask(id, task, description);
      this.getTasks();
    },
    async taskClearAll() {
      await MyApi.deleteAllTasks();
      this.getTasks();
    },
  },
  mounted() {
    this.getTasks();
    // console.log("todolist mounted");
  },
  updated() {
    // console.log("todolist updated");
  },
};
</script>

<style scoped lang="scss">
.list-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  ul {
    padding: 0;
    margin: 0;
    flex-grow: 1;
  }
}
</style>
