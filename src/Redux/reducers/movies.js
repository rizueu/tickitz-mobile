const initialState = {
  nowShowingMovies: [],
  upComingMovies: [],
  movie: {},
  error: null,
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOWSHOWING': {
      return {
        ...state,
        nowShowingMovies: action.nowShowingMovies,
      };
    }
    case 'UPCOMING': {
      return {
        ...state,
        upComingMovies: action.upComingMovies,
      };
    }
    case 'MOVIE': {
      return {
        ...state,
        movie: action.results,
      };
    }
    case 'ERROR_MESSAGE': {
      return {
        ...state,
        upComingMovies: [],
        error: action.error,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default moviesReducer;
