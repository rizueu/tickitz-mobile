import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

// Import All Reducer
import mainReducer from './main';
import authReducer from './auth';
import moviesReducer from './movies';
import showtimesReducer from './showtimes';
import orderReducer from './order';
import userReducer from './user';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['auth', 'movies', 'showtimes', 'order', 'user'],
};

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  stateReconciler: hardSet,
};

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  main: mainReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  movies: moviesReducer,
  showtimes: showtimesReducer,
  order: orderReducer,
  user: persistReducer(userPersistConfig, userReducer),
});

export default persistReducer(rootPersistConfig, rootReducer);
