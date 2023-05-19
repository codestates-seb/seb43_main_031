import { useState } from "react";
import styled from "styled-components";

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25rem;
  width: 40rem;
  background-color: #fff;
  @media (max-width: 500px) {
    height: 16rem;
    width: 24rem;
  }
`;

export default function Tab() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { id: 0, name: "의뢰한 심부름", content: <div>(1) 준비 중입니다.</div> },
    { id: 1, name: "수행한 심부름", content: <div>(2) 준비 중입니다.</div> },
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
