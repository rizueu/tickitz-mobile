const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  picture: '',
  phone: '',
  loyaltyPoints: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER': {
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        picture: action.picture,
        phone: action.phone,
        loyaltyPoints: action.loyaltyPoints,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default userReducer;
