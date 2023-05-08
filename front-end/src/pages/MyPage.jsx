import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import blankProfileImg from "../img/blank-profile.png";

const Container = styled.div`
  background-color: #fae7e7;
  width: 100vw;
  height: calc(100vh - 120px);
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 720px;
  margin: auto;
  padding: calc(50px + 3%) 3%;
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
    id: 1,
    email: "test@gmail.com",
    nickName: "nickname",
    phone: "010-1234-5678",
    image: "https://my-bucket.s3.ap-northeast-2.amazonaws.com/my-image.jpg",
  };

  return (
    <Container>
      <ProfileSection>
        {data.image === "" ? (
          <img className="profileImg" src={blankProfileImg} alt="blanked user profile image" />
        ) : (
          <img className="profileImg" src={data.image} alt="user profile image" />
        )}
        <span>{data.nickName}</span>
        <span>{data.email}</span>
        <span>{data.phone}</span>
      </ProfileSection>
    </Container>
  );
}

export default MyPage;
