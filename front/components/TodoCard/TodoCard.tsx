"use client";

import { CardData } from "@/components/TodoCard/CardData";
import { useRouter } from "next/navigation";
import "./TodoCard.css";

interface TodoCardProps extends CardData {
  removeCardFunc: (id: number) => void; // Типизация для removeCardFunc
}

export default function TodoCard({
  id,
  title,
  description,
  completed,
  removeCardFunc,
}: TodoCardProps) {
  const router = useRouter();

  return (
    <div className="todo-card">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="card-desc">
          <strong>Описание: </strong>
          <span className="card-desc-text">{description}</span>
        </div>
        <div className="card-status">
          <strong>Показания кринжометра: </strong>
          {completed ? (
            <span className="status-done">Ну такое...</span>
          ) : (
            <span className="status-undone">Лютый кринж</span>
          )}
        </div>
      </div>
      <div className="card-icons">
        {/* Кнопка редактирования */}
        <button
          className="btn-icon edit-btn"
          onClick={() => router.push("/edit/" + id)}
        >
          Редактировать
        </button>

        {/* Кнопка удаления */}
        <button
          className="btn-icon remove-btn"
          onClick={() => removeCardFunc(Number(id))} // Преобразуем id в примитив number
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
