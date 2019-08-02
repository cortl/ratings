<template>
  <div class="chart" width="100%">
    <h4>Season {{season.number}}</h4>
    <TrendChart
      v-if="dataset.length"
      :datasets="[{data: dataset, fill: true, showPoints: true}]"
      :labels="labels"
      :min="0"
      :max="10"
      :grid="grid"
      :interactive="true"
      v-on:mouseMove="onMouseMove"
    />
  </div>
</template>

<script>
import TrendChart from "vue-trend-chart";
import Popper from "popper.js";

export default {
  name: "Chart",
  components: {
    TrendChart
  },
  props: {
    season: Object
  },
  mounted: function() {
    this.dataset = this.season.episodes.map(episode => episode.rating);
    this.labels.xLabels = this.season.episodes.map(episode => episode.number);
  },
  methods: {
    onMouseMove(params) {
      if (params) {
        const episode = this.season.episodes[params.index];
        console.log(episode.title);
      }
    }
  },
  data: () => ({
    dataset: [],
    labels: {
      xLabels: [],
      yLabels: 5
    },
    grid: {
      verticalLines: false,
      horizontalLines: false
    },
    tooltipData: {}
  })
};
</script>

<style lang="scss">
.chart {
  .vtc {
    height: 50px;
    font-size: 12px;
    @media (min-width: 699px) {
      height: 350px;
    }
  }
  .grid,
  .labels {
    line {
      stroke: rgba(#000, 0.5);
    }
  }
  .x-labels {
    .label {
      line {
        opacity: 0.3;
      }
      &:nth-child(6n + 1),
      &:first-child {
        text {
          display: block;
        }
        line {
          opacity: 1;
        }
      }
    }
  }
  .curve-btc {
    .stroke {
      stroke: #000;
      stroke-width: 2;
    }
    .fill {
      fill: #d8002b;
    }
  }
}
</style>
