import React, { useState } from 'react';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import usericon from '../assets/users.png';
import './LoginAdmin.css';

const LoginAdmin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.43.10:8080/api/v1/Admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await response.json();

      if (data.success) {
        setToastMessage('Login bem-sucedido!');
        history.push('/admin/menu');
      } else {
        setToastMessage('Usuário ou senha incorretos.');
      }
    } catch (error) {
      setToastMessage('Erro ao tentar logar.');
    }
    setShowToast(true);
  };

  const handleCadastro = () => {
    history.push('/admin/cadastro');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle style={{ marginRight: '50px' }}>
            <span className="icon-wrapper">
              <img src={usericon} alt="Star Icon" style={{ height: '20px', marginRight: '10px' }} />
              Login
              <img src={usericon} alt="Star Icon" style={{ height: '20px', marginLeft: '10px' }} />
            </span>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="login-admin-container">
        <div className="login-form">
          <IonItem>
            <IonLabel position="floating">Usuário</IonLabel>
            <IonInput type="text" value={username} onIonChange={(e) => setUsername(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Senha</IonLabel>
            <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)}></IonInput>
          </IonItem>
          <IonButton expand="block" onClick={handleLogin}>Entrar</IonButton>
          <IonButton expand="block" color="medium" onClick={handleCadastro}>Cadastre-se</IonButton>
        </div>
        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default LoginAdmin;
