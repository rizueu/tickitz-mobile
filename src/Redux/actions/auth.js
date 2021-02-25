import http from '../../Helpers/http';

export const login = (email, password) => {
  return async (dispatch) => {
    const credentials = new URLSearchParams();
    credentials.append('email', email);
    credentials.append('password', password);
    try {
      const response = await http().post('auth/login', credentials);
      dispatch({
        type: 'LOGIN',
        token: response.data.results.token,
      });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        errorMsg: error.response.data.message,
      });
    }
  };
};

export const reset_token = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT',
      token: null,
      errorMsg: null,
    });
  };
};
