<template>
  <div></div>
  <dialog open>
    <header>
      <h2>{{ title }}</h2>
    </header>
    <section>
      <slot></slot>
    </section>
    <menu>
      <slot name="actions"> </slot>
    </menu>
  </dialog>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style scoped lang="scss">
div {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.146);
}
dialog {
  position: fixed;
  top: 20vh;
  display: flex;
  flex-direction: column;
  width: 600px;
  min-height: 300px;
  border: none;
  padding: 0;
  border-radius: 5px;
  header {
    padding: 0 1rem;
    border-bottom: 1px solid rgba(128, 128, 128, 0.201);
  }
  section {
    padding: 0 1rem;
    flex-grow: 1;
  }
  menu {
    border-top: 1px solid rgba(128, 128, 128, 0.201);
    padding: 1rem 1rem 0;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
