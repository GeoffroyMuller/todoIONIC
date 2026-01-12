import {
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
import { useState } from "react";

const TodoList: React.FC = () => {
  const { todos, loading, toggleTodo, addNewTodo, editTodo, deleteTodoById } =
    useTodos();
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);

  const [present, dismiss] = useIonModal(TodoModal, {
    todo: activeTodo,
    onDismiss: (data: string, role: string) => dismiss(data, role),
  });

  function openModal(todo?: Todo) {
    if (todo) setActiveTodo(todo);

    present({
      onWillDismiss: (
        event: CustomEvent<
          OverlayEventDetail<Pick<Todo, "title" | "description">>
        >
      ) => {
        if (todo && event.detail.role === "delete") {
          deleteTodoById(todo.id);
        } else if (event.detail.role === "confirm") {
          if (todo) {
            const updatedTodo = { ...todo, ...event.detail.data };
            editTodo(updatedTodo);
          } else {
            addNewTodo(
              event.detail.data?.title ?? "Sans titre",
              event.detail.data?.description
            );
          }
        }
        setActiveTodo(null);
      },
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mes tâches</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding-bottom ion-margin-bottom">
        {loading ? (
          <IonProgressBar type="indeterminate" color="primary"></IonProgressBar>
        ) : (
          todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onEdit={() => openModal(todo)}
            />
          ))
        )}
        <div style={{height: "60px", width: "100%"}}></div>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => openModal()}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default TodoList;
