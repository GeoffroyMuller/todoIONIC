import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { Todo } from '../types/todo.type';
import './TodoCard.css';

interface TodoCardProps {
  todo: Todo;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
  return (
     <IonCard>
      <IonCardHeader>
        <IonCardTitle>{todo.title}</IonCardTitle>
        <IonCardSubtitle>#{todo.id}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>Testtt</IonCardContent>
    </IonCard>
  );
};

export default TodoCard;