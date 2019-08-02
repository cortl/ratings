<template>
  <div class="container">
    <div id="app">
      <div v-if="tvId">
        <Result :id="tvId" @back="handleBack"/>
      </div>
      <div v-else>
        <Search @result="goToResult" />
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
    tvId: ""
  }),
  methods: {
    goToResult: function(id) {
      this.tvId = id;
    },
    handleBack: function() {
      this.tvId = ""
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
