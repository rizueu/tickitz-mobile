export const setOrder = (data) => {
  return {
    type: 'SET_ORDER',
    movieTitle: data.movieTitle,
    cinemaName: data.cinemaName,
    showTimeDate: data.showTimeDate,
    picture: data.picture,
    city: data.city,
    ticketCount: data.ticketCount,
    pricePerSeat: data.pricePerSeat,
    showTimeId: data.showTimeId,
    timeId: data.timeId,
    cinemaId: data.id,
    movieId: data.movieId,
    category: data.movieCategory,
  };
};

export const selectTime = (time) => {
  console.log('SELECTED TIME', time);
  return {
    type: 'SELECT_TIME',
    time,
  };
};

export const selectSeat = (seats) => ({
  type: 'SELECT_SEAT',
  seats,
});

export const removeSeat = () => ({
  type: 'REMOVE_SEAT',
});

export const setTicketCount = () => {
  console.log('TICKET COUNT BERJALAN');
  return {
    type: 'SET_TICKET_COUNT',
  };
};

export const setTotalPayment = () => {
  console.log('Total Payment BERJALAN');
  return {
    type: 'SET_TOTAL_PAYMENT',
  };
};

export const setPaymentMethod = (paymentMethod) => ({
  type: 'SET_PAYMENT_METHOD',
  paymentMethod,
});

export const removePaymentMethod = () => ({
  type: 'REMOVE_PAYMENT_METHOD',
});

export const setPersonalInfo = (name, value) => ({
  type: 'SET_PERSONAL_INFO',
  value,
  name,
});

export const setPersonalInfoValid = (value) => ({
  type: 'SET_PERSONAL_INFO_VALID',
  isPersonalInfoValid: value,
});

export const setMessage = (message, type) => ({
  type: 'SET_MESSAGE',
  message,
  messageType: type,
});
