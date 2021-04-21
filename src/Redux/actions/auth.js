import http from '../../Helpers/http';

export const login = (email, password) => {
  return async (dispatch) => {
    const credentials = new URLSearchParams();
    credentials.append('email', email);
    credentials.append('password', password);
    try {
      const {data} = await http().post('auth/login', credentials);
      console.log(data.results);
      dispatch({
        type: 'LOGIN',
        token: data.results.token,
      });
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({
        type: 'SET_ERROR',
        errorMsg: error.response.data.message,
      });
    }
  };
};

export const reset_token = () => {
  return async (dispatch) => {
    console.log('LOGOUT JALAN');
    dispatch({
      type: 'LOGOUT',
      token: null,
      errorMsg: null,
    });
  };
};

export const refresh = () => {
  return {
    type: 'SET_REFRESH',
  };
};

export const setNullError = () => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NULL_ERROR',
      errorMsg: null,
    });
  };
};
