<template>
  <div>
    <h2>Todo List</h2>
    <ul>
      <TodoListItem
        @toggleDone="toggleDone"
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
  emits: ["toggleDone"],
  data() {
    return {};
  },
  methods: {
    toggleDone(value) {
      this.$emit("toggleDone", value);
    },
  },
};
</script>

<style scoped>
div {
  border: 1px solid red;
  margin: 5px;
}
</style>
