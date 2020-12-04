import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonCardHeader, IonCard, IonCardContent, IonIcon } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import { cogSharp, locationSharp, personSharp, pricetagSharp, starHalfSharp } from 'ionicons/icons';

const Tab3: React.FC = () => {
  var load = ''  ;
  const [hdata, sethData ] = useState<any[]>([])
  const [hireData, setHireData ] = useState<any[]>([])
  const [saveData, setSaveData ] = useState<any[]>([])


  useEffect(() => {  
    load="saved";
    axios.get
    ("http://api.wodoworker.com/filter/userHistory",{
      headers:{
        token:"shiva12"
      }
    })
    .then(res => {
      console.log(res.data.data.data.saved)
      setHireData(res.data.data.data.hired)
      setSaveData(res.data.data.data.saved)
      console.log(load)
    })
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Worker Records</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 3 page" /> */}
      <IonSegment onIonChange={(e:any) => {
        if(e.detail.value === "hired")
        {
           sethData(hireData)
           return hdata;
        }
        else if(e.detail.value === "saved")
        {
            sethData(saveData)
            return hdata;
        }
        else{
          return null;
        }
        }}>
          <IonSegmentButton value="saved">
            <IonLabel>Saved</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="hired" >
            <IonLabel>Hired</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        {hdata.map(h => <IonCard key={h.savedid}>
          <IonCardContent>
          <h1><IonIcon class="mr-1 mt-1" color="primary" size="small" icon={personSharp}/>{h.name}</h1>
          <h2><IonIcon class="mr-1 mt-1" color="primary" size="small" icon={pricetagSharp}/>{h.wages}</h2>
          <h2><IonIcon class="mr-1 mt-1" color="primary" size="small" icon={starHalfSharp}/>{h.rating}/5</h2>
          <h2><IonIcon class="mr-1 mt-1" color="primary" size="small" icon={cogSharp}/>{h.skills.s1}</h2>
          <h2><IonIcon class="mr-1 mt-1" color="primary" size="small" icon={cogSharp}/>{h.skills.s2}</h2>
          <h2><IonIcon class="mr-1 mt-1" color="primary" size="small" icon={cogSharp}/>{h.skills.s3}</h2>
          <h2><IonIcon class="mr-1" color="primary" size="small" icon={locationSharp}/>{h.location}</h2>
          </IonCardContent>
        </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
