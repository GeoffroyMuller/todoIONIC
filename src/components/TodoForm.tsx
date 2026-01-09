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

interface TodoFormProps {
  onSubmit: (title: string, description?: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    onSubmit(title, description);
    setTitle("");
    setDescription("");
  };
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Créer votre tâche</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonInput
          label="Titre"
          value={title}
          labelPlacement="start"
          clearOnEdit={true}
          placeholder="Ajouter un titre"
          onIonInput={(e) => setTitle(e.detail.value ?? "")}
        ></IonInput>
        <IonTextarea
          label="Description"
          value={description}
          labelPlacement="floating"
          placeholder="Ajouter une description (Optionnel)"
          onIonInput={(e) => setDescription(e.detail.value ?? "")}
          clearOnEdit={true}
        ></IonTextarea>
        <IonButton
          className="ion-margin-top"
          disabled={title == null || title == ""}
          expand="block"
          shape="round"
          onClick={handleSubmit}
        >
          Enregistrer la tâche
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default TodoForm;
