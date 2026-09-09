import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


const firebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain:
        "YOUR_PROJECT.firebaseapp.com",

    projectId:
        "YOUR_PROJECT_ID",

    storageBucket:
        "YOUR_PROJECT.firebasestorage.app",

    messagingSenderId:
        "YOUR_MESSAGING_SENDER_ID",

    appId:
        "YOUR_APP_ID"

};


const app =
    initializeApp(firebaseConfig);


const db =
    getFirestore(app);


export async function saveResponse(
    answer,
    message
) {

    await addDoc(
        collection(
            db,
            "responses"
        ),
        {

            answer: answer,

            message: message,

            createdAt:
                serverTimestamp()

        }
    );

}