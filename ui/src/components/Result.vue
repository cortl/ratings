<template>
  <div>
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
    this.info = {"title":"Stranger Things","seasons":[{"number":1,"episodes":[{"title":"Chapter One: The Vanishing of Will Byers","number":1,"rating":8},{"title":"Chapter Two: The Weirdo on Maple Street","number":2,"rating":8.13},{"title":"Chapter Three: Holly, Jolly","number":3,"rating":8.577},{"title":"Chapter Four: The Body","number":4,"rating":8.362},{"title":"Chapter Five: The Flea and the Acrobat","number":5,"rating":8.118},{"title":"Chapter Six: The Monster","number":6,"rating":8.396},{"title":"Chapter Seven: The Bathtub","number":7,"rating":8.188},{"title":"Chapter Eight: The Upside Down","number":8,"rating":8.563}]},{"number":2,"episodes":[{"title":"Chapter One: MADMAX","number":1,"rating":7.676},{"title":"Chapter Two: Trick or Treat, Freak","number":2,"rating":7.943},{"title":"Chapter Three: The Pollywog","number":3,"rating":7.879},{"title":"Chapter Four: Will the Wise","number":4,"rating":7.788},{"title":"Chapter Five: Dig Dug","number":5,"rating":7.912},{"title":"Chapter Six: The Spy","number":6,"rating":8.171},{"title":"Chapter Seven: The Lost Sister","number":7,"rating":6.361},{"title":"Chapter Eight: The Mind Flayer","number":8,"rating":8.147},{"title":"Chapter Nine: The Gate","number":9,"rating":8.143}]},{"number":3,"episodes":[{"title":"Chapter One: Suzie, Do You Copy?","number":1,"rating":7},{"title":"Chapter Two: The Mall Rats","number":2,"rating":6.917},{"title":"Chapter Three: The Case of the Missing Lifeguard","number":3,"rating":7.4},{"title":"Chapter Four: The Sauna Test","number":4,"rating":7.4},{"title":"Chapter Five: The Flayed","number":5,"rating":7.5},{"title":"Chapter Six: E Pluribus Unum","number":6,"rating":7.556},{"title":"Chapter Seven: The Bite","number":7,"rating":7.667},{"title":"Chapter Eight: The Battle of Starcourt","number":8,"rating":9}]}]}
    this.loading = false;
    // Axios.get(`http://localhost:8080/ratings/${this.id}`)
    //   .then(response => {
    //     this.info = response.data;
    //     this.loading = false;
    //   })
    //   .catch(err => {
    //     this.error = err.message;
    //     this.loading = false;
    //   });
  }
};
</script>