import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
} from "@ionic/react";
import { Todo } from "../types/todo.type";
import "./TodoCard.css";

interface TodoCardProps {
  todo: Todo;
  onToggle: (id: Todo["id"]) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onToggle }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between"  }}>
          <IonCardTitle>
            {todo.title}
          </IonCardTitle>
          <IonCheckbox
            checked={todo.done}
            onIonChange={() => onToggle(todo.id)}
          ></IonCheckbox>
        </div>
      </IonCardHeader>

      {todo.description ? (
        <IonCardContent>{todo.description}</IonCardContent>
      ) : undefined}
    </IonCard>
  );
};

export default TodoCard;
