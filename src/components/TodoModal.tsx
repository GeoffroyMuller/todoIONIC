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
    data?: (Pick<Todo, "title" | "description"> & { id?: number }) | null,
    role?: "confirm" | "cancel" | "delete"
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
          {todo ? (
            <IonButtons slot="end">
              <IonButton
                color="danger"
                onClick={() => onDismiss(todo, "delete")}
              >
                Supprimer
              </IonButton>
            </IonButtons>
          ) : (
            ""
          )}
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
