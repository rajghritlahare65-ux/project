const heartsContainer = document.getElementById("hearts");

function createHeart() {

    if (!heartsContainer) return;

    const heart = document.createElement("div");

    heart.className = "floating-heart";

    heart.innerHTML =
        Math.random() > 0.5 ? "♡" : "♥";

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        (10 + Math.random() * 20) + "px";

    heart.style.animationDuration =
        (8 + Math.random() * 8) + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 16000);

}

setInterval(createHeart, 900);


/* Page transition */

window.addEventListener("load", () => {

    const transition =
        document.querySelector(".page-transition");

    if (transition) {

        setTimeout(() => {

            transition.classList.add("loaded");

        }, 200);

    }

});