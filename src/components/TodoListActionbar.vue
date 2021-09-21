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

  <div class="list-actions-container">
    <BaseButton mode="primary">SORT</BaseButton>
    <BaseButton @click="handleClearAllClick" mode="danger">
      CLEAR ALL
    </BaseButton>
    <TodoListSearch @searchInput="(value) => $emit('searchInput', value)" />
  </div>
</template>

<script>
import TodoListSearch from "../components/TodoListSearch";
export default {
  components: { TodoListSearch },
  props: ["tasks"],
  emits: ["taskClearAll", "searchInput"],
  data() {
    return {
      isClickedClearAll: false,
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
      this.$emit("taskClearAll");
      this.isClickedClearAll = false;
    },
  },
};
</script>

<style scoped lang="scss">
.list-actions-container {
  display: flex;
  margin: 1rem;
  button,
  input {
    margin-right: 5px;
  }
}
</style>
