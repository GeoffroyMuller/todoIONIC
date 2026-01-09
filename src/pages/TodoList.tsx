import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./TodoList.css";
import { Todo } from "../types/todo.type";
import { useState } from "react";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: "Apprendre Ionic", done: false, create_at: new Date() },
    { id: 2, title: "Créer une todolist", done: true, create_at: new Date() },
  ]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>TodoList</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        {
            todos.map((todo)=>)
        }
      </IonContent>
    </IonPage>
  );
};

export default TodoList;
