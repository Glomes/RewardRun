import { Redirect, Route } from 'react-router-dom';
import { IonApp, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import CadastroAdmin from './components/CadastroAdmin';
import LoginAdmin from './components/LoginAdmin';
import AdminScreen from './components/AdminScreen'
import CadastroTarefa from './components/CadastroTarefa';
import ListaTarefa from './components/ListaTarefa';
import CadastroRecompensa from './components/CadastroRecompensa';
import ListaRecompensas from './components/ListaRecompensa';
import KidScreen from './components/KidScreen';
import GerenciaUser from './components/GerenciaUser'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';



setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      
        <Route exact path="/home" component={Home} />
        <Route exact path="/admin/cadastro" component={CadastroAdmin} />
        <Route exact path="/admin/login" component={LoginAdmin}/>
        <Route exact path="/admin/menu" component={AdminScreen}/>
        <Route exact path="/criar-tarefa" component={CadastroTarefa}/>
        <Route exact path="/ver-tarefas" component={ListaTarefa}/>
        <Route exact path="/criar-recompensa" component={CadastroRecompensa}/>
        <Route exact path="/ver-recompensa" component={ListaRecompensas}/>
        <Route exact path="/kid" component ={KidScreen}/>
        <Route exact path="/gerenciar-usuario"  component ={GerenciaUser}/>
        
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      
    </IonReactRouter>
  </IonApp>
);

export default App;
