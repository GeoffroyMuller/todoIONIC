import {
  IonContent,
  IonHeader,
  IonPage,
  IonProgressBar,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./TodoList.css";
import { Todo } from "../types/todo.type";
import { useEffect, useState } from "react";
import TodoCard from "../components/TodoCard";
import { fetchAllTodos, updateTodo } from "../api";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);
        const res = await fetchAllTodos();
        setTodos(res);
      } catch (error) {
        console.error("Loading faild > ", error);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  const toggleTodo = async (id: Todo["id"]) => {
    const todoToUpdate = todos.find((t) => t.id === id);
    if (todoToUpdate) {
      await updateTodo({ ...todoToUpdate, done: !todoToUpdate.done });
      const res = await fetchAllTodos(); 
      setTodos(res);
    }
  };

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
