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
  <div class="list-container">
    <ul>
      <TodoListItem
        @toggleDone="toggleDone"
        @deleteTodo="deleteTodo"
        v-for="item in tasks"
        :key="item.id"
        :item="item"
      />
    </ul>
    <div>
      <BaseButton @click="handleClearAllClick" mode="primary">
        Clear All
      </BaseButton>
    </div>
  </div>
</template>

<script>
import TodoListItem from "./TodoListItem";
export default {
  components: {
    TodoListItem,
  },
  props: ["tasks"],
  emits: ["toggleDone", "deleteTodo", "clearAll"],
  data() {
    return {
      isClickedClearAll: false,
    };
  },
  methods: {
    toggleDone(id, status) {
      this.$emit("toggleDone", id, status);
    },
    deleteTodo(id) {
      this.$emit("deleteTodo", id);
    },
    handleClearAllClick() {
      this.isClickedClearAll = true;
    },
    handleDialogClose() {
      this.isClickedClearAll = false;
    },
    handleClearAllConfirm() {
      this.$emit("clearAll");
      console.log("delete all!");
      this.isClickedClearAll = false;
    },
  },
};
</script>

<style scoped lang="scss">
.list-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  // border: 1px solid $primary;
  ul {
    padding: 0;
    margin: 0;
    flex-grow: 1;
  }
}
</style>
