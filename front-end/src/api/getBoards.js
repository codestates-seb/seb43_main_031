import axios from "axios";

// /boards?guTag=구이름&dongTag=동이름&title=제목&content=내용&sortProperty=viewCount&sortDirection=DESC
export default async function getBoards({ currentPage, searchText, selectedGu, selectedDong, sortType }) {
  const currentPageQuery = `&page=${currentPage - 1}`;
  const selectedGuSearchQuery = selectedGu === "지역구" ? "" : `&guTag=${selectedGu}`;
  const selectedDongSearchQuery = selectedDong === "지역동" ? "" : `&dongTag=${selectedDong}`;
  const searchTextQuery = searchText === "" ? "" : `&title=${searchText}`;
  const sortTypeQuery = `&sortProperty=${sortType}`;

  // API Bug: 구 선택이 안된 상태(쿼리에 guTag가 없는 상태)에서 title을 쿼리에 넣고 검색하면, 검색이 안되고 전체 데이터가 내려온다.
  // http://ec2-54-180-112-234.ap-northeast-2.compute.amazonaws.com:8080/boards?&page=0&title=리덕스&guTag=강남구
  // http://ec2-54-180-112-234.ap-northeast-2.compute.amazonaws.com:8080/boards?&page=0&title=리덕스

  const url = `${process.env.REACT_APP_BASE_URL}/boards?${currentPageQuery}${selectedGuSearchQuery}${selectedDongSearchQuery}${searchTextQuery}${sortTypeQuery}&sortDirection=DESC`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
