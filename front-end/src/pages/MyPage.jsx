import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import blankProfileImage from "../img/blank-profile.png";

const EntireContainer = styled.div`
  width: 100vw;
  min-height: calc(100vh - 50px);
  padding: 5rem 0;
  border: 1px solid red;
`;

const ProfileSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 720px;
  margin: auto;
  padding: 0 2rem;
  gap: 3rem;
  border: 1px solid red;
  @media (max-width: 500px) {
    gap: 1.5rem;
  }
  > img {
    height: 20rem;
    width: 20rem;
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
  gap: 3rem;
  font-size: 1.5rem;
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
  // const [profile, setProfile] = useState({});

  // 아마 const memberId = user.memberId 이런 식으로 로그인 시 저장해 둔 유저정보 받아올 듯
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/members/${memberId}`);
  //     setProfile(res.data);
  //   };
  //   fetchData();
  // }, []);

  const profile = {
    memberId: 1,
    email: "test@gmail.com",
    nickName: "nickname",
    phone: "010-1234-5678",
    image: "",
  };

  const { email, nickName, phone, image } = profile;

  return (
    <EntireContainer>
      <ProfileSection>
        {image === "" || image === null ? (
          <img src={blankProfileImage} alt="blanked user profile" />
        ) : (
          <img src={image} alt="user profile" />
        )}
        <ProfileInformation>
          <span className="nickName">{nickName}</span>
          <span>{email}</span>
          <span>{phone}</span>
          <ButtonContainer>
            <button type="button">수정하기</button>
            <button className="deleteButton" type="button">
              회원탈퇴
            </button>
          </ButtonContainer>
        </ProfileInformation>
      </ProfileSection>
    </EntireContainer>
  );
}
