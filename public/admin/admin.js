const container =
    document.getElementById("responsesContainer");

const totalResponses =
    document.getElementById("totalResponses");

const yesResponses =
    document.getElementById("yesResponses");

const messageCount =
    document.getElementById("messageCount");

const latestAnswer =
    document.getElementById("latestAnswer");

const latestMessage =
    document.getElementById("latestMessage");

const latestDate =
    document.getElementById("latestDate");

const status =
    document.getElementById("responseStatus");


function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function formatDate(date) {

    if (!date) {
        return "Unknown date";
    }

    return new Date(date).toLocaleString(
        "en-IN",
        {
            dateStyle: "medium",
            timeStyle: "short"
        }
    );
}


async function loadResponses() {

    status.innerText = "Loading...";

    container.innerHTML = "";

    try {

        const response =
            await fetch("/api/responses");

        const result =
            await response.json();

        if (!response.ok || !result.success) {
            throw new Error(
                result.message || "Unable to load responses"
            );
        }

        const responses =
            Array.isArray(result.responses)
                ? result.responses
                : [];

        totalResponses.innerText =
            responses.length;

        const yesCount =
            responses.filter(
                item =>
                    String(item.answer)
                        .toLowerCase()
                        .includes("yes")
            ).length;

        yesResponses.innerText =
            yesCount;

        const messages =
            responses.filter(
                item =>
                    item.message &&
                    item.message.trim()
            ).length;

        messageCount.innerText =
            messages;


        if (responses.length === 0) {

            latestAnswer.innerText =
                "Waiting for response...";

            latestMessage.innerText =
                "No response has been submitted yet.";

            latestDate.innerText = "";

            container.innerHTML = `
                <div class="empty">
                    💌 No responses yet.
                </div>
            `;

            status.innerText = "0 responses";

            return;
        }


        const latest =
            responses[0];

        latestAnswer.innerText =
            latest.answer || "No answer";

        latestMessage.innerText =
            latest.message ||
            "No written message.";

        latestDate.innerText =
            formatDate(latest.createdAt);


        responses.forEach((item) => {

            const card =
                document.createElement("div");

            card.className =
                "response-card";

            let questionsHTML = "";

            if (
                item.questions &&
                Object.keys(item.questions).length
            ) {

                questionsHTML = `
                    <div class="questions">

                        <h3>Questions</h3>

                        ${Object.entries(item.questions)
                            .map(([question, answer]) => `
                                <div class="question">

                                    <strong>
                                        ${escapeHTML(question)}
                                    </strong>

                                    <p>
                                        ${escapeHTML(answer)}
                                    </p>

                                </div>
                            `)
                            .join("")}

                    </div>
                `;
            }


            card.innerHTML = `

                <div class="response-header">

                    <div class="answer">
                        ${escapeHTML(
                            item.answer || "No answer"
                        )}
                    </div>

                    <div class="date">
                        ${formatDate(item.createdAt)}
                    </div>

                </div>

                <div class="message">

                    ${
                        escapeHTML(
                            item.message ||
                            "No written message."
                        )
                    }

                </div>

                ${questionsHTML}

            `;

            container.appendChild(card);

        });

        status.innerText =
            `${responses.length} response${
                responses.length === 1 ? "" : "s"
            }`;

    } catch (error) {

        console.error(error);

        status.innerText = "Error";

        container.innerHTML = `
            <div class="error">

                ❌ Unable to load responses.

                <br><br>

                ${escapeHTML(error.message)}

            </div>
        `;
    }
}


document
    .getElementById("refreshButton")
    .addEventListener(
        "click",
        loadResponses
    );


loadResponses();