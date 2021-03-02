const initialState = {
  results: [],
  errorMsg: null,
};

const showtimesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOWTIMES': {
      return {
        ...state,
        results: action.results,
      };
    }
    case 'SET_ERROR': {
      return {
        ...state,
        errorMsg: action.errorMsg,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default showtimesReducer;
