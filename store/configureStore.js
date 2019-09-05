import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import tripReducer from "./reducers/tripReducer";

import { gettingTripData, selectedTrip } from "./reducers/tripReducer";
import { gettingUserData, selectedUser } from "./reducers/userReducer";
const loggerMiddleware = createLogger();

const rootReducer = combineReducers({
	gettingTripData,
	selectedTrip,
	gettingUserData,
	selectedUser
});

export default function configureStore(preloadedState) {
	return createStore(
		rootReducer,
		preloadedState,
		applyMiddleware(thunkMiddleware, loggerMiddleware)
	);
}
