import { postImage } from "../api/image";

// 에디터 내 이미지 업로드 로직 수정 hooks
export default function uploadImages(blob, callback) {
  const formData = new FormData();
  formData.append("file", blob);
  formData.append("Content-Type", "multipart/form-data");
  postImage(formData).then(response => {
    callback(response.data.image);
  });
}
