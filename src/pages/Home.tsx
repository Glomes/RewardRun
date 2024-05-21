import React from 'react';
import { IonButton, IonContent, IonFooter, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import trophyIcon from '../assets/tropy.png'; 
import staricon from '../assets/star.png';
import noteicon from '../assets/note.png';
import './Home.css';

const Home: React.FC = () => {
  const history = useHistory();

  const goToScreenA = () => {
    history.push('/kid');
  };

  const goToScreenB = () => {
    history.push('/admin/login'); 
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonCard className="outdoor-card">
          <IonCardHeader>
            <IonCardTitle>REWARD RUN</IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="card-content">
            O seu Gerenciador de tarefas!
          </IonCardContent>
        </IonCard>
        <div className="container">
          <div className="button-grid">
            <IonButton expand="block" onClick={goToScreenA}>
              <img src={staricon} alt="Star Icon" style={{ height: '20px', marginRight: '10px', marginBottom: '7px' }} />
              Tarefas
            </IonButton>
            <IonButton expand="block" onClick={goToScreenB}>
              <img src={noteicon} alt="Star Icon" style={{ height: '20px', marginRight: '10px', marginBottom: '7px' }} />
              Editar 
            </IonButton>
          </div>
        </div>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonTitle>
            Criado por: Lucas Gomes
            <img src={trophyIcon} alt="Trophy Icon" style={{ height: '20px',marginLeft: '10px'}}/>
            </IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
