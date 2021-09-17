<template>
  <BaseDialog title="Clear all tasks" v-if="isClickedClearAll">
    <template #default>
      <p>Are you sure you want to delete all tasks?</p>
    </template>
    <template #actions>
      <BaseButton @click="handleDialogClose" mode="secondary">Close</BaseButton>
      <BaseButton @click="handleClearAllConfirm" mode="danger">
        Clear All
      </BaseButton>
    </template>
  </BaseDialog>

  <TodoListCreate @taskCreate="taskCreate" />

  <!-- container for list and actions -->
  <div class="list-container">
    <div class="list-actions-container">
      <!-- <input class="search-field" type="text" placeholder="Search..." /> -->
      <BaseButton mode="primary">FILTER</BaseButton>
      <BaseButton @click="handleClearAllClick" mode="danger">
        CLEAR ALL
      </BaseButton>
      <TodoListSearch
        :array="tasks"
        @searchResult="updateTasksToDisplay"
      ></TodoListSearch>
    </div>
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
import TodoListCreate from "../components/TodoListCreate";
import TodoListSearch from "../components/TodoListSearch";
export default {
  components: {
    TodoListItem,
    TodoListCreate,
    TodoListSearch,
  },
  data() {
    return {
      isClickedClearAll: false,
      tasks: null,
      tasksToDisplay: null,
    };
  },
  methods: {
    handleClearAllClick() {
      this.isClickedClearAll = true;
    },
    handleDialogClose() {
      this.isClickedClearAll = false;
    },
    handleClearAllConfirm() {
      this.taskClearAll();
      this.isClickedClearAll = false;
    },
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
  .list-actions-container {
    display: flex;
    margin: 1rem;
    button,
    input {
      margin-right: 5px;
    }
    // .search-field {
    //   border: 1px solid $secondary;
    //   border-radius: 5px;
    //   font-style: cursive;
    //   padding: 0.6rem 1rem;
    //   &::placeholder {
    //     font-style: italic;
    //   }
    //   &:focus {
    //     outline: none;
    //   }
    // }
  }
}
</style>
