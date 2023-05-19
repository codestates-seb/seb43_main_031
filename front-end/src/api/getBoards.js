import axios from "axios";

// /boards?guTag=구이름&dongTag=동이름&title=제목&content=내용&sortProperty=viewCount&sortDirection=DESC
export default async function getBoards({
  searchText = "",
  selectedGu = "",
  selectedDong = "",
  sortTypeCreateDate,
  sortTypeViewCount,
}) {
  if (selectedGu === "지역구") {
    selectedGu = "";
  }
  if (selectedGu !== "지역구") {
    selectedGu = `&guTag=${selectedGu}`;
  }
  if (selectedDong === "지역동") {
    selectedDong = "";
  }
  if (selectedDong !== "지역동") {
    selectedDong = `&dongTag=${selectedDong}`;
  }
  if (searchText !== "") {
    searchText = `&title=${searchText}`;
  }
  const url = `${process.env.REACT_APP_BASE_URL}/boards?${selectedGu}${selectedDong}${searchText}${sortTypeViewCount}${sortTypeCreateDate}&sortDirection=DESC`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
