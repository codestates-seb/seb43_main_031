// TODO: API에 게시글 목록 조회 요청을 보낼 때, 검색어 정보, 지역 정보와 정렬 정보를 함께 보낼 수 있어야한다.
// http://localhost:8080/boards?page=1&size=10&search-text=산책&gu=강남구&dong=논현동&sort=views
// http://localhost:8080/boards?page=1&size=10&search-text=컴퓨터&gu=강동구&dong=고덕동&sort=createdAt

// TODO: 게시글 채택 여부가 함께 돌아와야한다.
export default function getBoards(searchText) {
  // TODO : fetch API로 교체
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (searchText === "실패 테스트") {
        reject(new Error("조회된 게시글이 없습니다."));
      }
      resolve({
        data: [
          {
            memberId: 1,
            title: "우리 집 강아지 산책 시켜주세요",
            content: "내용",
            cost: "50,000",
            viewCount: 10,
            createDate: "2023-05-05",
            expiredDate: "2001-11-30",
            dongTag: "제기동",
            guTag: "동대문구",
            detailAddress: "301호",
            completed: true,
          },
          {
            memberId: 2,
            title: "바퀴벌레 싫어요ㅠㅠ",
            content: "내용",
            cost: "3,0000000",
            viewCount: 12,
            createDate: "2001-11-29",
            expiredDate: "2001-11-30",
            dongTag: "제기동",
            guTag: "동대문구",
            detailAddress: "301호",
            completed: false,
          },
          {
            memberId: 3,
            title: "배달 해주세요",
            content: "내용",
            cost: "2,000",
            viewCount: 30,
            createDate: "2023-05-6",
            expiredDate: "2001-11-30",
            dongTag: "제기동",
            guTag: "동대문구",
            detailAddress: "301호",
            completed: true,
          },
          {
            memberId: 4,
            title: "바퀴벌레 잡아주세요",
            content: "내용",
            cost: "5,000",
            viewCount: 9,
            createDate: "2021-12-12",
            expiredDate: "2001-11-30",
            dongTag: "제기동",
            guTag: "동대문구",
            detailAddress: "301호",
            completed: false,
          },
        ],
        pageInfo: {
          page: 1,
          size: 10,
          totalPages: 1,
        },
      });
    });
  }, 100);
}
