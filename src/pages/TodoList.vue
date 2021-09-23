<template>
  <TodoListCreateForm @taskCreate="taskCreate" />
  <div class="list-container">
    <TodoListActionBar
      @taskClearAll="taskClearAll"
      @searchInput="setSearchTerm"
      @sortOption="setSortOption"
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
      searchTerm: null,
      sortOption: null,
    };
  },
  computed: {
    tasksToDisplay() {
      let result = this.tasks;
      if (this.searchTerm) {
        result = this.tasks.filter((item) => {
          return item.task.includes(this.searchTerm);
        });
      }
      if (this.sortOption) {
        if (this.sortOption === "newest") {
          result = result.slice().sort((a, b) => {
            return new Date(b.created) - new Date(a.created);
          });
        }
        if (this.sortOption === "oldest") {
          result = result.slice().sort((a, b) => {
            return new Date(a.created) - new Date(b.created);
          });
        }
      }
      return result;
    },
  },
  methods: {
    setSearchTerm(value) {
      this.searchTerm = value;
    },
    setSortOption(value) {
      this.sortOption = value;
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
