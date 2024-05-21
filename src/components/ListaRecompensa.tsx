import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButtons, IonBackButton, IonToast, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const ListaRecompensas: React.FC = () => {
  const [recompensas, setRecompensas] = useState<any[]>([]);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('Erro desconhecido'); 
  const history = useHistory();

  useEffect(() => {
    fetchRecompensas();
  }, []); 

  const fetchRecompensas = async () => {
    try {
      const response = await fetch('http://192.168.43.10:8080/api/v1/Reward'); 
      if (!response.ok) {
        throw new Error('Erro ao buscar recompensas: ' + response.statusText);
      }
      const data = await response.json();
      setRecompensas(data); 
    } catch (error) {
      setErrorMessage('Erro ao buscar recompensas');
      setShowErrorToast(true);
    }
  };

  const handleDelete = async (id: number) => { 
    try {
      const response = await fetch(`http://192.168.43.10:8080/api/v1/Reward/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir recompensa: ' + response.statusText);
      }
     
      fetchRecompensas();
    } catch (error) {
      console.error('Erro ao excluir recompensa:', error); 
      setErrorMessage('Erro ao excluir recompensa');
      setShowErrorToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/admin/menu" />
          </IonButtons>
          <IonTitle>Lista de Recompensas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {recompensas.map((recompensa, index) => (
            <IonItem key={index} onClick={() => {}}>
              <IonLabel>
                <h2>{recompensa.reward}</h2>
                <p>Pontos necessários: {recompensa.pts_necessarios}</p>
              </IonLabel>
              <IonButton color="danger" onClick={(event) => { event.stopPropagation(); handleDelete(recompensa.idreward); }}>
                Excluir
              </IonButton>
            </IonItem>
          ))}
        </IonList>
        <IonToast
          isOpen={showErrorToast}
          onDidDismiss={() => setShowErrorToast(false)}
          message={errorMessage}
          duration={2000}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default ListaRecompensas;
