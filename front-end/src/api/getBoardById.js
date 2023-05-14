const API_BASE_URL = `http://localhost:8080`;

const mockData = {
  board: {
    id: 1,
    memberId: 1,
    title: "우리 집 강아지 산책 시켜주세요",
    content: "내용",
    cost: "50,000",
    viewCount: 10,
    createdDate: "2023-05-05",
    expiredDate: "2001-11-30",
    dongTag: "제기동",
    guTag: "동대문구",
    detailAddress: "301호",
    completed: true,
  },
  comments: [
    {
      commentId: 1,
      content: "강아지 종이 뭐에요?",
      createdDate: "2023-05-12T15:18:38.88841",
      updateDate: "2023-05-12T15:18:46.366386",
      member: {
        memberId: 1,
      },
      board: {
        boardId: 1,
      },
      comment: null,
    },
    {
      commentId: 2,
      content: "치와와",
      createdDate: "2023-05-12T15:18:41.318525",
      updateDate: "2023-05-12T15:18:41.318525",
      member: {
        memberId: 1,
      },
      board: {
        boardId: 1,
      },
      comment: null,
    },
    {
      commentId: 3,
      content: "고양이 종류가 뭐에요요",
      createdDate: "2023-05-12T15:21:56.416221",
      updateDate: "2023-05-12T15:21:56.416221",
      member: {
        memberId: 1,
      },
      board: null,
      comment: {
        commentId: 1,
      },
    },
    {
      commentId: 4,
      content: "길고양이요",
      createdDate: "2023-05-12T15:22:02.057088",
      updateDate: "2023-05-12T15:22:02.057088",
      member: {
        memberId: 1,
      },
      board: null,
      comment: {
        commentId: 1,
      },
    },
  ],
  applys: [
    {
      applyId: 1,
      boardId: 1,
      memberId: 1,
      content: "신청 요청합니다",
      createdDate: "2001-02-31",
      updatedDate: "2001-03-31",
    },
    {
      applyId: 2,
      boardId: 1,
      memberId: 2,
      content: "제가 신청할게요!",
      createdDate: "2021-03-21",
      updatedDate: "2022-03-31",
    },
  ],
};

export default function getBoardById(id) {
  // console.log("getBoardById", id);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mockData);
    });
  }, 100);

  //   const url = `${API_BASE_URL}/boards?board_id=${id}`;
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(data => {
  //       return data;
  //     })
  //     .catch(error => {
  //       console.error("Error:", error);
  //     });
}
