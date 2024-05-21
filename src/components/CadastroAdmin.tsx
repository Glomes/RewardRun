import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonToast, IonButtons, IonBackButton } from '@ionic/react';

const CadastroAdmin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorToast, setErrorToast] = useState({ show: false, message: '' });
  const [successToast, setSuccessToast] = useState({ show: false, message: '' });

  const handleCadastro = async () => {
    try {
      const response = await fetch('http://192.168.43.10:8080/api/v1/Admin/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ admin: username, password })
      });

      if (response.ok) {
        setSuccessToast({ show: true, message: 'Cadastro realizado com sucesso!' });
        setUsername('');
        setPassword('');
      } else {
        const data = await response.json();
        setErrorToast({ show: true, message: data.message || 'Erro ao realizar cadastro.' });
      }
    } catch (error) {
      setErrorToast({ show: true, message: 'Erro na comunicação com o servidor.' });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/admin/menu" />
          </IonButtons>
          <IonTitle>Cadastrar-se</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel position="floating">Usuário</IonLabel>
          <IonInput type="text" value={username} onIonChange={(e) => setUsername(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Senha</IonLabel>
          <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)}></IonInput>
        </IonItem>
        <IonButton expand="block" onClick={handleCadastro}>Cadastrar</IonButton>
        <IonToast
          isOpen={errorToast.show}
          onDidDismiss={() => setErrorToast({ ...errorToast, show: false })}
          message={errorToast.message}
          duration={4000}
          color="danger"
        />
        <IonToast
          isOpen={successToast.show}
          onDidDismiss={() => setSuccessToast({ ...successToast, show: false })}
          message={successToast.message}
          duration={4000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default CadastroAdmin;
