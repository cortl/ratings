<template>
  <div>
    <button v-on:click="$emit('back')">Go Back</button>
    <h2 v-show="error">Error {{error}}</h2>
    <div v-if="loading" v-show="loading">
      <h2>Loading</h2>
      <p>This may take a little while..</p>
    </div>
    <div v-else>
      <h2>{{this.info.title}}</h2>
      <div v-for="season in this.info.seasons" v-bind:key="season.number">
        <Chart :season="season" />
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import Chart from "./Chart";

export default {
  name: "Result",
  props: {
    id: Number
  },
  components: {
    Chart
  },
  data: () => ({
    info: {},
    loading: true,
    error: false
  }),
  mounted() {
    Axios.get(`/imdb/${this.id}`)
      .then(response => {
        this.info = response.data;
        this.loading = false;
      })
      .catch(err => {
        this.error = err.message;
        this.loading = false;
      });
  }
};
</script>

<style scoped>
button {
  float: right;
}
</style>

