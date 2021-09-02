<template>
  <div>
    <ul>
      <TodoListItem
        @toggleDone="toggleDone"
        @deleteTodo="deleteTodo"
        v-for="item in tasks"
        :key="item.id"
        :item="item"
      />
    </ul>
  </div>
</template>

<script>
import TodoListItem from "./TodoListItem";
export default {
  components: {
    TodoListItem,
  },
  props: ["tasks"],
  emits: ["toggleDone", "deleteTodo"],
  methods: {
    toggleDone(id, status) {
      this.$emit("toggleDone", id, status);
    },
    deleteTodo(id) {
      this.$emit("deleteTodo", id);
    },
  },
};
</script>

<style scoped lang="scss">
div {
  // border: 1px solid $primary;
  ul {
    padding: 0;
    margin: 0;
  }
}
</style>
