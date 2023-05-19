import { createSlice } from "@reduxjs/toolkit";

// const initialState = [
//   // 댓글만 있는경우
//   {
//     commentId: 1,
//     content: "강아지 종이 뭐에요?",
//     createdDate: "2023-05-12T15:18:38.88841",
//     updateDate: "2023-05-12T15:18:46.366386",
//     member: {
//       memberId: 1,
//     },
//     board: {
//       boardId: 1,
//     },
//     comment: null,
//   },
//   // 대댓글있는경우
//   {
//     commentId: 2,
//     content: "고양이 종류가 뭐에요요",
//     createdDate: "2023-05-12T15:21:56.416221",
//     updateDate: "2023-05-12T15:21:56.416221",
//     member: {
//       memberId: 1,
//     },
//     board: null,
//     comment: {
//       commentId: 1,
//     },
//   },
// ];

export const commentSlice = createSlice({
  name: "comment",
  initialState: [],
  reducers: {
    addComment(state, action) {
      return [...state, { ...action.payload }];
    },
    editComment(state, action) {
      const { commentId, content } = action.payload;
      state.map(item => (item.commentId === commentId ? (item.content = content) : item));
    },
    deleteComment(state, action) {
      return state.filter(item => item.commentId !== action.payload);
    },
    setComment(state, action) {
      return action.payload;
    },
  },
});

export const { addComment, editComment, deleteComment, setComment } = commentSlice.actions;
export default commentSlice.reducer;

// 리덕스 툴킷으로 비동기 요청 보내는 방법
// 리덕스에서 액션은 상태에 어떤 변화가 필요할 때 발생되어야 하는 객체이다.
// createAsyncThunk(툴킷에 내장된 미들웨어)는 비동기 작업을 처리하는 action creator를 만들어 준다
// 이는 두개의 파라미터를 전달한다. (엑션의 이름(name)과 /설정한 엑션의 변수이름, 미들웨어가 처리할 비동기 함수)
// thunk로 만들어진 비동기 action creator는 createSlice안에서 일반 리듀서가 아닌 extraReducers 메서드에서 동작하게 한다.
// pending,fulfilled,rejected에서 동작할 리듀서들을 두번째 파라미터 함수에 전달하고 각각 정의한다.

// 그렇다면 동기적인 action은 reducers를 사용하고, 비동기적인 action은 extraReducers를 사용하는데, 그차이는
// reducers를 사용하면 action creator를 toolkit이 자동으로 만들어 준다.
// 그러나 비동기 작업은 자동으로 만들어 주지 못한다. 따라서 extraReducers안에서 그 통신상태에 따라 작업해줘야한다.
