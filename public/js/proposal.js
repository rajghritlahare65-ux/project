const yesButton =
    document.getElementById("yesButton");

const noButton =
    document.getElementById("noButton");

const celebration =
    document.getElementById("celebration");

const continueButton =
    document.getElementById("continueButton");


function createCelebrationHeart() {

    const heart =
        document.createElement("div");

    heart.innerHTML = "❤️";

    heart.style.position = "fixed";

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.bottom = "-30px";

    heart.style.fontSize =
        (15 + Math.random() * 30) + "px";

    heart.style.zIndex = "300";

    heart.style.pointerEvents = "none";

    heart.animate(

        [
            {
                transform:
                    "translateY(0) scale(.5)",

                opacity: 0
            },

            {
                opacity: 1
            },

            {
                transform:
                    "translateY(-110vh) scale(1.4)",

                opacity: 0
            }
        ],

        {
            duration:
                5000 + Math.random() * 3000,

            easing: "ease-out"
        }

    );

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 8000);

}


yesButton.addEventListener("click", () => {

    localStorage.setItem(
        "proposalAnswer",
        "YES"
    );

    celebration.classList.add("active");

    const interval =
        setInterval(
            createCelebrationHeart,
            150
        );

    setTimeout(() => {

        clearInterval(interval);

    }, 6000);

});


noButton.addEventListener("click", () => {

    localStorage.setItem(
        "proposalAnswer",
        "NO"
    );

    window.location.href =
        "response.html";

});


continueButton.addEventListener("click", () => {

    window.location.href =
        "response.html";

});