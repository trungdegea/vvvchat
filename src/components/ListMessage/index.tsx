import React from "react";
import styled from "styled-components";
import { LocalhostStorage } from "../../utils/LocalStorage";
import Message from "../Message";

export const ListMessageContainer = styled.div`
  height: calc(100% - 50px);
  overflow: auto;
`;
export default function ListMessage(props: any) {
  const myId = LocalhostStorage.get("id");
  const { list } = props;
  return (
    <ListMessageContainer>
      {list.map((item: any) => (
        <Message
          isMe={item?.sender == myId}
          id={item?.sender}
          text={item?.msg}
          isToxic={item?.isToxic}
        />
      ))}
    </ListMessageContainer>
  );
}
