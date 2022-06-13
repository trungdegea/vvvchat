import { Button, Input } from "antd";
import React, { useState } from "react";
import styled from "styled-components";

export const ToolChatContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ButtonSend = styled(Button)`
  height: 100%;
  border-radius: 14px;
  background: #3498db;
  color: #fff;
  &:hover,
  &:focus {
    color: #3498db;
    background: transparent;
  }
`;

export const InputMessage = styled(Input)`
  height: 100%;
  border-radius: 14px;
  margin-right: 5px;
`;
export default function ToolChat(props: any) {
  const { onSendMessage, msg, setMsg } = props;
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    onSendMessage();
  };
  return (
    <ToolChatContainer style={{ height: 50 }}>
      <InputMessage
        onChange={(e) => setMsg(e.target.value)}
        value={msg}
        disabled={loading}
        placeholder="enter your messages"
        onPressEnter={handleSendMessage}
      />
      <ButtonSend onClick={handleSendMessage}>Send</ButtonSend>
    </ToolChatContainer>
  );
}
