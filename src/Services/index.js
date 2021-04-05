import http from './http';

class Services {
  getMovieById(id) {
    return http(null).get(`api/v1/movies/${id}`);
  }

  activeAccount(data) {
    return http(null).patch('auth/activate', data);
  }

  sendForgotPasswordLink(id, email) {
    return http(null).post(`auth/forgot_password?id=${id}&email=${email}`);
  }

  editPassword(id, email, password) {
    return http(null).patch(`auth/password/${id}/${email}`, {password});
  }

  addMoviegoers(email) {
    return http(null).post('api/v1/moviegoers', email);
  }

  getUserDetail(token, id) {
    return http(token).get(`auth/user/${id}`);
  }

  resetPassword(data, id, email) {
    return http().patch(`auth/password/${id}/${email}`, data);
  }

  editUserDetail(token, id, data) {
    return http(token).patch(`auth/user/${id}`, data);
  }

  upload(token, data) {
    return http(token).patch('auth/user/upload', data);
  }

  getOrderHistory(token) {
    return http(token).get('api/v1/transaction/history');
  }

  buyTicket(token, data) {
    return http(token).post('api/v1/transaction', data);
  }

  getAllMovies(data) {
    return http().get(
      `api/v1/movies?limit=2&order=${data.order}&sort=${data.sort}&page=${data.page}&search=${data.search}`,
    );
  }
}

export default new Services();
