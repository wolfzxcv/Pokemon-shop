<template>
  <div id="app">
    <NavBar />
    <AlertMsg />
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar/NavBar";
import AlertMsg from "./components/alertMessage/AlertMsg";

export default {
  name: "App",
  components: {
    NavBar,
    AlertMsg
  }
};
</script>

<style lang="scss">
@import "./assets/all";
</style>
