import { useLocation, useNavigate } from "react-router-dom";
import "./Result.css";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="result-container">
        <div className="result-card">
          <p className="no-result">⚠️ No hay resultados disponibles.</p>
          <button onClick={() => navigate("/")} className="btn-back">
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="result-container">
      <div className="result-card">
        <h1 className="result-title">
          {state.quiz_title} {state.emoji}
        </h1>

        <p className="result-message">{state.message}</p>

        <div className="score-summary">
          <p>
            🧩 Puntaje: <strong>{state.score}</strong> ({state.percentage}%)
          </p>
          <p>
            📊 Calificación:{" "}
            <strong className={`grade-${state.grade.toLowerCase()}`}>
              {state.grade}
            </strong>
          </p>
        </div>

        <h3 className="question-header">📖 Resultados por pregunta:</h3>
        <ul className="result-list">
          {state.results.map((r, index) => (
            <li
              key={index}
              className={`result-item ${r.is_correct ? "correct" : "incorrect"}`}
            >
              <span className="emoji">{r.emoji}</span>
              <div>
                <strong>{r.question_text}</strong>
                <div className="choice-text">
                  Tu respuesta: {r.choice_text}
                  {r.error && <span className="error-text"> ({r.error})</span>}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <button onClick={() => navigate("/")} className="btn-back">
          🔙 Volver al inicio
        </button>
      </div>
    </div>
  );
}
