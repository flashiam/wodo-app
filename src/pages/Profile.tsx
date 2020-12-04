import React, {useEffect, useState} from 'react';
import { useHistory, useLocation } from 'react-router';
import { SocialSharing } from '@ionic-native/social-sharing'
import { FacebookShareButton, FacebookIcon, EmailShareButton, EmailIcon, WhatsappShareButton, WhatsappIcon, TwitterIcon, TwitterShareButton, InstapaperShareButton, InstapaperIcon, LinkedinShareButton, LinkedinIcon } from 'react-share'
import axios from 'axios'
import { IonContent, IonHeader, IonPage, IonBackButton, IonFab, IonTitle, IonToolbar, IonLabel, IonIcon, IonCard, IonInput, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonAvatar, IonButton, IonModal, IonList, IonItem, IonText, IonRow, IonCol, IonImg, IonFabButton, IonItemDivider, IonChip, IonBadge, IonActionSheet, IonToast } from '@ionic/react';
import { arrowBackOutline, bookmarkOutline, callOutline, cashSharp, checkmarkCircleOutline, locationSharp, logoFacebook, logoGoogle, logoInstagram, logoTwitter, logoWhatsapp, personSharp, pricetagSharp, shareOutline, shareSocial, shareSocialOutline } from 'ionicons/icons';
import './Profile.css';
import Tab2 from './Tab2';
import { Link } from 'react-router-dom';

interface Idata {
  data?:[]|any;
}

