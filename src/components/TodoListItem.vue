<template>
  <li>{{ task }}</li>
</template>

<script>
export default {
  props: ["task"],
  created() {
    console.log(this.task);
  },
};
</script>

<style scoped>
li {
  border: 1px solid green;
  padding: 1rem;
  margin: 5px;
  list-style: none;
}
</style>
