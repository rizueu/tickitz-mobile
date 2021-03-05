import http from '../../Helpers/http';

export const getNowShowing = (month) => {
  return async (dispatch) => {
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
};

export const getUpComing = (month) => {
  return async (dispatch) => {
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
};

export const getMovieById = (id) => {
  return async (dispatch) => {
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
};
