export const JWT_SECRET = process.env.NEXTAUTH_SECRET;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000" ;
export const API = "https://64e0caef50713530432cafa1.mockapi.io/api/products"
export const firebaseConfigSettings = {
    apiKey: process.env.FIREBASE_API_KEY! ,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
    projectId:process.env.FIREBASE_PROJECTID!,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
    appId:process.env.FIRBASE_APPID 
}
