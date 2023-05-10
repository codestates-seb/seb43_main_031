import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import blankProfileImg from "../img/blank-profile.png";

const Container = styled.div`
  width: 100vw;
  min-height: calc(100vh - 50px);
  padding: 5rem 0;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 720px;
  margin: auto;
  padding: 0 3rem;
  gap: 3rem;
  .profileImg {
    height: 20rem;
    width: 20rem;
    border-radius: 70%;
    overflow: hidden;
    border: 0.4rem solid #fff;
    @media (max-width: 500px) {
      height: 15rem;
      width: 15rem;
    }
  }
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  font-size: 1.5rem;
  @media (max-width: 500px) {
    gap: 2.5rem;
  }
  .nickName {
    font-size: 2rem;
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 2rem;
  .btn {
    height: 40px;
    width: 120px;
    border-radius: 20px;
    font-weight: 600;
    border-style: none;
    background-color: #fff;
    cursor: pointer;
  }
  .red {
    color: var(--error-color);
  }
`;

function MyPage() {
  // const [data, setData] = useState({});

  // 아마 const memberId = user.memberId 이런 식으로 로그인 시 저장해 둔 유저정보 받아올 듯
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await axios.get(`http://localhost:8080/members/${memberId}`);
  //     setData(res.data);
  //   };
  //   fetchData();
  // }, []);
  const data = {
    memberId: 1,
    email: "test@gmail.com",
    nickName: "nickname",
    phone: "010-1234-5678",
    image: "",
  };

  return (
    <Container>
      <ProfileSection>
        {data.image === "" || data.image === null ? (
          <img className="profileImg" src={blankProfileImg} alt="blanked user profile" />
        ) : (
          <img className="profileImg" src={data.image} alt="user profile" />
        )}
        <ProfileInfo>
          <span className="nickName">{data.nickName}</span>
          <span>{data.email}</span>
          <span>{data.phone}</span>
          <Buttons>
            <button className="btn" type="button">
              프로필 수정하기
            </button>
            <button className="red btn" type="button">
              회원탈퇴
            </button>
          </Buttons>
        </ProfileInfo>
      </ProfileSection>
    </Container>
  );
}

export default MyPage;
