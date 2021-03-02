import http from '../../Helpers/http';
import jwt_decode from 'jwt-decode';

export const getUser = (token) => {
  const {id} = jwt_decode(token);
  return async (dispatch) => {
    try {
      const response = await http(token).get(`auth/user/${id}`);
      dispatch({
        type: 'GET_USER',
        firstName: response.data.results.firstName,
        lastName: response.data.results.lastName,
        email: response.data.results.email,
        picture: response.data.results.picture,
        phone: response.data.results.phone,
        loyaltyPoints: response.data.results.loyaltyPoints,
      });
    } catch (error) {}
  };
};
