<template>
  <div class="movie">
    <div class="column left">
      <div>
        <img width="200" :src="imgsrc" />
      </div>
    </div>
    <div class="column right">
      <h2>{{ movielist.original_title }}</h2>
      <h4>RELEASE DATE: {{ movielist.release_date }}</h4>
      <h4>RATING: {{ movielist.vote_average }}</h4>
      <p>{{ movielist.overview }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Movie",
  data() {
    return {};
  },
  props: {
    movielist: Object,
  },
  computed: {
    imgsrc() {
      return `https://image.tmdb.org/t/p/w500/${this.movielist.poster_path}`;
    },
  },
};
</script>
<style scoped>
.movie {
  display: flex;
  background: white;
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 20px;
}

.left {
  flex: 30%;
  padding-top: 20px;
  padding-bottom: 20px;
}

.right {
  flex: 70%;
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: left;
}

@media only screen and (max-width: 991px) {
  .movie {
  display:block;
  background: white;
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 20px;
}
  .right {
    
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
  }
  .left {
    display:block;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
  }

  p {
    text-align: left;
    padding: 0 8px;
    line-height: 22px;
    text-align: left;
  }
}
</style>