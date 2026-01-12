import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import TodoForm from "./TodoForm";
import { Todo } from "../types/todo.type";

interface TodoModalProps {
  todo?: Todo;
  onDismiss: (
    data?: Pick<Todo, "title" | "description"> | null,
    role?: "confirm" | "cancel"
  ) => void;
}

const TodoModal: React.FC<TodoModalProps> = ({ todo, onDismiss }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="medium" onClick={() => onDismiss(null, "cancel")}>
              Annuler
            </IonButton>
          </IonButtons>
          <IonTitle>
            {todo ? "Modifier la tâche" : "Ajouter une tâche"}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <TodoForm
          todo={todo}
          onSubmit={(title, description) =>
            onDismiss({ title, description }, "confirm")
          }
        />
      </IonContent>
    </IonPage>
  );
};

export default TodoModal;
