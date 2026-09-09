const questions = [

    {
        number: "QUESTION 01",

        text:
        "Do you believe some people enter our lives at exactly the right moment?",

        answers: [
            "Yes ❤️",
            "Maybe ✨"
        ]
    },

    {
        number: "QUESTION 02",

        text:
        "Have you ever met someone and somehow felt that talking to them was different?",

        answers: [
            "Yes ❤️",
            "Maybe..."
        ]
    },

    {
        number: "QUESTION 03",

        text:
        "Have you ever wished that a beautiful conversation could last just a little longer?",

        answers: [
            "Definitely ❤️",
            "Sometimes ✨"
        ]
    },

    {
        number: "QUESTION 04",

        text:
        "Would you like to know the little secret I've been keeping from you?",

        answers: [
            "Tell me ❤️",
            "I'm curious ✨"
        ]
    }

];


let current = 0;

const question =
    document.getElementById("question");

const number =
    document.getElementById("questionNumber");

const progress =
    document.getElementById("progressText");

const answers =
    document.getElementById("answers");

const card =
    document.getElementById("questionCard");


function renderQuestion() {

    const q = questions[current];

    card.style.opacity = "0";

    card.style.transform =
        "translateY(25px)";

    setTimeout(() => {

        number.textContent =
            q.number;

        question.textContent =
            q.text;

        progress.textContent =
            `0${current + 1} / 04`;

        answers.innerHTML = "";

        q.answers.forEach(answer => {

            const button =
                document.createElement("button");

            button.className =
                "answer";

            button.textContent =
                answer;

            button.addEventListener(
                "click",
                handleAnswer
            );

            answers.appendChild(button);

        });

        card.style.opacity = "1";

        card.style.transform =
            "translateY(0)";

    }, 350);

}


function handleAnswer() {

    if (current < questions.length - 1) {

        current++;

        renderQuestion();

    } else {

        localStorage.setItem(
            "journeyCompleted",
            "true"
        );

        window.location.href =
            "proposal.html";

    }

}


renderQuestion();