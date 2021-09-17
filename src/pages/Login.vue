<template>
  <h1>Login</h1>
  <form @submit.prevent="signIn">
    <label for="email">email</label>
    <input v-model="email" type="text" id="email" name="email" />
    <label for="email">password</label>
    <input v-model="password" type="text" id="password" name="password" />
    <button>sign in</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {},
};
</script>
