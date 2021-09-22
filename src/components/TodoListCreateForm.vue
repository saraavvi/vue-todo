<template>
  <form @submit.prevent="handleCreate">
    <input
      v-model.trim="userInput"
      maxlength="80"
      placeholder=" + Add New To-Do"
      type="text"
      name="task"
    />
  </form>
</template>

<script>
export default {
  emits: ["taskCreate"],
  data() {
    return {
      userInput: "",
    };
  },
  methods: {
    //shoul validate user input more
    handleCreate() {
      if (this.userInput.length > 0) {
        this.$emit("taskCreate", this.userInput);
      }
      this.userInput = "";
    },
  },
};
</script>

<style scoped lang="scss">
form {
  display: flex;
  input {
    flex-grow: 1;
    padding-top: 1rem;
    padding-bottom: 0.5rem;
    border: none;
    border-bottom: 3px solid $primary;
    font-size: 1rem;
    &:focus {
      outline: none;
      &::placeholder {
        color: transparent;
      }
    }
  }
}
</style>
