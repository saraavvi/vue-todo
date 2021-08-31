<template>
  <div>
    <h2>Todo List</h2>
    <ul>
      <TodoListItem v-for="item in todos" :key="item.id" :task="item.task" />
    </ul>
  </div>
</template>

<script>
// import axios from "axios";
import TodoListItem from "./TodoListItem";
export default {
  components: {
    TodoListItem,
  },
  props: ["todos"],
  data() {
    return {};
  },
};
</script>

<style scoped>
div {
  border: 1px solid red;
  margin: 5px;
}
</style>
