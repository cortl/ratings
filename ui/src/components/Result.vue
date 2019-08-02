<template>
  <div>
    <h2 v-show="error">Error {{error}}</h2>
    <div v-show="loading">
      <h2>Loading</h2>
      <p>This may take a little while.. </p>
    </div>
    <h2>{{this.info.title}}</h2>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "Result",
  props: {
    id: Number
  },
  data: () => ({
    info: {},
    loading: true,
    error: false
  }),
  mounted() {
    Axios.get(`http://localhost:8080/ratings/${this.id}`)
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