import fetch from "node-fetch";

export const getMovies = async ({ page = 1 }) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`,
    );

    if (!response.ok) {
      throw new Error(response.json().message);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getMovie = async ({ id }) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`,
    );

    if (!response.ok) {
      throw new Error(response.json().message);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getGenres = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`,
    );

    if (!response.ok) {
      throw new Error(response.json().message);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getMovieImages = async ({ id }) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_KEY}`,
    );

    if (!response.ok) {
      throw new Error(response.json().message);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getMovieReviews = async ({ id, page = 1 }) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`,
    );

    if (!response.ok) {
      throw new Error(response.json().message);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getUpcomingMovies = async ({ page = 1 }) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`,
    );

    if (!response.ok) {
      throw new Error(response.json().message);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getTrendingMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_KEY}&language=en-US`,
    );

    if (!response.ok) {
      throw new Error(response.json().message);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getTopRatedMovies = async ({ page = 1 }) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`,
    );

    if (!response.ok) {
      throw new Error(response.json().message);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getMovieCredits = async ({ id }) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_KEY}&language=en-US`,
    );

    if (!response.ok) {
      throw new Error(response.json().message);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getPersonDetails = async ({ id }) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_KEY}&language=en-US`,
    );

    if (!response.ok) {
      throw new Error(response.json().message);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getPersonMovies = async ({ id }) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.TMDB_KEY}&language=en-US`,
    );

    if (!response.ok) {
      throw new Error(response.json().message);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getLanguages = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/configuration/languages?api_key=${process.env.TMDB_KEY}`,
    );

    if (!response.ok) {
      throw new Error(response.json().message);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
