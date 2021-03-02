import http from '../../Helpers/http';

export const getNowShowing = async (month, dispatch) => {
  try {
    const response = await http().get(`api/v1/movies/month/${month}`);
    dispatch({
      type: 'NOWSHOWING',
      nowShowingMovies: response.data.results,
    });
  } catch (error) {
    dispatch({
      type: 'ERROR_MESSAGE',
      error: error.response.data.message,
    });
  }
};

export const getUpComing = async (month, dispatch) => {
  try {
    const response = await http().get(`api/v1/movies/month/${month}`);
    dispatch({
      type: 'UPCOMING',
      upComingMovies: response.data.results,
    });
  } catch (error) {
    dispatch({
      type: 'ERROR_MESSAGE',
      error: error.response.data.message,
    });
  }
};

export const getMovieById = async (id, dispatch) => {
  try {
    const response = await http().get(`api/v1/movies/${id}`);
    dispatch({
      type: 'MOVIE',
      results: response.data.results,
    });
  } catch (error) {
    dispatch({
      type: 'ERROR_MESSAGE',
      error: error.response.data.message,
    });
  }
};
