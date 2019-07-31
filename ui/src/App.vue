<template>
  <div class="container">
    <div id="app">
      <Search/>
    </div>
  </div>
</template>

<script>
import Search from "./components/Search.vue";

export default {
  name: "app",
  components: {
    Search
  }
};
</script>

<style>
body {
  padding-top: 50px;
  font: 18px "Lucida Grande", Helvetica, Arial, sans-serif;
}

a {
  color: #00b7ff;
}
</style>
