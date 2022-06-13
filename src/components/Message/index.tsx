import { Avatar, Tooltip } from "antd";
import React from "react";
import styled from "styled-components";

export const MessageStyled = styled.div<{ isMe: boolean }>`
  background: ${(p) =>
    p.isMe
      ? "linear-gradient(90deg, rgba(9,52,131,0.9304096638655462) 0%, rgba(121,9,118,1) 48%, rgba(184,0,255,0.43461134453781514) 100%)"
      : "#525252"};
  margin: 5px;
  padding: 5px;
  width: fit-content;
  border-radius: 14px;

  ${(p) => p.isMe && "margin-left: auto;"}
`;

export const WrapperMessage = styled.div<{ isMe: boolean }>`
  display: flex;
  flex-direction: row;
  width: fit-content;
  border-radius: 14px;
  ${(p) => p.isMe && "margin-left: auto;"}
`;

const TextStyled = styled.span<{ isToxic: boolean }>`
  color: #fff;
  margin: 0 5px;
  ${(p) => p.isToxic && "text-decoration: line-through"};
  ${(p) => p.isToxic && "color: red"}
`;
export default function Message(props: any) {
  const { isMe, id, text, isToxic } = props;
  return (
    <Tooltip title="a">
      <WrapperMessage isMe={isMe}>
        {!isMe && (
          <Avatar
            style={{ marginRight: 5 }}
            src={`https://joeschmoe.io/api/v1/${id}`}
          />
        )}
        <MessageStyled isMe={isMe}>
          <TextStyled isToxic={isToxic}> {text}</TextStyled>
        </MessageStyled>
        {isMe && (
          <Avatar
            style={{ marginRight: 5 }}
            src={`https://joeschmoe.io/api/v1/${id}`}
          />
        )}
      </WrapperMessage>
    </Tooltip>
  );
}
