<template>
  <BaseDialog title="Delete Task" v-if="isClickedDelete">
    <template #default>
      <p>Are you sure you want to delete this task?</p>
    </template>
    <template #actions>
      <BaseButton mode="secondary" @click="handleDialogClose">Close</BaseButton>
      <BaseButton mode="danger" @click="handleDeleteConfirm">Delete</BaseButton>
    </template>
  </BaseDialog>
  <li>
    <div>
      <span :class="{ checked: isChecked }">
        {{ item.task }}
      </span>
    </div>
    <div class="actions-container">
      <input type="checkbox" :checked="isChecked" @click="handleToggleDone" />
      <BaseButton mode="info" size="small">UPDATE</BaseButton>
      <button class="delete-icon" type="button">
        <i @click="handleDeleteClick" style="font-size:18px" class="fas"
          >&#xf2ed;</i
        >
      </button>
    </div>
  </li>
</template>

<script>
export default {
  props: ["item", "id"],
  emits: ["toggleDone", "deleteTodo"],
  data() {
    return {
      isClickedDelete: false,
    };
  },
  computed: {
    isChecked() {
      return this.item.complete;
    },
  },
  methods: {
    handleToggleDone() {
      this.$emit("toggleDone", this.item.id, !this.item.complete);
    },
    handleDeleteClick() {
      this.isClickedDelete = true;
    },
    handleDeleteConfirm() {
      this.$emit("deleteTodo", this.item.id);
      this.isClickedDelete = false;
    },
    handleDialogClose() {
      this.isClickedDelete = false;
    },
  },
};
</script>

<style scoped lang="scss">
li {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid $secondary;
  padding: 1rem;
  margin: 5px;
  list-style: none;

  .checked {
    text-decoration: line-through;
  }

  .actions-container {
    display: flex;
    align-items: center;

    input {
      height: 18px;
      width: 18px;
      margin: 0 5px;
      cursor: pointer;
    }

    .delete-icon {
      border: none;
      background-color: white;
      color: $danger;
      cursor: pointer;
    }
  }
}
</style>
