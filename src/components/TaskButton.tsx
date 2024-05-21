import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent } from '@ionic/react';

interface TaskButtonProps {
  task: {
    idtasks: number;
    task: string;
    descricao: string;
    dataentrega: string;
    pts: number;
  };
  onUpdateUserPoints: (newPoints: number) => void;
  onDeleteTask: (taskId: number) => void;
}

const TaskButton: React.FC<TaskButtonProps> = ({ task, onUpdateUserPoints, onDeleteTask }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const handleClick = () => {
    setShowDetail(!showDetail);
  };

  const handleFinishTask = async () => {
    try {
      const userResponse = await fetch('http://192.168.43.10:8080/api/v1/Users/6');
      if (!userResponse.ok) {
        throw new Error('Erro ao buscar os dados do usuário');
      }
      const userData = await userResponse.json();
  
      const updatedPoints = userData.pts + task.pts;
  
      const updateUserResponse = await fetch(`http://192.168.43.10:8080/api/v1/Users/6/UpdatePoints`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user: "string", 
    pts: updatedPoints,
  }),
});
  
      if (!updateUserResponse.ok) {
        throw new Error('Erro ao atualizar os pontos do usuário');
      }
  
      onUpdateUserPoints(updatedPoints); 
  
      const deleteTaskResponse = await fetch(`http://192.168.43.10:8080/api/v1/Tasks/${task.idtasks}`, {
        method: 'DELETE',
      });
  
      if (!deleteTaskResponse.ok) {
        throw new Error('Erro ao excluir a tarefa');
      }
  
      onDeleteTask(task.idtasks); 
    } catch (error) {
      console.error('Erro ao finalizar a tarefa:', error);
    }
  };
  
  

  const formattedDate = new Date(task.dataentrega).toLocaleDateString();

  return (
    <>
      <IonButton expand="full" onClick={handleClick}>
        <div>
          <p>{task.task}</p>
          <p style={{ fontSize: '14px' }}>{formattedDate}</p>
        </div>
      </IonButton>
      {showDetail && (
        <IonCard className='colorcard'>
          <IonCardContent>
            <h2>{task.task}</h2>
            <p>{task.descricao}</p>
            <p>Data de Entrega: {formattedDate}</p>
            <p>Pontos: {task.pts}</p>
            <IonButton expand="block" onClick={handleFinishTask}>Finalizei</IonButton>
          </IonCardContent>
        </IonCard>
      )}
    </>
  );
};

export default TaskButton;
