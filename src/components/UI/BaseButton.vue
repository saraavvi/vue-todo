<template>
  <button :class="mode" type="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ["mode"],
};
</script>

<style scoped lang="scss">
button {
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 5px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.danger {
  background-color: $danger;
}
.secondary {
  background-color: $secondary;
}
</style>
