import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/api";
import "./QuizDetail.css";

export default function QuizDetail() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    API.get(`quizzes/${id}/`)
      .then((res) => setQuiz(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!quiz) return <p className="loading-text">Cargando quiz...</p>;

  return (
    <div className="quizdetail-container">
      <div className="quizdetail-card">
        <h1 className="quizdetail-title">{quiz.title}</h1>
        <p className="quizdetail-description">
          {quiz.description || "Sin descripción disponible."}
        </p>

        <h3 className="quizdetail-subtitle">Preguntas incluidas:</h3>
        <ul className="question-list">
          {quiz.questions.map((q, index) => (
            <li key={q.id} className="question-item">
              <strong>{index + 1}. </strong>
              {q.text}
              <ul className="choice-list">
                {q.choices.map((c) => (
                  <li key={c.id} className="choice-item">
                    {c.text}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <Link to={`/quiz/${quiz.id}/submit`} className="start-quiz-btn">
          🚀 Empezar Quiz
        </Link>
      </div>
    </div>
  );
}
