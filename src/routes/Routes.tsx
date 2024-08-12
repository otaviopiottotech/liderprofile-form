import { Navigate, Route, Routes } from "react-router-dom";
import QuizScreen from "../pages/quiz";
import Ques from "../pages/questionario";

const AppRoutes = () => {
  return <UserRoute />;
};

const UserRoute = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate replace to="/" />} />
      <Route path="/" element={<QuizScreen />} />
      <Route path="/questinoario" element={<Ques />} />
    </Routes>
  );
};

export default AppRoutes;
