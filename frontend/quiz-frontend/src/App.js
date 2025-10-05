import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizList from "./pages/QuizList";
import QuizDetail from "./pages/QuizDetail";
import SubmitQuiz from "./pages/SubmitQuiz";
import Result from "./pages/Result"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/quiz/:id" element={<QuizDetail />} />
        <Route path="/quiz/:id/submit" element={<SubmitQuiz />} />
        <Route path="/quiz/:id/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
