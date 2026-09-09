const gift =
    document.getElementById("gift");

const openingScreen =
    document.getElementById("openingScreen");

if (gift) {

    gift.addEventListener("click", () => {

        gift.style.transform =
            "scale(1.2)";

        setTimeout(() => {

            openingScreen.classList.add("active");

        }, 400);

        setTimeout(() => {

            window.location.href =
                "journey.html";

        }, 2800);

    });

}