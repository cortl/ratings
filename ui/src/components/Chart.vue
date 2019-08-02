<template>
  <div ref="chart" class="chart"></div>
</template>

<script>
import { Chart } from "frappe-charts/dist/frappe-charts.min.esm";

export default {
  name: "Chart",
  props: {
    season: Object
  },
  mounted: function() {
    const values = this.season.episodes.map(episode => episode.rating);
    const labels = this.season.episodes.map(episode => episode.number);
    this.chart = new Chart(this.$refs.chart, {
      title: `Season ${this.season.number}`,
      type: "line",
      colors: ["purple"],
      tooltipOptions: {
        formatTooltipX: d =>
          this.season.episodes.find(episode => episode.number === d).title,
        formatTooltipY: d => d + "/10"
      },
      data: {
        labels,
        datasets: [
          {
            name: "episode rating",
            values
          }
        ],
        yMarkers: [
          {
            label: "",
            value: 0,
            type: "solid"
          }
        ]
      }
    });
  },
  data: () => ({
    chart: undefined
  })
};
</script>
<style>
.chart {
  width: 100%;
}
</style>