const Profile: React.FC = () => {


  const history = useHistory();
  const location = useLocation();

  const [ toast, setToast ] = useState<any>('')
  const [ img, setImg ] = useState<any>('')
  const [ showModal, setShowModal ] = useState(false)
  const [ showActionSheet, setShowActionSheet ] = useState(false);
  const [ rating, setRating ] = useState<any[]>([])
  const [ callbal, setCallbal ] = useState<any>('')

  const datas = (location.state as Idata).data;

  const onHandleSave = () =>
  {
    axios.get(`http://api.wodoworker.com/filter/save`,{
      headers:{
        token:"shiva12",
        workerid:`${datas.workerid}`
      }
    })
    .then(res => {
      console.log(res.data.status)
      setToast(res.data.status)
    })
  }

  const onCall = () => {    
    if(callbal === "Success"){
         history.push({
         pathname:"/caller",      
        state: { data : datas }  
        })
    }
    else
    {
        setShowModal(true)
    }
  }

  const onBack = () => {
    history.goBack();
  }

  // --------------------------------------------//
  useEffect(()=>{

    axios.get("http://api.wodoworker.com/filter/checkBalance",{
      headers:{
        token:"shiva12"
      }
    })
    .then(res => {
          console.log(res.data.data)
          setCallbal(res.data.data)
          })

    axios.get(`http://agent.wodoworker.com/profile/${datas.workerid}`)
    .then(res => {
        setImg(res.data)
    })
    
    axios.get('http://api.wodoworker.com/filter/ratings',{
      headers:{
          workerid:`${datas.workerid}`
      }
    })
    .then(res => {
        console.log(res.data.data)
        setRating(res.data.data)
        
    })

  },[])

  return (
            <IonPage>
              <IonHeader class="cnt">
              <IonButton onClick={()=> onBack()}><IonIcon icon={arrowBackOutline}/></IonButton>
                <IonToolbar>
                  Worker Profile
                </IonToolbar>
              </IonHeader>
              <IonContent>
                <IonCard class="card">                  
                  <IonCardContent>
                      <IonRow class="justify-content-center">
                          <IonImg class="measure" src={`data:image/png;base64,${img}`}/>
                      </IonRow>
                  </IonCardContent>
                </IonCard>
                <IonCard>
                <IonRow class="ml-4 justify-content-center">
                      <IonCol size="4">
                        <IonButton shape="round" onClick={()=>setShowActionSheet(true)}><IonIcon icon={shareOutline}/></IonButton>
                      </IonCol>
                      <IonCol size="4">
                        <IonButton shape="round" onClick={()=>onCall()}><IonIcon icon={callOutline}/></IonButton>
                      </IonCol>
                      <IonCol size="4">
                        <IonButton shape="round" onClick={()=> onHandleSave()}><IonIcon icon={bookmarkOutline}/></IonButton>
                      </IonCol>
                    </IonRow>
                  <IonCardHeader class="cnt"><IonText>Personal Information</IonText></IonCardHeader>
                  <IonCardContent>
                    <IonRow>
                      <IonCol size="8">
                      <IonText>
                        <h2><IonIcon class="mr-1" icon={personSharp} color="primary" size="small"/>{datas.name}</h2>
                        <h2><IonIcon class="mr-1" icon={locationSharp}color="primary"/>{datas.Location}</h2>
                        <h2><IonIcon class="mr-1" icon={pricetagSharp}color="primary"/>{datas.wages}</h2>
                      </IonText>
                      </IonCol>
                      <IonCol size="4">
                        <IonChip color="success">
                          <IonLabel>{datas.status}</IonLabel>
                        </IonChip>  
                      </IonCol>
                    </IonRow>
                    
                  </IonCardContent>
                </IonCard>
                <IonCard>
                  <IonCardHeader class="cnt"><IonText>SKILLS</IonText></IonCardHeader>
                  <IonCardContent>
                    <IonChip color="primary">
                      <IonLabel>{datas.skill[0]}</IonLabel>
                    </IonChip>
                    <IonChip color="success">
                      <IonLabel>{datas.skill[1]}</IonLabel>
                    </IonChip>
                    <IonChip color="warning">
                      <IonLabel>{datas.skill[2]}</IonLabel>
                    </IonChip>
                    <IonItemDivider/>
                  </IonCardContent>
                </IonCard>
                <IonCard>
                  <IonCardHeader class="cnt"><IonText>Rating And Reviews</IonText></IonCardHeader>
                  <IonCardContent>
                    {rating.map(ratt => <IonCard key={ratt.ratid}>
                    <IonCardHeader>{ratt.user}
                    <h3 className="float-right">{ratt.date}</h3></IonCardHeader>
                    <IonCardContent>
                    <p color="primary">{ratt.comment}</p>
                    <IonItemDivider></IonItemDivider>
                    <IonChip color="primary">
                    <IonLabel>{ratt.rat1}/5</IonLabel>
                    </IonChip>
                    <IonChip color="warning">
                    <IonLabel>{ratt.rat2}/5</IonLabel>
                    </IonChip>
                    <IonChip color="success">
                    <IonLabel>{ratt.rat3}/5</IonLabel>
                    </IonChip>
                    <IonChip color="danger">
                    <IonLabel>{ratt.rat4}/5</IonLabel>
                    </IonChip>
                    </IonCardContent>
                    </IonCard>)}
                  </IonCardContent>
                </IonCard>
                {/* -------ActionSheet-------------- */}

                <IonActionSheet isOpen={showActionSheet}
                 onDidDismiss={()=> setShowActionSheet(false)}
                 header="Share"
                 buttons={[
                   {
                   text:'Gmail',
                   cssClass:"google",
                   icon: logoGoogle,
                   handler:()=>{
                   }
                 },
                 {
                   text:'Facebook',
                   cssClass:"facebook",
                   icon: logoFacebook,
                   handler:()=>{
                   }
                 },
                 {
                  text:'WhatsApp',
                  cssClass:"wapp",  
                  icon: logoWhatsapp,
                  handler:()=>{
                    alert('Shared on Whatsapp')
                  }
                },
                {
                  text:'Twitter',
                  cssClass:"twitter",
                  icon: logoTwitter,
                  handler:()=>{
                    alert('Shared on Twitter')
                  }
                },
                {
                  text:'Instagram',
                  cssClass:"insta",
                  icon: logoInstagram,
                  handler:()=>{
                    alert('Shared on Instagram')
                  }
                },
                
                ]}
                >
                </IonActionSheet>
                <IonCard>
                  <IonCardHeader class="cnt">Share</IonCardHeader>
                  <IonCardContent>
                    <IonRow class="ml-3 justify-content-center">
                      <IonCol>
                        <FacebookShareButton url="http://localhost:8100/profile">
                            <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>
                      </IonCol>
                      <IonCol>
                        <EmailShareButton url="http://localhost:8100/profile">
                            <EmailIcon size={32} round={true}/>
                        </EmailShareButton>
                      </IonCol>
                      <IonCol>
                        <WhatsappShareButton url="http://localhost:8100/profile">
                          <WhatsappIcon size={32} round={true}/>
                        </WhatsappShareButton>
                      </IonCol>
                      <IonCol>
                        <TwitterShareButton url="http://localhost:8100/profile">
                          <TwitterIcon size={32} round={true}/>
                        </TwitterShareButton>
                      </IonCol>
                      <IonCol>
                        <LinkedinShareButton url="http://localhost:8100/profile">
                          <LinkedinIcon size={32} round={true}/>
                        </LinkedinShareButton>
                      </IonCol>
                    </IonRow>
                  </IonCardContent>      
                </IonCard>
                {toast==='success'? <IonToast
                isOpen={true}
                color="primary"
                duration={2500}
                message="Woker Saved Successfully"
                /> 
                :null }
                {/* --------------------- */}
                <IonModal isOpen={showModal}>
                    <IonCard class="modalcard">
                      <IonCardHeader>Insufficient Balance</IonCardHeader>
                      <IonCardContent>
                        <IonInput type="number" color="primary"><IonIcon color="primary" icon={pricetagSharp}/></IonInput>
                        <IonButton expand="block" shape="round">Proceed</IonButton>
                      </IonCardContent>
                    </IonCard>
                </IonModal>
              </IonContent>
            </IonPage>
        )
  }
export default Profile;
