<template>
  <li>
    <div>
      <span :class="{ checked: isChecked }">
        {{ item.task }}
      </span>
    </div>
    <div class="actions-container">
      <input type="checkbox" :checked="isChecked" @click="handleToggleDone" />
      <button type="button">
        <i @click="handleDelete" style="font-size:24px" class="fas">&#xf2ed;</i>
      </button>
    </div>
  </li>
</template>

<script>
export default {
  props: ["item", "id"],
  emits: ["toggleDone", "deleteTodo"],
  computed: {
    isChecked() {
      return this.item.complete;
    },
  },
  methods: {
    handleToggleDone() {
      this.$emit("toggleDone", this.item.id, !this.item.complete);
    },
    handleDelete() {
      this.$emit("deleteTodo", this.item.id);
    },
  },
};
</script>

<style scoped lang="scss">
li {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid $primary;
  padding: 1rem;
  margin: 5px;
  list-style: none;

  .checked {
    text-decoration: line-through;
  }

  .actions-container {
    display: flex;

    input {
      height: 25px;
      width: 25px;
      cursor: pointer;
    }

    button {
      border: none;
      background-color: $secondary;
      color: $primary;
      cursor: pointer;
    }
  }
}
</style>
