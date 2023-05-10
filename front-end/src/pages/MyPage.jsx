import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import blankProfileImg from "../img/blank-profile.png";

const Container = styled.div`
  background-color: #fae7e7;
  width: 100vw;
  min-height: calc(100vh - 50px);
  border: 1px solid red;
`;

const ProfileSection = styled.div`
  display: flex;
  max-width: 720px;
  margin: auto;
  padding: calc(3rem + 50px) 3rem;
  align-items: center;
  justify-content: center;
  border: 1px solid blue;
  gap: 3rem;
  .profileImg {
    height: 20rem;
    width: 20rem;
    border-radius: 70%;
    overflow: hidden;
    border: 0.5rem solid #fff;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20rem;
  gap: 3rem;
  font-size: 1.5rem;
  .nickName {
    font-size: 2rem;
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
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
    image: "https://cdn.pixabay.com/photo/2016/03/04/22/54/animal-1236875__340.jpg",
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
            <button type="button">프로필 수정하기</button>
            <button type="button">회원탈퇴</button>
          </Buttons>
        </ProfileInfo>
      </ProfileSection>
    </Container>
  );
}

export default MyPage;
