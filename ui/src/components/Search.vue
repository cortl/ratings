<template>
  <div class="search">
    <h2>TV Show by Rating</h2>
    <div class="row">
      <div class="one-half column">
        <label for="tv">TV Show</label>
        <Autocomplete :search="search" @submit="handleSubmit">
          <template
            v-slot="{
        rootProps,
        inputProps,
        inputListeners,
        resultListProps,
        resultListListeners,
        results,
        resultProps
      }"
          >
            <div v-bind="rootProps">
              <input
                type="text"
                id="tv"
                name="tv"
                v-bind="inputProps"
                v-on="inputListeners"
                :class="[
            'u-full-width'
          ]"
              />
              <ul v-bind="resultListProps" v-on="resultListListeners">
                <li
                  class="result"
                  v-for="(result, index) in results"
                  :key="resultProps[index].id"
                  v-bind="resultProps[index]"
                >
                  <div class="title">{{ result.title }}</div>
                  <div class="snippet">{{result.description}}</div>
                </li>
              </ul>
            </div>
          </template>
        </Autocomplete>
      </div>
    </div>
  </div>
</template>

<script>
import Autocomplete from "@trevoreyre/autocomplete-vue";
import Axios from "axios";

export default {
  name: "Search",
  components: {
    Autocomplete
  },
  data: function() {
    return { focused: false, value: "", results: [] };
  },
  computed: {
    noResults() {
      return this.value && this.results.length === 0;
    }
  },
  methods: {
    search: async function(input) {
      if (input && input.length > 2) {
        this.results = await Axios.post(`http://localhost:8080/search/${input}`)
          .then(res => res.data)
          .catch(() => []);
      }
      return this.results;
    },
    handleSubmit: function(result) {
      this.$emit("result", result.id);
    }
  }
};
</script>

<style scoped>
.result {
  border-top: 1px solid #eee;
  padding: 16px;
  background: transparent;
}

.title {
  font-size: 20px;
  margin-bottom: 8px;
}

.snippet {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.54);
}

ul {
  list-style-type: none;
}

li {
  border-bottom: 1px #000;
  border-left: 1px #000;
  border-right: 1px #000;
}
</style>
