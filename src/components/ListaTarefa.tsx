import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButtons, IonBackButton, IonToast, IonButton } from '@ionic/react';

const ListaTarefa: React.FC = () => {
  const [tarefas, setTarefas] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTarefas();
  }, []);

  const fetchTarefas = async () => {
    try {
      const response = await fetch('http://192.168.43.10:8080/api/v1/Tasks');
      if (!response.ok) {
        throw new Error('Erro ao buscar tarefas');
      }
      const data = await response.json();
      setTarefas(data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      setError('Erro ao buscar tarefas');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://192.168.43.10:8080/api/v1/Tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir tarefa: ' + response.statusText);
      }
      
      fetchTarefas();
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      setError('Erro ao excluir tarefa');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/admin/menu" />
          </IonButtons>
          <IonTitle>Lista de Tarefas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {tarefas.map((tarefa: any, index: number) => (
            <IonItem key={index}>
              <IonLabel>
                <h2>{tarefa.task}</h2>
                <p>{tarefa.descricao}</p>
                <p>Data de Entrega: {tarefa.dataentrega}</p>
                <p>Pontos: {tarefa.pts}</p>
              </IonLabel>
              <IonButton color="danger" onClick={() => handleDelete(tarefa.idtasks)}>
                Excluir
              </IonButton>
            </IonItem>
          ))}
        </IonList>
        <IonToast
          isOpen={!!error}
          onDidDismiss={() => setError(null)}
          message={error || ''}
          duration={3000}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default ListaTarefa;
