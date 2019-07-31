<template>
  <div class="search">
    <h2>TV Show by Rating</h2>
    <div class="row">
      <div class="six columns">
        <label for="tv">TV Show</label>
        <input class="u-full-width" type="text" id="tv" name="tv" value />
      </div>
    </div>
    <input class="button-primary" type="submit" value="Search" />
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    msg: String
  }
};
</script>
