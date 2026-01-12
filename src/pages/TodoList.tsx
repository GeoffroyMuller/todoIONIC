import {
  IonButton,
  IonContent,
  IonHeader,
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
          console.log("hdshjfjsdf", event.detail.role)
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
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        {loading ? (
          <IonProgressBar type="indeterminate" color="primary"></IonProgressBar>
        ) : (
          todos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} onToggle={toggleTodo} />
          ))
        )}
        <IonButton expand="block" onClick={() => openModal()}>
          Open
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default TodoList;
