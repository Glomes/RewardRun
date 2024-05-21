import React from 'react';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './AdminScreen.css';

const AdminScreen: React.FC = () => {
  const history = useHistory();

  const goToHome = () => {
    history.push('/home');
  };

  const goToCriarTarefa = () => {
    history.push('/criar-tarefa');
  };

  const goToVerTarefas = () => {
    history.push('/ver-tarefas');
  };

  const goToCriarRecompensa = () => {
    history.push('/criar-recompensa');
  };

  const goToVerRecompensas = () => {
    history.push('/ver-recompensa');
  };

  const zerarPontos = async () => {
    try {
      const response = await fetch('http://192.168.43.10:8080/api/v1/Users/6', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pts: 0 }),
      });

      if (response.ok) {
        alert('Pontos zerados com sucesso!');
      } else {
        alert('Falha ao zerar pontos.');
      }
    } catch (error) {
      console.error('Erro ao zerar pontos:', error);
      alert('Erro ao zerar pontos.');
    }
  };
       //   <IonButton className="admin-button" expand="block" onClick={zerarPontos}>Zerar Pontos</IonButton> 

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle className='admin-title'>Admin</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
        <div className="admin-container">
          <div className="admin-button-grid">
           
            <IonButton className="admin-button" expand="block" onClick={goToCriarTarefa}>Criar Tarefa</IonButton>
            <IonButton className="admin-button" expand="block" onClick={goToVerTarefas}>Ver Tarefas</IonButton>
            <IonButton className="admin-button" expand="block" onClick={goToCriarRecompensa}>Criar Recompensa</IonButton>
            <IonButton className="admin-button" expand="block" onClick={goToVerRecompensas}>Ver Recompensas</IonButton>
            <IonButton className="back-button" expand="block" onClick={goToHome}>Voltar para Início</IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AdminScreen;
