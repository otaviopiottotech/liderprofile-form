import { Navigate, Route, Routes } from "react-router-dom";
import QuizScreen from "../pages/quiz";
import Ques from "../pages/questionario";
import ReportScreen from "../pages/reports";
import HomeScreen from "../pages/home";

const AppRoutes = () => {
  return <UserRoute />;
};

const UserRoute = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate replace to="/" />} />
      <Route path="/" element={<HomeScreen />} />
      <Route path="/criar-questionario" element={<QuizScreen />} />
      <Route path="/questinoario" element={<Ques />} />
      <Route path="/relatorio" element={<ReportScreen />} />
    </Routes>
  );
};

export default AppRoutes;
