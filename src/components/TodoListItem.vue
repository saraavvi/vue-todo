<template>
  <BaseDialog title="Delete Task" v-if="isClickedDelete">
    <template #default>
      <p>Are you sure you want to delete this task:</p>
      <p>"{{ item.task }}"</p>
    </template>
    <template #actions>
      <BaseButton mode="secondary" @click="handleDialogClose">Close</BaseButton>
      <BaseButton mode="danger" @click="handleDeleteConfirm">Delete</BaseButton>
    </template>
  </BaseDialog>

  <BaseDialog title="Task Details" v-if="isClickedDetails">
    <template #default>
      <div>
        <label for="taskTitle">Title:</label>
        <input id="taskTitle" v-model="taskTitle" />
      </div>
      <div>
        <label for="taskDescription">Description:</label>
        <textarea v-model="taskDescription" id="taskDescription" />
      </div>
    </template>
    <template #actions>
      <BaseButton @click="handleDialogClose" mode="secondary">CLOSE</BaseButton>
      <BaseButton @click="handleUpdateTask" mode="primary"
        >SAVE CHANGES</BaseButton
      >
    </template>
  </BaseDialog>

  <li>
    <div>
      <span :class="{ checked: isChecked }">
        {{ item.task }}
      </span>
    </div>
    <div class="actions-container">
      <span class="date-text">{{ item.created }}</span>
      <input
        type="checkbox"
        :checked="isChecked"
        @click="handleTaskToggleDone"
      />
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
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  emits: ["taskDelete", "taskToggleDone", "taskUpdate"],
  data() {
    return {
      taskTitle: this.item.task,
      taskDescription: this.item.description,
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
    handleTaskToggleDone() {
      this.$emit("taskToggleDone", this.item.id, !this.item.complete);
    },
    handleDeleteClick() {
      this.isClickedDelete = true;
    },
    handleDeleteConfirm() {
      this.$emit("taskDelete", this.item.id);
      this.isClickedDelete = false;
    },
    handleDialogClose() {
      this.isClickedDelete = false;
      this.isClickedDetails = false;
    },
    handleDetailsClick() {
      this.isClickedDetails = true;
    },
    handleUpdateTask() {
      if (
        this.taskTitle !== this.item.task ||
        this.taskDescription !== this.item.description
      ) {
        this.$emit(
          "taskUpdate",
          this.item.id,
          this.taskTitle,
          this.taskDescription
        );
      }
      this.isClickedDetails = false;
    },
  },
  mounted() {
    // console.log("list item mounted");
    console.log(this.item);
  },
  updated() {
    // console.log("list item updated");
  },
  unmounted() {
    // console.log("list item unmounted");
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

    .date-text {
      color: $secondary-dark;
    }
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
