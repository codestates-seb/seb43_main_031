import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import blankProfileImage from "../img/blank-profile.png";

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

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 720px;
  margin: auto;
  padding: calc(4% + 3rem) 0 2rem;
  > ul {
    display: flex;
    > li {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 3rem;
      width: 20rem;
      color: var(--font-color-light);
      font-weight: 600;
      background-color: #e7d1d1;
      border-radius: 40px 40px 0 0;
      cursor: pointer;
      &.active {
        background-color: #fff;
        color: var(--primary-color);
      }
      @media (max-width: 500px) {
        height: 2.5rem;
        width: 12rem;
      }
    }
  }
`;

const TabContent = styled.div`
  height: 25rem;
  width: 40rem;
  background-color: #fff;
  @media (max-width: 500px) {
    height: 16rem;
    width: 24rem;
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
      <Tab />
    </EntireContainer>
  );
}

function Tab() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { id: 0, name: "의뢰한 심부름", content: <div>첫번째 탭내용</div> },
    { id: 1, name: "수행한 심부름", content: <div>두번째 탭내용</div> },
  ];

  return (
    <TabContainer>
      <ul>
        {tabs.map(tab => (
          <li key={tab.id} onClick={() => setActiveTab(tab.id)} className={activeTab === tab.id ? "active" : ""}>
            {tab.name}
          </li>
        ))}
      </ul>
      {tabs
        .filter(tab => activeTab === tab.id)
        .map(tab => (
          <TabContent key={tab.id}>{tab.content}</TabContent>
        ))}
    </TabContainer>
  );
}
