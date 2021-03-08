const initialState = {
  userId: null,
  showTimeDate: null,
  ticketTime: null,
  cinemaName: null,
  picture: null,
  cinemaCity: null,
  ticketCount: 0,
  totalPayment: 0,
  pricePerSeat: 0,
  paymentMethod: null,
  seats: [],
  movieTitle: null,
  timeId: null,
  showTimeId: null,
  cinemaId: null,
  movieId: null,
  fullName: null,
  phone: null,
  email: null,
  isPersonalInfoValid: false,
  message: null,
  messageType: null,
  category: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ORDER': {
      return {
        ...state,
        movieTitle: action.movieTitle,
        cinemaName: action.cinemaName,
        showTimeDate: action.showTimeDate,
        picture: action.picture,
        cinemaCity: action.city,
        ticketCount: action.ticketCount,
        pricePerSeat: action.pricePerSeat,
        showTimeId: action.showTimeId,
        timeId: action.timeId,
        cinemaId: action.cinemaId,
        movieId: action.movieId,
        category: action.category,
      };
    }

    case 'SELECT_TIME': {
      console.log('INI TICKETTIME', action.time);
      return {
        ...state,
        ticketTime: action.time,
      };
    }

    case 'SELECT_SEAT': {
      return {
        ...state,
        seats: action.seats,
      };
    }

    case 'REMOVE_SEAT': {
      return {
        ...state,
        seats: [],
      };
    }

    case 'SET_TICKET_COUNT': {
      return {
        ...state,
        ticketCount: Number(state.seats.length),
      };
    }

    case 'SET_TOTAL_PAYMENT': {
      return {
        ...state,
        totalPayment: state.ticketCount * Number(state.pricePerSeat),
      };
    }

    case 'SET_PAYMENT_METHOD': {
      return {
        ...state,
        paymentMethod: action.paymentMethod,
      };
    }

    case 'REMOVE_PAYMENT_METHOD': {
      return {
        ...state,
        paymentMethod: null,
      };
    }

    case 'SET_PERSONAL_INFO': {
      return {
        ...state,
        [action.name]: action.value,
      };
    }

    case 'SET_PERSONAL_INFO_VALID': {
      return {
        ...state,
        isPersonalInfoValid: action.isPersonalInfoValid,
      };
    }

    case 'SET_MESSAGE': {
      return {
        ...state,
        message: action.message,
        messageType: action.messageType,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default orderReducer;
