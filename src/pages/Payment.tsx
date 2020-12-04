import React,{useEffect,useState} from 'react';
import axios from 'axios'
import { useHistory, useLocation } from 'react-router'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonButton, IonList, IonItem, IonIcon, IonText, IonCheckbox, AnimationBuilder } from '@ionic/react';
import {logoApple, logoAppleAppstore, logoJavascript, logoPlaystation, logoSkype,  } from 'ionicons/icons';
import './Payment.css'
import StripeCheckout from 'react-stripe-checkout'
// import RazorpayCheckout from 'com.razorpay.cordova';

interface Idata{
  data?: any;
}

const Payment: React.FC = () => {
  
//  let RazorpayCheckout:any;
//  var RazorpayCheckout = require('com.razorpay.cordova/www/RazorpayCheckout')
 const history = useHistory();
 const location = useLocation(); 
 const datas = (location.state as Idata).data;


 useEffect(()=>{
  
  

 },[])


 

//  var price : any;
//  const onPayment = () => {
  
//   const StripeCheckoutButton = (price:any) => {
//     const priceForStripe = price * 100;
//     const publishableKey = 'pk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb';

    
//     const onToken = (token:any) => {
//         console.log(token);
//         alert('Payment Succesful!');
//     };

//     return (
//       <StripeCheckout
//           label='Pay Now'
//           name='Freaky Jolly Co.'
//           billingAddress
//           shippingAddress
//           image='https://www.freakyjolly.com/wp-content/uploads/2020/04/fj-logo.png'
//           description={`Your total is $${price}`}
//           amount={priceForStripe}
//           panelLabel='Pay Now'
//           token={onToken}
//           stripeKey={publishableKey}
//       />
//   )
// }

// export default StripeCheckoutButton;
//  }






//  const onUPIHandle = () => {
//   var options = {
//     description: 'Credits towards consultation',
//     image: 'https://i.imgur.com/3g7nmJC.png',
//     order_id: orderid,
//     currency: 'INR',
//     key:'rzp_live_zzSqjt3sPAs0W9',
//     amount:datas*100,
//     name: 'Acme Corp',
//     method:"upi",
//     theme: {
//       color: '#3399cc'
//         }
//     }
// var successCallback = function(success:any) {
// alert('payment_id: ' + success.razorpay_payment_id)
// var orderId = success.razorpay_order_id
// var signature = success.razorpay_signature
// }
// var cancelCallback = function(error:any) {
// alert(error.description + ' (Error '+error.code+')')
// }
// RazorpayCheckout.on('payment.success', successCallback)
// RazorpayCheckout.on('payment.cancel', cancelCallback)
// RazorpayCheckout.open(options)

// }

//  const onDebitCardHandle = () => {

//   var options = {
//     description: 'Credits towards consultation',
//     image: 'https://i.imgur.com/3g7nmJC.png',
//     order_id: orderid,
//     currency: 'INR',
//     key:'rzp_live_zzSqjt3sPAs0W9',
//     amount:datas*100,
//     name: 'Acme Corp',
//     theme: {
//       color: '#3399cc'
//         }
//     }
// var successCallback = function(success:any) {
// alert('payment_id: ' + success.razorpay_payment_id)
// var orderId = success.razorpay_order_id
// var signature = success.razorpay_signature
// }
// var cancelCallback = function(error:any) {
// alert(error.description + ' (Error '+error.code+')')
// }
// RazorpayCheckout.on('payment.success', successCallback)
// RazorpayCheckout.on('payment.cancel', cancelCallback)
// RazorpayCheckout.open(options)
// }
 
//  const onCreditcardHandle = () => {
//   var options = {
//     description: 'Credits towards consultation',
//     image: 'https://i.imgur.com/3g7nmJC.png',
//     order_id: orderid,
//     currency: 'INR',
//     key:'rzp_live_zzSqjt3sPAs0W9',
//     amount:datas*100,
//     name: 'Acme Corp',
//     theme: {
//       color: '#3399cc'
//         }
//     }
// var successCallback = function(success:any) {
// alert('payment_id: ' + success.razorpay_payment_id)
// var orderId = success.razorpay_order_id
// var signature = success.razorpay_signature
// }
// var cancelCallback = function(error:any) {
// alert(error.description + ' (Error '+error.code+')')
// }
// // RazorpayCheckout.on('payment.success', successCallback)
// // RazorpayCheckout.on('payment.cancel', cancelCallback)
// RazorpayCheckout.open(options).then((data:any) => {
//   alert(`Success: ${data.razorpay_payment_id}`)
// })
// .catch((error:any)=>{
// console.log(error)
// })
//  }

//  const onNetBankingHandle = () => {
//   var options = {
//     description: 'Credits towards consultation',
//     image: 'https://i.imgur.com/3g7nmJC.png',
//     order_id: orderid,
//     currency: 'INR',
//     key:'rzp_live_zzSqjt3sPAs0W9',
//     amount:datas*100,
//     name: 'Acme Corp',
//     theme: {
//       color: '#3399cc'
//         }
//     }
// var successCallback = function(success:any) {
// alert('payment_id: ' + success.razorpay_payment_id)
// var orderId = success.razorpay_order_id
// var signature = success.razorpay_signature
// }
// var cancelCallback = function(error:any) {
// alert(error.description + ' (Error '+error.code+')')
// }
// RazorpayCheckout.on('payment.success', successCallback)
// RazorpayCheckout.on('payment.cancel', cancelCallback)
// RazorpayCheckout.open(options)
//  }

//  const onWalletHandle = () => {
//   var options = {
//     description: 'Credits towards consultation',
//     image: 'https://i.imgur.com/3g7nmJC.png',
//     order_id: orderid,
//     currency: 'INR',
//     key:'rzp_live_zzSqjt3sPAs0W9',
//     amount:datas*100,
//     name: 'Acme Corp',
//     method:"debit",
//     theme: {
//       color: '#3399cc'
//         }
//     }
// var successCallback = function(success:any) {
// alert('payment_id: ' + success.razorpay_payment_id)
// var orderId = success.razorpay_order_id
// var signature = success.razorpay_signature
// }
// var cancelCallback = function(error:any) {
// alert(error.description + ' (Error '+error.code+')')
// }
// RazorpayCheckout.on('payment.success', successCallback)
// RazorpayCheckout.on('payment.cancel', cancelCallback)
// RazorpayCheckout.open(options)
//  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="text-center display-4"><i className="fa fa-inr" aria-hidden="true"></i>{datas}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="text-center text-success">Payment Methods</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        
        
       <IonCard>
         <IonCardContent>
                      {/* <IonButton class="cnt borderr" expand="block" onClick={() => onUPIHandle()} ><IonIcon class="mr-2" icon={logoApple} color="dark"/>UPI</IonButton><hr/>                     
                     
                      <IonButton class="cnt borderr" expand="block" onClick={() => onDebitCardHandle()}> <IonIcon class="mr-2" icon={logoPlaystation} color="dark"></IonIcon> Debit Card</IonButton><hr/>                  
                      
                      <IonButton class="cnt borderr" expand="block" onClick={() => onCreditcardHandle() }><IonIcon class="mr-2" icon={logoJavascript} color="dark"></IonIcon> Credit Card</IonButton><hr/>                     
                     
                      <IonButton class="cnt borderr" expand="block" onClick={() => onNetBankingHandle()}><IonIcon class="mr-2" icon={logoSkype} color="dark"></IonIcon>Net Banking</IonButton><hr/>                     
                     
                      <IonButton class="cnt borderr" expand="block" onClick={() => onWalletHandle()}> <IonIcon class="mr-2" icon={logoAppleAppstore}color="dark"></IonIcon> Wallets </IonButton>
                       */}

                      
         </IonCardContent>
 
       </IonCard>
    

      </IonContent>
    </IonPage>
  );
};

export default Payment;


    





