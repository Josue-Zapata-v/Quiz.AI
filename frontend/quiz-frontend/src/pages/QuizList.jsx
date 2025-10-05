import { useEffect, useState } from "react";
import API from "../api/api";
import "./QuizList.css";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    API.get("quizzes/")
      .then(res => setQuizzes(res.data.results || res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="quizlist-container">
      <header className="quizlist-header">
        <h1>🧠 Quiz.AI</h1>
        <p className="subtitle">Explora quizzes generados con inteligencia artificial 🤖</p>
      </header>

      <ul className="quizlist-grid">
        {quizzes.map(q => (
          <li key={q.id} className="quizlist-card">
            <div className="quizlist-card-content">
              <h2 className="quiz-title">{q.title}</h2>
              <p className="quiz-description">
                {q.description || "Sin descripción disponible."}
              </p>
            </div>
            <a href={`/quiz/${q.id}`} className="quiz-btn">
              Empezar →
            </a>
          </li>
        ))}
      </ul>

      {quizzes.length === 0 && (
        <p className="quizlist-empty">No hay quizzes disponibles aún 🕐</p>
      )}
    </div>
  );
}
