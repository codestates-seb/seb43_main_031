import styled from "styled-components";

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  backdrop-filter: blur(5px);
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem;
  height: 35rem;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  padding: 2rem;
  gap: 0.6rem;
  font-size: 1rem;
  background-color: #fff;
  > form {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    > input {
      height: 2rem;
      margin-bottom: 0.6rem;
      border-style: none;
      border-radius: 5px;
      padding: 0.5rem;
      background-color: var(--bg-color);
    }
    > button {
      all: unset;
      text-align: center;
      height: 2.5rem;
      margin-top: 1rem;
      border-radius: 10px;
      font-weight: 600;
      color: #fff;
      background-color: var(--primary-color);
      cursor: pointer;
    }
  }
`;

const CancleButton = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 0.4rem;
  > button {
    all: unset;
    font-size: 1.5rem;
    transform: scaleX(1.5);
    cursor: pointer;
    &:hover {
      color: var(--primary-color);
    }
  }
`;

const ImagebuttonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  gap: 1rem;
  > button {
    all: unset;
    text-align: center;
    height: 2rem;
    width: 10rem;
    border-radius: 10px;
    background-color: var(--sub-color);
    cursor: pointer;
  }
`;

export default function Modal({ member, onCancle, onSubmit, onChange, onPasswordCheck, onImageUpload, onImageDelete }) {
  const labels = [
    {
      id: "nickName",
      title: "닉네임",
      children: (
        <input
          type="text"
          id="nickName"
          name="nickName"
          value={member.nickName}
          onChange={onChange}
          minLength={2}
          maxLength={8}
          required
        />
      ),
    },
    {
      id: "phone",
      title: "휴대폰 번호",
      children: (
        <input
          type="tel"
          id="phone"
          name="phone"
          value={member.phone}
          onChange={onChange}
          //   pattern="^(010|011|019)\d{3,4}\d{4}$"
          //   title="휴대폰 번호를 확인해주세요"
          required
        />
      ),
    },
    {
      id: "password",
      title: "비밀번호",
      children: (
        <input
          type="password"
          id="password"
          name="password"
          value={member.password}
          onChange={onChange}
          placeholder="비밀번호를 입력하세요."
          pattern="^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9])(?=\S+$).{8,16}$"
          title="영문,숫자,특문을 조합해서 8자 이상 입력해주세요"
          required
        />
      ),
    },
    {
      id: "passwordCheck",
      title: "비밀번호 확인",
      children: (
        <input
          type="password"
          id="passwordCheck"
          onChange={onPasswordCheck}
          placeholder="비밀번호를 다시 한 번 입력해주세요."
          required
        />
      ),
    },
  ];

  return (
    <ModalBackground>
      <ModalContainer>
        <CancleButton>
          <button type="button" onClick={onCancle}>
            X
          </button>
        </CancleButton>
        <form onSubmit={onSubmit}>
          <ImagebuttonContainer>
            <button type="button" onClick={onImageUpload}>
              이미지 등록하기
            </button>
            <button type="button" onClick={onImageDelete}>
              이미지 삭제하기
            </button>
          </ImagebuttonContainer>
          {labels.map(label => (
            <>
              <label htmlFor={label.id}>{label.title}</label>
              {label.children}
            </>
          ))}
          <button type="submit">수정하기</button>
        </form>
      </ModalContainer>
    </ModalBackground>
  );
}
