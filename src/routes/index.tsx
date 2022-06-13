import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import ChatContainer from "../containers/chat";
import LoginContainer from "../containers/login";
import RegisterContainer from "../containers/register";

export const AppRouter = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Header />
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/register" element={<RegisterContainer />} />
        <Route path="/chat" element={<ChatContainer />} />
      </Routes>
    </Suspense>
  );
};
