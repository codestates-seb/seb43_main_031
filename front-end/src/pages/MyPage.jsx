import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import blankProfileImage from "../img/blank-profile.png";
import MyPageModal from "../components/MyPageModal";
import MyPageTab from "../components/MyPageTab";

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
  const [modal, setModal] = useState(false);

  // const [profile, setProfile] = useState({});

  // get 요청 부분
  // useEffect(() => {
  //   const fetchMember = async () => {
  //     const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/members/${memberId}`);
  //     setProfile(res.data);
  //   };
  //   fetchMember();
  // }, []);
  // 아마 const memberId = user.memberId 이런 식으로 로그인 시 저장해 둔 유저정보 받아올 듯
  const memberId = 1;
  const profile = {
    memberId: 1,
    email: "test@gmail.com",
    nickName: "nickname",
    phone: "010-1234-5678",
    images: "https://cdn.pixabay.com/photo/2016/03/04/22/54/animal-1236875_1280.jpg",
    memberStatus: "ACTIVE",
    createdDate: "2023-05-12T14:28:14.621685",
    updateDate: "2023-05-12T14:29:16.909628",
  };

  const { email, nickName, phone, images } = profile;

  const [member, setMember] = useState({
    nickName,
    password: "",
    phone,
    images,
  });
  console.log(member);

  const onCancle = () => {
    setModal(false);
    setMember({
      nickName,
      password: "",
      phone,
      images,
    });
  };

  const onChange = event => {
    const { name, value } = event.target;
    setMember(previous => ({ ...previous, [name]: value }));
  };

  const [passwordCheck, setpasswordCheck] = useState("");

  const onPasswordCheck = event => {
    const passwordCheckValue = event.target.value;
    setpasswordCheck(passwordCheckValue);
  };

  // patch 요청 부분
  const onSubmit = async event => {
    event.preventDefault();
    if (passwordCheck !== member.password) {
      alert("비밀번호가 일치하지 않습니다.");
    }
    if (passwordCheck === member.password) {
      try {
        await axios.patch(`${process.env.REACT_APP_BASE_URL}/members/${memberId}`, member);
        alert("회원 정보가 수정되었습니다.");
        window.location.reload();
      } catch (error) {
        alert("회원 정보 수정에 실패했습니다.");
        console.log(error);
      }
    }
  };

  return (
    <EntireContainer>
      <ProfileSection>
        {images === "" || images === null ? (
          <img src={blankProfileImage} alt="blanked user profile" />
        ) : (
          <img src={images} alt="user profile" />
        )}
        <ProfileInformation>
          <span className="nickName">{nickName}</span>
          <span>{email}</span>
          <span>{phone}</span>
          <ButtonContainer>
            {modal && (
              <MyPageModal
                member={member}
                onCancle={onCancle}
                onSubmit={onSubmit}
                onChange={onChange}
                onPasswordCheck={onPasswordCheck}
              />
            )}
            <button type="button" onClick={() => setModal(true)}>
              수정하기
            </button>
            <button className="deleteButton" type="button">
              회원탈퇴
            </button>
          </ButtonContainer>
        </ProfileInformation>
      </ProfileSection>
      <MyPageTab />
    </EntireContainer>
  );
}
