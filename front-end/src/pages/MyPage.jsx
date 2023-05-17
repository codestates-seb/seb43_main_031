import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import blankProfileImage from "../img/blank-profile.png";
import { setUser } from "../redux/features/userSlice";
import MyPageModal from "../components/MyPageModal";
import MyPageTab from "../components/MyPageTab";
import { postImage, deleteImage } from "../api/image";
import { patchMember, deleteMember } from "../api/member";

const EntireContainer = styled.div`
  width: 100vw;
  min-height: calc(100vh - 50px);
  padding: 5rem 0;
  color: var(--font-color-bold);
`;

const ProfileSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 720px;
  margin: auto;
  padding: 0 2rem;
  gap: 3rem;
  @media (max-width: 500px) {
    gap: 1.5rem;
  }
  > img {
    height: 16rem;
    width: 16rem;
    border: 0.4rem solid #fff;
    border-radius: 70%;
    overflow: hidden;
    @media (max-width: 500px) {
      height: 10rem;
      width: 10rem;
    }
  }
`;

const ProfileInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  font-size: 1.3rem;
  @media (max-width: 500px) {
    gap: 1.5rem;
    font-size: 1rem;
  }
  .nickName {
    font-size: 2rem;
    font-weight: 600;
    @media (max-width: 500px) {
      font-size: 1.5rem;
      font-weight: 600;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  @media (max-width: 500px) {
    gap: 1rem;
  }
  > button {
    height: 40px;
    width: 120px;
    border-style: none;
    border-radius: 20px;
    font-size: 1rem;
    font-weight: 600;
    background-color: #fff;
    cursor: pointer;
    @media (max-width: 500px) {
      height: 25px;
      width: 75px;
      font-size: 0.8rem;
    }
  }
  .deleteButton {
    color: var(--error-color);
  }
`;

export default function MyPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.user);
  const { memberId, email, nickName, phone, images } = currentUser;

  const [modal, setModal] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState("");
  const [member, setMember] = useState(currentUser);

  const onCancel = () => {
    // 이미지 서버로 보낸 이미지가 있다면, 해당 이미지를 삭제하는 로직이 추가되어야 할 듯.
    setMember(currentUser);
    setModal(false);
  };

  const onImageUpload = event => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("Content-Type", "multipart/form-data");
    if (member.images) {
      deleteImage(member.images);
    }
    postImage(formData).then(response => {
      if (response !== "fail") {
        setMember(previous => ({ ...previous, images: response.data.image }));
        alert("이미지가 등록되었습니다.");
      }
      if (response === "fail") {
        alert("이미지 등록에 실패했습니다.");
      }
    });
  };

  const onImageDelete = () => {
    if (!member.images) {
      alert("삭제할 이미지가 없습니다.");
      return;
    }
    const response = deleteImage(member.images);
    if (response === "success") {
      setMember(previous => ({ ...previous, images: "" }));
      alert("이미지가 삭제되었습니다.");
    }
    if (response === "fail") {
      alert("이미지 삭제에 실패했습니다.");
    }
  };

  const onChange = event => {
    const { name, value } = event.target;
    setMember(previous => ({ ...previous, [name]: value }));
  };

  const onPasswordCheck = event => {
    const passwordCheckValue = event.target.value;
    setPasswordCheck(passwordCheckValue);
  };

  const onSubmit = event => {
    event.preventDefault();
    if (passwordCheck !== member.password) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    patchMember(memberId, member).then(response => {
      if (response !== "fail") {
        dispatch(setUser(response.data));
        alert("회원 정보가 수정되었습니다.");
      }
      if (response === "fail") {
        alert("회원 정보 수정에 실패했습니다.");
      }
    });
  };

  const handleClick = () => {
    deleteMember(memberId).then(response => {
      if (response === "success") {
        // 로그아웃 처리?
        alert("회원 탈퇴 과정이 완료되었습니다.");
        navigate("/");
      }
      if (response === "fail") {
        alert("회원 탈퇴에 실패했습니다. 자세한 내용은 사이트 관리자에게 문의해 주시길 바랍니다.");
      }
    });
  };

  return (
    <EntireContainer>
      <ProfileSection>
        {images ? <img src={images} alt="user profile" /> : <img src={blankProfileImage} alt="blanked user profile" />}
        <ProfileInformation>
          <span className="nickName">{nickName}</span>
          <span>{email}</span>
          <span>{phone}</span>
          <ButtonContainer>
            {modal && (
              <MyPageModal
                member={member}
                onCancel={onCancel}
                onSubmit={onSubmit}
                onChange={onChange}
                onPasswordCheck={onPasswordCheck}
                onImageUpload={onImageUpload}
                onImageDelete={onImageDelete}
              />
            )}
            <button type="button" onClick={() => setModal(true)}>
              수정하기
            </button>
            <button
              className="deleteButton"
              type="button"
              onClick={() => (confirm("정말로 탈퇴하시겠습니까?") ? handleClick() : null)}
            >
              회원탈퇴
            </button>
          </ButtonContainer>
        </ProfileInformation>
      </ProfileSection>
      <MyPageTab />
    </EntireContainer>
  );
}
