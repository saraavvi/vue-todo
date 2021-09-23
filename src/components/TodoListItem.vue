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
      <label for="priority">Priority:</label>
      <select v-model="taskPriority" name="priority" id="priority">
        <option value="low" :selected="item.priority === 'low'"> low </option>
        <option value="medium" :selected="item.priority === 'medium'">
          medium
        </option>
        <option value="high" :selected="item.priority === 'high'">
          high
        </option>
      </select>
    </template>
    <template #actions>
      <BaseButton @click="handleDialogClose" mode="secondary">close</BaseButton>
      <BaseButton @click="handleUpdateTask" mode="primary">
        save changes
      </BaseButton>
    </template>
  </BaseDialog>

  <li>
    <div>
      <span :class="{ checked: isChecked }">
        {{ item.task }}
      </span>
    </div>
    <div class="information-container">
      <div>
        <span class="dot" :class="item.priority"></span>
        <span class="priority"> {{ priorityText }}</span>
      </div>
      <div class="actions-container">
        <span class="date-text">
          {{ new Date(item.created).toLocaleDateString() }}
        </span>
        <input
          type="checkbox"
          :checked="isChecked"
          @click="handleTaskToggleDone"
        />
        <BaseButton @click="handleDetailsClick" mode="info" size="small">
          details
        </BaseButton>
        <button class="delete-icon" type="button">
          <i @click="handleDeleteClick" style="font-size:18px" class="fas"
            >&#xf2ed;</i
          >
        </button>
      </div>
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
      taskPriority: this.item.priority,
      isClickedDelete: false,
      isClickedDetails: false,
    };
  },
  computed: {
    isChecked() {
      return this.item.complete;
    },
    // isSelected(value) {
    //   return item.priority === "low";
    // },
    priorityText() {
      if (this.item.priority === "medium") {
        return "Medium priority";
      } else if (this.item.priority === "low") {
        return "Low priority";
      } else {
        return "High priority";
      }
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
        this.taskDescription !== this.item.description ||
        this.taskPriority !== this.item.priority
      ) {
        this.$emit(
          "taskUpdate",
          this.item.id,
          this.taskTitle,
          this.taskDescription,
          this.taskPriority
        );
      }
      this.isClickedDetails = false;
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
  .information-container {
    display: flex;
    justify-content: space-between;
    width: 40%;

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
    .priority {
      margin: 0 10px;
    }
    .medium {
      background-color: orange;
    }
    .high {
      background-color: red;
    }
    .low {
      background-color: green;
    }
    .dot {
      height: 10px;
      width: 10px;
      border-radius: 50%;
      display: inline-block;
    }
  }
}
</style>
