import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonCard, IonCardContent, IonCardHeader, IonFabButton, IonFab, IonIcon, IonText, IonRow, IonCol, IonButton, IonImg, IonBackButton, IonActionSheet, IonModal, IonInput, IonList, IonSelect, IonSelectOption, IonItem, IonDatetime, IonToast } from '@ionic/react';
import './Caller.css';
import { arrowBackOutline, callOutline, checkmarkOutline, chevronUpCircleOutline,closeOutline,volumeHighOutline } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router';

interface Idata
{
    data?:{}|any;
}


const Caller: React.FC = () => {
    
    const history = useHistory();
    const location = useLocation();
    const datas = (location.state as Idata).data

    const [ htoast, setHtoast ] = useState<string>('')
    const [ dtoast, setDtoast ] = useState<string>('')
    const [ reason, setReason ] = useState<string>('')
    const [ date, setDates ] = useState<string>('') 
    const [ slot, setSlot ] = useState<string>('')

    const [ showModal, setShowModal ] = useState(false);
    const [ showModal2, setShowModal2 ] = useState(false);

    const [ actionSheet, setActionSheet ] = useState(false) 
    const [img, setImg] = useState<any>('') 

    const onCallEnd = () => {
    //  if(true){
    //     history.push({
    //     pathname:"/hired",
    //     state: { data : datas }
    //   })
    //  }
       setActionSheet(true)
    }

    const onHire = () => {
        axios.get("http://api.wodoworker.com/filter/hire",{
          headers:{
            token:"shiva12",
            workerid:"BHO1007",
            daatee:"2020-11-27",
            slot:"MORNING",
            transid:"HIR00024"
          }
        })
        .then(res => {
            console.log(res.data.status)
            setHtoast(res.data.status)
            console.log(htoast)
        })
    }

    const onDeny = () => {
       axios.get("http://api.wodoworker.com/filter/deny",{
         headers:{
           token:"shiva12",
           workerid:"BHO1007",
           transid:"HIR00024",
           reason:"Worker not available"
         }
       })
       .then(res => {
         console.log(res.data.status)
         setDtoast(res.data.status)
         console.log(dtoast)
       })
    }
    
    useEffect(() => 
    {
        axios.get(`http://agent.wodoworker.com/profile/${datas.workerid}`)
        .then( res => {
            setImg(res.data);
        })       
    }, [])

  return (
         <IonPage>
            <IonHeader class="cnt">
            <IonBackButton class="float-left"><IonIcon icon={arrowBackOutline}/></IonBackButton>
                <IonToolbar>
                        Calling....
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
            <IonCard class="card">                  
                  <IonCardContent>
                      <IonRow class="justify-content-center">
                          <IonImg class="measure" src={`data:image/png;base64,${img}`}/>
                      </IonRow>
                  </IonCardContent>
                </IonCard>
                <IonCard>
                    <IonCardContent>
                    <IonRow class="ml-4 justify-content-center">
                      <IonCol size="4">
                        <IonButton shape="round" color="success"><IonIcon icon={volumeHighOutline}/></IonButton>
                      </IonCol>
                      <IonCol size="4">
                        <IonButton shape="round" color="danger" onClick={()=> onCallEnd()}><IonIcon icon={callOutline}/></IonButton>
                      </IonCol>
                      <IonCol size="4">
                        <IonButton shape="round"><IonIcon icon={chevronUpCircleOutline}/></IonButton>
                      </IonCol>
                    </IonRow>
                    </IonCardContent>
                </IonCard>
                {/* ------------------------------ */}
                <IonActionSheet isOpen={actionSheet}
                 onDidDismiss={()=> setActionSheet(false)}
                 header="Do you want to hire or not?"
                 buttons={[
                   {
                   text:'Hired',
                   cssClass:"hire",
                   icon: checkmarkOutline,
                   handler:()=>{
                        setShowModal2(true)
                   }
                 },
                 {
                   text:'Denied',
                   cssClass:"deny",
                   icon: closeOutline,
                   handler:()=>{
                    setShowModal(true)
                  }
                 },             
                ]}
                >
                </IonActionSheet>

                <IonModal isOpen={showModal}>
                <IonCard>
                <IonCardHeader>
                    <h1 className="text-danger text-center"><b>Denial Confirmation</b></h1>
                </IonCardHeader>
                <IonCardContent>           

                          <IonInput type="number" color="primary"></IonInput>
                          <IonLabel color="primary"><b>Select A Reason</b></IonLabel>
                              <IonList>
                                <IonItem>
                                <IonSelect value={reason} placeholder="Select A Reason To Deny" onIonChange={(e:any)=>setReason(e.detail.value)}>
                                    <IonSelectOption >Worker not available</IonSelectOption>
                                    <IonSelectOption >I don't want to hire</IonSelectOption>
                                </IonSelect>
                                </IonItem>
                              </IonList>
                              <IonButton expand="block" slot="end" onClick={()=> onDeny()}> Denied</IonButton>
                              
                      </IonCardContent>
                  </IonCard>
                  {dtoast ==='Success'? <IonToast
                              isOpen={true}
                              color="success"
                              duration={2500}
                              message="Worker Denied Successfully"
                              /> 
                            :null }
                </IonModal>

                <IonModal isOpen={showModal2}>
                    <IonCard>
                    <IonCardHeader>
                        <h1 className="text-success text-center"><b>Hiring Confirmation</b></h1>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonLabel color="primary"><b>Hire Date</b></IonLabel>
                        <IonDatetime displayFormat="DD MMM YYYY" placeholder="Select Date" onIonChange={(e:any)=>setDates(e.detail.value)}/>
                        
                        <IonLabel color="primary"><b>Hiring Slot</b></IonLabel>
                            <IonList>
                              <IonItem>
                              <IonSelect value={slot}placeholder="Select Slot" onIonChange={(e:any)=>setSlot(e.detail.value)}>
                                  <IonSelectOption >Morning</IonSelectOption>
                                  <IonSelectOption >Evening</IonSelectOption>
                              </IonSelect>
                              </IonItem>
                            </IonList>
                            <IonButton expand="block" slot="end" onClick={()=> onHire()} >Hire</IonButton>
                    </IonCardContent>
                  </IonCard>
                  {htoast ==='Success'? <IonToast
                              isOpen={true}
                              color="success"
                              duration={2500}
                              message="Worker Hired Successfully"
                              /> 
                            :null }
                </IonModal>


            </IonContent>
        </IonPage>
  );
};

export default Caller;
