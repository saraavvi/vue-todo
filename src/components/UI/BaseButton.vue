<template>
  <button :class="[mode, size]" type="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: "primary",
    },
    size: {
      type: String,
    },
  },
};
</script>

<style scoped lang="scss">
button {
  border: none;
  font-weight: bold;
  font-size: 0.7rem;
  padding: 0.7rem 1rem;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  &:hover {
    backdrop-filter: brightness(0.9);
  }
}
.danger {
  background-color: $danger;
}
.secondary {
  background-color: $secondary-light;
  color: black;
}
.primary {
  background-color: $primary;
}
.info {
  background-color: $info;
}
.small {
  padding: 0.4rem 0.9rem;
  border-radius: 15px;
}
</style>
