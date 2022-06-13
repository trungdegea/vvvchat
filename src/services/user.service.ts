import Api from "./index";

interface IRegister {
  username: string;
  password: string;
  name: string;
}

interface IInfoUser {
  id: string;
}

interface ILogin {
  username: string;
  password: string;
}

export const loginAsync = async (data: ILogin) => {
  return await Api.post("/user/login", data);
};

export const registerAsync = async (data: IRegister) => {
  return await Api.post("/user/register", data);
};

export const getInfoUser = async (id: string) => {
  return await Api.post(
    "/user/info",
    { id }
    // {
    //   withCredentials: true,
    // }
  );
};

export const logoutUser = async () => {
  return await Api.post("/user/info");
};
