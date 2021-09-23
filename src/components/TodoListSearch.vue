<!-- behöver ej vara i egen component - föytta till actionbar -->
<template>
  <input
    id="search-input"
    v-model.trim="searchInput"
    ref="userText"
    type="text"
    name="search"
    placeholder="Search..."
  />
</template>

<script>
export default {
  emits: ["searchInput"],
  data() {
    return {
      searchInput: "",
    };
  },
  watch: {
    searchInput(value) {
      this.$emit("searchInput", value);
    },
  },
};
</script>

<style scoped lang="scss">
input {
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
</style>
