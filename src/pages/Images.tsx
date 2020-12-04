import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { IonContent, IonHeader, IonPage, IonFabButton, IonFab, IonTitle, IonToolbar, IonLabel, IonIcon, IonCard, IonInput, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonAvatar, IonButton, IonModal, IonList, IonItem, IonText, IonImg, IonRow } from '@ionic/react';
import './Tab2.css'

const Images: React.FC = () => {

    const [img,setImg] = useState<any>('')
    useEffect(() => {
        axios.get("http://agent.wodoworker.com/profile/BHO1054")
        .then(res => {
            console.log(res)
            setImg(res.data)
        })
    }, [])

  return (
    <IonPage>
            <IonContent>    
                <IonRow class="justify-content-center">
                <IonImg class="measure" src={`data:image/png;base64,${img}`} />
                </IonRow>
            </IonContent>
    </IonPage>
  );
};

export default Images;
