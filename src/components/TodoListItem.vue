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

  <BaseDialog title="Task Details" v-if="isClickedDetails">
    <template #default></template>
    <template #actions>
      <BaseButton @click="handleDialogClose" mode="secondary">CLOSE</BaseButton>
      <BaseButton mode="primary">SAVE CHANGES</BaseButton>
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
      <BaseButton @click="handleDetailsClick" mode="info" size="small">
        DETAILS
      </BaseButton>
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
  inject: ["deleteTodo", "toggleItemDone"],
  props: ["item", "id"],
  data() {
    return {
      isClickedDelete: false,
      isClickedDetails: false,
    };
  },
  computed: {
    isChecked() {
      return this.item.complete;
    },
  },
  methods: {
    handleToggleDone() {
      this.toggleItemDone(this.item.id, !this.item.complete);
    },
    handleDeleteClick() {
      this.isClickedDelete = true;
    },
    handleDeleteConfirm() {
      this.deleteTodo(this.item.id);
      this.isClickedDelete = false;
    },
    handleDialogClose() {
      this.isClickedDelete = false;
      this.isClickedDetails = false;
    },
    handleDetailsClick() {
      this.isClickedDetails = true;
    },
  },
};
</script>

<style scoped lang="scss">
li {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid $secondary-light;
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
      margin: 0 10px;
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
