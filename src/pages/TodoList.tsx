import {
  IonContent,
  IonHeader,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./TodoList.css";
import TodoCard from "../components/TodoCard";
import { useTodos } from "../composables/useTodos";

const TodoList: React.FC = () => {
  const { todos, loading, toggleTodo } = useTodos();

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
      </IonContent>
    </IonPage>
  );
};

export default TodoList;
