import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {compassSharp, todaySharp, walletSharp} from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Login from './pages/Login';


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
import Payment from './pages/Payment';
import Caller from './pages/Caller'
import Images from './pages/Images';
import Profile from './pages/Profile';
// import Hired from './pages/Hired';
// import Deny from './pages/Deny';

const App: React.FC = () => (
  <IonApp>
     <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          {/* -------------------- */}
          {/* <Route path="/hired" component={Hired} exact={true} /> */}
          {/* <Route path="/deny" component={Deny} exact={true} /> */}
          <Route path="/images" component={Images} exact={true} />
          <Route path="/payment" component={Payment} exact={true} />
          <Route path="/caller" component={Caller} exact={true} />
          <Route path="/profile" component={Profile} exact={true} />

          {/* -------------------- */}
          <Route path="/login" component={Login} exact={true} />
          <Route path="/tab1" component={Tab1} exact={true} />
          <Route path="/tab2" component={Tab2} exact={true} />
          <Route path="/tab3" component={Tab3} />
          <Route path="/" render={() => <Redirect to="/tab1" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={walletSharp} />
            
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={compassSharp} />
            
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={todaySharp} />
            
          </IonTabButton>
        </IonTabBar>  
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
