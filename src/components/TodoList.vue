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
  <TodoListCreate />
  <div class="list-container">
    <div class="list-actions-container">
      <!-- put in a form? -->
      <input class="search-field" type="text" placeholder="Search..." />
      <BaseButton mode="primary">FILTER</BaseButton>
      <BaseButton @click="handleClearAllClick" mode="danger">
        CLEAR ALL
      </BaseButton>
    </div>
    <ul>
      <TodoListItem v-for="item in tasks" :key="item.id" :item="item" />
    </ul>
  </div>
</template>

<script>
import TodoListItem from "./TodoListItem";
import TodoListCreate from "./TodoListCreate";
export default {
  components: {
    TodoListItem,
    TodoListCreate,
  },
  inject: ["clearAll"],
  props: ["tasks"],
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
      this.clearAll();
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
  ul {
    padding: 0;
    margin: 0;
    flex-grow: 1;
  }
  .list-actions-container {
    margin: 1rem;
    button,
    input {
      margin-right: 5px;
    }
    .search-field {
      border: 1px solid $secondary;
      border-radius: 5px;
      font-style: cursive;
      padding: 0.6rem 1rem;
      &::placeholder {
        font-style: italic;
      }
      &:focus {
        outline: none;
      }
    }
  }
}
</style>
