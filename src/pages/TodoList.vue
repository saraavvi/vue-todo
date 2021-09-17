<template>
  <TodoListCreateForm @taskCreate="taskCreate" />
  <div class="list-container">
    <TodoListActionBar
      :tasks="tasks"
      @taskClearAll="taskClearAll"
      @updateTasksToDisplay="updateTasksToDisplay"
    />
    <ul>
      <TodoListItem
        v-for="item in tasksToDisplay"
        :key="item.id"
        :item="item"
        @taskToggleDone="taskToggleDone"
        @taskDelete="taskDelete"
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
      tasks: null,
      tasksToDisplay: null,
    };
  },
  methods: {
    updateTasksToDisplay(searchResult) {
      this.tasksToDisplay = searchResult;
    },
    getTasks() {
      MyApi.getTasks().then((data) => {
        const results = [];
        for (const id in data.data) {
          results.unshift({
            id: id,
            task: data.data[id].task,
            complete: data.data[id].complete,
          });
        }
        this.tasks = results;
        this.tasksToDisplay = results;
      });
    },
    async taskCreate(value) {
      console.log(value);
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
    async taskClearAll() {
      await MyApi.deleteAllTasks();
      this.getTasks();
    },
  },
  mounted() {
    this.getTasks();
    console.log("todolist mounted");
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
