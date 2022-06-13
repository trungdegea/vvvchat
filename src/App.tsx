import React, { createContext, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
export interface IUser {
  id: string;
  name: string;
  username: string;
}
const appCtxDefaultValue = {
  user: { id: "", name: "", username: "" },
  setUser: (state: { id: ""; name: ""; username: "" }) => {}, // noop default callback
};
export const UserContext = createContext(appCtxDefaultValue);

function App() {
  const [user, setUser] = useState<IUser>(appCtxDefaultValue.user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <AppRouter />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
