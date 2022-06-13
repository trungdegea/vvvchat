import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { LocalhostStorage } from "../../utils/LocalStorage";
import Message from "../Message";

export const ListMessageContainer = styled.div`
  height: calc(100% - 50px);
  overflow: auto;
`;
export default function ListMessage(props: any) {
  const bottomRef = useRef<any>();
  const myId = LocalhostStorage.get("id");
  const { list, ws, appendChat } = props;

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [list])

  ws?.off("msgToClient");
  ws?.on("msgToClient", (payload: any) => {
    console.log("Scroll di");
    appendChat(payload);
  });

  return (
    <ListMessageContainer>
      {list.map((item: any) => (
        <Message
          isMe={item?.sender?._id == myId}
          id={item?.sender?._id}
          name={item?.sender?.name}
          text={item?.msg}
          isToxic={item?.isToxic}
        />
      ))}
      <div className="bottom-chat" ref={bottomRef}></div>
    </ListMessageContainer>
  );
}
