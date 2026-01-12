import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonTextarea,
} from "@ionic/react";
import { useState } from "react";
import { Todo } from "../types/todo.type";

interface TodoFormProps {
  todo?: Todo;
  onSubmit: (title: string, description?: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ todo, onSubmit }) => {
  const [title, setTitle] = useState(todo ? todo.title : "");
  const [description, setDescription] = useState(todo ? todo.description : "");

  const handleSubmit = () => {
    onSubmit(title, description);
    setTitle("");
    setDescription("");
  };
  return (
    <IonCard>
      <IonCardContent>
        <IonInput
          label="Titre"
          value={title}
          labelPlacement="start"
          placeholder="Ajouter un titre"
          onIonInput={(e) => setTitle(e.detail.value ?? "")}
        ></IonInput>
        <IonTextarea
          label="Description"
          value={description}
          labelPlacement="floating"
          placeholder="Ajouter une description (Optionnel)"
          onIonInput={(e) => setDescription(e.detail.value ?? "")}
        ></IonTextarea>
        <IonButton
          className="ion-margin-top"
          disabled={title == null || title == ""}
          expand="block"
          shape="round"
          onClick={handleSubmit}
        >
          {todo ? "Enregistrer les modifications" : "Ajouter la tâche"}
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default TodoForm;
