import axios from "axios";
import { LocalhostStorage } from "../utils/LocalStorage";
import Api from "./index";
export interface IMessage {
  msg: String;
}
export const sendMessage = async (data: IMessage) => {
  return await axios.post("http://localhost:8080/api/messages", data, {
    headers: {
      auth: LocalhostStorage.get("jwt")
    }
  });
};

export const getAllMessages = async () => {
  return await Api.get("http://localhost:8080/api/messages");
};
