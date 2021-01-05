<template>
  <div id="app">
    <Autocomplete
      :items="movies"
      filterby="original_title"
      @change="onChange"
      title="Look for a movie"
      @selected="customerSelected"
    />
    <div class="movies">
      <Movie
        v-for="movielist in movielists"
        :movielist="movielist"
        :key="movielist.id"
      />
    </div>
  </div>
</template>

<script>
import moviemixin from "./mixin/moviemixin.js";
import Autocomplete from "./components/Autocomplete";
import Movie from "./components/Movie";
export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {
    this.clicked = true;
    this.search = "Jurrasic park";
    this.movielists = this.useApi(this.search, this.clicked);
  },

  methods: {
    customerSelected(moviename) {
      this.search = moviename.original_title;
      this.clicked = true;
      this.movielists = this.useApi(this.search, this.clicked);
    },
    onChange(value) {
      if (value.length) {
        this.search = value;
        this.clicked = false;
        this.movies = this.useApi(this.search, this.clicked);
      }
    },
  },

  components: {
    Autocomplete,
    Movie,
  },
  mixins: [moviemixin],
};
</script>

<style>
body {
  background: aliceblue;
}
#app {
  margin: 0px auto;
  margin-top: 60px;
  width: 800px;
}

@media only screen and (max-width: 991px) {
  #app {
  width: 100%;
  }
}
</style>