<!-- 
gör mer allmän så att den går att använda
till annat än todolistan. - SÅ skicka in array med namn istället för objekt hit?
Använda computed properties istället för methods för search-funktionalitet? Hur?
-->

<template>
  <form @submit.prevent="handleSubmit">
    <input
      id="search-input"
      v-model.trim="searchTerm"
      type="text"
      name="search"
      placeholder="Search..."
    />
  </form>
</template>

<script>
export default {
  props: ["array"],
  data() {
    return {
      searchTerm: "",
      searchResult: "",
    };
  },
  methods: {
    handleSubmit() {
      if (this.searchTerm) {
        this.searchResult = this.array.filter((item) => {
          return item.task.includes(this.searchTerm);
        });
        this.$emit("searchResult", this.searchResult);
      } else {
        this.$emit("searchResult", this.array);
      }
      this.searchTerm = "";
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
