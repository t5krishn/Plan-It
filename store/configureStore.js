import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import tripReducer from "./reducers/tripReducer";

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
	return createStore(
		tripReducer,
		preloadedState,
		applyMiddleware(thunkMiddleware, loggerMiddleware)
	);
}
