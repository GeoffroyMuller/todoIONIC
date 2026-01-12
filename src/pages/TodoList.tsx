import {
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToolbar,
  useIonModal,
} from "@ionic/react";
import "./TodoList.css";
import TodoCard from "../components/TodoCard";
import { useTodos } from "../composables/useTodos";
import TodoModal from "../components/TodoModal";
import { OverlayEventDetail } from "@ionic/core/components";
import { Todo } from "../types/todo.type";
import { add } from "ionicons/icons";

const TodoList: React.FC = () => {
  const { todos, loading, toggleTodo, addNewTodo } = useTodos();
  const [present, dismiss] = useIonModal(TodoModal, {
    onDismiss: (data: string, role: string) => dismiss(data, role),
  });

  function openModal() {
    present({
      onWillDismiss: (
        event: CustomEvent<
          OverlayEventDetail<Pick<Todo, "title" | "description">>
        >
      ) => {
        if (event.detail.role === "confirm") {
          addNewTodo(
            event.detail.data?.title ?? "Sans titre",
            event.detail.data?.description
          );
        }
      },
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tâches</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding-bottom ion-margin-bottom">
        {loading ? (
          <IonProgressBar type="indeterminate" color="primary"></IonProgressBar>
        ) : (
          todos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} onToggle={toggleTodo} />
          ))
        )}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={openModal}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default TodoList;
