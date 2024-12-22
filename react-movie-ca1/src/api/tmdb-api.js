// export const getMovies = async () => {
//   const response = await fetch(
//     'http://localhost:8080/api/movies', {
//     headers: {
//       'Authorization': window.localStorage.getItem('token')
//     }
//   }
//   )
//   return response.json();
// };

export const getMovies = (args) => {
  const _page = args?.queryKey?.[1]?.page;
  const page = typeof _page !== "undefined" ? _page : 1;

  return fetch(
    `http://localhost:8080/api/tmdb/discover/movie?page=${page}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovie = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;

  return fetch(
    `http://localhost:8080/api/tmdb/movie/${id}`,
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getGenres = () => {
  return fetch(
    `http://localhost:8080/api/tmdb/genres`,
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;

  return fetch(
    `http://localhost:8080/api/tmdb/movie/${id}/images`,
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieReviews = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;

  const _page = args?.queryKey?.[1]?.page;
  const page = typeof _page !== "undefined" ? _page : 1;

  return fetch(
    `http://localhost:8080/api/tmdb/movie/${id}/reviews?page=${page}`,
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getUpcomingMovies = (args) => {
  const _page = args?.queryKey?.[1]?.page;
  const page = typeof _page !== "undefined" ? _page : 1;

  return fetch(
    `http://localhost:8080/api/tmdb/upcoming?page=${page}`,
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getTrendingMovies = () => {
  return fetch(
    `http://localhost:8080/api/tmdb/trending/movie/day`,
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getTopRatedMovies = (args) => {
  const _page = args?.queryKey?.[1]?.page;
  const page = typeof _page !== "undefined" ? _page : 1;

  return fetch(
    `http://localhost:8080/api/tmdb/top_rated?page=${page}`,
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieCredits = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;

  return fetch(
    `http://localhost:8080/api/tmdb/movie/${id}/credits`,
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getPersonDetails = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;

  return fetch(
    `http://localhost:8080/api/tmdb/person/${id}`,
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getPersonMovies = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;

  return fetch(
    `http://localhost:8080/api/tmdb/person/${id}/movie_credits`,
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getLanguages = () => {
  return fetch(
    `http://localhost:8080/api/tmdb/configuration/languages`,
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMongoReviews = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;

  const _page = args?.queryKey?.[1]?.page;
  const page = typeof _page !== "undefined" ? _page : 1;

  return fetch(
    `http://localhost:8080/api/reviews/movie/${id}?page=${page}`,
    {
      headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    }
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const login = async (username, password) => {
  const response = await fetch('http://localhost:8080/api/users', {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ username: username, password: password })
  });
  return response.json();
};

export const signup = async (username, password) => {
  const response = await fetch('http://localhost:8080/api/users?action=register', {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ username: username, password: password })
  });
  return response.json();
};
