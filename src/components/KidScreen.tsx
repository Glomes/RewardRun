import React, { useState, useEffect } from 'react';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonToast, IonList } from '@ionic/react';
import TaskButton from './TaskButton';
import '../pages/Home.css'
const KidScreen: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [totalPoints, setTotalPoints] = useState<number>(0); 
  const [errorToast, setErrorToast] = useState({ show: false, message: '' });

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch('http://192.168.43.10:8080/api/v1/Tasks');
        if (!response.ok) {
          throw new Error('Erro ao buscar tarefas');
        }
        const tasksData = await response.json();
        setTasks(tasksData);
      } catch (error: any) {
        setErrorToast({ show: true, message: 'Erro ao buscar tarefas: ' + error.message });
      }
    }

    async function fetchTotalPoints() { 
      try {
        const response = await fetch('http://192.168.43.10:8080/api/v1/Users/6'); 
        if (!response.ok) {
          throw new Error('Erro ao buscar os pontos do usuário');
        }
        const userData = await response.json();
        setTotalPoints(userData.pts);
      } catch (error: any) {
        setErrorToast({ show: true, message: 'Erro ao buscar os pontos do usuário: ' + error.message });
      }
    }

    fetchTasks();
    fetchTotalPoints(); 
  }, []);

  const handleUpdateUserPoints = (newPoints: number) => {
    setTotalPoints(newPoints); 
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.idtasks !== taskId));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle className='admin-title'>Tarefas</IonTitle>
         
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
        <IonList className="custom-list">
        <IonTitle >Total de Pontos: {totalPoints}</IonTitle>
        </IonList>
        {tasks.map((task: any) => (
          <TaskButton key={task.idtasks} task={task} onUpdateUserPoints={handleUpdateUserPoints} onDeleteTask={handleDeleteTask} />
        ))}
        <IonToast
          isOpen={errorToast.show}
          onDidDismiss={() => setErrorToast({ show: false, message: '' })}
          message={errorToast.message}
          duration={3000}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default KidScreen;
