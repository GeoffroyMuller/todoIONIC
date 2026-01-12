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
  onDismiss: (
    data?: Pick<Todo, "title" | "description"> | null,
    role?: "confirm" | "cancel"
  ) => void;
}

const TodoModal: React.FC<TodoModalProps> = ({ onDismiss }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="medium" onClick={() => onDismiss(null, "cancel")}>
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>Welcome</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <TodoForm
            onSubmit={(title, description) => onDismiss({ title, description }, "confirm")}
          />
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default TodoModal;
