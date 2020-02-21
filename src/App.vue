<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar/NavBar";
export default {
  name: "App",
  components: {
    NavBar
  }
};
</script>

<style lang="scss">
@import "./assets/all";
</style>
