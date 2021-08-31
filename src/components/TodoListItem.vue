<template>
  <li>
    <div>
      {{ item.task }}
    </div>
    <div>
      <BaseButton @click="handleToggleDone">done</BaseButton>
    </div>
  </li>
</template>

<script>
export default {
  props: ["item", "id"],
  emits: ["toggleDone"],
  data() {
    return {};
  },
  methods: {
    handleToggleDone() {
      this.$emit("toggleDone", this.item.id);
    },
  },
};
</script>

<style scoped>
li {
  display: flex;
  justify-content: center;
  border: 1px solid green;
  padding: 1rem;
  margin: 5px;
  list-style: none;
}
</style>
