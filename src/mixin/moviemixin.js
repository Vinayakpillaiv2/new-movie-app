const API_KEY = '8a701380ab3802a262124a6d40864c85';
export default {


    data() {
        return {
            movielists: [],
            search: "",
            movies: [],
            clicked: true

        }
    },
    methods: {
        useApi(search, clicked) {

            const MOVIE_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`;


            fetch(MOVIE_API_URL)
                .then(response => response.json())
                .then(jsonResponse => {
                    if (clicked === true) {
                        this.movielists = jsonResponse.results;
                    } else {
                        this.movies = [];
                        this.movies = jsonResponse.results;

                    }


                });

            // return movies;
        }

    }


}


