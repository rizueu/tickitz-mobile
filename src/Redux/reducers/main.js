const initialState = {
  peekPassword: false,
  loading: false,
  toogle: false,
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
    case 'SHOW_TOGGLE': {
      return {
        ...state,
        toggle: !state.toggle,
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
