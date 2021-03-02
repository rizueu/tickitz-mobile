import http from '../../Helpers/http';

export const getShowtimes = (movieId, showTimeDate, city) => {
  return async (dispatch) => {
    try {
      const response = await http().get(
        `api/v1/showtimes?movieId=${movieId}&showTimeDate=${showTimeDate}&city=${city}`,
      );
      dispatch({
        type: 'SHOWTIMES',
        results: response.data.results,
      });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        errorMsg: error.response.data.message,
      });
    }
  };
};
