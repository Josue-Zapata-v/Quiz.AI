import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import "./SubmitQuiz.css";

export default function SubmitQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    API.get(`quizzes/${id}/`)
      .then((res) => setQuiz(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleSelect = (questionId, choiceId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: choiceId }));
  };

  const handleSubmit = async () => {
    const payload = {
      answers: Object.entries(answers).map(([qId, cId]) => ({
        question_id: parseInt(qId),
        choice_id: parseInt(cId),
      })),
    };

    try {
      const res = await API.post(`quizzes/${id}/submit/`, payload);
      navigate(`/quiz/${id}/result`, { state: res.data });
    } catch (error) {
      console.error("Error al enviar respuestas:", error);
      alert("Error al enviar el quiz. Revisa la consola.");
    }
  };

  if (!quiz) return <p className="loading-text">Cargando quiz...</p>;

  return (
    <div className="submitquiz-container">
      <div className="submitquiz-card">
        <h1 className="submitquiz-title">{quiz.title}</h1>
        <p className="submitquiz-desc">
          Responde las siguientes preguntas seleccionando una opción por cada una.
        </p>

        {quiz.questions.map((q, index) => (
          <div key={q.id} className="question-block">
            <h4 className="question-text">
              {index + 1}. {q.text}
            </h4>
            <div className="choices">
              {q.choices.map((c) => (
                <label key={c.id} className="choice-option">
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    checked={answers[q.id] === c.id}
                    onChange={() => handleSelect(q.id, c.id)}
                  />
                  <span>{c.text}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button onClick={handleSubmit} className="submit-btn">
          🚀 Enviar respuestas
        </button>
      </div>
    </div>
  );
}
