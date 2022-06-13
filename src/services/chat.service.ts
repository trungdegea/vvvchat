import Api from "./index";
export interface IMessage {
  msg: String;
}
export const sendMessage = async (data: IMessage) => {
  return await Api.post("/message/sendMsg", data);
};

export const getAllMessages = async () => {
  return await Api.get("/message/getAllMsg");
};
