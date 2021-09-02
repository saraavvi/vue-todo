<template>
  <li>
    <div>
      <span :class="{ checked: isChecked }">
        {{ item.task }}
      </span>
    </div>
    <div>
      <input type="checkbox" :checked="isChecked" @click="handleToggleDone" />
      <BaseButton @click="handleDelete">x</BaseButton>
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
  mounted() {
    // console.log(
    //   "list item with id: " +
    //     this.item.id +
    //     "mounted. isChecked is now " +
    //     this.item.complete
    // );
  },
  beforeUpdate() {
    // console.log(
    //   "list item with id: " +
    //     this.item.id +
    //     "right before update. ischecked is now: " +
    //     this.item.complete
    // );
  },
  updated() {
    // console.log(
    //   "list item with id: " +
    //     this.item.id +
    //     "after updated. ischecked is now:" +
    //     this.item.complete
    // );
  },
};
</script>

<style scoped lang="scss">
li {
  display: flex;
  justify-content: space-between;
  // border: 1px solid $primary;
  border-bottom: 1px solid $primary;
  padding: 1rem;
  margin: 5px;
  list-style: none;
}
.checked {
  text-decoration: line-through;
}
</style>
