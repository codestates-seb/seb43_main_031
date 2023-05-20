import axios from "axios";

// /boards?guTag=구이름&dongTag=동이름&title=제목&content=내용&sortProperty=viewCount&sortDirection=DESC
export default async function getBoards({ currentPage, searchText, selectedGu, selectedDong, sortType }) {
  const currentPageQuery = `&page=${currentPage - 1}`;
  const selectedGuSearchQuery = selectedGu === "지역구" ? "" : `&guTag=${selectedGu}`;
  const selectedDongSearchQuery = selectedDong === "지역동" ? "" : `&dongTag=${selectedDong}`;
  const searchTextQuery = searchText === "" ? "" : `&title=${searchText}`;
  const sortTypeQuery = `&sortProperty=${sortType}`;

  const url = `${process.env.REACT_APP_BASE_URL}/boards?${currentPageQuery}${selectedGuSearchQuery}${selectedDongSearchQuery}${searchTextQuery}${sortTypeQuery}&sortDirection=DESC`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
