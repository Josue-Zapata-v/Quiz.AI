# 🧠 Quiz.AI – Guía completa de API de cuestionarios

## 🎯 Objetivo
Construir un sistema inteligente de gestión de cuestionarios que permita crear quizzes, agregar preguntas y opciones, validar respuestas y obtener puntuación automática.

---

## 📦 Parte 1: CRUD de Cuestionarios

### Funcionalidades
- Crear, listar, actualizar y eliminar cuestionarios.
- API RESTful simple para la gestión de quizzes.
- Respuesta en formato JSON con información de creación y actualización.

### Archivos clave
- `quizzes/models.py` → Modelo `Quiz`.
- `quizzes/serializers.py` → `QuizSerializer`.
- `quizzes/views.py` → `QuizViewSet` y `api_root`.
- `quizzes/urls.py` → Rutas de la API.

### Ejemplos de uso

Crear cuestionario:
```bash
curl -X POST http://127.0.0.1:8000/api/v1/quizzes/ \
-H "Content-Type: application/json" \
-d '{"title": "Python Basics 🐍","description": "Test your Python knowledge"}'
```

Listar cuestionarios:
```bash
curl http://127.0.0.1:8000/api/v1/quizzes/
```

Actualizar y eliminar cuestionarios usando PUT y DELETE.

---

## 🔗 Parte 2: Sistema de Preguntas y Opciones

### Funcionalidades
- Añadir preguntas a los quizzes.
- Agregar opciones a cada pregunta con indicador de respuesta correcta.
- Relaciones `ForeignKey` entre `Quiz → Question → Choice`.

### Archivos clave
- `quizzes/models.py` → Modelos `Question` y `Choice`.
- `quizzes/serializers.py` → `QuestionSerializer` y `ChoiceSerializer`.
- `quizzes/views.py` → `QuestionViewSet` y `ChoiceViewSet`.
- `quizzes/urls.py` → Registro de nuevas rutas `/questions/` y `/choices/`.

### Ejemplos de uso

Crear pregunta:
```bash
curl -X POST http://127.0.0.1:8000/api/v1/questions/ \
-H "Content-Type: application/json" \
-d '{"quiz": 1, "text": "What is Python?"}'
```

Crear opción correcta:
```bash
curl -X POST http://127.0.0.1:8000/api/v1/choices/ \
-H "Content-Type: application/json" \
-d '{"question": 1, "text": "A programming language", "is_correct": true}'
```

Listar todas las preguntas y opciones:
```bash
curl http://127.0.0.1:8000/api/v1/questions/
curl http://127.0.0.1:8000/api/v1/choices/
```

---

## ✅ Parte 3: Validación y Puntuación de Respuestas

### Funcionalidades
- Serializadores anidados (`QuizDetailSerializer`, `QuestionDetailSerializer`, `ChoiceDetailSerializer`) para mostrar quiz completo sin revelar respuestas correctas.
- `SubmitAnswerSerializer` para validar respuestas enviadas.
- Método `submit` en `QuizViewSet` para calcular:
  - Total de respuestas correctas/incorrectas.
  - Porcentaje de aciertos.
  - Calificación (A–F) con mensaje motivacional y emoji.
- Endpoints actualizados y flujo completo del quiz.

### Sistema de calificación

| Porcentaje | Nota | Emoji | Descripción |
|------------|------|-------|-------------|
| 90–100%    | A    | 🏆    | Outstanding |
| 80–89%     | B    | 🎉    | Great       |
| 70–79%     | C    | 👍    | Good        |
| 60–69%     | D    | 📚    | Pass        |
| 0–59%      | F    | 💪    | Try Again   |

### Ejemplos de uso

Obtener cuestionario completo:
```bash
curl http://127.0.0.1:8000/api/v1/quizzes/1/
```

Enviar respuestas correctas:
```bash
curl -X POST http://127.0.0.1:8000/api/v1/quizzes/1/submit/ \
-H "Content-Type: application/json" \
-d '{"answers":[{"question_id":1,"choice_id":1},{"question_id":2,"choice_id":3}]}'
```

Enviar respuestas mixtas:
```bash
curl -X POST http://127.0.0.1:8000/api/v1/quizzes/1/submit/ \
-H "Content-Type: application/json" \
-d '{"answers":[{"question_id":1,"choice_id":2},{"question_id":2,"choice_id":3}]}'
```

---

## 🧩 Conclusiones

**Aprendimos:**
A implementar un sistema completo de creación, gestión y validación de cuestionarios con Django REST Framework.

**Comprendimos:**
La importancia de estructurar correctamente modelos, serializadores y endpoints para garantizar seguridad y consistencia en los datos.

**Observamos:**
Que la API ahora ofrece un flujo completo, desde la creación de quizzes hasta la evaluación automática, proporcionando retroalimentación inmediata y motivadora.

---

## 📝 Autor

Josue Isai Zapata Villegas
