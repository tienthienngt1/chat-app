import rootReducer from "./rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { configureStore } from "@reduxjs/toolkit";
//import thunk from "redux-thunk";

const persistConfig = {
	key: "root",
	storage,
	stateReconciler: autoMergeLevel2,
	whitelist: ["userReducer"],
};

const store = configureStore({
    reducer: rootReducer,
    //middleware: [thunk]
});
const persistor = persistStore(store);

export { store, persistor };