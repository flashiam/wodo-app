import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Plugins } from '@capacitor/core';
import { IonApp,IonContent, IonItem, IonList, IonLabel, IonCardTitle,IonCardHeader, IonCardSubtitle,IonCardContent ,IonHeader, IonPage, IonRange, IonTitle, IonToolbar, IonSearchbar, IonFooter, IonIcon, IonAvatar, IonFab, IonFabButton, IonText, IonSpinner, IonModal, IonButton, IonToggle,IonCard, IonRow,IonCol, IonBadge, IonRouterContext, IonRouterOutlet, IonImg} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import {locationSharp, filterSharp, funnelSharp, starHalfSharp, closeOutline, personSharp,mapSharp, pricetagSharp} from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import { Route, useHistory } from 'react-router';
import Payment from './Payment';
import { Link } from 'react-router-dom';

const Tab2: React.FC = () => {
  const history = useHistory();
  
  const { Geolocation } = Plugins;  
  const [searchText, setSearchText] = useState('');
  const [showPopover, setShowPopover] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function showDetail(wid:any){
      history.push({
        pathname:"/profile",      
        state: { data : showWorker.find(data => data.workerid === wid)  }  
      })
    }
     

  const [showSkill, setShowSkill] = useState<any[]>([]);
  const [showWorker, setShowWorker] = useState<any[]>([])

  const [showFirst, setShowFirst] = useState<any[]>([]);
  
  var url= "http://api.wodoworker.com"

  var locationObject = 
  {
    latitude:0.0,
    longitude:0.0,
    location:''
  }
   
    
    const latlng = async() => {
    const position = await Geolocation.getCurrentPosition();
    locationObject.latitude = position.coords.latitude;
    locationObject.longitude = position.coords.longitude;
    // console.log(latitude);
    // console.log(longitude)
  }
    
  useEffect(() => { 
     
      // location();
      latlng();
      
      // VeryFirst APi
      axios.get(url+"/filter/first",{
        headers:{
          token:"srishti02"
        }
      })
      .then(res => {
          // setShowFirst(res.data.data
          console.log(res.data.data)
      })
      
      // API call for Homepage
      axios.get(url+"/filter/all",
       {
          headers:{
          city:"Bhopal",
          lat:locationObject.latitude,  
          long:locationObject.longitude,      
        }
      })      
       .then(res => {        
        setShowWorker(res.data.data)
        
        console.log(res.data.data)
      })

      // API call of Filter
      axios.get(url+"/filter/skill",
      {
        headers:{
         city:"Bhopal"
        }
      })
      .then(res => {
        setShowSkill(res.data.skills)    
        // console.log(res.data.skills)
      }) 

      // API call for Posting Filter values

      // API call for fetching worker on skill basis
      
  },[]);

  return (
    <IonPage >
      <IonHeader>
        <IonToolbar>
        <IonText>
          
        <IonIcon class="location" icon={locationSharp} color="primary"></IonIcon>
          Koh-e-Fiza, Bhopal        
        </IonText>
        {/* <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} showCancelButton="focus"></IonSearchbar> */}
        
        </IonToolbar>
        {/* <p>{searchText ?? '(none)'}</p> */}
      </IonHeader>
      <IonContent fullscreen>              
        <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} showCancelButton="focus">
        <IonSpinner name="crescent" duration={1000}/>
        </IonSearchbar>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={()=> setShowModal(true)}>
          <IonIcon icon={funnelSharp} />
        </IonFabButton>
        </IonFab>

      <IonModal isOpen={showModal}>
        <IonFab vertical="top" horizontal="end" slot="fixed">
        <IonFabButton size="small"onClick={()=> setShowModal(false)}>
          <IonIcon icon={closeOutline} />
        </IonFabButton>
        </IonFab>

        {showSkill.map(skill => <IonList key={skill.id}>
          <IonItem>
            <IonToggle color="primary"  slot="start" ></IonToggle>
            <IonLabel>{skill.skill}</IonLabel>
          </IonItem>
        </IonList>)}

        <IonRange min={200} max={1200} pin color="secondary">
        <IonLabel slot="start">{200}</IonLabel>
        <IonLabel slot="end">{1200}</IonLabel>
        </IonRange>        
      </IonModal>

      {/* Card Start */}
            {showWorker.map(worker =><IonCard onClick={()=>showDetail(worker.workerid)} key={worker.workerid}>
              <IonCardHeader> 
                    <h2><IonIcon class="person-sharp mr-1" icon={personSharp} size="small" color="primary"></IonIcon>{worker.name}</h2>
              </IonCardHeader>
              <IonRow>
                  <IonCol size="6" class="b">                   
                    <IonLabel>
                    <h2><IonIcon class="map-sharp mr-1" icon={mapSharp} size="small" color="primary"></IonIcon>{worker.Location}</h2>
                    <h2><IonIcon class="location mr-1 ml-0" icon={locationSharp} size="small" color="primary"></IonIcon>{worker.distance}</h2>
                    <h2><IonIcon class="star-half-sharp mr-1 ml-0" icon={starHalfSharp} color="primary" size="small"></IonIcon> {worker.rating}/5</h2>
                    </IonLabel>            
                  </IonCol>
                  <IonCol size="6">
                    <IonLabel>
                      <h3><IonIcon class="pricetags-sharp mr-1 ml-0" icon={pricetagSharp} color="primary" size="small"></IonIcon> {worker.wages}</h3>
                    </IonLabel>  
                    </IonCol>
              </IonRow>
            </IonCard>)}         
        {/* Card Ending */}

      </IonContent>
    </IonPage>
    
  );
};


export default Tab2;
