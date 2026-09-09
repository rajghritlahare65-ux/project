import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
    getFirestore,
    collection,
    query,
    orderBy,
    getDocs
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


const auth =
    getAuth(app);

const db =
    getFirestore(app);


/* LOGIN */

const login =
    document.getElementById("login");


if (login) {

    login.addEventListener(
        "click",
        async () => {

            const email =
                document.getElementById("email").value;

            const password =
                document.getElementById("password").value;

            const error =
                document.getElementById("error");

            try {

                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                window.location.href =
                    "dashboard.html";

            } catch(e) {

                error.textContent =
                    "Invalid login details.";

            }

        }
    );

}


/* DASHBOARD */

const responses =
    document.getElementById("responses");


if (responses) {

    onAuthStateChanged(
        auth,
        async user => {

            if (!user) {

                window.location.href =
                    "index.html";

                return;

            }

            try {

                const q =
                    query(
                        collection(
                            db,
                            "responses"
                        ),
                        orderBy(
                            "createdAt",
                            "desc"
                        )
                    );

                const snapshot =
                    await getDocs(q);

                responses.innerHTML = "";

                if (snapshot.empty) {

                    responses.innerHTML =
                        `<p>No response yet ❤️</p>`;

                    return;

                }

                snapshot.forEach(doc => {

                    const data =
                        doc.data();

                    const card =
                        document.createElement("div");

                    card.className =
                        "response glass";

                    let date = "";

                    if (data.createdAt) {

                        date =
                            data.createdAt
                                .toDate()
                                .toLocaleString();

                    }

                    card.innerHTML = `

                        <div class="answer">
                            ${data.answer || "Unknown"}
                        </div>

                        <div class="message">
                            ${escapeHTML(
                                data.message || ""
                            )}
                        </div>

                        <div class="date">
                            ${date}
                        </div>

                    `;

                    responses.appendChild(card);

                });

            } catch(e) {

                console.error(e);

                responses.innerHTML =
                    "Unable to load responses.";

            }

        }
    );

}


/* LOGOUT */

const logout =
    document.getElementById("logout");

if (logout) {

    logout.addEventListener(
        "click",
        async () => {

            await signOut(auth);

            window.location.href =
                "index.html";

        }
    );

}


/* SECURITY */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}