import React from 'react';
import { IonCard, IonCardContent, IonButton, IonTitle } from '@ionic/react';

interface TaskDetailProps {
  task: {
    idtasks: number;
    task: string;
    descricao: string;
    dataentrega: string;
    pts: number;
  };
  onClose: () => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task, onClose }) => {
  return (
    <IonCard style={{ color: '#393939' }}> 
      <IonCardContent>
        <IonTitle>{task.task}</IonTitle>
        <p>{task.descricao}</p>
        <p>Data de Entrega: {task.dataentrega}</p>
        <p>Pontos: {task.pts}</p>
        <IonButton onClick={onClose}>Fechar</IonButton>
        <IonButton expand="block" onClick={() => { }}>Finalizei</IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default TaskDetail;
