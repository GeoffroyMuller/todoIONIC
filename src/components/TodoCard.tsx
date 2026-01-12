import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
  IonSpinner,
} from "@ionic/react";
import { Todo } from "../types/todo.type";
import "./TodoCard.css";
import { useState } from "react";

interface TodoCardProps {
  todo: Todo;
  onToggle: (id: Todo["id"]) => Promise<void>;
  onEdit: (id: Todo["id"]) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onToggle, onEdit }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const executeToggle = async (id: Todo["id"]) => {
    setLoading(true);
    await onToggle(id);
    setLoading(false);
  };

  return (
    <IonCard onClick={() => onEdit(todo.id)}>
      <IonCardHeader>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IonCardTitle>{todo.title}</IonCardTitle>
          <div
            style={{
              height: "32px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {loading ? (
              <IonSpinner name="dots"></IonSpinner>
            ) : (
              <IonCheckbox
                checked={todo.done}
                onIonChange={() => executeToggle(todo.id)}
              ></IonCheckbox>
            )}
          </div>
        </div>
      </IonCardHeader>

      {todo.description ? (
        <IonCardContent>{todo.description}</IonCardContent>
      ) : undefined}
    </IonCard>
  );
};

export default TodoCard;
