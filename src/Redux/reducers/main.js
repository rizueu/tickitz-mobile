const initialState = {
  peekPassword: false,
  loading: false,
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PEEK_PASSWORD': {
      return {
        ...state,
        peekPassword: !state.peekPassword,
      };
    }
    case 'SET_LOADING': {
      return {
        ...state,
        loading: !state.loading,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default mainReducer;
