import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonToast, IonButtons, IonBackButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './CadastroTarefas.css'; 

const CadastroRecompensa: React.FC = () => {
  const [reward, setReward] = useState('');
  const [ptsNecessarios, setPtsNecessarios] = useState('');
  const [errorToast, setErrorToast] = useState({ show: false, message: '' });
  const history = useHistory();

  const handleCadastro = async () => {
    try {
      const response = await fetch('http://192.168.43.10:8080/api/v1/Reward', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reward: reward, pts_necessarios: parseInt(ptsNecessarios) })
      });
        
      if (response.ok) {
        history.push('/admin/menu');
      } else {
        const errorData = await response.json();
        setErrorToast({ show: true, message: 'Erro ao cadastrar recompensa: ' + errorData.message });
      }
    } catch (error) {
      setErrorToast({ show: true, message: 'Erro ao cadastrar recompensa: ' + (error as Error).message });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/admin/menu" />
          </IonButtons>
          <IonTitle>Cadastro de recompensas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
  <div className="form-outer-container" style={{  marginTop: '250px' }}>
    <div className="form-container">
      <IonItem className="form-item">
        <IonLabel position="floating">Recompensa</IonLabel>
        <IonInput type="text" value={reward} onIonChange={(e) => setReward(e.detail.value!)}></IonInput>
      </IonItem>
      <IonItem className="form-item form-item-ptsNecessarios">
        <IonLabel position="floating">Pontos Necessários</IonLabel>
        <IonInput type="number" value={ptsNecessarios} onIonChange={(e) => setPtsNecessarios(e.detail.value!)}></IonInput>
      </IonItem>
      <IonButton className='submit-button' expand="block" onClick={handleCadastro}>Cadastrar Recompensa</IonButton>
    </div>
  </div>
  <IonToast
    isOpen={errorToast.show}
    onDidDismiss={() => setErrorToast({ ...errorToast, show: false })}
    message={errorToast.message}
    duration={4000}
    color="danger"
  />
</IonContent>

    </IonPage>
  );
};

export default CadastroRecompensa;
