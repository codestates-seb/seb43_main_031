import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { authAxios } from "../api/core/instance";

const EntireContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 50px);
  padding: 3rem;
  color: var(--font-color-bold);
`;

const WarningWords = styled.p`
  display: flex;
  justify-content: center;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 100%;
  border-radius: 20px;
  border: 2px solid #db8787;
  padding: 3rem;
  background-color: #fff;
  @media (max-width: 500px) {
    width: 380px;
  }
`;

const ChatMessages = styled.div`
  width: 520px;
  height: 800px;
  margin-bottom: 2rem;
  overflow-y: auto;
  @media (max-width: 500px) {
    width: 300px;
  }
`;

const ChatMessage = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: #db8787;
  ${props =>
    props.isCurrentUser &&
    `
    color: #120003;
  `}
`;

const ChatSender = styled.span`
  margin-right: 0.5rem;
  font-weight: bold;
`;

const ChatContent = styled.span`
  width: 400px;
  @media (max-width: 500px) {
    width: 200px;
  }
`;

const ChatInputContainer = styled.form`
  display: flex;
  align-items: center;
`;

const ChatInput = styled.input`
  width: 100%;
  padding: 0.5rem;
`;

const SendButton = styled.button`
  margin-left: 1rem;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  color: #fff;
  background-color: #db8787;
  cursor: pointer;
`;

export default function ChatPage() {
  const { id } = useParams();
  const currentUser = useSelector(state => state.user.userInfo) || {};
  const { memberId } = currentUser;
  // 의뢰자 id
  const employer = 44;
  // 수행자 id
  const employee = 45;

  const [list, setList] = useState([]);
  const [chat, setChat] = useState({
    applyId: id,
    content: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await authAxios.get(`/chats/${id}`);
      setList(response.data.data);
    };
    fetchData(); // 맨처음 랜더링 시 실행
    const interval = setInterval(fetchData, 5000); // 5초마다 실행
    return () => clearInterval(interval);
  }, []);

  const handleChange = event => {
    setChat(previous => ({ ...previous, content: event.target.value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await authAxios.post("/chats", chat);
      const newMessage = response.data.data;
      setList(prevList => [...prevList, newMessage]);
      event.target.reset();
      setChat(previous => ({ ...previous, content: "" }));
    } catch (error) {
      console.log(error);
      alert("메시지 전송에 실패하였습니다.");
    }
  };

  if ((memberId !== employer && memberId !== employee) || !currentUser || !Object.keys(currentUser).length) {
    return (
      <EntireContainer>
        <WarningWords>접근 권한이 없는 페이지입니다.</WarningWords>
      </EntireContainer>
    );
  }

  return (
    <EntireContainer>
      <ChatContainer>
        {list && list.length > 0 ? (
          <ChatMessages>
            {list?.map((message, index) => (
              <ChatMessage key={index} isCurrentUser={memberId === message.member.memberId}>
                <ChatSender>{message.member.nickName} :</ChatSender>
                <ChatContent>{message.content}</ChatContent>
              </ChatMessage>
            ))}
          </ChatMessages>
        ) : (
          <ChatMessages>메시지가 없습니다.</ChatMessages>
        )}
        <ChatInputContainer onSubmit={handleSubmit}>
          <ChatInput
            type="text"
            value={chat.message}
            onChange={handleChange}
            placeholder="메시지를 입력하세요"
            required
          />
          <SendButton type="submit">Send</SendButton>
        </ChatInputContainer>
      </ChatContainer>
    </EntireContainer>
  );
}
