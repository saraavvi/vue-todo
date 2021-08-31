<template>
  <form>
    <input v-model="userInput" type="text" name="task" />
    <button @click.prevent="handleCreate">Add Task</button>
  </form>
</template>

<script>
export default {
  emits: ["createTodo"],
  data() {
    return {
      userInput: "",
    };
  },
  methods: {
    handleCreate() {
      this.$emit("createTodo", this.userInput);
    },
  },
};
</script>

<style scoped>
form {
  border: 1px solid blue;
  padding: 1rem;
  margin: 5px;
}
</style>
