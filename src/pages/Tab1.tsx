import React, { useState, useEffect } from 'react';
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { Plugins } from '@capacitor/core'
import axios from 'axios'
import { IonContent, IonHeader, IonPage, IonFabButton, IonFab, IonTitle, IonToolbar, IonLabel, IonIcon, IonCard, IonInput, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonAvatar, IonButton, IonModal, IonList, IonItem, IonText, IonRow, IonCol, IonChip } from '@ionic/react';
import {addCircle, addCircleSharp, closeOutline, removeCircle, removeCircleSharp,} from 'ionicons/icons';
import './Tab1.css';
import { useHistory } from 'react-router';
import { Kommunicate } from '@ionic-native/kommunicate';

const Tab1: React.FC = () => {

 const { Browser } = Plugins; 

 const [orderid, setOrderid] = useState('')
 const [showModal, setShowModal] = useState(false);
 const [bal,setBal] = useState() 
 const [amount,setAmount] = useState<any>('');
 const [hist,setHist] = useState<any[]>([]);
 var i;
 const history = useHistory();

 // node api rqst
 

useEffect(() => {
    axios.get('http://api.wodoworker.com/filter/walletBalance',{
      headers:{
        token:"shiva12"
      }
    })
    .then(res => {
      setBal(res.data.data)
    })

    axios.get('http://api.wodoworker.com/filter/walletData',{
      headers:{
        token:"shiva12"
      }
    })
    .then(res => {
      let x = [];
      for(i=0 ; i<res.data.data.length ; i++)
      {
         x[i] = new Date(res.data.data[i].Timestamp);
         res.data.data[i].Timestamp = String(x[i])   
                
      }
       setHist(res.data.data)

    })
}, [])

const getSupport = async() => {
  let conversationObject = {
    'appId' : '29b8e06fc1c42609eca5d3d4854463ceb'
  }

  Kommunicate.conversationBuilder(conversationObject).then((clientChannelKey:any) => console.log(clientChannelKey)).catch((error:any) => console.error(error));
}

const onAddMoney = () => {
  setShowModal(true)
}

const onProceed = async() => {
  
  let url1 = 'http://api.wodoworker.com/filter/getOrderId'
  let url2 = 'http://localhost:5000/razorpay/walletpayment'

    // api1
 axios.get(url1,{
    headers:{
      amount:amount*100,
    }
  })
  .then(res => {
    console.log(res.data.data.id)
    setOrderid(res.data.data.id)
    // 
          let requestBody = {
            "amount":amount,
            "token":"shiva12",
            "orderid":res.data.data.id
          }
      
        let header = {
            headers:{
              'Content-Type':'application/json'
            }
          } 

    // api2
    axios.post(url2,requestBody,header)
    .then(res => {
      console.log(res.data)
    })
  })
  .catch(err => {
    console.log(err)
  })
  
  
  await Browser.open({url:'http://localhost:3000/'})
  
  setShowModal(false)
 
}

  return (
    
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Wodo Wallet</IonTitle>

        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonCard>
          <IonCardHeader>
            <IonCardTitle class="amount">{bal}</IonCardTitle>
            <IonButton class="powered"color="primary" onClick={() => onAddMoney()}>Add Money</IonButton>
            <IonButton class="powered"color="primary" onClick={() => getSupport()}>Support</IonButton>
          </IonCardHeader>
        </IonCard>

        <IonCard>
          <IonCardContent>
            {hist.map(h=><IonRow key={h.transID} class="justify-content-center">
              <IonCol size="3">
                {h.type==="CREDIT" ? <IonIcon color="success" icon={addCircleSharp} size="large"/> : <IonIcon color="danger" icon={removeCircleSharp} size="large"/>}
              </IonCol>
              <IonCol size="6">
                {h.type==="CREDIT" ? <h3 className="add"><b> {h.purpose} </b></h3> : <h3 className="subs"><b> {h.purpose} </b></h3> }
                  <h4>{h.Timestamp.slice(0,15)}</h4>
                  <h4>{" "+h.Timestamp.slice(15,21)}</h4>
              </IonCol>
              <IonCol size="3">
                <IonChip color="primary">
               <h2>{h.Coins}</h2>
                </IonChip>
              </IonCol>
            </IonRow>)}
          </IonCardContent>
        </IonCard>

            <IonModal isOpen={showModal}>
                 <IonCard>
                   <IonCardContent>
                     <h1 className="text-success">Amount to be add ?</h1>
                     <IonInput type="number" placeholder="Amount" onIonChange={(e:any)=>setAmount(e.detail.value)}></IonInput>
                     {amount >= 2 ? <IonButton slot="end" class="cent" color="primary" expand="block" onClick={()=> onProceed()}>Proceed</IonButton> : null }
                   </IonCardContent>
                 </IonCard>
            </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
