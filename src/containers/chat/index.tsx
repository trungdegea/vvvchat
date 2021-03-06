import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import ListMessage from "../../components/ListMessage";
import ToolChat from "../../components/ToolChat";
import { io, Socket } from "socket.io-client";
import { message } from "antd";
import { LocalhostStorage } from "../../utils/LocalStorage";
import {
  getAllMessages,
  IMessage,
  sendMessage,
} from "../../services/chat.service";
import { UserContext } from "../../App";
import { toast } from "react-toastify";

const host = "http://localhost:3333";

export const LayoutChat = styled.div`
  padding: 5vh 20vw;
  height: calc(100vh - 80px);
`;

export const TableChat = styled.div`
  box-shadow: 0px 0px 4px 2px #b4c6eb;
  padding: 5px;
  border-radius: 14px;
  height: 100%;
`;

export default function ChatContainer() {
  const [ws, setWs] = useState<Socket>();
  const [refresh, setRefresh] = useState(false);
  const [msg, setMsg] = useState("");
  const [list, setList] = useState<any[]>([]);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!!ws) {
      ws.close();
    }
    setWs(
      io(host, {
        transports: ["websocket"],
      })
    );
  }, []);
  useEffect(() => {
    void (async () => {
      try {
        const res = await getAllMessages();
        console.log(res);
        setList(res?.data);
      } catch (error) {}
    })();
  }, []);

  const appendChat = (payload: any) => {
    const message = { sender: payload?.sender, msg: payload?.text, isToxic: payload?.isToxic };
    console.log(message)
    setList([...list, message]);
  }

  const onSendMessage = async () => {
    const id = String(LocalhostStorage.get("id"));
    const data: IMessage = { msg };
    if (!user?.id) {
      toast.warning("Please login for sending message");
      return;
    }
    try {
      const res = await sendMessage(data);
      console.log(res);
      ws?.emit("msgToServer", {
        sender: res.data.data?.sender,
        text: msg,
        isToxic: res.data.data?.isToxic
      });
      setMsg("");
      setRefresh(!refresh);
    } catch (error) {
      toast.error("Error");
    }
  };

  return (
    <LayoutChat>
      <TableChat>
        <ListMessage list={list} ws={ws} appendChat={appendChat} />
        <ToolChat msg={msg} setMsg={setMsg} onSendMessage={onSendMessage} />
      </TableChat>
    </LayoutChat>
  );
}
