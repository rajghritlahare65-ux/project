document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("responseForm");

    if (!form) {
        return;
    }

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const answerElement =
            document.querySelector('input[name="answer"]:checked');

        const messageElement =
            document.getElementById("message");

        const answer =
            answerElement ? answerElement.value : "";

        const message =
            messageElement ? messageElement.value.trim() : "";

        const questions = {};

        document
            .querySelectorAll("[data-question]")
            .forEach((element) => {

                const questionName =
                    element.dataset.question;

                if (element.type === "radio") {

                    const selected =
                        document.querySelector(
                            `input[name="${questionName}"]:checked`
                        );

                    questions[questionName] =
                        selected ? selected.value : "";

                } else {

                    questions[questionName] =
                        element.value || "";
                }
            });

        const submitButton =
            form.querySelector("button[type='submit']");

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerText = "Sending ❤️...";
        }

        try {

            const response = await fetch("/api/responses", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    answer,
                    message,
                    questions
                })
            });

            const result =
                await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || "Failed to save response"
                );
            }

            alert("Your response has been sent ❤️");

            form.reset();

            // Optional redirect
            window.location.href = "/";

        } catch (error) {

            console.error(error);

            alert(
                "Something went wrong. Please try again ❤️"
            );

        } finally {

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerText = "Send My Response ❤️";
            }
        }

    });

});