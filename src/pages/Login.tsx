import React, { useState }from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import './Login.css'

import { IonApp,IonContent, IonItem, IonList, IonInput, IonItemDivider, IonLabel, IonCardTitle,IonCardHeader, IonCardSubtitle,IonCardContent ,IonHeader, IonPage, IonRange, IonTitle, IonToolbar, IonSearchbar, IonFooter, IonIcon, IonAvatar, IonFab, IonFabButton, IonText, IonSpinner, IonModal, IonButton, IonToggle,IonCard, IonRow,IonCol, IonBadge} from '@ionic/react';
import { logoGoogle, logoFacebook, phonePortraitSharp } from 'ionicons/icons';


const Login: React.FC = () => {
    
    const CLIENT_ID = "577951611418-e5t33mmgsa45uitqe31prr9nhtr9u5a2.apps.googleusercontent.com";

    const [Gauth, setAuth ] = useState({
        isLogined:false,
        accessToken:''
    })
    const [Ginfo, setGinfo ] = useState({
        gid:'',
        Name:'',
        email:'',
        dp:''
    })
    
    const login = (response:any) => {
            if(response.accessToken){
                console.log(response)
                setAuth({
                    isLogined: true,
                    accessToken: response.accessToken

                });
                setGinfo({
                    gid:response.googleId,
                    Name:response.profileObj.name,
                    email:response.profileObj.email,
                    dp:response.profileObj.imageUrl
                })
            }
    }

    const onLogout = () => {
             setAuth({
                 isLogined:false,
                 accessToken:''
             });
    }

    const GLogin = () => (
        <IonCard>
        <IonTitle class="text-center"></IonTitle>
            <IonCardContent>
                <GoogleLogin
                clientId={ CLIENT_ID }
                onSuccess={ login }
                cookiePolicy={ 'single_host_origin' }
                responseType='code,token'
            />   
        <IonButton color="success" onClick={() => onMobile()}><IonIcon class=" mr-3 position-relative"icon={phonePortraitSharp}></IonIcon>Log in With Mobile</IonButton>
            </IonCardContent>
        </IonCard>
    )
    // ---------------------------------------------------------------//

  const [ mobile, setMobile ] = useState<number>();
  const [ otp, setOtp ] = useState<string>('');
  const [ votp, setVotp ] = useState<string>('')
  const [ verify, setVerify ] = useState({
      isVerified:false
  })
  
  const genrerateOTP = () =>
        
     {
          var digits = '0123456789'; 
          let OTP = ''; 
          for (let i = 0; i < 4; i++ ) { 
          OTP += digits[Math.floor(Math.random() * 10)];    
           }  
           setOtp(OTP)
           console.log(OTP)
           console.log(mobile)
     }   

  const verifyOTP = () => {
    console.log(votp)
    setVerify({
        isVerified:true
      })    
    if(votp === otp )
    {
        alert('Verified')
    }
    else
    {
        alert('Not Verified')
    }
  } 

  const Otp = () => (
       <IonCard>
         <IonCardHeader>
           <h2>Mobile verification</h2>
           </IonCardHeader>
         <IonCardContent>
         <IonLabel position="floating">Mobile No.</IonLabel>
         <IonInput type ="number" placeholder="Enter Mobile No. Here" onIonChange={(e:any) => setMobile(e.detail.value!)} maxlength={10}></IonInput>
         <IonButton onClick={() => genrerateOTP()}>Send OTP</IonButton>

         <IonItemDivider />

         <IonLabel position="floating">OTP</IonLabel>
         <IonInput type="text" placeholder="Enter OTP Here" onIonChange={(e:any) => setVotp(e.detail.value!)}maxlength={4}></IonInput>
         <IonButton onClick={() => verifyOTP()}>Verify</IonButton>

         <IonItemDivider/>
         <GoogleLogout
                clientId={ CLIENT_ID }
                onLogoutSuccess = { onLogout }
                >
                </GoogleLogout>

          </IonCardContent>
         </IonCard>
  )

  const Form = () => (
    <IonCard>
      <IonCardHeader color="primary">User Info</IonCardHeader>
      <IonCardContent>
        
        <IonItemDivider></IonItemDivider>
        
        <IonLabel>Name</IonLabel>
        <IonInput type="text" placeholder="Enter Your Name" ></IonInput>
        <IonLabel>Email</IonLabel>
        <IonInput type="text" placeholder="Enter Your Email" ></IonInput>

        <IonItemDivider></IonItemDivider>
        
        <GoogleLogout 
        clientId='1032487630246-l3vpf492eb19v48hpm551ghvugmnl889.apps.googleusercontent.com'
        buttonText="Logout with Google"
        onLogoutSuccess= {onLogout}
        >
        </GoogleLogout>
      </IonCardContent>
    </IonCard>
  )  

  const onMobile = () => {
    return <Otp />
}

    const onCondition = () => {
        if(Gauth.accessToken)
        {
            if(verify.isVerified)
            {
                return <Form />
            }
            return <Otp/>
           
        }
        
        else{
            return <GLogin />
        }
    }

    return(
            <IonPage>
               <IonContent fullscreen>
                    {onCondition()}
               </IonContent>
            </IonPage>
        )

}

export default Login