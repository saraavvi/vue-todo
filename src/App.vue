<template>
  <TheHeader />
  <section class="main">
    <router-view></router-view>
  </section>
</template>

<script>
import TheHeader from "./components/TheHeader";
export default {
  components: {
    TheHeader,
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  background-color: $secondary-light;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.main {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 80vw;
  margin: 0 auto;
  margin-top: 3rem;
  border: 1px solid $secondary;
  border-radius: 5px;
  min-height: 500px;
  background-color: white;
}
</style>
