// import { configureStore } from "@reduxjs/toolkit";
// import boardReducer from "./features/boardSlice";
// import commentReducer from "./features/commentSlice";
// import applyReducer from "./features/applySlice";
// import userReducer from "./features/userSlice";

// const store = configureStore({
//   reducer: {
//     board: boardReducer,
//     comment: commentReducer,
//     apply: applyReducer,
//     user: userReducer,
//   },
// });
// export default store;

import { configureStore, getDefaultMiddleware, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import boardReducer from "./features/boardSlice";
import commentReducer from "./features/commentSlice";
import applyReducer from "./features/applySlice";
import userReducer from "./features/userSlice";
import pageReducer from "./features/pageSlice";

const persistConfig = {
  key: "root", // 로컬스토리지에 저장한다.
  storage, // 세선스토리지에 저장한다.
  // blacklist: ["board"],
};

// 만약 persist 적용을 제어하려면 whitelist 와 blacklist를 추가하여 적절하게 적용하면된다.
// 그 목록엔 reducer를 넣지않고, reducer의 이름(name)을 넣어주어야 한다.
// 예시
// whitelist: ["user"], // 적용 대상목록
// blacklist: [""], // 제외 대상목록

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    board: boardReducer,
    comment: commentReducer,
    apply: applyReducer,
    user: userReducer,
    page: pageReducer,
  })
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false, // redux-persist와 함께 사용 시 직렬화 오류 방지
  }),
});

export const persistor = persistStore(store);

export default store;
