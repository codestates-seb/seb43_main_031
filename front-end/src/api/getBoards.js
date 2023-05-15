// TODO: API에 게시글 목록 조회 요청을 보낼 때, 검색어 정보, 지역 정보와 정렬 정보를 함께 보낼 수 있어야한다.
// http://localhost:8080/boards?page=1&size=10&search-text=산책&gu=강남구&dong=논현동&sort=views
// http://localhost:8080/boards?page=1&size=10&search-text=컴퓨터&gu=강동구&dong=고덕동&sort=createdDate
import axios from "axios";

const API_BASE_URL = `http://localhost:8080`;

const mockData = {
  boards: [
    {
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
    {
      id: 2,
      memberId: 1,
      title: "바퀴벌레 싫어요ㅠㅠ",
      content: "내용",
      cost: "3,0000000",
      viewCount: 12,
      createdDate: "2001-11-29",
      expiredDate: "2001-11-30",
      dongTag: "제기동",
      guTag: "동대문구",
      detailAddress: "301호",
      completed: false,
    },
    {
      id: 3,
      memberId: 3,
      title: "배달 해주세요",
      content: "내용",
      cost: "2,000",
      viewCount: 30,
      createdDate: "2023-05-6",
      expiredDate: "2001-11-30",
      dongTag: "제기동",
      guTag: "동대문구",
      detailAddress: "301호",
      completed: true,
    },
    {
      id: 4,
      memberId: 4,
      title: "바퀴벌레 잡아주세요",
      content: "내용",
      cost: "5,000",
      viewCount: 9,
      createdDate: "2021-12-12",
      expiredDate: "2001-11-30",
      dongTag: "제기동",
      guTag: "동대문구",
      detailAddress: "301호",
      completed: false,
    },
    {
      id: 5,
      memberId: 5,
      title: "음료 포장해주세요",
      content: "내용",
      cost: "1,000",
      viewCount: 10,
      createdDate: "2023-02-05",
      expiredDate: "2001-11-30",
      dongTag: "제기동",
      guTag: "동대문구",
      detailAddress: "301호",
      completed: true,
    },
  ],
};

export default async function getBoards({ page, searchText, gu, dong, sort }) {
  const url = `${API_BASE_URL}/boards?page=${page}&size=5&search-text=${searchText}&gu=${gu}&dong=${dong}&sort=${sort}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
