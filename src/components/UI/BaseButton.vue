<template>
  <button :class="[mode, size]" type="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ["mode", "size"],
};
</script>

<style scoped lang="scss">
button {
  border: none;
  font-weight: bold;
  font-size: 0.7rem;
  padding: 0.6rem 1rem;
  border-radius: 10px;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.danger {
  background-color: $danger;
}
.secondary {
  background-color: $secondary-light;
}
.primary {
  background-color: $primary;
  color: white;
}
.info {
  background-color: $info;
  color: white;
}
.small {
  // border-radius: 20px;
  padding: 0.4rem 0.9rem;
}
</style>
