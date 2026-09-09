import {
    initializeApp
} from
"https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";


import {
    getFirestore,
    collection,
    getDocs,
    query,
    orderBy
} from
"https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


const firebaseConfig = {

    apiKey:
        "AIzaSyA-Yed4LtEMMKmHzCIAaiON3zC2mZlmIlA",

    authDomain:
        "love-proposal-d4298.firebaseapp.com",

    projectId:
        "love-proposal-d4298",

    storageBucket:
        "love-proposal-d4298.firebasestorage.app",

    messagingSenderId:
        "394527182364",

    appId:
        "1:394527182364:web:8a75b88d2798041e0619d9"

};


const app =
    initializeApp(
        firebaseConfig
    );


export const db =
    getFirestore(app);


export async function getResponses() {

    const responsesRef =
        collection(
            db,
            "proposalResponses"
        );


    const responsesQuery =
        query(
            responsesRef,

            orderBy(
                "createdAt",
                "desc"
            )
        );


    const snapshot =
        await getDocs(
            responsesQuery
        );


    return snapshot.docs.map(
        doc => ({

            id: doc.id,

            ...doc.data()

        })
    );

}