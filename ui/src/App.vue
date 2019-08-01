<template>
  <div class="container">
    <div id="app">
      <div v-if="currentPage === 'search'">
        <Search @result="goToResult" />
      </div>
      <div v-if="currentPage === 'result'">
        <Result :id="tvId"/>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "./components/Search.vue";
import Result from "./components/Result.vue";

export default {
  name: "app",
  components: {
    Search,
    Result
  },
  data: () => ({
    currentPage: "search",
    tvId: ""
  }),
  methods: {
    goToResult: function(id) {
      this.currentPage = "result";
      this.tvId = id;
    }
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
