import React, { useState } from 'react';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './CadastroTarefas.css';



const CadastroTarefa: React.FC = () => {
  const [task, setTask] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');
  const [pts, setPts] = useState(0);
  const [errorToast, setErrorToast] = useState<{ show: boolean, message: string }>({ show: false, message: '' });
  const history = useHistory();

  const handleCadastroTarefa = async () => {
    try {
      if (!task || !descricao || !dataEntrega || !pts) {
        setErrorToast({ show: true, message: 'Todos os campos devem ser preenchidos.' });
        return;
      }

      setErrorToast({ show: false, message: '' });

      const response = await fetch('http://192.168.43.10:8080/api/v1/Tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          task: task,
          descricao: descricao,
          dataentrega: dataEntrega, 
          pts: pts
        })
      });

      if (response.ok) {
        history.push('/admin/menu');
      } else {
        const errorData = await response.json();
        setErrorToast({ show: true, message: 'Erro ao cadastrar tarefa: ' + errorData.message });
      }
    } catch (error) {
      setErrorToast({ show: true, message: 'Erro ao cadastrar tarefa: ' + (error as Error).message });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/admin/menu" />
          </IonButtons>
          <IonTitle>Cadastro Tarefas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="form-outer-container" style={{  marginTop: '200px' }}>
          <div className="form-container">
            <IonItem className="form-item">
              <IonLabel position="floating">Tarefa</IonLabel>
              <IonInput type="text" value={task} onIonChange={(e) => setTask(e.detail.value!)} ></IonInput>
            </IonItem>
            <IonItem className="form-item">
              <IonLabel position="floating">Descrição</IonLabel>
              <IonInput type="text" value={descricao} onIonChange={(e) => setDescricao(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem className="form-item form-item-date">
              <IonLabel position="floating" style={{ marginBottom: '7px' }}>Data de Entrega</IonLabel>
              <IonInput type="date" value={dataEntrega} onIonChange={(e) => setDataEntrega(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem className="form-item">
              <IonLabel position="floating">Pontos</IonLabel>
              <IonInput type="number" value={pts.toString()} onIonChange={(e) => setPts(parseInt(e.detail.value!, 10))}></IonInput>
            </IonItem>
            <IonButton className="submit-button" expand="block" onClick={handleCadastroTarefa}>Cadastrar Tarefa</IonButton>
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

export default CadastroTarefa;
