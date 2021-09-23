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
    <!-- <BaseButton mode="primary">SORT</BaseButton> -->
    <select
      @change="handleSelectOption"
      v-model="selectedSortOption"
      name="sortBy"
    >
      <option value="sort" disabled selected>sort</option>
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
    </select>
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
  emits: ["taskClearAll", "searchInput", "sortOption"],
  data() {
    return {
      selectedSortOption: "sort",
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
    handleSelectOption() {
      //beroende på vad som är valt: datum, name, prioritet: sortera tasksToDisplay
      // och skriv ut i rätt ordning.
      // console.log(this.selectedSortOption);
      this.$emit("sortOption", this.selectedSortOption);
    },
  },
};
</script>

<style scoped lang="scss">
.list-actions-container {
  display: flex;
  margin: 1rem;
  button,
  input,
  select {
    margin-right: 5px;
  }
  select {
    text-transform: uppercase;
    border: 1px solid $primary;
    color: $primary;
    font-weight: bold;
    font-size: 0.7rem;
    padding: 0.7rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
}
</style>
